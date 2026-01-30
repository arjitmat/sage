# Multi-stage Dockerfile for Sage AI Application
# Optimized for Hugging Face Spaces deployment

FROM node:20-slim AS frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Force cache invalidation for source file changes
# Increment this value to force Docker to rebuild from this point
ARG CACHEBUST=9

# Copy all necessary files for Next.js build
# Source files copied BEFORE config to invalidate cache when they change
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY styles ./styles
COPY types ./types
COPY public ./public
COPY next.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./

# Verify files were copied correctly
RUN echo "=== Verifying copied files ===" && \
    ls -la app/ && \
    echo "=== Checking landing page (app/page.tsx) ===" && \
    grep "Transform Documents" app/page.tsx | head -1 && \
    echo "=== Checking upload page (app/upload/page.tsx) ===" && \
    grep "Transform Your Document" app/upload/page.tsx | head -1

# Clean any existing build artifacts and build Next.js app
RUN rm -rf .next && npm run build


# Final stage - Python base with Node.js
FROM python:3.11-slim

# Install Node.js and other dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Python backend
COPY backend/ ./backend/

# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy Next.js build and necessary files from frontend-builder
COPY --from=frontend-builder /app/.next ./.next
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/package*.json ./
COPY --from=frontend-builder /app/node_modules ./node_modules
COPY --from=frontend-builder /app/next.config.ts ./

# Create uploads directory
RUN mkdir -p backend/uploads backend/results

# Expose port 7860 for Hugging Face Spaces
EXPOSE 7860

# Set environment variables
ENV NODE_ENV=production
ENV PORT=7860
ENV NEXT_TELEMETRY_DISABLED=1
ENV BACKEND_URL=http://localhost:8000

# Create startup script
RUN echo '#!/bin/bash\n\
set -e\n\
echo "Starting Sage AI..."\n\
cd /app/backend && python main.py &\n\
BACKEND_PID=$!\n\
echo "Backend started on PID: $BACKEND_PID"\n\
sleep 5\n\
cd /app && npm start -- -p 7860 &\n\
FRONTEND_PID=$!\n\
echo "Frontend started on PID: $FRONTEND_PID"\n\
wait -n\n\
exit $?\n\
' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]
