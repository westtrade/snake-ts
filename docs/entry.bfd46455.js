// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/Game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CELL_SIZE = 20;
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 38] = "Up";
    Direction[Direction["Down"] = 40] = "Down";
    Direction[Direction["Left"] = 37] = "Left";
    Direction[Direction["Right"] = 39] = "Right";
})(Direction = exports.Direction || (exports.Direction = {}));
var Game = /** @class */function () {
    function Game(ctx) {
        this.cellSize = exports.CELL_SIZE;
        this.ctx = ctx;
    }
    Object.defineProperty(Game.prototype, "width", {
        get: function get() {
            return this.ctx.canvas.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "height", {
        get: function get() {
            return this.ctx.canvas.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "rows", {
        get: function get() {
            return this.height / this.cellSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "cols", {
        get: function get() {
            return this.width / this.cellSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "totalCels", {
        get: function get() {
            return this.rows * this.cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "constraints", {
        get: function get() {
            return {
                x: this.cellSize,
                y: this.cellSize,
                width: this.width - this.cellSize,
                height: this.height - this.cellSize
            };
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.calculateGridPosition = function (blockNumber) {
        var _a = this,
            cols = _a.cols,
            rows = _a.rows;
        var col = blockNumber % rows;
        var row = blockNumber === 0 ? 0 : rows / (blockNumber - col);
        var position = {
            col: col,
            row: row,
            blockNumber: blockNumber,
            cols: cols,
            rows: rows
        };
        return position;
    };
    Game.prototype.calculatePosition = function (blockNumber) {
        blockNumber = parseInt(blockNumber.toString());
        var constraints = this.constraints;
        var _a = this.calculateGridPosition(blockNumber),
            col = _a.col,
            row = _a.row;
        return {
            x: col * this.cellSize,
            y: row * this.cellSize,
            width: this.cellSize,
            height: this.cellSize
        };
    };
    return Game;
}();
exports.Game = Game;
},{}],"src/Figure.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Figure = /** @class */function () {
    function Figure() {
        this.body = [];
    }
    return Figure;
}();
exports.Figure = Figure;
},{}],"src/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hsl = function (h, s, l) {
    if (h === void 0) {
        h = 0;
    }
    if (s === void 0) {
        s = 0;
    }
    if (l === void 0) {
        l = 0;
    }
    return "hsl(" + h + ", " + s + "%, " + l + "%)";
};
},{}],"src/Snake.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var Figure_1 = require("./Figure");
var Game_1 = require("./Game");
var utils_1 = require("./utils");
var Snake = /** @class */function (_super) {
    __extends(Snake, _super);
    function Snake(game) {
        var _this = _super.call(this) || this;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.color = utils_1.hsl(163, 50, 49);
        _this.speed = 0.0001;
        _this.game = game;
        return _this;
    }
    Snake.prototype.update = function () {
        var _this = this;
        this.body = this.body.map(function (currentBlock) {
            return currentBlock + currentBlock * _this.speedX + currentBlock * _this.speedY * _this.game.rows;
        });
    };
    Snake.prototype.changeDirection = function (direction) {
        if (direction === Game_1.Direction.Down) {
            this.speedX = 0;
            this.speedY = this.speed;
        }
        if (direction === Game_1.Direction.Up) {
            this.speedX = 0;
            this.speedY = -this.speed;
        }
        if (direction === Game_1.Direction.Left) {
            this.speedX = -this.speed;
            this.speedY = 0;
        }
        if (direction === Game_1.Direction.Right) {
            this.speedX = this.speed;
            this.speedY = 0;
        }
    };
    return Snake;
}(Figure_1.Figure);
exports.Snake = Snake;
},{"./Figure":"src/Figure.ts","./Game":"src/Game.ts","./utils":"src/utils.ts"}],"src/drawers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.clearCanvas = function (game) {
    return game.ctx.clearRect(0, 0, game.width, game.height);
};
exports.drawBackground = function (game) {
    var ctx = game.ctx;
    ctx.fillStyle = utils_1.hsl(192, 45, 2);
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
exports.drawWalls = function (game) {
    var ctx = game.ctx,
        width = game.width,
        height = game.height;
    ctx.fillStyle = utils_1.hsl(112, 50, 63);
    ctx.fillRect(0, 0, game.cellSize, height);
    ctx.fillRect(0, 0, width, game.cellSize);
    ctx.fillRect(width - game.cellSize, 0, game.cellSize, height);
    ctx.fillRect(0, height - game.cellSize, width, game.cellSize);
};
exports.drawGameBlock = function (ctx, block, color) {
    if (color === void 0) {
        color = '#000';
    }
    ctx.fillStyle = color;
    ctx.fillRect(block.x, block.y, block.width, block.height);
};
exports.drawSnake = function (game, snake) {
    var ctx = game.ctx;
    var _a = snake.body,
        body = _a === void 0 ? [] : _a;
    ctx.fillStyle = snake.color;
    for (var _i = 0, body_1 = body; _i < body_1.length; _i++) {
        var chunkCellNumber = body_1[_i];
        var bodyBlock = game.calculatePosition(chunkCellNumber);
        exports.drawGameBlock(game.ctx, bodyBlock, snake.color);
    }
};
},{"./utils":"src/utils.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var Snake_1 = require("./Snake");
var drawers_1 = require("./drawers");
exports.createCanvas = function () {
    return document.getElementById('game');
};
var calculateCollision = function calculateCollision() {};
var ctx = exports.createCanvas().getContext('2d');
// Setup
var game = new Game_1.Game(ctx);
var player = new Snake_1.Snake(game);
document.addEventListener('keydown', function (event) {
    return player.changeDirection(event.keyCode);
});
var render = function render() {
    player.update();
    drawers_1.clearCanvas(game);
    drawers_1.drawBackground(game);
    drawers_1.drawWalls(game);
    drawers_1.drawSnake(game, player);
};
exports.loop = function () {
    return render() && window.requestAnimationFrame(exports.loop);
};
},{"./Game":"src/Game.ts","./Snake":"src/Snake.ts","./drawers":"src/drawers.ts"}],"src/entry.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
main_1.loop();
},{"./main":"src/main.ts"}],"../../.nvm/versions/node/v10.8.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '39721' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../.nvm/versions/node/v10.8.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js","src/entry.ts"], null)
//# sourceMappingURL=/entry.bfd46455.map