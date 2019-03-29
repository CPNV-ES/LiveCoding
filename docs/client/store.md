# Centralized store

LiveCoding app uses a centralized store to manage the datas shared by all the app components, like :
* Editor configuration
* Loaded game informations
* Selected language, and language script contend

The store is a plain javascript object, which can be updated following some principles. This allows the app components to detects store changes and reactively update the dom.

## Store structure

The store is managed by the [vueX module](https://vuex.vuejs.org/), the official Vue.js store implementation.

VueX brings :
* Helpers to use the store datas in vue components.
* Principles to use the store in a efficient way.

The store uses 4 main concepts :
* **State :** the javascript object thats owns the stored datas
* **Getters :** allows components to get computed state datas.
* **Mutations :** are functions to update the state (and allows the system to track changes), this methods must be synchronous.
* **Actions :** are functions shared bay all the app, and that allows to run more complex code than mutations (an can be asynchronous).

## Store usage

In the app, all dynamic datas displayed are stored in the state, and all actions that can be fired by user actions are declared in store actions. So, the vue components are simple and lightweight because they carry less logic.

## LocaleStorage persistance

To maintain LiveCoding parameters betwenn browser sessions, we store almost all state datas in local storage keys.

The keys are stored in local storage in the store mutations. And at application launch, the state is filled with datas present in the local storage.
