# elegant-async-code

Example code for my "Elegant async code with ES2015 Promises" talk

## Introduction

This is an *extremely* fake email client app, written in React (with JSX), to demonstrate elegant async code with ES2015
Promises, a talk I'm giving at MK.js on 23 Feb 2016.

## Usage

From a clean checkout, get the app into your browser in one line:

```bash
npm install && npm start
```

At this point, if you want to start tinkering, open another terminal and type:

```bash
npm install -g gulp-cli
gulp watch
```

## Browser support

At time of writing, this is only going to work in Firefox, Chrome and Opera, since it uses both `Promise` and `fetch()` natively.