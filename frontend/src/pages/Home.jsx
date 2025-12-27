import {
  Activity,
  CheckCircle,
  Clock,
  Calendar,
  Users,
  Wrench,
  Layers,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  Menu,
  X,
  TrendingUp,
  AlertCircle,
  FileText,
  Settings
} from "lucide-react";
import { useState } from "react";

export default function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="backdrop-blur-xl bg-white/10 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl border border-white/20">
                  <Activity className="w-6 h-6 text-blue-300" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  GearGuard
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <a href="#home" className="text-white hover:text-blue-300 transition-colors font-medium">Home</a>
                <a href="#features" className="text-white hover:text-blue-300 transition-colors font-medium">Features</a>
                <a href="#how-it-works" className="text-white hover:text-blue-300 transition-colors font-medium">How It Works</a>
                <a href="#dashboard" className="text-blue-300 hover:text-blue-200 transition-colors font-semibold">Dashboard</a>
              </div>

              <div className="hidden md:flex items-center gap-3">
                <button className="px-5 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all font-medium">
                  Login
                </button>
                <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition-all shadow-lg">
                  Get Started
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 space-y-3 pb-4">
                <a href="#home" className="block text-white hover:text-blue-300 transition-colors font-medium">Home</a>
                <a href="#features" className="block text-white hover:text-blue-300 transition-colors font-medium">Features</a>
                <a href="#how-it-works" className="block text-white hover:text-blue-300 transition-colors font-medium">How It Works</a>
                <a href="#dashboard" className="block text-blue-300 hover:text-blue-200 transition-colors font-semibold">Dashboard</a>
                <div className="pt-3 space-y-2">
                  <button className="w-full px-5 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium">
                    Login
                  </button>
                  <button className="w-full px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium">
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Smart Maintenance.
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Zero Downtime.
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Digitize, track, and manage industrial maintenance with real-time visibility. Streamline workflows and prevent costly equipment failures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-lg transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-2">
                  Create Maintenance Request
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/15 transition-all flex items-center justify-center gap-2">
                  View Kanban Dashboard
                  <Layers className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <Wrench className="w-8 h-8 text-blue-300" />
                    <div>
                      <p className="text-white font-semibold">Equipment Monitoring</p>
                      <p className="text-gray-400 text-sm">Real-time status tracking</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <Users className="w-8 h-8 text-purple-300" />
                    <div>
                      <p className="text-white font-semibold">Team Coordination</p>
                      <p className="text-gray-400 text-sm">Smart technician assignment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <Calendar className="w-8 h-8 text-pink-300" />
                    <div>
                      <p className="text-white font-semibold">Preventive Scheduling</p>
                      <p className="text-gray-400 text-sm">Avoid equipment failures</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Clock} title="50% Faster" subtitle="Issue Resolution" color="blue" />
            <StatCard icon={Zap} title="Smart Assignment" subtitle="Workflow Automation" color="purple" />
            <StatCard icon={BarChart3} title="Real-Time" subtitle="Status Tracking" color="pink" />
            <StatCard icon={Calendar} title="Preventive" subtitle="Maintenance Scheduling" color="cyan" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features for Modern Maintenance
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to manage industrial equipment maintenance efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={FileText}
              title="Request Management"
              description="Create, track, and manage maintenance requests with detailed workflows"
            />
            <FeatureCard
              icon={Layers}
              title="Kanban Board"
              description="Visual drag-and-drop interface for managing maintenance tasks"
            />
            <FeatureCard
              icon={Calendar}
              title="Calendar Scheduling"
              description="Schedule preventive maintenance and view upcoming tasks"
            />
            <FeatureCard
              icon={Shield}
              title="Role-Based Access"
              description="Employee and manager roles with appropriate permissions"
            />
            <FeatureCard
              icon={Users}
              title="Technician Assignment"
              description="Intelligent assignment based on workload and expertise"
            />
            <FeatureCard
              icon={Settings}
              title="Maintenance Types"
              description="Handle both preventive and corrective maintenance workflows"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300">
              Simple, streamlined workflow from issue to resolution
            </p>
          </div>

          <div className="space-y-6">
            <WorkflowStep
              number={1}
              title="Employee Raises Request"
              description="Factory employee identifies an issue and creates a maintenance request with details"
              icon={AlertCircle}
            />
            <WorkflowStep
              number={2}
              title="Manager Reviews & Assigns"
              description="Maintenance manager reviews the request and assigns it to the right technician"
              icon={Users}
            />
            <WorkflowStep
              number={3}
              title="Task Moves Through Kanban"
              description="Work progresses through stages: New → In Progress → Repaired → Scrap"
              icon={Layers}
            />
            <WorkflowStep
              number={4}
              title="Scheduled via Calendar"
              description="Preventive maintenance tasks are scheduled on the maintenance calendar"
              icon={Calendar}
            />
            <WorkflowStep
              number={5}
              title="Issue Resolved & Closed"
              description="Technician completes the work and the request is marked as repaired"
              icon={CheckCircle}
            />
          </div>
        </section>

        {/* Role-Based Experience */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built for Your Team
            </h2>
            <p className="text-xl text-gray-300">
              Tailored experiences for employees and managers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RoleCard
              title="For Employees"
              icon={Wrench}
              features={[
                "Raise maintenance issues in seconds",
                "Track request status in real-time",
                "View maintenance history",
                "Simple, intuitive interface"
              ]}
              color="blue"
            />
            <RoleCard
              title="For Managers"
              icon={Users}
              features={[
                "Assign technicians efficiently",
                "Monitor team workload",
                "Prevent equipment downtime",
                "Analytics and reporting"
              ]}
              color="purple"
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-12 border border-white/20 shadow-2xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Take Control of Your Maintenance Operations
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join leading industrial organizations using GearGuard to reduce downtime and streamline maintenance workflows
            </p>
            <button className="px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xl transition-all shadow-2xl hover:scale-105 flex items-center gap-3 mx-auto">
              Go to Dashboard
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="backdrop-blur-xl bg-white/10 border-t border-white/20 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl border border-white/20">
                    <Activity className="w-5 h-5 text-blue-300" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    GearGuard
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Smart maintenance management for modern industrial operations
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <a href="#dashboard" className="block text-gray-400 hover:text-white transition-colors">Dashboard</a>
                  <a href="#support" className="block text-gray-400 hover:text-white transition-colors">Support</a>
                  <a href="#privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Contact</h3>
                <p className="text-gray-400 text-sm">
                  Enterprise maintenance solutions<br />
                  contact@gearguard.io
                </p>
              </div>
            </div>

            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2025 GearGuard. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon: Icon, title, subtitle, color }) {
  const colorConfig = {
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-400/30",
    purple: "from-purple-500/20 to-pink-500/20 border-purple-400/30",
    pink: "from-pink-500/20 to-rose-500/20 border-pink-400/30",
    cyan: "from-cyan-500/20 to-teal-500/20 border-cyan-400/30"
  };

  return (
    <div className={`backdrop-blur-xl bg-gradient-to-br ${colorConfig[color]} rounded-2xl p-6 border shadow-xl hover:scale-105 transition-all duration-300`}>
      <Icon className="w-10 h-10 text-white mb-4" />
      <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-300 text-sm">{subtitle}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-xl">
      <div className="p-3 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl border border-white/20 w-fit mb-4">
        <Icon className="w-6 h-6 text-blue-300" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function WorkflowStep({ number, title, description, icon: Icon }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg border-2 border-white/20">
            {number}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Icon className="w-5 h-5 text-blue-300" />
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function RoleCard({ title, icon: Icon, features, color }) {
  const colorConfig = {
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-400/30",
    purple: "from-purple-500/20 to-pink-500/20 border-purple-400/30"
  };

  return (
    <div className={`backdrop-blur-xl bg-gradient-to-br ${colorConfig[color]} rounded-2xl p-8 border shadow-xl hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-white/10 rounded-xl">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-200">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}