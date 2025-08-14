# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm i --production
COPY server.js ./
# If you have thumbs/ and videos/ locally and want them baked into image:
# COPY thumbs ./thumbs
# COPY videos ./videos
EXPOSE 5000
CMD ["node", "server.js"]

