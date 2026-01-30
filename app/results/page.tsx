'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { SummaryCard } from '@/components/results/SummaryCard';
import { FAQCard } from '@/components/results/FAQCard';
import { QuizCard } from '@/components/results/QuizCard';
import { DebateCard } from '@/components/results/DebateCard';
import { InteractiveMindMapCard as MindMapCard } from '@/components/results/InteractiveMindMapCard';
import { SlidesCard } from '@/components/results/SlidesCard';
import { VisualCard } from '@/components/results/VisualCard';
import { api } from '@/lib/api';
import { ProcessResponse } from '@/types';
import { Loader2, FileText, CheckCircle2, Download, Share2, AlertCircle, FileDown } from 'lucide-react';
import {
  copyShareLink,
  downloadVisualInfographic
} from '@/lib/downloads';
import {
  exportSummaryAsPDF,
  exportFAQsAsPDF,
  exportQuizAsPDF,
  exportDebateAsPDF,
  exportSlidesAsPDF,
  exportMindMapAsPNG,
  downloadAllAsZip
} from '@/lib/pdfExports';

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const documentId = searchParams.get('document_id');

  const [results, setResults] = useState<ProcessResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!documentId) {
      setError('No document ID provided');
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const data = await api.getResults(documentId);
        setResults(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [documentId]);

  // Download handlers
  const handleDownloadAll = async () => {
    if (results && documentId) {
      try {
        await downloadAllAsZip(results, documentId);
      } catch (error) {
        console.error('Failed to download all results:', error);
      }
    }
  };

  const handleShareLink = () => {
    if (documentId) {
      copyShareLink(documentId);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    }
  };

  const handleDownloadSummary = () => {
    if (results?.results?.summary && documentId) {
      exportSummaryAsPDF(results.results.summary, documentId);
    }
  };

  const handleDownloadFAQs = () => {
    if (results?.results?.faqs && documentId) {
      exportFAQsAsPDF(results.results.faqs, documentId);
    }
  };

  const handleDownloadQuiz = () => {
    if (results?.results?.quiz && documentId) {
      exportQuizAsPDF(results.results.quiz, documentId);
    }
  };

  const handleDownloadDebate = () => {
    if (results?.results?.debate && documentId) {
      exportDebateAsPDF(results.results.debate, documentId);
    }
  };

  const handleDownloadSlides = async () => {
    if (results?.results?.slides && documentId) {
      try {
        await exportSlidesAsPDF(results.results.slides, documentId);
      } catch (error) {
        console.error('Failed to export slides:', error);
      }
    }
  };

  const handleDownloadVisual = () => {
    if (results?.results?.visual && documentId) {
      const visual = results.results.visual as any;
      if (visual.ai_infographic) {
        downloadVisualInfographic(visual.ai_infographic, documentId);
      }
    }
  };

  const handleDownloadMindMap = async () => {
    if (results?.results?.mindmap && documentId) {
      try {
        const blob = await exportMindMapAsPNG('mindmap-container', documentId);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const timestamp = new Date().toISOString().split('T')[0];
        link.download = `sage-mindmap-${documentId}-${timestamp}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Failed to export mind map:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin text-sage-500 mx-auto mb-4" size={48} />
            <p className="text-xl font-heading text-sage-700 dark:text-sage-200">
              Loading your results...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
            <h2 className="font-heading font-bold text-2xl text-sage-900 dark:text-cream-50 mb-2">
              Results Not Found
            </h2>
            <p className="text-sage-600 dark:text-sage-300 mb-6">
              {error || 'The results you are looking for could not be found.'}
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-xl font-heading font-semibold transition-all"
            >
              Process New Document
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const outputCount = results.results ? Object.keys(results.results).length : 0;

  return (
    <div className="min-h-screen flex flex-col font-sans text-sage-800 dark:text-cream-50 bg-cream-50 dark:bg-sage-900 transition-colors duration-300">
      <Navbar />

      {/* Header Section */}
      <div className="bg-cream-100 dark:bg-sage-900/50 border-b border-sage-500/20 pt-6 pb-6 px-4 md:px-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 text-sm text-sage-500 mb-4">
            <Link href="/" className="hover:text-terracotta-500 transition-colors">
              Home
            </Link>{' '}
            /{' '}
            <Link href="/app" className="hover:text-terracotta-500 transition-colors">
              App
            </Link>{' '}
            / <span className="text-sage-800 dark:text-cream-50 font-medium">Results</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-terracotta-100 dark:bg-terracotta-900/30 flex items-center justify-center text-terracotta-600 dark:text-terracotta-400">
                <FileText size={20} />
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl md:text-2xl text-sage-900 dark:text-cream-50">
                  Document Analysis Complete
                </h1>
                <div className="flex items-center gap-2 text-xs md:text-sm text-sage-600 dark:text-sage-400">
                  <span className="flex items-center gap-1 text-sage-600 dark:text-sage-400">
                    <CheckCircle2 size={14} className="text-sage-500" /> {outputCount} outputs
                    generated
                  </span>
                  <span>•</span>
                  <span>Processed just now</span>
                </div>
              </div>
            </div>

            <Link
              href="/upload"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-sage-500 text-sage-700 dark:text-sage-200 hover:bg-sage-50 dark:hover:bg-sage-800 transition-all font-medium text-sm"
            >
              Process Another Document
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-12 pb-24">
        {/* Hero */}
        <div className="py-12 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-sage-900 dark:text-cream-50 mb-3">
            Your Knowledge, Transformed
          </h2>
          <p className="text-sage-600 dark:text-sage-300 text-lg max-w-2xl mx-auto">
            Explore your document through {outputCount} different lenses, designed to help you
            understand, retain, and present information effectively.
          </p>
        </div>

        {/* Sticky Quick Actions */}
        <div
          className={`sticky top-[80px] z-30 mb-12 transition-all duration-300 ${
            scrolled ? 'py-4' : 'py-0'
          }`}
        >
          <div
            className={`bg-cream-100/90 dark:bg-dark-card/90 backdrop-blur-md border border-sage-500/10 rounded-2xl p-4 shadow-sm flex flex-wrap gap-4 items-center justify-between ${
              scrolled ? 'shadow-md' : ''
            }`}
          >
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button
                onClick={handleDownloadAll}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-xl font-heading font-medium transition-all shadow-sm hover:shadow-md"
              >
                <Download size={18} /> Download All (ZIP)
              </button>
              <button
                onClick={handleShareLink}
                className="relative flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 border border-sage-300 dark:border-sage-600 text-sage-700 dark:text-sage-200 hover:bg-white dark:hover:bg-sage-800 rounded-xl font-medium transition-colors"
              >
                <Share2 size={18} /> {showCopySuccess ? 'Link Copied!' : 'Share Link'}
              </button>
            </div>
          </div>
        </div>

        {/* Output Grid */}
        <div className="flex flex-col gap-12">
          {results.results?.summary && (
            <SummaryCard data={results.results.summary} onDownload={handleDownloadSummary} />
          )}
          {results.results?.faqs && (
            <FAQCard items={results.results.faqs} onDownload={handleDownloadFAQs} />
          )}
          {results.results?.quiz && (
            <QuizCard questions={results.results.quiz} onDownload={handleDownloadQuiz} />
          )}
          {results.results?.debate && (
            <DebateCard data={results.results.debate} onDownload={handleDownloadDebate} />
          )}
          {results.results?.mindmap && (
            <MindMapCard nodes={results.results.mindmap} onDownload={handleDownloadMindMap} />
          )}
          {results.results?.slides && (
            <SlidesCard slides={results.results.slides} onDownload={handleDownloadSlides} />
          )}
          {results.results?.visual && (
            <VisualCard data={results.results.visual} onDownload={handleDownloadVisual} />
          )}
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sage-500/5 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-sage-900 dark:text-cream-50 mb-4">
            Process Another Document?
          </h2>
          <p className="text-sage-600 dark:text-sage-300 text-lg mb-8">
            Transform your next document into wisdom.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-terracotta-500 to-terracotta-400 text-white rounded-xl font-heading font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Upload New Document
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-sage-500" size={48} />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
