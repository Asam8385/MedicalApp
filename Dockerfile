# frontend/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 6003
CMD [ "npm", "start" ]