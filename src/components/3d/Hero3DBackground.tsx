"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf0f4ff, 0.05);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 18;
    camera.position.y = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // --- 1. Interactive Connected Plexus / Particle Web ---
    const particleCount = 90;
    const maxDistance = 4.2;
    const maxConnections = particleCount * 6;

    const particlesData: {
      velocity: THREE.Vector3;
      origin: THREE.Vector3;
    }[] = [];

    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x006398);
    const colorGold = new THREE.Color(0xd97706);
    const colorSky = new THREE.Color(0x5bb8fe);

    const rangeX = 26;
    const rangeY = 16;
    const rangeZ = 12;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * rangeX;
      const y = (Math.random() - 0.5) * rangeY;
      const z = (Math.random() - 0.5) * rangeZ;

      particlePositions[i3] = x;
      particlePositions[i3 + 1] = y;
      particlePositions[i3 + 2] = z;

      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.018,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.012
        ),
        origin: new THREE.Vector3(x, y, z),
      });

      const pick = Math.random();
      const c = pick > 0.65 ? colorGold : pick > 0.3 ? colorSky : colorCyan;
      particleColors[i3] = c.r;
      particleColors[i3 + 1] = c.g;
      particleColors[i3 + 2] = c.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.NormalBlending,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // --- Dynamic Connecting Lines ---
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    linesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
    });

    const lineMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lineMesh);

    // --- 2. Floating Wireframe 3D Geometric Objects ---
    const floatingObjects: {
      mesh: THREE.Mesh;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      floatSpeed: number;
      initialY: number;
    }[] = [];

    const geometries = [
      new THREE.IcosahedronGeometry(0.9, 1),
      new THREE.OctahedronGeometry(0.75, 0),
      new THREE.TorusGeometry(0.9, 0.12, 8, 24),
      new THREE.TetrahedronGeometry(0.85, 0),
      new THREE.IcosahedronGeometry(0.65, 0),
    ];

    const objectPositions = [
      { x: -9, y: 3.5, z: -4, color: 0x006398 },
      { x: -11, y: -4, z: -2, color: 0xffb95f },
      { x: 10, y: 4.5, z: -5, color: 0x5bb8fe },
      { x: 11, y: -3.5, z: -3, color: 0x006398 },
      { x: 0, y: 5.5, z: -6, color: 0xffb95f },
    ];

    objectPositions.forEach((pos, idx) => {
      const geom = geometries[idx % geometries.length];
      const mat = new THREE.MeshBasicMaterial({
        color: pos.color,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(pos.x, pos.y, pos.z);
      scene.add(mesh);

      floatingObjects.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        rotSpeedZ: (Math.random() - 0.5) * 0.006,
        floatSpeed: 0.6 + Math.random() * 0.8,
        initialY: pos.y,
      });
    });

    // --- 3. Undulating 3D Wave Grid (Digital Ground Plane) ---
    const waveRows = 24;
    const waveCols = 40;
    const waveParticleCount = waveRows * waveCols;
    const wavePositions = new Float32Array(waveParticleCount * 3);
    const waveColors = new Float32Array(waveParticleCount * 3);

    let idx = 0;
    for (let r = 0; r < waveRows; r++) {
      for (let c = 0; c < waveCols; c++) {
        const x = (c - waveCols / 2) * 0.8;
        const z = (r - waveRows / 2) * 0.8 - 4;
        const y = -7;

        wavePositions[idx * 3] = x;
        wavePositions[idx * 3 + 1] = y;
        wavePositions[idx * 3 + 2] = z;

        const wColor = r % 2 === 0 ? colorCyan : colorSky;
        waveColors[idx * 3] = wColor.r;
        waveColors[idx * 3 + 1] = wColor.g;
        waveColors[idx * 3 + 2] = wColor.b;

        idx++;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(wavePositions, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    waveGeometry.setAttribute("color", new THREE.BufferAttribute(waveColors, 3));

    const waveMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
    });

    const waveSystem = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(waveSystem);

    // --- 4. Interactive Mouse Parallax & Movement ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = normX * 2.2;
      targetMouseY = normY * 1.5;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- Resize Observer ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- IntersectionObserver to Pause Render Loop when Scrolled Off-Screen ---
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          animate();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      camera.position.x = currentMouseX;
      camera.position.y = 1 + currentMouseY * 0.6;
      camera.lookAt(0, 0, 0);

      // --- Update Plexus Particles ---
      const posAttr = particlesGeometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const pData = particlesData[i];

        // Drift
        posArray[i3] += pData.velocity.x;
        posArray[i3 + 1] += pData.velocity.y;
        posArray[i3 + 2] += pData.velocity.z;

        // Bounce within 3D boundary
        if (Math.abs(posArray[i3]) > rangeX / 2) pData.velocity.x *= -1;
        if (Math.abs(posArray[i3 + 1]) > rangeY / 2) pData.velocity.y *= -1;
        if (Math.abs(posArray[i3 + 2]) > rangeZ / 2) pData.velocity.z *= -1;
      }
      posAttr.needsUpdate = true;

      // --- Connect Lines Between Close Particles ---
      let vertexIndex = 0;
      let colorIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;

          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const alpha = 1.0 - dist / maxDistance;

            linePositions[vertexIndex++] = posArray[i3];
            linePositions[vertexIndex++] = posArray[i3 + 1];
            linePositions[vertexIndex++] = posArray[i3 + 2];

            linePositions[vertexIndex++] = posArray[j3];
            linePositions[vertexIndex++] = posArray[j3 + 1];
            linePositions[vertexIndex++] = posArray[j3 + 2];

            const c = (i + j) % 3 === 0 ? colorGold : colorSky;
            lineColors[colorIndex++] = c.r * alpha;
            lineColors[colorIndex++] = c.g * alpha;
            lineColors[colorIndex++] = c.b * alpha;

            lineColors[colorIndex++] = c.r * alpha;
            lineColors[colorIndex++] = c.g * alpha;
            lineColors[colorIndex++] = c.b * alpha;

            if (vertexIndex >= linePositions.length) break;
          }
        }
        if (vertexIndex >= linePositions.length) break;
      }

      linesGeometry.setDrawRange(0, vertexIndex / 3);
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      // --- Animate Floating Geometric Polyhedra ---
      floatingObjects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rotSpeedX;
        obj.mesh.rotation.y += obj.rotSpeedY;
        obj.mesh.rotation.z += obj.rotSpeedZ;
        obj.mesh.position.y =
          obj.initialY + Math.sin(elapsed * obj.floatSpeed) * 0.45;
      });

      // --- Animate 3D Undulating Wave Grid ---
      const wavePosAttr = waveGeometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      const waveArray = wavePosAttr.array as Float32Array;

      let wIdx = 0;
      for (let r = 0; r < waveRows; r++) {
        for (let c = 0; c < waveCols; c++) {
          const y =
            -6.8 +
            Math.sin(c * 0.28 + elapsed * 1.4) * 0.35 +
            Math.cos(r * 0.32 + elapsed * 1.1) * 0.3;
          waveArray[wIdx * 3 + 1] = y;
          wIdx++;
        }
      }
      wavePosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      geometries.forEach((g) => g.dispose());
      waveGeometry.dispose();
      waveMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Background Soft Lighting Gradients to harmonize with WebGL */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f3f6ff] via-[#eaf0ff]/70 to-[#f6f8ff]" />

      {/* Full 3D WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Bottom Fade to guarantee smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </div>
  );
}
