FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]