#Taken from tutorial: https://medium.com/greedygame-engineering/so-you-want-to-dockerize-your-react-app-64fbbb74c217
#Try this next time: https://mherman.org/blog/dockerizing-a-react-app/
#the later is better. The following is good too:
#https://blog.aevitas.co.uk/running-react-on-docker-with-nginx/ 
#the popular thing is to use nginx.
# base image
FROM node:9.6.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g

# start app
CMD ["npm", "start"]