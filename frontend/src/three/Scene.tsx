import { useEffect, useRef } from "react";
import * as THREE from "three";
import { store } from "../store/index.ts";

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect mobile for particle scaling & performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 1200 : 3800;

    // Scene & Fog (matching light lavender #f4f5ff)
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf4f5ff, 0.048);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Renderer with light clear color
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: !isMobile,
      alpha: true,
      stencil: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xf4f5ff, 1);
    container.appendChild(renderer.domElement);

    const disposables: { dispose: () => void }[] = [];

    // ========================================================
    // 1. SPIRAL GALAXY WITH NORMAL BLENDING & SATURATED TONAL PALETTE
    // ========================================================
    const galaxyGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const arms = 3;
    const maxRadius = 13.5;
    const spinMultiplier = 1.35;

    // Saturated darker tones designed specifically for light theme visibility
    const coreColor = new THREE.Color("#4338ca"); // deep indigo core
    const midColor = new THREE.Color("#7c3aed"); // rich violet
    const outerColor = new THREE.Color("#db2777"); // vivid magenta/pink
    const cyanAccent = new THREE.Color("#0284c7"); // rich cyan/blue

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 1.7) * maxRadius;
      const spinAngle = r * spinMultiplier;
      const branchAngle = ((i % arms) * 2 * Math.PI) / arms;

      const spread = (Math.random() - 0.5) * (0.6 + r * 0.1);
      const spreadY = (Math.random() - 0.5) * (0.5 + r * 0.08);
      const spreadZ = (Math.random() - 0.5) * (0.6 + r * 0.1);

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + spread;
      positions[i3 + 1] = spreadY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + spreadZ;

      // Color interpolation
      const mixedColor = coreColor.clone();
      const normRadius = r / maxRadius;
      if (normRadius < 0.45) {
        mixedColor.lerp(midColor, normRadius / 0.45);
      } else {
        mixedColor.lerp(outerColor, (normRadius - 0.45) / 0.55);
      }

      if (Math.random() > 0.8) {
        mixedColor.lerp(cyanAccent, 0.7);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    galaxyGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    disposables.push(galaxyGeometry);

    // Normal blending for crisp definition on light background
    const galaxyMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.034 : 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    disposables.push(galaxyMaterial);

    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);

    // ========================================================
    // 2. CENTRAL CORE: METALLIC TORUS KNOT + WIREFRAME ICOSAHEDRON
    // ========================================================
    const coreGroup = new THREE.Group();
    coreGroup.position.set(isMobile ? 0 : 1.4, isMobile ? 1.0 : 0, 0);
    const initialScale = isMobile ? 0.68 : 0.95;
    coreGroup.scale.set(initialScale, initialScale, initialScale);
    scene.add(coreGroup);

    // Metallic Torus Knot in rich violet
    const knotGeometry = new THREE.TorusKnotGeometry(
      1.15,
      0.32,
      isMobile ? 70 : 110,
      isMobile ? 16 : 24,
      2,
      3
    );
    disposables.push(knotGeometry);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      roughness: 0.28,
      metalness: 0.75,
      transparent: true,
      opacity: 0.88,
    });
    disposables.push(knotMaterial);
    const torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
    coreGroup.add(torusKnot);

    // Wireframe Icosahedron in saturated cyan
    const icosahedronGeometry = new THREE.IcosahedronGeometry(2.35, 1);
    disposables.push(icosahedronGeometry);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    disposables.push(icosahedronMaterial);
    const icosahedron = new THREE.Mesh(
      icosahedronGeometry,
      icosahedronMaterial
    );
    coreGroup.add(icosahedron);

    // 3 Orbiting Rings with saturated theme hues
    const ringConfigs = [
      { radius: 2.9, tube: 0.016, color: 0x0284c7, rotX: 1.1, rotY: 0.4 },
      { radius: 3.5, tube: 0.016, color: 0x7c3aed, rotX: 0.3, rotY: 1.2 },
      { radius: 4.1, tube: 0.014, color: 0xdb2777, rotX: 0.8, rotY: 0.9 },
    ];

    const rings = ringConfigs.map((cfg) => {
      const geom = new THREE.TorusGeometry(
        cfg.radius,
        cfg.tube,
        14,
        isMobile ? 50 : 80
      );
      disposables.push(geom);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.55,
      });
      disposables.push(mat);
      const ring = new THREE.Mesh(geom, mat);
      ring.rotation.x = cfg.rotX;
      ring.rotation.y = cfg.rotY;
      coreGroup.add(ring);
      return ring;
    });

    // ========================================================
    // 3. FLOATING FACETED SHAPES
    // ========================================================
    const floatingShapes: {
      mesh: any;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      floatSpeed: number;
      floatOffset: number;
    }[] = [];

    const shapeGeometries = [
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.TetrahedronGeometry(0.38, 0),
      new THREE.DodecahedronGeometry(0.32, 0),
      new THREE.IcosahedronGeometry(0.36, 0),
    ];
    shapeGeometries.forEach((g) => disposables.push(g));

    const shapeMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.65,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.65,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xdb2777,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.65,
      }),
    ];
    shapeMaterials.forEach((m) => disposables.push(m));

    const shapePositions = [
      { x: -5.0, y: 2.8, z: -1.5 },
      { x: 5.4, y: -2.4, z: -2.0 },
      { x: -4.6, y: -3.2, z: 1.0 },
      { x: 4.2, y: 3.5, z: -0.5 },
      { x: -2.8, y: 4.0, z: -2.5 },
      { x: 3.6, y: -3.8, z: -1.2 },
    ];

    shapePositions.forEach((pos, idx) => {
      const geom = shapeGeometries[idx % shapeGeometries.length];
      const mat = shapeMaterials[idx % shapeMaterials.length];
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(pos.x, pos.y, pos.z);
      scene.add(mesh);

      floatingShapes.push({
        mesh,
        baseX: pos.x,
        baseY: pos.y,
        baseZ: pos.z,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        floatSpeed: 0.8 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
      });
    });

    // ========================================================
    // 4. LIGHTING SYSTEM FOR LIGHT THEME
    // ========================================================
    const ambientLight = new THREE.AmbientLight(0xeef2ff, 2.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x0284c7, 3.2, 45);
    cyanLight.position.set(-6, 4, 4);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x7c3aed, 3.8, 50);
    violetLight.position.set(6, -3, 3);
    scene.add(violetLight);

    const pinkLight = new THREE.PointLight(0xdb2777, 2.8, 35);
    pinkLight.position.set(0, 5, -2);
    scene.add(pinkLight);

    // ========================================================
    // 5. ANIMATION, RECEDING CORE & SCROLL DYNAMICS
    // ========================================================
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let easedProgress = 0;
    let animationFrameId = 0;
    let isTabVisible = true;
    const clock = new THREE.Clock();

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const render = () => {
      if (!isTabVisible) return;

      clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Read route-driven progress directly from Redux without React re-renders
      const targetProgress = store.getState().ui.scrollProgress;
      easedProgress += (targetProgress - easedProgress) * 0.06;

      // Mouse parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.045;
      currentMouseY += (targetMouseY - currentMouseY) * 0.045;

      const s = Math.min(Math.max(easedProgress, 0), 1);

      // Keyframe interpolation for routes:
      // Route 0 (Home: s = 0.0): Core prominent (scale ~0.95, z ~0), right side
      // Route 1 (About: s = 0.2): Core receded, x = -2.6, y = 0.4
      // Route 2 (Skills: s = 0.4): Core receded, x = 0, y = 2.2
      // Route 3 (Experience: s = 0.6): Core receded, x = 2.6, y = -0.5
      // Route 4 (Projects: s = 0.8): Core receded, x = -2.2, y = -1.0
      // Route 5 (Contact: s = 1.0): Core receded, x = 0, y = -2.0
      let targetCoreX = isMobile ? 0 : 1.4;
      let targetCoreY = isMobile ? 0.6 : 0;
      let targetCoreZ = 0;
      let targetCamZ = 7.5;

      if (s < 0.2) {
        const t = s / 0.2;
        targetCoreX = lerp(isMobile ? 0 : 1.4, -2.6, t);
        targetCoreY = lerp(isMobile ? 0.6 : 0, 0.4, t);
        targetCoreZ = lerp(0, -3.8, t);
        targetCamZ = lerp(7.5, 7.0, t);
      } else if (s < 0.4) {
        const t = (s - 0.2) / 0.2;
        targetCoreX = lerp(-2.6, 0, t);
        targetCoreY = lerp(0.4, 2.2, t);
        targetCoreZ = lerp(-3.8, -4.2, t);
        targetCamZ = lerp(7.0, 7.8, t);
      } else if (s < 0.6) {
        const t = (s - 0.4) / 0.2;
        targetCoreX = lerp(0, 2.6, t);
        targetCoreY = lerp(2.2, -0.5, t);
        targetCoreZ = lerp(-4.2, -3.8, t);
        targetCamZ = lerp(7.8, 8.2, t);
      } else if (s < 0.8) {
        const t = (s - 0.6) / 0.2;
        targetCoreX = lerp(2.6, -2.2, t);
        targetCoreY = lerp(-0.5, -1.0, t);
        targetCoreZ = lerp(-3.8, -4.0, t);
        targetCamZ = lerp(8.2, 7.6, t);
      } else {
        const t = (s - 0.8) / 0.2;
        targetCoreX = lerp(-2.2, 0, t);
        targetCoreY = lerp(-1.0, -2.0, t);
        targetCoreZ = lerp(-4.0, -3.6, t);
        targetCamZ = lerp(7.6, 7.2, t);
      }

      // On non-home routes, the 3D core recedes: smaller, further back, and more transparent
      const isHome = s < 0.08;
      const homeScale = isMobile ? 0.68 : 0.95;
      const recededScale = isMobile ? 0.36 : 0.48;
      const currentScale = isHome ? homeScale : lerp(homeScale, recededScale, Math.min(s / 0.2, 1));

      coreGroup.scale.set(currentScale, currentScale, currentScale);
      coreGroup.position.set(targetCoreX, targetCoreY, targetCoreZ);

      // Receding transparency
      const knotAlpha = isHome ? 0.88 : 0.35;
      const icosahedronAlpha = isHome ? 0.45 : 0.18;
      knotMaterial.opacity = lerp(knotMaterial.opacity, knotAlpha, 0.05);
      icosahedronMaterial.opacity = lerp(icosahedronMaterial.opacity, icosahedronAlpha, 0.05);

      // Camera parallax
      camera.position.x = currentMouseX * 0.6;
      camera.position.y = -currentMouseY * 0.45;
      camera.position.z = targetCamZ;
      camera.lookAt(coreGroup.position.x * 0.15, coreGroup.position.y * 0.15, 0);

      // Continuous rotation
      galaxy.rotation.y = elapsed * 0.03 + s * 1.2;
      galaxy.rotation.x = Math.sin(elapsed * 0.015) * 0.06;

      torusKnot.rotation.x = elapsed * 0.32 + s * 1.8;
      torusKnot.rotation.y = elapsed * 0.42;
      icosahedron.rotation.y = -elapsed * 0.2 - s * 1.5;
      icosahedron.rotation.z = elapsed * 0.12;

      rings[0].rotation.z += 0.007;
      rings[1].rotation.x += 0.005;
      rings[2].rotation.y += 0.006;

      // Floating shapes
      floatingShapes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.position.y =
          item.baseY +
          Math.sin(elapsed * item.floatSpeed + item.floatOffset) * 0.38;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    // Visibility change
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible";
      if (isTabVisible) {
        clock.start();
        animationFrameId = requestAnimationFrame(render);
      } else {
        clock.stop();
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      disposables.forEach((item) => {
        try {
          item.dispose();
        } catch {
          // ignore
        }
      });

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#f4f5ff]"
    />
  );
}
