FROM node:20

WORKDIR /nodejs-postgres-restful
COPY package.json .
RUN npm install
COPY .. .
RUN npx prisma generate
CMD npm start