# Multi-stage Dockerfile for Sage AI Application
# Optimized for Hugging Face Spaces deployment

FROM node:20-slim AS frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app files
COPY . .

# Build Next.js app
RUN npm run build


# Final stage - Python base with Node.js
FROM python:3.11-slim

# Install Node.js
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

# Copy Next.js build from frontend-builder
COPY --from=frontend-builder /app/.next ./.next
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/package*.json ./
COPY --from=frontend-builder /app/node_modules ./node_modules

# Create uploads directory
RUN mkdir -p backend/uploads backend/results

# Expose ports
EXPOSE 7860

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Create startup script
RUN echo '#!/bin/bash\n\
cd /app/backend && python main.py &\n\
BACKEND_PID=$!\n\
cd /app && npm start &\n\
FRONTEND_PID=$!\n\
echo "Backend PID: $BACKEND_PID"\n\
echo "Frontend PID: $FRONTEND_PID"\n\
wait $BACKEND_PID $FRONTEND_PID\n\
' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]
