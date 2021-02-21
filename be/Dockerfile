FROM node:15.6.0-alpine3.12 as be-build
COPY package.json /app/be/package.json
COPY yarn.lock /app/be/yarn.lock
RUN yarn --cwd /app/be --prod install
RUN yarn cache clean
COPY . /app/be
CMD yarn --cwd /app/be start