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

## Further reading

If the talk piqued your interest, try these:

- [Promises/A+](https://promisesaplus.com/) - open standard for Promises behaviour
- [States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) - reference of Promise-related terminology
- [Embracing Promises in JavaScript](http://javascriptplayground.com/blog/2015/02/promises) - post by Jack Franklin, gave me the idea for this talk
- [es6-promise](https://github.com/stefanpenner/es6-promise) - polyfill for using Promises in older browsers
- [That's so fetch!](https://jakearchibald.com/2015/thats-so-fetch/) - post by Jake Archibald going into depth about `fetch()`