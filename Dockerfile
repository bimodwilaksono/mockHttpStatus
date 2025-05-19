FROM node:20-alpine3.21

USER node
WORKDIR /home/node

COPY . .
RUN npm ci

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]