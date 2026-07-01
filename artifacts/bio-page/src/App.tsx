import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Background3D } from '@/components/Background3D';
import { VerificationBadge } from '@/components/VerificationBadge';

// Import static assets
import profileImg from '@assets/profile-amin.jpg';
import gamingImg from '@assets/gaming-site-cover.jpg';
import rechargeImg from '@assets/recharge-site-cover.jpg';

const queryClient = new QueryClient();

// Links data
const LINKS = [
  {
    id: 1,
    title: 'موقع العاب',
    url: 'https://amins-a.web.app',
    image: gamingImg,
  },
  {
    id: 2,
    title: 'موقع تعبيئة مجانية',
    url: 'https://neon-sunburst-0bf351.netlify.app',
    image: rechargeImg,
  }
];

function Home() {
  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start pt-20 pb-12 px-4 overflow-x-hidden">
      {/* 3D Background */}
      <Background3D />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center">
        {/* Profile Image */}
        <div className="relative mb-6">
          <div className="profile-ring w-[140px] h-[140px] rounded-full flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <img 
              src={profileImg} 
              alt="amin.amin_1.0 profile" 
              className="w-full h-full rounded-full object-cover border-2 border-primary/50 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            />
          </div>
        </div>

        {/* Username */}
        <div className="flex items-center justify-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary drop-shadow-[0_2px_10px_rgba(0,255,255,0.4)]">
            amin.amin_1.0
          </h1>
          <VerificationBadge />
        </div>

        {/* Link Cards */}
        <div className="w-full flex flex-col gap-6">
          {LINKS.map((link) => (
            <a 
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card relative flex items-stretch h-28 sm:h-32 w-full rounded-2xl overflow-hidden group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Left Side: Thumbnail Image */}
              <div className="w-2/5 min-w-[120px] max-w-[160px] h-full relative overflow-hidden bg-muted shrink-0">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-300"></div>
                <img 
                  src={link.image} 
                  alt={link.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Border separator */}
                <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
              </div>

              {/* Right Side: Title */}
              <div className="flex-1 flex items-center justify-start p-5 sm:p-6 bg-card/40 hover:bg-card/60 transition-colors" dir="rtl">
                <h2 className="font-arabic font-bold text-xl sm:text-2xl text-white group-hover:text-primary transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  {link.title}
                </h2>
              </div>
              
              {/* Subtle neon glow on the right edge */}
              <div className="absolute right-0 top-1/4 bottom-1/4 w-[2px] bg-secondary opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_hsl(var(--secondary))] transition-all duration-300 rounded-full"></div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

// Fallback for unknown routes (though not strictly necessary here, keeps standard structure)
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

function App() {
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

export default App;
