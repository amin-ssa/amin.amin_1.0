import React, { useEffect, useRef } from 'react';

export function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      ctx = null;
    }
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Particles
    const PARTICLE_COUNT = 180;
    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      alpha: number;
      color: string;
    };

    const colors = [
      'rgba(0,255,255,',    // cyan
      'rgba(140,0,255,',    // purple
      'rgba(0,180,255,',    // blue
      'rgba(255,255,255,',  // white
    ];

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Geometric shapes (wireframe-style polygons)
    type Shape = {
      x: number; y: number;
      size: number;
      rotation: number;
      rotSpeed: number;
      sides: number;
      alpha: number;
      color: string;
      floatOffset: number;
      floatSpeed: number;
    };
    const SHAPE_COUNT = 12;
    const shapes: Shape[] = Array.from({ length: SHAPE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 40 + 20,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      sides: Math.random() > 0.5 ? 4 : 6,
      alpha: Math.random() * 0.15 + 0.04,
      color: Math.random() > 0.5 ? 'rgba(0,255,255,' : 'rgba(140,0,255,',
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: Math.random() * 0.003 + 0.001,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const drawPolygon = (s: Shape, t: number) => {
      ctx.save();
      const floatY = Math.sin(t * s.floatSpeed * 60 + s.floatOffset) * 8;
      ctx.translate(s.x, s.y + floatY);
      ctx.rotate(s.rotation);
      ctx.beginPath();
      for (let i = 0; i < s.sides; i++) {
        const angle = (i / s.sides) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * s.size;
        const y = Math.sin(angle) * s.size;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = s.color + s.alpha + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Inner polygon
      ctx.beginPath();
      for (let i = 0; i < s.sides; i++) {
        const angle = (i / s.sides) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * s.size * 0.55;
        const y = Math.sin(angle) * s.size * 0.55;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = s.color + (s.alpha * 0.5) + ')';
      ctx.stroke();
      ctx.restore();
    };

    let t = 0;
    const draw = () => {
      t += 1;

      // Background gradient
      const grad = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, '#0a0a1a');
      grad.addColorStop(1, '#020205');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw shapes
      shapes.forEach(s => {
        s.rotation += s.rotSpeed;
        drawPolygon(s, t);
      });

      // Subtle mouse-reactive nebula
      const mGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 220);
      mGrad.addColorStop(0, 'rgba(0,255,255,0.025)');
      mGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = mGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Twinkle
        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.04 + p.x);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.alpha * twinkle) + ')';
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,200,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#020205' }}
    />
  );
}
