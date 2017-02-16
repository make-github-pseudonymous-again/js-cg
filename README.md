[js-cg](http://aureooms.github.io/js-cg)
==

Computational geometry code bricks for JavaScript. Parents are
[aureooms/js-algo](https://github.com/aureooms/js-algo)
and
[aureooms/js-data-structures](https://github.com/aureooms/js-data-structures).

```js
vcross( vsub( b , a ) , vsub( c , a ) ) ;
```

[![License](https://img.shields.io/github/license/aureooms/js-cg.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-cg/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@aureooms/js-cg.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-cg)
[![Bower version](https://img.shields.io/bower/v/@aureooms/js-cg.svg?style=flat)](http://bower.io/search/?q=@aureooms/js-cg)
[![Build Status](https://img.shields.io/travis/aureooms/js-cg.svg?style=flat)](https://travis-ci.org/aureooms/js-cg)
[![Coverage Status](https://img.shields.io/coveralls/aureooms/js-cg.svg?style=flat)](https://coveralls.io/r/aureooms/js-cg)
[![Dependencies Status](https://img.shields.io/david/aureooms/js-cg.svg?style=flat)](https://david-dm.org/aureooms/js-cg#info=dependencies)
[![devDependencies Status](https://img.shields.io/david/dev/aureooms/js-cg.svg?style=flat)](https://david-dm.org/aureooms/js-cg#info=devDependencies)
[![Code Climate](https://img.shields.io/codeclimate/github/aureooms/js-cg.svg?style=flat)](https://codeclimate.com/github/aureooms/js-cg)
[![NPM downloads per month](https://img.shields.io/npm/dm/@aureooms/js-cg.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-cg)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-cg.svg?style=flat)](https://github.com/aureooms/js-cg/issues)
[![Inline docs](http://inch-ci.org/github/aureooms/js-cg.svg?branch=master&style=shields)](http://inch-ci.org/github/aureooms/js-cg)

Can be managed through [jspm](https://github.com/jspm/jspm-cli),
[duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower),
[ender](https://github.com/ender-js/Ender),
[jam](https://github.com/caolan/jam),
[spm](https://github.com/spmjs/spm),
and [npm](https://github.com/npm/npm).

## Install

### jspm
```terminal
jspm install github:aureooms/js-cg
# or
jspm install npm:@aureooms/js-cg
```
### duo
No install step needed for duo!

### component
```terminal
component install aureooms/js-cg
```

### bower
```terminal
bower install @aureooms/js-cg
```

### ender
```terminal
ender add @aureooms/js-cg
```

### jam
```terminal
jam install @aureooms/js-cg
```

### spm
```terminal
spm install @aureooms/js-cg --save
```

### npm
```terminal
npm install @aureooms/js-cg --save
```

## Require
### jspm
```js
let cg = require( "github:aureooms/js-cg" ) ;
// or
import cg from '@aureooms/js-cg' ;
```
### duo
```js
let cg = require( "aureooms/js-cg" ) ;
```

### component, ender, spm, npm
```js
let cg = require( "@aureooms/js-cg" ) ;
```

### bower
The script tag exposes the global variable `cg`.
```html
<script src="bower_components/@aureooms/js-cg/js/dist/cg.min.js"></script>
```
Alternatively, you can use any tool mentioned [here](http://bower.io/docs/tools/).

### jam
```js
require( [ "@aureooms/js-cg" ] , function ( cg ) { ... } ) ;
```

## Children

  - [aureooms/js-convex-hull-2d](https://github.com/aureooms/js-convex-hull-2d)

## Reference

### Information
  - http://homepages.ulb.ac.be/~slanger/cg/
  - http://homepages.ulb.ac.be/~slanger/cg/lenertz/
  - http://homepages.ulb.ac.be/~slanger/cg/P/PopsAndPopturns/projetGeom.html
  - http://homepages.ulb.ac.be/~slanger/cg/P/WSPD/index.html
  - http://homepages.ulb.ac.be/~slanger/cg/Swimmer/one_swimmer.html
  - http://homepages.ulb.ac.be/~slanger/cg/hsaureooms/def.html
  - http://fremycompany.com/compugem
  - http://www-cgrl.cs.mcgill.ca/~godfried/teaching/cg-projects/97/Ian/cutting_ears.html
  - http://www.cs.tufts.edu/comp/260/lectures.html
  - http://www.toptal.com/python/computational-geometry-in-python-from-theory-to-implementation

### Code
  - https://github.com/crm416/point-location
  - https://github.com/ironwallaby/delaunay
  - https://github.com/gorhill/Javascript-Voronoi
  - https://github.com/mikolalysenko/convex-hull
  - https://github.com/mourner/rbush
  - https://github.com/mikolalysenko/delaunay-triangulate
  - https://github.com/mikolalysenko/incremental-delaunay
  - https://github.com/mikolalysenko/box-intersect-benchmark
