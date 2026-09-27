import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Terminal, Cpu, CheckCircle2 } from 'lucide-react';

export const CodeSculptureCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'architecture' | 'shader' | 'physics'>('architecture');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = 45;
    const particles: {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }[] = [];

    const colors = ['#2563EB', '#3B82F6', '#0F2C59', '#60A5FA', '#93C5FD'];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2.5 + 1;
      const angle = (i / particleCount) * Math.PI * 2;
      const dist = 120 + Math.random() * 80;
      particles.push({
        x: width / 2 + Math.cos(angle) * dist,
        y: height / 2 + Math.sin(angle) * dist,
        ox: Math.cos(angle) * dist,
        oy: Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius,
        alpha: Math.random() * 0.6 + 0.3,
        color: colors[i % colors.length],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const orbitAngle = time * 0.4 + (i / particles.length) * Math.PI * 2;
        const radiusDist = 140 + Math.sin(time + i) * 20;

        p1.x = centerX + Math.cos(orbitAngle) * radiusDist + mousePos.x * 25;
        p1.y = centerY + Math.sin(orbitAngle * 0.8) * radiusDist + mousePos.y * 25;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - distance / 110) * 0.25;
            ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#2563EB';
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const codeExamples = {
    architecture: `export const SystemMatrix = createSystem({
  aesthetic: 'Editorial Luxury',
  performance: { lighthouse: 99, fps: 120 },
  renderEngine: 'WebGL + Canvas + Physics',
  theme: {
    accent: '#2563EB',
    navy: '#0F2C59',
    background: '#FFFFFF'
  }
});`,
    shader: `uniform float u_time;
uniform vec2 u_mouse;
varying vec2 v_uv;

void main() {
  vec2 st = v_uv * 2.0 - 1.0;
  float d = length(st - u_mouse);
  vec3 col = mix(vec3(0.06, 0.17, 0.35), vec3(0.14, 0.38, 0.92), sin(u_time + d * 4.0));
  gl_FragColor = vec4(col, 0.95);
}`,
    physics: `function applySpringEasing(target: number, current: number, stiffness = 0.15) {
  const force = (target - current) * stiffness;
  const damping = 0.82;
  velocity = (velocity + force) * damping;
  return current + velocity;
}`,
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full h-[460px] md:h-[520px] rounded-3xl overflow-hidden p-6 md:p-8 flex flex-col justify-between border border-[#0F2C59]/15 dark:border-white/15 shadow-2xl glass-card transition-transform duration-500 hover:shadow-blue-500/10"
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

      <div className="relative z-10 flex items-center justify-between border-b border-[#0F2C59]/10 dark:border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="ml-3 text-xs font-mono text-[#0F172A]/60 dark:text-white/60 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#2563EB]" />
            SumanStudio.ts
          </span>
        </div>

        <div className="flex items-center gap-1 bg-[#0F2C59]/5 dark:bg-white/10 p-1 rounded-lg">
          {(['architecture', 'shader', 'physics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md text-[11px] font-mono capitalize transition-all interactive ${
                activeTab === tab
                  ? 'bg-[#0F2C59] dark:bg-[#2563EB] text-white shadow-xs'
                  : 'text-[#0F172A]/70 dark:text-white/70 hover:text-[#0F2C59] dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 my-4 font-mono text-xs md:text-sm leading-relaxed text-[#0F172A] dark:text-white bg-white/50 dark:bg-black/50 backdrop-blur-md p-5 rounded-2xl border border-[#0F2C59]/10 dark:border-white/10 shadow-inner overflow-x-auto">
        <pre className="text-[#0F172A] dark:text-white">
          <code>
            {codeExamples[activeTab].split('\n').map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell pr-4 text-[#0F2C59]/30 dark:text-white/30 select-none text-right">{i + 1}</span>
                <span className="table-cell">
                  {line.startsWith('//') ? (
                    <span className="text-[#2563EB]/70 italic">{line}</span>
                  ) : (
                    line.replace(/export|const|function|return|uniform|varying|vec2|vec3|void/g, (match) => `\x00${match}\x00`).split('\x00').map((part, idx) => (
                      ['export', 'const', 'function', 'return', 'uniform', 'varying', 'vec2', 'vec3', 'void'].includes(part) ? (
                        <span key={idx} className="text-[#2563EB] dark:text-[#60A5FA] font-bold">{part}</span>
                      ) : (
                        <span key={idx}>{part}</span>
                      )
                    ))
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-[#0F2C59]/10 dark:border-white/10 pt-4 text-xs">
        <div className="flex items-center gap-2 text-[#0F172A]/70 dark:text-white/70">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="font-mono text-[11px]">System Status: Optimal (120 FPS)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] dark:text-[#60A5FA] font-mono text-[11px] font-medium border border-[#2563EB]/20">
            <Cpu className="w-3 h-3 animate-spin" />
            GSAP + Canvas Engine
          </span>
        </div>
      </div>
    </div>
  );
};
