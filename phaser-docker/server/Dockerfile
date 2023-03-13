

FROM node:16.14.2


WORKDIR /data
RUN git clone https://github.com/fcu-d0843556/Phaser-Game-Server.git /data/app
RUN ls
WORKDIR /data/app
RUN npm install
RUN ls
EXPOSE 5000
CMD [ "npm", "start" ]

