"use client";
import { createContext, useContext, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

interface TransitionCtx {
  trigger: (href: string, x: number, y: number) => void;
}

const Ctx = createContext<TransitionCtx>({ trigger: () => {} });

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router    = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef   = useRef<number>(0);
  const [ready, setReady] = useState(false);

  const mountCanvas = useCallback((el: HTMLCanvasElement | null) => {
    canvasRef.current = el;
    if (el) setReady(true);
  }, []);

  const trigger = useCallback((href: string, originX: number, originY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) { router.push(href); return; }

    const ctx  = canvas.getContext("2d")!;
    const W    = window.innerWidth;
    const H    = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const maxR = Math.hypot(W, H) * 1.05;

    // Ripple rings state
    const rings: { r: number; alpha: number; born: number }[] = [];
    let lastRingR = -999;

    const draw = (r: number, phase: "expand" | "contract", progress: number) => {
      ctx.clearRect(0, 0, W, H);

      // ── Ripple rings ──
      // Spawn a new ring every 80px of expansion
      if (phase === "expand" && r - lastRingR > 80) {
        rings.push({ r, alpha: 0.6, born: r });
        lastRingR = r;
      }

      // Draw + fade rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r    += 4;
        ring.alpha -= 0.012;
        if (ring.alpha <= 0) { rings.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(originX, originY, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100,160,255,${ring.alpha})`;
        ctx.lineWidth   = 2.5;
        ctx.stroke();
      }

      // ── Main gradient blob ──
      if (r > 1) {
        const grad = ctx.createRadialGradient(originX, originY, 0, originX, originY, r);
        grad.addColorStop(0,    "rgba(120,170,255,1)");   // bright white-blue center
        grad.addColorStop(0.25, "rgba(60,120,255,1)");    // mid blue
        grad.addColorStop(0.6,  "rgba(26,86,219,1)");     // brand blue
        grad.addColorStop(1,    "rgba(10,50,160,1)");     // deep blue edge

        ctx.beginPath();
        ctx.arc(originX, originY, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── Glow bloom at origin ──
      // Bright core that fades as blob expands
      const coreAlpha = phase === "expand"
        ? Math.max(0, 1 - progress * 2.5)   // fades out during expand
        : Math.max(0, (1 - progress) * 0.5); // faint glow during contract

      if (coreAlpha > 0) {
        const coreR  = Math.max(1, 60 + progress * 30);
        const coreGrad = ctx.createRadialGradient(originX, originY, 0, originX, originY, coreR);
        coreGrad.addColorStop(0,   `rgba(200,220,255,${coreAlpha})`);
        coreGrad.addColorStop(0.4, `rgba(120,170,255,${coreAlpha * 0.6})`);
        coreGrad.addColorStop(1,   "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.arc(originX, originY, coreR, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
      }

      // ── Edge glow ring on blob boundary ──
      if (r > 30) {
        const edgeGrad = ctx.createRadialGradient(originX, originY, Math.max(0, r - 20), originX, originY, r + 15);
        edgeGrad.addColorStop(0,   "rgba(100,160,255,0)");
        edgeGrad.addColorStop(0.5, "rgba(100,160,255,0.25)");
        edgeGrad.addColorStop(1,   "rgba(100,160,255,0)");

        ctx.beginPath();
        ctx.arc(originX, originY, r + 8, 0, Math.PI * 2);
        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth   = 30;
        ctx.stroke();
      }
    };

    // ── Easing functions ──
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const expandDur  = 650;
    const contractDur = 550;
    let startTime: number | null = null;
    let navigated = false;

    const expand = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / expandDur, 1);
      const eased    = easeInOutCubic(progress);
      const r        = eased * maxR;

      draw(r, "expand", progress);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(expand);
      } else {
        if (!navigated) {
          navigated = true;
          router.push(href);
        }
        rings.length = 0;
        startTime    = null;
        animRef.current = requestAnimationFrame(contract);
      }
    };

    const contract = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / contractDur, 1);
      const eased    = easeOutCubic(progress);
      const r        = (1 - eased) * maxR;

      draw(r, "contract", progress);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(contract);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    };

    cancelAnimationFrame(animRef.current);
    rings.length  = 0;
    lastRingR     = -999;
    animRef.current = requestAnimationFrame(expand);
  }, [router]);

  return (
    <Ctx.Provider value={{ trigger }}>
      {children}
      <canvas
        ref={mountCanvas}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ display: ready ? "block" : "none" }}
      />
    </Ctx.Provider>
  );
}

export const usePageTransition = () => useContext(Ctx);