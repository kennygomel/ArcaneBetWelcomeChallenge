FROM node:8.12.0-alpine

# install http server
RUN npm install -g http-server

# make app folder work directory
ENV APP_HOME /app
WORKDIR $APP_HOME

# copy package.json and package.lock.json
COPY package*.json ./

# copy project files to the work directory
COPY . $APP_HOME

# run npm install
RUN npm install

# build application in production mode
RUN npm run build

# run server
EXPOSE 8080
CMD [ "http-server", "dist" ]
