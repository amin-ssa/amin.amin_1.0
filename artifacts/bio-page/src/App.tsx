import { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Background3D } from '@/components/Background3D';
import { VerificationBadge } from '@/components/VerificationBadge';

import profileImg from '@assets/profile-amin.jpg';
import gamingImg from '@assets/gaming-site-cover.jpg';
import rechargeImg from '@assets/recharge-site-cover.jpg';

const queryClient = new QueryClient();

const LINKS = [
  { id: 1, title: 'موقع العاب',           url: 'https://amins-a.web.app',                       image: gamingImg  },
  { id: 2, title: 'موقع تعبيئة مجانية',   url: 'https://neon-sunburst-0bf351.netlify.app',       image: rechargeImg },
];

/* ---------- inject a <script> once ---------- */
function useScript(src: string) {
  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.async = true;
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, [src]);
}

/* ---------- Sticky bottom ad with × ---------- */
function StickyBottomAd() {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//data527.click/38c4be666596252450d5/f839381d57/?placementName=alA';
    s.async = true;
    ref.current.appendChild(s);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="relative pointer-events-auto w-full max-w-[480px] bg-black/80 backdrop-blur-sm border-t border-white/10">
        <button
          onClick={() => setVisible(false)}
          aria-label="إغلاق"
          className="absolute -top-7 right-2 w-6 h-6 rounded-full bg-black/70 border border-white/20 text-white text-xs flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          ✕
        </button>
        <div ref={ref} className="min-h-[60px] flex items-center justify-center overflow-hidden" />
      </div>
    </div>
  );
}

/* ---------- Inline banner slot ---------- */
function BannerAd() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//data527.click/38c4be666596252450d5/f839381d57/?placementName=alA';
    s.async = true;
    ref.current.appendChild(s);
  }, []);
  return (
    <div ref={ref} className="w-full max-w-[480px] mx-auto overflow-hidden rounded-xl opacity-80 min-h-[50px]" />
  );
}

function Home() {
  /* popup ad */
  useScript('//data527.click/ba64e0fc3c45285595fd/09c0d19a5f/?placementName=Alop');
  /* push notifications */
  useScript('//cdn-server.live/eae0c95274d8223167b2/ce7be5321c/?placementName=الافتراض');

  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col items-center pb-20 px-4 overflow-x-hidden">
      <Background3D />

      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center pt-12">

        {/* ── Profile photo ── */}
        <div className="profile-ring w-[90px] h-[90px] rounded-full mb-3 shrink-0">
          <img
            src={profileImg}
            alt="amin.amin_1.0"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* ── Username + badge ── */}
        <div className="flex items-center gap-1 mb-1">
          <h1 className="text-lg font-black tracking-wide text-white font-sans">
            amin.amin_1.0
          </h1>
          <VerificationBadge />
        </div>

        {/* thin separator */}
        <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary mb-6 opacity-60" />

        {/* ── Link cards ── */}
        <div className="w-full flex flex-col gap-3 mb-5">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card relative flex items-center h-[58px] w-full rounded-2xl overflow-hidden group outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* thumbnail */}
              <div className="w-[58px] h-full shrink-0 relative overflow-hidden bg-muted">
                <img
                  src={link.image}
                  alt={link.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors" />
                <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
              </div>

              {/* title */}
              <div className="flex-1 flex items-center justify-center px-3" dir="rtl">
                <span className="font-arabic font-bold text-[15px] text-white group-hover:text-primary transition-colors">
                  {link.title}
                </span>
              </div>

              {/* arrow */}
              <span className="text-muted-foreground group-hover:text-primary transition-colors text-xs mr-3 shrink-0">›</span>
            </a>
          ))}
        </div>

        {/* ── Inline banner (non-intrusive, between links and footer) ── */}
        <BannerAd />

      </div>

      {/* ── Sticky bottom ad ── */}
      <StickyBottomAd />
    </main>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center font-sans">
        <h1 className="text-4xl font-bold text-primary mb-2">404</h1>
        <p className="text-muted-foreground">Page not found</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
