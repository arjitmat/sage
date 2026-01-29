---
title: Sage AI
emoji: 🌿
colorFrom: green
colorTo: blue
sdk: docker
pinned: false
license: mit
---

# Sage AI - Document Intelligence Platform

Transform your documents into actionable insights with AI-powered analysis.

## Features

- **7 Intelligent Output Formats**: Executive Summary, FAQs, Knowledge Quiz, Multi-Perspective Analysis, Interactive Mind Map, Presentation Slides, and Visual Infographic
- **Multiple Document Types**: Support for PDFs, images, and text documents
- **AI-Powered Processing**: Leverages Google's Gemini 2.5 Flash for intelligent analysis
- **Rate Limiting**: Session-based rate limiting (4 documents per session) for cost control
- **Dark Mode**: Full dark mode support
- **Export Capabilities**: Download all outputs individually or as a complete ZIP package

## How to Use

1. Upload your PDF or image document
2. Select the output formats you want to generate
3. Click "Generate Insights" and wait for AI processing
4. View, interact with, and download your results

## Rate Limiting

- **Limit**: 4 documents per session
- **Reset**: 24 hours
- When the limit is reached, you'll see a notification about upcoming personalized dashboard and subscriptions

## Tech Stack

- **Frontend**: Next.js 15.1, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11
- **AI Model**: Google Gemini 2.5 Flash
- **Deployment**: Docker on Hugging Face Spaces

## Privacy

- Documents are processed temporarily and not stored permanently
- Session-based tracking for rate limiting only
- Your data is secure

---

Built with Google Gemini AI | © 2025 Sage AI
