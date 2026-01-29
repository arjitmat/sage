'use client';

import Link from 'next/link';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { FileText, Brain, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-grow pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-cream-50 to-terracotta-50 dark:from-sage-900 dark:via-sage-800 dark:to-sage-900 opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-100 dark:bg-sage-800 text-sage-700 dark:text-sage-200 text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>Powered by Gemini AI</span>
            </div>

            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-sage-900 dark:text-cream-50 mb-6 leading-tight">
              Transform Documents
              <br />
              into <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-500 to-terracotta-500">Wisdom</span>
            </h1>

            <p className="text-xl md:text-2xl text-sage-600 dark:text-sage-300 mb-10 leading-relaxed">
              Upload any document and receive instant AI-powered insights:
              summaries, quizzes, mind maps, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/app"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-terracotta-500 to-terracotta-400 text-white rounded-xl font-heading font-bold text-lg shadow-organic hover:shadow-organic-hover transition-all duration-300 hover:scale-105"
              >
                Try Sage Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/tech"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-sage-500 text-sage-700 dark:text-sage-200 rounded-xl font-heading font-semibold text-lg hover:bg-sage-50 dark:hover:bg-sage-800 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-cream-100 dark:bg-dark-card rounded-2xl p-8 border border-sage-500/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sage-500/10 dark:bg-sage-500/20 flex items-center justify-center mb-4">
                <FileText className="text-sage-500" size={24} />
              </div>
              <h3 className="font-heading font-bold text-xl text-sage-900 dark:text-cream-50 mb-2">
                7 Output Formats
              </h3>
              <p className="text-sage-600 dark:text-sage-300">
                Summary, FAQs, Quiz, Debate, Mind Map, Slides, and Visual - all from one upload.
              </p>
            </div>

            <div className="bg-cream-100 dark:bg-dark-card rounded-2xl p-8 border border-sage-500/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-terracotta-500/10 dark:bg-terracotta-500/20 flex items-center justify-center mb-4">
                <Brain className="text-terracotta-500" size={24} />
              </div>
              <h3 className="font-heading font-bold text-xl text-sage-900 dark:text-cream-50 mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-sage-600 dark:text-sage-300">
                Gemini 2.5 Flash processes your documents with state-of-the-art understanding.
              </p>
            </div>

            <div className="bg-cream-100 dark:bg-dark-card rounded-2xl p-8 border border-sage-500/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sage-500/10 dark:bg-sage-500/20 flex items-center justify-center mb-4">
                <Sparkles className="text-sage-500" size={24} />
              </div>
              <h3 className="font-heading font-bold text-xl text-sage-900 dark:text-cream-50 mb-2">
                Instant Results
              </h3>
              <p className="text-sage-600 dark:text-sage-300">
                Get comprehensive insights in seconds. No waiting, no complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-cream-100 dark:bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-sage-900 dark:text-cream-50 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-sage-600 dark:text-sage-300">
              Three simple steps to transform your documents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-sage-500 text-white font-heading font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                1
              </div>
              <h3 className="font-heading font-bold text-xl text-sage-900 dark:text-cream-50 mb-3">
                Upload
              </h3>
              <p className="text-sage-600 dark:text-sage-300">
                Drop your PDF, image, or text document. We support all formats.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-terracotta-500 text-white font-heading font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                2
              </div>
              <h3 className="font-heading font-bold text-xl text-sage-900 dark:text-cream-50 mb-3">
                Select
              </h3>
              <p className="text-sage-600 dark:text-sage-300">
                Choose which insights you want: summary, quiz, mind map, or all seven.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-sage-500 text-white font-heading font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                3
              </div>
              <h3 className="font-heading font-bold text-xl text-sage-900 dark:text-cream-50 mb-3">
                Explore
              </h3>
              <p className="text-sage-600 dark:text-sage-300">
                Download, share, or interact with your AI-generated insights.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-terracotta-500 to-terracotta-400 text-white rounded-xl font-heading font-bold text-lg shadow-organic hover:shadow-organic-hover transition-all duration-300 hover:scale-105"
            >
              Get Started Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-sage-900 dark:text-cream-50 mb-4">
              Perfect For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Students studying for exams',
              'Researchers analyzing papers',
              'Business professionals reviewing reports',
              'Educators creating teaching materials',
              'Content creators extracting insights',
              'Anyone who reads documents',
            ].map((useCase, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl hover:bg-sage-50 dark:hover:bg-sage-800/30 transition-colors">
                <CheckCircle2 className="text-sage-500 shrink-0 mt-1" size={20} />
                <span className="text-lg text-sage-700 dark:text-sage-200">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-sage-500 to-terracotta-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            Ready to Transform Your Documents?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start extracting insights in seconds. No signup required.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-sage-700 rounded-xl font-heading font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Try Sage Free
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
