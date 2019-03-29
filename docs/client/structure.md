# Client app structure

The client app is a simple web application.
We use the [Vue.js](https://vuejs.org/) framework to manage the view.
However the main features and the logic are implemented using pure ES6 JavaScript, totally decoupled from Vue.js.
So Vue.js is mainly used to simplify the reactive updates of the dom and organize the code into separate components, we only use the elementary functions of the framework and the centralized store to share datas between components.

## Components of the app

This diagram shows how components are nested, full docs for specific features of each components are on the next documentation pages.

![app components](../diagrams/app_components.svg)
