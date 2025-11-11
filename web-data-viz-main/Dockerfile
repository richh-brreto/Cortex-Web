FROM node:latest
WORKDIR /
RUN mkdir -p /home/node/app/node-modules && chown -R node:node /home/node/app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["node", "app.js"]