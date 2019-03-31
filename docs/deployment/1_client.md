# Client app deployment

The client app only requires a static file hosting. Currently the application is hosted with github pages but it is quite possible to host it with any web server (Nginx, Apache...).

## Push a new version to github pages

Github pages track the `gh-pages` to determine the content to [serve here](https://cpnv-es.github.io/LiveCoding/). So you only need to push a new version of the app build to this branch, and it will be automatically deployed. But to avoid merge conflicts follow these 3 steps:

1. Build the app `npm run build --modern`
2. Commit the build on your current branche. Required for git to be able to detect changes to be pushed later on `gh-pages`
3. Use `git subtree push --prefix client/dist origin gh-pages` at the root of the repo to push only the dist folder to `gh-pages`.
