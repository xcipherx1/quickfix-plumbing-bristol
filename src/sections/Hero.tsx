import React, { useRef, useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { BookingForm } from '@/components/shared/BookingForm';

const IMAGE_SIZE = 512;
const PARTICLE_DENSITY = 8;
const ROWS = Math.floor(IMAGE_SIZE / PARTICLE_DENSITY);
const COLS = Math.floor(IMAGE_SIZE / PARTICLE_DENSITY);
const COUNT = ROWS * COLS;

interface PixelRevealCanvasProps {
  imageSrc: string;
}

function PixelRevealCanvas({ imageSrc }: PixelRevealCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [resolvedPositions, setResolvedPositions] = useState<Float32Array | null>(null);
  const [colors, setColors] = useState<Float32Array | null>(null);
  const animationRef = useRef<number>(0);
  const progressRef = useRef(0);
  const currentPositionsRef = useRef<Float32Array | null>(null);
  const chaosPositionsRef = useRef<Float32Array | null>(null);
  const scalesRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;

    image.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = IMAGE_SIZE;
      offscreen.height = IMAGE_SIZE;
      const ctx = offscreen.getContext('2d')!;
      ctx.drawImage(image, 0, 0, IMAGE_SIZE, IMAGE_SIZE);
      const imageData = ctx.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE);

      const resolved = new Float32Array(COUNT * 3);
      const colorArr = new Float32Array(COUNT * 3);
      const chaos = new Float32Array(COUNT * 3);
      const current = new Float32Array(COUNT * 3);
      const scales = new Float32Array(COUNT);

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          const idx = i * COLS + j;
          const i3 = idx * 3;
          const px = j * PARTICLE_DENSITY;
          const py = i * PARTICLE_DENSITY;
          const pixelIdx = (py * IMAGE_SIZE + px) * 4;

          const x = (j * PARTICLE_DENSITY - IMAGE_SIZE / 2) / IMAGE_SIZE;
          const y = -(i * PARTICLE_DENSITY - IMAGE_SIZE / 2) / IMAGE_SIZE;

          resolved[i3] = x;
          resolved[i3 + 1] = y;
          resolved[i3 + 2] = 0;

          colorArr[i3] = imageData.data[pixelIdx] / 255;
          colorArr[i3 + 1] = imageData.data[pixelIdx + 1] / 255;
          colorArr[i3 + 2] = imageData.data[pixelIdx + 2] / 255;

          chaos[i3] = (Math.random() - 0.5) * 4;
          chaos[i3 + 1] = (Math.random() - 0.5) * 4;
          chaos[i3 + 2] = (Math.random() - 0.5) * 2;

          current[i3] = chaos[i3];
          current[i3 + 1] = chaos[i3 + 1];
          current[i3 + 2] = chaos[i3 + 2];

          scales[idx] = 0.5 + Math.random() * 0.5;
        }
      }

      setResolvedPositions(resolved);
      setColors(colorArr);
      currentPositionsRef.current = current;
      chaosPositionsRef.current = chaos;
      scalesRef.current = scales;
      setImageLoaded(true);
    };
  }, [imageSrc]);

  useEffect(() => {
    if (!imageLoaded || !resolvedPositions || !colors || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    const handleResize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const current = currentPositionsRef.current!;
    const scales = scalesRef.current!;

    let startTime: number | null = null;
    const DURATION = 4000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      progressRef.current = Math.min(elapsed / DURATION, 1);
      const progress = progressRef.current;

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.9;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const staggerDelay = i * 0.0003;
        const particleProgress = Math.max(0, Math.min(1, (progress - staggerDelay) / (1 - staggerDelay * COUNT * 0.3)));
        const particleEased = particleProgress < 0 ? 0 : 1 - Math.pow(1 - particleProgress, 3);

        const targetX = resolvedPositions[i3];
        const targetY = resolvedPositions[i3 + 1];
        const startX = chaosPositionsRef.current![i3];
        const startY = chaosPositionsRef.current![i3 + 1];

        const px = cx + (startX + (targetX - startX) * particleEased) * scale;
        const py = cy + (startY + (targetY - startY) * particleEased) * scale;

        const r = colors[i3];
        const g = colors[i3 + 1];
        const b = colors[i3 + 2];
        const s = scales[i] * 2.5;

        const alpha = 0.3 + particleEased * 0.7;

        ctx.beginPath();
        ctx.arc(px, py, s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.floor(r * 255)}, ${Math.floor(g * 255)}, ${Math.floor(b * 255)}, ${alpha})`;
        ctx.fill();
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [imageLoaded, resolvedPositions, colors]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen bg-[#0F172A] overflow-hidden">
      {/* WebGL Pixel Reveal Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-[#0F172A]" />}>
        <PixelRevealCanvas imageSrc="/images/hero-plumber.jpg" />
      </Suspense>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-end pb-16 md:pb-24">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                <AlertTriangle className="w-4 h-4" />
                Emergency Line Open 24/7
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-white leading-[1.05] tracking-tight mb-6"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
              >
                Bristol's Fastest Emergency Plumbers — 30 Min Response
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
              >
                24/7 plumbing, heating & drainage. Fixed right, first time. Serving Bristol & Bath.
              </motion.p>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="grid grid-cols-3 gap-3 max-w-lg"
              >
                {[
                  { icon: Shield, label: 'Gas Safe Registered' },
                  { icon: Clock, label: '30 Min Response' },
                  { icon: CheckCircle, label: '12-Month Guarantee' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center"
                  >
                    <Icon className="w-5 h-5 text-[#06B6D4] mx-auto mb-1" />
                    <span className="text-xs text-white/90 font-medium leading-tight block">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100, damping: 15 }}
              className="lg:col-span-5"
            >
              <BookingForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
