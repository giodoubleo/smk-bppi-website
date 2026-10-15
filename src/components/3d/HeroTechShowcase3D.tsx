"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import {
  Code2,
  Network,
  Calculator,
  Laptop,
  RotateCw,
  ChevronRight,
  Layers,
  Sparkles,
  Maximize2,
} from "lucide-react";
import Link from "next/link";

interface MajorInfo {
  code: string;
  name: string;
  modelTitle: string;
  subtitle: string;
  icon: any;
  accentHex: string;
  accentNumber: number;
  tagline: string;
  badge: string;
  link: string;
}

const MAJORS_CONFIG: Record<string, MajorInfo> = {
  PPLG: {
    code: "PPLG",
    name: "Pengembangan Perangkat Lunak & Gim",
    modelTitle: "PlayStation DualSense & Game Rig",
    subtitle: "Symmetrical Sticks, ▲●✖■ Buttons & Lightbar",
    icon: Code2,
    accentHex: "#10b981",
    accentNumber: 0x10b981,
    tagline: "Game Development, Flutter Mobile & Full-Stack Studio",
    badge: "Teaching Factory Software",
    link: "/jurusan/pplg",
  },
  TJKT: {
    code: "TJKT",
    name: "Teknik Jaringan Komputer & Telekomunikasi",
    modelTitle: "Cisco Enterprise Datacenter",
    subtitle: "Blade Server, Fiber Loops & Radar Array",
    icon: Network,
    accentHex: "#3b82f6",
    accentNumber: 0x3b82f6,
    tagline: "Cisco Enterprise Rack, MikroTik Core & Cyber Security Defense",
    badge: "Cisco Academy Partner",
    link: "/jurusan/tjkt",
  },
  AKL: {
    code: "AKL",
    name: "Akuntansi & Keuangan Lembaga",
    modelTitle: "Bitcoin ₿ & Chronos Vault",
    subtitle: "Minted Bullion, 12 Pistons & 16 Growth Towers",
    icon: Calculator,
    accentHex: "#f59e0b",
    accentNumber: 0xf59e0b,
    tagline: "Bank Mini, Digital Auditing & Accurate Cloud Accounting",
    badge: "Mitra Bank BJB",
    link: "/jurusan/akl",
  },
  AXIOO: {
    code: "AXIOO",
    name: "Axioo Class Program (ACP)",
    modelTitle: "Axioo HYPE Motherboard",
    subtitle: "LGA 1700, Liquid Turbine & DDR5 Armor",
    icon: Laptop,
    accentHex: "#f43f5e",
    accentNumber: 0xf43f5e,
    tagline: "Industrial Assembly, Chipset Telemetry & Micro-Soldering Lab",
    badge: "Kelas Industri Resmi Axioo",
    link: "/jurusan/acp",
  },
};

// =========================================================================
// Helper Texture Creators
// =========================================================================

// High-res Code Terminal Texture for PPLG
function createCodeTerminalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Dark IDE background
  ctx.fillStyle = "#030712";
  ctx.fillRect(0, 0, 512, 320);

  // Top Title Bar
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, 512, 38);

  // macOS Window Buttons
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(20, 19, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#eab308";
  ctx.beginPath();
  ctx.arc(38, 19, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(56, 19, 5.5, 0, Math.PI * 2);
  ctx.fill();

  // Tab
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(80, 6, 180, 32);
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 13px monospace";
  ctx.fillText("📄 GameEngine.tsx", 95, 27);

  // Code editor lines
  const lines = [
    { num: "1", kw: "import", txt: " { GameEngine, Player3D } from ", str: "'@bbpi/pplg';" },
    { num: "2", kw: "const", txt: " studio = new GameStudio({ fps: ", str: "60" },
    { num: "3", kw: "export default", txt: " function Software() {", str: "" },
    { num: "4", kw: "  const", txt: " stack = ['Next.js', 'Flutter', 'Godot'];", str: "" },
    { num: "5", kw: "  return", txt: " <Player ready={true} cert='BNSP' />;", str: "" },
    { num: "6", kw: "}", txt: " // PPLG: Rekayasa Perangkat Lunak & Gim", str: "" },
  ];

  ctx.font = "14px monospace";
  lines.forEach((l, idx) => {
    const y = 75 + idx * 30;
    // Line number
    ctx.fillStyle = "#475569";
    ctx.fillText(l.num, 18, y);

    // Keyword
    ctx.fillStyle = "#f43f5e";
    ctx.fillText(l.kw, 42, y);

    // Code text
    ctx.fillStyle = "#f8fafc";
    ctx.fillText(l.txt, 42 + ctx.measureText(l.kw).width + 8, y);

    // String / param
    if (l.str) {
      ctx.fillStyle = "#34d399";
      ctx.fillText(l.str, 42 + ctx.measureText(l.kw + " " + l.txt).width + 8, y);
    }
  });

  // Bottom Status Bar
  ctx.fillStyle = "#064e3b";
  ctx.fillRect(0, 282, 512, 38);
  ctx.fillStyle = "#34d399";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("✓ BUILD SUCCESS • TypeScript • 60 FPS • Teaching Factory", 18, 306);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

// Minted Bitcoin Gold Bullion Texture for AKL
function createBitcoinTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = 256;
  const cy = 256;

  // Rich mirror gold gradient background
  const grad = ctx.createRadialGradient(cx, cy, 40, cx, cy, 250);
  grad.addColorStop(0, "#fef08a");
  grad.addColorStop(0.5, "#f59e0b");
  grad.addColorStop(0.85, "#d97706");
  grad.addColorStop(1, "#92400e");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, 250, 0, Math.PI * 2);
  ctx.fill();

  // Outer Dentil Beading ring (60 precision beads)
  ctx.fillStyle = "#fffbeb";
  for (let i = 0; i < 60; i++) {
    const angle = (i * Math.PI * 2) / 60;
    const bx = cx + Math.cos(angle) * 236;
    const by = cy + Math.sin(angle) * 236;
    ctx.beginPath();
    ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Circular Border Groove
  ctx.strokeStyle = "#78350f";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 222, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#fef08a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, 218, 0, Math.PI * 2);
  ctx.stroke();

  // Inscribed Circular Text
  ctx.font = "bold 15px sans-serif";
  ctx.fillStyle = "#451a03";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const text = "★ BITCOIN • DIGITAL ASSET • AKL FINTECH • 1 BTC ★";
  const radius = 196;
  const len = text.length;
  for (let i = 0; i < len; i++) {
    const char = text[i];
    const angle = (i / len) * Math.PI * 2 - Math.PI / 2;
    ctx.save();
    ctx.translate(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }

  // Cryptographic Circuit Board Traces
  ctx.strokeStyle = "rgba(180, 83, 9, 0.45)";
  ctx.lineWidth = 2.5;
  for (let a = 0; a < 8; a++) {
    const rad = 0.4 + a * 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, 150 - a * 6, rad, rad + 0.5);
    ctx.stroke();
  }

  // Center Bitcoin Logo ₿ (Tilted 14 degrees)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((14 * Math.PI) / 180);

  // Soft drop shadow
  ctx.shadowColor = "rgba(69, 26, 3, 0.6)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 6;

  ctx.font = "900 170px 'Segoe UI', system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("₿", 0, 0);

  // Gradient overlay on ₿
  ctx.shadowColor = "transparent";
  const bGrad = ctx.createLinearGradient(-50, -80, 50, 80);
  bGrad.addColorStop(0, "#fffbeb");
  bGrad.addColorStop(0.5, "#fde68a");
  bGrad.addColorStop(1, "#f59e0b");
  ctx.fillStyle = bGrad;
  ctx.fillText("₿", 0, 0);

  ctx.strokeStyle = "#78350f";
  ctx.lineWidth = 4;
  ctx.strokeText("₿", 0, 0);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

// Soft Elliptical Ground Contact Shadow for realistic studio grounding
function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = 256;
  const cy = 256;
  ctx.clearRect(0, 0, 512, 512);

  // Broad soft penumbra falloff
  const gradBroad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 240);
  gradBroad.addColorStop(0, "rgba(1, 4, 15, 0.75)");
  gradBroad.addColorStop(0.35, "rgba(2, 6, 23, 0.45)");
  gradBroad.addColorStop(0.7, "rgba(2, 6, 23, 0.15)");
  gradBroad.addColorStop(1, "rgba(2, 6, 23, 0)");
  ctx.fillStyle = gradBroad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 240, 130, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tight core occlusion directly under handles & center
  const gradTight = ctx.createRadialGradient(cx, cy, 10, cx, cy, 150);
  gradTight.addColorStop(0, "rgba(0, 2, 8, 0.95)");
  gradTight.addColorStop(0.5, "rgba(1, 4, 15, 0.6)");
  gradTight.addColorStop(1, "rgba(2, 6, 23, 0)");
  ctx.fillStyle = gradTight;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 150, 80, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

// =========================================================================
// 1. MODEL PPLG: Authentic PlayStation 5 DualSense 3D Hardware Showcase
// =========================================================================
function buildPPLGGroup(): { group: THREE.Group; update: (t: number) => void } {
  const group = new THREE.Group();

  // 1. Ground Contact Shadow Plane
  const shadowTex = createContactShadowTexture();
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(5.0, 3.0),
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.set(0, -1.35, 0);
  group.add(shadowPlane);

  // 2. Subtle Architectural Halo Ring
  const haloArc = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.012, 16, 64),
    new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.2,
    })
  );
  haloArc.rotation.x = 0.32;
  haloArc.position.set(0, 0.35, -0.65);
  group.add(haloArc);

  // 3. Hero PlayStation 5 Controller Root (3/4 Cinematic Hardware Shot)
  const psController = new THREE.Group();
  psController.position.set(0, 0.15, 0);
  // Elegant 3/4 commercial product showcase:
  // Slight upward tilt (-0.26) + 3/4 yaw (0.32) + subtle dynamic roll (-0.05)
  psController.rotation.set(-0.26, 0.32, -0.05);
  group.add(psController);

  // Load the authentic 3D DualSense Model
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    "/models/ps5-controller.glb",
    (gltf) => {
      const model = gltf.scene;

      // Rotate model so its front faceplate (thumbsticks, touchpad, buttons) faces forward (+Z)
      model.rotation.y = Math.PI;

      // Scale to commanding hero presence (width ~3.3 units)
      model.scale.setScalar(8.5);

      // Precisely center the model around origin
      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center);

      // Fine-tune materials for studio lighting
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.castShadow = true;
          m.receiveShadow = true;

          const tune = (mat: THREE.Material) => {
            mat.transparent = false;
            mat.depthWrite = true;
            mat.depthTest = true;
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.roughness = 0.36;
              mat.metalness = 0.08;
              if (mat.name === "1011") {
                // Outer shell: pristine satin ceramic white
                mat.color.setHex(0xf8fafc);
              } else if (mat.name === "1001") {
                // Sticks & action buttons: deep obsidian black
                mat.roughness = 0.52;
              } else if (mat.name === "1002") {
                // Touchpad & accents: high-tech matte slate
                mat.roughness = 0.4;
              }
              mat.needsUpdate = true;
            }
          };

          if (Array.isArray(m.material)) {
            m.material.forEach(tune);
          } else if (m.material) {
            tune(m.material);
          }
        }
      });

      psController.add(model);
    },
    undefined,
    (err) => {
      console.error("Error loading /models/ps5-controller.glb:", err);
    }
  );

  // 4. Micro Atmospheric Dust Particles
  const pCount = 35;
  const pGeom = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let p = 0; p < pCount; p++) {
    pPos[p * 3] = (Math.random() - 0.5) * 4.8;
    pPos[p * 3 + 1] = Math.random() * 3.0 - 1.2;
    pPos[p * 3 + 2] = (Math.random() - 0.5) * 3.8;
  }
  pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const particles = new THREE.Points(
    pGeom,
    new THREE.PointsMaterial({ size: 0.022, color: 0x38bdf8, transparent: true, opacity: 0.35 })
  );
  group.add(particles);

  return {
    group,
    update: (t: number) => {
      // Subtle cinematic micro-buoyancy floating motion
      psController.position.y = 0.15 + Math.sin(t * 1.5) * 0.025;
      haloArc.rotation.z = t * 0.05;
      particles.rotation.y = t * 0.025;
    },
  };
}

// =========================================================================
// 2. MODEL TJKT: Ultra-Dense Cisco Enterprise Blade Rack & Phased Radar Array
// =========================================================================
function buildTJKTGroup(): { group: THREE.Group; update: (t: number) => void } {
  const group = new THREE.Group();

  // Materials
  const rackSteel = new THREE.MeshStandardMaterial({
    color: 0x091224,
    metalness: 0.95,
    roughness: 0.2,
  });

  const brushedSilver = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.9,
    roughness: 0.15,
  });

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    metalness: 0.95,
    roughness: 0.2,
  });

  const ciscoBlue = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.8,
  });

  // A. Main Enterprise 4U Server Chassis Box
  const chassisGeom = new THREE.BoxGeometry(2.6, 2.5, 2.0);
  const chassis = new THREE.Mesh(chassisGeom, rackSteel);
  group.add(chassis);

  // Chassis Rack Ears with Screws
  const earGeom = new THREE.BoxGeometry(0.18, 2.5, 0.06);
  const earLeft = new THREE.Mesh(earGeom, brushedSilver);
  earLeft.position.set(-1.39, 0, 1.02);
  const earRight = earLeft.clone();
  earRight.position.set(1.39, 0, 1.02);
  group.add(earLeft);
  group.add(earRight);

  // B. 4 High-Density Server Blades with Front Grilles
  const leds: { mesh: THREE.Mesh; seed: number }[] = [];
  const ledBoxGeom = new THREE.BoxGeometry(0.04, 0.04, 0.02);

  const ledColors = [0x22c55e, 0x38bdf8, 0xfacc15, 0xef4444];
  const ledMaterials = ledColors.map(
    (c) => new THREE.MeshBasicMaterial({ color: c })
  );

  for (let b = 0; b < 4; b++) {
    const by = 0.85 - b * 0.58;

    // Blade tray
    const tray = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.5, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 })
    );
    tray.position.set(0, by, 1.04);
    group.add(tray);

    // Dual Aluminum Heatsinks with Fine Cooling Fins
    for (let hs = 0; hs < 2; hs++) {
      const hsX = -0.7 + hs * 1.4;
      const finCount = 8;
      for (let f = 0; f < finCount; f++) {
        const fin = new THREE.Mesh(
          new THREE.BoxGeometry(0.35, 0.32, 0.015),
          brushedSilver
        );
        fin.position.set(hsX, by, 1.1 + f * 0.025);
        group.add(fin);
      }
      // Copper heat pipe through fins
      const pipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.38, 12),
        copperMat
      );
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(hsX, by, 1.2);
      group.add(pipe);
    }

    // 24 RJ-45 Gigabit Ports (2 rows of 12)
    for (let row = 0; row < 2; row++) {
      for (let p = 0; p < 12; p++) {
        const px = -0.7 + p * 0.12;
        const py = by + 0.1 - row * 0.16;

        const port = new THREE.Mesh(
          new THREE.BoxGeometry(0.09, 0.08, 0.03),
          new THREE.MeshStandardMaterial({ color: 0x020617, metalness: 0.9 })
        );
        port.position.set(px, py, 1.1);
        group.add(port);

        // Individual Port Activity LED
        const ledMat = ledMaterials[(p + row + b) % ledMaterials.length];
        const led = new THREE.Mesh(ledBoxGeom, ledMat);
        led.position.set(px, py + 0.055, 1.12);
        group.add(led);
        leds.push({ mesh: led, seed: p * 3 + b * 7 + row });
      }
    }
  }

  // C. 3 Curved Cat6A & Fiber Optic Patch Cables
  const cableMat1 = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 });
  const cableMat2 = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 });

  const curves = [
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.6, 0.85, 1.15),
      new THREE.Vector3(-0.95, 0.4, 1.5),
      new THREE.Vector3(-0.4, -0.3, 1.15),
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.4, 0.85, 1.15),
      new THREE.Vector3(0.85, 0.2, 1.55),
      new THREE.Vector3(0.2, -0.85, 1.15),
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.2, 0.3, 1.15),
      new THREE.Vector3(-0.6, -0.2, 1.45),
      new THREE.Vector3(-0.1, -0.85, 1.15),
    ]),
  ];

  curves.forEach((c, idx) => {
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(c, 24, 0.035, 8, false),
      idx % 2 === 0 ? cableMat1 : cableMat2
    );
    group.add(tube);
  });

  // D. Phased Array Satellite Tower & Concentric Frequency Wave Rings
  const towerGeom = new THREE.CylinderGeometry(0.12, 0.25, 0.9, 16);
  const tower = new THREE.Mesh(towerGeom, brushedSilver);
  tower.position.set(0, 1.7, 0);
  group.add(tower);

  const dishGeom = new THREE.CylinderGeometry(0.7, 0.2, 0.2, 32);
  const dish = new THREE.Mesh(dishGeom, ciscoBlue);
  dish.position.set(0, 2.15, 0);
  group.add(dish);

  // 3 Concentric Hologram Radar Waves
  const waves: THREE.Mesh[] = [];
  const waveGeom = new THREE.RingGeometry(0.9, 0.96, 32);
  const waveMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7,
  });

  for (let w = 0; w < 3; w++) {
    const wave = new THREE.Mesh(waveGeom, waveMat);
    wave.rotation.x = -Math.PI / 2;
    wave.position.set(0, 2.3 + w * 0.3, 0);
    group.add(wave);
    waves.push(wave);
  }

  // Floating Cisco Network Packet Data Cubes
  const packetCount = 8;
  const packets: THREE.Mesh[] = [];
  const packetGeom = new THREE.BoxGeometry(0.14, 0.14, 0.14);
  const packetMat = new THREE.MeshStandardMaterial({
    color: 0x60a5fa,
    emissive: 0x2563eb,
    emissiveIntensity: 0.9,
  });
  for (let i = 0; i < packetCount; i++) {
    const pMesh = new THREE.Mesh(packetGeom, packetMat);
    group.add(pMesh);
    packets.push(pMesh);
  }

  return {
    group,
    update: (t: number) => {
      // Blinking network traffic simulation
      leds.forEach((l) => {
        l.mesh.visible = Math.sin(t * 15 + l.seed * 2.3) > -0.2;
      });

      // Expanding radar wave rings
      waves.forEach((w, idx) => {
        const phase = (t * 2 + idx * 0.7) % 3;
        const scale = 0.8 + phase * 0.6;
        w.scale.set(scale, scale, 1);
        (w.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.9 - phase * 0.3);
      });

      // Orbiting packet cubes
      packets.forEach((p, idx) => {
        const ang = t * 1.5 + (idx * Math.PI * 2) / packetCount;
        const rad = 2.0 + Math.sin(t * 2 + idx) * 0.2;
        p.position.set(Math.cos(ang) * rad, Math.sin(t * 3 + idx) * 0.8, Math.sin(ang) * rad);
        p.rotation.x = t * 2;
        p.rotation.y = t * 2;
      });
    },
  };
}

// =========================================================================
// 3. MODEL AKL: Chronos Vault & Minted 3D Bitcoin ₿ Bullion Medallion
// =========================================================================
function buildAKLGroup(): { group: THREE.Group; update: (t: number) => void } {
  const group = new THREE.Group();

  // Materials
  const heavySteel = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.95,
    roughness: 0.15,
  });

  const polishedGold = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xb45309,
    emissiveIntensity: 0.35,
    metalness: 0.98,
    roughness: 0.1,
  });

  const btcGoldRelief = new THREE.MeshStandardMaterial({
    color: 0xfffbeb,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.6,
    metalness: 0.98,
    roughness: 0.08,
  });

  const crystalGlass = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.6,
    metalness: 0.7,
    roughness: 0.15,
    transparent: true,
    opacity: 0.85,
  });

  // A. Heavy Vault Outer Blast Ring
  const blastRingGeom = new THREE.TorusGeometry(1.7, 0.14, 16, 64);
  const blastRing = new THREE.Mesh(blastRingGeom, heavySteel);
  blastRing.position.set(0, 0.4, -0.2);
  group.add(blastRing);

  // 12 Locking Bolt Pistons along circumference
  const pistons: THREE.Mesh[] = [];
  const pistonGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.45, 16);
  for (let i = 0; i < 12; i++) {
    const pMesh = new THREE.Mesh(pistonGeom, polishedGold);
    const angle = (i * Math.PI * 2) / 12;
    pMesh.position.set(Math.cos(angle) * 1.7, Math.sin(angle) * 1.7 + 0.4, -0.2);
    pMesh.rotation.z = angle + Math.PI / 2;
    group.add(pMesh);
    pistons.push(pMesh);
  }

  // 8-Spoke Heavy Vault Wheel
  const wheelGroup = new THREE.Group();
  wheelGroup.position.set(0, 0.4, -0.15);
  group.add(wheelGroup);

  const wheelCenter = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, 0.2, 32),
    polishedGold
  );
  wheelCenter.rotation.x = Math.PI / 2;
  wheelGroup.add(wheelCenter);

  const spokeGeom = new THREE.CylinderGeometry(0.045, 0.045, 3.1, 16);
  for (let s = 0; s < 4; s++) {
    const spoke = new THREE.Mesh(spokeGeom, heavySteel);
    spoke.rotation.z = (s * Math.PI) / 4;
    wheelGroup.add(spoke);
  }

  // B. Master Coin Group with Minted Bitcoin Texture & 3D Physical Relief
  const coinMasterGroup = new THREE.Group();
  coinMasterGroup.position.set(0, 0.4, 0.25);
  group.add(coinMasterGroup);

  // 1. Base Cylinder
  const coinGeom = new THREE.CylinderGeometry(1.05, 1.05, 0.18, 48);
  const coin = new THREE.Mesh(coinGeom, polishedGold);
  coin.rotation.x = Math.PI / 2;
  coinMasterGroup.add(coin);

  // 2. Reeded Edge Ring (64 teeth)
  const reededGeom = new THREE.TorusGeometry(1.07, 0.035, 8, 64);
  const reededRing = new THREE.Mesh(reededGeom, polishedGold);
  coinMasterGroup.add(reededRing);

  // 3. Minted Bitcoin Canvas Texture Face
  const btcTex = createBitcoinTexture();
  const faceMat = new THREE.MeshStandardMaterial({
    map: btcTex,
    metalness: 0.95,
    roughness: 0.15,
  });
  const faceFront = new THREE.Mesh(new THREE.CircleGeometry(1.04, 48), faceMat);
  faceFront.position.set(0, 0, 0.095);
  coinMasterGroup.add(faceFront);

  const faceBack = new THREE.Mesh(new THREE.CircleGeometry(1.04, 48), faceMat);
  faceBack.position.set(0, 0, -0.095);
  faceBack.rotation.y = Math.PI;
  coinMasterGroup.add(faceBack);

  // 4. Physical 3D Raised Bitcoin ₿ Monogram Relief (Front face)
  const btc3D = new THREE.Group();
  btc3D.position.set(0, 0, 0.11);
  btc3D.rotation.z = -(14 * Math.PI) / 180; // 14-deg Bitcoin tilt
  coinMasterGroup.add(btc3D);

  // Vertical spine
  const btcSpine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.76, 0.04), btcGoldRelief);
  btcSpine.position.x = -0.16;
  btc3D.add(btcSpine);

  // Dual Top Hash Serifs
  const topH1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.04), btcGoldRelief);
  topH1.position.set(-0.06, 0.44, 0);
  const topH2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.04), btcGoldRelief);
  topH2.position.set(0.07, 0.44, 0);
  btc3D.add(topH1);
  btc3D.add(topH2);

  // Dual Bottom Hash Serifs
  const botH1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.04), btcGoldRelief);
  botH1.position.set(-0.06, -0.44, 0);
  const botH2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.04), btcGoldRelief);
  botH2.position.set(0.07, -0.44, 0);
  btc3D.add(botH1);
  btc3D.add(botH2);

  // Upper Loop
  const topLoop = new THREE.Mesh(
    new THREE.TorusGeometry(0.19, 0.05, 12, 24, Math.PI),
    btcGoldRelief
  );
  topLoop.position.set(-0.05, 0.18, 0);
  topLoop.rotation.z = -Math.PI / 2;
  btc3D.add(topLoop);

  // Lower Loop (slightly wider)
  const botLoop = new THREE.Mesh(
    new THREE.TorusGeometry(0.22, 0.055, 12, 24, Math.PI),
    btcGoldRelief
  );
  botLoop.position.set(-0.04, -0.18, 0);
  botLoop.rotation.z = -Math.PI / 2;
  btc3D.add(botLoop);

  // 3 Horizontal Crossbars
  const cBarT = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.05, 0.04), btcGoldRelief);
  cBarT.position.set(-0.05, 0.36, 0);
  const cBarM = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.05, 0.04), btcGoldRelief);
  cBarM.position.set(-0.04, 0.0, 0);
  const cBarB = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.05, 0.04), btcGoldRelief);
  cBarB.position.set(-0.03, -0.36, 0);
  btc3D.add(cBarT);
  btc3D.add(cBarM);
  btc3D.add(cBarB);

  // C. Kinetic 16-Pillar Harmonic Financial Matrix (4x4 3D Grid)
  const pillars: { mesh: THREE.Mesh; row: number; col: number }[] = [];
  const pillarGeom = new THREE.BoxGeometry(0.24, 1.0, 0.24);

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const px = -0.9 + c * 0.6;
      const pz = 0.5 + r * 0.4;
      const pMesh = new THREE.Mesh(pillarGeom, crystalGlass);
      pMesh.position.set(px, -0.8, pz);
      group.add(pMesh);
      pillars.push({ mesh: pMesh, row: r, col: c });
    }
  }

  // D. Shimmering Golden Dust Currency Spark Particles
  const sparkCount = 140;
  const sparkGeom = new THREE.BufferGeometry();
  const sparkPos = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount; i++) {
    sparkPos[i * 3] = (Math.random() - 0.5) * 4.2;
    sparkPos[i * 3 + 1] = Math.random() * 3.5 - 1.2;
    sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
  }
  sparkGeom.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
  const sparkPoints = new THREE.Points(
    sparkGeom,
    new THREE.PointsMaterial({ size: 0.05, color: 0xfde047, transparent: true, opacity: 0.85 })
  );
  group.add(sparkPoints);

  return {
    group,
    update: (t: number) => {
      // Rotating vault wheel & coin
      wheelGroup.rotation.z = t * 0.4;
      coinMasterGroup.rotation.z = t * 1.5;

      // Piston locking bolts breathing in and out
      pistons.forEach((p, idx) => {
        const angle = (idx * Math.PI * 2) / 12;
        const breath = 1.7 + Math.sin(t * 3 + idx * 0.5) * 0.12;
        p.position.set(Math.cos(angle) * breath, Math.sin(angle) * breath + 0.4, -0.2);
      });

      // Harmonic undulating wave through the 16 pillars
      pillars.forEach((p) => {
        const wave = Math.sin(t * 3.5 + p.row * 0.8 + p.col * 0.6) * 0.5 + 0.8;
        p.mesh.scale.set(1, wave * 1.4, 1);
        p.mesh.position.y = -0.9 + (wave * 1.4) / 2;
      });

      sparkPoints.rotation.y = t * 0.25;
    },
  };
}

// =========================================================================
// 4. MODEL AXIOO: Axioo Quantum Motherboard Architecture & Micro-Components
// =========================================================================
function buildAXIOOGroup(): { group: THREE.Group; update: (t: number) => void } {
  const group = new THREE.Group();

  // Materials
  const pcbFiber = new THREE.MeshStandardMaterial({
    color: 0x140308,
    metalness: 0.6,
    roughness: 0.4,
  });

  const brushedSilver = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.95,
    roughness: 0.15,
  });

  const roseGlow = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    emissive: 0xe11d48,
    emissiveIntensity: 0.9,
    metalness: 0.8,
  });

  const chipGold = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    metalness: 0.95,
    roughness: 0.1,
  });

  // A. Motherboard PCB Slab with Solder Traces
  const pcbGeom = new THREE.BoxGeometry(3.2, 0.14, 3.2);
  const pcb = new THREE.Mesh(pcbGeom, pcbFiber);
  group.add(pcb);

  // B. LGA 1700 Socket Base with Locking Lever Arm
  const socketBase = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.08, 1.6),
    new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85 })
  );
  socketBase.position.set(-0.2, 0.11, 0);
  group.add(socketBase);

  // Socket Tension Lever Arm
  const lever = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 1.7, 12),
    brushedSilver
  );
  lever.rotation.x = Math.PI / 2;
  lever.position.set(0.65, 0.15, 0);
  group.add(lever);

  // C. Axioo HYPE Integrated Heat Spreader (IHS) CPU Core
  const ihsGeom = new THREE.BoxGeometry(1.3, 0.12, 1.3);
  const ihs = new THREE.Mesh(ihsGeom, brushedSilver);
  ihs.position.set(-0.2, 0.21, 0);
  group.add(ihs);

  // Golden Corner Pin Marker
  const pin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.13, 0.12), chipGold);
  pin.position.set(-0.75, 0.21, -0.55);
  group.add(pin);

  // D. Liquid Cooling AIO Turbine Block & 7-Blade Spinning Rotor (Above CPU)
  const turbineHousing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.65, 0.25, 32),
    new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
    })
  );
  turbineHousing.position.set(-0.2, 0.45, 0);
  group.add(turbineHousing);

  const rotorGroup = new THREE.Group();
  rotorGroup.position.set(-0.2, 0.45, 0);
  group.add(rotorGroup);

  const rotorHub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.15, 16),
    chipGold
  );
  rotorGroup.add(rotorHub);

  for (let b = 0; b < 7; b++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.03, 0.12), roseGlow);
    const angle = (b * Math.PI * 2) / 7;
    blade.position.set(Math.cos(angle) * 0.35, 0, Math.sin(angle) * 0.35);
    blade.rotation.y = angle + 0.4;
    rotorGroup.add(blade);
  }

  // E. 4 High-Speed DDR5 RAM Modules
  const ramArmors: THREE.Mesh[] = [];
  const rgbDiffusers: THREE.Mesh[] = [];

  for (let r = 0; r < 4; r++) {
    const rx = 0.85 + r * 0.22;

    const slot = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.06, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x020617 })
    );
    slot.position.set(rx, 0.1, 0);
    group.add(slot);

    const ramMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.75, 1.7),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.2 })
    );
    ramMesh.position.set(rx, 0.48, 0);
    group.add(ramMesh);
    ramArmors.push(ramMesh);

    const rgbMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.1, 1.7),
      new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        emissive: 0xf43f5e,
        emissiveIntensity: 1.0,
      })
    );
    rgbMesh.position.set(rx, 0.88, 0);
    group.add(rgbMesh);
    rgbDiffusers.push(rgbMesh);
  }

  // F. 28 Micro SMD Components
  const capGeom = new THREE.BoxGeometry(0.08, 0.08, 0.08);
  const capMat1 = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8 });
  const capMat2 = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 });

  for (let c = 0; c < 28; c++) {
    const cx = -1.2 + (c % 7) * 0.14;
    const cz = -1.1 + Math.floor(c / 7) * 0.25;
    const cMesh = new THREE.Mesh(capGeom, c % 2 === 0 ? capMat1 : capMat2);
    cMesh.position.set(cx, 0.12, cz);
    group.add(cMesh);
  }

  // G. PCIe 5.0 x16 Shielded Armor Slot
  const pcieSlot = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.18, 0.15),
    brushedSilver
  );
  pcieSlot.position.set(-0.1, 0.16, 1.15);
  group.add(pcieSlot);

  // Pulsing Neon Circuit Lines
  const traceCount = 6;
  const traces: THREE.Mesh[] = [];
  const traceGeom = new THREE.BoxGeometry(0.6, 0.02, 0.04);
  const traceMat = new THREE.MeshBasicMaterial({ color: 0xfb7185 });

  for (let t = 0; t < traceCount; t++) {
    const tr = new THREE.Mesh(traceGeom, traceMat);
    tr.position.set(-0.8 + (t % 3) * 0.6, 0.08, 0.7 + Math.floor(t / 3) * 0.25);
    group.add(tr);
    traces.push(tr);
  }

  return {
    group,
    update: (t: number) => {
      rotorGroup.rotation.y = t * 8.5;

      rgbDiffusers.forEach((rgb, idx) => {
        const glow = 0.5 + Math.sin(t * 4 + idx * 0.8) * 0.5;
        (rgb.material as THREE.MeshStandardMaterial).emissiveIntensity = glow * 1.4;
      });

      traces.forEach((tr, idx) => {
        tr.visible = Math.sin(t * 5 + idx * 1.5) > -0.2;
      });
    },
  };
}

// =========================================================================
// Main Container & Dynamic Scene Controller
// =========================================================================
interface HeroTechShowcase3DProps {
  headerRight?: React.ReactNode;
}

export function HeroTechShowcase3D({ headerRight }: HeroTechShowcase3DProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMajor, setActiveMajor] = useState<string>("PPLG");
  const [isRotating, setIsRotating] = useState(false);

  const groupsRef = useRef<Record<string, { group: THREE.Group; update: (t: number) => void }>>({});
  const activeMajorRef = useRef<string>("PPLG");
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const holoRingRef = useRef<THREE.Mesh | null>(null);

  const major = MAJORS_CONFIG[activeMajor] || MAJORS_CONFIG.PPLG;
  const MajorIcon = major.icon;

  useEffect(() => {
    activeMajorRef.current = activeMajor;
  }, [activeMajor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = container.clientWidth < 640;
    const baseZ = isMobile ? 9.2 : 8.0;
    let targetCameraZ = baseZ;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    // Backed up camera position (z: 8.0) to frame the full 3D models with generous margins
    camera.position.set(0, 2.5, baseZ);
    camera.lookAt(0, 0.25, 0);

    // WebGL Renderer with ACES Filmic Tone Mapping for AAA CGI Studio Visuals
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.14;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Master Pivot Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // AAA Studio Lighting (CGI Product Photography Rig)
    // 1. Ambient: Clean dark-navy shadow fill (no washed-out whites)
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.1);
    scene.add(ambientLight);

    // 2. Key Light: Soft, high-angle neutral white frontal studio key
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4.5, 6.0, 5.0);
    scene.add(keyLight);

    // 3. Fill Light: Soft cool-grey fill from opposite side
    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 0.75);
    fillLight.position.set(-4.0, 2.5, 3.5);
    scene.add(fillLight);

    // 4. Cyan / Teal Rim Light: Crisp edge separation against dark navy background
    const rimTealLight = new THREE.DirectionalLight(0x06b6d4, 2.8);
    rimTealLight.position.set(-5.0, 4.0, -4.5);
    scene.add(rimTealLight);

    // 5. Cool Kicker Light: Secondary silhouette edge kicker
    const kickerLight = new THREE.DirectionalLight(0x64748b, 1.2);
    kickerLight.position.set(4.5, 2.5, -4.0);
    scene.add(kickerLight);

    // 6. Subtle Under-fill Accent Light (PPLG Green / Major Accent, subtle bounce)
    const themeLight = new THREE.PointLight(major.accentNumber, 1.6, 8);
    themeLight.position.set(0, -1.8, 2.2);
    scene.add(themeLight);
    pointLightRef.current = themeLight;

    // Outer Studio Pedestal Halo Ring (Subtle Architectural Grounding, 12% opacity)
    const holoRing = new THREE.Mesh(
      new THREE.RingGeometry(2.55, 2.65, 64),
      new THREE.MeshBasicMaterial({
        color: major.accentNumber,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.12,
      })
    );
    holoRing.rotation.x = -Math.PI / 2;
    holoRing.position.y = -1.35;
    scene.add(holoRing);
    holoRingRef.current = holoRing;

    // Build the 4 Ultra-Detailed 3D Models
    const pplg = buildPPLGGroup();
    const tjkt = buildTJKTGroup();
    const akl = buildAKLGroup();
    const axioo = buildAXIOOGroup();

    masterGroup.add(pplg.group);
    masterGroup.add(tjkt.group);
    masterGroup.add(akl.group);
    masterGroup.add(axioo.group);

    pplg.group.scale.set(1, 1, 1);
    tjkt.group.scale.set(0, 0, 0);
    akl.group.scale.set(0, 0, 0);
    axioo.group.scale.set(0, 0, 0);

    groupsRef.current = {
      PPLG: pplg,
      TJKT: tjkt,
      AKL: akl,
      AXIOO: axioo,
    };

    // Mouse Drag Rotation
    let targetRotY = -0.25;
    let targetRotX = 0.12;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsRotating(true);
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevX = cx;
      prevY = cy;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      const cy = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const dx = cx - prevX;
        const dy = cy - prevY;
        targetRotY += dx * 0.008;
        targetRotX = Math.max(-0.4, Math.min(0.55, targetRotX + dy * 0.006));
        prevX = cx;
        prevY = cy;
      } else {
        const rect = container.getBoundingClientRect();
        const nx = ((cx - rect.left) / rect.width) * 2 - 1;
        const ny = -(((cy - rect.top) / rect.height) * 2 - 1);
        targetRotY = -0.25 + nx * 0.38;
        targetRotX = 0.12 - ny * 0.22;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsRotating(false), 500);
    };

    container.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    container.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      targetCameraZ = w < 640 ? 9.2 : 8.0;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Mouse wheel zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetCameraZ = Math.max(5.8, Math.min(11.0, targetCameraZ + e.deltaY * 0.005));
    };
    container.addEventListener("wheel", handleWheel, { passive: false });

    // Animation Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const currentActive = activeMajorRef.current;

      // Smooth camera zoom
      camera.position.z += (targetCameraZ - camera.position.z) * 0.08;

      // Smooth lerp rotation & gentle bobbing
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.07;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.07;
      masterGroup.position.y = Math.sin(elapsed * 1.5) * 0.045;

      // Morphing Scale Transitions
      Object.keys(groupsRef.current).forEach((key) => {
        const item = groupsRef.current[key];
        const isCurrent = key === currentActive;
        const targetScale = isCurrent ? 1 : 0;

        const curScale = item.group.scale.x;
        const newScale = THREE.MathUtils.lerp(curScale, targetScale, 0.14);
        item.group.scale.set(newScale, newScale, newScale);

        item.group.visible = newScale > 0.01;

        if (item.group.visible) {
          item.update(elapsed);
        }
      });

      holoRing.rotation.z = elapsed * 0.15;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();

      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);

      container.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      holoRing.geometry.dispose();
    };
  }, []);

  // Update theme light & pedestal ring color on major change
  useEffect(() => {
    const config = MAJORS_CONFIG[activeMajor] || MAJORS_CONFIG.PPLG;
    if (pointLightRef.current) {
      pointLightRef.current.color.setHex(config.accentNumber);
    }
    if (holoRingRef.current) {
      (holoRingRef.current.material as THREE.MeshBasicMaterial).color.setHex(config.accentNumber);
    }
  }, [activeMajor]);

  return (
    <div className="relative w-full h-[470px] lg:h-[510px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/90 shadow-2xl flex flex-col justify-between group select-none">
      {/* Studio Backdrop Vignette & Subtle Atmospheric Rim Glow (Deep Navy/Near-Black) */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-1000 opacity-15"
        style={{ backgroundColor: major.accentHex }}
      />
      <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-950/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-slate-900/60 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing w-full h-full"
      />

      {/* Top Header Row: Left Badge + Right Controls (Unified, Zero Collision) */}
      <div className="relative z-10 p-3.5 sm:p-5 flex items-center justify-between gap-2 sm:gap-4 pointer-events-none">
        {/* Left: Compact Major Model Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs text-white shadow-lg pointer-events-auto min-w-0 max-w-[190px] xs:max-w-[230px] sm:max-w-xs md:max-w-sm">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: major.accentHex }}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[11px] sm:text-xs tracking-wide truncate">
              {major.code}: {major.modelTitle}
            </span>
            <span className="text-[9px] text-slate-400 truncate hidden sm:inline">
              {major.subtitle}
            </span>
          </div>
        </div>

        {/* Right side: View Switcher injected safely into this exact same row */}
        <div className="pointer-events-auto shrink-0 flex items-center gap-2">
          {headerRight ? (
            headerRight
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/75 backdrop-blur-md border border-slate-800 text-[10px] text-slate-300">
              <RotateCw
                className="w-3 h-3 text-blue-400 animate-spin"
                style={{ animationDuration: "8s" }}
              />
              <span>Putar 360°</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Interactive Vocational Selector & Details */}
      <div className="relative z-10 p-5 space-y-3 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-12">
        {/* 4 Official Majors Switcher Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(MAJORS_CONFIG).map((key) => {
            const item = MAJORS_CONFIG[key];
            const Icon = item.icon;
            const isActive = activeMajor === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveMajor(key)}
                className={`py-2 px-2 rounded-xl flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-800 text-white border-2 shadow-lg scale-[1.03]"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800"
                }`}
                style={{
                  borderColor: isActive ? item.accentHex : undefined,
                  boxShadow: isActive ? `0 0 20px ${item.accentHex}40` : undefined,
                }}
              >
                <Icon
                  className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110"
                  style={{ color: isActive ? item.accentHex : undefined }}
                />
                <span className="tracking-wider text-[11px] sm:text-xs">
                  {item.code}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Major Live Specs Bar */}
        <div className="p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center justify-between gap-3 shadow-xl">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs truncate">
                {major.name}
              </span>
              <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                {major.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              {major.tagline}
            </p>
          </div>

          <Link
            href={major.link}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all shrink-0 hover:opacity-90 shadow"
            style={{ backgroundColor: major.accentHex }}
          >
            <span>Eksplor</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
