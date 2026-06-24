/* ============================================================================
 *  GLOBAL VIEW — globe.js
 *  Realistic Three.js Earth + cinematic camera system.
 *
 *  Responsibilities
 *    • Build scene: day/night Earth (custom shader), cloud layer, atmospheric
 *      glow, starfield, destination markers.
 *    • Cinematic camera: idle orbital auto-rotation, eased "fly-to" arcs
 *      (Google-Earth-Studio style), zoom in / zoom out, manual drag + wheel.
 *    • Country border overlays: faint global borders + glowing highlight of the
 *      focused country (incl. independent England/Scotland/Wales/N.Ireland).
 *    • Marker hover / click hit-testing with screen-projected labels.
 *
 *  Public API (see bottom): new Globe(opts) → { flyTo, returnToOrbit,
 *    setGlobalBorders, highlight, clearHighlight, addMarkers, on, dispose }.
 *
 *  Depends on global THREE (loaded before this file).
 * ========================================================================== */

(function () {
  "use strict";

  const DEG = Math.PI / 180;
  const EARTH_R = 100;
  const CLOUD_R = EARTH_R * 1.013;
  const ATMO_R  = EARTH_R * 1.085;

  // Texture sources — hosted locally, no external dependencies.
  const TEX = {
    day:    "public/images/earth-blue-marble.jpg",
    night:  "public/images/earth-night.jpg",
    water:  "public/images/earth-water.png",
    bump:   "public/images/earth-topology.png",
    clouds: "public/images/fair_clouds_4k.png",
  };

  const SUN_DIR = new THREE.Vector3(1.0, 0.32, 0.55).normalize();

  /* ---------- math helpers ---------------------------------------------- */
  const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // lat/lng -> Vector3 on a sphere of radius r.
  // Canonical equirectangular mapping that matches THREE.SphereGeometry's UVs
  // (texture u=0 at lng -180, v=0 at lat +90), so markers/fills/borders line up
  // exactly with the Earth texture.
  function latLngToVec3(lat, lng, r) {
    const phi = (90 - lat) * DEG;
    const theta = (lng + 180) * DEG;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    );
  }
  // lat/lng -> camera spherical pose {az, polar}
  function latLngToPose(lat, lng) {
    const n = latLngToVec3(lat, lng, 1);
    return { az: Math.atan2(n.x, n.z), polar: Math.acos(clamp(n.y, -1, 1)) };
  }

  /* ====================================================================== */
  class Globe {
    constructor(opts) {
      this.canvas = opts.canvas;
      this.accent = new THREE.Color(opts.accent || "#5cc8ff");
      this.rotateSpeed = opts.rotateSpeed != null ? opts.rotateSpeed : 0.012;
      this.autoRotate = opts.autoRotate !== false;
      this.onProgress = opts.onProgress || function () {};
      this.highlightColor = new THREE.Color(opts.highlightColor || "#7df2a8"); // soft green fill
      this.lowerFactor = opts.lowerFactor != null ? opts.lowerFactor : -0.02;     // ~centred (slightly high)
      this.zoomOut = opts.zoomOut != null ? opts.zoomOut : 1.34;                  // global "see more of the planet" multiplier
      this._handlers = {};
      this.markers = [];
      this.hovered = null;
      this._marker = null;       // optional focus star (e.g. Belo Horizonte)
      this._disposed = false;

      // camera pose in spherical coords around origin (zoomed OUT for a global feel)
      this.cam = { az: -0.6, polar: 1.12, radius: 460 };
      this.idle = { polar: 1.12, radius: 460 }; // resting pose
      this.state = "idle";                       // idle | flying | focused | returning
      this.manualPauseUntil = 0;

      this._still = !!window.__STILL;      // static-preview mode (GPU-less verification)
      this._initRenderer();
      this._initScene();
      this._loadTextures();
      this._initInput();
      this._resizeHandler = () => this._resize();
      window.addEventListener("resize", this._resizeHandler);
      this._resize();
      this._lastT = performance.now();
      this._loop();
    }

    /* ---- events ---- */
    on(evt, cb) { (this._handlers[evt] = this._handlers[evt] || []).push(cb); return this; }
    _emit(evt, data) { if (evt === "ready" && this._still) this._stillStart = performance.now(); (this._handlers[evt] || []).forEach(cb => cb(data)); }

    /* ---- renderer / scene ---- */
    _initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas, antialias: true, alpha: true, powerPreference: "high-performance",
        preserveDrawingBuffer: this._still,
      });
      this.renderer.setPixelRatio(this._still ? 1 : Math.min(window.devicePixelRatio || 1, 2));
      if (THREE.SRGBColorSpace) this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    _initScene() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 6000);

      // lights (used by cloud + marker standard materials)
      this.scene.add(new THREE.AmbientLight(0x4466aa, 0.65));
      this.sunLight = new THREE.DirectionalLight(0xfff8f0, 1.45);
      this.sunLight.position.copy(SUN_DIR).multiplyScalar(500);
      this.scene.add(this.sunLight);

      this.earthGroup = new THREE.Group();
      this.scene.add(this.earthGroup);

      this._buildStars();
    }

    _buildStars() {
      const N = 2400, pos = new Float32Array(N * 3), sizes = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const r = 2200 + Math.random() * 1800;
        const t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
        pos[i*3]   = r * Math.sin(p) * Math.cos(t);
        pos[i*3+1] = r * Math.cos(p);
        pos[i*3+2] = r * Math.sin(p) * Math.sin(t);
        sizes[i] = 1.0 + Math.random() * 2.2;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const m = new THREE.PointsMaterial({ color: 0xd4e8ff, size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0.95 });
      this.stars = new THREE.Points(g, m);
      this.scene.add(this.stars);
    }

    /* ---- textures + earth meshes ---- */
    _loadTextures() {
      const mgr = new THREE.LoadingManager();
      let pct = 0;
      mgr.onProgress = (url, loaded, total) => { pct = loaded / total; this.onProgress(pct); };
      mgr.onLoad = () => { this.onProgress(1); this._emit("ready"); };
      mgr.onError = () => { /* keep going; meshes still build */ };

      const loader = new THREE.TextureLoader(mgr);
      loader.setCrossOrigin("anonymous");
      const get = (url, srgb) => {
        const t = loader.load(url);
        if (srgb && THREE.SRGBColorSpace) t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 4;
        return t;
      };

      const dayT = get(TEX.day, true);
      const nightT = get(TEX.night, true);
      const waterT = get(TEX.water, false);
      const cloudT = get(TEX.clouds, true);

      this._buildEarth(dayT, nightT, waterT);
      this._buildClouds(cloudT);
      this._buildAtmosphere();
    }

    _buildEarth(dayT, nightT, waterT) {
      const uniforms = {
        dayTexture:   { value: dayT },
        nightTexture: { value: nightT },
        waterTexture: { value: waterT },
        sunDirection: { value: SUN_DIR.clone() },
        atmoColor:    { value: new THREE.Color(0x3a7bd5) },
      };
      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormalW;
          varying vec3 vPosW;
          void main() {
            vUv = uv;
            vNormalW = normalize(mat3(modelMatrix) * normal);
            vPosW = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform sampler2D dayTexture;
          uniform sampler2D nightTexture;
          uniform sampler2D waterTexture;
          uniform vec3 sunDirection;
          uniform vec3 atmoColor;
          varying vec2 vUv;
          varying vec3 vNormalW;
          varying vec3 vPosW;
          void main() {
            vec3 N = normalize(vNormalW);
            float sun = dot(N, normalize(sunDirection));
            // wide, bright day side — facing hemisphere reads clearly even at distance
            float dayAmt = smoothstep(-0.42, 0.08, sun);

            vec3 day = texture2D(dayTexture, vUv).rgb;
            day = pow(day, vec3(0.80)) * 1.75;          // punchier continents, more vivid colours
            vec3 night = texture2D(nightTexture, vUv).rgb;
            // warm-boost city lights for the classic NASA look
            night = night * vec3(1.35, 1.10, 0.72) * 1.9;

            // lift the night side so the globe never goes pitch black
            vec3 col = mix(night + day * 0.12, day, dayAmt);

            // terminator soft glow — a hint of orange/gold at the day/night boundary
            float term = smoothstep(-0.08, 0.08, sun) * (1.0 - smoothstep(0.08, 0.38, sun));
            col += vec3(0.9, 0.55, 0.18) * term * 0.22;

            // specular glint on water (day side only)
            float water = texture2D(waterTexture, vUv).r;
            vec3 viewDir = normalize(cameraPosition - vPosW);
            vec3 refl = reflect(-normalize(sunDirection), N);
            float glint = pow(max(dot(viewDir, refl), 0.0), 18.0) * water * dayAmt;
            col += vec3(0.50, 0.68, 0.92) * glint * 0.9;

            // thin atmospheric rim — visible only at the limb, not across the surface
            float rim = pow(1.0 - max(dot(viewDir, N), 0.0), 4.5);
            col += atmoColor * rim * 0.09 * dayAmt;

            gl_FragColor = vec4(col, 1.0);
          }`,
      });
      const geo = new THREE.SphereGeometry(EARTH_R, 96, 96);
      this.earth = new THREE.Mesh(geo, mat);
      this.earthGroup.add(this.earth);
    }

    _buildClouds(cloudT) {
      const mat = new THREE.MeshStandardMaterial({
        map: cloudT, transparent: true, opacity: 0.42, depthWrite: false,
        roughness: 1, metalness: 0,
      });
      this.clouds = new THREE.Mesh(new THREE.SphereGeometry(CLOUD_R, 72, 72), mat);
      this.earthGroup.add(this.clouds);
    }

    _buildAtmosphere() {
      const mat = new THREE.ShaderMaterial({
        uniforms: { sunDirection: { value: SUN_DIR.clone() }, glowColor: { value: new THREE.Color(0x4aa3ff) } },
        side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
        vertexShader: `
          varying vec3 vNormalW;
          varying vec3 vPosW;
          void main() {
            vNormalW = normalize(mat3(modelMatrix) * normal);
            vPosW = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform vec3 sunDirection;
          uniform vec3 glowColor;
          varying vec3 vNormalW;
          varying vec3 vPosW;
          void main() {
            vec3 N = normalize(vNormalW);
            vec3 viewDir = normalize(cameraPosition - vPosW);
            // clean rim — vivid halo visible on the lit side, dim on the dark side
            float rim = pow(1.0 - max(dot(viewDir, -N), 0.0), 4.2);
            float sun = dot(N, normalize(sunDirection));
            float lit = smoothstep(-0.35, 0.65, sun);
            vec3 col = mix(vec3(0.10, 0.24, 0.60), glowColor, lit);
            // extra punch: bright cyan fringe on the lit limb
            col = mix(col, glowColor * 1.3, rim * lit * 0.55);
            gl_FragColor = vec4(col, rim * (0.22 + 0.65 * lit));
          }`,
      });
      this.atmosphere = new THREE.Mesh(new THREE.SphereGeometry(ATMO_R, 64, 64), mat);
      this.scene.add(this.atmosphere);
    }

    /* ---- visited country fills (replaces dot markers) -------------------- */
    // Paints a subtle permanent fill for every visited country, plus a brighter
    // border. The focused country uses highlight() on top (brighter green).
    setVisitedCountries(features) {
      if (this._visitedGroup) this.earthGroup.remove(this._visitedGroup);
      this._visitedGroup = new THREE.Group();

      const fillCol = this.accent.clone();
      const edgeCol = this.accent.getHex();

      features.forEach(feature => {
        const fill = this._buildFill(feature, EARTH_R * 1.0025, fillCol);
        fill.material.opacity = 0.14;   // static — no fade-in
        fill.renderOrder = 2;
        this._visitedGroup.add(fill);

        const edgeMat = new THREE.LineBasicMaterial({
          color: edgeCol, transparent: true, opacity: 0.30,
        });
        const edge = this._buildLines([feature], EARTH_R * 1.0035, edgeMat);
        edge.renderOrder = 2;
        this._visitedGroup.add(edge);
      });

      this.earthGroup.add(this._visitedGroup);
    }

    /* ---- borders --------------------------------------------------------- */
    // faint global border layer (low-res geojson, all features)
    setGlobalBorders(geojson) {
      if (this.globalBorders) this.earthGroup.remove(this.globalBorders);
      const mat = new THREE.LineBasicMaterial({ color: 0x9ec3ff, transparent: true, opacity: 0.12 });
      this.globalBorders = this._buildLines(geojson.features, EARTH_R * 1.001, mat);
      this.earthGroup.add(this.globalBorders);
    }

    // filled + outlined highlight of one feature (the focused country / region)
    highlight(feature) {
      this.clearHighlight();
      if (!feature) return;
      const col = this.highlightColor;
      this.highlightFill = this._buildFill(feature, EARTH_R * 1.004, col);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      this.highlightObj = this._buildLines([feature], EARTH_R * 1.0065, edgeMat);
      this.highlightObj.renderOrder = 4;
      this.earthGroup.add(this.highlightFill);
      this.earthGroup.add(this.highlightObj);
      this._hlFill = this.highlightFill.material;
      this._hlEdge = edgeMat;
      this._hlFade = 0;
    }

    clearHighlight() {
      if (this.highlightFill) { this.earthGroup.remove(this.highlightFill); this.highlightFill = null; }
      if (this.highlightObj) { this.earthGroup.remove(this.highlightObj); this.highlightObj = null; }
      this._hlFill = null; this._hlEdge = null;
    }

    // Triangulate a feature's polygons and project to the sphere. Crucially we
    // TESSELLATE each earcut triangle into small ones (max edge ~3°) so the
    // filled surface hugs the globe instead of cutting through it — this is
    // what keeps big countries (Brazil, USA) fully filled and flicker-free.
    _buildFill(feature, radius, color) {
      const positions = [], indices = [];
      const MAXLEN = 3;          // degrees — subdivide triangles bigger than this
      let vBase = 0;

      const pushVert = (lng, lat) => {
        const v = latLngToVec3(lat, lng, radius);
        positions.push(v.x, v.y, v.z);
        return vBase++;
      };
      // approximate edge size in degrees (longitude compressed by latitude)
      const edgeBig = (a, b) => {
        const ml = (a[1] + b[1]) * 0.5 * DEG;
        const dx = (a[0] - b[0]) * Math.cos(ml);
        const dy = (a[1] - b[1]);
        return Math.sqrt(dx * dx + dy * dy);
      };
      const addTri = (p0, p1, p2, depth) => {
        const big = Math.max(edgeBig(p0, p1), edgeBig(p1, p2), edgeBig(p2, p0));
        if (big > MAXLEN && depth < 5) {
          const m01 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
          const m12 = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
          const m20 = [(p2[0] + p0[0]) / 2, (p2[1] + p0[1]) / 2];
          addTri(p0, m01, m20, depth + 1);
          addTri(m01, p1, m12, depth + 1);
          addTri(m20, m12, p2, depth + 1);
          addTri(m01, m12, m20, depth + 1);
          return;
        }
        indices.push(pushVert(p0[0], p0[1]), pushVert(p1[0], p1[1]), pushVert(p2[0], p2[1]));
      };
      const addPoly = (poly) => {
        if (typeof window.earcut !== "function") return;
        const flat = [], holes = [];
        poly.forEach((ring, ri) => {
          if (ri > 0) holes.push(flat.length / 2);
          for (let i = 0; i < ring.length; i++) flat.push(ring[i][0], ring[i][1]);
        });
        const tri = window.earcut(flat, holes.length ? holes : null, 2);
        for (let i = 0; i < tri.length; i += 3) {
          const a = tri[i] * 2, b = tri[i + 1] * 2, c = tri[i + 2] * 2;
          addTri([flat[a], flat[a + 1]], [flat[b], flat[b + 1]], [flat[c], flat[c + 1]], 0);
        }
      };

      const g = feature.geometry;
      if (g.type === "Polygon") addPoly(g.coordinates);
      else if (g.type === "MultiPolygon") g.coordinates.forEach(addPoly);

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
      geo.setIndex(indices);
      const mat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0, side: THREE.DoubleSide,
        depthTest: true, depthWrite: false,
        polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.renderOrder = 3;     // draw after the Earth so depth-test hides the far side cleanly
      return mesh;
    }

    // place (or clear) a single focus star marker at [lng,lat]
    setMarker(coordinates) {
      if (!coordinates) { this._marker = null; this._emit("marker", null); return; }
      this._marker = { pos: latLngToVec3(coordinates[1], coordinates[0], EARTH_R * 1.012) };
    }

    // build a single LineSegments object from an array of GeoJSON features
    _buildLines(features, radius, material) {
      const verts = [];
      const addRing = (ring) => {
        for (let i = 0; i < ring.length - 1; i++) {
          const a = latLngToVec3(ring[i][1], ring[i][0], radius);
          const b = latLngToVec3(ring[i+1][1], ring[i+1][0], radius);
          verts.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      };
      const addPoly = (poly) => poly.forEach(addRing);
      features.forEach(f => {
        const g = f.geometry; if (!g) return;
        if (g.type === "Polygon") addPoly(g.coordinates);
        else if (g.type === "MultiPolygon") g.coordinates.forEach(addPoly);
      });
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(verts), 3));
      return new THREE.LineSegments(geo, material);
    }

    /* ---- camera control -------------------------------------------------- */
    flyTo(country) {
      const target = latLngToPose(country.coordinates[1], country.coordinates[0]);
      // unwrap azimuth to nearest equivalent angle (shortest path)
      let az = target.az;
      while (az - this.cam.az > Math.PI) az -= Math.PI * 2;
      while (az - this.cam.az < -Math.PI) az += Math.PI * 2;
      const dist = (country.camDistance || 255) * this.zoomOut;   // keep the planet distant — global feel

      // comet trail: vector from camera's current look-at point to destination
      const sp0 = Math.sin(this.cam.polar);
      const fromVec = new THREE.Vector3(sp0 * Math.sin(this.cam.az), Math.cos(this.cam.polar), sp0 * Math.cos(this.cam.az));
      const toVec = latLngToVec3(country.coordinates[1], country.coordinates[0], 1).normalize();
      this._spawnFlightTrail(fromVec, toVec);

      this._tween = {
        t0: performance.now(), dur: 2800,
        from: { az: this.cam.az, polar: this.cam.polar, radius: this.cam.radius },
        to: { az, polar: clamp(target.polar, 0.46, Math.PI - 0.46), radius: dist },
        arc: Math.max(12, dist * 0.05),
        onDone: () => { this.state = "focused"; this._emit("arrive", country); },
      };
      this.state = "flying";
      this._emit("flystart", country);
    }

    _makeCometTexture() {
      const cv = document.createElement("canvas"); cv.width = cv.height = 64;
      const cx = cv.getContext("2d");
      const g = cx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0,    "rgba(255,255,255,1)");
      g.addColorStop(0.18, "rgba(180,240,255,1)");
      g.addColorStop(0.45, "rgba(80,180,255,0.6)");
      g.addColorStop(1,    "rgba(0,80,200,0)");
      cx.fillStyle = g; cx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(cv);
    }

    _spawnFlightTrail(fromVec, toVec) {
      // cleanup previous
      if (this._flightGroup) {
        this._flightGroup.children.slice().forEach(c => { c.geometry.dispose(); c.material.dispose(); });
        this.earthGroup.remove(this._flightGroup);
        this._flightGroup = null;
      }

      const N = 80;        // arc segments
      const TAIL = 28;     // visible tail length in segments
      const R = EARTH_R * 1.016;

      // precompute all arc points via slerp
      const p0 = fromVec.clone().normalize();
      const p1 = toVec.clone().normalize();
      const dot = clamp(p0.dot(p1), -1, 1);
      const arcAngle = Math.acos(dot);
      const arcPts = [];
      for (let i = 0; i <= N; i++) {
        const s = i / N;
        let pt;
        if (arcAngle < 0.0001) {
          pt = p0.clone();
        } else {
          pt = p0.clone().multiplyScalar(Math.sin((1 - s) * arcAngle) / Math.sin(arcAngle))
            .add(p1.clone().multiplyScalar(Math.sin(s * arcAngle) / Math.sin(arcAngle)));
        }
        arcPts.push(pt.normalize().multiplyScalar(R));
      }

      // line layer (thin bright arc backbone)
      const linePositions = new Float32Array((N + 1) * 3);
      const lineColors    = new Float32Array((N + 1) * 3);
      arcPts.forEach((pt, i) => {
        linePositions[i * 3] = pt.x; linePositions[i * 3 + 1] = pt.y; linePositions[i * 3 + 2] = pt.z;
        const b = i / N;
        lineColors[i * 3] = 0.5 + b * 0.5; lineColors[i * 3 + 1] = 0.85; lineColors[i * 3 + 2] = 1.0;
      });
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      lineGeo.setAttribute("color",    new THREE.BufferAttribute(lineColors, 3));
      lineGeo.setDrawRange(0, 0);
      const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending });
      const line = new THREE.Line(lineGeo, lineMat);

      // glow points layer (sprite dots along arc for comet thickness)
      const tex = this._makeCometTexture();
      const ptPositions = new Float32Array((TAIL + 1) * 3);
      const ptColors    = new Float32Array((TAIL + 1) * 3);
      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPositions, 3).setUsage(THREE.DynamicDrawUsage));
      ptGeo.setAttribute("color",    new THREE.BufferAttribute(ptColors,    3).setUsage(THREE.DynamicDrawUsage));
      ptGeo.setDrawRange(0, 0);
      const ptMat = new THREE.PointsMaterial({
        map: tex, size: 5.5, vertexColors: true, transparent: true, opacity: 0.95,
        depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
      });
      const pts = new THREE.Points(ptGeo, ptMat);

      const group = new THREE.Group();
      group.add(line); group.add(pts);
      this.earthGroup.add(group);

      this._flightGroup     = group;
      this._flightArcPts    = arcPts;
      this._flightN         = N;
      this._flightTail      = TAIL;
      this._flightTrailStart = performance.now();
      this._flightTrailFade  = false;
    }

    _updateFlightTrail(now) {
      if (!this._flightGroup) return;
      const elapsed = now - this._flightTrailStart;
      const DUR = 2800, FADE = 700;
      const arcPts = this._flightArcPts;
      const N = this._flightN, TAIL = this._flightTail;
      const line = this._flightGroup.children[0];
      const pts  = this._flightGroup.children[1];

      if (!this._flightTrailFade) {
        const t = clamp(elapsed / DUR, 0, 1);
        const head = Math.round(t * N);
        const tailStart = Math.max(0, head - TAIL);

        // update line draw range
        line.geometry.setDrawRange(tailStart, head - tailStart + 1);

        // update glow points — rebuild active tail segment positions
        const count = head - tailStart + 1;
        const pos = pts.geometry.attributes.position.array;
        const col = pts.geometry.attributes.color.array;
        for (let j = 0; j < count; j++) {
          const idx = tailStart + j;
          pos[j * 3] = arcPts[idx].x; pos[j * 3 + 1] = arcPts[idx].y; pos[j * 3 + 2] = arcPts[idx].z;
          // head = bright white-cyan, tail = dim blue
          const frac = j / Math.max(1, count - 1);
          col[j * 3] = 0.3 + frac * 0.7; col[j * 3 + 1] = 0.7 + frac * 0.3; col[j * 3 + 2] = 1.0;
        }
        pts.geometry.attributes.position.needsUpdate = true;
        pts.geometry.attributes.color.needsUpdate = true;
        pts.geometry.setDrawRange(0, count);

        if (t >= 1) { this._flightTrailFade = true; this._flightTrailFadeStart = now; }
      } else {
        const ft = clamp((now - this._flightTrailFadeStart) / FADE, 0, 1);
        const op = 1 - ft;
        line.material.opacity = 0.7 * op;
        pts.material.opacity  = 0.95 * op;
        if (ft >= 1) {
          this._flightGroup.children.slice().forEach(c => { c.geometry.dispose(); c.material.dispose(); });
          this.earthGroup.remove(this._flightGroup);
          this._flightGroup = null;
        }
      }
    }

    returnToOrbit() {
      this._tween = {
        t0: performance.now(), dur: 2200,
        from: { az: this.cam.az, polar: this.cam.polar, radius: this.cam.radius },
        to: { az: this.cam.az, polar: this.idle.polar, radius: this.idle.radius },
        arc: 26,
        onDone: () => { this.state = "idle"; this._emit("orbit"); },
      };
      this.state = "returning";
      this.clearHighlight();
    }

    _applyCam() {
      const { az, polar, radius } = this.cam;
      const sp = Math.sin(polar);
      this.camera.position.set(radius * sp * Math.sin(az), radius * Math.cos(polar), radius * sp * Math.cos(az));
      // look slightly ABOVE the centre so the planet sits lower in frame
      this.camera.lookAt(0, radius * this.lowerFactor, 0);
    }

    /* ---- input ----------------------------------------------------------- */
    _initInput() {
      const canvas = this.canvas;
      canvas.classList.add("grab");
      let dragging = false, lx = 0, ly = 0, moved = 0;
      this._ray = new THREE.Raycaster();
      this._mouse = new THREE.Vector2();

      const down = (x, y) => { dragging = true; moved = 0; lx = x; ly = y; canvas.classList.add("grabbing"); };
      const move = (x, y) => {
        // hover hit-testing (only when not dragging)
        this._mouse.x = (x / window.innerWidth) * 2 - 1;
        this._mouse.y = -(y / window.innerHeight) * 2 + 1;
        this._pointer = { x, y };
        if (!dragging) return;
        const dx = x - lx, dy = y - ly; lx = x; ly = y; moved += Math.abs(dx) + Math.abs(dy);
        this.cam.az -= dx * 0.005;
        this.cam.polar = clamp(this.cam.polar - dy * 0.005, 0.28, Math.PI - 0.28);
        this.manualPauseUntil = performance.now() + 4000;
      };
      const up = () => { dragging = false; canvas.classList.remove("grabbing"); };

      canvas.addEventListener("mousedown", e => down(e.clientX, e.clientY));
      window.addEventListener("mousemove", e => move(e.clientX, e.clientY));
      window.addEventListener("mouseup", up);
      canvas.addEventListener("click", () => { if (moved < 6 && this.hovered != null) this._emit("select", this.markers[this.hovered].country); });

      canvas.addEventListener("touchstart", e => { const t = e.touches[0]; down(t.clientX, t.clientY); }, { passive: true });
      window.addEventListener("touchmove", e => { const t = e.touches[0]; if (t) move(t.clientX, t.clientY); }, { passive: true });
      window.addEventListener("touchend", up);

      canvas.addEventListener("wheel", e => {
        e.preventDefault();
        const min = 280, max = 720;
        this.cam.radius = clamp(this.cam.radius * (1 + Math.sign(e.deltaY) * 0.08), min, max);
        this.idle.radius = clamp(this.cam.radius, 380, max);
        this.manualPauseUntil = performance.now() + 2500;
      }, { passive: false });
    }

    _updateHover() { /* hover on filled countries not needed */ }

    /* ---- main loop ------------------------------------------------------- */
    _loop() {
      if (this._disposed) return;
      // static-preview: keep rendering until ~6s after textures are ready, then stop so GPU-less tooling can capture a frame
      if (this._still && this._stillStart && performance.now() - this._stillStart > 6000) return;
      requestAnimationFrame(() => this._loop());
      const now = performance.now();
      const dt = Math.min(0.05, (now - this._lastT) / 1000);
      this._lastT = now;

      // camera tween
      if (this._tween) {
        const tw = this._tween;
        const t = clamp((now - tw.t0) / tw.dur, 0, 1);
        const e = easeInOutCubic(t);
        this.cam.az = lerp(tw.from.az, tw.to.az, e);
        this.cam.polar = lerp(tw.from.polar, tw.to.polar, e);
        this.cam.radius = lerp(tw.from.radius, tw.to.radius, e) + tw.arc * Math.sin(Math.PI * t);
        if (t >= 1) { this._tween = null; tw.onDone && tw.onDone(); }
      } else if (this.autoRotate && now > this.manualPauseUntil) {
        // gentle, continuous rotation in every state — keeps the global-journey feel
        this.cam.az += this.rotateSpeed * dt;
      }
      this._applyCam();

      // Keep the viewed hemisphere lit (sun roughly behind the camera, offset
      // for a cinematic terminator near the limb). Looks like daylight on the
      // focused country while preserving day/night drama at the edges.
      if (this.earth) {
        const sd = this.camera.position.clone().normalize();
        sd.applyAxisAngle(this._upY || (this._upY = new THREE.Vector3(0, 1, 0)), -0.5);
        sd.y += 0.18; sd.normalize();
        this.earth.material.uniforms.sunDirection.value.copy(sd);
        if (this.atmosphere) this.atmosphere.material.uniforms.sunDirection.value.copy(sd);
        this.sunLight.position.copy(sd).multiplyScalar(500);
      }

      // clouds drift + marker pulse
      if (this.clouds) this.clouds.rotation.y += dt * 0.006;
      if (this.stars) this.stars.rotation.y += dt * 0.001;
      // (dot-markers removed; country fills used instead)

      // highlight fade-in (soft solid fill + bright edge)
      if (this._hlFill && this._hlFade < 1) {
        this._hlFade = Math.min(1, this._hlFade + dt * 1.3);
        this._hlFill.opacity = this._hlFade * 0.5;
        this._hlEdge.opacity = this._hlFade * 0.9;
      }

      // project the focus star marker to screen space for the DOM label
      if (this._marker) {
        const W = window.innerWidth, H = window.innerHeight;
        const wp = this._marker.pos.clone().applyMatrix4(this.earthGroup.matrixWorld);
        const front = wp.clone().normalize().dot(this.camera.position.clone().normalize()) > 0.12;
        const p = wp.clone().project(this.camera);
        this._emit("marker", { x: (p.x * 0.5 + 0.5) * W, y: (-p.y * 0.5 + 0.5) * H, front });
      }

      this._updateFlightTrail(now);
      this._updateHover();
      this.renderer.render(this.scene, this.camera);
    }

    _resize() {
      const w = window.innerWidth, h = window.innerHeight;
      const f = this._still ? 0.28 : 1;            // downscale internal buffer in static-preview mode
      this.renderer.setSize(w * f, h * f, false);
      this.canvas.style.width = w + "px";
      this.canvas.style.height = h + "px";
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }

    dispose() {
      this._disposed = true;
      window.removeEventListener("resize", this._resizeHandler);
      this.clearHighlight();
      if (this.renderer) { this.renderer.dispose(); }
    }
  }

  window.Globe = Globe;
})();
