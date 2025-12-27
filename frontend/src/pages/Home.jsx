import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, ShieldCheck, Activity, ArrowRight, CheckCircle2, 
  Calendar, Users, Menu, X, Zap, BarChart3, Bell, Settings,
  ChevronRight, Star, Sparkles
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative">
      
      {/* ===== ANIMATED BACKGROUND BLOBS ===== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* ===== NAVBAR ===== */}
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navigate={navigate}
      />

      {/* ===== HERO SECTION ===== */}
      <HeroSection navigate={navigate} />

      {/* ===== FEATURES SECTION ===== */}
      <FeaturesSection />

      {/* ===== STATS SECTION ===== */}
      <StatsSection />

      {/* ===== PRICING SECTION ===== */}
      <PricingSection />

      {/* ===== CTA SECTION ===== */}
      <CTASection navigate={navigate} />

      {/* ===== FOOTER ===== */}
      <Footer navigate={navigate} />

      {/* ===== STYLES ===== */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};
const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen, navigate }) => (
  <nav className="relative z-50 w-full backdrop-blur-md border-b border-white/10 bg-slate-900/50 sticky top-0">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
      
      {/* Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => navigate('/')}
      >
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
          <Wrench className="text-white h-5 w-5 md:h-6 md:w-6" />
        </div>
        <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          GearGuard
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <a href="#features" className="hover:text-white transition-colors duration-200 relative group">
          Features
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
        </a>
        <a href="#pricing" className="hover:text-white transition-colors duration-200 relative group">
          Pricing
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
        </a>
        <a href="#about" className="hover:text-white transition-colors duration-200 relative group">
          About Us
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
        </a>
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2">
          Log In
        </button>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="px-5 py-2.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        >
          Get Started
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>

    {/* Mobile Dropdown Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-4 flex flex-col gap-2 shadow-2xl">
        <a 
          href="#features" 
          className="block p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Features
        </a>
        <a 
          href="#pricing" 
          className="block p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Pricing
        </a>
        <a 
          href="#about" 
          className="block p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          About Us
        </a>
        <div className="h-px bg-white/10 my-2" />
        <button className="w-full py-3 text-center text-gray-300 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-colors">
          Log In
        </button>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-100 transition-colors"
        >
          Get Started
        </button>
      </div>
    )}
  </nav>
);

// ============================================
// HERO SECTION
// ============================================
const HeroSection = ({ navigate }) => (
  <section className="relative z-10 pt-16 pb-24 md:pt-28 md:pb-36 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto text-center">
      
      {/* Announcement Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs md:text-sm font-medium mb-8">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
        </span>
        <span>Introducing AI-Powered Maintenance Predictions</span>
        <Sparkles className="w-4 h-4" />
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 md:mb-8">
        <span className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">Seamlessly Connect</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Equipment, Teams & Requests
        </span>
      </h1>

      {/* Subheadline */}
      <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed px-2">
        Automate preventive maintenance, track asset lifecycles, and empower your technicians with the ultimate CMMS platform.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
        >
          Start Free Trial 
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2">
          <Activity className="w-5 h-5" />
          Watch Demo
        </button>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>No credit card required</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>14-day free trial</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Cancel anytime</span>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="mt-16 md:mt-24 relative mx-auto max-w-5xl px-2 sm:px-4">
        {/* Glow effect behind */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl opacity-50" />
        
        {/* Dashboard mockup */}
        <div className="relative rounded-2xl lg:rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/20">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-lg bg-white/5 text-xs text-gray-400">
                <span className="w-3 h-3 rounded-full bg-emerald-500/50" />
                gearguard.app/dashboard
              </div>
            </div>
          </div>
          
          {/* Dashboard content preview */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Equipment', value: '247', icon: Wrench, color: 'text-blue-400', bg: 'bg-blue-500/20' },
                { label: 'Open Requests', value: '18', icon: Bell, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
                { label: 'Completed', value: '89', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
                { label: 'Teams Active', value: '12', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/20' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* Placeholder chart area */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-40 flex items-center justify-center">
              <div className="flex items-center gap-4 text-gray-500">
                <BarChart3 className="w-8 h-8" />
                <span className="text-sm font-medium">Real-time Analytics Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ============================================
// FEATURES SECTION
// ============================================
const FeaturesSection = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Centralized Asset Database",
      description: "Track ownership, serial numbers, warranty info, and location for every machine or vehicle.",
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/30"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Schedule routine checkups on a calendar view. Automatically notify technicians before deadlines.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/30"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Assign requests to Electricians, Mechanics, or IT Support with dedicated workflows.",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/30"
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Predict equipment failures before they happen with machine learning algorithms.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get actionable insights with real-time dashboards and cost tracking metrics.",
      gradient: "from-indigo-500/20 to-blue-500/20",
      iconColor: "text-indigo-400",
      borderColor: "border-indigo-500/30"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Never miss a deadline with intelligent alerts via email, SMS, or push notifications.",
      gradient: "from-rose-500/20 to-red-500/20",
      iconColor: "text-rose-400",
      borderColor: "border-rose-500/30"
    }
  ];

  return (
    <section id="features" className="relative z-10 py-20 md:py-32 border-t border-white/5 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-300 text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Complete Maintenance <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Control</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Everything you need to manage corrective breakdowns and routine checkups in one powerful platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, gradient, iconColor, borderColor }) => (
  <div className={`group p-6 md:p-8 rounded-3xl bg-gradient-to-br ${gradient} border border-white/10 backdrop-blur-xl hover:scale-[1.02] transition-all duration-300`}>
    <div className={`w-14 h-14 rounded-2xl bg-slate-900/50 flex items-center justify-center mb-6 border ${borderColor} group-hover:scale-110 transition-transform duration-300`}>
      <Icon className={`w-7 h-7 ${iconColor}`} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

// ============================================
// STATS SECTION
// ============================================
const StatsSection = () => {
  const stats = [
    { value: "10K+", label: "Assets Managed" },
    { value: "500+", label: "Happy Customers" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "4.9", label: "Customer Rating", icon: Star },
  ];

  return (
    <section className="relative z-10 py-16 md:py-24 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2">
                {stat.value}
                {stat.icon && <stat.icon className="w-8 h-8 text-yellow-400 fill-yellow-400" />}
              </div>
              <p className="text-gray-500 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PRICING SECTION
// ============================================
const PricingSection = () => {
  const plans = [
    {
      title: "Starter",
      price: "$0",
      period: "/mo",
      description: "Perfect for small workshops",
      features: ["Up to 20 Assets", "Basic Work Orders", "1 Maintenance Team", "Email Support"],
      isPopular: false
    },
    {
      title: "Professional",
      price: "$49",
      period: "/mo",
      description: "For growing manufacturing plants",
      features: ["Unlimited Assets", "Preventive Calendar", "Smart Automations", "5 Maintenance Teams", "Priority Support", "API Access"],
      isPopular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large-scale operations",
      features: ["Unlimited Everything", "Custom API Access", "Dedicated Account Manager", "SSO & Audit Logs", "On-premise Option", "24/7 Phone Support"],
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="relative z-10 py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
            Choose the plan that fits your facility size. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ title, price, period, features, isPopular, description }) => (
  <div 
    className={`relative p-6 md:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${
      isPopular 
        ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-purple-500/50 shadow-2xl shadow-purple-900/20' 
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    }`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg">
        Most Popular
      </div>
    )}
    
    <div className="text-center mb-8">
      <h3 className="text-lg font-medium text-gray-300 mb-2">{title}</h3>
      <div className="flex items-end justify-center gap-1 mb-4">
        <span className="text-4xl md:text-5xl font-bold text-white">{price}</span>
        <span className="text-gray-500 mb-2">{period}</span>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    
    <ul className="space-y-4 mb-8">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isPopular ? 'text-purple-400' : 'text-gray-500'}`} />
          {feature}
        </li>
      ))}
    </ul>
    
    <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
      isPopular 
        ? 'bg-white text-slate-900 hover:bg-gray-100' 
        : 'bg-white/10 text-white hover:bg-white/20'
    }`}>
      {isPopular ? 'Get Started' : `Choose ${title}`}
    </button>
  </div>
);

// ============================================
// CTA SECTION
// ============================================
const CTASection = ({ navigate }) => (
  <section id="about" className="relative z-10 py-20 md:py-32 px-4 sm:px-6 border-t border-white/10">
    <div className="max-w-4xl mx-auto text-center">
      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-blue-600/20 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          Ready to transform your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">maintenance operations?</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of facilities using GearGuard to reduce downtime, cut costs, and extend equipment life.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
          >
            Start Your Free Trial
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2">
            <Settings className="w-5 h-5" />
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

// ============================================
// FOOTER
// ============================================
const Footer = ({ navigate }) => (
  <footer className="relative z-10 bg-black/40 border-t border-white/10 pt-16 md:pt-20 pb-8 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 text-center md:text-left">
        {/* Brand */}
        <div className="col-span-1">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Wrench className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-white">GearGuard</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            The ultimate solution for maintenance management and equipment lifecycle tracking.
          </p>
        </div>
        
        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#features" className="hover:text-purple-400 transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Integrations</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Changelog</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#about" className="hover:text-purple-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Security</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">GDPR</a></li>
          </ul>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <p>&copy; 2025 GearGuard Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Index;