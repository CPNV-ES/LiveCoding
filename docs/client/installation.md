# Setup client app for developpment

The client app is devlopped with mdern bild tools and js framework, so you need a little bit tooling to start developping.

### Requirements

* [Node.js **^10**](https://nodejs.org/en/)
* Modern browser :
  * Chrome **^66**
  * Firefox **^68**
  * Safari **^11.1**
  * Chrome for Android **^71**
  * Safari IOS **^11.1**

> As you can note, the platform requires relatively modern browsers.This is because we use many modern javascript features like [dynamic imports](https://caniuse.com/#feat=es6-module-dynamic-import) and [CSS grids](https://caniuse.com/#feat=css-grid).

## Installation

### Get the sources :
```shell
# Colone the repo
git clone git@github.com:CPNV-ES/LiveCoding.git

cd LiveCoding
```

### Install dependencies
```shell
# The client app are in the client folder
cd client

# Install node dependencies
npm i
```

### Run the app for development
```shell
# Run the dev server and compile the sources
npm run serve
```

### Build the app for production
```shell
# Build the app in the dist folder
npm run build --modern
```

> The build output must be served on a web server.

### Push a new build to GitHub pages

Each releases, we deploy the release build to github pages.

```shell
# 1. Buil the app
# 2. commit the latest build (on the release branch)
git commit -m "Add app build for v2.0.0..."

# 3. Push the dist build folder to gh-pages branch
# The command must be ran at the root of LiveCoding folder, it will not works form the client folder..
git subtree push --prefix client/dist origin gh-pages
```
