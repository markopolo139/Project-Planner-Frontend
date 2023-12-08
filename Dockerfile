FROM node:latest
RUN mkdir -p /frontend
WORKDIR /frontend
COPY package.json /frontend
RUN npm install
ADD src /frontend/src
ADD public /frontend/public
EXPOSE 3000
CMD ["npm", "start"]