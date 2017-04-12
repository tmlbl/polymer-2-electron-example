# Polymer, meet Electron

This is a starter kit that marries the Polymer framework with the Electron
application shell.

This is a match made in heaven because the developer can use all of the latest
cutting-edge browser features like native ES6 support, HTTP2, and CSS3 
variables, without having to worry about legacy browser support. This makes it
much easier to write forward-leaning web code with Polymer.

Also, this setup allows one to use node modules with `require` syntax seamlessly
alongside front-end code. The result is a powerful framework development
experience that needs no complex task runners, pre-processors or polyfills to
function.

## Quickstart

```bash
npm i; bower i
npm start
```

When making editing the source, simply refresh with Ctrl+R within Electron to
see your changes. When you want to generate a release, `npm run build` will
execute
[electron-packager](https://github.com/electron-userland/electron-packager)
with the default options.

## The Example App

This repository contains a minimal RSS reader application. The purpose is to
demonstrate practical techniques for Polymer app development, including:

* Basic SPA-style routing, adapted for use in Electron
* Two-way data binding across multiple components/views
* Handling user input and reporting errors with `paper-input`
* Usage of custom utility components for reusable functionality
