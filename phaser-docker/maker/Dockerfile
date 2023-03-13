

FROM node:16.14.2


WORKDIR /data
RUN git clone https://github.com/fcu-d0843556/Phaser-Game-Maker.git /data/app
RUN ls
WORKDIR /data/app
RUN npm install

RUN ls

CMD ["npm", "start"]
