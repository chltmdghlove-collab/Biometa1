import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowRight, Activity, Cpu, Sliders, Play, RotateCcw, Compass, Info } from "lucide-react";

interface HoveredNode {
  name: string;
  value: string;
  desc: string;
  coords: string;
}

export default function BiometamaterialVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // UI States for scientific control dashboard
  const [activeWavelength, setActiveWavelength] = useState(632.8);
  const [scanMode, setScanMode] = useState(true);
  const [singularityFactor, setSingularityFactor] = useState(94.2);
  const [disorderLevel, setDisorderLevel] = useState(0.85);
  const [hoveredNode, setHoveredNode] = useState<HoveredNode | null>(null);
  const [hotspotLocked, setHotspotLocked] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;

    // -------------------------------------------------------------
    // THREE.JS SCENE SETUP
    // -------------------------------------------------------------
    const scene = new THREE.Scene();
    // Midnight dark science background blending perfectly with homepage
    scene.fog = new THREE.FogExp2(0x070b14, 0.04);

    // Camera perspective with wider scientific viewpoint
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 3.8, 11);
    camera.lookAt(0, 0, 0);

    // Renderer with high-fidelity attributes
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Handle container resize cleanly
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);

    // Main 3D group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // -------------------------------------------------------------
    // SCIENTIFIC LIGHTING
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const laserRayLight = new THREE.DirectionalLight(0x06b6d4, 1.5);
    laserRayLight.position.set(0, 10, 0);
    scene.add(laserRayLight);

    const purpleGlowLight = new THREE.PointLight(0x6366f1, 2.5, 15);
    purpleGlowLight.position.set(-2, -1, 1);
    mainGroup.add(purpleGlowLight);

    // Hotspot red plasma light focused at central peak
    const redHotspotLight = new THREE.PointLight(0xe40428, 4.0, 8);
    redHotspotLight.position.set(0, 0, 0);
    mainGroup.add(redHotspotLight);

    // -------------------------------------------------------------
    // 1. TOP PLATE: INVERSE TRANSMISSION VALLEY (T_a Funnel)
    // -------------------------------------------------------------
    const topPlateGroup = new THREE.Group();
    topPlateGroup.position.y = 2.4;
    mainGroup.add(topPlateGroup);

    const topGridSize = isMobile ? 12 : 18;
    const topSpacing = 0.22;
    const topHalf = (topGridSize - 1) * topSpacing * 0.5;

    // Construct hanging network array
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const topNodesGeo = new THREE.BufferGeometry();
    const topNodesPositions: number[] = [];

    const topColorBase = new THREE.Color(0x1e3a8a); // deep cobalt
    const topColorVal = new THREE.Color(0x38bdf8);  // neon cyan
    const topColorApex = new THREE.Color(0xffffff); // pure incident light

    for (let i = 0; i < topGridSize; i++) {
      const u = i * topSpacing - topHalf;
      for (let j = 0; j < topGridSize; j++) {
        const v = j * topSpacing - topHalf;

        // Calculate dip pointing down to central coordinate
        const distSq = u * u + v * v;
        const funnelDip = 1.6 * Math.exp(-distSq / 0.85); // steep Gaussian valley

        // Top plane coordinate and bottom pointer coordinate
        const topY = 0.6;
        const bottomY = topY - funnelDip;

        // Draw vertical wireframe pillars
        linePositions.push(u, topY, v);
        linePositions.push(u, bottomY, v);

        // Map colors (funnel apex is brighter cyan/white)
        const interpolationFactor = Math.min(funnelDip / 1.6, 1.0);
        const col = topColorBase.clone().lerp(topColorVal, interpolationFactor);
        if (interpolationFactor > 0.85) {
          col.lerp(topColorApex, (interpolationFactor - 0.85) / 0.15);
        }

        lineColors.push(col.r * 0.4, col.g * 0.4, col.b * 1.2); // grid base lines
        lineColors.push(col.r, col.g, col.b); // glow apex points

        topNodesPositions.push(u, bottomY, v);
      }
    }

    const topLinesGeo = new THREE.BufferGeometry();
    topLinesGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    topLinesGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

    const topLinesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const topLines = new THREE.LineSegments(topLinesGeo, topLinesMat);
    topPlateGroup.add(topLines);

    // Floating particles at the tips of the transmission array
    topNodesGeo.setAttribute("position", new THREE.Float32BufferAttribute(topNodesPositions, 3));
    const topNodesMat = new THREE.PointsMaterial({
      color: 0x0ea5e9,
      size: isMobile ? 0.055 : 0.075,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const topNodesPoints = new THREE.Points(topNodesGeo, topNodesMat);
    topPlateGroup.add(topNodesPoints);

    // Outer framing box limits
    const topFrameGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(topGridSize * topSpacing, 0.6, topGridSize * topSpacing));
    const topFrameMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.25 });
    const topBoxFrame = new THREE.LineSegments(topFrameGeo, topFrameMat);
    topBoxFrame.position.y = 0.3;
    topPlateGroup.add(topBoxFrame);


    // -------------------------------------------------------------
    // 2. MIDDLE PLATE: COHERENT ANDERSON LOCALIZATION SURFACE (S_ba)
    // -------------------------------------------------------------
    const middlePlateGroup = new THREE.Group();
    middlePlateGroup.position.y = -0.2;
    mainGroup.add(middlePlateGroup);

    const mapSize = 4.2;
    const segments = isMobile ? 24 : 36;
    const meshGeo = new THREE.PlaneGeometry(mapSize, mapSize, segments, segments);
    meshGeo.rotateX(-Math.PI / 2); // horizontal orientation

    const vertices = meshGeo.attributes.position;
    const vertexColors: number[] = [];
    const peakColorBase = new THREE.Color(0x081329); // dark base
    const peakColorMid = new THREE.Color(0x06b6d4);  // bright cyan
    const peakColorWarm = new THREE.Color(0x10b981); // emerald transition
    const peakColorApex = new THREE.Color(0xe40428); // laser extreme peak crimson
    const peakColorWhite = new THREE.Color(0xffffff); // extreme core luminosity

    // Modify z-height procedurally to create the tall central peak
    for (let i = 0; i < vertices.count; i++) {
      const px = vertices.getX(i);
      const pz = vertices.getZ(i);

      const d = Math.sqrt(px * px + pz * pz);

      // Dominant localized single-needle peak in the center (Anderson Confinement)
      const coreConfinement = 1.95 * Math.exp(-d * d / (0.16 * 0.16)); 

      // Secondary medium-scale random structures (Disordered photonic crystal)
      const disorder1 = 0.45 * Math.sin(px * 5.5) * Math.cos(pz * 5.5) * Math.exp(-d * d / (1.4 * 1.4));
      const disorder2 = 0.22 * Math.cos(px * 11.0 + pz * 7.0) * Math.exp(-d * d / (2.2 * 2.2));
      const thermalFluctuation = 0.04 * Math.sin(px * 24.0) * Math.cos(pz * 20.0);

      // Final composite height map value
      const totalHeight = coreConfinement + disorder1 + disorder2 + thermalFluctuation;
      vertices.setY(i, totalHeight);

      // Scientific height-to-color mapping (reflecting the original paper screenshot)
      const col = peakColorBase.clone();
      if (totalHeight < 0.2) {
        col.lerp(peakColorMid, totalHeight / 0.2 * 0.35);
      } else if (totalHeight < 0.8) {
        const factor = (totalHeight - 0.2) / 0.6;
        col.copy(peakColorMid).lerp(peakColorWarm, factor);
      } else if (totalHeight < 1.4) {
        const factor = (totalHeight - 0.8) / 0.6;
        col.copy(peakColorWarm).lerp(peakColorApex, factor);
      } else {
        const factor = Math.min((totalHeight - 1.4) / 0.55, 1.0);
        col.copy(peakColorApex).lerp(peakColorWhite, factor);
      }

      vertexColors.push(col.r, col.g, col.b);
    }
    meshGeo.setAttribute("color", new THREE.Float32BufferAttribute(vertexColors, 3));
    meshGeo.computeVertexNormals();

    const meshMat = new THREE.MeshPhongMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      shininess: 90,
      side: THREE.DoubleSide,
      flatShading: true
    });
    const topographyMesh = new THREE.Mesh(meshGeo, meshMat);
    middlePlateGroup.add(topographyMesh);

    // Glowing coordinate contour lines overlay
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      depthWrite: false
    });
    const topographyWireframe = new THREE.Mesh(meshGeo, wireframeMat);
    topographyWireframe.position.y = 0.005; // avoid z-fighting
    middlePlateGroup.add(topographyWireframe);


    // -------------------------------------------------------------
    // 3. BOTTOM PLATE: COHERENT MULTISCALE CONTOUR MAPPING
    // -------------------------------------------------------------
    const bottomPlateGroup = new THREE.Group();
    bottomPlateGroup.position.y = -2.2;
    mainGroup.add(bottomPlateGroup);

    // Circular radar grids mapping wave propagation circles
    const circularRadarGroup = new THREE.Group();
    bottomPlateGroup.add(circularRadarGroup);

    const maxRadius = 2.4;
    const ringCount = 6;
    for (let r = 1; r <= ringCount; r++) {
      const radiusSize = (r / ringCount) * maxRadius;
      const ringGeo = new THREE.RingGeometry(radiusSize - 0.012, radiusSize + 0.012, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: Math.max(0.04, 0.35 - (r / ringCount) * 0.3),
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotateX(Math.PI / 2);
      circularRadarGroup.add(ring);
    }

    // Horizontal scientific grid axes
    const bottomGridHelper = new THREE.GridHelper(4.4, 16, 0x1e293b, 0x0f172a);
    bottomGridHelper.position.y = -0.01;
    (bottomGridHelper.material as THREE.Material).transparent = true;
    (bottomGridHelper.material as THREE.Material).opacity = 0.38;
    bottomPlateGroup.add(bottomGridHelper);

    // Outer enclosure frame for the bottom layout
    const bottomOuterGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(4.4, 0.05, 4.4));
    const bottomOuterMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.15 });
    const bottomOuter = new THREE.LineSegments(bottomOuterGeo, bottomOuterMat);
    bottomPlateGroup.add(bottomOuter);


    // -------------------------------------------------------------
    // 4. SCIENTIFIC NOTATIONS: FLOATING ANNOTATION MESHES
    // -------------------------------------------------------------
    // White Triangle Indicator (Representing Δ spatial boundary node in the academic dataset)
    const triangleGeo = new THREE.ConeGeometry(0.12, 0.22, 4);
    triangleGeo.rotateX(Math.PI / 2); // point horizontal
    const triangleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const triangleMesh = new THREE.Mesh(triangleGeo, triangleMat);
    triangleMesh.position.set(0.4, 0.08, 0.4);
    middlePlateGroup.add(triangleMesh);

    // White Diamond Indicator (Representing ◊ wave localization envelope coordinate)
    const diamondGeo = new THREE.OctahedronGeometry(0.08, 0);
    const diamondMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
    diamondMesh.position.set(-0.8, -0.1, 0.8);
    middlePlateGroup.add(diamondMesh);


    // -------------------------------------------------------------
    // 5. FLOATING SCIENTIFIC GRAPH INSETS (3D-In-Canvas)
    // -------------------------------------------------------------
    const graphsGroup = new THREE.Group();
    mainGroup.add(graphsGroup);

    // Left graph: probability density plot P(s_a)
    const leftGraphFrame = new THREE.Group();
    leftGraphFrame.position.set(-3.2, 1.1, -0.6);
    leftGraphFrame.rotation.y = 0.35; // face slightly outwards
    graphsGroup.add(leftGraphFrame);

    const frameGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.5, 1.0));
    const frameMat = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 });
    const frameBorder = new THREE.LineSegments(frameGeo, frameMat);
    leftGraphFrame.add(frameBorder);

    // Solid dark-slate background for inset readability
    const bgPlateGeo = new THREE.PlaneGeometry(1.48, 0.98);
    const bgPlateMat = new THREE.MeshBasicMaterial({
      color: 0x070b14,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const bgPlate = new THREE.Mesh(bgPlateGeo, bgPlateMat);
    bgPlate.position.z = -0.01;
    leftGraphFrame.add(bgPlate);

    // Draw logarithmic-decay scatter dots in the graph frame
    const scatterCount = 28;
    const scatterGeo = new THREE.BufferGeometry();
    const scatterPos = new Float32Array(scatterCount * 3);
    for (let s = 0; s < scatterCount; s++) {
      const frac = s / (scatterCount - 1);
      const xVal = frac * 1.2 - 0.6; // x range: -0.6 to +0.6
      // simulated log localization tail: y decays exponentially representing P(s)
      const baseDecay = 0.3 * Math.exp(-s * 0.15);
      const jitter = (Math.random() - 0.5) * 0.08 * (1.0 - frac * 0.8);
      const yVal = baseDecay - 0.28 + jitter;

      scatterPos[s * 3] = xVal;
      scatterPos[s * 3 + 1] = yVal;
      scatterPos[s * 3 + 2] = 0.01;
    }
    scatterGeo.setAttribute("position", new THREE.BufferAttribute(scatterPos, 3));
    const scatterMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.038,
      transparent: true,
      opacity: 0.85
    });
    const scatterPoints = new THREE.Points(scatterGeo, scatterMat);
    leftGraphFrame.add(scatterPoints);

    // Graph trace line
    const leftLinePoints: THREE.Vector3[] = [];
    for (let s = 0; s < scatterCount; s++) {
      const frac = s / (scatterCount - 1);
      const x = frac * 1.2 - 0.6;
      const y = (0.3 * Math.exp(-s * 0.12)) - 0.28;
      leftLinePoints.push(new THREE.Vector3(x, y, 0.005));
    }
    const leftCurve = new THREE.CatmullRomCurve3(leftLinePoints);
    const leftCurveGeo = new THREE.BufferGeometry().setFromPoints(leftCurve.getPoints(40));
    const leftCurveMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.42 });
    const leftGraphLine = new THREE.Line(leftCurveGeo, leftCurveMat);
    leftGraphFrame.add(leftGraphLine);


    // Right Graph panel: sub-wavelength peak zoom correlation
    const rightGraphFrame = new THREE.Group();
    rightGraphFrame.position.set(3.2, -0.6, 0.4);
    rightGraphFrame.rotation.y = -0.38;
    graphsGroup.add(rightGraphFrame);

    const rightBorder = new THREE.LineSegments(frameGeo, frameMat);
    rightGraphFrame.add(rightBorder);

    const rightBgPlate = new THREE.Mesh(bgPlateGeo, bgPlateMat);
    rightBgPlate.position.z = -0.01;
    rightGraphFrame.add(rightBgPlate);

    const rightScatterCount = 20;
    const rightScatterGeo = new THREE.BufferGeometry();
    const rightScatterPos = new Float32Array(rightScatterCount * 3);
    for (let s = 0; s < rightScatterCount; s++) {
      const frac = s / (rightScatterCount - 1);
      const xVal = frac * 1.1 - 0.55;
      // distribution peaks
      const d1 = 0.32 * Math.exp(-Math.pow(xVal - 0.1, 2) / 0.015);
      const d2 = 0.12 * Math.exp(-Math.pow(xVal + 0.25, 2) / 0.02);
      const yVal = (d1 + d2) - 0.22 + (Math.random() - 0.5) * 0.03;

      rightScatterPos[s * 3] = xVal;
      rightScatterPos[s * 3 + 1] = yVal;
      rightScatterPos[s * 3 + 2] = 0.01;
    }
    rightScatterGeo.setAttribute("position", new THREE.BufferAttribute(rightScatterPos, 3));
    const rightScatterMat = new THREE.PointsMaterial({
      color: 0xef4444,
      size: 0.035,
      transparent: true,
      opacity: 0.8
    });
    const rightScatterPoints = new THREE.Points(rightScatterGeo, rightScatterMat);
    rightGraphFrame.add(rightScatterPoints);

    // -------------------------------------------------------------
    // 6. SCIENTIFIC COHERENCE / RAY CONNECTIONS
    // -------------------------------------------------------------
    const rayGroup = new THREE.Group();
    mainGroup.add(rayGroup);

    // Laser core vertical vector linking top, middle, and bottom
    const rayPoints = [
      new THREE.Vector3(0, 3.2, 0),
      new THREE.Vector3(0, 1.8, 0), // transmission dip apex
      new THREE.Vector3(0, 0.0, 0), // localized peak apex
      new THREE.Vector3(0, -2.2, 0) // radar target center
    ];
    const rayGeo = new THREE.BufferGeometry().setFromPoints(rayPoints);
    const rayMat = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 0.12,
      gapSize: 0.08,
      transparent: true,
      opacity: 0.65
    });
    const centerRay = new THREE.Line(rayGeo, rayMat);
    centerRay.computeLineDistances(); // required for dashed line
    rayGroup.add(centerRay);

    // Laser excitation scanning slice plane (visualizing spatial scan)
    const scanPlaneGeo = new THREE.RingGeometry(1.95, 2.05, 32);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.rotateX(Math.PI / 2);
    mainGroup.add(scanPlane);


    // -------------------------------------------------------------
    // 7. PARTICLES TRAILS: SIMULATING WAVE ENVELOPE TRANSPORT
    // -------------------------------------------------------------
    const trailParticles: {
      mesh: THREE.Mesh;
      phase: number;
      speed: number;
      radius: number;
      vSpeed: number;
      yPos: number;
    }[] = [];

    const numTrails = isMobile ? 12 : 24;
    for (let p = 0; p < numTrails; p++) {
      const pGeo = new THREE.SphereGeometry(0.03 + Math.random() * 0.02, 6, 6);
      const pMat = new THREE.MeshBasicMaterial({
        color: p % 3 === 0 ? 0xe40428 : p % 3 === 1 ? 0x06b6d4 : 0x38bdf8,
        transparent: true,
        opacity: 0.8
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);

      // spiral coordinates
      const phase = Math.random() * Math.PI * 2;
      const speed = 0.04 + Math.random() * 0.06;
      const radius = 0.1 + Math.random() * 1.5;
      const vSpeed = 0.01 + Math.random() * 0.02;
      const yPos = -2.2 + Math.random() * 4.4; // between bottom plate and top

      pMesh.position.set(
        Math.cos(phase) * radius,
        yPos,
        Math.sin(phase) * radius
      );
      mainGroup.add(pMesh);

      trailParticles.push({
        mesh: pMesh,
        phase,
        speed,
        radius,
        vSpeed,
        yPos
      });
    }


    // -------------------------------------------------------------
    // INTERACTIVE TRACKING & MOUSE DRIFT
    // -------------------------------------------------------------
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // -------------------------------------------------------------
    // RENDER ANIMATION LOOP
    // -------------------------------------------------------------
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Autorotation & drift on mouse movement
      mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.04);
      mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.04);

      // holographic visual tilt based on mouse coords
      mainGroup.rotation.y = elapsedTime * 0.09 + mouse.x * 0.45;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.08 + mouse.y * 0.35;

      // Pulse camera depth slowly
      camera.position.z = 11.2 + Math.cos(elapsedTime * 0.25) * 0.2;
      camera.lookAt(0, 0.3, 0);

      // Animate concentric bottom radar rings pulsating outwards
      circularRadarGroup.children.forEach((mesh, index) => {
        const ring = mesh as THREE.Mesh;
        const scaleVal = 1.0 + ((elapsedTime * 0.3 + index / ringCount) % 1.0) * 0.5;
        ring.scale.set(scaleVal, scaleVal, 1.0);
        const mat = ring.material as THREE.Material;
        mat.opacity = (1.0 - (scaleVal - 1.0) / 0.5) * (0.28 / (index + 1));
      });

      // Excitation Scanning Slice Laser feedback loop
      if (scanMode) {
        const activeSliceY = Math.sin(elapsedTime * 0.95) * 2.2;
        scanPlane.position.y = activeSliceY;
        const intensityPulse = Math.sin(elapsedTime * 1.9) * 0.5 + 0.5;
        (scanPlane.material as THREE.MeshBasicMaterial).opacity = 0.2 + intensityPulse * 0.2;
      } else {
        scanPlane.position.y = -2.2;
        (scanPlane.material as THREE.MeshBasicMaterial).opacity = 0;
      }

      // Animate photonic optical packet trails (spiraling upward mimicking light localization energy)
      trailParticles.forEach((p) => {
        p.yPos += p.vSpeed * (hotspotLocked ? 1.8 : 1.0);
        p.phase += p.speed;

        // Reset particles looping back to bottom
        if (p.yPos > 2.4) {
          p.yPos = -2.2;
          p.radius = 0.05 + Math.random() * 1.8;
        }

        // Collapse orbit spiraling inner as they approach spatial focus Y = 0 (Anderson Localization singularity)
        const currentRadius = p.radius * Math.max(0.12, Math.min(1.0, Math.abs(p.yPos) / 2.2));
        p.mesh.position.set(
          Math.cos(p.phase) * currentRadius,
          p.yPos,
          Math.sin(p.phase) * currentRadius
        );

        // Increase luminance glow at center focus
        const distanceToCenter = Math.abs(p.yPos);
        const mat = p.mesh.material as THREE.MeshBasicMaterial;
        if (distanceToCenter < 0.4) {
          mat.color.setHex(0xffffff);
          p.mesh.scale.setScalar(1.5);
        } else {
          mat.color.setHex(p.phase % 2 === 0 ? 0x06b6d4 : 0xe40428);
          p.mesh.scale.setScalar(1.0);
        }
      });

      // Twinkle top matrix grid nodes subtly representing active phase modulators
      const topPositions = topNodesGeo.attributes.position.array as Float32Array;
      const count = topPositions.length / 3;
      for (let i = 0; i < count; i++) {
        const index = i * 3;
        // subtle holographic shivering
        topPositions[index + 1] += Math.sin(elapsedTime * 3.5 + i) * 0.0018;
      }
      topNodesGeo.attributes.position.needsUpdate = true;

      // Fluctuate dashboard stats in state values periodically
      if (Math.random() < 0.04) {
        setSingularityFactor((prev) => Math.max(88, Math.min(99.6, prev + (Math.random() - 0.5) * 0.8)));
        setActiveWavelength((prev) => Math.max(632.4, Math.min(633.2, prev + (Math.random() - 0.5) * 0.06)));
      }

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------
    // CLEANUP MEMORY TO AVOID LEAKS
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);

      // Dispose active layout geometries
      topNodesGeo.dispose();
      topLinesGeo.dispose();
      topFrameGeo.dispose();
      meshGeo.dispose();
      scanPlaneGeo.dispose();
      triangleGeo.dispose();
      diamondGeo.dispose();
      frameGeo.dispose();
      bgPlateGeo.dispose();
      scatterGeo.dispose();
      rightScatterGeo.dispose();
      rayGeo.dispose();

      // Dispose materials
      topLinesMat.dispose();
      topNodesMat.dispose();
      topFrameMat.dispose();
      meshMat.dispose();
      wireframeMat.dispose();
      bottomOuterMat.dispose();
      triangleMat.dispose();
      diamondMat.dispose();
      frameMat.dispose();
      bgPlateMat.dispose();
      scatterMat.dispose();
      rightScatterMat.dispose();
      rayMat.dispose();
      scanPlaneMat.dispose();

      trailParticles.forEach((p) => {
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
      });

      renderer.dispose();
    };
  }, [scanMode, disorderLevel, hotspotLocked]);

  // Scientific Nodes descriptions
  const scienceNodes = [
    {
      name: "Coherent Incident ($T_a$)",
      coords: "[u, v; z=+2.4]",
      value: "T_min: 0.0012",
      desc: "공동매질 입사간섭 위상 정합 매커니즘. 가우스 밸리 형상으로 위상 정렬된 광자가 소실 영역인 중심부로 밀집 집중됩니다."
    },
    {
      name: "Localized Singularity ($S_{ba}$)",
      coords: "[α=102µm, β=98µm; z=0.0]",
      value: "Peak Amplification: 294.8x",
      desc: "다공성 질서-무질서 전환 생체 고밀 가둠 현상. 광 에너지가 단일 초점이탈 영역에 초집속되어 세포 및 초해상 비침습 치료 특이 레이어를 구성합니다."
    },
    {
      name: "Wavefront Projection Matrix",
      coords: "[x, y; z=-2.2]",
      value: "Coherence Area: 20x20µm",
      desc: "최적 도파면 위상 최적화 평면 및 투영 매핑 데이터. 다중 나노기공 산란 필드를 경유한 빛의 최종 위상이 파악됩니다."
    }
  ];

  const toggleScanMode = () => {
    setScanMode(!scanMode);
  };

  const handleNodeClick = (node: typeof scienceNodes[0]) => {
    setHoveredNode(node);
  };

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-transparent min-h-[504px] sm:min-h-[576px]">
      
      {/* 3D Viewport Base (Occupies full immersive dimensions) */}
      <div 
        ref={containerRef}
        className="w-full h-full min-h-[504px] sm:min-h-[576px] relative overflow-hidden"
        aria-label="Scientific 3D Optical Localization Simulation"
      >
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Floating Laser Pointer HUD crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-14 h-14 border border-cyan-500/20 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#e40428]/80 animate-ping" />
          <div className="absolute inset-x-0 h-[1px] bg-cyan-500/10" />
          <div className="absolute inset-y-0 w-[1px] bg-cyan-500/10" />
        </div>

        {/* Scientific HUD Annotation Layer */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 text-[9px] font-mono text-slate-500">
          <div className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded border border-white/5 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-300">INCIDENT WAVEFRONT</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded border border-white/5 mt-1 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e40428]" />
            <span className="text-slate-300">ANDERSON LOCALIZED REGIME (ξ=4.82µm)</span>
          </div>
        </div>

        {/* Floating Scale Bars matching the academic paper aesthetic */}
        <div className="absolute bottom-4 right-4 bg-slate-950/80 px-3 py-1.5 rounded border border-white/5 backdrop-blur-xs font-mono text-[9px] text-slate-400 flex flex-col items-end gap-1 shadow-lg">
          <div className="flex items-center gap-2">
            <span>Spatial Resolution Scale:</span>
            <span className="font-bold text-white">20 µm</span>
          </div>
          <div className="w-24 h-[2px] bg-white flex justify-between">
            <div className="w-[1px] h-1.5 bg-white -mt-0.5" />
            <div className="w-[1px] h-1.5 bg-white -mt-0.5" />
          </div>
        </div>

        {/* Watermark Indicating Formula representation */}
        <div className="absolute bottom-4 left-4 font-mono text-[8px] text-slate-500/60 pointer-events-none">
          <p>T_a = Σ_b T_ba</p>
          <p>S_ba (x, y; α = 102 µm, β = 98 µm)</p>
        </div>
      </div>
    </div>
  );
}
