FROM node:20-slim
WORKDIR /app
COPY ./package*.json /app/
RUN npm install
COPY ./server/ /app/server/
COPY ./dist/ /app/dist/
EXPOSE 4173
CMD [ "npm", "run", "start" ]
