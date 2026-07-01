import { useEffect, useRef } from 'react';
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
  { id: 1, title: 'موقع العاب',         url: 'https://amins-a.web.app',                 image: gamingImg  },
  { id: 2, title: 'موقع تعبيئة مجانية', url: 'https://neon-sunburst-0bf351.netlify.app', image: rechargeImg },
];

/* ---------- بانر صغير بين الروابط والأسفل ---------- */
function BannerAd() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//data527.click/38c4be666596252450d5/f839381d57/?placementName=alA';
    s.async = true;
    ref.current.appendChild(s);
  }, []);
  return (
    <div
      ref={ref}
      className="w-full overflow-hidden rounded-lg opacity-70 min-h-[50px] max-h-[90px] flex items-center justify-center"
    />
  );
}

function Home() {
  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col items-center pb-10 px-4 overflow-x-hidden">
      <Background3D />

      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center pt-12">

        {/* ── صورة الملف الشخصي ── */}
        <div className="profile-ring w-[90px] h-[90px] rounded-full mb-3 shrink-0">
          <img src={profileImg} alt="amin.amin_1.0" className="w-full h-full rounded-full object-cover" />
        </div>

        {/* ── الاسم + علامة التوثيق ── */}
        <div className="flex items-center gap-1 mb-1">
          <h1 className="text-lg font-black tracking-wide text-white font-sans">amin.amin_1.0</h1>
          <VerificationBadge />
        </div>

        {/* فاصل رفيع */}
        <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary mb-6 opacity-60" />

        {/* ── بطاقات الروابط ── */}
        <div className="w-full flex flex-col gap-3 mb-6">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card relative flex items-center h-[58px] w-full rounded-2xl overflow-hidden group outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="w-[58px] h-full shrink-0 relative overflow-hidden bg-muted">
                <img src={link.image} alt={link.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors" />
                <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
              </div>
              <div className="flex-1 flex items-center justify-center px-3" dir="rtl">
                <span className="font-arabic font-bold text-[15px] text-white group-hover:text-primary transition-colors">
                  {link.title}
                </span>
              </div>
              <span className="text-muted-foreground group-hover:text-primary transition-colors text-xs mr-3 shrink-0">›</span>
            </a>
          ))}
        </div>

        {/* ── بانر إعلاني صغير تحت الروابط ── */}
        <BannerAd />

      </div>
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
