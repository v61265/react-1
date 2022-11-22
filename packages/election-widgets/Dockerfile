ARG NODE_VERSION=14.17.3

FROM node:${NODE_VERSION}

WORKDIR /app

COPY ["Makefile", "package.json", "yarn.lock", "./"]
COPY src /app/src
COPY dev /app/dev

RUN yarn install 

CMD ["make", "dev"]
