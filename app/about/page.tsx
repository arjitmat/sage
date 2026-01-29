'use client';

import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Sparkles, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-100 dark:bg-sage-800 text-sage-700 dark:text-sage-200 text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>Powered by AI</span>
            </div>
            <h1 className="font-heading font-bold text-5xl md:text-6xl text-sage-900 dark:text-cream-50 mb-6">
              About Sage
            </h1>
            <p className="text-xl text-sage-600 dark:text-sage-300 max-w-3xl mx-auto">
              Transform your documents into actionable insights with AI-powered analysis.
            </p>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-br from-sage-50 to-cream-100 dark:from-sage-900 dark:to-sage-800 rounded-2xl p-12 mb-20">
            <h2 className="font-heading font-bold text-3xl text-sage-900 dark:text-cream-50 text-center mb-12">
              How It Works
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-sage-500 text-white font-heading font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-heading font-semibold text-lg text-sage-900 dark:text-cream-50 mb-2">
                  Upload Document
                </h3>
                <p className="text-sm text-sage-600 dark:text-sage-300">
                  Upload your PDF or image document
                </p>
              </div>

              <div className="hidden md:block text-sage-400 text-2xl">→</div>

              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-terracotta-500 text-white font-heading font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-heading font-semibold text-lg text-sage-900 dark:text-cream-50 mb-2">
                  AI Processing
                </h3>
                <p className="text-sm text-sage-600 dark:text-sage-300">
                  AI analyzes and generates structured outputs
                </p>
              </div>

              <div className="hidden md:block text-sage-400 text-2xl">→</div>

              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-sage-500 text-white font-heading font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-heading font-semibold text-lg text-sage-900 dark:text-cream-50 mb-2">
                  Get Insights
                </h3>
                <p className="text-sm text-sage-600 dark:text-sage-300">
                  View, interact with, and download your results
                </p>
              </div>
            </div>
          </div>

          {/* Output Formats */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-sage-900 dark:text-cream-50 mb-4">
              7 Intelligent Output Formats
            </h2>
            <p className="text-lg text-sage-600 dark:text-sage-300 mb-12">
              Each output is specifically designed and optimized by AI
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Executive Summary',
                  desc: 'Key findings, arguments, and conclusions extracted',
                },
                {
                  name: 'FAQs',
                  desc: 'Anticipated questions with comprehensive answers',
                },
                {
                  name: 'Knowledge Quiz',
                  desc: 'Interactive multiple-choice questions to test understanding',
                },
                {
                  name: 'Multi-Perspective Analysis',
                  desc: 'Supporting and challenging arguments with balanced perspective',
                },
                {
                  name: 'Mind Map',
                  desc: 'Visual hierarchy of concepts and relationships',
                },
                {
                  name: 'Presentation Slides',
                  desc: 'Ready-to-use slide deck with key points',
                },
                {
                  name: 'Visual Infographic',
                  desc: 'One-page summary with stats and highlights',
                },
              ].map((output, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-dark-card p-6 rounded-xl border border-sage-200 dark:border-sage-700 hover:border-sage-400 dark:hover:border-sage-500 transition-all"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sage-100 dark:bg-sage-800 mb-3 mx-auto">
                    <CheckCircle className="text-sage-500" size={20} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-sage-900 dark:text-cream-50 mb-2">
                    {output.name}
                  </h3>
                  <p className="text-sm text-sage-600 dark:text-sage-300">{output.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
