'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { RateLimitModal } from '@/components/shared/RateLimitModal';
import { Upload, FileText, Loader2, CheckCircle2, FileCheck } from 'lucide-react';
import { api, RateLimitError } from '@/lib/api';

const OUTPUT_OPTIONS = [
  { id: 'summary', label: 'Summary', description: 'Executive summary with key findings' },
  { id: 'faqs', label: 'FAQs', description: 'Frequently asked questions' },
  { id: 'quiz', label: 'Quiz', description: 'Multiple choice questions' },
  { id: 'debate', label: 'Debate', description: 'Multi-perspective analysis' },
  { id: 'mindmap', label: 'Mind Map', description: 'Visual concept hierarchy' },
  { id: 'slides', label: 'Slides', description: 'Presentation outline' },
  { id: 'visual', label: 'Visual', description: 'One-page infographic' },
];

export default function AppPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [selectedOutputs, setSelectedOutputs] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setIsUploading(true);

    try {
      const result = await api.uploadDocument(selectedFile);
      setDocumentId(result.document_id);
      setDocumentType(result.document_type);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      setFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleOutput = (outputId: string) => {
    setSelectedOutputs(prev =>
      prev.includes(outputId)
        ? prev.filter(id => id !== outputId)
        : [...prev, outputId]
    );
  };

  const selectAll = () => {
    setSelectedOutputs(OUTPUT_OPTIONS.map(opt => opt.id));
  };

  const handleProcess = async () => {
    if (!documentId || selectedOutputs.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      await api.processDocument(documentId, selectedOutputs);
      router.push(`/results?document_id=${documentId}`);
    } catch (err: any) {
      // Handle rate limit error with modal
      if (err instanceof RateLimitError) {
        setShowRateLimitModal(true);
        setIsProcessing(false);
        return;
      }

      setError(err.message || 'Processing failed');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-sage-900 dark:text-cream-50 mb-4">
              Transform Your Document
            </h1>
            <p className="text-xl text-sage-600 dark:text-sage-300">
              Upload a document and select the insights you want to generate
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-12">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                dragActive
                  ? 'border-sage-500 bg-sage-50 dark:bg-sage-800/30'
                  : 'border-sage-300 dark:border-sage-600 bg-cream-100 dark:bg-dark-card'
              }`}
            >
              {!file ? (
                <>
                  <Upload className="mx-auto mb-4 text-sage-400" size={48} />
                  <p className="text-lg font-heading font-semibold text-sage-800 dark:text-cream-50 mb-2">
                    Drop your document here
                  </p>
                  <p className="text-sm text-sage-600 dark:text-sage-300 mb-6">
                    or click to browse (PDF, images, text files)
                  </p>
                  <input
                    type="file"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                    accept=".pdf,.png,.jpg,.jpeg,.txt"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin text-sage-500" size={32} />
                      <span className="text-lg font-heading text-sage-700 dark:text-sage-200">
                        Uploading and analyzing...
                      </span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="text-sage-500" size={32} />
                      <div className="text-left">
                        <p className="text-lg font-heading font-semibold text-sage-800 dark:text-cream-50">
                          {file.name}
                        </p>
                        {documentType && (
                          <p className="text-sm text-sage-600 dark:text-sage-300">
                            Type: {documentType}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setFile(null);
                          setDocumentId(null);
                          setDocumentType(null);
                        }}
                        className="ml-auto px-4 py-2 text-sm text-sage-600 dark:text-sage-300 hover:text-sage-800 dark:hover:text-sage-100"
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300">
                {error}
              </div>
            )}
          </div>

          {/* Output Selection */}
          {documentId && !isUploading && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-2xl text-sage-900 dark:text-cream-50">
                  Select Outputs
                </h2>
                <button
                  onClick={selectAll}
                  className="text-sm font-medium text-sage-600 dark:text-sage-300 hover:text-sage-800 dark:hover:text-sage-100"
                >
                  Select All
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {OUTPUT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleOutput(option.id)}
                    className={`p-6 rounded-xl text-left transition-all border-2 ${
                      selectedOutputs.includes(option.id)
                        ? 'border-sage-500 bg-sage-50 dark:bg-sage-800/30'
                        : 'border-sage-200 dark:border-sage-700 bg-cream-100 dark:bg-dark-card hover:border-sage-300 dark:hover:border-sage-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading font-semibold text-lg text-sage-900 dark:text-cream-50">
                        {option.label}
                      </h3>
                      {selectedOutputs.includes(option.id) && (
                        <CheckCircle2 className="text-sage-500 shrink-0" size={20} />
                      )}
                    </div>
                    <p className="text-sm text-sage-600 dark:text-sage-300">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          {documentId && selectedOutputs.length > 0 && (
            <div className="text-center">
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-terracotta-500 to-terracotta-400 text-white rounded-xl font-heading font-bold text-xl shadow-organic hover:shadow-organic-hover transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Insights</span>
                    <span className="text-sm font-normal opacity-90">
                      ({selectedOutputs.length} selected)
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Rate Limit Modal */}
      <RateLimitModal
        isOpen={showRateLimitModal}
        onClose={() => setShowRateLimitModal(false)}
      />
    </div>
  );
}
