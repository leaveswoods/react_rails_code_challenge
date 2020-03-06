# System Dependencies
`Ruby >= 2.6`

`Postgres >= 9.5`

`Node >= 13.8`


# How to start
## Backend
Backend Rails app and Databbase server are runned as containers.
Run this command to build docker images
  ```shell script
    sh setup.sh
  ```
Then run 
  ```shell script
    docker-compose -f docker-compose.yml up
  ```
It should spin up postgres service and rails app service.
## Frontend

**The app did not use webpacker to handle frontend, instead, use custom webpack config and setup**

Run `yarn` in root folder to install all depencies, then run `yarn run start:dev` for development bundling, `yarn run start:prod` for production build

Javascript bundles will be bundled and piped to `root_folder/public/packs/js`