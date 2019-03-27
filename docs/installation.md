# Setup LiveCoding fo developpment

## Requirements

### Processor
* [Python 3.7.*](https://www.python.org)
* [php-cli ^7.0](http://php.net)
* [Ruby 2.3](https://www.ruby-lang.org/)

### Client
* [Node.js ^11](https://nodejs.org/en/)

## Get the sources

```shell
# Clone the repo
git clone git@github.com:CPNV-ES/LiveCoding.git

cd LiveCoding
```

## Processor installation

[Install Server Processor](server/environment.md)

## Client installation

The client app uses webpack to build and optimize the code.
Follow the steps to start development :

```shell
# 1. go to the client folder
cd client

# 2. Install the dependencies
npm i

# 3. Run the development server
npm run serve

# 4. If you want to build the app for production
npm run build
```

Open your browser on `localhost:8080`. You are ready to start writing code !

## Game development

If you want to create a new game, follow the [creating game guide](./README.md).
If you vant to update an existing game, follow development instruction on the game repo.