# stage 1
FROM node:14.15.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN node --max_old_space_size=7000 node_modules/@angular/cli/bin/ng build --prod

# stage 2
FROM nginx:1.16.1-alpine
COPY --from=node /app/dist/titamediapp-frontend /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /tmp/nginx.conf
EXPOSE 80
