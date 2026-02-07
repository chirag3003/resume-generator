import {
  ArrowRight,
  Code2,
  Download,
  FileText,
  Github,
  Heart,
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
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/chirag3003/resume-generator"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <Link href="/dashboard">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-800 dark:text-amber-200 text-sm font-medium mb-8">
              <Heart className="h-4 w-4" />
              Open Source Hobby Project
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              A Simple Resume Builder{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                For Developers
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
              Build clean, professional resumes without the bloat. This is a
              free, open-source tool built as a side project to help job seekers
              create simple ATS-friendly resumes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 text-lg px-8 py-6">
                  Start Building
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a
                href="https://github.com/chirag3003/resume-generator"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-lg px-8 py-6"
                >
                  <Github className="h-5 w-5" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What This Tool Does */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What You Can Do Here
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Simple features that help you create a resume without unnecessary
              complexity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Create Multiple Resumes",
                description:
                  "Save different versions for different job applications. All data stays in your browser.",
              },
              {
                icon: Sparkles,
                title: "AI-Assisted Content",
                description:
                  "Bring your own API key (OpenAI, Google, Anthropic) to get help writing resume content.",
              },
              {
                icon: Shield,
                title: "ATS-Friendly Format",
                description:
                  "Clean, simple templates designed to work well with Applicant Tracking Systems.",
              },
              {
                icon: Download,
                title: "PDF Export",
                description:
                  "Download your resume as a PDF ready for job applications.",
              },
              {
                icon: Zap,
                title: "Live Preview",
                description:
                  "See your changes instantly as you type. No page refreshes needed.",
              },
              {
                icon: Palette,
                title: "Template Options",
                description:
                  "Choose between Classic, Modern, or Minimal layouts based on your preference.",
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

      {/* Honest Notes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              A Few Honest Notes
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                <strong className="text-slate-900 dark:text-white">
                  This is a hobby project.
                </strong>{" "}
                I built this to learn and to help people create simple resumes.
                It's not a commercial product with a support team.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  Your data stays in your browser.
                </strong>{" "}
                Nothing is uploaded to any server. This means if you clear your
                browser data, your resumes will be gone. Export PDFs of
                important work.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  AI features require your own API key.
                </strong>{" "}
                I don't provide AI access—you'll need to bring your own OpenAI,
                Google, or Anthropic API key. Keys are stored locally in your
                browser.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  It's open source.
                </strong>{" "}
                Found a bug? Want to add a feature? Contributions are welcome on
                GitHub.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Creator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            About the Creator
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center mb-6">
              <Code2 className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Chirag Bhalotia
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg mb-6">
              Full-stack developer who enjoys building useful tools. I created
              this resume builder as a weekend project and decided to share it
              with others who might find it helpful.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://chirag.codes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                chirag.codes
              </a>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <a
                href="https://github.com/chirag3003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium flex items-center gap-1"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            No account needed. Just start building.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold text-white">ResumeBuilder</span>
              <span className="text-xs bg-amber-900/50 text-amber-200 px-2 py-0.5 rounded-full ml-2">
                Hobby Project
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <a
                href="https://github.com/chirag3003/resume-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Github className="h-4 w-4" />
                Source Code
              </a>
              <span className="hidden sm:block text-slate-700">|</span>
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
