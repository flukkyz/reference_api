FROM node:12.20.1-alpine3.10

ENV TZ=Asia/Bangkok

RUN mkdir -p /app
COPY . /app/

WORKDIR /app
RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]