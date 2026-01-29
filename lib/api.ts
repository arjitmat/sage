/**
 * Sage API Client
 * Handles all communication with FastAPI backend
 */

import { DocumentResults, ProcessResponse } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface UploadResponse {
  document_id: string;
  document_type: string;
  filename: string;
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export const api = {
  /**
   * Health check - verify backend is running
   */
  health: async (): Promise<{ status: string; gemini_configured: boolean }> => {
    const response = await fetch(`${API_BASE}/api/health`);
    if (!response.ok) throw new Error('Health check failed');
    return response.json();
  },

  /**
   * Upload document and get classification
   */
  uploadDocument: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
  },

  /**
   * Process document with selected outputs
   */
  processDocument: async (
    documentId: string,
    selectedOutputs: string[]
  ): Promise<ProcessResponse> => {
    const response = await fetch(`${API_BASE}/api/process/${documentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selected_outputs: selectedOutputs }),
      credentials: 'include', // Include cookies for session tracking
    });

    if (!response.ok) {
      const error = await response.json();

      // Handle rate limit error specially
      if (response.status === 429) {
        throw new RateLimitError(
          error.detail?.message || 'Rate limit exceeded'
        );
      }

      throw new Error(error.detail || 'Processing failed');
    }

    return response.json();
  },

  /**
   * Get results for a processed document
   */
  getResults: async (documentId: string): Promise<ProcessResponse> => {
    const response = await fetch(`${API_BASE}/api/results/${documentId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch results');
    }

    return response.json();
  },

  /**
   * Delete document and results
   */
  deleteDocument: async (documentId: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/api/documents/${documentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Deletion failed');
    }
  },
};
