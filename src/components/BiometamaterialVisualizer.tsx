import { useEffect, useRef } from "react";
import * as THREE from "three";

interface LabelProps {
  id: string;
  text: string;
  localPos: THREE.Vector3;
  dx: number;
  dy: number;
}

export default function BiometamaterialVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Responsive configuration: reduce elements on mobile for buttery smooth 60fps
    const isMobile = window.innerWidth < 768;

    // Scene & Fog Configuration mapping dark navy background matching the homepage
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b14, 0.05);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 11;

    // WebGL Renderer with transparency support
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Handle container bounds resizing
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);

    // 3D root group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Light Setup (Premium biomedical aesthetic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 5, 4);
    scene.add(mainLight);

    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 1.8);
    cyanLight.position.set(-5, -3, 3);
    scene.add(cyanLight);

    const crimsonLight = new THREE.PointLight(0xe40428, 3.5, 12);
    crimsonLight.position.set(0, 0, 0);
    rootGroup.add(crimsonLight);

    // 1. Central Biometamaterial Scaffolding Mesh (Low-opacity, structured)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreWireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const coreWireframe = new THREE.Mesh(coreGeo, coreWireframeMat);
    rootGroup.add(coreWireframe);

    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x071125,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 0.35,
      shininess: 90,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Glowing Photonic Waveguide Curves (Helical fibers)
    const fiberCurves: THREE.CatmullRomCurve3[] = [];
    const fiberGroup = new THREE.Group();
    rootGroup.add(fiberGroup);

    const numFibers = isMobile ? 4 : 6;
    const fiberColors = [0xe40428, 0x38bdf8, 0x0ea5e9, 0xf43f5e, 0x38bdf8, 0xffffff];

    for (let i = 0; i < numFibers; i++) {
      const points: THREE.Vector3[] = [];
      const numPoints = 18;
      const baseRadius = 2.0 + (i * 0.18);
      const thetaOffset = (i * Math.PI * 2) / numFibers;

      for (let j = 0; j <= numPoints; j++) {
        const t = j / numPoints;
        const angle = t * Math.PI * 2 * 1.4 + thetaOffset;
        const height = (t - 0.5) * 4.6;

        // Wave modulation for organic texture
        const radius = baseRadius + Math.sin(t * Math.PI * 3.5) * 0.4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = height + Math.cos(t * Math.PI * 2.5) * 0.2;

        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      fiberCurves.push(curve);

      // Render tube (optical waveguide)
      const tubeGeo = new THREE.TubeGeometry(curve, 50, 0.035, 6, false);
      const tubeMat = new THREE.MeshPhongMaterial({
        color: fiberColors[i % fiberColors.length],
        transparent: true,
        opacity: 0.22,
        shininess: 120,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      fiberGroup.add(tubeMesh);

      // Render thin glowing line
      const pathPoints = curve.getPoints(80);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: fiberColors[i % fiberColors.length],
        transparent: true,
        opacity: 0.45,
      });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      fiberGroup.add(lineMesh);
    }

    // 3. Guided Photonic Particles (Light transport)
    const particles: {
      mesh: THREE.Mesh;
      curve: THREE.CatmullRomCurve3;
      speed: number;
      progress: number;
      baseScale: number;
    }[] = [];

    const particleGroup = new THREE.Group();
    rootGroup.add(particleGroup);

    const numParticlesPerFiber = isMobile ? 2 : 3;

    fiberCurves.forEach((curve, curveIndex) => {
      const color = fiberColors[curveIndex % fiberColors.length];
      for (let p = 0; p < numParticlesPerFiber; p++) {
        const pGeo = new THREE.SphereGeometry(0.055, 8, 8);
        const pMat = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.95,
        });
        const pMesh = new THREE.Mesh(pGeo, pMat);

        const progress = p / numParticlesPerFiber + Math.random() * 0.15;
        const speed = 0.0035 + Math.random() * 0.003;

        particleGroup.add(pMesh);
        particles.push({
          mesh: pMesh,
          curve,
          speed,
          progress: progress % 1.0,
          baseScale: 0.95 + Math.random() * 0.4,
        });
      }
    });

    // 4. Background Pore Particles (Floating and organic)
    const ambientParticleCount = isMobile ? 35 : 100;
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPositions = new Float32Array(ambientParticleCount * 3);
    const ambientSpeeds: number[] = [];
    const ambientPhases: number[] = [];

    for (let i = 0; i < ambientParticleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.2 + Math.random() * 2.6;

      ambientPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      ambientPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      ambientPositions[i * 3 + 2] = r * Math.cos(phi);

      ambientSpeeds.push(0.6 + Math.random() * 1.4);
      ambientPhases.push(Math.random() * Math.PI * 2);
    }

    ambientGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(ambientPositions, 3)
    );
    const ambientMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const ambientPoints = new THREE.Points(ambientGeo, ambientMat);
    rootGroup.add(ambientPoints);

    // 5. Resonance Wave Shells (Light propagation)
    const pulseGroup = new THREE.Group();
    rootGroup.add(pulseGroup);

    const pulseShells: {
      mesh: THREE.Mesh;
      scale: number;
      speed: number;
    }[] = [];

    const numPulses = 2;
    for (let s = 0; s < numPulses; s++) {
      const pulseGeo = new THREE.IcosahedronGeometry(1.5, 2);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xe40428,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.scale.setScalar(1.0 + s * 0.6);
      pulseGroup.add(pulseMesh);

      pulseShells.push({
        mesh: pulseMesh,
        scale: 1.0 + s * 0.6,
        speed: 0.004,
      });
    }

    // Interactive mouse trackers
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    let speedMultiplier = 1.0;
    let targetSpeedMultiplier = 1.0;
    let intensityMultiplier = 1.0;
    let targetIntensityMultiplier = 1.0;

    const handleMouseEnter = () => {
      targetSpeedMultiplier = 2.4;
      targetIntensityMultiplier = 1.7;
    };

    const handleMouseLeave = () => {
      targetSpeedMultiplier = 1.0;
      targetIntensityMultiplier = 1.0;
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // 6. Projective HUD labels coordinates
    const labelDataList: LabelProps[] = [
      {
        id: "confinement",
        text: "Light Confinement",
        localPos: new THREE.Vector3(-1.4, 1.4, 0.4),
        dx: -48,
        dy: -24,
      },
      {
        id: "biometamaterials",
        text: "Biometamaterials",
        localPos: new THREE.Vector3(1.7, 0.3, -0.3),
        dx: 48,
        dy: -12,
      },
      {
        id: "precision",
        text: "Precision Medicine",
        localPos: new THREE.Vector3(-0.6, -1.5, 0.5),
        dx: -48,
        dy: 24,
      },
    ];

    // Main animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Damp parameters
      speedMultiplier = THREE.MathUtils.lerp(
        speedMultiplier,
        targetSpeedMultiplier,
        0.05
      );
      intensityMultiplier = THREE.MathUtils.lerp(
        intensityMultiplier,
        targetIntensityMultiplier,
        0.05
      );

      // Slowly rotate root group automatically
      rootGroup.rotation.y += 0.0022;
      rootGroup.rotation.x += 0.0011;

      // Smooth mouse follow interaction
      mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.05);
      mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.05);

      // Dynamically rotate/tilt the camera viewing angle based on mouse coordinates (Holographic Parallax)
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 3.5, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 3.5, 0.05);
      camera.lookAt(0, 0, 0);

      // Animate spline-guided photonic particles
      particles.forEach((p) => {
        p.progress += p.speed * speedMultiplier;
        if (p.progress > 1.0) {
          p.progress = 0.0;
        }

        const position = p.curve.getPointAt(p.progress);
        p.mesh.position.copy(position);

        const pulse =
          Math.sin(Date.now() * 0.005 + p.progress * Math.PI * 4) * 0.18 + 0.9;
        p.mesh.scale.setScalar(
          p.baseScale * pulse * (0.85 + intensityMultiplier * 0.15)
        );

        const mat = p.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.8 + (intensityMultiplier - 1.0) * 0.15;
      });

      // Animate background pore cloud drift
      const positions = ambientGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < ambientParticleCount; i++) {
        const index = i * 3;
        const phase = ambientPhases[i];
        const driftSpeed = ambientSpeeds[i] * 0.002;

        positions[index] += Math.sin(Date.now() * driftSpeed + phase) * 0.0012;
        positions[index + 1] +=
          Math.cos(Date.now() * driftSpeed + phase) * 0.0012;
        positions[index + 2] +=
          Math.sin(Date.now() * driftSpeed * 0.5 + phase) * 0.0008;
      }
      ambientGeo.attributes.position.needsUpdate = true;
      ambientPoints.rotation.y -= 0.0004;

      // Animate concentric resonators wavefronts
      pulseShells.forEach((shell) => {
        shell.scale += shell.speed;
        if (shell.scale > 2.2) {
          shell.scale = 1.0;
        }
        shell.mesh.scale.setScalar(shell.scale);

        const ratio = 1.0 - (shell.scale - 1.0) / 1.2;
        const mat = shell.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.15 * ratio * intensityMultiplier;
      });

      // Render graphics
      renderer.render(scene, camera);

      // Perform projections to coordinate overlay HTML labels
      const bounds = container.getBoundingClientRect();
      const rectWidth = bounds.width;
      const rectHeight = bounds.height;

      labelDataList.forEach((lbl) => {
        const localPos = lbl.localPos.clone();
        localPos.applyMatrix4(rootGroup.matrixWorld);
        localPos.project(camera);

        const x = (localPos.x * 0.5 + 0.5) * rectWidth;
        const y = (-(localPos.y * 0.5) + 0.5) * rectHeight;

        const anchorEl = document.getElementById(`anchor-${lbl.id}`);
        const labelEl = document.getElementById(`label-${lbl.id}`);
        const lineEl = document.getElementById(`line-${lbl.id}`);

        if (anchorEl && labelEl && lineEl) {
          anchorEl.style.transform = `translate(${x}px, ${y}px)`;

          let labelX = x + lbl.dx;
          let labelY = y + lbl.dy;

          // Confine loosely within canvas visible dimensions
          labelX = Math.max(10, Math.min(rectWidth - 110, labelX));
          labelY = Math.max(10, Math.min(rectHeight - 24, labelY));

          labelEl.style.transform = `translate(${labelX}px, ${labelY}px)`;

          lineEl.setAttribute("x1", x.toString());
          lineEl.setAttribute("y1", y.toString());
          lineEl.setAttribute("x2", labelX.toString());
          lineEl.setAttribute("y2", labelY.toString());

          // Depth-based fade coefficient
          const zDepth = THREE.MathUtils.clamp(
            (localPos.z + 0.4) * 1.5,
            0,
            1
          );
          const depthOpacity = THREE.MathUtils.lerp(1.0, 0.28, zDepth);

          anchorEl.style.opacity = depthOpacity.toFixed(2);
          labelEl.style.opacity = depthOpacity.toFixed(2);
          lineEl.style.opacity = (depthOpacity * 0.42).toFixed(2);
        }
      });
    };

    animationFrameId = requestAnimationFrame(animate);

    // Safely cleanup all webgl contexts to avoid memory leaks
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);

      coreGeo.dispose();
      coreWireframeMat.dispose();
      coreMat.dispose();
      ambientGeo.dispose();
      ambientMat.dispose();

      fiberGroup.children.forEach((mesh) => {
        if (mesh instanceof THREE.Mesh) {
          mesh.geometry.dispose();
          if (mesh.material instanceof THREE.Material) mesh.material.dispose();
        }
      });

      particles.forEach((p) => {
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
      });

      pulseShells.forEach((shell) => {
        shell.mesh.geometry.dispose();
        (shell.mesh.material as THREE.Material).dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden select-none"
      aria-label="Biometamaterials interactive 3D model"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* SVG Callout Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <linearGradient id="optics-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#e40428" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <line id="line-confinement" stroke="url(#optics-grad)" strokeWidth="1" strokeDasharray="3,3" />
        <line id="line-biometamaterials" stroke="url(#optics-grad)" strokeWidth="1" strokeDasharray="3,3" />
        <line id="line-precision" stroke="url(#optics-grad)" strokeWidth="1" strokeDasharray="3,3" />
      </svg>

      {/* Localized Floating Nodes */}
      <div id="anchor-confinement" className="absolute top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 flex items-center justify-center pointer-events-none z-20">
        <span className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-60" />
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
      </div>
      <div id="anchor-biometamaterials" className="absolute top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 flex items-center justify-center pointer-events-none z-20">
        <span className="absolute w-2.5 h-2.5 rounded-full bg-[#e40428] animate-ping opacity-60" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#e40428]" />
      </div>
      <div id="anchor-precision" className="absolute top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 flex items-center justify-center pointer-events-none z-20">
        <span className="absolute w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping opacity-50" />
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
      </div>

      {/* Display Scientific Tag Labels */}
      <div id="label-confinement" className="absolute top-0 left-0 z-20 pointer-events-none transition-transform duration-75 font-mono text-[9px] tracking-wider uppercase">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded text-slate-200 shadow-md">
          <span className="w-1 h-1 rounded-full bg-cyan-400" />
          <span>Light Confinement</span>
        </div>
      </div>
      <div id="label-biometamaterials" className="absolute top-0 left-0 z-20 pointer-events-none transition-transform duration-75 font-mono text-[9px] tracking-wider uppercase font-semibold">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/85 backdrop-blur-md border border-[#e40428]/30 rounded text-slate-100 shadow-lg">
          <span className="w-1 h-1 rounded-full bg-[#e40428]" />
          <span>Biometamaterials</span>
        </div>
      </div>
      <div id="label-precision" className="absolute top-0 left-0 z-20 pointer-events-none transition-transform duration-75 font-mono text-[9px] tracking-wider uppercase">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded text-slate-200 shadow-md">
          <span className="w-1 h-1 rounded-full bg-rose-400" />
          <span>Precision Medicine</span>
        </div>
      </div>

      {/* Interactive Micro Guide Tag */}
      <div className="absolute top-3 right-3 bg-slate-950/40 backdrop-blur-xs border border-white/5 rounded px-2 py-0.5 text-[8px] font-mono text-slate-500 z-20 pointer-events-none tracking-widest uppercase">
        <span className="text-[7px] text-[#e40428] animate-pulse mr-1">●</span> Interactive 3D Model
      </div>
    </div>
  );
}
