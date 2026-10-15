"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  className?: string;
}

export function Hero3DCanvas({ className = "" }: Hero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMajor, setActiveMajor] = useState<string>("PPLG");
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Group Container for Rotation ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- 1. Core Sphere (Icosahedron Wireframe) ---
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x006398,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeometry = new THREE.SphereGeometry(0.85, 32, 32);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x5bb8fe,
      transparent: true,
      opacity: 0.25,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    mainGroup.add(innerMesh);

    // Golden center core
    const centerGeometry = new THREE.OctahedronGeometry(0.35);
    const centerMaterial = new THREE.MeshBasicMaterial({
      color: 0xffb95f,
      wireframe: true,
    });
    const centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
    mainGroup.add(centerMesh);

    // --- 2. Orbital Rings ---
    const rings: THREE.Line[] = [];
    const ringRadii = [2.2, 2.7, 3.2];
    const ringRotations = [
      { x: Math.PI / 3, y: 0.2 },
      { x: -Math.PI / 4, y: Math.PI / 6 },
      { x: 0.1, y: Math.PI / 2.5 },
    ];

    ringRadii.forEach((radius, i) => {
      const ringGeom = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(theta) * radius,
            0,
            Math.sin(theta) * radius
          )
        );
      }
      ringGeom.setFromPoints(points);

      const ringMat = new THREE.LineBasicMaterial({
        color: i === 1 ? 0xffb95f : 0x5bb8fe,
        transparent: true,
        opacity: 0.4,
      });

      const ringLine = new THREE.Line(ringGeom, ringMat);
      ringLine.rotation.x = ringRotations[i].x;
      ringLine.rotation.y = ringRotations[i].y;
      mainGroup.add(ringLine);
      rings.push(ringLine);
    });

    // --- 3. Satellites / Program Nodes (PPLG, TJKT, AKL, ACP) ---
    const majorData = [
      { name: "PPLG", color: 0x00c853, radius: 2.2, speed: 0.8 },
      { name: "TJKT", color: 0x006398, radius: 2.7, speed: 0.6 },
      { name: "AKL", color: 0xffb95f, radius: 3.2, speed: 0.4 },
      { name: "ACP", color: 0xe53935, radius: 2.4, speed: -0.7 },
    ];

    const satellites: {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      orbitAngle: number;
      ringIndex: number;
      name: string;
    }[] = [];

    majorData.forEach((m, idx) => {
      const satGeom = new THREE.SphereGeometry(0.14, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({ color: m.color });
      const satMesh = new THREE.Mesh(satGeom, satMat);
      mainGroup.add(satMesh);

      satellites.push({
        mesh: satMesh,
        radius: m.radius,
        speed: m.speed,
        orbitAngle: (idx * Math.PI) / 2,
        ringIndex: idx % rings.length,
        name: m.name,
      });
    });

    // --- 4. Starfield / Floating Particles ---
    const particleCount = 400;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x5bb8fe);
    const colorGold = new THREE.Color(0xffb95f);
    const colorCyan = new THREE.Color(0x93ccff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 12;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 10;

      const pick = Math.random();
      const c = pick > 0.6 ? colorGold : pick > 0.3 ? colorBlue : colorCyan;
      particleColors[i3] = c.r;
      particleColors[i3 + 1] = c.g;
      particleColors[i3 + 2] = c.b;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Mouse & Drag Interactivity ---
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousMouseX;
        const deltaY = clientY - previousMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousMouseX = clientX;
        previousMouseY = clientY;
      } else {
        // Subtle tilt when hovering
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = normX * 0.4;
        targetRotationX = -normY * 0.3;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    container.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    container.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // --- Resize Observer ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
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
      const elapsedTime = clock.getElapsedTime();

      // Continuous ambient rotation
      coreMesh.rotation.y += 0.003;
      coreMesh.rotation.x += 0.002;
      centerMesh.rotation.y -= 0.01;
      centerMesh.rotation.z += 0.008;

      // Orbit satellites along rings
      satellites.forEach((sat, i) => {
        sat.orbitAngle += sat.speed * 0.015;
        const ring = rings[sat.ringIndex];
        const unrotated = new THREE.Vector3(
          Math.cos(sat.orbitAngle) * sat.radius,
          0,
          Math.sin(sat.orbitAngle) * sat.radius
        );
        unrotated.applyEuler(ring.rotation);
        sat.mesh.position.copy(unrotated);

        // Highlight nearest active satellite
        if (i === Math.floor((elapsedTime * 0.5) % satellites.length)) {
          setActiveMajor(sat.name);
        }
      });

      // Ambient particle drift
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;

      // Smooth lerp towards target rotation
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Auto-spin main group slowly if not actively dragging
      if (!isDragging) {
        targetRotationY += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      container.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);

      container.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      centerGeometry.dispose();
      centerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating HUD Badges & Indicators */}
      <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md text-[11px] font-semibold text-white tracking-wide border border-white/10 uppercase shadow-lg">
          3D Interactive Core
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/85 backdrop-blur-md border border-outline-variant/30 text-xs text-primary font-medium shadow-md">
          <span className="material-symbols-outlined text-[16px] text-secondary">
            touch_app
          </span>
          <span>{isInteracting ? "Memutar..." : "Geser / Drag untuk rotasi"}</span>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary text-white text-xs font-bold tracking-wider shadow-md">
          <span className="text-secondary-fixed-dim">NODE:</span>
          <span className="text-amber-400">{activeMajor}</span>
        </div>
      </div>
    </div>
  );
}
