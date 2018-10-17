#Taken from tutorial: https://medium.com/greedygame-engineering/so-you-want-to-dockerize-your-react-app-64fbbb74c217
#Try this next time: https://mherman.org/blog/dockerizing-a-react-app/
#the later is better. The following is good too:
#https://blog.aevitas.co.uk/running-react-on-docker-with-nginx/  - use for prod build
#the popular thing is to use nginx. As a side note run systemctl stop nginx before deploying to port 80 or nginx will block serving on port 80

# USE FOR DEV.
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

#USE FOR PROD
#FROM node:9.5 as builder

#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app

#COPY . .

#ENV PATH /usr/src/app/node_modules/.bin:$PATH

#ADD package.json /usr/src/app/package.json
#RUN npm install
#RUN npm install -g react-scripts@1.1.1
#RUN npm run build
#FROM nginx:1.13.3-alpine

#RUN rm -rf /usr/share/nginx/html/*

#COPY nginx/default.conf /etc/nginx/conf.default
#COPY --from=builder /usr/src/app/build /usr/share/nginx/html

#CMD ["nginx", "-g", "daemon off;"]