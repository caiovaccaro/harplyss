# harplyss
Smart boilerplate for harp.js.
**Under construction, use it at your own risk. Everything part of the solution/documentation is constantly changing!**

## Features
- Automatic assets loading. Harp will include a separate tag for all your "components" CSS and JS files automatically.
- When compiling in production mode (optional), a single CSS/JS tag is added in order to decrease the number of HTTP requests.
- Automatic components partials. Harp will collect all partials (HTML/Jade) from your components into a reference object.
- Data.json interface for editing. By accessing */edit-json urls where there is a _data.json file you will be able to edit it in the browser (thanks @mb21 for [JSONedit](http://mb21.github.io/JSONedit/)).


## Roadmap
- Livereload.
- Build tasks.
- Support for Webpack, Browserify, JSPM, etc for JS loading.

## Dependencies
- [Node](https://nodejs.org/).
- [Express](http://expressjs.com/).
- [Harp.js](http://harpjs.com/).
- [JSONedit](http://mb21.github.io/JSONedit/).

## How it works

### Automatic assets loading
Harp provides a "public" object that represents the folder structure of the whole project. By using conventional folder names it is possible to loop all the assets and automatically load them.

Harplyss uses the name "components" for the folder where your modules/includes live. Every component should have a folder and at most 3 files (HTML, JS and CSS). Because of Harp's magic you can decide the pre-processor/template engine for them.

### Optional production mode compiling
You can pass the flag PRODUCTION=1 when compiling the project, so Harp knows you don't want automatic assets loading. In this way it will add a single build.css and .js file for you.

### Automatic components partials
Every HTML file of every component is treated as a potential partial, so it can be used anywhere in your project. All those partials are collected in a object called "components". So you can use it like:
```
!= partial(components['header']['partial'], { title: title })
```

As you see you can still use _data.json files to "feed" those partials.

### Data.json interface for editing
Thanks to the amazing client-side solution of @mb21 in [JSONedit](http://mb21.github.io/JSONedit/) I was able to wire that with the Node back-end and serve JSON files. The way this works is by identifying the URL pattern when you type */edit-json. If you are wondering when this is useful, it is very helpful when you work with multidisciplinary teams in large projects and content is regularly updated.


## How to use
- Clone
- npm install
- npm start
