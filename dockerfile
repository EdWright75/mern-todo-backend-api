FROM timbru31/node-alpine-git

ENV NODE_ENV development

RUN git -C mern-todo-backend-api pull || git clone https://github.com/EdWright75/mern-todo-backend-api

WORKDIR /mern-todo-backend-api

RUN npm ci --only=development

RUN npm install pm2 -g

CMD ["pm2-runtime", "index.js"]

EXPOSE 3000
