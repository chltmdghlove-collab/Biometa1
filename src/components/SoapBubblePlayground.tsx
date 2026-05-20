import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RefreshCw, Plus, Trash2, Wind, Sparkles, HelpCircle, Volume2, Info } from "lucide-react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseColor: string;
  iridescentAngle: number;
  shimmerSpeed: number;
  opacity: number;
  squishX: number;
  squishY: number;
  targetScale: number;
  currentScale: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
}

export default function SoapBubblePlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Simulation Settings
  const [isPlaying, setIsPlaying] = useState(true);
  const [bubbleCount, setBubbleCount] = useState(30);
  const [useGravity, setUseGravity] = useState(false);
  const [windActive, setWindActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false); 
  const [repulsionForce, setRepulsionForce] = useState(1.5); // Cursor force
  const [interactionMode, setInteractionMode] = useState<"repel" | "spawn" | "pop">("repel");
  const [particleCount, setParticleCount] = useState<number>(0);
  
  // Refs for animation loop & interactive state
  const stateRef = useRef({
    bubbles: [] as Bubble[],
    particles: [] as Particle[],
    mouse: { x: -1000, y: -1000, active: false, radius: 120 },
    lastTime: 0,
    nextId: 1,
    isPlaying: true,
    useGravity: false,
    windActive: false,
    repulsionForce: 1.5,
    interactionMode: "repel" as "repel" | "spawn" | "pop",
    width: 800,
    height: 450,
  });

  // Sync state variables to the ref for the requestAnimationFrame loop (to avoid closure capture of stale states)
  useEffect(() => {
    stateRef.current.isPlaying = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    stateRef.current.useGravity = useGravity;
  }, [useGravity]);

  useEffect(() => {
    stateRef.current.windActive = windActive;
  }, [windActive]);

  useEffect(() => {
    stateRef.current.repulsionForce = repulsionForce;
  }, [repulsionForce]);

  useEffect(() => {
    stateRef.current.interactionMode = interactionMode;
  }, [interactionMode]);

  // Audio effect generator using Web Audio API (so we don't need any external assets, works out of the box!)
  const playPopSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      // Fast pitch sweep upwards for a popping bubble click
      osc.frequency.setValueAtTime(300 + Math.random() * 200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 400, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio Context blocked or failed:", e);
    }
  };

  // Preset Iridescent Soap Bubble Base Palette Colors
  const bubbleColors = [
    "rgba(255, 182, 193, 0.45)", // Coral/Pink
    "rgba(135, 206, 250, 0.45)", // Sky Blue
    "rgba(152, 251, 152, 0.45)", // Pale Green
    "rgba(221, 160, 221, 0.45)", // Plum/Lavender
    "rgba(240, 230, 140, 0.45)", // Khaki/Light Gold
    "rgba(127, 255, 212, 0.45)", // Aquamarine
    "rgba(255, 218, 185, 0.45)", // Peach
  ];

  // Spawn individual bubble helper
  const createBubble = (x: number, y: number, r: number = 0): Bubble => {
    const id = stateRef.current.nextId++;
    const radius = r || 18 + Math.random() * 32; // Random radius between 18 and 50
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    
    // Smooth initial velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 1.5;

    return {
      id,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius,
      baseColor: color,
      iridescentAngle: Math.random() * Math.PI * 2,
      shimmerSpeed: 0.01 + Math.random() * 0.02,
      opacity: 0.8 + Math.random() * 0.2,
      squishX: 1,
      squishY: 1,
      targetScale: 1,
      currentScale: 0.01, // Animate entry scales
    };
  };

  // Reset simulation with a specific count
  const resetSimulation = (initialCount: number = 30) => {
    const { width, height } = stateRef.current;
    
    // Spawn bubbles securely inside the bounds
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < initialCount; i++) {
      const radius = 18 + Math.random() * 32;
      const x = radius + Math.random() * (width - radius * 2);
      const y = radius + Math.random() * (height - radius * 2);
      
      const b = createBubble(x, y, radius);
      b.currentScale = 0.5 + Math.random() * 0.5; // Starts closer to full size
      newBubbles.push(b);
    }
    
    stateRef.current.bubbles = newBubbles;
    stateRef.current.particles = [];
    setBubbleCount(newBubbles.length);
  };

  // Add 1 bubble in random spot
  const addSingleBubble = () => {
    const { width, height, bubbles } = stateRef.current;
    const radius = 22 + Math.random() * 28;
    const x = radius + Math.random() * (width - radius * 2);
    const y = radius + Math.random() * (height - radius * 2);
    
    const b = createBubble(x, y, radius);
    bubbles.push(b);
    setBubbleCount(bubbles.length);
  };

  // Explode bubble into pretty sparkling splash particles
  const spawnPopParticles = (x: number, y: number, bubbleColor: string, count: number = 10) => {
    const colors = [
      bubbleColor,
      "rgba(255, 255, 255, 0.95)",
      "rgba(135, 206, 250, 0.85)",
      "rgba(255, 192, 203, 0.85)",
    ];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      stateRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.5 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        life: 1.0, // Decay life in update
      });
    }
    
    playPopSound();
  };

  // Trigger explicit bubble popping on click
  const handlePopBubble = (bubbleId: number) => {
    const b = stateRef.current.bubbles.find(m => m.id === bubbleId);
    if (b) {
      spawnPopParticles(b.x, b.y, b.baseColor, 12);
      stateRef.current.bubbles = stateRef.current.bubbles.filter(m => m.id !== bubbleId);
      setBubbleCount(stateRef.current.bubbles.length);
    }
  };

  // Clear all bubbles
  const clearAllBubbles = () => {
    stateRef.current.bubbles.forEach(b => {
      spawnPopParticles(b.x, b.y, b.baseColor, 4);
    });
    stateRef.current.bubbles = [];
    setBubbleCount(0);
  };

  // Handle Resize of canvas securely
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = rect.width;
      const displayHeight = Math.min(rect.width * 0.56, 500); // Maintain beautiful cinema ratio

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      stateRef.current.width = displayWidth;
      stateRef.current.height = displayHeight;

      // Adjust boundaries of bubbles already on canvas
      stateRef.current.bubbles.forEach(b => {
        b.x = Math.max(b.radius + 5, Math.min(b.x, displayWidth - b.radius - 5));
        b.y = Math.max(b.radius + 5, Math.min(b.y, displayHeight - b.radius - 5));
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    handleResize();
    
    // Initial Spawn
    resetSimulation(32);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Main Canvas Update & Loop Trigger
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const animateLoop = (timestamp: number) => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = stateRef.current;
      
      // Clear with ambient futuristic glowing dark space
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);
      
      // Paint an elegant radial grid gradient inside canvas to showcase iridescence
      const bgGrd = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height));
      bgGrd.addColorStop(0, "rgba(15, 23, 42, 0.95)");
      bgGrd.addColorStop(1, "rgba(8, 10, 24, 1)");
      ctx.fillStyle = bgGrd;
      ctx.fillRect(0, 0, width, height);

      // Subtly draw cursor interactive area aura
      const mouse = stateRef.current.mouse;
      if (mouse.active && stateRef.current.interactionMode !== 'spawn') {
        const cursorGrd = ctx.createRadialGradient(mouse.x, mouse.y, 5, mouse.x, mouse.y, mouse.radius);
        const auraColor = stateRef.current.interactionMode === "pop" ? "239, 68, 68" : "99, 102, 241";
        cursorGrd.addColorStop(0, `rgba(${auraColor}, 0.12)`);
        cursorGrd.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = cursorGrd;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const activeBubbles = stateRef.current.bubbles;
      const activeParticles = stateRef.current.particles;

      // UPDATE & DRAW PARTICLES (Pop Splashes)
      stateRef.current.particles = activeParticles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96; // Air resistance damping
        p.vy *= 0.96;
        p.life -= 0.035; // Faster decay
        p.alpha = Math.max(0, p.life);

        if (p.life <= 0) return false;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        return true;
      });

      setParticleCount(stateRef.current.particles.length);

      // SIMULATE PHYSICS (Only if playing)
      if (stateRef.current.isPlaying) {
        // Subtle constant global wind/noise fluctuation so they floating fluidly
        const noiseFactor = timestamp * 0.0002;
        const windX = stateRef.current.windActive ? Math.sin(noiseFactor) * 0.12 : 0;
        const windY = stateRef.current.windActive ? Math.cos(noiseFactor * 1.5) * 0.08 - 0.05 : 0; // Floating slightly upward

        // 1. Position update + Wind + Gravity
        activeBubbles.forEach(b => {
          // Birth growth transition
          if (b.currentScale < b.targetScale) {
            b.currentScale += (b.targetScale - b.currentScale) * 0.12;
          }

          // Apply forces
          b.vx += windX;
          b.vy += windY;

          if (stateRef.current.useGravity) {
            b.vy += 0.12; // Modest Earthly gravity
          }

          // Scale velocities slightly to limit extreme movement
          b.vx = Math.max(-4, Math.min(b.vx, 4));
          b.vy = Math.max(-4, Math.min(b.vy, 4));

          // Move
          b.x += b.vx;
          b.y += b.vy;

          // Shimmer angles
          b.iridescentAngle += b.shimmerSpeed;

          // Decay squish deformation back to equilibrium circle
          b.squishX += (1 - b.squishX) * 0.08;
          b.squishY += (1 - b.squishY) * 0.08;

          // 2. Interaction handling for cursor
          if (mouse.active) {
            const dx = b.x - mouse.x;
            const dy = b.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            // Interaction depending on selected mode
            if (stateRef.current.interactionMode === "repel") {
              const capDist = mouse.radius;
              if (dist < capDist && dist > 1) {
                const force = (capDist - dist) / capDist; // 0 (edges) to 1 (near pointer)
                const pushX = (dx / dist) * force * stateRef.current.repulsionForce * 1.4;
                const pushY = (dy / dist) * force * stateRef.current.repulsionForce * 1.4;

                b.vx += pushX;
                b.vy += pushY;

                // Deform bubble on push force
                b.squishX = 1 - (pushX * 0.08);
                b.squishY = 1 + (pushX * 0.08);
              }
            } else if (stateRef.current.interactionMode === "pop") {
              // Easily pop bubbles on hovered proximity
              if (dist < b.radius * b.currentScale + 6) {
                // Trigger pop
                setTimeout(() => handlePopBubble(b.id), 0);
              }
            }
          }

          // 3. Wall collisions (Bounces)
          const effRadius = b.radius * b.currentScale;
          const bounceFactor = -0.85;

          if (b.x < effRadius) {
            b.x = effRadius;
            b.vx = Math.abs(b.vx) * 0.85;
            b.squishX = 0.75;
            b.squishY = 1.25;
          } else if (b.x > width - effRadius) {
            b.x = width - effRadius;
            b.vx = -Math.abs(b.vx) * 0.85;
            b.squishX = 0.75;
            b.squishY = 1.25;
          }

          if (b.y < effRadius) {
            b.y = effRadius;
            b.vy = Math.abs(b.vy) * 0.85;
            b.squishX = 1.25;
            b.squishY = 0.75;
          } else if (b.y > height - effRadius) {
            b.y = height - effRadius;
            b.vy = -Math.abs(b.vy) * 0.85;
            
            // Frictional floor bumper if gravity is on
            if (stateRef.current.useGravity) {
              b.vx *= 0.95; // Ground drag
            }
            b.squishX = 1.25;
            b.squishY = 0.75;
          }
        });

        // 4. Bubble-to-Bubble physics collisions (Iterative grid sweeps)
        for (let i = 0; i < activeBubbles.length; i++) {
          const b1 = activeBubbles[i];
          const r1 = b1.radius * b1.currentScale;
          
          for (let j = i + 1; j < activeBubbles.length; j++) {
            const b2 = activeBubbles[j];
            const r2 = b2.radius * b2.currentScale;

            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.hypot(dx, dy);
            const minDist = r1 + r2;

            if (dist < minDist) {
              // 1. Push them apart so they do not overlap
              const overlap = minDist - dist;
              const pushX = (dx / dist) * overlap * 0.5;
              const pushY = (dy / dist) * overlap * 0.5;

              b1.x -= pushX;
              b1.y -= pushY;
              b2.x += pushX;
              b2.y += pushY;

              // 2. Real Elastic Collision math along connection vector (mass proportionally equal to volume/radius square)
              const nx = dx / dist; // normal vector x
              const ny = dy / dist; // normal vector y

              // Tangent vector
              const tx = -ny;
              const ty = nx;

              // Dot product normal
              const dpNorm1 = b1.vx * nx + b1.vy * ny;
              const dpNorm2 = b2.vx * nx + b2.vy * ny;

              // Dot product tangent
              const dpTan1 = b1.vx * tx + b1.vy * ty;
              const dpTan2 = b2.vx * tx + b2.vy * ty;

              // Mass proxies
              const m1 = r1 * r1;
              const m2 = r2 * r2;

              // Compute new normal velocities
              const velNormal1 = (dpNorm1 * (m1 - m2) + 2 * m2 * dpNorm2) / (m1 + m2);
              const velNormal2 = (dpNorm2 * (m2 - m1) + 2 * m1 * dpNorm1) / (m1 + m2);

              // Update velocities with smooth momentum transfer
              b1.vx = tx * dpTan1 + nx * velNormal1;
              b1.vy = ty * dpTan1 + ny * velNormal1;
              b2.vx = tx * dpTan2 + nx * velNormal2;
              b2.vy = ty * dpTan2 + ny * velNormal2;

              // Introduce elegant squishy deformation on impact
              b1.squishX = 0.84;
              b1.squishY = 1.16;
              b2.squishX = 0.84;
              b2.squishY = 1.16;
            }
          }
        }
      }

      // DRAW BUBBLES
      activeBubbles.forEach(b => {
        const effRadius = b.radius * b.currentScale;
        
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.scale(b.squishX, b.squishY);

        // CREATE A MULTI-LAYERED IRIDESCENT SOAP GLOW
        // Layer 1: The outer colored ring with beautiful light diffraction
        const strokeGrd = ctx.createLinearGradient(
          -effRadius, -effRadius,
          effRadius, effRadius
        );

        // Compute phase angles based on shimmering triggers
        const angleShift = b.iridescentAngle;
        const color1 = getIridescentColor(angleShift, 0);
        const color2 = getIridescentColor(angleShift + 2, 120);
        const color3 = getIridescentColor(angleShift + 4, 240);

        strokeGrd.addColorStop(0, color1);
        strokeGrd.addColorStop(0.3, color2);
        strokeGrd.addColorStop(0.7, color3);
        strokeGrd.addColorStop(1.0, color1);

        // Outer crisp rim
        ctx.strokeStyle = strokeGrd;
        ctx.lineWidth = 1.8 + (b.radius > 30 ? 1.0 : 0);
        ctx.beginPath();
        ctx.arc(0, 0, effRadius, 0, Math.PI * 2);
        ctx.save();
        ctx.globalAlpha = b.opacity;
        ctx.shadowBlur = 6;
        ctx.shadowColor = color2;
        ctx.stroke();
        ctx.restore();

        // Layer 2: A transparent base radial filling mimicking thin water film
        const innerGrd = ctx.createRadialGradient(
          -effRadius * 0.1, -effRadius * 0.1, effRadius * 0.5,
          0, 0, effRadius
        );
        innerGrd.addColorStop(0, "rgba(255, 255, 255, 0.0)");
        innerGrd.addColorStop(0.7, "rgba(255, 255, 255, 0.015)");
        innerGrd.addColorStop(0.9, "rgba(186, 85, 211, 0.06)"); // Soft Magenta
        innerGrd.addColorStop(0.98, "rgba(30, 144, 255, 0.1)"); // Soft Blue

        ctx.fillStyle = innerGrd;
        ctx.beginPath();
        ctx.arc(0, 0, effRadius - 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Layer 3: Realistic Specular light highlights (the curved crescent glass lens effect)
        // Top-left shiny sphere highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.beginPath();
        ctx.arc(-effRadius * 0.45, -effRadius * 0.45, effRadius * 0.15, 0, Math.PI * 2);
        ctx.fill();

        // Secondary bottom-right thin curved ambient reflection
        ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
        ctx.lineWidth = effRadius * 0.05 + 0.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        // Draw an elegant small arc mapping the lower-right quadrant
        ctx.arc(effRadius * 0.35, effRadius * 0.35, effRadius * 0.5, 0.1 * Math.PI, 0.4 * Math.PI);
        ctx.stroke();

        ctx.restore();
      });

      ctx.restore();
      animationId = requestAnimationFrame(animateLoop);
    };

    // Helper functions inside effect to avoid scoping issues
    var j: number; // Define loop variable
    
    // Iridescence HSV to RGB mapping with customized wavelength spectrum
    function getIridescentColor(phase: number, hueOffset: number) {
      const hue = Math.abs(Math.sin(phase) * 360 + hueOffset) % 360;
      return `hsla(${hue}, 85%, 75%, 0.65)`;
    }

    // Begin looping
    stateRef.current.lastTime = performance.now();
    animationId = requestAnimationFrame(animateLoop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [soundEnabled]);

  // Handle Event Coordinates
  const updateMouseCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    stateRef.current.mouse.x = e.clientX - rect.left;
    stateRef.current.mouse.y = e.clientY - rect.top;
    stateRef.current.mouse.active = true;
  };

  const handleMouseLeave = () => {
    stateRef.current.mouse.active = false;
    stateRef.current.mouse.x = -1000;
    stateRef.current.mouse.y = -1000;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (stateRef.current.interactionMode === "spawn") {
      // Spawn new gorgeous bubble of unique size
      const b = createBubble(x, y);
      stateRef.current.bubbles.push(b);
      setBubbleCount(stateRef.current.bubbles.length);
      
      // Spawn tiny birth sparkles!
      spawnPopParticles(x, y, "rgba(255,255,255,0.8)", 6);
    } else {
      // Look if clicked directly inside any bubble to POP it
      const activeBubbles = stateRef.current.bubbles;
      let bubbleClicked = false;
      
      for (let i = activeBubbles.length - 1; i >= 0; i--) {
        const b = activeBubbles[i];
        const dist = Math.hypot(b.x - x, b.y - y);
        if (dist < b.radius * b.currentScale + 8) {
          // Trigger pop
          handlePopBubble(b.id);
          bubbleClicked = true;
          break; // Pop only the top-most bubble overlapping
        }
      }

      // If clicked on empty space in repel mode, blow a draft that moves bubbles rapidly
      if (!bubbleClicked && stateRef.current.interactionMode === "repel") {
        activeBubbles.forEach(b => {
          const dx = b.x - x;
          const dy = b.y - y;
          const dist = Math.hypot(dx, dy);
          if (dist < 200) {
            const windPush = (200 - dist) / 10;
            b.vx += (dx / dist) * windPush;
            b.vy += (dy / dist) * windPush;
          }
        });
        
        // Spawn small draft particles
        spawnPopParticles(x, y, "rgba(100, 180, 255, 0.4)", 5);
      }
    }
  };

  return (
    <div id="soap-bubble-interactive-playground" className="bg-white rounded-[32px] p-6 space-y-6 overflow-hidden">
      
      {/* Dynamic Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-indigo-50/70">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center justify-center p-1.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Sparkles size={18} className="animate-pulse" />
            </span>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <span>비누방울 피지컬 플레이그라운드</span>
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Interactive Art</span>
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            화면을 마우스로 조작해 보세요! 방울들은 모서리에서 튕기고, 서로 부딪히며, 마우스 압력에 반응합니다.
          </p>
        </div>

        {/* Bubble count & Audio badge */}
        <div className="flex items-center gap-2 self-start md:self-auto uppercase tracking-wider text-[11px] font-extrabold text-slate-400 bg-slate-50 border border-slate-150 rounded-2xl p-1.5 px-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-slate-600">Bubbles: <strong className="text-indigo-600 font-extrabold">{bubbleCount}</strong></span>
          </span>
          {particleCount > 0 && (
            <>
              <span className="text-slate-300">•</span>
              <span className="text-indigo-500 font-bold">Sparkles: {particleCount}</span>
            </>
          )}
        </div>
      </div>

      {/* Interactive Main Canvas Area */}
      <div 
        ref={containerRef} 
        className="w-full relative rounded-2xl overflow-hidden border border-slate-150 select-none cursor-crosshair group shadow-inner"
        style={{ touchAction: "none" }}
      >
        <canvas
          ref={canvasRef}
          onMouseMove={updateMouseCoords}
          onMouseEnter={updateMouseCoords}
          onMouseLeave={handleMouseLeave}
          onClick={handleCanvasClick}
          className="block w-full"
        />

        {/* Absolute Mode Indicators Floating inside Canvas */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
            <span>Modes:</span>
            <span className="text-indigo-300 font-black">
              {interactionMode === "repel" ? "Repulsion Field (밀어내기)" : 
               interactionMode === "spawn" ? "Click to Spawn (방속 생성)" : 
               "Proximity Pop (터뜨리기)"}
            </span>
          </div>

          {useGravity && (
            <div className="bg-indigo-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-indigo-400/25 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <span>Gravity Active</span>
            </div>
          )}
          {windActive && !useGravity && (
            <div className="bg-sky-900/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-sky-400/20 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Wind size={10} className="text-sky-300 animate-pulse" />
              <span>Solar Wind</span>
            </div>
          )}
        </div>

        {/* Sound toggle Floating absolute */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`absolute bottom-4 right-4 p-2 rounded-xl backdrop-blur-md border px-3 transition-all duration-300 text-xs font-black flex items-center gap-1.5 uppercase cursor-pointer ${
            soundEnabled 
              ? "bg-indigo-600 border-indigo-400 text-white shadow-lg" 
              : "bg-slate-900/80 border-white/10 text-slate-300 hover:text-white"
          }`}
          title="Toggle Pop Sound Frequency"
        >
          <Volume2 size={13} className={soundEnabled ? "animate-bounce" : ""} />
          <span>{soundEnabled ? "Effect Sound ON" : "Muted"}</span>
        </button>
      </div>

      {/* Control Panel Widget Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        
        {/* Interaction Modes Switcher */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block px-1">
            마우스 반응 모드 선택 • Interactive Interaction Mode
          </span>
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1 rounded-2xl border border-slate-150/50">
            <button
              onClick={() => setInteractionMode("repel")}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                interactionMode === "repel"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              🌌 밀어내기 (Repel)
            </button>
            <button
              onClick={() => setInteractionMode("spawn")}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                interactionMode === "spawn"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              ✨ 생성하기 (Spawn)
            </button>
            <button
              onClick={() => setInteractionMode("pop")}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                interactionMode === "pop"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              💥 터뜨리기 (Pop)
            </button>
          </div>
        </div>

        {/* Force/Speed Slider Controls */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              커서 척력 감도 • Cursor Push Power
            </span>
            <span className="text-xs text-indigo-600 font-bold">{repulsionForce}x</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 p-2.5 px-4 rounded-2xl border border-slate-150/50 h-[44px]">
            <input
              type="range"
              min="0.2"
              max="4"
              step="0.2"
              value={repulsionForce}
              onChange={(e) => setRepulsionForce(parseFloat(e.target.value))}
              disabled={interactionMode !== "repel"}
              className="w-full accent-indigo-600 cursor-pointer disabled:opacity-40"
            />
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="lg:col-span-3 lg:self-end flex flex-row gap-2">
          <button
            onClick={() => setUseGravity(!useGravity)}
            className={`flex-1 py-3 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
              useGravity 
                ? "bg-amber-500/10 border-amber-300 text-amber-800" 
                : "bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100"
            }`}
          >
            ⚖️ 중력 피지컬
          </button>
          <button
            onClick={() => setWindActive(!windActive)}
            className={`flex-1 py-3 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
              windActive && !useGravity
                ? "bg-sky-50 border-sky-200 text-sky-700 font-bold" 
                : "bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100"
            }`}
            disabled={useGravity}
          >
            <Wind size={13} className={windActive && !useGravity ? "animate-spin" : ""} />
            <span>기류 효과</span>
          </button>
        </div>

      </div>

      {/* Button Toolbars (Play/Pause, Clear, Respawn, etc.) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100/80">
        
        {/* Left simulation control */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
              isPlaying
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? "시뮬레이션 일시정지" : "시뮬레이션 재생"}</span>
          </button>

          <button
            onClick={addSingleBubble}
            className="py-2 px-4 bg-indigo-50 border border-indigo-150 text-indigo-700 rounded-xl text-xs font-bold transition-all hover:bg-indigo-100 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={13} />
            <span>방울 하나 추가</span>
          </button>
        </div>

        {/* Right utility control */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearAllBubbles}
            className="py-2 px-4 bg-rose-50 border border-rose-150 text-rose-700 rounded-xl text-xs font-bold transition-all hover:bg-rose-100 flex items-center gap-1.5 cursor-pointer"
            title="Pop all instantly"
          >
            <Trash2 size={13} />
            <span>전체 터뜨리기</span>
          </button>

          <button
            onClick={() => resetSimulation(35)}
            className="py-2 px-4 bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all hover:bg-indigo-700 flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <RefreshCw size={13} />
            <span>35개 재생성</span>
          </button>
        </div>

      </div>

      {/* Mini Info Strip with high contrast helper elements */}
      <div className="bg-indigo-50/50 rounded-2xl p-3.5 border border-indigo-100/60 text-[11px] text-slate-500 leading-relaxed font-medium flex items-start gap-2">
        <Info size={14} className="text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-indigo-950">💡 플레이 꿀팁 / Tip:</p>
          <p>
            • <strong>밀어내기 (Repel) 모드:</strong> 빈 캔버스를 클릭하면 마우스 파동 주위에 강력한 공기 역학적 폭풍 충격파가 생깁니다.<br />
            • <strong>생성하기 (Spawn) 모드:</strong> 원하는 곳을 클릭하여 나만의 크기와 색상을 가진 비누방울들을 손쉽게 추가할 수 있습니다.<br />
            • <strong>사운드 효과 (Effect Sound):</strong> 우측 하단의 음소거 단추를 해제하면 비누방울이 터질 때 입체적인 사운드 팝이 연주됩니다!
          </p>
        </div>
      </div>

    </div>
  );
}
