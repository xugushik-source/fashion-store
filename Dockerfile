FROM node:24-bookworm-slim
WORKDIR /app
COPY --chown=node:node . .
RUN mkdir -p data assets/uploads && chown -R node:node data assets/uploads
USER node
ENV NODE_ENV=production PORT=3000 FASHION_DB=/app/data/fashion.sqlite
EXPOSE 3000
VOLUME ["/app/data", "/app/assets/uploads"]
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "server.mjs"]
