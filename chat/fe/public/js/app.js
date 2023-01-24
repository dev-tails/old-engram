(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/parseuri/index.js
  var require_parseuri = __commonJS({
    "node_modules/parseuri/index.js"(exports, module) {
      var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
      var parts = [
        "source",
        "protocol",
        "authority",
        "userInfo",
        "user",
        "password",
        "host",
        "port",
        "relative",
        "path",
        "directory",
        "file",
        "query",
        "anchor"
      ];
      module.exports = function parseuri3(str) {
        var src = str, b = str.indexOf("["), e = str.indexOf("]");
        if (b != -1 && e != -1) {
          str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
        }
        var m = re.exec(str || ""), uri = {}, i = 14;
        while (i--) {
          uri[parts[i]] = m[i] || "";
        }
        if (b != -1 && e != -1) {
          uri.source = src;
          uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
          uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
          uri.ipv6uri = true;
        }
        uri.pathNames = pathNames(uri, uri["path"]);
        uri.queryKey = queryKey(uri, uri["query"]);
        return uri;
      };
      function pathNames(obj, path) {
        var regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
        if (path.substr(0, 1) == "/" || path.length === 0) {
          names.splice(0, 1);
        }
        if (path.substr(path.length - 1, 1) == "/") {
          names.splice(names.length - 1, 1);
        }
        return names;
      }
      function queryKey(uri, query) {
        var data = {};
        query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
          if ($1) {
            data[$1] = $2;
          }
        });
        return data;
      }
    }
  });

  // node_modules/has-cors/index.js
  var require_has_cors = __commonJS({
    "node_modules/has-cors/index.js"(exports, module) {
      try {
        module.exports = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
      } catch (err) {
        module.exports = false;
      }
    }
  });

  // node_modules/@socket.io/component-emitter/index.js
  var require_component_emitter = __commonJS({
    "node_modules/@socket.io/component-emitter/index.js"(exports) {
      exports.Emitter = Emitter7;
      function Emitter7(obj) {
        if (obj)
          return mixin(obj);
      }
      function mixin(obj) {
        for (var key in Emitter7.prototype) {
          obj[key] = Emitter7.prototype[key];
        }
        return obj;
      }
      Emitter7.prototype.on = Emitter7.prototype.addEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
        return this;
      };
      Emitter7.prototype.once = function(event, fn) {
        function on2() {
          this.off(event, on2);
          fn.apply(this, arguments);
        }
        on2.fn = fn;
        this.on(event, on2);
        return this;
      };
      Emitter7.prototype.off = Emitter7.prototype.removeListener = Emitter7.prototype.removeAllListeners = Emitter7.prototype.removeEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        if (arguments.length == 0) {
          this._callbacks = {};
          return this;
        }
        var callbacks = this._callbacks["$" + event];
        if (!callbacks)
          return this;
        if (arguments.length == 1) {
          delete this._callbacks["$" + event];
          return this;
        }
        var cb;
        for (var i = 0; i < callbacks.length; i++) {
          cb = callbacks[i];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
          }
        }
        if (callbacks.length === 0) {
          delete this._callbacks["$" + event];
        }
        return this;
      };
      Emitter7.prototype.emit = function(event) {
        this._callbacks = this._callbacks || {};
        var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i = 0, len = callbacks.length; i < len; ++i) {
            callbacks[i].apply(this, args);
          }
        }
        return this;
      };
      Emitter7.prototype.emitReserved = Emitter7.prototype.emit;
      Emitter7.prototype.listeners = function(event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks["$" + event] || [];
      };
      Emitter7.prototype.hasListeners = function(event) {
        return !!this.listeners(event).length;
      };
    }
  });

  // node_modules/yeast/index.js
  var require_yeast = __commonJS({
    "node_modules/yeast/index.js"(exports, module) {
      "use strict";
      var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
      var length = 64;
      var map = {};
      var seed = 0;
      var i = 0;
      var prev;
      function encode(num) {
        var encoded = "";
        do {
          encoded = alphabet[num % length] + encoded;
          num = Math.floor(num / length);
        } while (num > 0);
        return encoded;
      }
      function decode2(str) {
        var decoded = 0;
        for (i = 0; i < str.length; i++) {
          decoded = decoded * length + map[str.charAt(i)];
        }
        return decoded;
      }
      function yeast3() {
        var now = encode(+new Date());
        if (now !== prev)
          return seed = 0, prev = now;
        return now + "." + encode(seed++);
      }
      for (; i < length; i++)
        map[alphabet[i]] = i;
      yeast3.encode = encode;
      yeast3.decode = decode2;
      module.exports = yeast3;
    }
  });

  // node_modules/parseqs/index.js
  var require_parseqs = __commonJS({
    "node_modules/parseqs/index.js"(exports) {
      exports.encode = function(obj) {
        var str = "";
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (str.length)
              str += "&";
            str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
          }
        }
        return str;
      };
      exports.decode = function(qs) {
        var qry = {};
        var pairs = qs.split("&");
        for (var i = 0, l = pairs.length; i < l; i++) {
          var pair = pairs[i].split("=");
          qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return qry;
      };
    }
  });

  // node_modules/backo2/index.js
  var require_backo2 = __commonJS({
    "node_modules/backo2/index.js"(exports, module) {
      module.exports = Backoff2;
      function Backoff2(opts) {
        opts = opts || {};
        this.ms = opts.min || 100;
        this.max = opts.max || 1e4;
        this.factor = opts.factor || 2;
        this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
        this.attempts = 0;
      }
      Backoff2.prototype.duration = function() {
        var ms = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var rand = Math.random();
          var deviation = Math.floor(rand * this.jitter * ms);
          ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
        }
        return Math.min(ms, this.max) | 0;
      };
      Backoff2.prototype.reset = function() {
        this.attempts = 0;
      };
      Backoff2.prototype.setMin = function(min) {
        this.ms = min;
      };
      Backoff2.prototype.setMax = function(max) {
        this.max = max;
      };
      Backoff2.prototype.setJitter = function(jitter) {
        this.jitter = jitter;
      };
    }
  });

  // node_modules/tslib/tslib.js
  var require_tslib = __commonJS({
    "node_modules/tslib/tslib.js"(exports, module) {
      var __extends2;
      var __assign2;
      var __rest2;
      var __decorate2;
      var __param2;
      var __metadata2;
      var __awaiter2;
      var __generator2;
      var __exportStar2;
      var __values2;
      var __read2;
      var __spread2;
      var __spreadArrays2;
      var __await2;
      var __asyncGenerator2;
      var __asyncDelegator2;
      var __asyncValues2;
      var __makeTemplateObject2;
      var __importStar2;
      var __importDefault2;
      var __classPrivateFieldGet2;
      var __classPrivateFieldSet2;
      var __createBinding2;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module === "object" && typeof module.exports === "object") {
          factory(createExporter(root, createExporter(module.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        __extends2 = function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign2 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest2 = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate2 = function(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        __param2 = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata2 = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter2 = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator2 = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __createBinding2 = function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __exportStar2 = function(m, exports2) {
          for (var p in m)
            if (p !== "default" && !exports2.hasOwnProperty(p))
              exports2[p] = m[p];
        };
        __values2 = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read2 = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread2 = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read2(arguments[i]));
          return ar;
        };
        __spreadArrays2 = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __await2 = function(v) {
          return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
        };
        __asyncGenerator2 = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator2 = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await2(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues2 = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        };
        __makeTemplateObject2 = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        __importStar2 = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
          }
          result["default"] = mod;
          return result;
        };
        __importDefault2 = function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        __classPrivateFieldGet2 = function(receiver, privateMap) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
          }
          return privateMap.get(receiver);
        };
        __classPrivateFieldSet2 = function(receiver, privateMap, value) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
          }
          privateMap.set(receiver, value);
          return value;
        };
        exporter("__extends", __extends2);
        exporter("__assign", __assign2);
        exporter("__rest", __rest2);
        exporter("__decorate", __decorate2);
        exporter("__param", __param2);
        exporter("__metadata", __metadata2);
        exporter("__awaiter", __awaiter2);
        exporter("__generator", __generator2);
        exporter("__exportStar", __exportStar2);
        exporter("__createBinding", __createBinding2);
        exporter("__values", __values2);
        exporter("__read", __read2);
        exporter("__spread", __spread2);
        exporter("__spreadArrays", __spreadArrays2);
        exporter("__await", __await2);
        exporter("__asyncGenerator", __asyncGenerator2);
        exporter("__asyncDelegator", __asyncDelegator2);
        exporter("__asyncValues", __asyncValues2);
        exporter("__makeTemplateObject", __makeTemplateObject2);
        exporter("__importStar", __importStar2);
        exporter("__importDefault", __importDefault2);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
      });
    }
  });

  // node_modules/socket.io-client/build/esm/url.js
  var import_parseuri = __toModule(require_parseuri());
  function url(uri, path = "", loc) {
    let obj = uri;
    loc = loc || typeof location !== "undefined" && location;
    if (uri == null)
      uri = loc.protocol + "//" + loc.host;
    if (typeof uri === "string") {
      if (uri.charAt(0) === "/") {
        if (uri.charAt(1) === "/") {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }
      if (!/^(https?|wss?):\/\//.test(uri)) {
        if (typeof loc !== "undefined") {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      }
      obj = (0, import_parseuri.default)(uri);
    }
    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }

  // node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js
  var import_has_cors = __toModule(require_has_cors());

  // node_modules/engine.io-client/build/esm/globalThis.browser.js
  var globalThis_browser_default = (() => {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  })();

  // node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js
  function xmlhttprequest_browser_default(opts) {
    const xdomain = opts.xdomain;
    try {
      if (typeof XMLHttpRequest !== "undefined" && (!xdomain || import_has_cors.default)) {
        return new XMLHttpRequest();
      }
    } catch (e) {
    }
    if (!xdomain) {
      try {
        return new globalThis_browser_default[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {
      }
    }
  }

  // node_modules/engine.io-client/build/esm/util.js
  function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
      if (obj.hasOwnProperty(k)) {
        acc[k] = obj[k];
      }
      return acc;
    }, {});
  }
  var NATIVE_SET_TIMEOUT = setTimeout;
  var NATIVE_CLEAR_TIMEOUT = clearTimeout;
  function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis_browser_default);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis_browser_default);
    } else {
      obj.setTimeoutFn = setTimeout.bind(globalThis_browser_default);
      obj.clearTimeoutFn = clearTimeout.bind(globalThis_browser_default);
    }
  }

  // node_modules/engine.io-client/build/esm/transports/polling-xhr.js
  var import_component_emitter2 = __toModule(require_component_emitter());

  // node_modules/engine.io-parser/build/esm/commons.js
  var PACKET_TYPES = Object.create(null);
  PACKET_TYPES["open"] = "0";
  PACKET_TYPES["close"] = "1";
  PACKET_TYPES["ping"] = "2";
  PACKET_TYPES["pong"] = "3";
  PACKET_TYPES["message"] = "4";
  PACKET_TYPES["upgrade"] = "5";
  PACKET_TYPES["noop"] = "6";
  var PACKET_TYPES_REVERSE = Object.create(null);
  Object.keys(PACKET_TYPES).forEach((key) => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
  });
  var ERROR_PACKET = { type: "error", data: "parser error" };

  // node_modules/engine.io-parser/build/esm/encodePacket.browser.js
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
  var withNativeArrayBuffer = typeof ArrayBuffer === "function";
  var isView = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
  };
  var encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(data, callback);
      }
    } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(new Blob([data]), callback);
      }
    }
    return callback(PACKET_TYPES[type] + (data || ""));
  };
  var encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const content = fileReader.result.split(",")[1];
      callback("b" + content);
    };
    return fileReader.readAsDataURL(data);
  };
  var encodePacket_browser_default = encodePacket;

  // node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  var i;
  var decode = function(base64) {
    var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }
    var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i + 1)];
      encoded3 = lookup[base64.charCodeAt(i + 2)];
      encoded4 = lookup[base64.charCodeAt(i + 3)];
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
  };

  // node_modules/engine.io-parser/build/esm/decodePacket.browser.js
  var withNativeArrayBuffer2 = typeof ArrayBuffer === "function";
  var decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
      return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
      };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
      return {
        type: "message",
        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
      };
    }
    const packetType = PACKET_TYPES_REVERSE[type];
    if (!packetType) {
      return ERROR_PACKET;
    }
    return encodedPacket.length > 1 ? {
      type: PACKET_TYPES_REVERSE[type],
      data: encodedPacket.substring(1)
    } : {
      type: PACKET_TYPES_REVERSE[type]
    };
  };
  var decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer2) {
      const decoded = decode(data);
      return mapBinary(decoded, binaryType);
    } else {
      return { base64: true, data };
    }
  };
  var mapBinary = (data, binaryType) => {
    switch (binaryType) {
      case "blob":
        return data instanceof ArrayBuffer ? new Blob([data]) : data;
      case "arraybuffer":
      default:
        return data;
    }
  };
  var decodePacket_browser_default = decodePacket;

  // node_modules/engine.io-parser/build/esm/index.js
  var SEPARATOR = String.fromCharCode(30);
  var encodePayload = (packets, callback) => {
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
      encodePacket_browser_default(packet, false, (encodedPacket) => {
        encodedPackets[i] = encodedPacket;
        if (++count === length) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };
  var decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
      const decodedPacket = decodePacket_browser_default(encodedPackets[i], binaryType);
      packets.push(decodedPacket);
      if (decodedPacket.type === "error") {
        break;
      }
    }
    return packets;
  };
  var protocol = 4;

  // node_modules/engine.io-client/build/esm/transport.js
  var import_component_emitter = __toModule(require_component_emitter());
  var Transport = class extends import_component_emitter.Emitter {
    constructor(opts) {
      super();
      this.writable = false;
      installTimerFunctions(this, opts);
      this.opts = opts;
      this.query = opts.query;
      this.readyState = "";
      this.socket = opts.socket;
    }
    onError(msg, desc) {
      const err = new Error(msg);
      err.type = "TransportError";
      err.description = desc;
      super.emit("error", err);
      return this;
    }
    open() {
      if (this.readyState === "closed" || this.readyState === "") {
        this.readyState = "opening";
        this.doOpen();
      }
      return this;
    }
    close() {
      if (this.readyState === "opening" || this.readyState === "open") {
        this.doClose();
        this.onClose();
      }
      return this;
    }
    send(packets) {
      if (this.readyState === "open") {
        this.write(packets);
      } else {
      }
    }
    onOpen() {
      this.readyState = "open";
      this.writable = true;
      super.emit("open");
    }
    onData(data) {
      const packet = decodePacket_browser_default(data, this.socket.binaryType);
      this.onPacket(packet);
    }
    onPacket(packet) {
      super.emit("packet", packet);
    }
    onClose() {
      this.readyState = "closed";
      super.emit("close");
    }
  };

  // node_modules/engine.io-client/build/esm/transports/polling.js
  var import_yeast = __toModule(require_yeast());
  var import_parseqs = __toModule(require_parseqs());
  var Polling = class extends Transport {
    constructor() {
      super(...arguments);
      this.polling = false;
    }
    get name() {
      return "polling";
    }
    doOpen() {
      this.poll();
    }
    pause(onPause) {
      this.readyState = "pausing";
      const pause = () => {
        this.readyState = "paused";
        onPause();
      };
      if (this.polling || !this.writable) {
        let total = 0;
        if (this.polling) {
          total++;
          this.once("pollComplete", function() {
            --total || pause();
          });
        }
        if (!this.writable) {
          total++;
          this.once("drain", function() {
            --total || pause();
          });
        }
      } else {
        pause();
      }
    }
    poll() {
      this.polling = true;
      this.doPoll();
      this.emit("poll");
    }
    onData(data) {
      const callback = (packet) => {
        if (this.readyState === "opening" && packet.type === "open") {
          this.onOpen();
        }
        if (packet.type === "close") {
          this.onClose();
          return false;
        }
        this.onPacket(packet);
      };
      decodePayload(data, this.socket.binaryType).forEach(callback);
      if (this.readyState !== "closed") {
        this.polling = false;
        this.emit("pollComplete");
        if (this.readyState === "open") {
          this.poll();
        } else {
        }
      }
    }
    doClose() {
      const close = () => {
        this.write([{ type: "close" }]);
      };
      if (this.readyState === "open") {
        close();
      } else {
        this.once("open", close);
      }
    }
    write(packets) {
      this.writable = false;
      encodePayload(packets, (data) => {
        this.doWrite(data, () => {
          this.writable = true;
          this.emit("drain");
        });
      });
    }
    uri() {
      let query = this.query || {};
      const schema = this.opts.secure ? "https" : "http";
      let port = "";
      if (this.opts.timestampRequests !== false) {
        query[this.opts.timestampParam] = (0, import_yeast.default)();
      }
      if (!this.supportsBinary && !query.sid) {
        query.b64 = 1;
      }
      if (this.opts.port && (schema === "https" && Number(this.opts.port) !== 443 || schema === "http" && Number(this.opts.port) !== 80)) {
        port = ":" + this.opts.port;
      }
      const encodedQuery = import_parseqs.default.encode(query);
      const ipv6 = this.opts.hostname.indexOf(":") !== -1;
      return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
    }
  };

  // node_modules/engine.io-client/build/esm/transports/polling-xhr.js
  function empty() {
  }
  var hasXHR2 = function() {
    const xhr = new xmlhttprequest_browser_default({
      xdomain: false
    });
    return xhr.responseType != null;
  }();
  var XHR = class extends Polling {
    constructor(opts) {
      super(opts);
      if (typeof location !== "undefined") {
        const isSSL = location.protocol === "https:";
        let port = location.port;
        if (!port) {
          port = isSSL ? "443" : "80";
        }
        this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
        this.xs = opts.secure !== isSSL;
      }
      const forceBase64 = opts && opts.forceBase64;
      this.supportsBinary = hasXHR2 && !forceBase64;
    }
    request(opts = {}) {
      Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
      return new Request(this.uri(), opts);
    }
    doWrite(data, fn) {
      const req = this.request({
        method: "POST",
        data
      });
      req.on("success", fn);
      req.on("error", (err) => {
        this.onError("xhr post error", err);
      });
    }
    doPoll() {
      const req = this.request();
      req.on("data", this.onData.bind(this));
      req.on("error", (err) => {
        this.onError("xhr poll error", err);
      });
      this.pollXhr = req;
    }
  };
  var Request = class extends import_component_emitter2.Emitter {
    constructor(uri, opts) {
      super();
      installTimerFunctions(this, opts);
      this.opts = opts;
      this.method = opts.method || "GET";
      this.uri = uri;
      this.async = opts.async !== false;
      this.data = opts.data !== void 0 ? opts.data : null;
      this.create();
    }
    create() {
      const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
      opts.xdomain = !!this.opts.xd;
      opts.xscheme = !!this.opts.xs;
      const xhr = this.xhr = new xmlhttprequest_browser_default(opts);
      try {
        xhr.open(this.method, this.uri, this.async);
        try {
          if (this.opts.extraHeaders) {
            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
            for (let i in this.opts.extraHeaders) {
              if (this.opts.extraHeaders.hasOwnProperty(i)) {
                xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
              }
            }
          }
        } catch (e) {
        }
        if (this.method === "POST") {
          try {
            xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          } catch (e) {
          }
        }
        try {
          xhr.setRequestHeader("Accept", "*/*");
        } catch (e) {
        }
        if ("withCredentials" in xhr) {
          xhr.withCredentials = this.opts.withCredentials;
        }
        if (this.opts.requestTimeout) {
          xhr.timeout = this.opts.requestTimeout;
        }
        xhr.onreadystatechange = () => {
          if (xhr.readyState !== 4)
            return;
          if (xhr.status === 200 || xhr.status === 1223) {
            this.onLoad();
          } else {
            this.setTimeoutFn(() => {
              this.onError(typeof xhr.status === "number" ? xhr.status : 0);
            }, 0);
          }
        };
        xhr.send(this.data);
      } catch (e) {
        this.setTimeoutFn(() => {
          this.onError(e);
        }, 0);
        return;
      }
      if (typeof document !== "undefined") {
        this.index = Request.requestsCount++;
        Request.requests[this.index] = this;
      }
    }
    onSuccess() {
      this.emit("success");
      this.cleanup();
    }
    onData(data) {
      this.emit("data", data);
      this.onSuccess();
    }
    onError(err) {
      this.emit("error", err);
      this.cleanup(true);
    }
    cleanup(fromError) {
      if (typeof this.xhr === "undefined" || this.xhr === null) {
        return;
      }
      this.xhr.onreadystatechange = empty;
      if (fromError) {
        try {
          this.xhr.abort();
        } catch (e) {
        }
      }
      if (typeof document !== "undefined") {
        delete Request.requests[this.index];
      }
      this.xhr = null;
    }
    onLoad() {
      const data = this.xhr.responseText;
      if (data !== null) {
        this.onData(data);
      }
    }
    abort() {
      this.cleanup();
    }
  };
  Request.requestsCount = 0;
  Request.requests = {};
  if (typeof document !== "undefined") {
    if (typeof attachEvent === "function") {
      attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
      const terminationEvent = "onpagehide" in globalThis_browser_default ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }
  function unloadHandler() {
    for (let i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }

  // node_modules/engine.io-client/build/esm/transports/websocket.js
  var import_parseqs2 = __toModule(require_parseqs());
  var import_yeast2 = __toModule(require_yeast());

  // node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js
  var nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
      return (cb) => Promise.resolve().then(cb);
    } else {
      return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
  })();
  var WebSocket = globalThis_browser_default.WebSocket || globalThis_browser_default.MozWebSocket;
  var usingBrowserWebSocket = true;
  var defaultBinaryType = "arraybuffer";

  // node_modules/engine.io-client/build/esm/transports/websocket.js
  var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  var WS = class extends Transport {
    constructor(opts) {
      super(opts);
      this.supportsBinary = !opts.forceBase64;
    }
    get name() {
      return "websocket";
    }
    doOpen() {
      if (!this.check()) {
        return;
      }
      const uri = this.uri();
      const protocols = this.opts.protocols;
      const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
      if (this.opts.extraHeaders) {
        opts.headers = this.opts.extraHeaders;
      }
      try {
        this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
      } catch (err) {
        return this.emit("error", err);
      }
      this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
      this.addEventListeners();
    }
    addEventListeners() {
      this.ws.onopen = () => {
        if (this.opts.autoUnref) {
          this.ws._socket.unref();
        }
        this.onOpen();
      };
      this.ws.onclose = this.onClose.bind(this);
      this.ws.onmessage = (ev) => this.onData(ev.data);
      this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
      this.writable = false;
      for (let i = 0; i < packets.length; i++) {
        const packet = packets[i];
        const lastPacket = i === packets.length - 1;
        encodePacket_browser_default(packet, this.supportsBinary, (data) => {
          const opts = {};
          if (!usingBrowserWebSocket) {
            if (packet.options) {
              opts.compress = packet.options.compress;
            }
            if (this.opts.perMessageDeflate) {
              const len = typeof data === "string" ? Buffer.byteLength(data) : data.length;
              if (len < this.opts.perMessageDeflate.threshold) {
                opts.compress = false;
              }
            }
          }
          try {
            if (usingBrowserWebSocket) {
              this.ws.send(data);
            } else {
              this.ws.send(data, opts);
            }
          } catch (e) {
          }
          if (lastPacket) {
            nextTick(() => {
              this.writable = true;
              this.emit("drain");
            }, this.setTimeoutFn);
          }
        });
      }
    }
    doClose() {
      if (typeof this.ws !== "undefined") {
        this.ws.close();
        this.ws = null;
      }
    }
    uri() {
      let query = this.query || {};
      const schema = this.opts.secure ? "wss" : "ws";
      let port = "";
      if (this.opts.port && (schema === "wss" && Number(this.opts.port) !== 443 || schema === "ws" && Number(this.opts.port) !== 80)) {
        port = ":" + this.opts.port;
      }
      if (this.opts.timestampRequests) {
        query[this.opts.timestampParam] = (0, import_yeast2.default)();
      }
      if (!this.supportsBinary) {
        query.b64 = 1;
      }
      const encodedQuery = import_parseqs2.default.encode(query);
      const ipv6 = this.opts.hostname.indexOf(":") !== -1;
      return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
    }
    check() {
      return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
    }
  };

  // node_modules/engine.io-client/build/esm/transports/index.js
  var transports = {
    websocket: WS,
    polling: XHR
  };

  // node_modules/engine.io-client/build/esm/socket.js
  var import_parseqs3 = __toModule(require_parseqs());
  var import_parseuri2 = __toModule(require_parseuri());
  var import_component_emitter3 = __toModule(require_component_emitter());
  var Socket = class extends import_component_emitter3.Emitter {
    constructor(uri, opts = {}) {
      super();
      if (uri && typeof uri === "object") {
        opts = uri;
        uri = null;
      }
      if (uri) {
        uri = (0, import_parseuri2.default)(uri);
        opts.hostname = uri.host;
        opts.secure = uri.protocol === "https" || uri.protocol === "wss";
        opts.port = uri.port;
        if (uri.query)
          opts.query = uri.query;
      } else if (opts.host) {
        opts.hostname = (0, import_parseuri2.default)(opts.host).host;
      }
      installTimerFunctions(this, opts);
      this.secure = opts.secure != null ? opts.secure : typeof location !== "undefined" && location.protocol === "https:";
      if (opts.hostname && !opts.port) {
        opts.port = this.secure ? "443" : "80";
      }
      this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
      this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
      this.transports = opts.transports || ["polling", "websocket"];
      this.readyState = "";
      this.writeBuffer = [];
      this.prevBufferLen = 0;
      this.opts = Object.assign({
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        timestampParam: "t",
        rememberUpgrade: false,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {},
        closeOnBeforeunload: true
      }, opts);
      this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
      if (typeof this.opts.query === "string") {
        this.opts.query = import_parseqs3.default.decode(this.opts.query);
      }
      this.id = null;
      this.upgrades = null;
      this.pingInterval = null;
      this.pingTimeout = null;
      this.pingTimeoutTimer = null;
      if (typeof addEventListener === "function") {
        if (this.opts.closeOnBeforeunload) {
          addEventListener("beforeunload", () => {
            if (this.transport) {
              this.transport.removeAllListeners();
              this.transport.close();
            }
          }, false);
        }
        if (this.hostname !== "localhost") {
          this.offlineEventListener = () => {
            this.onClose("transport close");
          };
          addEventListener("offline", this.offlineEventListener, false);
        }
      }
      this.open();
    }
    createTransport(name) {
      const query = clone(this.opts.query);
      query.EIO = protocol;
      query.transport = name;
      if (this.id)
        query.sid = this.id;
      const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
        query,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port
      });
      return new transports[name](opts);
    }
    open() {
      let transport;
      if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
        transport = "websocket";
      } else if (this.transports.length === 0) {
        this.setTimeoutFn(() => {
          this.emitReserved("error", "No transports available");
        }, 0);
        return;
      } else {
        transport = this.transports[0];
      }
      this.readyState = "opening";
      try {
        transport = this.createTransport(transport);
      } catch (e) {
        this.transports.shift();
        this.open();
        return;
      }
      transport.open();
      this.setTransport(transport);
    }
    setTransport(transport) {
      if (this.transport) {
        this.transport.removeAllListeners();
      }
      this.transport = transport;
      transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", () => {
        this.onClose("transport close");
      });
    }
    probe(name) {
      let transport = this.createTransport(name);
      let failed = false;
      Socket.priorWebsocketSuccess = false;
      const onTransportOpen = () => {
        if (failed)
          return;
        transport.send([{ type: "ping", data: "probe" }]);
        transport.once("packet", (msg) => {
          if (failed)
            return;
          if (msg.type === "pong" && msg.data === "probe") {
            this.upgrading = true;
            this.emitReserved("upgrading", transport);
            if (!transport)
              return;
            Socket.priorWebsocketSuccess = transport.name === "websocket";
            this.transport.pause(() => {
              if (failed)
                return;
              if (this.readyState === "closed")
                return;
              cleanup();
              this.setTransport(transport);
              transport.send([{ type: "upgrade" }]);
              this.emitReserved("upgrade", transport);
              transport = null;
              this.upgrading = false;
              this.flush();
            });
          } else {
            const err = new Error("probe error");
            err.transport = transport.name;
            this.emitReserved("upgradeError", err);
          }
        });
      };
      function freezeTransport() {
        if (failed)
          return;
        failed = true;
        cleanup();
        transport.close();
        transport = null;
      }
      const onerror = (err) => {
        const error = new Error("probe error: " + err);
        error.transport = transport.name;
        freezeTransport();
        this.emitReserved("upgradeError", error);
      };
      function onTransportClose() {
        onerror("transport closed");
      }
      function onclose() {
        onerror("socket closed");
      }
      function onupgrade(to) {
        if (transport && to.name !== transport.name) {
          freezeTransport();
        }
      }
      const cleanup = () => {
        transport.removeListener("open", onTransportOpen);
        transport.removeListener("error", onerror);
        transport.removeListener("close", onTransportClose);
        this.off("close", onclose);
        this.off("upgrading", onupgrade);
      };
      transport.once("open", onTransportOpen);
      transport.once("error", onerror);
      transport.once("close", onTransportClose);
      this.once("close", onclose);
      this.once("upgrading", onupgrade);
      transport.open();
    }
    onOpen() {
      this.readyState = "open";
      Socket.priorWebsocketSuccess = this.transport.name === "websocket";
      this.emitReserved("open");
      this.flush();
      if (this.readyState === "open" && this.opts.upgrade && this.transport.pause) {
        let i = 0;
        const l = this.upgrades.length;
        for (; i < l; i++) {
          this.probe(this.upgrades[i]);
        }
      }
    }
    onPacket(packet) {
      if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
        this.emitReserved("packet", packet);
        this.emitReserved("heartbeat");
        switch (packet.type) {
          case "open":
            this.onHandshake(JSON.parse(packet.data));
            break;
          case "ping":
            this.resetPingTimeout();
            this.sendPacket("pong");
            this.emitReserved("ping");
            this.emitReserved("pong");
            break;
          case "error":
            const err = new Error("server error");
            err.code = packet.data;
            this.onError(err);
            break;
          case "message":
            this.emitReserved("data", packet.data);
            this.emitReserved("message", packet.data);
            break;
        }
      } else {
      }
    }
    onHandshake(data) {
      this.emitReserved("handshake", data);
      this.id = data.sid;
      this.transport.query.sid = data.sid;
      this.upgrades = this.filterUpgrades(data.upgrades);
      this.pingInterval = data.pingInterval;
      this.pingTimeout = data.pingTimeout;
      this.onOpen();
      if (this.readyState === "closed")
        return;
      this.resetPingTimeout();
    }
    resetPingTimeout() {
      this.clearTimeoutFn(this.pingTimeoutTimer);
      this.pingTimeoutTimer = this.setTimeoutFn(() => {
        this.onClose("ping timeout");
      }, this.pingInterval + this.pingTimeout);
      if (this.opts.autoUnref) {
        this.pingTimeoutTimer.unref();
      }
    }
    onDrain() {
      this.writeBuffer.splice(0, this.prevBufferLen);
      this.prevBufferLen = 0;
      if (this.writeBuffer.length === 0) {
        this.emitReserved("drain");
      } else {
        this.flush();
      }
    }
    flush() {
      if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
        this.transport.send(this.writeBuffer);
        this.prevBufferLen = this.writeBuffer.length;
        this.emitReserved("flush");
      }
    }
    write(msg, options, fn) {
      this.sendPacket("message", msg, options, fn);
      return this;
    }
    send(msg, options, fn) {
      this.sendPacket("message", msg, options, fn);
      return this;
    }
    sendPacket(type, data, options, fn) {
      if (typeof data === "function") {
        fn = data;
        data = void 0;
      }
      if (typeof options === "function") {
        fn = options;
        options = null;
      }
      if (this.readyState === "closing" || this.readyState === "closed") {
        return;
      }
      options = options || {};
      options.compress = options.compress !== false;
      const packet = {
        type,
        data,
        options
      };
      this.emitReserved("packetCreate", packet);
      this.writeBuffer.push(packet);
      if (fn)
        this.once("flush", fn);
      this.flush();
    }
    close() {
      const close = () => {
        this.onClose("forced close");
        this.transport.close();
      };
      const cleanupAndClose = () => {
        this.off("upgrade", cleanupAndClose);
        this.off("upgradeError", cleanupAndClose);
        close();
      };
      const waitForUpgrade = () => {
        this.once("upgrade", cleanupAndClose);
        this.once("upgradeError", cleanupAndClose);
      };
      if (this.readyState === "opening" || this.readyState === "open") {
        this.readyState = "closing";
        if (this.writeBuffer.length) {
          this.once("drain", () => {
            if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          });
        } else if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      }
      return this;
    }
    onError(err) {
      Socket.priorWebsocketSuccess = false;
      this.emitReserved("error", err);
      this.onClose("transport error", err);
    }
    onClose(reason, desc) {
      if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.transport.removeAllListeners("close");
        this.transport.close();
        this.transport.removeAllListeners();
        if (typeof removeEventListener === "function") {
          removeEventListener("offline", this.offlineEventListener, false);
        }
        this.readyState = "closed";
        this.id = null;
        this.emitReserved("close", reason, desc);
        this.writeBuffer = [];
        this.prevBufferLen = 0;
      }
    }
    filterUpgrades(upgrades) {
      const filteredUpgrades = [];
      let i = 0;
      const j = upgrades.length;
      for (; i < j; i++) {
        if (~this.transports.indexOf(upgrades[i]))
          filteredUpgrades.push(upgrades[i]);
      }
      return filteredUpgrades;
    }
  };
  Socket.protocol = protocol;
  function clone(obj) {
    const o = {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = obj[i];
      }
    }
    return o;
  }

  // node_modules/engine.io-client/build/esm/index.js
  var protocol2 = Socket.protocol;

  // node_modules/socket.io-parser/build/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    Decoder: () => Decoder,
    Encoder: () => Encoder,
    PacketType: () => PacketType,
    protocol: () => protocol3
  });
  var import_component_emitter4 = __toModule(require_component_emitter());

  // node_modules/socket.io-parser/build/esm/is-binary.js
  var withNativeArrayBuffer3 = typeof ArrayBuffer === "function";
  var isView2 = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };
  var toString = Object.prototype.toString;
  var withNativeBlob2 = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  function isBinary(obj) {
    return withNativeArrayBuffer3 && (obj instanceof ArrayBuffer || isView2(obj)) || withNativeBlob2 && obj instanceof Blob || withNativeFile && obj instanceof File;
  }
  function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    if (Array.isArray(obj)) {
      for (let i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }
      return false;
    }
    if (isBinary(obj)) {
      return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }
    return false;
  }

  // node_modules/socket.io-parser/build/esm/binary.js
  function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length;
    return { packet: pack, buffers };
  }
  function _deconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (isBinary(data)) {
      const placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      const newData = new Array(data.length);
      for (let i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }
      return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
      const newData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          newData[key] = _deconstructPacket(data[key], buffers);
        }
      }
      return newData;
    }
    return data;
  }
  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = void 0;
    return packet;
  }
  function _reconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (data && data._placeholder) {
      return buffers[data.num];
    } else if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (typeof data === "object") {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }
    return data;
  }

  // node_modules/socket.io-parser/build/esm/index.js
  var protocol3 = 5;
  var PacketType;
  (function(PacketType2) {
    PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
    PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
    PacketType2[PacketType2["ACK"] = 3] = "ACK";
    PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType || (PacketType = {}));
  var Encoder = class {
    encode(obj) {
      if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
        if (hasBinary(obj)) {
          obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
          return this.encodeAsBinary(obj);
        }
      }
      return [this.encodeAsString(obj)];
    }
    encodeAsString(obj) {
      let str = "" + obj.type;
      if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
        str += obj.attachments + "-";
      }
      if (obj.nsp && obj.nsp !== "/") {
        str += obj.nsp + ",";
      }
      if (obj.id != null) {
        str += obj.id;
      }
      if (obj.data != null) {
        str += JSON.stringify(obj.data);
      }
      return str;
    }
    encodeAsBinary(obj) {
      const deconstruction = deconstructPacket(obj);
      const pack = this.encodeAsString(deconstruction.packet);
      const buffers = deconstruction.buffers;
      buffers.unshift(pack);
      return buffers;
    }
  };
  var Decoder = class extends import_component_emitter4.Emitter {
    constructor() {
      super();
    }
    add(obj) {
      let packet;
      if (typeof obj === "string") {
        packet = this.decodeString(obj);
        if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
          this.reconstructor = new BinaryReconstructor(packet);
          if (packet.attachments === 0) {
            super.emitReserved("decoded", packet);
          }
        } else {
          super.emitReserved("decoded", packet);
        }
      } else if (isBinary(obj) || obj.base64) {
        if (!this.reconstructor) {
          throw new Error("got binary data when not reconstructing a packet");
        } else {
          packet = this.reconstructor.takeBinaryData(obj);
          if (packet) {
            this.reconstructor = null;
            super.emitReserved("decoded", packet);
          }
        }
      } else {
        throw new Error("Unknown type: " + obj);
      }
    }
    decodeString(str) {
      let i = 0;
      const p = {
        type: Number(str.charAt(0))
      };
      if (PacketType[p.type] === void 0) {
        throw new Error("unknown packet type " + p.type);
      }
      if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
        const start = i + 1;
        while (str.charAt(++i) !== "-" && i != str.length) {
        }
        const buf = str.substring(start, i);
        if (buf != Number(buf) || str.charAt(i) !== "-") {
          throw new Error("Illegal attachments");
        }
        p.attachments = Number(buf);
      }
      if (str.charAt(i + 1) === "/") {
        const start = i + 1;
        while (++i) {
          const c = str.charAt(i);
          if (c === ",")
            break;
          if (i === str.length)
            break;
        }
        p.nsp = str.substring(start, i);
      } else {
        p.nsp = "/";
      }
      const next = str.charAt(i + 1);
      if (next !== "" && Number(next) == next) {
        const start = i + 1;
        while (++i) {
          const c = str.charAt(i);
          if (c == null || Number(c) != c) {
            --i;
            break;
          }
          if (i === str.length)
            break;
        }
        p.id = Number(str.substring(start, i + 1));
      }
      if (str.charAt(++i)) {
        const payload = tryParse(str.substr(i));
        if (Decoder.isPayloadValid(p.type, payload)) {
          p.data = payload;
        } else {
          throw new Error("invalid payload");
        }
      }
      return p;
    }
    static isPayloadValid(type, payload) {
      switch (type) {
        case PacketType.CONNECT:
          return typeof payload === "object";
        case PacketType.DISCONNECT:
          return payload === void 0;
        case PacketType.CONNECT_ERROR:
          return typeof payload === "string" || typeof payload === "object";
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          return Array.isArray(payload) && payload.length > 0;
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          return Array.isArray(payload);
      }
    }
    destroy() {
      if (this.reconstructor) {
        this.reconstructor.finishedReconstruction();
      }
    }
  };
  function tryParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }
  var BinaryReconstructor = class {
    constructor(packet) {
      this.packet = packet;
      this.buffers = [];
      this.reconPack = packet;
    }
    takeBinaryData(binData) {
      this.buffers.push(binData);
      if (this.buffers.length === this.reconPack.attachments) {
        const packet = reconstructPacket(this.reconPack, this.buffers);
        this.finishedReconstruction();
        return packet;
      }
      return null;
    }
    finishedReconstruction() {
      this.reconPack = null;
      this.buffers = [];
    }
  };

  // node_modules/socket.io-client/build/esm/on.js
  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
      obj.off(ev, fn);
    };
  }

  // node_modules/socket.io-client/build/esm/socket.js
  var import_component_emitter5 = __toModule(require_component_emitter());
  var RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1
  });
  var Socket2 = class extends import_component_emitter5.Emitter {
    constructor(io, nsp, opts) {
      super();
      this.connected = false;
      this.disconnected = true;
      this.receiveBuffer = [];
      this.sendBuffer = [];
      this.ids = 0;
      this.acks = {};
      this.flags = {};
      this.io = io;
      this.nsp = nsp;
      if (opts && opts.auth) {
        this.auth = opts.auth;
      }
      if (this.io._autoConnect)
        this.open();
    }
    subEvents() {
      if (this.subs)
        return;
      const io = this.io;
      this.subs = [
        on(io, "open", this.onopen.bind(this)),
        on(io, "packet", this.onpacket.bind(this)),
        on(io, "error", this.onerror.bind(this)),
        on(io, "close", this.onclose.bind(this))
      ];
    }
    get active() {
      return !!this.subs;
    }
    connect() {
      if (this.connected)
        return this;
      this.subEvents();
      if (!this.io["_reconnecting"])
        this.io.open();
      if (this.io._readyState === "open")
        this.onopen();
      return this;
    }
    open() {
      return this.connect();
    }
    send(...args) {
      args.unshift("message");
      this.emit.apply(this, args);
      return this;
    }
    emit(ev, ...args) {
      if (RESERVED_EVENTS.hasOwnProperty(ev)) {
        throw new Error('"' + ev + '" is a reserved event name');
      }
      args.unshift(ev);
      const packet = {
        type: PacketType.EVENT,
        data: args
      };
      packet.options = {};
      packet.options.compress = this.flags.compress !== false;
      if (typeof args[args.length - 1] === "function") {
        const id = this.ids++;
        const ack = args.pop();
        this._registerAckCallback(id, ack);
        packet.id = id;
      }
      const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
      const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
      if (discardPacket) {
      } else if (this.connected) {
        this.packet(packet);
      } else {
        this.sendBuffer.push(packet);
      }
      this.flags = {};
      return this;
    }
    _registerAckCallback(id, ack) {
      const timeout = this.flags.timeout;
      if (timeout === void 0) {
        this.acks[id] = ack;
        return;
      }
      const timer = this.io.setTimeoutFn(() => {
        delete this.acks[id];
        for (let i = 0; i < this.sendBuffer.length; i++) {
          if (this.sendBuffer[i].id === id) {
            this.sendBuffer.splice(i, 1);
          }
        }
        ack.call(this, new Error("operation has timed out"));
      }, timeout);
      this.acks[id] = (...args) => {
        this.io.clearTimeoutFn(timer);
        ack.apply(this, [null, ...args]);
      };
    }
    packet(packet) {
      packet.nsp = this.nsp;
      this.io._packet(packet);
    }
    onopen() {
      if (typeof this.auth == "function") {
        this.auth((data) => {
          this.packet({ type: PacketType.CONNECT, data });
        });
      } else {
        this.packet({ type: PacketType.CONNECT, data: this.auth });
      }
    }
    onerror(err) {
      if (!this.connected) {
        this.emitReserved("connect_error", err);
      }
    }
    onclose(reason) {
      this.connected = false;
      this.disconnected = true;
      delete this.id;
      this.emitReserved("disconnect", reason);
    }
    onpacket(packet) {
      const sameNamespace = packet.nsp === this.nsp;
      if (!sameNamespace)
        return;
      switch (packet.type) {
        case PacketType.CONNECT:
          if (packet.data && packet.data.sid) {
            const id = packet.data.sid;
            this.onconnect(id);
          } else {
            this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          }
          break;
        case PacketType.EVENT:
          this.onevent(packet);
          break;
        case PacketType.BINARY_EVENT:
          this.onevent(packet);
          break;
        case PacketType.ACK:
          this.onack(packet);
          break;
        case PacketType.BINARY_ACK:
          this.onack(packet);
          break;
        case PacketType.DISCONNECT:
          this.ondisconnect();
          break;
        case PacketType.CONNECT_ERROR:
          this.destroy();
          const err = new Error(packet.data.message);
          err.data = packet.data.data;
          this.emitReserved("connect_error", err);
          break;
      }
    }
    onevent(packet) {
      const args = packet.data || [];
      if (packet.id != null) {
        args.push(this.ack(packet.id));
      }
      if (this.connected) {
        this.emitEvent(args);
      } else {
        this.receiveBuffer.push(Object.freeze(args));
      }
    }
    emitEvent(args) {
      if (this._anyListeners && this._anyListeners.length) {
        const listeners = this._anyListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, args);
        }
      }
      super.emit.apply(this, args);
    }
    ack(id) {
      const self3 = this;
      let sent = false;
      return function(...args) {
        if (sent)
          return;
        sent = true;
        self3.packet({
          type: PacketType.ACK,
          id,
          data: args
        });
      };
    }
    onack(packet) {
      const ack = this.acks[packet.id];
      if (typeof ack === "function") {
        ack.apply(this, packet.data);
        delete this.acks[packet.id];
      } else {
      }
    }
    onconnect(id) {
      this.id = id;
      this.connected = true;
      this.disconnected = false;
      this.emitBuffered();
      this.emitReserved("connect");
    }
    emitBuffered() {
      this.receiveBuffer.forEach((args) => this.emitEvent(args));
      this.receiveBuffer = [];
      this.sendBuffer.forEach((packet) => this.packet(packet));
      this.sendBuffer = [];
    }
    ondisconnect() {
      this.destroy();
      this.onclose("io server disconnect");
    }
    destroy() {
      if (this.subs) {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs = void 0;
      }
      this.io["_destroy"](this);
    }
    disconnect() {
      if (this.connected) {
        this.packet({ type: PacketType.DISCONNECT });
      }
      this.destroy();
      if (this.connected) {
        this.onclose("io client disconnect");
      }
      return this;
    }
    close() {
      return this.disconnect();
    }
    compress(compress) {
      this.flags.compress = compress;
      return this;
    }
    get volatile() {
      this.flags.volatile = true;
      return this;
    }
    timeout(timeout) {
      this.flags.timeout = timeout;
      return this;
    }
    onAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.push(listener);
      return this;
    }
    prependAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.unshift(listener);
      return this;
    }
    offAny(listener) {
      if (!this._anyListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyListeners;
        for (let i = 0; i < listeners.length; i++) {
          if (listener === listeners[i]) {
            listeners.splice(i, 1);
            return this;
          }
        }
      } else {
        this._anyListeners = [];
      }
      return this;
    }
    listenersAny() {
      return this._anyListeners || [];
    }
  };

  // node_modules/socket.io-client/build/esm/manager.js
  var import_backo2 = __toModule(require_backo2());
  var import_component_emitter6 = __toModule(require_component_emitter());
  var Manager = class extends import_component_emitter6.Emitter {
    constructor(uri, opts) {
      var _a;
      super();
      this.nsps = {};
      this.subs = [];
      if (uri && typeof uri === "object") {
        opts = uri;
        uri = void 0;
      }
      opts = opts || {};
      opts.path = opts.path || "/socket.io";
      this.opts = opts;
      installTimerFunctions(this, opts);
      this.reconnection(opts.reconnection !== false);
      this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
      this.reconnectionDelay(opts.reconnectionDelay || 1e3);
      this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
      this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
      this.backoff = new import_backo2.default({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor()
      });
      this.timeout(opts.timeout == null ? 2e4 : opts.timeout);
      this._readyState = "closed";
      this.uri = uri;
      const _parser = opts.parser || esm_exports;
      this.encoder = new _parser.Encoder();
      this.decoder = new _parser.Decoder();
      this._autoConnect = opts.autoConnect !== false;
      if (this._autoConnect)
        this.open();
    }
    reconnection(v) {
      if (!arguments.length)
        return this._reconnection;
      this._reconnection = !!v;
      return this;
    }
    reconnectionAttempts(v) {
      if (v === void 0)
        return this._reconnectionAttempts;
      this._reconnectionAttempts = v;
      return this;
    }
    reconnectionDelay(v) {
      var _a;
      if (v === void 0)
        return this._reconnectionDelay;
      this._reconnectionDelay = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
      return this;
    }
    randomizationFactor(v) {
      var _a;
      if (v === void 0)
        return this._randomizationFactor;
      this._randomizationFactor = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
      return this;
    }
    reconnectionDelayMax(v) {
      var _a;
      if (v === void 0)
        return this._reconnectionDelayMax;
      this._reconnectionDelayMax = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
      return this;
    }
    timeout(v) {
      if (!arguments.length)
        return this._timeout;
      this._timeout = v;
      return this;
    }
    maybeReconnectOnOpen() {
      if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
        this.reconnect();
      }
    }
    open(fn) {
      if (~this._readyState.indexOf("open"))
        return this;
      this.engine = new Socket(this.uri, this.opts);
      const socket = this.engine;
      const self3 = this;
      this._readyState = "opening";
      this.skipReconnect = false;
      const openSubDestroy = on(socket, "open", function() {
        self3.onopen();
        fn && fn();
      });
      const errorSub = on(socket, "error", (err) => {
        self3.cleanup();
        self3._readyState = "closed";
        this.emitReserved("error", err);
        if (fn) {
          fn(err);
        } else {
          self3.maybeReconnectOnOpen();
        }
      });
      if (this._timeout !== false) {
        const timeout = this._timeout;
        if (timeout === 0) {
          openSubDestroy();
        }
        const timer = this.setTimeoutFn(() => {
          openSubDestroy();
          socket.close();
          socket.emit("error", new Error("timeout"));
        }, timeout);
        if (this.opts.autoUnref) {
          timer.unref();
        }
        this.subs.push(function subDestroy() {
          clearTimeout(timer);
        });
      }
      this.subs.push(openSubDestroy);
      this.subs.push(errorSub);
      return this;
    }
    connect(fn) {
      return this.open(fn);
    }
    onopen() {
      this.cleanup();
      this._readyState = "open";
      this.emitReserved("open");
      const socket = this.engine;
      this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    onping() {
      this.emitReserved("ping");
    }
    ondata(data) {
      this.decoder.add(data);
    }
    ondecoded(packet) {
      this.emitReserved("packet", packet);
    }
    onerror(err) {
      this.emitReserved("error", err);
    }
    socket(nsp, opts) {
      let socket = this.nsps[nsp];
      if (!socket) {
        socket = new Socket2(this, nsp, opts);
        this.nsps[nsp] = socket;
      }
      return socket;
    }
    _destroy(socket) {
      const nsps = Object.keys(this.nsps);
      for (const nsp of nsps) {
        const socket2 = this.nsps[nsp];
        if (socket2.active) {
          return;
        }
      }
      this._close();
    }
    _packet(packet) {
      const encodedPackets = this.encoder.encode(packet);
      for (let i = 0; i < encodedPackets.length; i++) {
        this.engine.write(encodedPackets[i], packet.options);
      }
    }
    cleanup() {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs.length = 0;
      this.decoder.destroy();
    }
    _close() {
      this.skipReconnect = true;
      this._reconnecting = false;
      this.onclose("forced close");
      if (this.engine)
        this.engine.close();
    }
    disconnect() {
      return this._close();
    }
    onclose(reason) {
      this.cleanup();
      this.backoff.reset();
      this._readyState = "closed";
      this.emitReserved("close", reason);
      if (this._reconnection && !this.skipReconnect) {
        this.reconnect();
      }
    }
    reconnect() {
      if (this._reconnecting || this.skipReconnect)
        return this;
      const self3 = this;
      if (this.backoff.attempts >= this._reconnectionAttempts) {
        this.backoff.reset();
        this.emitReserved("reconnect_failed");
        this._reconnecting = false;
      } else {
        const delay = this.backoff.duration();
        this._reconnecting = true;
        const timer = this.setTimeoutFn(() => {
          if (self3.skipReconnect)
            return;
          this.emitReserved("reconnect_attempt", self3.backoff.attempts);
          if (self3.skipReconnect)
            return;
          self3.open((err) => {
            if (err) {
              self3._reconnecting = false;
              self3.reconnect();
              this.emitReserved("reconnect_error", err);
            } else {
              self3.onreconnect();
            }
          });
        }, delay);
        if (this.opts.autoUnref) {
          timer.unref();
        }
        this.subs.push(function subDestroy() {
          clearTimeout(timer);
        });
      }
    }
    onreconnect() {
      const attempt = this.backoff.attempts;
      this._reconnecting = false;
      this.backoff.reset();
      this.emitReserved("reconnect", attempt);
    }
  };

  // node_modules/socket.io-client/build/esm/index.js
  var cache = {};
  function lookup2(uri, opts) {
    if (typeof uri === "object") {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    const parsed = url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew || opts["force new connection"] || opts.multiplex === false || sameNamespace;
    let io;
    if (newConnection) {
      io = new Manager(source, opts);
    } else {
      if (!cache[id]) {
        cache[id] = new Manager(source, opts);
      }
      io = cache[id];
    }
    if (parsed.query && !opts.query) {
      opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
  }
  Object.assign(lookup2, {
    Manager,
    Socket: Socket2,
    io: lookup2,
    connect: lookup2
  });

  // src/utils/HistoryUtils.ts
  function setURL(url2) {
    history.pushState({}, "", url2);
    window.dispatchEvent(new Event("popstate"));
  }

  // src/services/NotificationService.ts
  var notificationsEnabled = false;
  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }
  function initializeNotificationService() {
    notificationsEnabled = localStorage.getItem("notifications") === "true";
    if (!("Notification" in window)) {
      return;
    }
    const isNotificationsPromiseSupported = checkNotificationPromise();
    if (!isNotificationsPromiseSupported) {
      Notification.requestPermission();
    }
  }
  function areNotificationsEnabled() {
    return notificationsEnabled;
  }
  function toggleNotificationsEnabled() {
    notificationsEnabled = !notificationsEnabled;
    localStorage.setItem("notifications", notificationsEnabled ? "true" : "false");
  }
  function inSameRoom(roomID) {
    return document.URL.includes(roomID) && document.hasFocus() ? true : false;
  }
  function sendNotification(params) {
    if (!areNotificationsEnabled() || inSameRoom(params.roomId)) {
      return;
    }
    const notification = new Notification(params.title, { body: params.body });
    notification.onclick = () => {
      window.focus();
      setURL(`/rooms/${params.roomId}`);
    };
  }

  // src/utils/TextUtils.ts
  var TextUtils = {
    truncate(text, maxlength) {
      return text.substring(0, maxlength);
    }
  };

  // src/apis/Api.ts
  async function httpGet(url2) {
    const res = await fetch(url2);
    if (res.status === 404) {
      setURL("/");
      return null;
    }
    const jsonData = await res.json();
    return jsonData.data;
  }

  // src/apis/UserApi.ts
  var defaultUser = {
    _id: "-1",
    name: "MissigNo."
  };
  var self2 = null;
  var users = [];
  async function initializeUserApi() {
    self2 = await fetchSelf();
    users = await getUsers();
  }
  var bIsLoggedIn = false;
  function isLoggedIn() {
    return bIsLoggedIn;
  }
  var userGetAllPromise = null;
  async function getUsers() {
    try {
      if (!userGetAllPromise) {
        userGetAllPromise = httpGet("/api/users");
      }
      const users2 = await userGetAllPromise;
      bIsLoggedIn = true;
      return users2;
    } catch (err) {
      bIsLoggedIn = false;
      return [];
    }
  }
  function getUser(id) {
    const user = users.find((user2) => user2._id === id);
    if (!user) {
      return defaultUser;
    }
    return user;
  }
  async function fetchSelf() {
    try {
      const user = await httpGet("/api/users/self");
      return user;
    } catch (err) {
      return null;
    }
  }
  function getSelf() {
    return self2;
  }

  // src/apis/RoomApi.ts
  var messageListenerByRoomId = {};
  var deletingMessageListener = {};
  var editMessageListener = {};
  var roomListListenerByRoomId = {};
  async function initializeRoomApi() {
    await getRooms();
    const socket = lookup2();
    socket.on("message", (message) => {
      const room = roomsById[message.room];
      if (!room) {
        return;
      }
      const currentUser = getSelf();
      const messageSender = getUser(message.user);
      const roomId = message.room;
      if (message.user !== currentUser._id) {
        room.userRoomConfig.unreadCount++;
        roomListListenerByRoomId[roomId](room.userRoomConfig);
        sendNotification({
          title: room.name,
          body: `${messageSender.name}: ${TextUtils.truncate(message.body, 256)}`,
          roomId: message.room
        });
      }
      if (messagesByRoomID[roomId]) {
        messagesByRoomID[roomId].unshift(message);
        if (messageListenerByRoomId[roomId]) {
          messageListenerByRoomId[roomId](message);
        }
      }
    });
    socket.on("edited-message", (message) => {
      editMessageListener[message.room](message);
    });
    socket.on("delete-message", ({ room, id }) => {
      deletingMessageListener[room](id);
    });
  }
  var roomsById = {};
  async function getRooms() {
    const res = await fetch("/api/rooms");
    const jsonData = await res.json();
    const rooms = jsonData.data;
    for (const room of rooms) {
      roomsById[room._id] = room;
    }
    return jsonData.data;
  }
  function getRoom(roomId) {
    return roomsById[roomId];
  }
  var messagesByRoomID = {};
  async function getRoomMessageByPage(roomId, lastMessageId) {
    const data = await httpGet(`/api/rooms/${roomId}/messages?lastmessageid=${lastMessageId}`);
    messagesByRoomID[roomId] = data.messages;
    return {
      messages: messagesByRoomID[roomId],
      userRoomConfig: data.userRoomConfig,
      lastMessageId: data.messages.length ? data.messages[data.messages.length - 1]._id : lastMessageId
    };
  }
  async function sendRoomMessage(params) {
    if (!params.body) {
      return;
    }
    fetch(`/api/rooms/${params.room}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ body: params.body })
    });
  }
  async function deleteRoomMessage(params) {
    fetch(`/api/rooms/${params.room}/messages`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: params.id
      })
    });
  }
  async function editRoomMessage(params) {
    if (!params.body) {
      return;
    }
    fetch(`/api/rooms/${params.room}/messages`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: params.id,
        body: params.body
      })
    });
  }
  async function onRoomMessage(roomId, handler) {
    messageListenerByRoomId[roomId] = handler;
  }
  function onDeleteMessage(roomId, handler) {
    deletingMessageListener[roomId] = handler;
  }
  function onEditMessage(roomId, handler) {
    editMessageListener[roomId] = handler;
  }
  function onUnreadUpdate(room, handler) {
    roomListListenerByRoomId[room._id] = handler;
  }

  // src/apis/PushNotificationApi.ts
  async function saveSubscription(subscription) {
    await fetch("/api/subscriptions", {
      method: "POST",
      body: JSON.stringify({
        subscription
      }),
      headers: {
        "content-type": "application/json"
      }
    });
  }
  async function deleteSubscription(subscription) {
    await fetch("/api/subscriptions", {
      method: "DELETE",
      body: JSON.stringify({
        subscription
      }),
      headers: {
        "content-type": "application/json"
      }
    });
  }
  async function getPublicKey() {
    const data = await fetch("/api/subscriptions/publickey");
    const jsonData = await data.json();
    return jsonData.publickey;
  }

  // src/services/PushService.ts
  function urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  function isPushNotificationSupported() {
    return "PushManager" in window && "serviceWorker" in navigator;
  }
  async function arePushNotificationsSubscribed() {
    const serviceWorker = await navigator.serviceWorker.ready;
    return await serviceWorker.pushManager.getSubscription() ? true : false;
  }
  async function togglePushNotifications() {
    const serviceWorker = await navigator.serviceWorker.ready;
    if (!await arePushNotificationsSubscribed()) {
      const subscribed = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(await getPublicKey())
      });
      if (subscribed) {
        await saveSubscriptionOnServer(subscribed);
      }
    } else {
      const currentSubscription = await serviceWorker.pushManager.getSubscription();
      const unsubscribed = (await serviceWorker.pushManager.getSubscription()).unsubscribe();
      if (unsubscribed) {
        await removeSubscriptionOnServer(currentSubscription);
      }
    }
  }
  async function saveSubscriptionOnServer(subscription) {
    await saveSubscription(subscription);
  }
  async function removeSubscriptionOnServer(subscription) {
    await deleteSubscription(subscription);
  }
  function registerServiceWorker() {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").then().catch((error) => {
        console.error("Service worker error", error);
      });
    });
  }
  function initializePushNotificationService() {
    if (!isPushNotificationSupported()) {
      console.error("Push notifications are not supported");
      return;
    }
    initializeNotificationService();
    registerServiceWorker();
  }

  // src/components/Button.ts
  function Button(props) {
    const el = document.createElement("button");
    el.innerText = props.text;
    return el;
  }

  // src/components/Div.ts
  function Div(attributes = {}) {
    const div = document.createElement("div");
    for (const attribute in attributes) {
      div.setAttribute(attribute, attributes[attribute]);
    }
    return div;
  }

  // src/utils/DomUtils.ts
  function byId(id) {
    return document.getElementById(id);
  }
  function bySelector(element, selector) {
    return element.querySelector(selector);
  }
  function setText(el, text) {
    el.innerText = text;
  }
  function onClick(el, handler) {
    return el.addEventListener("click", handler, true);
  }
  function onMouseOver(el, handler) {
    return el.addEventListener("mouseover", handler);
  }
  function onMouseLeave(el, handler) {
    return el.addEventListener("mouseleave", handler);
  }
  function setStyle(el, styles) {
    for (const key of Object.keys(styles)) {
      el.style[key] = styles[key];
    }
  }
  function bottomPosition(element) {
    return element.getBoundingClientRect().bottom;
  }

  // src/views/Header.ts
  function Header() {
    const el = Div();
    setStyle(el, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexShrink: "0",
      height: "50px",
      backgroundColor: "#424242",
      color: "white",
      fontSize: "2em",
      padding: "0 20px"
    });
    const roomTitle = Div();
    setStyle(roomTitle, {
      fontFamily: "'Courier New', Courier, monospace"
    });
    roomTitle.innerText = "XYZ";
    el.append(roomTitle);
    const headerActionsEl = Div();
    el.append(headerActionsEl);
    const btnNotifications = Button({
      text: ""
    });
    updateNotificationButtonText();
    function updateNotificationButtonText() {
      setText(btnNotifications, areNotificationsEnabled() ? "pause notifications" : "enable notifications");
    }
    btnNotifications.addEventListener("click", async function() {
      toggleNotificationsEnabled();
      updateNotificationButtonText();
    });
    if (isLoggedIn()) {
      const btnPushNotifications = Button({
        text: ""
      });
      updatePushNotificationButtonText();
      async function updatePushNotificationButtonText() {
        const pushNotificationStatus = await arePushNotificationsSubscribed();
        setText(btnPushNotifications, pushNotificationStatus ? "pause push notifications" : "enable push notifications");
      }
      headerActionsEl.append(btnPushNotifications);
      btnPushNotifications.addEventListener("click", async function() {
        btnPushNotifications.disabled = true;
        await togglePushNotifications();
        await updatePushNotificationButtonText();
        btnPushNotifications.disabled = false;
      });
    }
    if (!isLoggedIn()) {
      const btnLogin = Button({
        text: "login"
      });
      headerActionsEl.append(btnLogin);
      btnLogin.addEventListener("click", async function() {
        const email = prompt("email");
        const password = prompt("password");
        const res = await fetch("/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        });
        if (res.ok) {
          window.location.reload();
        }
      });
    }
    return el;
  }

  // src/apis/UserRoomConfigApi.ts
  function postUserRoomConfig(userRoomConfig) {
    fetch("/api/userroomconfigs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userRoomConfig)
    });
  }

  // src/views/RoomList.ts
  var RoomList = () => {
    const el = Div();
    setStyle(el, {
      flex: "1",
      height: "calc(100vh - 50px)",
      borderRight: "1px solid black"
    });
    let rooms = [];
    async function init() {
      const roomListEl = Div();
      setStyle(roomListEl, {
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        height: "100%"
      });
      rooms = await getRooms();
      for (const room of rooms) {
        let createUnreadBubble = function(config) {
          const unreadCountEl = Div({
            class: "unread-count",
            id: config.room
          });
          setStyle(unreadCountEl, {
            marginLeft: "8px",
            backgroundColor: "red",
            borderRadius: "999px",
            paddingLeft: "8px",
            paddingRight: "8px",
            color: "white"
          });
          unreadCountEl.innerText = String(config.unreadCount);
          roomEl.append(unreadCountEl);
        };
        const roomEl = Div();
        setStyle(roomEl, {
          display: "flex",
          padding: "20px",
          borderBottom: "1px solid black"
        });
        onUnreadUpdate(room, (config) => {
          const countToUpdate = byId(config.room);
          if (config.unreadCount > 0) {
            if (countToUpdate) {
              countToUpdate.innerHTML = String(config.unreadCount);
            } else {
              createUnreadBubble(config);
            }
          }
        });
        onClick(roomEl, async () => {
          await postUserRoomConfig({
            ...room.userRoomConfig,
            room: room._id,
            unreadCount: 0
          });
          setURL(`/rooms/${room._id}`);
        });
        const roomNameEl = Div();
        setStyle(roomNameEl, {
          overflow: "hidden",
          textOverflow: "ellipsis"
        });
        roomNameEl.innerText = room.name;
        roomNameEl.classList.add("hover:text-primary");
        roomEl.append(roomNameEl);
        if (room.userRoomConfig?.unreadCount > 0) {
          createUnreadBubble(room.userRoomConfig);
        }
        roomListEl.appendChild(roomEl);
      }
      el.append(roomListEl);
    }
    init();
    return el;
  };
  async function clearUnreadBubble(room) {
    const unreadBubble = byId(room._id);
    if (unreadBubble) {
      unreadBubble.remove();
      await getRooms();
    }
  }

  // node_modules/autolinker/dist/es2015/utils.js
  function defaults(dest, src) {
    for (var prop in src) {
      if (src.hasOwnProperty(prop) && dest[prop] === void 0) {
        dest[prop] = src[prop];
      }
    }
    return dest;
  }
  function ellipsis(str, truncateLen, ellipsisChars) {
    var ellipsisLength;
    if (str.length > truncateLen) {
      if (ellipsisChars == null) {
        ellipsisChars = "&hellip;";
        ellipsisLength = 3;
      } else {
        ellipsisLength = ellipsisChars.length;
      }
      str = str.substring(0, truncateLen - ellipsisLength) + ellipsisChars;
    }
    return str;
  }
  function indexOf(arr, element) {
    if (Array.prototype.indexOf) {
      return arr.indexOf(element);
    } else {
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === element)
          return i;
      }
      return -1;
    }
  }
  function remove(arr, fn) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (fn(arr[i]) === true) {
        arr.splice(i, 1);
      }
    }
  }
  function splitAndCapture(str, splitRegex) {
    if (!splitRegex.global)
      throw new Error("`splitRegex` must have the 'g' flag set");
    var result = [], lastIdx = 0, match;
    while (match = splitRegex.exec(str)) {
      result.push(str.substring(lastIdx, match.index));
      result.push(match[0]);
      lastIdx = match.index + match[0].length;
    }
    result.push(str.substring(lastIdx));
    return result;
  }
  function throwUnhandledCaseError(theValue) {
    throw new Error("Unhandled case for value: '" + theValue + "'");
  }

  // node_modules/autolinker/dist/es2015/html-tag.js
  var HtmlTag = function() {
    function HtmlTag2(cfg) {
      if (cfg === void 0) {
        cfg = {};
      }
      this.tagName = "";
      this.attrs = {};
      this.innerHTML = "";
      this.whitespaceRegex = /\s+/;
      this.tagName = cfg.tagName || "";
      this.attrs = cfg.attrs || {};
      this.innerHTML = cfg.innerHtml || cfg.innerHTML || "";
    }
    HtmlTag2.prototype.setTagName = function(tagName) {
      this.tagName = tagName;
      return this;
    };
    HtmlTag2.prototype.getTagName = function() {
      return this.tagName || "";
    };
    HtmlTag2.prototype.setAttr = function(attrName, attrValue) {
      var tagAttrs = this.getAttrs();
      tagAttrs[attrName] = attrValue;
      return this;
    };
    HtmlTag2.prototype.getAttr = function(attrName) {
      return this.getAttrs()[attrName];
    };
    HtmlTag2.prototype.setAttrs = function(attrs) {
      Object.assign(this.getAttrs(), attrs);
      return this;
    };
    HtmlTag2.prototype.getAttrs = function() {
      return this.attrs || (this.attrs = {});
    };
    HtmlTag2.prototype.setClass = function(cssClass) {
      return this.setAttr("class", cssClass);
    };
    HtmlTag2.prototype.addClass = function(cssClass) {
      var classAttr = this.getClass(), whitespaceRegex = this.whitespaceRegex, classes = !classAttr ? [] : classAttr.split(whitespaceRegex), newClasses = cssClass.split(whitespaceRegex), newClass;
      while (newClass = newClasses.shift()) {
        if (indexOf(classes, newClass) === -1) {
          classes.push(newClass);
        }
      }
      this.getAttrs()["class"] = classes.join(" ");
      return this;
    };
    HtmlTag2.prototype.removeClass = function(cssClass) {
      var classAttr = this.getClass(), whitespaceRegex = this.whitespaceRegex, classes = !classAttr ? [] : classAttr.split(whitespaceRegex), removeClasses = cssClass.split(whitespaceRegex), removeClass;
      while (classes.length && (removeClass = removeClasses.shift())) {
        var idx = indexOf(classes, removeClass);
        if (idx !== -1) {
          classes.splice(idx, 1);
        }
      }
      this.getAttrs()["class"] = classes.join(" ");
      return this;
    };
    HtmlTag2.prototype.getClass = function() {
      return this.getAttrs()["class"] || "";
    };
    HtmlTag2.prototype.hasClass = function(cssClass) {
      return (" " + this.getClass() + " ").indexOf(" " + cssClass + " ") !== -1;
    };
    HtmlTag2.prototype.setInnerHTML = function(html) {
      this.innerHTML = html;
      return this;
    };
    HtmlTag2.prototype.setInnerHtml = function(html) {
      return this.setInnerHTML(html);
    };
    HtmlTag2.prototype.getInnerHTML = function() {
      return this.innerHTML || "";
    };
    HtmlTag2.prototype.getInnerHtml = function() {
      return this.getInnerHTML();
    };
    HtmlTag2.prototype.toAnchorString = function() {
      var tagName = this.getTagName(), attrsStr = this.buildAttrsStr();
      attrsStr = attrsStr ? " " + attrsStr : "";
      return ["<", tagName, attrsStr, ">", this.getInnerHtml(), "</", tagName, ">"].join("");
    };
    HtmlTag2.prototype.buildAttrsStr = function() {
      if (!this.attrs)
        return "";
      var attrs = this.getAttrs(), attrsArr = [];
      for (var prop in attrs) {
        if (attrs.hasOwnProperty(prop)) {
          attrsArr.push(prop + '="' + attrs[prop] + '"');
        }
      }
      return attrsArr.join(" ");
    };
    return HtmlTag2;
  }();

  // node_modules/autolinker/dist/es2015/truncate/truncate-smart.js
  function truncateSmart(url2, truncateLen, ellipsisChars) {
    var ellipsisLengthBeforeParsing;
    var ellipsisLength;
    if (ellipsisChars == null) {
      ellipsisChars = "&hellip;";
      ellipsisLength = 3;
      ellipsisLengthBeforeParsing = 8;
    } else {
      ellipsisLength = ellipsisChars.length;
      ellipsisLengthBeforeParsing = ellipsisChars.length;
    }
    var parse_url = function(url3) {
      var urlObj2 = {};
      var urlSub = url3;
      var match = urlSub.match(/^([a-z]+):\/\//i);
      if (match) {
        urlObj2.scheme = match[1];
        urlSub = urlSub.substr(match[0].length);
      }
      match = urlSub.match(/^(.*?)(?=(\?|#|\/|$))/i);
      if (match) {
        urlObj2.host = match[1];
        urlSub = urlSub.substr(match[0].length);
      }
      match = urlSub.match(/^\/(.*?)(?=(\?|#|$))/i);
      if (match) {
        urlObj2.path = match[1];
        urlSub = urlSub.substr(match[0].length);
      }
      match = urlSub.match(/^\?(.*?)(?=(#|$))/i);
      if (match) {
        urlObj2.query = match[1];
        urlSub = urlSub.substr(match[0].length);
      }
      match = urlSub.match(/^#(.*?)$/i);
      if (match) {
        urlObj2.fragment = match[1];
      }
      return urlObj2;
    };
    var buildUrl = function(urlObj2) {
      var url3 = "";
      if (urlObj2.scheme && urlObj2.host) {
        url3 += urlObj2.scheme + "://";
      }
      if (urlObj2.host) {
        url3 += urlObj2.host;
      }
      if (urlObj2.path) {
        url3 += "/" + urlObj2.path;
      }
      if (urlObj2.query) {
        url3 += "?" + urlObj2.query;
      }
      if (urlObj2.fragment) {
        url3 += "#" + urlObj2.fragment;
      }
      return url3;
    };
    var buildSegment = function(segment, remainingAvailableLength3) {
      var remainingAvailableLengthHalf = remainingAvailableLength3 / 2, startOffset = Math.ceil(remainingAvailableLengthHalf), endOffset = -1 * Math.floor(remainingAvailableLengthHalf), end2 = "";
      if (endOffset < 0) {
        end2 = segment.substr(endOffset);
      }
      return segment.substr(0, startOffset) + ellipsisChars + end2;
    };
    if (url2.length <= truncateLen) {
      return url2;
    }
    var availableLength = truncateLen - ellipsisLength;
    var urlObj = parse_url(url2);
    if (urlObj.query) {
      var matchQuery = urlObj.query.match(/^(.*?)(?=(\?|\#))(.*?)$/i);
      if (matchQuery) {
        urlObj.query = urlObj.query.substr(0, matchQuery[1].length);
        url2 = buildUrl(urlObj);
      }
    }
    if (url2.length <= truncateLen) {
      return url2;
    }
    if (urlObj.host) {
      urlObj.host = urlObj.host.replace(/^www\./, "");
      url2 = buildUrl(urlObj);
    }
    if (url2.length <= truncateLen) {
      return url2;
    }
    var str = "";
    if (urlObj.host) {
      str += urlObj.host;
    }
    if (str.length >= availableLength) {
      if (urlObj.host.length == truncateLen) {
        return (urlObj.host.substr(0, truncateLen - ellipsisLength) + ellipsisChars).substr(0, availableLength + ellipsisLengthBeforeParsing);
      }
      return buildSegment(str, availableLength).substr(0, availableLength + ellipsisLengthBeforeParsing);
    }
    var pathAndQuery = "";
    if (urlObj.path) {
      pathAndQuery += "/" + urlObj.path;
    }
    if (urlObj.query) {
      pathAndQuery += "?" + urlObj.query;
    }
    if (pathAndQuery) {
      if ((str + pathAndQuery).length >= availableLength) {
        if ((str + pathAndQuery).length == truncateLen) {
          return (str + pathAndQuery).substr(0, truncateLen);
        }
        var remainingAvailableLength = availableLength - str.length;
        return (str + buildSegment(pathAndQuery, remainingAvailableLength)).substr(0, availableLength + ellipsisLengthBeforeParsing);
      } else {
        str += pathAndQuery;
      }
    }
    if (urlObj.fragment) {
      var fragment = "#" + urlObj.fragment;
      if ((str + fragment).length >= availableLength) {
        if ((str + fragment).length == truncateLen) {
          return (str + fragment).substr(0, truncateLen);
        }
        var remainingAvailableLength2 = availableLength - str.length;
        return (str + buildSegment(fragment, remainingAvailableLength2)).substr(0, availableLength + ellipsisLengthBeforeParsing);
      } else {
        str += fragment;
      }
    }
    if (urlObj.scheme && urlObj.host) {
      var scheme = urlObj.scheme + "://";
      if ((str + scheme).length < availableLength) {
        return (scheme + str).substr(0, truncateLen);
      }
    }
    if (str.length <= truncateLen) {
      return str;
    }
    var end = "";
    if (availableLength > 0) {
      end = str.substr(-1 * Math.floor(availableLength / 2));
    }
    return (str.substr(0, Math.ceil(availableLength / 2)) + ellipsisChars + end).substr(0, availableLength + ellipsisLengthBeforeParsing);
  }

  // node_modules/autolinker/dist/es2015/truncate/truncate-middle.js
  function truncateMiddle(url2, truncateLen, ellipsisChars) {
    if (url2.length <= truncateLen) {
      return url2;
    }
    var ellipsisLengthBeforeParsing;
    var ellipsisLength;
    if (ellipsisChars == null) {
      ellipsisChars = "&hellip;";
      ellipsisLengthBeforeParsing = 8;
      ellipsisLength = 3;
    } else {
      ellipsisLengthBeforeParsing = ellipsisChars.length;
      ellipsisLength = ellipsisChars.length;
    }
    var availableLength = truncateLen - ellipsisLength;
    var end = "";
    if (availableLength > 0) {
      end = url2.substr(-1 * Math.floor(availableLength / 2));
    }
    return (url2.substr(0, Math.ceil(availableLength / 2)) + ellipsisChars + end).substr(0, availableLength + ellipsisLengthBeforeParsing);
  }

  // node_modules/autolinker/dist/es2015/truncate/truncate-end.js
  function truncateEnd(anchorText, truncateLen, ellipsisChars) {
    return ellipsis(anchorText, truncateLen, ellipsisChars);
  }

  // node_modules/autolinker/dist/es2015/anchor-tag-builder.js
  var AnchorTagBuilder = function() {
    function AnchorTagBuilder2(cfg) {
      if (cfg === void 0) {
        cfg = {};
      }
      this.newWindow = false;
      this.truncate = {};
      this.className = "";
      this.newWindow = cfg.newWindow || false;
      this.truncate = cfg.truncate || {};
      this.className = cfg.className || "";
    }
    AnchorTagBuilder2.prototype.build = function(match) {
      return new HtmlTag({
        tagName: "a",
        attrs: this.createAttrs(match),
        innerHtml: this.processAnchorText(match.getAnchorText())
      });
    };
    AnchorTagBuilder2.prototype.createAttrs = function(match) {
      var attrs = {
        "href": match.getAnchorHref()
      };
      var cssClass = this.createCssClass(match);
      if (cssClass) {
        attrs["class"] = cssClass;
      }
      if (this.newWindow) {
        attrs["target"] = "_blank";
        attrs["rel"] = "noopener noreferrer";
      }
      if (this.truncate) {
        if (this.truncate.length && this.truncate.length < match.getAnchorText().length) {
          attrs["title"] = match.getAnchorHref();
        }
      }
      return attrs;
    };
    AnchorTagBuilder2.prototype.createCssClass = function(match) {
      var className = this.className;
      if (!className) {
        return "";
      } else {
        var returnClasses = [className], cssClassSuffixes = match.getCssClassSuffixes();
        for (var i = 0, len = cssClassSuffixes.length; i < len; i++) {
          returnClasses.push(className + "-" + cssClassSuffixes[i]);
        }
        return returnClasses.join(" ");
      }
    };
    AnchorTagBuilder2.prototype.processAnchorText = function(anchorText) {
      anchorText = this.doTruncate(anchorText);
      return anchorText;
    };
    AnchorTagBuilder2.prototype.doTruncate = function(anchorText) {
      var truncate = this.truncate;
      if (!truncate || !truncate.length)
        return anchorText;
      var truncateLength = truncate.length, truncateLocation = truncate.location;
      if (truncateLocation === "smart") {
        return truncateSmart(anchorText, truncateLength);
      } else if (truncateLocation === "middle") {
        return truncateMiddle(anchorText, truncateLength);
      } else {
        return truncateEnd(anchorText, truncateLength);
      }
    };
    return AnchorTagBuilder2;
  }();

  // node_modules/autolinker/dist/es2015/match/match.js
  var Match = function() {
    function Match2(cfg) {
      this.__jsduckDummyDocProp = null;
      this.matchedText = "";
      this.offset = 0;
      this.tagBuilder = cfg.tagBuilder;
      this.matchedText = cfg.matchedText;
      this.offset = cfg.offset;
    }
    Match2.prototype.getMatchedText = function() {
      return this.matchedText;
    };
    Match2.prototype.setOffset = function(offset) {
      this.offset = offset;
    };
    Match2.prototype.getOffset = function() {
      return this.offset;
    };
    Match2.prototype.getCssClassSuffixes = function() {
      return [this.getType()];
    };
    Match2.prototype.buildTag = function() {
      return this.tagBuilder.build(this);
    };
    return Match2;
  }();

  // node_modules/tslib/modules/index.js
  var import_tslib = __toModule(require_tslib());
  var {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __metadata,
    __awaiter,
    __generator,
    __exportStar,
    __createBinding,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet
  } = import_tslib.default;

  // node_modules/autolinker/dist/es2015/match/email-match.js
  var EmailMatch = function(_super) {
    __extends(EmailMatch2, _super);
    function EmailMatch2(cfg) {
      var _this = _super.call(this, cfg) || this;
      _this.email = "";
      _this.email = cfg.email;
      return _this;
    }
    EmailMatch2.prototype.getType = function() {
      return "email";
    };
    EmailMatch2.prototype.getEmail = function() {
      return this.email;
    };
    EmailMatch2.prototype.getAnchorHref = function() {
      return "mailto:" + this.email;
    };
    EmailMatch2.prototype.getAnchorText = function() {
      return this.email;
    };
    return EmailMatch2;
  }(Match);

  // node_modules/autolinker/dist/es2015/match/hashtag-match.js
  var HashtagMatch = function(_super) {
    __extends(HashtagMatch2, _super);
    function HashtagMatch2(cfg) {
      var _this = _super.call(this, cfg) || this;
      _this.serviceName = "";
      _this.hashtag = "";
      _this.serviceName = cfg.serviceName;
      _this.hashtag = cfg.hashtag;
      return _this;
    }
    HashtagMatch2.prototype.getType = function() {
      return "hashtag";
    };
    HashtagMatch2.prototype.getServiceName = function() {
      return this.serviceName;
    };
    HashtagMatch2.prototype.getHashtag = function() {
      return this.hashtag;
    };
    HashtagMatch2.prototype.getAnchorHref = function() {
      var serviceName = this.serviceName, hashtag = this.hashtag;
      switch (serviceName) {
        case "twitter":
          return "https://twitter.com/hashtag/" + hashtag;
        case "facebook":
          return "https://www.facebook.com/hashtag/" + hashtag;
        case "instagram":
          return "https://instagram.com/explore/tags/" + hashtag;
        default:
          throw new Error("Unknown service name to point hashtag to: " + serviceName);
      }
    };
    HashtagMatch2.prototype.getAnchorText = function() {
      return "#" + this.hashtag;
    };
    return HashtagMatch2;
  }(Match);

  // node_modules/autolinker/dist/es2015/match/mention-match.js
  var MentionMatch = function(_super) {
    __extends(MentionMatch2, _super);
    function MentionMatch2(cfg) {
      var _this = _super.call(this, cfg) || this;
      _this.serviceName = "twitter";
      _this.mention = "";
      _this.mention = cfg.mention;
      _this.serviceName = cfg.serviceName;
      return _this;
    }
    MentionMatch2.prototype.getType = function() {
      return "mention";
    };
    MentionMatch2.prototype.getMention = function() {
      return this.mention;
    };
    MentionMatch2.prototype.getServiceName = function() {
      return this.serviceName;
    };
    MentionMatch2.prototype.getAnchorHref = function() {
      switch (this.serviceName) {
        case "twitter":
          return "https://twitter.com/" + this.mention;
        case "instagram":
          return "https://instagram.com/" + this.mention;
        case "soundcloud":
          return "https://soundcloud.com/" + this.mention;
        default:
          throw new Error("Unknown service name to point mention to: " + this.serviceName);
      }
    };
    MentionMatch2.prototype.getAnchorText = function() {
      return "@" + this.mention;
    };
    MentionMatch2.prototype.getCssClassSuffixes = function() {
      var cssClassSuffixes = _super.prototype.getCssClassSuffixes.call(this), serviceName = this.getServiceName();
      if (serviceName) {
        cssClassSuffixes.push(serviceName);
      }
      return cssClassSuffixes;
    };
    return MentionMatch2;
  }(Match);

  // node_modules/autolinker/dist/es2015/match/phone-match.js
  var PhoneMatch = function(_super) {
    __extends(PhoneMatch2, _super);
    function PhoneMatch2(cfg) {
      var _this = _super.call(this, cfg) || this;
      _this.number = "";
      _this.plusSign = false;
      _this.number = cfg.number;
      _this.plusSign = cfg.plusSign;
      return _this;
    }
    PhoneMatch2.prototype.getType = function() {
      return "phone";
    };
    PhoneMatch2.prototype.getPhoneNumber = function() {
      return this.number;
    };
    PhoneMatch2.prototype.getNumber = function() {
      return this.getPhoneNumber();
    };
    PhoneMatch2.prototype.getAnchorHref = function() {
      return "tel:" + (this.plusSign ? "+" : "") + this.number;
    };
    PhoneMatch2.prototype.getAnchorText = function() {
      return this.matchedText;
    };
    return PhoneMatch2;
  }(Match);

  // node_modules/autolinker/dist/es2015/match/url-match.js
  var UrlMatch = function(_super) {
    __extends(UrlMatch2, _super);
    function UrlMatch2(cfg) {
      var _this = _super.call(this, cfg) || this;
      _this.url = "";
      _this.urlMatchType = "scheme";
      _this.protocolUrlMatch = false;
      _this.protocolRelativeMatch = false;
      _this.stripPrefix = { scheme: true, www: true };
      _this.stripTrailingSlash = true;
      _this.decodePercentEncoding = true;
      _this.schemePrefixRegex = /^(https?:\/\/)?/i;
      _this.wwwPrefixRegex = /^(https?:\/\/)?(www\.)?/i;
      _this.protocolRelativeRegex = /^\/\//;
      _this.protocolPrepended = false;
      _this.urlMatchType = cfg.urlMatchType;
      _this.url = cfg.url;
      _this.protocolUrlMatch = cfg.protocolUrlMatch;
      _this.protocolRelativeMatch = cfg.protocolRelativeMatch;
      _this.stripPrefix = cfg.stripPrefix;
      _this.stripTrailingSlash = cfg.stripTrailingSlash;
      _this.decodePercentEncoding = cfg.decodePercentEncoding;
      return _this;
    }
    UrlMatch2.prototype.getType = function() {
      return "url";
    };
    UrlMatch2.prototype.getUrlMatchType = function() {
      return this.urlMatchType;
    };
    UrlMatch2.prototype.getUrl = function() {
      var url2 = this.url;
      if (!this.protocolRelativeMatch && !this.protocolUrlMatch && !this.protocolPrepended) {
        url2 = this.url = "http://" + url2;
        this.protocolPrepended = true;
      }
      return url2;
    };
    UrlMatch2.prototype.getAnchorHref = function() {
      var url2 = this.getUrl();
      return url2.replace(/&amp;/g, "&");
    };
    UrlMatch2.prototype.getAnchorText = function() {
      var anchorText = this.getMatchedText();
      if (this.protocolRelativeMatch) {
        anchorText = this.stripProtocolRelativePrefix(anchorText);
      }
      if (this.stripPrefix.scheme) {
        anchorText = this.stripSchemePrefix(anchorText);
      }
      if (this.stripPrefix.www) {
        anchorText = this.stripWwwPrefix(anchorText);
      }
      if (this.stripTrailingSlash) {
        anchorText = this.removeTrailingSlash(anchorText);
      }
      if (this.decodePercentEncoding) {
        anchorText = this.removePercentEncoding(anchorText);
      }
      return anchorText;
    };
    UrlMatch2.prototype.stripSchemePrefix = function(url2) {
      return url2.replace(this.schemePrefixRegex, "");
    };
    UrlMatch2.prototype.stripWwwPrefix = function(url2) {
      return url2.replace(this.wwwPrefixRegex, "$1");
    };
    UrlMatch2.prototype.stripProtocolRelativePrefix = function(text) {
      return text.replace(this.protocolRelativeRegex, "");
    };
    UrlMatch2.prototype.removeTrailingSlash = function(anchorText) {
      if (anchorText.charAt(anchorText.length - 1) === "/") {
        anchorText = anchorText.slice(0, -1);
      }
      return anchorText;
    };
    UrlMatch2.prototype.removePercentEncoding = function(anchorText) {
      var preProcessedEntityAnchorText = anchorText.replace(/%22/gi, "&quot;").replace(/%26/gi, "&amp;").replace(/%27/gi, "&#39;").replace(/%3C/gi, "&lt;").replace(/%3E/gi, "&gt;");
      try {
        return decodeURIComponent(preProcessedEntityAnchorText);
      } catch (e) {
        return preProcessedEntityAnchorText;
      }
    };
    return UrlMatch2;
  }(Match);

  // node_modules/autolinker/dist/es2015/matcher/matcher.js
  var Matcher = function() {
    function Matcher2(cfg) {
      this.__jsduckDummyDocProp = null;
      this.tagBuilder = cfg.tagBuilder;
    }
    return Matcher2;
  }();

  // node_modules/autolinker/dist/es2015/regex-lib.js
  var letterRe = /[A-Za-z]/;
  var digitRe = /[\d]/;
  var nonDigitRe = /[\D]/;
  var whitespaceRe = /\s/;
  var quoteRe = /['"]/;
  var controlCharsRe = /[\x00-\x1F\x7F]/;
  var alphaCharsStr = /A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC/.source;
  var emojiStr = /\u2700-\u27bf\udde6-\uddff\ud800-\udbff\udc00-\udfff\ufe0e\ufe0f\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0\ud83c\udffb-\udfff\u200d\u3299\u3297\u303d\u3030\u24c2\ud83c\udd70-\udd71\udd7e-\udd7f\udd8e\udd91-\udd9a\udde6-\uddff\ude01-\ude02\ude1a\ude2f\ude32-\ude3a\ude50-\ude51\u203c\u2049\u25aa-\u25ab\u25b6\u25c0\u25fb-\u25fe\u00a9\u00ae\u2122\u2139\udc04\u2600-\u26FF\u2b05\u2b06\u2b07\u2b1b\u2b1c\u2b50\u2b55\u231a\u231b\u2328\u23cf\u23e9-\u23f3\u23f8-\u23fa\udccf\u2935\u2934\u2190-\u21ff/.source;
  var marksStr = /\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F/.source;
  var alphaCharsAndMarksStr = alphaCharsStr + emojiStr + marksStr;
  var decimalNumbersStr = /0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19/.source;
  var alphaNumericCharsStr = alphaCharsAndMarksStr + decimalNumbersStr;
  var alphaNumericAndMarksCharsStr = alphaCharsAndMarksStr + decimalNumbersStr;
  var ipStr = "(?:[" + decimalNumbersStr + "]{1,3}\\.){3}[" + decimalNumbersStr + "]{1,3}";
  var domainLabelStr = "[" + alphaNumericAndMarksCharsStr + "](?:[" + alphaNumericAndMarksCharsStr + "\\-]{0,61}[" + alphaNumericAndMarksCharsStr + "])?";
  var getDomainLabelStr = function(group) {
    return "(?=(" + domainLabelStr + "))\\" + group;
  };
  var getDomainNameStr = function(group) {
    return "(?:" + getDomainLabelStr(group) + "(?:\\." + getDomainLabelStr(group + 1) + "){0,126}|" + ipStr + ")";
  };
  var domainNameRegex = new RegExp("[" + alphaNumericAndMarksCharsStr + ".\\-]*[" + alphaNumericAndMarksCharsStr + "\\-]");
  var domainNameCharRegex = new RegExp("[" + alphaNumericAndMarksCharsStr + "]");

  // node_modules/autolinker/dist/es2015/matcher/tld-regex.js
  var tldRegex = /(?:xn--vermgensberatung-pwb|xn--vermgensberater-ctb|xn--clchc0ea0b2g2a9gcd|xn--w4r85el8fhu5dnra|northwesternmutual|travelersinsurance|vermögensberatung|xn--3oq18vl8pn36a|xn--5su34j936bgsg|xn--bck1b9a5dre4c|xn--mgbai9azgqp6j|xn--mgberp4a5d4ar|xn--xkc2dl3a5ee0h|vermögensberater|xn--fzys8d69uvgm|xn--mgba7c0bbn0a|xn--xkc2al3hye2a|americanexpress|kerryproperties|sandvikcoromant|xn--i1b6b1a6a2e|xn--kcrx77d1x4a|xn--lgbbat1ad8j|xn--mgba3a4f16a|xn--mgbaakc7dvf|xn--mgbc0a9azcg|xn--nqv7fs00ema|afamilycompany|americanfamily|bananarepublic|cancerresearch|cookingchannel|kerrylogistics|weatherchannel|xn--54b7fta0cc|xn--6qq986b3xl|xn--80aqecdr1a|xn--b4w605ferd|xn--fiq228c5hs|xn--h2breg3eve|xn--jlq61u9w7b|xn--mgba3a3ejt|xn--mgbaam7a8h|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a71e|xn--mgbca7dzdo|xn--mgbi4ecexp|xn--mgbx4cd0ab|xn--rvc1e0am3e|international|lifeinsurance|spreadbetting|travelchannel|wolterskluwer|xn--eckvdtc9d|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--h2brj9c8c|xn--tiq49xqyj|xn--yfro4i67o|xn--ygbi2ammx|construction|lplfinancial|scholarships|versicherung|xn--3e0b707e|xn--45br5cyl|xn--80adxhks|xn--80asehdb|xn--8y0a063a|xn--gckr3f0f|xn--mgb9awbf|xn--mgbab2bd|xn--mgbgu82a|xn--mgbpl2fh|xn--mgbt3dhd|xn--mk1bu44c|xn--ngbc5azd|xn--ngbe9e0a|xn--ogbpf8fl|xn--qcka1pmc|accountants|barclaycard|blackfriday|blockbuster|bridgestone|calvinklein|contractors|creditunion|engineering|enterprises|foodnetwork|investments|kerryhotels|lamborghini|motorcycles|olayangroup|photography|playstation|productions|progressive|redumbrella|rightathome|williamhill|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--3bst00m|xn--3ds443g|xn--3hcrj9c|xn--42c2d9a|xn--45brj9c|xn--55qw42g|xn--6frz82g|xn--80ao21a|xn--9krt00a|xn--cck2b3b|xn--czr694b|xn--d1acj3b|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fjq720a|xn--flw351e|xn--g2xx48c|xn--gecrj9c|xn--gk3at1e|xn--h2brj9c|xn--hxt814e|xn--imr513n|xn--j6w193g|xn--jvr189m|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--mgbbh1a|xn--mgbtx2b|xn--mix891f|xn--nyqy26a|xn--otu796d|xn--pbt977c|xn--pgbs0dh|xn--q9jyb4c|xn--rhqv96g|xn--rovu88b|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--vuq861b|xn--w4rs40l|xn--xhq521b|xn--zfr164b|சிங்கப்பூர்|accountant|apartments|associates|basketball|bnpparibas|boehringer|capitalone|consulting|creditcard|cuisinella|eurovision|extraspace|foundation|healthcare|immobilien|industries|management|mitsubishi|nationwide|newholland|nextdirect|onyourside|properties|protection|prudential|realestate|republican|restaurant|schaeffler|swiftcover|tatamotors|technology|telefonica|university|vistaprint|vlaanderen|volkswagen|xn--30rr7y|xn--3pxu8k|xn--45q11c|xn--4gbrim|xn--55qx5d|xn--5tzm5g|xn--80aswg|xn--90a3ac|xn--9dbq2a|xn--9et52u|xn--c2br7g|xn--cg4bki|xn--czrs0t|xn--czru2d|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--io0a7i|xn--kput3i|xn--mxtq1m|xn--o3cw4h|xn--pssy2u|xn--unup4y|xn--wgbh1c|xn--wgbl6a|xn--y9a3aq|accenture|alfaromeo|allfinanz|amsterdam|analytics|aquarelle|barcelona|bloomberg|christmas|community|directory|education|equipment|fairwinds|financial|firestone|fresenius|frontdoor|fujixerox|furniture|goldpoint|hisamitsu|homedepot|homegoods|homesense|honeywell|institute|insurance|kuokgroup|ladbrokes|lancaster|landrover|lifestyle|marketing|marshalls|melbourne|microsoft|panasonic|passagens|pramerica|richardli|scjohnson|shangrila|solutions|statebank|statefarm|stockholm|travelers|vacations|xn--90ais|xn--c1avg|xn--d1alf|xn--e1a4c|xn--fhbei|xn--j1aef|xn--j1amh|xn--l1acc|xn--ngbrx|xn--nqv7f|xn--p1acf|xn--tckwe|xn--vhquv|yodobashi|abudhabi|airforce|allstate|attorney|barclays|barefoot|bargains|baseball|boutique|bradesco|broadway|brussels|budapest|builders|business|capetown|catering|catholic|chrysler|cipriani|cityeats|cleaning|clinique|clothing|commbank|computer|delivery|deloitte|democrat|diamonds|discount|discover|download|engineer|ericsson|esurance|etisalat|everbank|exchange|feedback|fidelity|firmdale|football|frontier|goodyear|grainger|graphics|guardian|hdfcbank|helsinki|holdings|hospital|infiniti|ipiranga|istanbul|jpmorgan|lighting|lundbeck|marriott|maserati|mckinsey|memorial|merckmsd|mortgage|movistar|observer|partners|pharmacy|pictures|plumbing|property|redstone|reliance|saarland|samsclub|security|services|shopping|showtime|softbank|software|stcgroup|supplies|symantec|training|uconnect|vanguard|ventures|verisign|woodside|xn--90ae|xn--node|xn--p1ai|xn--qxam|yokohama|السعودية|abogado|academy|agakhan|alibaba|android|athleta|auction|audible|auspost|avianca|banamex|bauhaus|bentley|bestbuy|booking|brother|bugatti|capital|caravan|careers|cartier|channel|charity|chintai|citadel|clubmed|college|cologne|comcast|company|compare|contact|cooking|corsica|country|coupons|courses|cricket|cruises|dentist|digital|domains|exposed|express|farmers|fashion|ferrari|ferrero|finance|fishing|fitness|flights|florist|flowers|forsale|frogans|fujitsu|gallery|genting|godaddy|grocery|guitars|hamburg|hangout|hitachi|holiday|hosting|hoteles|hotmail|hyundai|iselect|ismaili|jewelry|juniper|kitchen|komatsu|lacaixa|lancome|lanxess|lasalle|latrobe|leclerc|liaison|limited|lincoln|markets|metlife|monster|netbank|netflix|network|neustar|okinawa|oldnavy|organic|origins|philips|pioneer|politie|realtor|recipes|rentals|reviews|rexroth|samsung|sandvik|schmidt|schwarz|science|shiksha|shriram|singles|staples|starhub|storage|support|surgery|systems|temasek|theater|theatre|tickets|tiffany|toshiba|trading|walmart|wanggou|watches|weather|website|wedding|whoswho|windows|winners|xfinity|yamaxun|youtube|zuerich|католик|اتصالات|الجزائر|العليان|پاکستان|كاثوليك|موبايلي|இந்தியா|abarth|abbott|abbvie|active|africa|agency|airbus|airtel|alipay|alsace|alstom|anquan|aramco|author|bayern|beauty|berlin|bharti|blanco|bostik|boston|broker|camera|career|caseih|casino|center|chanel|chrome|church|circle|claims|clinic|coffee|comsec|condos|coupon|credit|cruise|dating|datsun|dealer|degree|dental|design|direct|doctor|dunlop|dupont|durban|emerck|energy|estate|events|expert|family|flickr|futbol|gallup|garden|george|giving|global|google|gratis|health|hermes|hiphop|hockey|hotels|hughes|imamat|insure|intuit|jaguar|joburg|juegos|kaufen|kinder|kindle|kosher|lancia|latino|lawyer|lefrak|living|locker|london|luxury|madrid|maison|makeup|market|mattel|mobile|mobily|monash|mormon|moscow|museum|mutual|nagoya|natura|nissan|nissay|norton|nowruz|office|olayan|online|oracle|orange|otsuka|pfizer|photos|physio|piaget|pictet|quebec|racing|realty|reisen|repair|report|review|rocher|rogers|ryukyu|safety|sakura|sanofi|school|schule|search|secure|select|shouji|soccer|social|stream|studio|supply|suzuki|swatch|sydney|taipei|taobao|target|tattoo|tennis|tienda|tjmaxx|tkmaxx|toyota|travel|unicom|viajes|viking|villas|virgin|vision|voting|voyage|vuelos|walter|warman|webcam|xihuan|yachts|yandex|zappos|москва|онлайн|ابوظبي|ارامكو|الاردن|المغرب|امارات|فلسطين|مليسيا|भारतम्|இலங்கை|ファッション|actor|adult|aetna|amfam|amica|apple|archi|audio|autos|azure|baidu|beats|bible|bingo|black|boats|bosch|build|canon|cards|chase|cheap|cisco|citic|click|cloud|coach|codes|crown|cymru|dabur|dance|deals|delta|dodge|drive|dubai|earth|edeka|email|epost|epson|faith|fedex|final|forex|forum|gallo|games|gifts|gives|glade|glass|globo|gmail|green|gripe|group|gucci|guide|homes|honda|horse|house|hyatt|ikano|intel|irish|iveco|jetzt|koeln|kyoto|lamer|lease|legal|lexus|lilly|linde|lipsy|lixil|loans|locus|lotte|lotto|lupin|macys|mango|media|miami|money|mopar|movie|nadex|nexus|nikon|ninja|nokia|nowtv|omega|osaka|paris|parts|party|phone|photo|pizza|place|poker|praxi|press|prime|promo|quest|radio|rehab|reise|ricoh|rocks|rodeo|rugby|salon|sener|seven|sharp|shell|shoes|skype|sling|smart|smile|solar|space|sport|stada|store|study|style|sucks|swiss|tatar|tires|tirol|tmall|today|tokyo|tools|toray|total|tours|trade|trust|tunes|tushu|ubank|vegas|video|vodka|volvo|wales|watch|weber|weibo|works|world|xerox|yahoo|zippo|ایران|بازار|بھارت|سودان|سورية|همراه|भारोत|संगठन|বাংলা|భారత్|ഭാരതം|嘉里大酒店|aarp|able|adac|aero|aigo|akdn|ally|amex|arab|army|arpa|arte|asda|asia|audi|auto|baby|band|bank|bbva|beer|best|bike|bing|blog|blue|bofa|bond|book|buzz|cafe|call|camp|care|cars|casa|case|cash|cbre|cern|chat|citi|city|club|cool|coop|cyou|data|date|dclk|deal|dell|desi|diet|dish|docs|doha|duck|duns|dvag|erni|fage|fail|fans|farm|fast|fiat|fido|film|fire|fish|flir|food|ford|free|fund|game|gbiz|gent|ggee|gift|gmbh|gold|golf|goog|guge|guru|hair|haus|hdfc|help|here|hgtv|host|hsbc|icbc|ieee|imdb|immo|info|itau|java|jeep|jobs|jprs|kddi|kiwi|kpmg|kred|land|lego|lgbt|lidl|life|like|limo|link|live|loan|loft|love|ltda|luxe|maif|meet|meme|menu|mini|mint|mobi|moda|moto|name|navy|news|next|nico|nike|ollo|open|page|pars|pccw|pics|ping|pink|play|plus|pohl|porn|post|prod|prof|qpon|raid|read|reit|rent|rest|rich|rmit|room|rsvp|ruhr|safe|sale|sarl|save|saxo|scor|scot|seat|seek|sexy|shaw|shia|shop|show|silk|sina|site|skin|sncf|sohu|song|sony|spot|star|surf|talk|taxi|team|tech|teva|tiaa|tips|town|toys|tube|vana|visa|viva|vivo|vote|voto|wang|weir|wien|wiki|wine|work|xbox|yoga|zara|zero|zone|дети|сайт|بارت|بيتك|ڀارت|تونس|شبكة|عراق|عمان|موقع|भारत|ভারত|ভাৰত|ਭਾਰਤ|ભારત|ଭାରତ|ಭಾರತ|ලංකා|グーグル|クラウド|ポイント|大众汽车|组织机构|電訊盈科|香格里拉|aaa|abb|abc|aco|ads|aeg|afl|aig|anz|aol|app|art|aws|axa|bar|bbc|bbt|bcg|bcn|bet|bid|bio|biz|bms|bmw|bnl|bom|boo|bot|box|buy|bzh|cab|cal|cam|car|cat|cba|cbn|cbs|ceb|ceo|cfa|cfd|com|crs|csc|dad|day|dds|dev|dhl|diy|dnp|dog|dot|dtv|dvr|eat|eco|edu|esq|eus|fan|fit|fly|foo|fox|frl|ftr|fun|fyi|gal|gap|gdn|gea|gle|gmo|gmx|goo|gop|got|gov|hbo|hiv|hkt|hot|how|ibm|ice|icu|ifm|inc|ing|ink|int|ist|itv|jcb|jcp|jio|jll|jmp|jnj|jot|joy|kfh|kia|kim|kpn|krd|lat|law|lds|llc|lol|lpl|ltd|man|map|mba|med|men|mil|mit|mlb|mls|mma|moe|moi|mom|mov|msd|mtn|mtr|nab|nba|nec|net|new|nfl|ngo|nhk|now|nra|nrw|ntt|nyc|obi|off|one|ong|onl|ooo|org|ott|ovh|pay|pet|phd|pid|pin|pnc|pro|pru|pub|pwc|qvc|red|ren|ril|rio|rip|run|rwe|sap|sas|sbi|sbs|sca|scb|ses|sew|sex|sfr|ski|sky|soy|srl|srt|stc|tab|tax|tci|tdk|tel|thd|tjx|top|trv|tui|tvs|ubs|uno|uol|ups|vet|vig|vin|vip|wed|win|wme|wow|wtc|wtf|xin|xxx|xyz|you|yun|zip|бел|ком|қаз|мкд|мон|орг|рус|срб|укр|հայ|קום|عرب|قطر|كوم|مصر|कॉम|नेट|คอม|ไทย|ストア|セール|みんな|中文网|天主教|我爱你|新加坡|淡马锡|诺基亚|飞利浦|ac|ad|ae|af|ag|ai|al|am|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw|ελ|бг|ею|рф|გე|닷넷|닷컴|삼성|한국|コム|世界|中信|中国|中國|企业|佛山|信息|健康|八卦|公司|公益|台湾|台灣|商城|商店|商标|嘉里|在线|大拿|娱乐|家電|工行|广东|微博|慈善|手机|手表|招聘|政务|政府|新闻|时尚|書籍|机构|游戏|澳門|点看|珠宝|移动|网址|网店|网站|网络|联通|谷歌|购物|通販|集团|食品|餐厅|香港)/;

  // node_modules/autolinker/dist/es2015/matcher/email-matcher.js
  var localPartCharRegex = new RegExp("[" + alphaNumericAndMarksCharsStr + "!#$%&'*+/=?^_`{|}~-]");
  var strictTldRegex = new RegExp("^" + tldRegex.source + "$");
  var EmailMatcher = function(_super) {
    __extends(EmailMatcher2, _super);
    function EmailMatcher2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.localPartCharRegex = localPartCharRegex;
      _this.strictTldRegex = strictTldRegex;
      return _this;
    }
    EmailMatcher2.prototype.parseMatches = function(text) {
      var tagBuilder = this.tagBuilder, localPartCharRegex2 = this.localPartCharRegex, strictTldRegex2 = this.strictTldRegex, matches = [], len = text.length, noCurrentEmailMatch = new CurrentEmailMatch();
      var mailtoTransitions = {
        "m": "a",
        "a": "i",
        "i": "l",
        "l": "t",
        "t": "o",
        "o": ":"
      };
      var charIdx = 0, state = 0, currentEmailMatch = noCurrentEmailMatch;
      while (charIdx < len) {
        var char = text.charAt(charIdx);
        switch (state) {
          case 0:
            stateNonEmailAddress(char);
            break;
          case 1:
            stateMailTo(text.charAt(charIdx - 1), char);
            break;
          case 2:
            stateLocalPart(char);
            break;
          case 3:
            stateLocalPartDot(char);
            break;
          case 4:
            stateAtSign(char);
            break;
          case 5:
            stateDomainChar(char);
            break;
          case 6:
            stateDomainHyphen(char);
            break;
          case 7:
            stateDomainDot(char);
            break;
          default:
            throwUnhandledCaseError(state);
        }
        charIdx++;
      }
      captureMatchIfValidAndReset();
      return matches;
      function stateNonEmailAddress(char2) {
        if (char2 === "m") {
          beginEmailMatch(1);
        } else if (localPartCharRegex2.test(char2)) {
          beginEmailMatch();
        } else {
        }
      }
      function stateMailTo(prevChar, char2) {
        if (prevChar === ":") {
          if (localPartCharRegex2.test(char2)) {
            state = 2;
            currentEmailMatch = new CurrentEmailMatch(__assign(__assign({}, currentEmailMatch), { hasMailtoPrefix: true }));
          } else {
            resetToNonEmailMatchState();
          }
        } else if (mailtoTransitions[prevChar] === char2) {
        } else if (localPartCharRegex2.test(char2)) {
          state = 2;
        } else if (char2 === ".") {
          state = 3;
        } else if (char2 === "@") {
          state = 4;
        } else {
          resetToNonEmailMatchState();
        }
      }
      function stateLocalPart(char2) {
        if (char2 === ".") {
          state = 3;
        } else if (char2 === "@") {
          state = 4;
        } else if (localPartCharRegex2.test(char2)) {
        } else {
          resetToNonEmailMatchState();
        }
      }
      function stateLocalPartDot(char2) {
        if (char2 === ".") {
          resetToNonEmailMatchState();
        } else if (char2 === "@") {
          resetToNonEmailMatchState();
        } else if (localPartCharRegex2.test(char2)) {
          state = 2;
        } else {
          resetToNonEmailMatchState();
        }
      }
      function stateAtSign(char2) {
        if (domainNameCharRegex.test(char2)) {
          state = 5;
        } else {
          resetToNonEmailMatchState();
        }
      }
      function stateDomainChar(char2) {
        if (char2 === ".") {
          state = 7;
        } else if (char2 === "-") {
          state = 6;
        } else if (domainNameCharRegex.test(char2)) {
        } else {
          captureMatchIfValidAndReset();
        }
      }
      function stateDomainHyphen(char2) {
        if (char2 === "-" || char2 === ".") {
          captureMatchIfValidAndReset();
        } else if (domainNameCharRegex.test(char2)) {
          state = 5;
        } else {
          captureMatchIfValidAndReset();
        }
      }
      function stateDomainDot(char2) {
        if (char2 === "." || char2 === "-") {
          captureMatchIfValidAndReset();
        } else if (domainNameCharRegex.test(char2)) {
          state = 5;
          currentEmailMatch = new CurrentEmailMatch(__assign(__assign({}, currentEmailMatch), { hasDomainDot: true }));
        } else {
          captureMatchIfValidAndReset();
        }
      }
      function beginEmailMatch(newState) {
        if (newState === void 0) {
          newState = 2;
        }
        state = newState;
        currentEmailMatch = new CurrentEmailMatch({ idx: charIdx });
      }
      function resetToNonEmailMatchState() {
        state = 0;
        currentEmailMatch = noCurrentEmailMatch;
      }
      function captureMatchIfValidAndReset() {
        if (currentEmailMatch.hasDomainDot) {
          var matchedText = text.slice(currentEmailMatch.idx, charIdx);
          if (/[-.]$/.test(matchedText)) {
            matchedText = matchedText.slice(0, -1);
          }
          var emailAddress = currentEmailMatch.hasMailtoPrefix ? matchedText.slice("mailto:".length) : matchedText;
          if (doesEmailHaveValidTld(emailAddress)) {
            matches.push(new EmailMatch({
              tagBuilder,
              matchedText,
              offset: currentEmailMatch.idx,
              email: emailAddress
            }));
          }
        }
        resetToNonEmailMatchState();
        function doesEmailHaveValidTld(emailAddress2) {
          var emailAddressTld = emailAddress2.split(".").pop() || "";
          var emailAddressNormalized = emailAddressTld.toLowerCase();
          var isValidTld = strictTldRegex2.test(emailAddressNormalized);
          return isValidTld;
        }
      }
    };
    return EmailMatcher2;
  }(Matcher);
  var CurrentEmailMatch = function() {
    function CurrentEmailMatch2(cfg) {
      if (cfg === void 0) {
        cfg = {};
      }
      this.idx = cfg.idx !== void 0 ? cfg.idx : -1;
      this.hasMailtoPrefix = !!cfg.hasMailtoPrefix;
      this.hasDomainDot = !!cfg.hasDomainDot;
    }
    return CurrentEmailMatch2;
  }();

  // node_modules/autolinker/dist/es2015/matcher/url-match-validator.js
  var UrlMatchValidator = function() {
    function UrlMatchValidator2() {
    }
    UrlMatchValidator2.isValid = function(urlMatch, protocolUrlMatch) {
      if (protocolUrlMatch && !this.isValidUriScheme(protocolUrlMatch) || this.urlMatchDoesNotHaveProtocolOrDot(urlMatch, protocolUrlMatch) || this.urlMatchDoesNotHaveAtLeastOneWordChar(urlMatch, protocolUrlMatch) && !this.isValidIpAddress(urlMatch) || this.containsMultipleDots(urlMatch)) {
        return false;
      }
      return true;
    };
    UrlMatchValidator2.isValidIpAddress = function(uriSchemeMatch) {
      var newRegex = new RegExp(this.hasFullProtocolRegex.source + this.ipRegex.source);
      var uriScheme = uriSchemeMatch.match(newRegex);
      return uriScheme !== null;
    };
    UrlMatchValidator2.containsMultipleDots = function(urlMatch) {
      var stringBeforeSlash = urlMatch;
      if (this.hasFullProtocolRegex.test(urlMatch)) {
        stringBeforeSlash = urlMatch.split("://")[1];
      }
      return stringBeforeSlash.split("/")[0].indexOf("..") > -1;
    };
    UrlMatchValidator2.isValidUriScheme = function(uriSchemeMatch) {
      var uriSchemeMatchArr = uriSchemeMatch.match(this.uriSchemeRegex), uriScheme = uriSchemeMatchArr && uriSchemeMatchArr[0].toLowerCase();
      return uriScheme !== "javascript:" && uriScheme !== "vbscript:";
    };
    UrlMatchValidator2.urlMatchDoesNotHaveProtocolOrDot = function(urlMatch, protocolUrlMatch) {
      return !!urlMatch && (!protocolUrlMatch || !this.hasFullProtocolRegex.test(protocolUrlMatch)) && urlMatch.indexOf(".") === -1;
    };
    UrlMatchValidator2.urlMatchDoesNotHaveAtLeastOneWordChar = function(urlMatch, protocolUrlMatch) {
      if (urlMatch && protocolUrlMatch) {
        return !this.hasFullProtocolRegex.test(protocolUrlMatch) && !this.hasWordCharAfterProtocolRegex.test(urlMatch);
      } else {
        return false;
      }
    };
    UrlMatchValidator2.hasFullProtocolRegex = /^[A-Za-z][-.+A-Za-z0-9]*:\/\//;
    UrlMatchValidator2.uriSchemeRegex = /^[A-Za-z][-.+A-Za-z0-9]*:/;
    UrlMatchValidator2.hasWordCharAfterProtocolRegex = new RegExp(":[^\\s]*?[" + alphaCharsStr + "]");
    UrlMatchValidator2.ipRegex = /[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?(:[0-9]*)?\/?$/;
    return UrlMatchValidator2;
  }();

  // node_modules/autolinker/dist/es2015/matcher/url-matcher.js
  var matcherRegex = function() {
    var schemeRegex = /(?:[A-Za-z][-.+A-Za-z0-9]{0,63}:(?![A-Za-z][-.+A-Za-z0-9]{0,63}:\/\/)(?!\d+\/?)(?:\/\/)?)/, wwwRegex = /(?:www\.)/, urlSuffixRegex = new RegExp("[/?#](?:[" + alphaNumericAndMarksCharsStr + "\\-+&@#/%=~_()|'$*\\[\\]{}?!:,.;^\u2713]*[" + alphaNumericAndMarksCharsStr + "\\-+&@#/%=~_()|'$*\\[\\]{}\u2713])?");
    return new RegExp([
      "(?:",
      "(",
      schemeRegex.source,
      getDomainNameStr(2),
      ")",
      "|",
      "(",
      "(//)?",
      wwwRegex.source,
      getDomainNameStr(6),
      ")",
      "|",
      "(",
      "(//)?",
      getDomainNameStr(10) + "\\.",
      tldRegex.source,
      "(?![-" + alphaNumericCharsStr + "])",
      ")",
      ")",
      "(?::[0-9]+)?",
      "(?:" + urlSuffixRegex.source + ")?"
    ].join(""), "gi");
  }();
  var wordCharRegExp = new RegExp("[" + alphaNumericAndMarksCharsStr + "]");
  var UrlMatcher = function(_super) {
    __extends(UrlMatcher2, _super);
    function UrlMatcher2(cfg) {
      var _this = _super.call(this, cfg) || this;
      _this.stripPrefix = { scheme: true, www: true };
      _this.stripTrailingSlash = true;
      _this.decodePercentEncoding = true;
      _this.matcherRegex = matcherRegex;
      _this.wordCharRegExp = wordCharRegExp;
      _this.stripPrefix = cfg.stripPrefix;
      _this.stripTrailingSlash = cfg.stripTrailingSlash;
      _this.decodePercentEncoding = cfg.decodePercentEncoding;
      return _this;
    }
    UrlMatcher2.prototype.parseMatches = function(text) {
      var matcherRegex3 = this.matcherRegex, stripPrefix = this.stripPrefix, stripTrailingSlash = this.stripTrailingSlash, decodePercentEncoding = this.decodePercentEncoding, tagBuilder = this.tagBuilder, matches = [], match;
      var _loop_1 = function() {
        var matchStr = match[0], schemeUrlMatch = match[1], wwwUrlMatch = match[4], wwwProtocolRelativeMatch = match[5], tldProtocolRelativeMatch = match[9], offset = match.index, protocolRelativeMatch = wwwProtocolRelativeMatch || tldProtocolRelativeMatch, prevChar = text.charAt(offset - 1);
        if (!UrlMatchValidator.isValid(matchStr, schemeUrlMatch)) {
          return "continue";
        }
        if (offset > 0 && prevChar === "@") {
          return "continue";
        }
        if (offset > 0 && protocolRelativeMatch && this_1.wordCharRegExp.test(prevChar)) {
          return "continue";
        }
        if (/\?$/.test(matchStr)) {
          matchStr = matchStr.substr(0, matchStr.length - 1);
        }
        if (this_1.matchHasUnbalancedClosingParen(matchStr)) {
          matchStr = matchStr.substr(0, matchStr.length - 1);
        } else {
          var pos = this_1.matchHasInvalidCharAfterTld(matchStr, schemeUrlMatch);
          if (pos > -1) {
            matchStr = matchStr.substr(0, pos);
          }
        }
        var foundCommonScheme = ["http://", "https://"].find(function(commonScheme) {
          return !!schemeUrlMatch && schemeUrlMatch.indexOf(commonScheme) !== -1;
        });
        if (foundCommonScheme) {
          var indexOfSchemeStart = matchStr.indexOf(foundCommonScheme);
          matchStr = matchStr.substr(indexOfSchemeStart);
          schemeUrlMatch = schemeUrlMatch.substr(indexOfSchemeStart);
          offset = offset + indexOfSchemeStart;
        }
        var urlMatchType = schemeUrlMatch ? "scheme" : wwwUrlMatch ? "www" : "tld", protocolUrlMatch = !!schemeUrlMatch;
        matches.push(new UrlMatch({
          tagBuilder,
          matchedText: matchStr,
          offset,
          urlMatchType,
          url: matchStr,
          protocolUrlMatch,
          protocolRelativeMatch: !!protocolRelativeMatch,
          stripPrefix,
          stripTrailingSlash,
          decodePercentEncoding
        }));
      };
      var this_1 = this;
      while ((match = matcherRegex3.exec(text)) !== null) {
        _loop_1();
      }
      return matches;
    };
    UrlMatcher2.prototype.matchHasUnbalancedClosingParen = function(matchStr) {
      var endChar = matchStr.charAt(matchStr.length - 1);
      var startChar;
      if (endChar === ")") {
        startChar = "(";
      } else if (endChar === "]") {
        startChar = "[";
      } else if (endChar === "}") {
        startChar = "{";
      } else {
        return false;
      }
      var numOpenBraces = 0;
      for (var i = 0, len = matchStr.length - 1; i < len; i++) {
        var char = matchStr.charAt(i);
        if (char === startChar) {
          numOpenBraces++;
        } else if (char === endChar) {
          numOpenBraces = Math.max(numOpenBraces - 1, 0);
        }
      }
      if (numOpenBraces === 0) {
        return true;
      }
      return false;
    };
    UrlMatcher2.prototype.matchHasInvalidCharAfterTld = function(urlMatch, schemeUrlMatch) {
      if (!urlMatch) {
        return -1;
      }
      var offset = 0;
      if (schemeUrlMatch) {
        offset = urlMatch.indexOf(":");
        urlMatch = urlMatch.slice(offset);
      }
      var re = new RegExp("^((.?//)?[-." + alphaNumericAndMarksCharsStr + "]*[-" + alphaNumericAndMarksCharsStr + "]\\.[-" + alphaNumericAndMarksCharsStr + "]+)");
      var res = re.exec(urlMatch);
      if (res === null) {
        return -1;
      }
      offset += res[1].length;
      urlMatch = urlMatch.slice(res[1].length);
      if (/^[^-.A-Za-z0-9:\/?#]/.test(urlMatch)) {
        return offset;
      }
      return -1;
    };
    return UrlMatcher2;
  }(Matcher);

  // node_modules/autolinker/dist/es2015/matcher/hashtag-matcher.js
  var matcherRegex2 = new RegExp("#[_" + alphaNumericAndMarksCharsStr + "]{1,139}(?![_" + alphaNumericAndMarksCharsStr + "])", "g");
  var nonWordCharRegex = new RegExp("[^" + alphaNumericAndMarksCharsStr + "]");
  var HashtagMatcher = function(_super) {
    __extends(HashtagMatcher2, _super);
    function HashtagMatcher2(cfg) {
      var _this = _super.call(this, cfg) || this;
      _this.serviceName = "twitter";
      _this.matcherRegex = matcherRegex2;
      _this.nonWordCharRegex = nonWordCharRegex;
      _this.serviceName = cfg.serviceName;
      return _this;
    }
    HashtagMatcher2.prototype.parseMatches = function(text) {
      var matcherRegex3 = this.matcherRegex, nonWordCharRegex3 = this.nonWordCharRegex, serviceName = this.serviceName, tagBuilder = this.tagBuilder, matches = [], match;
      while ((match = matcherRegex3.exec(text)) !== null) {
        var offset = match.index, prevChar = text.charAt(offset - 1);
        if (offset === 0 || nonWordCharRegex3.test(prevChar)) {
          var matchedText = match[0], hashtag = match[0].slice(1);
          matches.push(new HashtagMatch({
            tagBuilder,
            matchedText,
            offset,
            serviceName,
            hashtag
          }));
        }
      }
      return matches;
    };
    return HashtagMatcher2;
  }(Matcher);

  // node_modules/autolinker/dist/es2015/matcher/phone-matcher.js
  var mostPhoneNumbers = /(?:(?:(?:(\+)?\d{1,3}[-\040.]?)?\(?\d{3}\)?[-\040.]?\d{3}[-\040.]?\d{4})|(?:(\+)(?:9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)[-\040.]?(?:\d[-\040.]?){6,12}\d+))([,;]+[0-9]+#?)*/;
  var japanesePhoneRe = /(0([1-9]{1}-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d{1}-?\d{2}|[1-9]{2}\d{2}-?\d{1})-?\d{4}|0[789]0-?\d{4}-?\d{4}|050-?\d{4}-?\d{4})/;
  var phoneMatcherRegex = new RegExp(mostPhoneNumbers.source + "|" + japanesePhoneRe.source, "g");
  var PhoneMatcher = function(_super) {
    __extends(PhoneMatcher2, _super);
    function PhoneMatcher2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.matcherRegex = phoneMatcherRegex;
      return _this;
    }
    PhoneMatcher2.prototype.parseMatches = function(text) {
      var matcherRegex3 = this.matcherRegex, tagBuilder = this.tagBuilder, matches = [], match;
      while ((match = matcherRegex3.exec(text)) !== null) {
        var matchedText = match[0], cleanNumber = matchedText.replace(/[^0-9,;#]/g, ""), plusSign = !!(match[1] || match[2]), before = match.index == 0 ? "" : text.substr(match.index - 1, 1), after = text.substr(match.index + matchedText.length, 1), contextClear = !before.match(/\d/) && !after.match(/\d/);
        if (this.testMatch(match[3]) && this.testMatch(matchedText) && contextClear) {
          matches.push(new PhoneMatch({
            tagBuilder,
            matchedText,
            offset: match.index,
            number: cleanNumber,
            plusSign
          }));
        }
      }
      return matches;
    };
    PhoneMatcher2.prototype.testMatch = function(text) {
      return nonDigitRe.test(text);
    };
    return PhoneMatcher2;
  }(Matcher);

  // node_modules/autolinker/dist/es2015/matcher/mention-matcher.js
  var twitterRegex = new RegExp("@[_" + alphaNumericAndMarksCharsStr + "]{1,50}(?![_" + alphaNumericAndMarksCharsStr + "])", "g");
  var instagramRegex = new RegExp("@[_." + alphaNumericAndMarksCharsStr + "]{1,30}(?![_" + alphaNumericAndMarksCharsStr + "])", "g");
  var soundcloudRegex = new RegExp("@[-_." + alphaNumericAndMarksCharsStr + "]{1,50}(?![-_" + alphaNumericAndMarksCharsStr + "])", "g");
  var nonWordCharRegex2 = new RegExp("[^" + alphaNumericAndMarksCharsStr + "]");
  var MentionMatcher = function(_super) {
    __extends(MentionMatcher2, _super);
    function MentionMatcher2(cfg) {
      var _this = _super.call(this, cfg) || this;
      _this.serviceName = "twitter";
      _this.matcherRegexes = {
        "twitter": twitterRegex,
        "instagram": instagramRegex,
        "soundcloud": soundcloudRegex
      };
      _this.nonWordCharRegex = nonWordCharRegex2;
      _this.serviceName = cfg.serviceName;
      return _this;
    }
    MentionMatcher2.prototype.parseMatches = function(text) {
      var serviceName = this.serviceName, matcherRegex3 = this.matcherRegexes[this.serviceName], nonWordCharRegex3 = this.nonWordCharRegex, tagBuilder = this.tagBuilder, matches = [], match;
      if (!matcherRegex3) {
        return matches;
      }
      while ((match = matcherRegex3.exec(text)) !== null) {
        var offset = match.index, prevChar = text.charAt(offset - 1);
        if (offset === 0 || nonWordCharRegex3.test(prevChar)) {
          var matchedText = match[0].replace(/\.+$/g, ""), mention = matchedText.slice(1);
          matches.push(new MentionMatch({
            tagBuilder,
            matchedText,
            offset,
            serviceName,
            mention
          }));
        }
      }
      return matches;
    };
    return MentionMatcher2;
  }(Matcher);

  // node_modules/autolinker/dist/es2015/htmlParser/parse-html.js
  function parseHtml(html, _a) {
    var onOpenTag = _a.onOpenTag, onCloseTag = _a.onCloseTag, onText = _a.onText, onComment = _a.onComment, onDoctype = _a.onDoctype;
    var noCurrentTag = new CurrentTag();
    var charIdx = 0, len = html.length, state = 0, currentDataIdx = 0, currentTag = noCurrentTag;
    while (charIdx < len) {
      var char = html.charAt(charIdx);
      switch (state) {
        case 0:
          stateData(char);
          break;
        case 1:
          stateTagOpen(char);
          break;
        case 2:
          stateEndTagOpen(char);
          break;
        case 3:
          stateTagName(char);
          break;
        case 4:
          stateBeforeAttributeName(char);
          break;
        case 5:
          stateAttributeName(char);
          break;
        case 6:
          stateAfterAttributeName(char);
          break;
        case 7:
          stateBeforeAttributeValue(char);
          break;
        case 8:
          stateAttributeValueDoubleQuoted(char);
          break;
        case 9:
          stateAttributeValueSingleQuoted(char);
          break;
        case 10:
          stateAttributeValueUnquoted(char);
          break;
        case 11:
          stateAfterAttributeValueQuoted(char);
          break;
        case 12:
          stateSelfClosingStartTag(char);
          break;
        case 13:
          stateMarkupDeclarationOpen(char);
          break;
        case 14:
          stateCommentStart(char);
          break;
        case 15:
          stateCommentStartDash(char);
          break;
        case 16:
          stateComment(char);
          break;
        case 17:
          stateCommentEndDash(char);
          break;
        case 18:
          stateCommentEnd(char);
          break;
        case 19:
          stateCommentEndBang(char);
          break;
        case 20:
          stateDoctype(char);
          break;
        default:
          throwUnhandledCaseError(state);
      }
      charIdx++;
    }
    if (currentDataIdx < charIdx) {
      emitText();
    }
    function stateData(char2) {
      if (char2 === "<") {
        startNewTag();
      }
    }
    function stateTagOpen(char2) {
      if (char2 === "!") {
        state = 13;
      } else if (char2 === "/") {
        state = 2;
        currentTag = new CurrentTag(__assign(__assign({}, currentTag), { isClosing: true }));
      } else if (char2 === "<") {
        startNewTag();
      } else if (letterRe.test(char2)) {
        state = 3;
        currentTag = new CurrentTag(__assign(__assign({}, currentTag), { isOpening: true }));
      } else {
        state = 0;
        currentTag = noCurrentTag;
      }
    }
    function stateTagName(char2) {
      if (whitespaceRe.test(char2)) {
        currentTag = new CurrentTag(__assign(__assign({}, currentTag), { name: captureTagName() }));
        state = 4;
      } else if (char2 === "<") {
        startNewTag();
      } else if (char2 === "/") {
        currentTag = new CurrentTag(__assign(__assign({}, currentTag), { name: captureTagName() }));
        state = 12;
      } else if (char2 === ">") {
        currentTag = new CurrentTag(__assign(__assign({}, currentTag), { name: captureTagName() }));
        emitTagAndPreviousTextNode();
      } else if (!letterRe.test(char2) && !digitRe.test(char2) && char2 !== ":") {
        resetToDataState();
      } else {
      }
    }
    function stateEndTagOpen(char2) {
      if (char2 === ">") {
        resetToDataState();
      } else if (letterRe.test(char2)) {
        state = 3;
      } else {
        resetToDataState();
      }
    }
    function stateBeforeAttributeName(char2) {
      if (whitespaceRe.test(char2)) {
      } else if (char2 === "/") {
        state = 12;
      } else if (char2 === ">") {
        emitTagAndPreviousTextNode();
      } else if (char2 === "<") {
        startNewTag();
      } else if (char2 === "=" || quoteRe.test(char2) || controlCharsRe.test(char2)) {
        resetToDataState();
      } else {
        state = 5;
      }
    }
    function stateAttributeName(char2) {
      if (whitespaceRe.test(char2)) {
        state = 6;
      } else if (char2 === "/") {
        state = 12;
      } else if (char2 === "=") {
        state = 7;
      } else if (char2 === ">") {
        emitTagAndPreviousTextNode();
      } else if (char2 === "<") {
        startNewTag();
      } else if (quoteRe.test(char2)) {
        resetToDataState();
      } else {
      }
    }
    function stateAfterAttributeName(char2) {
      if (whitespaceRe.test(char2)) {
      } else if (char2 === "/") {
        state = 12;
      } else if (char2 === "=") {
        state = 7;
      } else if (char2 === ">") {
        emitTagAndPreviousTextNode();
      } else if (char2 === "<") {
        startNewTag();
      } else if (quoteRe.test(char2)) {
        resetToDataState();
      } else {
        state = 5;
      }
    }
    function stateBeforeAttributeValue(char2) {
      if (whitespaceRe.test(char2)) {
      } else if (char2 === '"') {
        state = 8;
      } else if (char2 === "'") {
        state = 9;
      } else if (/[>=`]/.test(char2)) {
        resetToDataState();
      } else if (char2 === "<") {
        startNewTag();
      } else {
        state = 10;
      }
    }
    function stateAttributeValueDoubleQuoted(char2) {
      if (char2 === '"') {
        state = 11;
      } else {
      }
    }
    function stateAttributeValueSingleQuoted(char2) {
      if (char2 === "'") {
        state = 11;
      } else {
      }
    }
    function stateAttributeValueUnquoted(char2) {
      if (whitespaceRe.test(char2)) {
        state = 4;
      } else if (char2 === ">") {
        emitTagAndPreviousTextNode();
      } else if (char2 === "<") {
        startNewTag();
      } else {
      }
    }
    function stateAfterAttributeValueQuoted(char2) {
      if (whitespaceRe.test(char2)) {
        state = 4;
      } else if (char2 === "/") {
        state = 12;
      } else if (char2 === ">") {
        emitTagAndPreviousTextNode();
      } else if (char2 === "<") {
        startNewTag();
      } else {
        state = 4;
        reconsumeCurrentCharacter();
      }
    }
    function stateSelfClosingStartTag(char2) {
      if (char2 === ">") {
        currentTag = new CurrentTag(__assign(__assign({}, currentTag), { isClosing: true }));
        emitTagAndPreviousTextNode();
      } else {
        state = 4;
      }
    }
    function stateMarkupDeclarationOpen(char2) {
      if (html.substr(charIdx, 2) === "--") {
        charIdx += 2;
        currentTag = new CurrentTag(__assign(__assign({}, currentTag), { type: "comment" }));
        state = 14;
      } else if (html.substr(charIdx, 7).toUpperCase() === "DOCTYPE") {
        charIdx += 7;
        currentTag = new CurrentTag(__assign(__assign({}, currentTag), { type: "doctype" }));
        state = 20;
      } else {
        resetToDataState();
      }
    }
    function stateCommentStart(char2) {
      if (char2 === "-") {
        state = 15;
      } else if (char2 === ">") {
        resetToDataState();
      } else {
        state = 16;
      }
    }
    function stateCommentStartDash(char2) {
      if (char2 === "-") {
        state = 18;
      } else if (char2 === ">") {
        resetToDataState();
      } else {
        state = 16;
      }
    }
    function stateComment(char2) {
      if (char2 === "-") {
        state = 17;
      } else {
      }
    }
    function stateCommentEndDash(char2) {
      if (char2 === "-") {
        state = 18;
      } else {
        state = 16;
      }
    }
    function stateCommentEnd(char2) {
      if (char2 === ">") {
        emitTagAndPreviousTextNode();
      } else if (char2 === "!") {
        state = 19;
      } else if (char2 === "-") {
      } else {
        state = 16;
      }
    }
    function stateCommentEndBang(char2) {
      if (char2 === "-") {
        state = 17;
      } else if (char2 === ">") {
        emitTagAndPreviousTextNode();
      } else {
        state = 16;
      }
    }
    function stateDoctype(char2) {
      if (char2 === ">") {
        emitTagAndPreviousTextNode();
      } else if (char2 === "<") {
        startNewTag();
      } else {
      }
    }
    function resetToDataState() {
      state = 0;
      currentTag = noCurrentTag;
    }
    function startNewTag() {
      state = 1;
      currentTag = new CurrentTag({ idx: charIdx });
    }
    function emitTagAndPreviousTextNode() {
      var textBeforeTag = html.slice(currentDataIdx, currentTag.idx);
      if (textBeforeTag) {
        onText(textBeforeTag, currentDataIdx);
      }
      if (currentTag.type === "comment") {
        onComment(currentTag.idx);
      } else if (currentTag.type === "doctype") {
        onDoctype(currentTag.idx);
      } else {
        if (currentTag.isOpening) {
          onOpenTag(currentTag.name, currentTag.idx);
        }
        if (currentTag.isClosing) {
          onCloseTag(currentTag.name, currentTag.idx);
        }
      }
      resetToDataState();
      currentDataIdx = charIdx + 1;
    }
    function emitText() {
      var text = html.slice(currentDataIdx, charIdx);
      onText(text, currentDataIdx);
      currentDataIdx = charIdx + 1;
    }
    function captureTagName() {
      var startIdx = currentTag.idx + (currentTag.isClosing ? 2 : 1);
      return html.slice(startIdx, charIdx).toLowerCase();
    }
    function reconsumeCurrentCharacter() {
      charIdx--;
    }
  }
  var CurrentTag = function() {
    function CurrentTag2(cfg) {
      if (cfg === void 0) {
        cfg = {};
      }
      this.idx = cfg.idx !== void 0 ? cfg.idx : -1;
      this.type = cfg.type || "tag";
      this.name = cfg.name || "";
      this.isOpening = !!cfg.isOpening;
      this.isClosing = !!cfg.isClosing;
    }
    return CurrentTag2;
  }();

  // node_modules/autolinker/dist/es2015/autolinker.js
  var Autolinker = function() {
    function Autolinker2(cfg) {
      if (cfg === void 0) {
        cfg = {};
      }
      this.version = Autolinker2.version;
      this.urls = {};
      this.email = true;
      this.phone = true;
      this.hashtag = false;
      this.mention = false;
      this.newWindow = true;
      this.stripPrefix = { scheme: true, www: true };
      this.stripTrailingSlash = true;
      this.decodePercentEncoding = true;
      this.truncate = { length: 0, location: "end" };
      this.className = "";
      this.replaceFn = null;
      this.context = void 0;
      this.sanitizeHtml = false;
      this.matchers = null;
      this.tagBuilder = null;
      this.urls = this.normalizeUrlsCfg(cfg.urls);
      this.email = typeof cfg.email === "boolean" ? cfg.email : this.email;
      this.phone = typeof cfg.phone === "boolean" ? cfg.phone : this.phone;
      this.hashtag = cfg.hashtag || this.hashtag;
      this.mention = cfg.mention || this.mention;
      this.newWindow = typeof cfg.newWindow === "boolean" ? cfg.newWindow : this.newWindow;
      this.stripPrefix = this.normalizeStripPrefixCfg(cfg.stripPrefix);
      this.stripTrailingSlash = typeof cfg.stripTrailingSlash === "boolean" ? cfg.stripTrailingSlash : this.stripTrailingSlash;
      this.decodePercentEncoding = typeof cfg.decodePercentEncoding === "boolean" ? cfg.decodePercentEncoding : this.decodePercentEncoding;
      this.sanitizeHtml = cfg.sanitizeHtml || false;
      var mention = this.mention;
      if (mention !== false && mention !== "twitter" && mention !== "instagram" && mention !== "soundcloud") {
        throw new Error("invalid `mention` cfg - see docs");
      }
      var hashtag = this.hashtag;
      if (hashtag !== false && hashtag !== "twitter" && hashtag !== "facebook" && hashtag !== "instagram") {
        throw new Error("invalid `hashtag` cfg - see docs");
      }
      this.truncate = this.normalizeTruncateCfg(cfg.truncate);
      this.className = cfg.className || this.className;
      this.replaceFn = cfg.replaceFn || this.replaceFn;
      this.context = cfg.context || this;
    }
    Autolinker2.link = function(textOrHtml, options) {
      var autolinker = new Autolinker2(options);
      return autolinker.link(textOrHtml);
    };
    Autolinker2.parse = function(textOrHtml, options) {
      var autolinker = new Autolinker2(options);
      return autolinker.parse(textOrHtml);
    };
    Autolinker2.prototype.normalizeUrlsCfg = function(urls) {
      if (urls == null)
        urls = true;
      if (typeof urls === "boolean") {
        return { schemeMatches: urls, wwwMatches: urls, tldMatches: urls };
      } else {
        return {
          schemeMatches: typeof urls.schemeMatches === "boolean" ? urls.schemeMatches : true,
          wwwMatches: typeof urls.wwwMatches === "boolean" ? urls.wwwMatches : true,
          tldMatches: typeof urls.tldMatches === "boolean" ? urls.tldMatches : true
        };
      }
    };
    Autolinker2.prototype.normalizeStripPrefixCfg = function(stripPrefix) {
      if (stripPrefix == null)
        stripPrefix = true;
      if (typeof stripPrefix === "boolean") {
        return { scheme: stripPrefix, www: stripPrefix };
      } else {
        return {
          scheme: typeof stripPrefix.scheme === "boolean" ? stripPrefix.scheme : true,
          www: typeof stripPrefix.www === "boolean" ? stripPrefix.www : true
        };
      }
    };
    Autolinker2.prototype.normalizeTruncateCfg = function(truncate) {
      if (typeof truncate === "number") {
        return { length: truncate, location: "end" };
      } else {
        return defaults(truncate || {}, {
          length: Number.POSITIVE_INFINITY,
          location: "end"
        });
      }
    };
    Autolinker2.prototype.parse = function(textOrHtml) {
      var _this = this;
      var skipTagNames = ["a", "style", "script"], skipTagsStackCount = 0, matches = [];
      parseHtml(textOrHtml, {
        onOpenTag: function(tagName) {
          if (skipTagNames.indexOf(tagName) >= 0) {
            skipTagsStackCount++;
          }
        },
        onText: function(text, offset) {
          if (skipTagsStackCount === 0) {
            var htmlCharacterEntitiesRegex = /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi;
            var textSplit = splitAndCapture(text, htmlCharacterEntitiesRegex);
            var currentOffset_1 = offset;
            textSplit.forEach(function(splitText, i) {
              if (i % 2 === 0) {
                var textNodeMatches = _this.parseText(splitText, currentOffset_1);
                matches.push.apply(matches, textNodeMatches);
              }
              currentOffset_1 += splitText.length;
            });
          }
        },
        onCloseTag: function(tagName) {
          if (skipTagNames.indexOf(tagName) >= 0) {
            skipTagsStackCount = Math.max(skipTagsStackCount - 1, 0);
          }
        },
        onComment: function(offset) {
        },
        onDoctype: function(offset) {
        }
      });
      matches = this.compactMatches(matches);
      matches = this.removeUnwantedMatches(matches);
      return matches;
    };
    Autolinker2.prototype.compactMatches = function(matches) {
      matches.sort(function(a, b) {
        return a.getOffset() - b.getOffset();
      });
      for (var i = 0; i < matches.length - 1; i++) {
        var match = matches[i], offset = match.getOffset(), matchedTextLength = match.getMatchedText().length, endIdx = offset + matchedTextLength;
        if (i + 1 < matches.length) {
          if (matches[i + 1].getOffset() === offset) {
            var removeIdx = matches[i + 1].getMatchedText().length > matchedTextLength ? i : i + 1;
            matches.splice(removeIdx, 1);
            continue;
          }
          if (matches[i + 1].getOffset() < endIdx) {
            matches.splice(i + 1, 1);
          }
        }
      }
      return matches;
    };
    Autolinker2.prototype.removeUnwantedMatches = function(matches) {
      if (!this.hashtag)
        remove(matches, function(match) {
          return match.getType() === "hashtag";
        });
      if (!this.email)
        remove(matches, function(match) {
          return match.getType() === "email";
        });
      if (!this.phone)
        remove(matches, function(match) {
          return match.getType() === "phone";
        });
      if (!this.mention)
        remove(matches, function(match) {
          return match.getType() === "mention";
        });
      if (!this.urls.schemeMatches) {
        remove(matches, function(m) {
          return m.getType() === "url" && m.getUrlMatchType() === "scheme";
        });
      }
      if (!this.urls.wwwMatches) {
        remove(matches, function(m) {
          return m.getType() === "url" && m.getUrlMatchType() === "www";
        });
      }
      if (!this.urls.tldMatches) {
        remove(matches, function(m) {
          return m.getType() === "url" && m.getUrlMatchType() === "tld";
        });
      }
      return matches;
    };
    Autolinker2.prototype.parseText = function(text, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      offset = offset || 0;
      var matchers = this.getMatchers(), matches = [];
      for (var i = 0, numMatchers = matchers.length; i < numMatchers; i++) {
        var textMatches = matchers[i].parseMatches(text);
        for (var j = 0, numTextMatches = textMatches.length; j < numTextMatches; j++) {
          textMatches[j].setOffset(offset + textMatches[j].getOffset());
        }
        matches.push.apply(matches, textMatches);
      }
      return matches;
    };
    Autolinker2.prototype.link = function(textOrHtml) {
      if (!textOrHtml) {
        return "";
      }
      if (this.sanitizeHtml) {
        textOrHtml = textOrHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      var matches = this.parse(textOrHtml), newHtml = [], lastIndex = 0;
      for (var i = 0, len = matches.length; i < len; i++) {
        var match = matches[i];
        newHtml.push(textOrHtml.substring(lastIndex, match.getOffset()));
        newHtml.push(this.createMatchReturnVal(match));
        lastIndex = match.getOffset() + match.getMatchedText().length;
      }
      newHtml.push(textOrHtml.substring(lastIndex));
      return newHtml.join("");
    };
    Autolinker2.prototype.createMatchReturnVal = function(match) {
      var replaceFnResult;
      if (this.replaceFn) {
        replaceFnResult = this.replaceFn.call(this.context, match);
      }
      if (typeof replaceFnResult === "string") {
        return replaceFnResult;
      } else if (replaceFnResult === false) {
        return match.getMatchedText();
      } else if (replaceFnResult instanceof HtmlTag) {
        return replaceFnResult.toAnchorString();
      } else {
        var anchorTag = match.buildTag();
        return anchorTag.toAnchorString();
      }
    };
    Autolinker2.prototype.getMatchers = function() {
      if (!this.matchers) {
        var tagBuilder = this.getTagBuilder();
        var matchers = [
          new HashtagMatcher({ tagBuilder, serviceName: this.hashtag }),
          new EmailMatcher({ tagBuilder }),
          new PhoneMatcher({ tagBuilder }),
          new MentionMatcher({ tagBuilder, serviceName: this.mention }),
          new UrlMatcher({ tagBuilder, stripPrefix: this.stripPrefix, stripTrailingSlash: this.stripTrailingSlash, decodePercentEncoding: this.decodePercentEncoding })
        ];
        return this.matchers = matchers;
      } else {
        return this.matchers;
      }
    };
    Autolinker2.prototype.getTagBuilder = function() {
      var tagBuilder = this.tagBuilder;
      if (!tagBuilder) {
        tagBuilder = this.tagBuilder = new AnchorTagBuilder({
          newWindow: this.newWindow,
          truncate: this.truncate,
          className: this.className
        });
      }
      return tagBuilder;
    };
    Autolinker2.version = "3.14.3";
    Autolinker2.AnchorTagBuilder = AnchorTagBuilder;
    Autolinker2.HtmlTag = HtmlTag;
    Autolinker2.matcher = {
      Email: EmailMatcher,
      Hashtag: HashtagMatcher,
      Matcher,
      Mention: MentionMatcher,
      Phone: PhoneMatcher,
      Url: UrlMatcher
    };
    Autolinker2.match = {
      Email: EmailMatch,
      Hashtag: HashtagMatch,
      Match,
      Mention: MentionMatch,
      Phone: PhoneMatch,
      Url: UrlMatch
    };
    return Autolinker2;
  }();
  var autolinker_default = Autolinker;

  // node_modules/autolinker/dist/es2015/index.js
  var es2015_default = autolinker_default;

  // src/components/Span.ts
  function Span(attributes = {}) {
    const span = document.createElement("span");
    for (const attribute in attributes) {
      span.setAttribute(attribute, attributes[attribute]);
    }
    return span;
  }

  // src/components/TextArea.ts
  function TextArea() {
    return document.createElement("textarea");
  }

  // src/routes/Routes.ts
  var Routes = {
    home: "/"
  };

  // src/theme/Borders.ts
  var Borders = {
    bottom: "1px solid black"
  };

  // src/components/UserIcon.ts
  function UserIcon(userName, userColor) {
    const userIcon = Div();
    setStyle(userIcon, {
      display: "flex",
      flexShrink: "0",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      borderRadius: "999px",
      height: "30px",
      width: "30px",
      backgroundColor: userColor || "black",
      color: "white",
      textAlign: "center",
      lineHeight: "30px",
      marginRight: "10px",
      fontSize: "12px"
    });
    const firstInitial = userName.charAt(0);
    const lastInitial = userName.split(" ")[1].charAt(0);
    userIcon.innerText = firstInitial + lastInitial;
    return userIcon;
  }

  // src/views/RoomView.ts
  var sideBarEnabled = false;
  function RoomView(props) {
    const currentUser = getSelf();
    let messages = [];
    let userRoomConfig = null;
    let lastMessageId = "";
    let messageButtonActive = false;
    let messageBeingEdited = false;
    let mentionsOpen = false;
    let mentionsStart = -1;
    console.log("Room view");
    const mql = window.matchMedia("(max-width: 600px");
    sideBarEnabled = localStorage.getItem("sidebar") === "true";
    const roomView = Div({
      class: "room-view"
    });
    setStyle(roomView, {
      display: "flex",
      flexGrow: "1",
      width: "100%"
    });
    const messageView = Div({
      class: "message-view"
    });
    setStyle(messageView, {
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 50px)",
      width: "100%",
      flexGrow: "1",
      minWidth: "0"
    });
    const room = getRoom(props.roomId);
    onClick(messageView, async () => {
      await postUserRoomConfig({
        ...room.userRoomConfig,
        room: room._id,
        unreadCount: 0
      });
      await clearUnreadBubble(room);
    });
    onRoomMessage(props.roomId, (message) => {
      if (isLastMessageToday(messages[1], message)) {
        messageList.prepend(DateDivider(message.createdAt));
      }
      const newMessage = Message(message);
      messageList.prepend(newMessage);
    });
    onDeleteMessage(props.roomId, async (messageId) => {
      const messageToDelete = byId(messageId);
      messageToDelete.remove();
      const isLastMessageInList = messageList.firstElementChild.classList.contains("date-divider");
      if (isLastMessageInList) {
        messageList.removeChild(messageList.firstChild);
        const messagesList = await getRoomMessageByPage(props.roomId, "");
        messages = messagesList.messages;
      }
    });
    onEditMessage(props.roomId, async (message) => {
      const messageToEdit = byId(message._id);
      const messageContentEl = messageToEdit.getElementsByClassName("message-content-el")[0];
      const messageBody = messageToEdit.getElementsByClassName("body")[0];
      messageBody.innerHTML = es2015_default.link(message.body);
      if (!messageToEdit.getElementsByClassName("edited-tag")[0]) {
        const editedTag = EditedTag();
        messageContentEl.insertBefore(editedTag, messageBody);
      }
    });
    function Message(props2) {
      let dropdownOpen = false;
      const el = Div({
        class: "message",
        id: props2._id
      });
      setStyle(el, {
        display: "flex",
        margin: "0px 0px",
        overflowWrap: "Anywhere",
        padding: "4px 15px"
      });
      onMouseOver(el, (e) => {
        e.stopPropagation();
        if (messageButtonActive) {
          return;
        }
        if (!el.classList.contains("being-edited")) {
          el.style.backgroundColor = "#f2f2f2";
          const optionsButton = bySelector(el.lastElementChild, ".options-button");
          if (optionsButton && !messageBeingEdited) {
            optionsButton.style.display = "block";
          }
        }
      });
      onMouseLeave(el, (e) => {
        e.stopPropagation();
        if (messageButtonActive) {
          return;
        }
        if (!el.classList.contains("being-edited")) {
          el.style.backgroundColor = "";
          const optionsButton = bySelector(el.lastElementChild, ".options-button");
          if (optionsButton && !messageBeingEdited) {
            optionsButton.style.display = dropdownOpen ? "block" : "none";
          }
        }
      });
      const user = getUser(props2.user);
      const userIcon = UserIcon(user.name, user.color);
      el.append(userIcon);
      const messageContentEl = Div({
        class: "message-content-el"
      });
      setStyle(messageContentEl, {
        width: "100%"
      });
      el.append(messageContentEl);
      async function init() {
        const userNameEl = Span();
        setStyle(userNameEl, {
          fontWeight: "bold"
        });
        setText(userNameEl, user.name);
        messageContentEl.append(userNameEl);
        const messageTime = Span();
        setStyle(messageTime, {
          marginLeft: "8px",
          fontSize: "12px"
        });
        const messageCreatedAt = new Date(props2.createdAt).toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" });
        messageTime.innerHTML = messageCreatedAt;
        messageContentEl.append(messageTime);
        if (props2.updatedAt) {
          messageContentEl.append(EditedTag());
        }
        const bodyEl = Div();
        bodyEl.className = "body";
        setStyle(bodyEl, {
          position: "relative",
          whiteSpace: "pre-wrap"
        });
        bodyEl.innerHTML = es2015_default.link(props2.body);
        if (props2.user === currentUser._id) {
          let handleClickOutsideDropdown = function(e) {
            e.stopPropagation();
            const element = byId(props2._id);
            if (dropdownOpen && !bySelector(element, ".options-button").contains(e.target)) {
              dropdownOpen = !dropdownOpen;
              messageButtonActive = false;
              dropdown.style.display = "none";
              messageOptions.style.display = "none";
              el.style.backgroundColor = "";
            }
          };
          const messageOptions = Div({
            class: "options-button"
          });
          setStyle(messageOptions, {
            position: "absolute",
            top: "-18px",
            right: "0px",
            display: "none",
            cursor: "pointer",
            width: "24px",
            height: "12px",
            paddingBottom: "10px",
            textAlign: "center",
            fontSize: "14px",
            border: "1px solid #909090bf",
            backgroundColor: "#f2f2f2",
            color: "#909090",
            borderRadius: "2px"
          });
          messageOptions.innerHTML = "&#8230";
          bodyEl.append(messageOptions);
          onMouseOver(messageOptions, () => {
            messageOptions.style.borderColor = "#909090";
          });
          onMouseLeave(messageOptions, () => {
            messageOptions.style.borderColor = "#909090bf";
          });
          onClick(messageOptions, () => {
            dropdownOpen = !dropdownOpen;
            messageButtonActive = !messageButtonActive;
            const element = byId(props2._id);
            const optionsButton = bySelector(element, ".options-button");
            if (bottomPosition(optionsButton) > window.innerHeight - 100) {
              dropdown.style.top = "-38px";
              dropdown.style.zIndex = "1";
            }
            dropdown.style.display = dropdownOpen ? "block" : "none";
          });
          const dropdown = Div();
          setStyle(dropdown, {
            display: "none",
            position: "absolute",
            top: "24px",
            right: "0",
            cursor: "pointer",
            border: "1px solid #909090",
            color: "#333",
            backgroundColor: "#fff",
            borderRadius: "2px"
          });
          const options = document.createElement("ul");
          setStyle(options, {
            listStyleType: "none",
            padding: "0px",
            margin: "0px"
          });
          const delete_option = document.createElement("li");
          setStyle(delete_option, {
            margin: "0",
            padding: "8px 12px",
            overflowWrap: "Normal"
          });
          delete_option.innerHTML = "Delete";
          const edit_option = document.createElement("li");
          setStyle(edit_option, {
            margin: "0",
            padding: "8px 12px",
            overflowWrap: "Normal"
          });
          edit_option.innerHTML = "Edit";
          options.appendChild(delete_option);
          options.appendChild(edit_option);
          onClick(delete_option, () => {
            handleDeleteMessage(props2._id);
            messageButtonActive = false;
          });
          onMouseOver(delete_option, () => {
            delete_option.style.backgroundColor = "#f2f2f2";
            dropdown.style.border = "1px solid #909090";
          });
          onMouseLeave(delete_option, () => {
            delete_option.style.backgroundColor = "";
            dropdown.style.border = "1px solid #909090bf";
          });
          onClick(edit_option, () => {
            const textBox2 = byId("textbox");
            if (textBox2) {
              textBox2.remove();
            }
            const messageId = props2._id;
            const editTextBox = TextBox({
              onSubmit: handleEditMessage,
              messageId
            });
            messageView.append(editTextBox);
            const editTextInput = byId("textinput");
            const messageBodyEnd = props2.body.length;
            editTextInput.placeholder = "Edit your message";
            editTextInput.innerHTML = props2.body;
            editTextInput.setSelectionRange(messageBodyEnd, messageBodyEnd);
            editTextInput.focus();
            el.classList.toggle("being-edited");
            el.style.backgroundColor = "#e6e6e6";
            messageOptions.style.display = "none";
            messageButtonActive = false;
            messageBeingEdited = true;
          });
          onMouseOver(edit_option, () => {
            edit_option.style.backgroundColor = "#f2f2f2";
            dropdown.style.border = "1px solid #909090";
          });
          onMouseLeave(edit_option, () => {
            edit_option.style.backgroundColor = "";
            dropdown.style.border = "1px solid #909090bf";
          });
          window.addEventListener("click", handleClickOutsideDropdown);
          dropdown.append(options);
          messageOptions.append(dropdown);
        }
        messageContentEl.append(bodyEl);
      }
      init();
      return el;
    }
    function EditedTag() {
      const el = Span({
        class: "edited-tag"
      });
      setStyle(el, {
        marginLeft: "8px",
        fontSize: "12px"
      });
      el.innerHTML = "edited";
      return el;
    }
    function MessageList() {
      const el = Div({
        class: "message-list"
      });
      setStyle(el, {
        overflowY: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        margin: "0",
        width: "100%"
      });
      async function init() {
        const loadMoreDiv = Div();
        setStyle(loadMoreDiv, {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        });
        const loadMoreButton = Button({
          text: "Load More Messages"
        });
        setStyle(loadMoreButton, {
          width: "200px"
        });
        async function messagePage(lastMessageIdParam) {
          const messagesList = await getRoomMessageByPage(props.roomId, lastMessageIdParam);
          messages = messagesList.messages;
          userRoomConfig = messagesList.userRoomConfig;
          lastMessageId = messagesList.lastMessageId;
          for (let i = 0; i < messages.length; i++) {
            if (messages[i]._id === userRoomConfig.lastReadMessageId) {
              el.append(NewRow());
            }
            el.appendChild(Message(messages[i]));
            const message = new Date(messages[i].createdAt).toLocaleDateString();
            const nextMessage = messages[i + 1] ? new Date(messages[i + 1].createdAt).toLocaleDateString() : null;
            if (message !== nextMessage) {
              el.append(DateDivider(messages[i].createdAt));
            }
          }
          el.appendChild(loadMoreDiv);
          loadMoreDiv.appendChild(loadMoreButton);
        }
        await messagePage(lastMessageId);
        onClick(loadMoreButton, async () => {
          await messagePage(lastMessageId);
          el.scrollTo(0, el.scrollHeight * -1);
        });
      }
      init();
      return el;
    }
    function NewRow() {
      const el = Div();
      setStyle(el, {
        borderBottom: "1px solid red"
      });
      return el;
    }
    function DateDivider(dividerDate) {
      const messagesDate = Div({
        class: "date-divider"
      });
      setStyle(messagesDate, {
        display: "flex",
        position: "relative"
      });
      const dateBox = Div();
      setStyle(dateBox, {
        background: "#fff",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "8px",
        fontSize: "12px",
        zIndex: "1"
      });
      dateBox.innerHTML = new Date(dividerDate).toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
      messagesDate.append(dateBox);
      const messagesDateHr = Div();
      setStyle(messagesDateHr, {
        position: "absolute",
        bottom: "50%",
        width: "100%",
        border: "none",
        borderTop: "1px solid #ddd",
        opacity: "0.5",
        boxSizing: "border-box"
      });
      messagesDate.append(messagesDateHr);
      return messagesDate;
    }
    function isLastMessageToday(lastListMessage, currentMessage) {
      if (!lastListMessage) {
        return true;
      }
      const dateLastListMessage = new Date(lastListMessage.createdAt).toLocaleDateString();
      const dateCurrentMessage = new Date(currentMessage.createdAt).toLocaleDateString();
      return dateLastListMessage !== dateCurrentMessage;
    }
    function TextBox(textBoxProps) {
      const el = Div({
        id: "textbox"
      });
      setStyle(el, {
        flexShrink: "0",
        maxHeight: "25%",
        minHeight: "6%",
        marginTop: "auto",
        display: "flex",
        padding: "0 15px",
        paddingBottom: "15px",
        position: "relative"
      });
      const originalHeight = el.style.height;
      const input = TextArea();
      input.id = "textinput";
      setStyle(input, {
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        resize: "none",
        overflow: "auto",
        marginRight: "5px",
        padding: "5px",
        font: "inherit"
      });
      const btnSubmit = Button({
        text: ">"
      });
      setStyle(btnSubmit, {
        maxHeight: "45px",
        width: "30px"
      });
      onClick(btnSubmit, () => {
        const inputText = input.value.trim();
        if (textBoxProps.messageId) {
          textBoxProps.onSubmit({
            text: inputText,
            id: textBoxProps.messageId
          });
          const editedMessage = byId(textBoxProps.messageId);
          editedMessage.classList.toggle("being-edited");
          editedMessage.style.backgroundColor = "";
          el.remove();
          messageView.appendChild(textBox);
          messageBeingEdited = false;
        } else {
          textBoxProps.onSubmit({
            text: inputText
          });
        }
        input.value = "";
        el.style.height = originalHeight;
        document.getElementsByClassName("message-list")[0].scrollTo({
          top: 0
        });
      });
      input.addEventListener("keyup", async (e) => {
        const scrollHeight = input.scrollHeight;
        if (scrollHeight > Number(originalHeight)) {
          el.style.height = String(scrollHeight);
        }
        if (input.value[input.textLength - 1] === "@") {
          mentionsStart = input.value.lastIndexOf("@");
        }
        console.log("MENTIONSSTART", mentionsStart);
        if (mentionsStart !== -1) {
          const { users: users2 } = room;
          const allUsers = await getUsers();
          const roomUsers = allUsers.filter((user) => users2.includes(user._id) && user._id !== currentUser._id);
          if (!mentionsOpen) {
            if (!users2.length || users2.length === 1) {
              return;
            }
            const dropdown = Div();
            setStyle(dropdown, {
              position: "absolute",
              bottom: "69px",
              cursor: "pointer",
              border: "1px solid #909090",
              color: "#333",
              backgroundColor: "#fff",
              borderRadius: "2px"
            });
            const options = document.createElement("ul");
            options.setAttribute("id", "my-dropdown");
            setStyle(options, {
              listStyleType: "none",
              padding: "0px",
              margin: "0px"
            });
            roomUsers?.map((roomUser) => {
              const roomUserOption = document.createElement("li");
              setStyle(roomUserOption, {
                margin: "0",
                padding: "8px 12px",
                overflowWrap: "Normal",
                display: "flex",
                alignItems: "center"
              });
              roomUserOption.innerHTML = roomUser.name;
              const userIcon = UserIcon(roomUser.name, roomUser.color);
              roomUserOption.prepend(userIcon);
              options.appendChild(roomUserOption);
            });
            dropdown.append(options);
            el.append(dropdown);
            mentionsOpen = true;
            console.log("mentions are now open");
          }
          if (mentionsOpen && e.key !== "Shift" && !e.shiftKey) {
            const mentionsList = byId("my-dropdown");
            const userNames = mentionsList.getElementsByTagName("li");
            console.log("user names", userNames);
            Array.from(userNames).forEach((userName) => {
              const name = userName.textContent.slice(2).toLowerCase();
              const inputAfterAtSymbol = input.value.slice(mentionsStart + 1).toLowerCase();
              if (e.key != " " && name.indexOf(inputAfterAtSymbol) > -1) {
                console.log("flexing");
                userName.style.display = "flex";
              } else {
                console.log("removing");
                userName.style.display = "none";
              }
              if (mentionsList.clientHeight < 5) {
                console.log("no more length", mentionsList.clientHeight < 5);
                mentionsList.remove();
                mentionsOpen = false;
                mentionsStart = -1;
              }
            });
          }
        }
        if (e.key === "Enter" && !e.shiftKey) {
          const inputText = input.value.trim();
          e.preventDefault();
          if (textBoxProps.messageId) {
            textBoxProps.onSubmit({
              text: inputText,
              id: textBoxProps.messageId
            });
            const editedMessage = byId(textBoxProps.messageId);
            editedMessage.classList.toggle("being-edited");
            editedMessage.style.backgroundColor = "";
            el.remove();
            messageView.appendChild(textBox);
            messageBeingEdited = false;
          } else {
            textBoxProps.onSubmit({
              text: inputText
            });
          }
          input.value = "";
          el.style.height = originalHeight;
          document.getElementsByClassName("message-list")[0].scrollTo({
            top: 0
          });
        }
      });
      el.appendChild(input);
      if (mql.matches) {
        el.appendChild(btnSubmit);
      }
      mql.addEventListener("change", (e) => {
        if (e.matches) {
          el.appendChild(btnSubmit);
        } else {
          el.removeChild(btnSubmit);
        }
      });
      setTimeout(() => {
        input.focus();
      }, 0);
      return el;
    }
    function RoomHeader() {
      const el = Div({
        class: "room-header"
      });
      setStyle(el, {
        display: "flex",
        borderBottom: Borders.bottom,
        padding: "8px",
        width: "100%",
        margin: "0 auto"
      });
      const btnBack = Button({
        text: "<"
      });
      el.append(btnBack);
      onClick(btnBack, () => {
        setURL(Routes.home);
      });
      const btnSidebar = Button({
        text: "Toggle Sidebar"
      });
      setStyle(btnSidebar, {
        marginLeft: "10px"
      });
      el.append(btnSidebar);
      onClick(btnSidebar, () => {
        toggleSidebar();
        localStorage.getItem("sidebar") === "true" ? document.getElementById("sidebar").style.width = "200px" : document.getElementById("sidebar").style.width = "0px";
      });
      const roomNameEl = Div({
        class: "room-name-el"
      });
      setStyle(roomNameEl, {
        paddingLeft: "8px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        paddingRight: "20px"
      });
      setText(roomNameEl, room.name);
      el.append(roomNameEl);
      return el;
    }
    function SideBar() {
      const el = Div({
        id: "sidebar"
      });
      setStyle(el, {
        flexShrink: "0",
        flexGrow: "0",
        width: "0px",
        maxWidth: "33.33%"
      });
      if (localStorage.getItem("sidebar") === "true") {
        el.style.width = "200px";
      }
      const roomList = RoomList();
      setStyle(roomList, {
        flexShrink: "0"
      });
      el.append(roomList);
      return el;
    }
    function toggleSidebar() {
      sideBarEnabled = !sideBarEnabled;
      localStorage.setItem("sidebar", sideBarEnabled ? "true" : "false");
    }
    roomView.append(SideBar());
    roomView.append(messageView);
    const roomHeader = RoomHeader();
    messageView.append(roomHeader);
    const messageList = MessageList();
    function handleSubmit(params) {
      sendRoomMessage({
        room: props.roomId,
        body: params.text
      });
    }
    function handleDeleteMessage(id) {
      deleteRoomMessage({
        room: props.roomId,
        id
      });
    }
    function handleEditMessage(params) {
      editRoomMessage({
        room: props.roomId,
        id: params.id,
        body: params.text
      });
    }
    const textBox = TextBox({ onSubmit: handleSubmit });
    messageView.appendChild(messageList);
    messageView.appendChild(textBox);
    return roomView;
  }

  // src/views/Router.ts
  function Router() {
    const router = Div();
    setStyle(router, {
      flexGrow: "1"
    });
    function init() {
      handleRouteUpdated();
    }
    window.addEventListener("popstate", handleRouteUpdated);
    function handleRouteUpdated() {
      router.innerHTML = "";
      const path = window.location.pathname;
      if (path === "/") {
        router.append(RoomList());
      } else if (path.includes("rooms")) {
        const roomId = path.split("/")[2];
        router.append(RoomView({
          roomId
        }));
      }
    }
    init();
    return router;
  }

  // src/app.ts
  async function run() {
    const root = document.getElementById("root");
    await Promise.all([initializePushNotificationService(), initializeRoomApi(), initializeUserApi()]);
    root.append(Header());
    const router = Router();
    root.append(router);
  }
  run();
})();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
