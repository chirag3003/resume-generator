import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Palette,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ResumeBuilder</span>
            </div>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Free & ATS-Optimized
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Create a Professional Resume in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                Minutes
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
              Build stunning, ATS-friendly resumes with our intuitive editor.
              Choose from beautiful templates and download as PDF instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 text-lg px-8 py-6">
                  Start Building Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-lg px-8 py-6"
              >
                View Templates
              </Button>
            </div>
            <div className="mt-8 text-sm font-medium text-slate-900 dark:text-slate-200">
              Built by{" "}
              <a
                href="https://chirag.codes"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                Chirag Bhalotia
              </a>
            </div>
          </div>

          {/* Hero Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent z-10 pointer-events-none h-32 bottom-0 top-auto" />
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 sm:p-8 shadow-2xl">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-[300px] sm:h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Resume Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful features designed to help you create the perfect resume
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "ATS-Optimized",
                description:
                  "Our templates are designed to pass Applicant Tracking Systems with ease.",
              },
              {
                icon: Palette,
                title: "Beautiful Templates",
                description:
                  "Choose from Classic, Modern, and Minimal designs to match your style.",
              },
              {
                icon: Download,
                title: "Instant PDF Export",
                description:
                  "Download your resume as a professional PDF with one click.",
              },
              {
                icon: Zap,
                title: "Real-Time Preview",
                description:
                  "See your changes instantly with our live preview editor.",
              },
              {
                icon: FileText,
                title: "Drag & Drop",
                description:
                  "Easily reorder sections and items with intuitive drag and drop.",
              },
              {
                icon: Sparkles,
                title: "Mobile Friendly",
                description:
                  "Create and edit your resume on any device, anywhere.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Templates Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Choose Your Style
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Three professionally designed templates to fit your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Classic ATS",
                description: "Clean, traditional layout optimized for ATS",
                color: "from-slate-600 to-slate-800",
              },
              {
                name: "Modern",
                description: "Bold header with contemporary styling",
                color: "from-blue-600 to-indigo-700",
              },
              {
                name: "Minimal",
                description: "Elegant typography with refined spacing",
                color: "from-violet-500 to-purple-700",
              },
            ].map((template, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`h-48 bg-gradient-to-br ${template.color} flex items-center justify-center`}
                >
                  <FileText className="h-16 w-16 text-white/50" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {template.description}
                  </p>
                  <Link href="/builder">
                    <Button variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold text-white">ResumeBuilder</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <p>© {new Date().getFullYear()} ResumeBuilder.</p>
              <p className="hidden sm:block text-slate-700 dark:text-slate-600">
                |
              </p>
              <p>
                Built by{" "}
                <a
                  href="https://chirag.codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-200 hover:text-white hover:underline transition-colors"
                >
                  Chirag Bhalotia
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
