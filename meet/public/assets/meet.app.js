(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/peerjs/dist/peerjs.min.js
  var require_peerjs_min = __commonJS({
    "node_modules/peerjs/dist/peerjs.min.js"(exports, module) {
      parcelRequire = function(e, r, t, n) {
        var i, o = typeof parcelRequire == "function" && parcelRequire, u = typeof __require == "function" && __require;
        function f(t2, n2) {
          if (!r[t2]) {
            if (!e[t2]) {
              var i2 = typeof parcelRequire == "function" && parcelRequire;
              if (!n2 && i2)
                return i2(t2, true);
              if (o)
                return o(t2, true);
              if (u && typeof t2 == "string")
                return u(t2);
              var c2 = new Error("Cannot find module '" + t2 + "'");
              throw c2.code = "MODULE_NOT_FOUND", c2;
            }
            p.resolve = function(r2) {
              return e[t2][1][r2] || r2;
            }, p.cache = {};
            var l2 = r[t2] = new f.Module(t2);
            e[t2][0].call(l2.exports, p, l2, l2.exports, this);
          }
          return r[t2].exports;
          function p(e2) {
            return f(p.resolve(e2));
          }
        }
        f.isParcelRequire = true, f.Module = function(e2) {
          this.id = e2, this.bundle = f, this.exports = {};
        }, f.modules = e, f.cache = r, f.parent = o, f.register = function(r2, t2) {
          e[r2] = [function(e2, r3) {
            r3.exports = t2;
          }, {}];
        };
        for (var c = 0; c < t.length; c++)
          try {
            f(t[c]);
          } catch (e2) {
            i || (i = e2);
          }
        if (t.length) {
          var l = f(t[t.length - 1]);
          typeof exports == "object" && typeof module != "undefined" ? module.exports = l : typeof define == "function" && define.amd ? define(function() {
            return l;
          }) : n && (this[n] = l);
        }
        if (parcelRequire = f, i)
          throw i;
        return f;
      }({ "EgBh": [function(require2, module2, exports2) {
        var e = {};
        e.useBlobBuilder = function() {
          try {
            return new Blob([]), false;
          } catch (e2) {
            return true;
          }
        }(), e.useArrayBufferView = !e.useBlobBuilder && function() {
          try {
            return new Blob([new Uint8Array([])]).size === 0;
          } catch (e2) {
            return true;
          }
        }(), module2.exports.binaryFeatures = e;
        var r = module2.exports.BlobBuilder;
        function t() {
          this._pieces = [], this._parts = [];
        }
        typeof window != "undefined" && (r = module2.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder), t.prototype.append = function(e2) {
          typeof e2 == "number" ? this._pieces.push(e2) : (this.flush(), this._parts.push(e2));
        }, t.prototype.flush = function() {
          if (this._pieces.length > 0) {
            var r2 = new Uint8Array(this._pieces);
            e.useArrayBufferView || (r2 = r2.buffer), this._parts.push(r2), this._pieces = [];
          }
        }, t.prototype.getBuffer = function() {
          if (this.flush(), e.useBlobBuilder) {
            for (var t2 = new r(), i = 0, u = this._parts.length; i < u; i++)
              t2.append(this._parts[i]);
            return t2.getBlob();
          }
          return new Blob(this._parts);
        }, module2.exports.BufferBuilder = t;
      }, {}], "kdPp": [function(require2, module2, exports2) {
        var t = require2("./bufferbuilder").BufferBuilder, e = require2("./bufferbuilder").binaryFeatures, i = { unpack: function(t2) {
          return new r(t2).unpack();
        }, pack: function(t2) {
          var e2 = new n();
          return e2.pack(t2), e2.getBuffer();
        } };
        function r(t2) {
          this.index = 0, this.dataBuffer = t2, this.dataView = new Uint8Array(this.dataBuffer), this.length = this.dataBuffer.byteLength;
        }
        function n() {
          this.bufferBuilder = new t();
        }
        function u(t2) {
          var e2 = t2.charCodeAt(0);
          return e2 <= 2047 ? "00" : e2 <= 65535 ? "000" : e2 <= 2097151 ? "0000" : e2 <= 67108863 ? "00000" : "000000";
        }
        function a(t2) {
          return t2.length > 600 ? new Blob([t2]).size : t2.replace(/[^\u0000-\u007F]/g, u).length;
        }
        module2.exports = i, r.prototype.unpack = function() {
          var t2, e2 = this.unpack_uint8();
          if (e2 < 128)
            return e2;
          if ((224 ^ e2) < 32)
            return (224 ^ e2) - 32;
          if ((t2 = 160 ^ e2) <= 15)
            return this.unpack_raw(t2);
          if ((t2 = 176 ^ e2) <= 15)
            return this.unpack_string(t2);
          if ((t2 = 144 ^ e2) <= 15)
            return this.unpack_array(t2);
          if ((t2 = 128 ^ e2) <= 15)
            return this.unpack_map(t2);
          switch (e2) {
            case 192:
              return null;
            case 193:
              return;
            case 194:
              return false;
            case 195:
              return true;
            case 202:
              return this.unpack_float();
            case 203:
              return this.unpack_double();
            case 204:
              return this.unpack_uint8();
            case 205:
              return this.unpack_uint16();
            case 206:
              return this.unpack_uint32();
            case 207:
              return this.unpack_uint64();
            case 208:
              return this.unpack_int8();
            case 209:
              return this.unpack_int16();
            case 210:
              return this.unpack_int32();
            case 211:
              return this.unpack_int64();
            case 212:
            case 213:
            case 214:
            case 215:
              return;
            case 216:
              return t2 = this.unpack_uint16(), this.unpack_string(t2);
            case 217:
              return t2 = this.unpack_uint32(), this.unpack_string(t2);
            case 218:
              return t2 = this.unpack_uint16(), this.unpack_raw(t2);
            case 219:
              return t2 = this.unpack_uint32(), this.unpack_raw(t2);
            case 220:
              return t2 = this.unpack_uint16(), this.unpack_array(t2);
            case 221:
              return t2 = this.unpack_uint32(), this.unpack_array(t2);
            case 222:
              return t2 = this.unpack_uint16(), this.unpack_map(t2);
            case 223:
              return t2 = this.unpack_uint32(), this.unpack_map(t2);
          }
        }, r.prototype.unpack_uint8 = function() {
          var t2 = 255 & this.dataView[this.index];
          return this.index++, t2;
        }, r.prototype.unpack_uint16 = function() {
          var t2 = this.read(2), e2 = 256 * (255 & t2[0]) + (255 & t2[1]);
          return this.index += 2, e2;
        }, r.prototype.unpack_uint32 = function() {
          var t2 = this.read(4), e2 = 256 * (256 * (256 * t2[0] + t2[1]) + t2[2]) + t2[3];
          return this.index += 4, e2;
        }, r.prototype.unpack_uint64 = function() {
          var t2 = this.read(8), e2 = 256 * (256 * (256 * (256 * (256 * (256 * (256 * t2[0] + t2[1]) + t2[2]) + t2[3]) + t2[4]) + t2[5]) + t2[6]) + t2[7];
          return this.index += 8, e2;
        }, r.prototype.unpack_int8 = function() {
          var t2 = this.unpack_uint8();
          return t2 < 128 ? t2 : t2 - 256;
        }, r.prototype.unpack_int16 = function() {
          var t2 = this.unpack_uint16();
          return t2 < 32768 ? t2 : t2 - 65536;
        }, r.prototype.unpack_int32 = function() {
          var t2 = this.unpack_uint32();
          return t2 < Math.pow(2, 31) ? t2 : t2 - Math.pow(2, 32);
        }, r.prototype.unpack_int64 = function() {
          var t2 = this.unpack_uint64();
          return t2 < Math.pow(2, 63) ? t2 : t2 - Math.pow(2, 64);
        }, r.prototype.unpack_raw = function(t2) {
          if (this.length < this.index + t2)
            throw new Error("BinaryPackFailure: index is out of range " + this.index + " " + t2 + " " + this.length);
          var e2 = this.dataBuffer.slice(this.index, this.index + t2);
          return this.index += t2, e2;
        }, r.prototype.unpack_string = function(t2) {
          for (var e2, i2, r2 = this.read(t2), n2 = 0, u2 = ""; n2 < t2; )
            (e2 = r2[n2]) < 128 ? (u2 += String.fromCharCode(e2), n2++) : (192 ^ e2) < 32 ? (i2 = (192 ^ e2) << 6 | 63 & r2[n2 + 1], u2 += String.fromCharCode(i2), n2 += 2) : (i2 = (15 & e2) << 12 | (63 & r2[n2 + 1]) << 6 | 63 & r2[n2 + 2], u2 += String.fromCharCode(i2), n2 += 3);
          return this.index += t2, u2;
        }, r.prototype.unpack_array = function(t2) {
          for (var e2 = new Array(t2), i2 = 0; i2 < t2; i2++)
            e2[i2] = this.unpack();
          return e2;
        }, r.prototype.unpack_map = function(t2) {
          for (var e2 = {}, i2 = 0; i2 < t2; i2++) {
            var r2 = this.unpack(), n2 = this.unpack();
            e2[r2] = n2;
          }
          return e2;
        }, r.prototype.unpack_float = function() {
          var t2 = this.unpack_uint32(), e2 = (t2 >> 23 & 255) - 127;
          return (t2 >> 31 === 0 ? 1 : -1) * (8388607 & t2 | 8388608) * Math.pow(2, e2 - 23);
        }, r.prototype.unpack_double = function() {
          var t2 = this.unpack_uint32(), e2 = this.unpack_uint32(), i2 = (t2 >> 20 & 2047) - 1023;
          return (t2 >> 31 === 0 ? 1 : -1) * ((1048575 & t2 | 1048576) * Math.pow(2, i2 - 20) + e2 * Math.pow(2, i2 - 52));
        }, r.prototype.read = function(t2) {
          var e2 = this.index;
          if (e2 + t2 <= this.length)
            return this.dataView.subarray(e2, e2 + t2);
          throw new Error("BinaryPackFailure: read index out of range");
        }, n.prototype.getBuffer = function() {
          return this.bufferBuilder.getBuffer();
        }, n.prototype.pack = function(t2) {
          var i2 = typeof t2;
          if (i2 === "string")
            this.pack_string(t2);
          else if (i2 === "number")
            Math.floor(t2) === t2 ? this.pack_integer(t2) : this.pack_double(t2);
          else if (i2 === "boolean")
            t2 === true ? this.bufferBuilder.append(195) : t2 === false && this.bufferBuilder.append(194);
          else if (i2 === "undefined")
            this.bufferBuilder.append(192);
          else {
            if (i2 !== "object")
              throw new Error('Type "' + i2 + '" not yet supported');
            if (t2 === null)
              this.bufferBuilder.append(192);
            else {
              var r2 = t2.constructor;
              if (r2 == Array)
                this.pack_array(t2);
              else if (r2 == Blob || r2 == File || t2 instanceof Blob || t2 instanceof File)
                this.pack_bin(t2);
              else if (r2 == ArrayBuffer)
                e.useArrayBufferView ? this.pack_bin(new Uint8Array(t2)) : this.pack_bin(t2);
              else if ("BYTES_PER_ELEMENT" in t2)
                e.useArrayBufferView ? this.pack_bin(new Uint8Array(t2.buffer)) : this.pack_bin(t2.buffer);
              else if (r2 == Object || r2.toString().startsWith("class"))
                this.pack_object(t2);
              else if (r2 == Date)
                this.pack_string(t2.toString());
              else {
                if (typeof t2.toBinaryPack != "function")
                  throw new Error('Type "' + r2.toString() + '" not yet supported');
                this.bufferBuilder.append(t2.toBinaryPack());
              }
            }
          }
          this.bufferBuilder.flush();
        }, n.prototype.pack_bin = function(t2) {
          var e2 = t2.length || t2.byteLength || t2.size;
          if (e2 <= 15)
            this.pack_uint8(160 + e2);
          else if (e2 <= 65535)
            this.bufferBuilder.append(218), this.pack_uint16(e2);
          else {
            if (!(e2 <= 4294967295))
              throw new Error("Invalid length");
            this.bufferBuilder.append(219), this.pack_uint32(e2);
          }
          this.bufferBuilder.append(t2);
        }, n.prototype.pack_string = function(t2) {
          var e2 = a(t2);
          if (e2 <= 15)
            this.pack_uint8(176 + e2);
          else if (e2 <= 65535)
            this.bufferBuilder.append(216), this.pack_uint16(e2);
          else {
            if (!(e2 <= 4294967295))
              throw new Error("Invalid length");
            this.bufferBuilder.append(217), this.pack_uint32(e2);
          }
          this.bufferBuilder.append(t2);
        }, n.prototype.pack_array = function(t2) {
          var e2 = t2.length;
          if (e2 <= 15)
            this.pack_uint8(144 + e2);
          else if (e2 <= 65535)
            this.bufferBuilder.append(220), this.pack_uint16(e2);
          else {
            if (!(e2 <= 4294967295))
              throw new Error("Invalid length");
            this.bufferBuilder.append(221), this.pack_uint32(e2);
          }
          for (var i2 = 0; i2 < e2; i2++)
            this.pack(t2[i2]);
        }, n.prototype.pack_integer = function(t2) {
          if (t2 >= -32 && t2 <= 127)
            this.bufferBuilder.append(255 & t2);
          else if (t2 >= 0 && t2 <= 255)
            this.bufferBuilder.append(204), this.pack_uint8(t2);
          else if (t2 >= -128 && t2 <= 127)
            this.bufferBuilder.append(208), this.pack_int8(t2);
          else if (t2 >= 0 && t2 <= 65535)
            this.bufferBuilder.append(205), this.pack_uint16(t2);
          else if (t2 >= -32768 && t2 <= 32767)
            this.bufferBuilder.append(209), this.pack_int16(t2);
          else if (t2 >= 0 && t2 <= 4294967295)
            this.bufferBuilder.append(206), this.pack_uint32(t2);
          else if (t2 >= -2147483648 && t2 <= 2147483647)
            this.bufferBuilder.append(210), this.pack_int32(t2);
          else if (t2 >= -9223372036854776e3 && t2 <= 9223372036854776e3)
            this.bufferBuilder.append(211), this.pack_int64(t2);
          else {
            if (!(t2 >= 0 && t2 <= 18446744073709552e3))
              throw new Error("Invalid integer");
            this.bufferBuilder.append(207), this.pack_uint64(t2);
          }
        }, n.prototype.pack_double = function(t2) {
          var e2 = 0;
          t2 < 0 && (e2 = 1, t2 = -t2);
          var i2 = Math.floor(Math.log(t2) / Math.LN2), r2 = t2 / Math.pow(2, i2) - 1, n2 = Math.floor(r2 * Math.pow(2, 52)), u2 = Math.pow(2, 32), a2 = e2 << 31 | i2 + 1023 << 20 | n2 / u2 & 1048575, p = n2 % u2;
          this.bufferBuilder.append(203), this.pack_int32(a2), this.pack_int32(p);
        }, n.prototype.pack_object = function(t2) {
          var e2 = Object.keys(t2).length;
          if (e2 <= 15)
            this.pack_uint8(128 + e2);
          else if (e2 <= 65535)
            this.bufferBuilder.append(222), this.pack_uint16(e2);
          else {
            if (!(e2 <= 4294967295))
              throw new Error("Invalid length");
            this.bufferBuilder.append(223), this.pack_uint32(e2);
          }
          for (var i2 in t2)
            t2.hasOwnProperty(i2) && (this.pack(i2), this.pack(t2[i2]));
        }, n.prototype.pack_uint8 = function(t2) {
          this.bufferBuilder.append(t2);
        }, n.prototype.pack_uint16 = function(t2) {
          this.bufferBuilder.append(t2 >> 8), this.bufferBuilder.append(255 & t2);
        }, n.prototype.pack_uint32 = function(t2) {
          var e2 = 4294967295 & t2;
          this.bufferBuilder.append((4278190080 & e2) >>> 24), this.bufferBuilder.append((16711680 & e2) >>> 16), this.bufferBuilder.append((65280 & e2) >>> 8), this.bufferBuilder.append(255 & e2);
        }, n.prototype.pack_uint64 = function(t2) {
          var e2 = t2 / Math.pow(2, 32), i2 = t2 % Math.pow(2, 32);
          this.bufferBuilder.append((4278190080 & e2) >>> 24), this.bufferBuilder.append((16711680 & e2) >>> 16), this.bufferBuilder.append((65280 & e2) >>> 8), this.bufferBuilder.append(255 & e2), this.bufferBuilder.append((4278190080 & i2) >>> 24), this.bufferBuilder.append((16711680 & i2) >>> 16), this.bufferBuilder.append((65280 & i2) >>> 8), this.bufferBuilder.append(255 & i2);
        }, n.prototype.pack_int8 = function(t2) {
          this.bufferBuilder.append(255 & t2);
        }, n.prototype.pack_int16 = function(t2) {
          this.bufferBuilder.append((65280 & t2) >> 8), this.bufferBuilder.append(255 & t2);
        }, n.prototype.pack_int32 = function(t2) {
          this.bufferBuilder.append(t2 >>> 24 & 255), this.bufferBuilder.append((16711680 & t2) >>> 16), this.bufferBuilder.append((65280 & t2) >>> 8), this.bufferBuilder.append(255 & t2);
        }, n.prototype.pack_int64 = function(t2) {
          var e2 = Math.floor(t2 / Math.pow(2, 32)), i2 = t2 % Math.pow(2, 32);
          this.bufferBuilder.append((4278190080 & e2) >>> 24), this.bufferBuilder.append((16711680 & e2) >>> 16), this.bufferBuilder.append((65280 & e2) >>> 8), this.bufferBuilder.append(255 & e2), this.bufferBuilder.append((4278190080 & i2) >>> 24), this.bufferBuilder.append((16711680 & i2) >>> 16), this.bufferBuilder.append((65280 & i2) >>> 8), this.bufferBuilder.append(255 & i2);
        };
      }, { "./bufferbuilder": "EgBh" }], "iSxC": [function(require2, module2, exports2) {
        "use strict";
        function e(e2, t2, n2) {
          return t2 in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
        }
        function t(e2) {
          return (t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.extractVersion = o, exports2.wrapPeerConnectionEvent = i, exports2.disableLog = s, exports2.disableWarnings = a, exports2.log = p, exports2.deprecated = u, exports2.detectBrowser = c, exports2.compactObject = f, exports2.walkStats = l, exports2.filterStats = v;
        var n = true, r = true;
        function o(e2, t2, n2) {
          var r2 = e2.match(t2);
          return r2 && r2.length >= n2 && parseInt(r2[n2], 10);
        }
        function i(e2, t2, n2) {
          if (e2.RTCPeerConnection) {
            var r2 = e2.RTCPeerConnection.prototype, o2 = r2.addEventListener;
            r2.addEventListener = function(e3, r3) {
              if (e3 !== t2)
                return o2.apply(this, arguments);
              var i3 = function(e4) {
                var t3 = n2(e4);
                t3 && (r3.handleEvent ? r3.handleEvent(t3) : r3(t3));
              };
              return this._eventMap = this._eventMap || {}, this._eventMap[t2] || (this._eventMap[t2] = /* @__PURE__ */ new Map()), this._eventMap[t2].set(r3, i3), o2.apply(this, [e3, i3]);
            };
            var i2 = r2.removeEventListener;
            r2.removeEventListener = function(e3, n3) {
              if (e3 !== t2 || !this._eventMap || !this._eventMap[t2])
                return i2.apply(this, arguments);
              if (!this._eventMap[t2].has(n3))
                return i2.apply(this, arguments);
              var r3 = this._eventMap[t2].get(n3);
              return this._eventMap[t2].delete(n3), this._eventMap[t2].size === 0 && delete this._eventMap[t2], Object.keys(this._eventMap).length === 0 && delete this._eventMap, i2.apply(this, [e3, r3]);
            }, Object.defineProperty(r2, "on" + t2, { get: function() {
              return this["_on" + t2];
            }, set: function(e3) {
              this["_on" + t2] && (this.removeEventListener(t2, this["_on" + t2]), delete this["_on" + t2]), e3 && this.addEventListener(t2, this["_on" + t2] = e3);
            }, enumerable: true, configurable: true });
          }
        }
        function s(e2) {
          return typeof e2 != "boolean" ? new Error("Argument type: " + t(e2) + ". Please use a boolean.") : (n = e2, e2 ? "adapter.js logging disabled" : "adapter.js logging enabled");
        }
        function a(e2) {
          return typeof e2 != "boolean" ? new Error("Argument type: " + t(e2) + ". Please use a boolean.") : (r = !e2, "adapter.js deprecation warnings " + (e2 ? "disabled" : "enabled"));
        }
        function p() {
          if ((typeof window == "undefined" ? "undefined" : t(window)) === "object") {
            if (n)
              return;
            typeof console != "undefined" && typeof console.log == "function" && console.log.apply(console, arguments);
          }
        }
        function u(e2, t2) {
          r && console.warn(e2 + " is deprecated, please use " + t2 + " instead.");
        }
        function c(e2) {
          var t2 = { browser: null, version: null };
          if (e2 === void 0 || !e2.navigator)
            return t2.browser = "Not a browser.", t2;
          var { navigator: n2 } = e2;
          if (n2.mozGetUserMedia)
            t2.browser = "firefox", t2.version = o(n2.userAgent, /Firefox\/(\d+)\./, 1);
          else if (n2.webkitGetUserMedia || e2.isSecureContext === false && e2.webkitRTCPeerConnection && !e2.RTCIceGatherer)
            t2.browser = "chrome", t2.version = o(n2.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
          else if (n2.mediaDevices && n2.userAgent.match(/Edge\/(\d+).(\d+)$/))
            t2.browser = "edge", t2.version = o(n2.userAgent, /Edge\/(\d+).(\d+)$/, 2);
          else {
            if (!e2.RTCPeerConnection || !n2.userAgent.match(/AppleWebKit\/(\d+)\./))
              return t2.browser = "Not a supported browser.", t2;
            t2.browser = "safari", t2.version = o(n2.userAgent, /AppleWebKit\/(\d+)\./, 1), t2.supportsUnifiedPlan = e2.RTCRtpTransceiver && "currentDirection" in e2.RTCRtpTransceiver.prototype;
          }
          return t2;
        }
        function d(e2) {
          return Object.prototype.toString.call(e2) === "[object Object]";
        }
        function f(t2) {
          return d(t2) ? Object.keys(t2).reduce(function(n2, r2) {
            var o2 = d(t2[r2]), i2 = o2 ? f(t2[r2]) : t2[r2], s2 = o2 && !Object.keys(i2).length;
            return i2 === void 0 || s2 ? n2 : Object.assign(n2, e({}, r2, i2));
          }, {}) : t2;
        }
        function l(e2, t2, n2) {
          t2 && !n2.has(t2.id) && (n2.set(t2.id, t2), Object.keys(t2).forEach(function(r2) {
            r2.endsWith("Id") ? l(e2, e2.get(t2[r2]), n2) : r2.endsWith("Ids") && t2[r2].forEach(function(t3) {
              l(e2, e2.get(t3), n2);
            });
          }));
        }
        function v(e2, t2, n2) {
          var r2 = n2 ? "outbound-rtp" : "inbound-rtp", o2 = /* @__PURE__ */ new Map();
          if (t2 === null)
            return o2;
          var i2 = [];
          return e2.forEach(function(e3) {
            e3.type === "track" && e3.trackIdentifier === t2.id && i2.push(e3);
          }), i2.forEach(function(t3) {
            e2.forEach(function(n3) {
              n3.type === r2 && n3.trackId === t3.id && l(e2, n3, o2);
            });
          }), o2;
        }
      }, {}], "s6SN": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimGetUserMedia = i;
        var e = t(require2("../utils.js"));
        function r() {
          if (typeof WeakMap != "function")
            return null;
          var e2 = /* @__PURE__ */ new WeakMap();
          return r = function() {
            return e2;
          }, e2;
        }
        function t(e2) {
          if (e2 && e2.__esModule)
            return e2;
          if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
            return { default: e2 };
          var t2 = r();
          if (t2 && t2.has(e2))
            return t2.get(e2);
          var o2 = {}, n2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i2 in e2)
            if (Object.prototype.hasOwnProperty.call(e2, i2)) {
              var a = n2 ? Object.getOwnPropertyDescriptor(e2, i2) : null;
              a && (a.get || a.set) ? Object.defineProperty(o2, i2, a) : o2[i2] = e2[i2];
            }
          return o2.default = e2, t2 && t2.set(e2, o2), o2;
        }
        function o(e2) {
          return (o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        var n = e.log;
        function i(e2, r2) {
          var t2 = e2 && e2.navigator;
          if (t2.mediaDevices) {
            var i2 = function(e3) {
              if (o(e3) !== "object" || e3.mandatory || e3.optional)
                return e3;
              var r3 = {};
              return Object.keys(e3).forEach(function(t3) {
                if (t3 !== "require" && t3 !== "advanced" && t3 !== "mediaSource") {
                  var n2 = o(e3[t3]) === "object" ? e3[t3] : { ideal: e3[t3] };
                  n2.exact !== void 0 && typeof n2.exact == "number" && (n2.min = n2.max = n2.exact);
                  var i3 = function(e4, r4) {
                    return e4 ? e4 + r4.charAt(0).toUpperCase() + r4.slice(1) : r4 === "deviceId" ? "sourceId" : r4;
                  };
                  if (n2.ideal !== void 0) {
                    r3.optional = r3.optional || [];
                    var a2 = {};
                    typeof n2.ideal == "number" ? (a2[i3("min", t3)] = n2.ideal, r3.optional.push(a2), (a2 = {})[i3("max", t3)] = n2.ideal, r3.optional.push(a2)) : (a2[i3("", t3)] = n2.ideal, r3.optional.push(a2));
                  }
                  n2.exact !== void 0 && typeof n2.exact != "number" ? (r3.mandatory = r3.mandatory || {}, r3.mandatory[i3("", t3)] = n2.exact) : ["min", "max"].forEach(function(e4) {
                    n2[e4] !== void 0 && (r3.mandatory = r3.mandatory || {}, r3.mandatory[i3(e4, t3)] = n2[e4]);
                  });
                }
              }), e3.advanced && (r3.optional = (r3.optional || []).concat(e3.advanced)), r3;
            }, a = function(e3, a2) {
              if (r2.version >= 61)
                return a2(e3);
              if ((e3 = JSON.parse(JSON.stringify(e3))) && o(e3.audio) === "object") {
                var c2 = function(e4, r3, t3) {
                  r3 in e4 && !(t3 in e4) && (e4[t3] = e4[r3], delete e4[r3]);
                };
                c2((e3 = JSON.parse(JSON.stringify(e3))).audio, "autoGainControl", "googAutoGainControl"), c2(e3.audio, "noiseSuppression", "googNoiseSuppression"), e3.audio = i2(e3.audio);
              }
              if (e3 && o(e3.video) === "object") {
                var d2 = e3.video.facingMode;
                d2 = d2 && (o(d2) === "object" ? d2 : { ideal: d2 });
                var u, s = r2.version < 66;
                if (d2 && (d2.exact === "user" || d2.exact === "environment" || d2.ideal === "user" || d2.ideal === "environment") && (!t2.mediaDevices.getSupportedConstraints || !t2.mediaDevices.getSupportedConstraints().facingMode || s)) {
                  if (delete e3.video.facingMode, d2.exact === "environment" || d2.ideal === "environment" ? u = ["back", "rear"] : d2.exact !== "user" && d2.ideal !== "user" || (u = ["front"]), u)
                    return t2.mediaDevices.enumerateDevices().then(function(r3) {
                      var t3 = (r3 = r3.filter(function(e4) {
                        return e4.kind === "videoinput";
                      })).find(function(e4) {
                        return u.some(function(r4) {
                          return e4.label.toLowerCase().includes(r4);
                        });
                      });
                      return !t3 && r3.length && u.includes("back") && (t3 = r3[r3.length - 1]), t3 && (e3.video.deviceId = d2.exact ? { exact: t3.deviceId } : { ideal: t3.deviceId }), e3.video = i2(e3.video), n("chrome: " + JSON.stringify(e3)), a2(e3);
                    });
                }
                e3.video = i2(e3.video);
              }
              return n("chrome: " + JSON.stringify(e3)), a2(e3);
            }, c = function(e3) {
              return r2.version >= 64 ? e3 : { name: { PermissionDeniedError: "NotAllowedError", PermissionDismissedError: "NotAllowedError", InvalidStateError: "NotAllowedError", DevicesNotFoundError: "NotFoundError", ConstraintNotSatisfiedError: "OverconstrainedError", TrackStartError: "NotReadableError", MediaDeviceFailedDueToShutdown: "NotAllowedError", MediaDeviceKillSwitchOn: "NotAllowedError", TabCaptureError: "AbortError", ScreenCaptureError: "AbortError", DeviceCaptureError: "AbortError" }[e3.name] || e3.name, message: e3.message, constraint: e3.constraint || e3.constraintName, toString: function() {
                return this.name + (this.message && ": ") + this.message;
              } };
            };
            if (t2.getUserMedia = function(e3, r3, o2) {
              a(e3, function(e4) {
                t2.webkitGetUserMedia(e4, r3, function(e5) {
                  o2 && o2(c(e5));
                });
              });
            }.bind(t2), t2.mediaDevices.getUserMedia) {
              var d = t2.mediaDevices.getUserMedia.bind(t2.mediaDevices);
              t2.mediaDevices.getUserMedia = function(e3) {
                return a(e3, function(e4) {
                  return d(e4).then(function(r3) {
                    if (e4.audio && !r3.getAudioTracks().length || e4.video && !r3.getVideoTracks().length)
                      throw r3.getTracks().forEach(function(e5) {
                        e5.stop();
                      }), new DOMException("", "NotFoundError");
                    return r3;
                  }, function(e5) {
                    return Promise.reject(c(e5));
                  });
                });
              };
            }
          }
        }
      }, { "../utils.js": "iSxC" }], "VHa8": [function(require2, module2, exports2) {
        "use strict";
        function e(e2, i) {
          e2.navigator.mediaDevices && "getDisplayMedia" in e2.navigator.mediaDevices || e2.navigator.mediaDevices && (typeof i == "function" ? e2.navigator.mediaDevices.getDisplayMedia = function(a) {
            return i(a).then(function(i2) {
              var t = a.video && a.video.width, o = a.video && a.video.height, d = a.video && a.video.frameRate;
              return a.video = { mandatory: { chromeMediaSource: "desktop", chromeMediaSourceId: i2, maxFrameRate: d || 3 } }, t && (a.video.mandatory.maxWidth = t), o && (a.video.mandatory.maxHeight = o), e2.navigator.mediaDevices.getUserMedia(a);
            });
          } : console.error("shimGetDisplayMedia: getSourceId argument is not a function"));
        }
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimGetDisplayMedia = e;
      }, {}], "uI5X": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimMediaStream = a, exports2.shimOnTrack = c, exports2.shimGetSendersWithDtmf = p, exports2.shimGetStats = d, exports2.shimSenderReceiverGetStats = h, exports2.shimAddTrackRemoveTrackWithNative = f, exports2.shimAddTrackRemoveTrack = m, exports2.shimPeerConnection = u, exports2.fixNegotiationNeeded = l, Object.defineProperty(exports2, "shimGetUserMedia", { enumerable: true, get: function() {
          return t.shimGetUserMedia;
        } }), Object.defineProperty(exports2, "shimGetDisplayMedia", { enumerable: true, get: function() {
          return r.shimGetDisplayMedia;
        } });
        var e = i(require2("../utils.js")), t = require2("./getusermedia"), r = require2("./getdisplaymedia");
        function n() {
          if (typeof WeakMap != "function")
            return null;
          var e2 = /* @__PURE__ */ new WeakMap();
          return n = function() {
            return e2;
          }, e2;
        }
        function i(e2) {
          if (e2 && e2.__esModule)
            return e2;
          if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
            return { default: e2 };
          var t2 = n();
          if (t2 && t2.has(e2))
            return t2.get(e2);
          var r2 = {}, i2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var o2 in e2)
            if (Object.prototype.hasOwnProperty.call(e2, o2)) {
              var s2 = i2 ? Object.getOwnPropertyDescriptor(e2, o2) : null;
              s2 && (s2.get || s2.set) ? Object.defineProperty(r2, o2, s2) : r2[o2] = e2[o2];
            }
          return r2.default = e2, t2 && t2.set(e2, r2), r2;
        }
        function o(e2, t2, r2) {
          return t2 in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
        }
        function s(e2) {
          return (s = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        function a(e2) {
          e2.MediaStream = e2.MediaStream || e2.webkitMediaStream;
        }
        function c(t2) {
          if (s(t2) !== "object" || !t2.RTCPeerConnection || "ontrack" in t2.RTCPeerConnection.prototype)
            e.wrapPeerConnectionEvent(t2, "track", function(e2) {
              return e2.transceiver || Object.defineProperty(e2, "transceiver", { value: { receiver: e2.receiver } }), e2;
            });
          else {
            Object.defineProperty(t2.RTCPeerConnection.prototype, "ontrack", { get: function() {
              return this._ontrack;
            }, set: function(e2) {
              this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e2);
            }, enumerable: true, configurable: true });
            var r2 = t2.RTCPeerConnection.prototype.setRemoteDescription;
            t2.RTCPeerConnection.prototype.setRemoteDescription = function() {
              var e2 = this;
              return this._ontrackpoly || (this._ontrackpoly = function(r3) {
                r3.stream.addEventListener("addtrack", function(n2) {
                  var i2;
                  i2 = t2.RTCPeerConnection.prototype.getReceivers ? e2.getReceivers().find(function(e3) {
                    return e3.track && e3.track.id === n2.track.id;
                  }) : { track: n2.track };
                  var o2 = new Event("track");
                  o2.track = n2.track, o2.receiver = i2, o2.transceiver = { receiver: i2 }, o2.streams = [r3.stream], e2.dispatchEvent(o2);
                }), r3.stream.getTracks().forEach(function(n2) {
                  var i2;
                  i2 = t2.RTCPeerConnection.prototype.getReceivers ? e2.getReceivers().find(function(e3) {
                    return e3.track && e3.track.id === n2.id;
                  }) : { track: n2 };
                  var o2 = new Event("track");
                  o2.track = n2, o2.receiver = i2, o2.transceiver = { receiver: i2 }, o2.streams = [r3.stream], e2.dispatchEvent(o2);
                });
              }, this.addEventListener("addstream", this._ontrackpoly)), r2.apply(this, arguments);
            };
          }
        }
        function p(e2) {
          if (s(e2) === "object" && e2.RTCPeerConnection && !("getSenders" in e2.RTCPeerConnection.prototype) && "createDTMFSender" in e2.RTCPeerConnection.prototype) {
            var t2 = function(e3, t3) {
              return { track: t3, get dtmf() {
                return this._dtmf === void 0 && (t3.kind === "audio" ? this._dtmf = e3.createDTMFSender(t3) : this._dtmf = null), this._dtmf;
              }, _pc: e3 };
            };
            if (!e2.RTCPeerConnection.prototype.getSenders) {
              e2.RTCPeerConnection.prototype.getSenders = function() {
                return this._senders = this._senders || [], this._senders.slice();
              };
              var r2 = e2.RTCPeerConnection.prototype.addTrack;
              e2.RTCPeerConnection.prototype.addTrack = function(e3, n3) {
                var i3 = r2.apply(this, arguments);
                return i3 || (i3 = t2(this, e3), this._senders.push(i3)), i3;
              };
              var n2 = e2.RTCPeerConnection.prototype.removeTrack;
              e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
                n2.apply(this, arguments);
                var t3 = this._senders.indexOf(e3);
                t3 !== -1 && this._senders.splice(t3, 1);
              };
            }
            var i2 = e2.RTCPeerConnection.prototype.addStream;
            e2.RTCPeerConnection.prototype.addStream = function(e3) {
              var r3 = this;
              this._senders = this._senders || [], i2.apply(this, [e3]), e3.getTracks().forEach(function(e4) {
                r3._senders.push(t2(r3, e4));
              });
            };
            var o2 = e2.RTCPeerConnection.prototype.removeStream;
            e2.RTCPeerConnection.prototype.removeStream = function(e3) {
              var t3 = this;
              this._senders = this._senders || [], o2.apply(this, [e3]), e3.getTracks().forEach(function(e4) {
                var r3 = t3._senders.find(function(t4) {
                  return t4.track === e4;
                });
                r3 && t3._senders.splice(t3._senders.indexOf(r3), 1);
              });
            };
          } else if (s(e2) === "object" && e2.RTCPeerConnection && "getSenders" in e2.RTCPeerConnection.prototype && "createDTMFSender" in e2.RTCPeerConnection.prototype && e2.RTCRtpSender && !("dtmf" in e2.RTCRtpSender.prototype)) {
            var a2 = e2.RTCPeerConnection.prototype.getSenders;
            e2.RTCPeerConnection.prototype.getSenders = function() {
              var e3 = this, t3 = a2.apply(this, []);
              return t3.forEach(function(t4) {
                return t4._pc = e3;
              }), t3;
            }, Object.defineProperty(e2.RTCRtpSender.prototype, "dtmf", { get: function() {
              return this._dtmf === void 0 && (this.track.kind === "audio" ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
            } });
          }
        }
        function d(e2) {
          if (e2.RTCPeerConnection) {
            var t2 = e2.RTCPeerConnection.prototype.getStats;
            e2.RTCPeerConnection.prototype.getStats = function() {
              var e3 = this, [r2, n2, i2] = arguments;
              if (arguments.length > 0 && typeof r2 == "function")
                return t2.apply(this, arguments);
              if (t2.length === 0 && (arguments.length === 0 || typeof r2 != "function"))
                return t2.apply(this, []);
              var o2 = function(e4) {
                var t3 = {};
                return e4.result().forEach(function(e5) {
                  var r3 = { id: e5.id, timestamp: e5.timestamp, type: { localcandidate: "local-candidate", remotecandidate: "remote-candidate" }[e5.type] || e5.type };
                  e5.names().forEach(function(t4) {
                    r3[t4] = e5.stat(t4);
                  }), t3[r3.id] = r3;
                }), t3;
              }, s2 = function(e4) {
                return new Map(Object.keys(e4).map(function(t3) {
                  return [t3, e4[t3]];
                }));
              };
              if (arguments.length >= 2) {
                return t2.apply(this, [function(e4) {
                  n2(s2(o2(e4)));
                }, r2]);
              }
              return new Promise(function(r3, n3) {
                t2.apply(e3, [function(e4) {
                  r3(s2(o2(e4)));
                }, n3]);
              }).then(n2, i2);
            };
          }
        }
        function h(t2) {
          if (s(t2) === "object" && t2.RTCPeerConnection && t2.RTCRtpSender && t2.RTCRtpReceiver) {
            if (!("getStats" in t2.RTCRtpSender.prototype)) {
              var r2 = t2.RTCPeerConnection.prototype.getSenders;
              r2 && (t2.RTCPeerConnection.prototype.getSenders = function() {
                var e2 = this, t3 = r2.apply(this, []);
                return t3.forEach(function(t4) {
                  return t4._pc = e2;
                }), t3;
              });
              var n2 = t2.RTCPeerConnection.prototype.addTrack;
              n2 && (t2.RTCPeerConnection.prototype.addTrack = function() {
                var e2 = n2.apply(this, arguments);
                return e2._pc = this, e2;
              }), t2.RTCRtpSender.prototype.getStats = function() {
                var t3 = this;
                return this._pc.getStats().then(function(r3) {
                  return e.filterStats(r3, t3.track, true);
                });
              };
            }
            if (!("getStats" in t2.RTCRtpReceiver.prototype)) {
              var i2 = t2.RTCPeerConnection.prototype.getReceivers;
              i2 && (t2.RTCPeerConnection.prototype.getReceivers = function() {
                var e2 = this, t3 = i2.apply(this, []);
                return t3.forEach(function(t4) {
                  return t4._pc = e2;
                }), t3;
              }), e.wrapPeerConnectionEvent(t2, "track", function(e2) {
                return e2.receiver._pc = e2.srcElement, e2;
              }), t2.RTCRtpReceiver.prototype.getStats = function() {
                var t3 = this;
                return this._pc.getStats().then(function(r3) {
                  return e.filterStats(r3, t3.track, false);
                });
              };
            }
            if ("getStats" in t2.RTCRtpSender.prototype && "getStats" in t2.RTCRtpReceiver.prototype) {
              var o2 = t2.RTCPeerConnection.prototype.getStats;
              t2.RTCPeerConnection.prototype.getStats = function() {
                if (arguments.length > 0 && arguments[0] instanceof t2.MediaStreamTrack) {
                  var e2, r3, n3, i3 = arguments[0];
                  return this.getSenders().forEach(function(t3) {
                    t3.track === i3 && (e2 ? n3 = true : e2 = t3);
                  }), this.getReceivers().forEach(function(e3) {
                    return e3.track === i3 && (r3 ? n3 = true : r3 = e3), e3.track === i3;
                  }), n3 || e2 && r3 ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : e2 ? e2.getStats() : r3 ? r3.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
                }
                return o2.apply(this, arguments);
              };
            }
          }
        }
        function f(e2) {
          e2.RTCPeerConnection.prototype.getLocalStreams = function() {
            var e3 = this;
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(function(t3) {
              return e3._shimmedLocalStreams[t3][0];
            });
          };
          var t2 = e2.RTCPeerConnection.prototype.addTrack;
          e2.RTCPeerConnection.prototype.addTrack = function(e3, r3) {
            if (!r3)
              return t2.apply(this, arguments);
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            var n3 = t2.apply(this, arguments);
            return this._shimmedLocalStreams[r3.id] ? this._shimmedLocalStreams[r3.id].indexOf(n3) === -1 && this._shimmedLocalStreams[r3.id].push(n3) : this._shimmedLocalStreams[r3.id] = [r3, n3], n3;
          };
          var r2 = e2.RTCPeerConnection.prototype.addStream;
          e2.RTCPeerConnection.prototype.addStream = function(e3) {
            var t3 = this;
            this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e3.getTracks().forEach(function(e4) {
              if (t3.getSenders().find(function(t4) {
                return t4.track === e4;
              }))
                throw new DOMException("Track already exists.", "InvalidAccessError");
            });
            var n3 = this.getSenders();
            r2.apply(this, arguments);
            var i3 = this.getSenders().filter(function(e4) {
              return n3.indexOf(e4) === -1;
            });
            this._shimmedLocalStreams[e3.id] = [e3].concat(i3);
          };
          var n2 = e2.RTCPeerConnection.prototype.removeStream;
          e2.RTCPeerConnection.prototype.removeStream = function(e3) {
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e3.id], n2.apply(this, arguments);
          };
          var i2 = e2.RTCPeerConnection.prototype.removeTrack;
          e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
            var t3 = this;
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e3 && Object.keys(this._shimmedLocalStreams).forEach(function(r3) {
              var n3 = t3._shimmedLocalStreams[r3].indexOf(e3);
              n3 !== -1 && t3._shimmedLocalStreams[r3].splice(n3, 1), t3._shimmedLocalStreams[r3].length === 1 && delete t3._shimmedLocalStreams[r3];
            }), i2.apply(this, arguments);
          };
        }
        function m(e2, t2) {
          if (e2.RTCPeerConnection) {
            if (e2.RTCPeerConnection.prototype.addTrack && t2.version >= 65)
              return f(e2);
            var r2 = e2.RTCPeerConnection.prototype.getLocalStreams;
            e2.RTCPeerConnection.prototype.getLocalStreams = function() {
              var e3 = this, t3 = r2.apply(this);
              return this._reverseStreams = this._reverseStreams || {}, t3.map(function(t4) {
                return e3._reverseStreams[t4.id];
              });
            };
            var n2 = e2.RTCPeerConnection.prototype.addStream;
            e2.RTCPeerConnection.prototype.addStream = function(t3) {
              var r3 = this;
              if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, t3.getTracks().forEach(function(e3) {
                if (r3.getSenders().find(function(t4) {
                  return t4.track === e3;
                }))
                  throw new DOMException("Track already exists.", "InvalidAccessError");
              }), !this._reverseStreams[t3.id]) {
                var i3 = new e2.MediaStream(t3.getTracks());
                this._streams[t3.id] = i3, this._reverseStreams[i3.id] = t3, t3 = i3;
              }
              n2.apply(this, [t3]);
            };
            var i2 = e2.RTCPeerConnection.prototype.removeStream;
            e2.RTCPeerConnection.prototype.removeStream = function(e3) {
              this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, i2.apply(this, [this._streams[e3.id] || e3]), delete this._reverseStreams[this._streams[e3.id] ? this._streams[e3.id].id : e3.id], delete this._streams[e3.id];
            }, e2.RTCPeerConnection.prototype.addTrack = function(t3, r3) {
              var n3 = this;
              if (this.signalingState === "closed")
                throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
              var i3 = [].slice.call(arguments, 1);
              if (i3.length !== 1 || !i3[0].getTracks().find(function(e3) {
                return e3 === t3;
              }))
                throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
              if (this.getSenders().find(function(e3) {
                return e3.track === t3;
              }))
                throw new DOMException("Track already exists.", "InvalidAccessError");
              this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
              var o2 = this._streams[r3.id];
              if (o2)
                o2.addTrack(t3), Promise.resolve().then(function() {
                  n3.dispatchEvent(new Event("negotiationneeded"));
                });
              else {
                var s3 = new e2.MediaStream([t3]);
                this._streams[r3.id] = s3, this._reverseStreams[s3.id] = r3, this.addStream(s3);
              }
              return this.getSenders().find(function(e3) {
                return e3.track === t3;
              });
            }, ["createOffer", "createAnswer"].forEach(function(t3) {
              var r3 = e2.RTCPeerConnection.prototype[t3], n3 = o({}, t3, function() {
                var e3 = this, t4 = arguments;
                return arguments.length && typeof arguments[0] == "function" ? r3.apply(this, [function(r4) {
                  var n4 = c2(e3, r4);
                  t4[0].apply(null, [n4]);
                }, function(e4) {
                  t4[1] && t4[1].apply(null, e4);
                }, arguments[2]]) : r3.apply(this, arguments).then(function(t5) {
                  return c2(e3, t5);
                });
              });
              e2.RTCPeerConnection.prototype[t3] = n3[t3];
            });
            var s2 = e2.RTCPeerConnection.prototype.setLocalDescription;
            e2.RTCPeerConnection.prototype.setLocalDescription = function() {
              return arguments.length && arguments[0].type ? (arguments[0] = (e3 = this, t3 = arguments[0], r3 = t3.sdp, Object.keys(e3._reverseStreams || []).forEach(function(t4) {
                var n3 = e3._reverseStreams[t4], i3 = e3._streams[n3.id];
                r3 = r3.replace(new RegExp(n3.id, "g"), i3.id);
              }), new RTCSessionDescription({ type: t3.type, sdp: r3 })), s2.apply(this, arguments)) : s2.apply(this, arguments);
              var e3, t3, r3;
            };
            var a2 = Object.getOwnPropertyDescriptor(e2.RTCPeerConnection.prototype, "localDescription");
            Object.defineProperty(e2.RTCPeerConnection.prototype, "localDescription", { get: function() {
              var e3 = a2.get.apply(this);
              return e3.type === "" ? e3 : c2(this, e3);
            } }), e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
              var t3, r3 = this;
              if (this.signalingState === "closed")
                throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
              if (!e3._pc)
                throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
              if (!(e3._pc === this))
                throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
              this._streams = this._streams || {}, Object.keys(this._streams).forEach(function(n3) {
                r3._streams[n3].getTracks().find(function(t4) {
                  return e3.track === t4;
                }) && (t3 = r3._streams[n3]);
              }), t3 && (t3.getTracks().length === 1 ? this.removeStream(this._reverseStreams[t3.id]) : t3.removeTrack(e3.track), this.dispatchEvent(new Event("negotiationneeded")));
            };
          }
          function c2(e3, t3) {
            var r3 = t3.sdp;
            return Object.keys(e3._reverseStreams || []).forEach(function(t4) {
              var n3 = e3._reverseStreams[t4], i3 = e3._streams[n3.id];
              r3 = r3.replace(new RegExp(i3.id, "g"), n3.id);
            }), new RTCSessionDescription({ type: t3.type, sdp: r3 });
          }
        }
        function u(e2, t2) {
          !e2.RTCPeerConnection && e2.webkitRTCPeerConnection && (e2.RTCPeerConnection = e2.webkitRTCPeerConnection), e2.RTCPeerConnection && t2.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t3) {
            var r2 = e2.RTCPeerConnection.prototype[t3], n2 = o({}, t3, function() {
              return arguments[0] = new (t3 === "addIceCandidate" ? e2.RTCIceCandidate : e2.RTCSessionDescription)(arguments[0]), r2.apply(this, arguments);
            });
            e2.RTCPeerConnection.prototype[t3] = n2[t3];
          });
        }
        function l(t2, r2) {
          e.wrapPeerConnectionEvent(t2, "negotiationneeded", function(e2) {
            var t3 = e2.target;
            if (!(r2.version < 72 || t3.getConfiguration && t3.getConfiguration().sdpSemantics === "plan-b") || t3.signalingState === "stable")
              return e2;
          });
        }
      }, { "../utils.js": "iSxC", "./getusermedia": "s6SN", "./getdisplaymedia": "VHa8" }], "NZ1C": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.filterIceServers = n;
        var r = t(require2("../utils"));
        function e() {
          if (typeof WeakMap != "function")
            return null;
          var r2 = /* @__PURE__ */ new WeakMap();
          return e = function() {
            return r2;
          }, r2;
        }
        function t(r2) {
          if (r2 && r2.__esModule)
            return r2;
          if (r2 === null || typeof r2 != "object" && typeof r2 != "function")
            return { default: r2 };
          var t2 = e();
          if (t2 && t2.has(r2))
            return t2.get(r2);
          var n2 = {}, u = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in r2)
            if (Object.prototype.hasOwnProperty.call(r2, i)) {
              var f = u ? Object.getOwnPropertyDescriptor(r2, i) : null;
              f && (f.get || f.set) ? Object.defineProperty(n2, i, f) : n2[i] = r2[i];
            }
          return n2.default = r2, t2 && t2.set(r2, n2), n2;
        }
        function n(e2, t2) {
          var n2 = false;
          return (e2 = JSON.parse(JSON.stringify(e2))).filter(function(e3) {
            if (e3 && (e3.urls || e3.url)) {
              var t3 = e3.urls || e3.url;
              e3.url && !e3.urls && r.deprecated("RTCIceServer.url", "RTCIceServer.urls");
              var u = typeof t3 == "string";
              return u && (t3 = [t3]), t3 = t3.filter(function(r2) {
                if (r2.indexOf("stun:") === 0)
                  return false;
                var e4 = r2.startsWith("turn") && !r2.startsWith("turn:[") && r2.includes("transport=udp");
                return e4 && !n2 ? (n2 = true, true) : e4 && !n2;
              }), delete e3.url, e3.urls = u ? t3[0] : t3, !!t3.length;
            }
          });
        }
      }, { "../utils": "iSxC" }], "YHvh": [function(require2, module2, exports2) {
        "use strict";
        var r = { generateIdentifier: function() {
          return Math.random().toString(36).substr(2, 10);
        } };
        r.localCName = r.generateIdentifier(), r.splitLines = function(r2) {
          return r2.trim().split("\n").map(function(r3) {
            return r3.trim();
          });
        }, r.splitSections = function(r2) {
          return r2.split("\nm=").map(function(r3, e) {
            return (e > 0 ? "m=" + r3 : r3).trim() + "\r\n";
          });
        }, r.getDescription = function(e) {
          var t = r.splitSections(e);
          return t && t[0];
        }, r.getMediaSections = function(e) {
          var t = r.splitSections(e);
          return t.shift(), t;
        }, r.matchPrefix = function(e, t) {
          return r.splitLines(e).filter(function(r2) {
            return r2.indexOf(t) === 0;
          });
        }, r.parseCandidate = function(r2) {
          for (var e, t = { foundation: (e = r2.indexOf("a=candidate:") === 0 ? r2.substring(12).split(" ") : r2.substring(10).split(" "))[0], component: parseInt(e[1], 10), protocol: e[2].toLowerCase(), priority: parseInt(e[3], 10), ip: e[4], address: e[4], port: parseInt(e[5], 10), type: e[7] }, a = 8; a < e.length; a += 2)
            switch (e[a]) {
              case "raddr":
                t.relatedAddress = e[a + 1];
                break;
              case "rport":
                t.relatedPort = parseInt(e[a + 1], 10);
                break;
              case "tcptype":
                t.tcpType = e[a + 1];
                break;
              case "ufrag":
                t.ufrag = e[a + 1], t.usernameFragment = e[a + 1];
                break;
              default:
                t[e[a]] = e[a + 1];
            }
          return t;
        }, r.writeCandidate = function(r2) {
          var e = [];
          e.push(r2.foundation), e.push(r2.component), e.push(r2.protocol.toUpperCase()), e.push(r2.priority), e.push(r2.address || r2.ip), e.push(r2.port);
          var t = r2.type;
          return e.push("typ"), e.push(t), t !== "host" && r2.relatedAddress && r2.relatedPort && (e.push("raddr"), e.push(r2.relatedAddress), e.push("rport"), e.push(r2.relatedPort)), r2.tcpType && r2.protocol.toLowerCase() === "tcp" && (e.push("tcptype"), e.push(r2.tcpType)), (r2.usernameFragment || r2.ufrag) && (e.push("ufrag"), e.push(r2.usernameFragment || r2.ufrag)), "candidate:" + e.join(" ");
        }, r.parseIceOptions = function(r2) {
          return r2.substr(14).split(" ");
        }, r.parseRtpMap = function(r2) {
          var e = r2.substr(9).split(" "), t = { payloadType: parseInt(e.shift(), 10) };
          return e = e[0].split("/"), t.name = e[0], t.clockRate = parseInt(e[1], 10), t.channels = e.length === 3 ? parseInt(e[2], 10) : 1, t.numChannels = t.channels, t;
        }, r.writeRtpMap = function(r2) {
          var e = r2.payloadType;
          r2.preferredPayloadType !== void 0 && (e = r2.preferredPayloadType);
          var t = r2.channels || r2.numChannels || 1;
          return "a=rtpmap:" + e + " " + r2.name + "/" + r2.clockRate + (t !== 1 ? "/" + t : "") + "\r\n";
        }, r.parseExtmap = function(r2) {
          var e = r2.substr(9).split(" ");
          return { id: parseInt(e[0], 10), direction: e[0].indexOf("/") > 0 ? e[0].split("/")[1] : "sendrecv", uri: e[1] };
        }, r.writeExtmap = function(r2) {
          return "a=extmap:" + (r2.id || r2.preferredId) + (r2.direction && r2.direction !== "sendrecv" ? "/" + r2.direction : "") + " " + r2.uri + "\r\n";
        }, r.parseFmtp = function(r2) {
          for (var e, t = {}, a = r2.substr(r2.indexOf(" ") + 1).split(";"), n = 0; n < a.length; n++)
            t[(e = a[n].trim().split("="))[0].trim()] = e[1];
          return t;
        }, r.writeFmtp = function(r2) {
          var e = "", t = r2.payloadType;
          if (r2.preferredPayloadType !== void 0 && (t = r2.preferredPayloadType), r2.parameters && Object.keys(r2.parameters).length) {
            var a = [];
            Object.keys(r2.parameters).forEach(function(e2) {
              r2.parameters[e2] ? a.push(e2 + "=" + r2.parameters[e2]) : a.push(e2);
            }), e += "a=fmtp:" + t + " " + a.join(";") + "\r\n";
          }
          return e;
        }, r.parseRtcpFb = function(r2) {
          var e = r2.substr(r2.indexOf(" ") + 1).split(" ");
          return { type: e.shift(), parameter: e.join(" ") };
        }, r.writeRtcpFb = function(r2) {
          var e = "", t = r2.payloadType;
          return r2.preferredPayloadType !== void 0 && (t = r2.preferredPayloadType), r2.rtcpFeedback && r2.rtcpFeedback.length && r2.rtcpFeedback.forEach(function(r3) {
            e += "a=rtcp-fb:" + t + " " + r3.type + (r3.parameter && r3.parameter.length ? " " + r3.parameter : "") + "\r\n";
          }), e;
        }, r.parseSsrcMedia = function(r2) {
          var e = r2.indexOf(" "), t = { ssrc: parseInt(r2.substr(7, e - 7), 10) }, a = r2.indexOf(":", e);
          return a > -1 ? (t.attribute = r2.substr(e + 1, a - e - 1), t.value = r2.substr(a + 1)) : t.attribute = r2.substr(e + 1), t;
        }, r.parseSsrcGroup = function(r2) {
          var e = r2.substr(13).split(" ");
          return { semantics: e.shift(), ssrcs: e.map(function(r3) {
            return parseInt(r3, 10);
          }) };
        }, r.getMid = function(e) {
          var t = r.matchPrefix(e, "a=mid:")[0];
          if (t)
            return t.substr(6);
        }, r.parseFingerprint = function(r2) {
          var e = r2.substr(14).split(" ");
          return { algorithm: e[0].toLowerCase(), value: e[1] };
        }, r.getDtlsParameters = function(e, t) {
          return { role: "auto", fingerprints: r.matchPrefix(e + t, "a=fingerprint:").map(r.parseFingerprint) };
        }, r.writeDtlsParameters = function(r2, e) {
          var t = "a=setup:" + e + "\r\n";
          return r2.fingerprints.forEach(function(r3) {
            t += "a=fingerprint:" + r3.algorithm + " " + r3.value + "\r\n";
          }), t;
        }, r.parseCryptoLine = function(r2) {
          var e = r2.substr(9).split(" ");
          return { tag: parseInt(e[0], 10), cryptoSuite: e[1], keyParams: e[2], sessionParams: e.slice(3) };
        }, r.writeCryptoLine = function(e) {
          return "a=crypto:" + e.tag + " " + e.cryptoSuite + " " + (typeof e.keyParams == "object" ? r.writeCryptoKeyParams(e.keyParams) : e.keyParams) + (e.sessionParams ? " " + e.sessionParams.join(" ") : "") + "\r\n";
        }, r.parseCryptoKeyParams = function(r2) {
          if (r2.indexOf("inline:") !== 0)
            return null;
          var e = r2.substr(7).split("|");
          return { keyMethod: "inline", keySalt: e[0], lifeTime: e[1], mkiValue: e[2] ? e[2].split(":")[0] : void 0, mkiLength: e[2] ? e[2].split(":")[1] : void 0 };
        }, r.writeCryptoKeyParams = function(r2) {
          return r2.keyMethod + ":" + r2.keySalt + (r2.lifeTime ? "|" + r2.lifeTime : "") + (r2.mkiValue && r2.mkiLength ? "|" + r2.mkiValue + ":" + r2.mkiLength : "");
        }, r.getCryptoParameters = function(e, t) {
          return r.matchPrefix(e + t, "a=crypto:").map(r.parseCryptoLine);
        }, r.getIceParameters = function(e, t) {
          var a = r.matchPrefix(e + t, "a=ice-ufrag:")[0], n = r.matchPrefix(e + t, "a=ice-pwd:")[0];
          return a && n ? { usernameFragment: a.substr(12), password: n.substr(10) } : null;
        }, r.writeIceParameters = function(r2) {
          return "a=ice-ufrag:" + r2.usernameFragment + "\r\na=ice-pwd:" + r2.password + "\r\n";
        }, r.parseRtpParameters = function(e) {
          for (var t = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] }, a = r.splitLines(e)[0].split(" "), n = 3; n < a.length; n++) {
            var s = a[n], i = r.matchPrefix(e, "a=rtpmap:" + s + " ")[0];
            if (i) {
              var p = r.parseRtpMap(i), c = r.matchPrefix(e, "a=fmtp:" + s + " ");
              switch (p.parameters = c.length ? r.parseFmtp(c[0]) : {}, p.rtcpFeedback = r.matchPrefix(e, "a=rtcp-fb:" + s + " ").map(r.parseRtcpFb), t.codecs.push(p), p.name.toUpperCase()) {
                case "RED":
                case "ULPFEC":
                  t.fecMechanisms.push(p.name.toUpperCase());
              }
            }
          }
          return r.matchPrefix(e, "a=extmap:").forEach(function(e2) {
            t.headerExtensions.push(r.parseExtmap(e2));
          }), t;
        }, r.writeRtpDescription = function(e, t) {
          var a = "";
          a += "m=" + e + " ", a += t.codecs.length > 0 ? "9" : "0", a += " UDP/TLS/RTP/SAVPF ", a += t.codecs.map(function(r2) {
            return r2.preferredPayloadType !== void 0 ? r2.preferredPayloadType : r2.payloadType;
          }).join(" ") + "\r\n", a += "c=IN IP4 0.0.0.0\r\n", a += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function(e2) {
            a += r.writeRtpMap(e2), a += r.writeFmtp(e2), a += r.writeRtcpFb(e2);
          });
          var n = 0;
          return t.codecs.forEach(function(r2) {
            r2.maxptime > n && (n = r2.maxptime);
          }), n > 0 && (a += "a=maxptime:" + n + "\r\n"), a += "a=rtcp-mux\r\n", t.headerExtensions && t.headerExtensions.forEach(function(e2) {
            a += r.writeExtmap(e2);
          }), a;
        }, r.parseRtpEncodingParameters = function(e) {
          var t, a = [], n = r.parseRtpParameters(e), s = n.fecMechanisms.indexOf("RED") !== -1, i = n.fecMechanisms.indexOf("ULPFEC") !== -1, p = r.matchPrefix(e, "a=ssrc:").map(function(e2) {
            return r.parseSsrcMedia(e2);
          }).filter(function(r2) {
            return r2.attribute === "cname";
          }), c = p.length > 0 && p[0].ssrc, o = r.matchPrefix(e, "a=ssrc-group:FID").map(function(r2) {
            return r2.substr(17).split(" ").map(function(r3) {
              return parseInt(r3, 10);
            });
          });
          o.length > 0 && o[0].length > 1 && o[0][0] === c && (t = o[0][1]), n.codecs.forEach(function(r2) {
            if (r2.name.toUpperCase() === "RTX" && r2.parameters.apt) {
              var e2 = { ssrc: c, codecPayloadType: parseInt(r2.parameters.apt, 10) };
              c && t && (e2.rtx = { ssrc: t }), a.push(e2), s && ((e2 = JSON.parse(JSON.stringify(e2))).fec = { ssrc: c, mechanism: i ? "red+ulpfec" : "red" }, a.push(e2));
            }
          }), a.length === 0 && c && a.push({ ssrc: c });
          var u = r.matchPrefix(e, "b=");
          return u.length && (u = u[0].indexOf("b=TIAS:") === 0 ? parseInt(u[0].substr(7), 10) : u[0].indexOf("b=AS:") === 0 ? 1e3 * parseInt(u[0].substr(5), 10) * 0.95 - 16e3 : void 0, a.forEach(function(r2) {
            r2.maxBitrate = u;
          })), a;
        }, r.parseRtcpParameters = function(e) {
          var t = {}, a = r.matchPrefix(e, "a=ssrc:").map(function(e2) {
            return r.parseSsrcMedia(e2);
          }).filter(function(r2) {
            return r2.attribute === "cname";
          })[0];
          a && (t.cname = a.value, t.ssrc = a.ssrc);
          var n = r.matchPrefix(e, "a=rtcp-rsize");
          t.reducedSize = n.length > 0, t.compound = n.length === 0;
          var s = r.matchPrefix(e, "a=rtcp-mux");
          return t.mux = s.length > 0, t;
        }, r.parseMsid = function(e) {
          var t, a = r.matchPrefix(e, "a=msid:");
          if (a.length === 1)
            return { stream: (t = a[0].substr(7).split(" "))[0], track: t[1] };
          var n = r.matchPrefix(e, "a=ssrc:").map(function(e2) {
            return r.parseSsrcMedia(e2);
          }).filter(function(r2) {
            return r2.attribute === "msid";
          });
          return n.length > 0 ? { stream: (t = n[0].value.split(" "))[0], track: t[1] } : void 0;
        }, r.parseSctpDescription = function(e) {
          var t, a = r.parseMLine(e), n = r.matchPrefix(e, "a=max-message-size:");
          n.length > 0 && (t = parseInt(n[0].substr(19), 10)), isNaN(t) && (t = 65536);
          var s = r.matchPrefix(e, "a=sctp-port:");
          if (s.length > 0)
            return { port: parseInt(s[0].substr(12), 10), protocol: a.fmt, maxMessageSize: t };
          if (r.matchPrefix(e, "a=sctpmap:").length > 0) {
            var i = r.matchPrefix(e, "a=sctpmap:")[0].substr(10).split(" ");
            return { port: parseInt(i[0], 10), protocol: i[1], maxMessageSize: t };
          }
        }, r.writeSctpDescription = function(r2, e) {
          var t = [];
          return t = r2.protocol !== "DTLS/SCTP" ? ["m=" + r2.kind + " 9 " + r2.protocol + " " + e.protocol + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctp-port:" + e.port + "\r\n"] : ["m=" + r2.kind + " 9 " + r2.protocol + " " + e.port + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctpmap:" + e.port + " " + e.protocol + " 65535\r\n"], e.maxMessageSize !== void 0 && t.push("a=max-message-size:" + e.maxMessageSize + "\r\n"), t.join("");
        }, r.generateSessionId = function() {
          return Math.random().toString().substr(2, 21);
        }, r.writeSessionBoilerplate = function(e, t, a) {
          var n = t !== void 0 ? t : 2;
          return "v=0\r\no=" + (a || "thisisadapterortc") + " " + (e || r.generateSessionId()) + " " + n + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n";
        }, r.writeMediaSection = function(e, t, a, n) {
          var s = r.writeRtpDescription(e.kind, t);
          if (s += r.writeIceParameters(e.iceGatherer.getLocalParameters()), s += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), a === "offer" ? "actpass" : "active"), s += "a=mid:" + e.mid + "\r\n", e.direction ? s += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? s += "a=sendrecv\r\n" : e.rtpSender ? s += "a=sendonly\r\n" : e.rtpReceiver ? s += "a=recvonly\r\n" : s += "a=inactive\r\n", e.rtpSender) {
            var i = "msid:" + n.id + " " + e.rtpSender.track.id + "\r\n";
            s += "a=" + i, s += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + i, e.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + i, s += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n");
          }
          return s += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"), s;
        }, r.getDirection = function(e, t) {
          for (var a = r.splitLines(e), n = 0; n < a.length; n++)
            switch (a[n]) {
              case "a=sendrecv":
              case "a=sendonly":
              case "a=recvonly":
              case "a=inactive":
                return a[n].substr(2);
            }
          return t ? r.getDirection(t) : "sendrecv";
        }, r.getKind = function(e) {
          return r.splitLines(e)[0].split(" ")[0].substr(2);
        }, r.isRejected = function(r2) {
          return r2.split(" ", 2)[1] === "0";
        }, r.parseMLine = function(e) {
          var t = r.splitLines(e)[0].substr(2).split(" ");
          return { kind: t[0], port: parseInt(t[1], 10), protocol: t[2], fmt: t.slice(3).join(" ") };
        }, r.parseOLine = function(e) {
          var t = r.matchPrefix(e, "o=")[0].substr(2).split(" ");
          return { username: t[0], sessionId: t[1], sessionVersion: parseInt(t[2], 10), netType: t[3], addressType: t[4], address: t[5] };
        }, r.isValidSDP = function(e) {
          if (typeof e != "string" || e.length === 0)
            return false;
          for (var t = r.splitLines(e), a = 0; a < t.length; a++)
            if (t[a].length < 2 || t[a].charAt(1) !== "=")
              return false;
          return true;
        }, typeof module2 == "object" && (module2.exports = r);
      }, {}], "NJ2u": [function(require2, module2, exports2) {
        "use strict";
        var e = require2("sdp");
        function t(e2) {
          return { inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate" }[e2.type] || e2.type;
        }
        function r(t2, r2, n2, a2, i2) {
          var s2 = e.writeRtpDescription(t2.kind, r2);
          if (s2 += e.writeIceParameters(t2.iceGatherer.getLocalParameters()), s2 += e.writeDtlsParameters(t2.dtlsTransport.getLocalParameters(), n2 === "offer" ? "actpass" : i2 || "active"), s2 += "a=mid:" + t2.mid + "\r\n", t2.rtpSender && t2.rtpReceiver ? s2 += "a=sendrecv\r\n" : t2.rtpSender ? s2 += "a=sendonly\r\n" : t2.rtpReceiver ? s2 += "a=recvonly\r\n" : s2 += "a=inactive\r\n", t2.rtpSender) {
            var o2 = t2.rtpSender._initialTrackId || t2.rtpSender.track.id;
            t2.rtpSender._initialTrackId = o2;
            var c = "msid:" + (a2 ? a2.id : "-") + " " + o2 + "\r\n";
            s2 += "a=" + c, s2 += "a=ssrc:" + t2.sendEncodingParameters[0].ssrc + " " + c, t2.sendEncodingParameters[0].rtx && (s2 += "a=ssrc:" + t2.sendEncodingParameters[0].rtx.ssrc + " " + c, s2 += "a=ssrc-group:FID " + t2.sendEncodingParameters[0].ssrc + " " + t2.sendEncodingParameters[0].rtx.ssrc + "\r\n");
          }
          return s2 += "a=ssrc:" + t2.sendEncodingParameters[0].ssrc + " cname:" + e.localCName + "\r\n", t2.rtpSender && t2.sendEncodingParameters[0].rtx && (s2 += "a=ssrc:" + t2.sendEncodingParameters[0].rtx.ssrc + " cname:" + e.localCName + "\r\n"), s2;
        }
        function n(e2, t2) {
          var r2 = false;
          return (e2 = JSON.parse(JSON.stringify(e2))).filter(function(e3) {
            if (e3 && (e3.urls || e3.url)) {
              var n2 = e3.urls || e3.url;
              e3.url && !e3.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
              var a2 = typeof n2 == "string";
              return a2 && (n2 = [n2]), n2 = n2.filter(function(e4) {
                return e4.indexOf("turn:") === 0 && e4.indexOf("transport=udp") !== -1 && e4.indexOf("turn:[") === -1 && !r2 ? (r2 = true, true) : e4.indexOf("stun:") === 0 && t2 >= 14393 && e4.indexOf("?transport=udp") === -1;
              }), delete e3.url, e3.urls = a2 ? n2[0] : n2, !!n2.length;
            }
          });
        }
        function a(e2, t2) {
          var r2 = { codecs: [], headerExtensions: [], fecMechanisms: [] }, n2 = function(e3, t3) {
            e3 = parseInt(e3, 10);
            for (var r3 = 0; r3 < t3.length; r3++)
              if (t3[r3].payloadType === e3 || t3[r3].preferredPayloadType === e3)
                return t3[r3];
          }, a2 = function(e3, t3, r3, a3) {
            var i2 = n2(e3.parameters.apt, r3), s2 = n2(t3.parameters.apt, a3);
            return i2 && s2 && i2.name.toLowerCase() === s2.name.toLowerCase();
          };
          return e2.codecs.forEach(function(n3) {
            for (var i2 = 0; i2 < t2.codecs.length; i2++) {
              var s2 = t2.codecs[i2];
              if (n3.name.toLowerCase() === s2.name.toLowerCase() && n3.clockRate === s2.clockRate) {
                if (n3.name.toLowerCase() === "rtx" && n3.parameters && s2.parameters.apt && !a2(n3, s2, e2.codecs, t2.codecs))
                  continue;
                (s2 = JSON.parse(JSON.stringify(s2))).numChannels = Math.min(n3.numChannels, s2.numChannels), r2.codecs.push(s2), s2.rtcpFeedback = s2.rtcpFeedback.filter(function(e3) {
                  for (var t3 = 0; t3 < n3.rtcpFeedback.length; t3++)
                    if (n3.rtcpFeedback[t3].type === e3.type && n3.rtcpFeedback[t3].parameter === e3.parameter)
                      return true;
                  return false;
                });
                break;
              }
            }
          }), e2.headerExtensions.forEach(function(e3) {
            for (var n3 = 0; n3 < t2.headerExtensions.length; n3++) {
              var a3 = t2.headerExtensions[n3];
              if (e3.uri === a3.uri) {
                r2.headerExtensions.push(a3);
                break;
              }
            }
          }), r2;
        }
        function i(e2, t2, r2) {
          return { offer: { setLocalDescription: ["stable", "have-local-offer"], setRemoteDescription: ["stable", "have-remote-offer"] }, answer: { setLocalDescription: ["have-remote-offer", "have-local-pranswer"], setRemoteDescription: ["have-local-offer", "have-remote-pranswer"] } }[t2][e2].indexOf(r2) !== -1;
        }
        function s(e2, t2) {
          var r2 = e2.getRemoteCandidates().find(function(e3) {
            return t2.foundation === e3.foundation && t2.ip === e3.ip && t2.port === e3.port && t2.priority === e3.priority && t2.protocol === e3.protocol && t2.type === e3.type;
          });
          return r2 || e2.addRemoteCandidate(t2), !r2;
        }
        function o(e2, t2) {
          var r2 = new Error(t2);
          return r2.name = e2, r2.code = { NotSupportedError: 9, InvalidStateError: 11, InvalidAccessError: 15, TypeError: void 0, OperationError: void 0 }[e2], r2;
        }
        module2.exports = function(c, d) {
          function p(e2, t2) {
            t2.addTrack(e2), t2.dispatchEvent(new c.MediaStreamTrackEvent("addtrack", { track: e2 }));
          }
          function l(e2, t2, r2, n2) {
            var a2 = new Event("track");
            a2.track = t2, a2.receiver = r2, a2.transceiver = { receiver: r2 }, a2.streams = n2, c.setTimeout(function() {
              e2._dispatchEvent("track", a2);
            });
          }
          var f = function(t2) {
            var r2 = this, a2 = document.createDocumentFragment();
            if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e2) {
              r2[e2] = a2[e2].bind(a2);
            }), this.canTrickleIceCandidates = null, this.needNegotiation = false, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", t2 = JSON.parse(JSON.stringify(t2 || {})), this.usingBundle = t2.bundlePolicy === "max-bundle", t2.rtcpMuxPolicy === "negotiate")
              throw o("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
            switch (t2.rtcpMuxPolicy || (t2.rtcpMuxPolicy = "require"), t2.iceTransportPolicy) {
              case "all":
              case "relay":
                break;
              default:
                t2.iceTransportPolicy = "all";
            }
            switch (t2.bundlePolicy) {
              case "balanced":
              case "max-compat":
              case "max-bundle":
                break;
              default:
                t2.bundlePolicy = "balanced";
            }
            if (t2.iceServers = n(t2.iceServers || [], d), this._iceGatherers = [], t2.iceCandidatePoolSize)
              for (var i2 = t2.iceCandidatePoolSize; i2 > 0; i2--)
                this._iceGatherers.push(new c.RTCIceGatherer({ iceServers: t2.iceServers, gatherPolicy: t2.iceTransportPolicy }));
            else
              t2.iceCandidatePoolSize = 0;
            this._config = t2, this.transceivers = [], this._sdpSessionId = e.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = false;
          };
          Object.defineProperty(f.prototype, "localDescription", { configurable: true, get: function() {
            return this._localDescription;
          } }), Object.defineProperty(f.prototype, "remoteDescription", { configurable: true, get: function() {
            return this._remoteDescription;
          } }), f.prototype.onicecandidate = null, f.prototype.onaddstream = null, f.prototype.ontrack = null, f.prototype.onremovestream = null, f.prototype.onsignalingstatechange = null, f.prototype.oniceconnectionstatechange = null, f.prototype.onconnectionstatechange = null, f.prototype.onicegatheringstatechange = null, f.prototype.onnegotiationneeded = null, f.prototype.ondatachannel = null, f.prototype._dispatchEvent = function(e2, t2) {
            this._isClosed || (this.dispatchEvent(t2), typeof this["on" + e2] == "function" && this["on" + e2](t2));
          }, f.prototype._emitGatheringStateChange = function() {
            var e2 = new Event("icegatheringstatechange");
            this._dispatchEvent("icegatheringstatechange", e2);
          }, f.prototype.getConfiguration = function() {
            return this._config;
          }, f.prototype.getLocalStreams = function() {
            return this.localStreams;
          }, f.prototype.getRemoteStreams = function() {
            return this.remoteStreams;
          }, f.prototype._createTransceiver = function(e2, t2) {
            var r2 = this.transceivers.length > 0, n2 = { track: null, iceGatherer: null, iceTransport: null, dtlsTransport: null, localCapabilities: null, remoteCapabilities: null, rtpSender: null, rtpReceiver: null, kind: e2, mid: null, sendEncodingParameters: null, recvEncodingParameters: null, stream: null, associatedRemoteMediaStreams: [], wantReceive: true };
            if (this.usingBundle && r2)
              n2.iceTransport = this.transceivers[0].iceTransport, n2.dtlsTransport = this.transceivers[0].dtlsTransport;
            else {
              var a2 = this._createIceAndDtlsTransports();
              n2.iceTransport = a2.iceTransport, n2.dtlsTransport = a2.dtlsTransport;
            }
            return t2 || this.transceivers.push(n2), n2;
          }, f.prototype.addTrack = function(e2, t2) {
            if (this._isClosed)
              throw o("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
            var r2;
            if (this.transceivers.find(function(t3) {
              return t3.track === e2;
            }))
              throw o("InvalidAccessError", "Track already exists.");
            for (var n2 = 0; n2 < this.transceivers.length; n2++)
              this.transceivers[n2].track || this.transceivers[n2].kind !== e2.kind || (r2 = this.transceivers[n2]);
            return r2 || (r2 = this._createTransceiver(e2.kind)), this._maybeFireNegotiationNeeded(), this.localStreams.indexOf(t2) === -1 && this.localStreams.push(t2), r2.track = e2, r2.stream = t2, r2.rtpSender = new c.RTCRtpSender(e2, r2.dtlsTransport), r2.rtpSender;
          }, f.prototype.addStream = function(e2) {
            var t2 = this;
            if (d >= 15025)
              e2.getTracks().forEach(function(r3) {
                t2.addTrack(r3, e2);
              });
            else {
              var r2 = e2.clone();
              e2.getTracks().forEach(function(e3, t3) {
                var n2 = r2.getTracks()[t3];
                e3.addEventListener("enabled", function(e4) {
                  n2.enabled = e4.enabled;
                });
              }), r2.getTracks().forEach(function(e3) {
                t2.addTrack(e3, r2);
              });
            }
          }, f.prototype.removeTrack = function(e2) {
            if (this._isClosed)
              throw o("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
            if (!(e2 instanceof c.RTCRtpSender))
              throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
            var t2 = this.transceivers.find(function(t3) {
              return t3.rtpSender === e2;
            });
            if (!t2)
              throw o("InvalidAccessError", "Sender was not created by this connection.");
            var r2 = t2.stream;
            t2.rtpSender.stop(), t2.rtpSender = null, t2.track = null, t2.stream = null, this.transceivers.map(function(e3) {
              return e3.stream;
            }).indexOf(r2) === -1 && this.localStreams.indexOf(r2) > -1 && this.localStreams.splice(this.localStreams.indexOf(r2), 1), this._maybeFireNegotiationNeeded();
          }, f.prototype.removeStream = function(e2) {
            var t2 = this;
            e2.getTracks().forEach(function(e3) {
              var r2 = t2.getSenders().find(function(t3) {
                return t3.track === e3;
              });
              r2 && t2.removeTrack(r2);
            });
          }, f.prototype.getSenders = function() {
            return this.transceivers.filter(function(e2) {
              return !!e2.rtpSender;
            }).map(function(e2) {
              return e2.rtpSender;
            });
          }, f.prototype.getReceivers = function() {
            return this.transceivers.filter(function(e2) {
              return !!e2.rtpReceiver;
            }).map(function(e2) {
              return e2.rtpReceiver;
            });
          }, f.prototype._createIceGatherer = function(e2, t2) {
            var r2 = this;
            if (t2 && e2 > 0)
              return this.transceivers[0].iceGatherer;
            if (this._iceGatherers.length)
              return this._iceGatherers.shift();
            var n2 = new c.RTCIceGatherer({ iceServers: this._config.iceServers, gatherPolicy: this._config.iceTransportPolicy });
            return Object.defineProperty(n2, "state", { value: "new", writable: true }), this.transceivers[e2].bufferedCandidateEvents = [], this.transceivers[e2].bufferCandidates = function(t3) {
              var a2 = !t3.candidate || Object.keys(t3.candidate).length === 0;
              n2.state = a2 ? "completed" : "gathering", r2.transceivers[e2].bufferedCandidateEvents !== null && r2.transceivers[e2].bufferedCandidateEvents.push(t3);
            }, n2.addEventListener("localcandidate", this.transceivers[e2].bufferCandidates), n2;
          }, f.prototype._gather = function(t2, r2) {
            var n2 = this, a2 = this.transceivers[r2].iceGatherer;
            if (!a2.onlocalcandidate) {
              var i2 = this.transceivers[r2].bufferedCandidateEvents;
              this.transceivers[r2].bufferedCandidateEvents = null, a2.removeEventListener("localcandidate", this.transceivers[r2].bufferCandidates), a2.onlocalcandidate = function(i3) {
                if (!(n2.usingBundle && r2 > 0)) {
                  var s2 = new Event("icecandidate");
                  s2.candidate = { sdpMid: t2, sdpMLineIndex: r2 };
                  var o2 = i3.candidate, c2 = !o2 || Object.keys(o2).length === 0;
                  if (c2)
                    a2.state !== "new" && a2.state !== "gathering" || (a2.state = "completed");
                  else {
                    a2.state === "new" && (a2.state = "gathering"), o2.component = 1, o2.ufrag = a2.getLocalParameters().usernameFragment;
                    var d2 = e.writeCandidate(o2);
                    s2.candidate = Object.assign(s2.candidate, e.parseCandidate(d2)), s2.candidate.candidate = d2, s2.candidate.toJSON = function() {
                      return { candidate: s2.candidate.candidate, sdpMid: s2.candidate.sdpMid, sdpMLineIndex: s2.candidate.sdpMLineIndex, usernameFragment: s2.candidate.usernameFragment };
                    };
                  }
                  var p2 = e.getMediaSections(n2._localDescription.sdp);
                  p2[s2.candidate.sdpMLineIndex] += c2 ? "a=end-of-candidates\r\n" : "a=" + s2.candidate.candidate + "\r\n", n2._localDescription.sdp = e.getDescription(n2._localDescription.sdp) + p2.join("");
                  var l2 = n2.transceivers.every(function(e2) {
                    return e2.iceGatherer && e2.iceGatherer.state === "completed";
                  });
                  n2.iceGatheringState !== "gathering" && (n2.iceGatheringState = "gathering", n2._emitGatheringStateChange()), c2 || n2._dispatchEvent("icecandidate", s2), l2 && (n2._dispatchEvent("icecandidate", new Event("icecandidate")), n2.iceGatheringState = "complete", n2._emitGatheringStateChange());
                }
              }, c.setTimeout(function() {
                i2.forEach(function(e2) {
                  a2.onlocalcandidate(e2);
                });
              }, 0);
            }
          }, f.prototype._createIceAndDtlsTransports = function() {
            var e2 = this, t2 = new c.RTCIceTransport(null);
            t2.onicestatechange = function() {
              e2._updateIceConnectionState(), e2._updateConnectionState();
            };
            var r2 = new c.RTCDtlsTransport(t2);
            return r2.ondtlsstatechange = function() {
              e2._updateConnectionState();
            }, r2.onerror = function() {
              Object.defineProperty(r2, "state", { value: "failed", writable: true }), e2._updateConnectionState();
            }, { iceTransport: t2, dtlsTransport: r2 };
          }, f.prototype._disposeIceAndDtlsTransports = function(e2) {
            var t2 = this.transceivers[e2].iceGatherer;
            t2 && (delete t2.onlocalcandidate, delete this.transceivers[e2].iceGatherer);
            var r2 = this.transceivers[e2].iceTransport;
            r2 && (delete r2.onicestatechange, delete this.transceivers[e2].iceTransport);
            var n2 = this.transceivers[e2].dtlsTransport;
            n2 && (delete n2.ondtlsstatechange, delete n2.onerror, delete this.transceivers[e2].dtlsTransport);
          }, f.prototype._transceive = function(t2, r2, n2) {
            var i2 = a(t2.localCapabilities, t2.remoteCapabilities);
            r2 && t2.rtpSender && (i2.encodings = t2.sendEncodingParameters, i2.rtcp = { cname: e.localCName, compound: t2.rtcpParameters.compound }, t2.recvEncodingParameters.length && (i2.rtcp.ssrc = t2.recvEncodingParameters[0].ssrc), t2.rtpSender.send(i2)), n2 && t2.rtpReceiver && i2.codecs.length > 0 && (t2.kind === "video" && t2.recvEncodingParameters && d < 15019 && t2.recvEncodingParameters.forEach(function(e2) {
              delete e2.rtx;
            }), t2.recvEncodingParameters.length ? i2.encodings = t2.recvEncodingParameters : i2.encodings = [{}], i2.rtcp = { compound: t2.rtcpParameters.compound }, t2.rtcpParameters.cname && (i2.rtcp.cname = t2.rtcpParameters.cname), t2.sendEncodingParameters.length && (i2.rtcp.ssrc = t2.sendEncodingParameters[0].ssrc), t2.rtpReceiver.receive(i2));
          }, f.prototype.setLocalDescription = function(t2) {
            var r2, n2, s2 = this;
            if (["offer", "answer"].indexOf(t2.type) === -1)
              return Promise.reject(o("TypeError", 'Unsupported type "' + t2.type + '"'));
            if (!i("setLocalDescription", t2.type, s2.signalingState) || s2._isClosed)
              return Promise.reject(o("InvalidStateError", "Can not set local " + t2.type + " in state " + s2.signalingState));
            if (t2.type === "offer")
              r2 = e.splitSections(t2.sdp), n2 = r2.shift(), r2.forEach(function(t3, r3) {
                var n3 = e.parseRtpParameters(t3);
                s2.transceivers[r3].localCapabilities = n3;
              }), s2.transceivers.forEach(function(e2, t3) {
                s2._gather(e2.mid, t3);
              });
            else if (t2.type === "answer") {
              r2 = e.splitSections(s2._remoteDescription.sdp), n2 = r2.shift();
              var c2 = e.matchPrefix(n2, "a=ice-lite").length > 0;
              r2.forEach(function(t3, r3) {
                var i2 = s2.transceivers[r3], o2 = i2.iceGatherer, d2 = i2.iceTransport, p2 = i2.dtlsTransport, l2 = i2.localCapabilities, f2 = i2.remoteCapabilities;
                if (!(e.isRejected(t3) && e.matchPrefix(t3, "a=bundle-only").length === 0) && !i2.rejected) {
                  var u2 = e.getIceParameters(t3, n2), v = e.getDtlsParameters(t3, n2);
                  c2 && (v.role = "server"), s2.usingBundle && r3 !== 0 || (s2._gather(i2.mid, r3), d2.state === "new" && d2.start(o2, u2, c2 ? "controlling" : "controlled"), p2.state === "new" && p2.start(v));
                  var h = a(l2, f2);
                  s2._transceive(i2, h.codecs.length > 0, false);
                }
              });
            }
            return s2._localDescription = { type: t2.type, sdp: t2.sdp }, t2.type === "offer" ? s2._updateSignalingState("have-local-offer") : s2._updateSignalingState("stable"), Promise.resolve();
          }, f.prototype.setRemoteDescription = function(t2) {
            var r2 = this;
            if (["offer", "answer"].indexOf(t2.type) === -1)
              return Promise.reject(o("TypeError", 'Unsupported type "' + t2.type + '"'));
            if (!i("setRemoteDescription", t2.type, r2.signalingState) || r2._isClosed)
              return Promise.reject(o("InvalidStateError", "Can not set remote " + t2.type + " in state " + r2.signalingState));
            var n2 = {};
            r2.remoteStreams.forEach(function(e2) {
              n2[e2.id] = e2;
            });
            var f2 = [], u2 = e.splitSections(t2.sdp), v = u2.shift(), h = e.matchPrefix(v, "a=ice-lite").length > 0, m = e.matchPrefix(v, "a=group:BUNDLE ").length > 0;
            r2.usingBundle = m;
            var g = e.matchPrefix(v, "a=ice-options:")[0];
            return r2.canTrickleIceCandidates = !!g && g.substr(14).split(" ").indexOf("trickle") >= 0, u2.forEach(function(i2, o2) {
              var l2 = e.splitLines(i2), u3 = e.getKind(i2), g2 = e.isRejected(i2) && e.matchPrefix(i2, "a=bundle-only").length === 0, y = l2[0].substr(2).split(" ")[2], S = e.getDirection(i2, v), T = e.parseMsid(i2), E = e.getMid(i2) || e.generateIdentifier();
              if (g2 || u3 === "application" && (y === "DTLS/SCTP" || y === "UDP/DTLS/SCTP"))
                r2.transceivers[o2] = { mid: E, kind: u3, protocol: y, rejected: true };
              else {
                var C, P, w, R, _, k, b, x, D;
                !g2 && r2.transceivers[o2] && r2.transceivers[o2].rejected && (r2.transceivers[o2] = r2._createTransceiver(u3, true));
                var I, L, M = e.parseRtpParameters(i2);
                g2 || (I = e.getIceParameters(i2, v), (L = e.getDtlsParameters(i2, v)).role = "client"), b = e.parseRtpEncodingParameters(i2);
                var O = e.parseRtcpParameters(i2), G = e.matchPrefix(i2, "a=end-of-candidates", v).length > 0, j = e.matchPrefix(i2, "a=candidate:").map(function(t3) {
                  return e.parseCandidate(t3);
                }).filter(function(e2) {
                  return e2.component === 1;
                });
                if ((t2.type === "offer" || t2.type === "answer") && !g2 && m && o2 > 0 && r2.transceivers[o2] && (r2._disposeIceAndDtlsTransports(o2), r2.transceivers[o2].iceGatherer = r2.transceivers[0].iceGatherer, r2.transceivers[o2].iceTransport = r2.transceivers[0].iceTransport, r2.transceivers[o2].dtlsTransport = r2.transceivers[0].dtlsTransport, r2.transceivers[o2].rtpSender && r2.transceivers[o2].rtpSender.setTransport(r2.transceivers[0].dtlsTransport), r2.transceivers[o2].rtpReceiver && r2.transceivers[o2].rtpReceiver.setTransport(r2.transceivers[0].dtlsTransport)), t2.type !== "offer" || g2) {
                  if (t2.type === "answer" && !g2) {
                    P = (C = r2.transceivers[o2]).iceGatherer, w = C.iceTransport, R = C.dtlsTransport, _ = C.rtpReceiver, k = C.sendEncodingParameters, x = C.localCapabilities, r2.transceivers[o2].recvEncodingParameters = b, r2.transceivers[o2].remoteCapabilities = M, r2.transceivers[o2].rtcpParameters = O, j.length && w.state === "new" && (!h && !G || m && o2 !== 0 ? j.forEach(function(e2) {
                      s(C.iceTransport, e2);
                    }) : w.setRemoteCandidates(j)), m && o2 !== 0 || (w.state === "new" && w.start(P, I, "controlling"), R.state === "new" && R.start(L)), !a(C.localCapabilities, C.remoteCapabilities).codecs.filter(function(e2) {
                      return e2.name.toLowerCase() === "rtx";
                    }).length && C.sendEncodingParameters[0].rtx && delete C.sendEncodingParameters[0].rtx, r2._transceive(C, S === "sendrecv" || S === "recvonly", S === "sendrecv" || S === "sendonly"), !_ || S !== "sendrecv" && S !== "sendonly" ? delete C.rtpReceiver : (D = _.track, T ? (n2[T.stream] || (n2[T.stream] = new c.MediaStream()), p(D, n2[T.stream]), f2.push([D, _, n2[T.stream]])) : (n2.default || (n2.default = new c.MediaStream()), p(D, n2.default), f2.push([D, _, n2.default])));
                  }
                } else {
                  (C = r2.transceivers[o2] || r2._createTransceiver(u3)).mid = E, C.iceGatherer || (C.iceGatherer = r2._createIceGatherer(o2, m)), j.length && C.iceTransport.state === "new" && (!G || m && o2 !== 0 ? j.forEach(function(e2) {
                    s(C.iceTransport, e2);
                  }) : C.iceTransport.setRemoteCandidates(j)), x = c.RTCRtpReceiver.getCapabilities(u3), d < 15019 && (x.codecs = x.codecs.filter(function(e2) {
                    return e2.name !== "rtx";
                  })), k = C.sendEncodingParameters || [{ ssrc: 1001 * (2 * o2 + 2) }];
                  var N, A = false;
                  if (S === "sendrecv" || S === "sendonly") {
                    if (A = !C.rtpReceiver, _ = C.rtpReceiver || new c.RTCRtpReceiver(C.dtlsTransport, u3), A)
                      D = _.track, T && T.stream === "-" || (T ? (n2[T.stream] || (n2[T.stream] = new c.MediaStream(), Object.defineProperty(n2[T.stream], "id", { get: function() {
                        return T.stream;
                      } })), Object.defineProperty(D, "id", { get: function() {
                        return T.track;
                      } }), N = n2[T.stream]) : (n2.default || (n2.default = new c.MediaStream()), N = n2.default)), N && (p(D, N), C.associatedRemoteMediaStreams.push(N)), f2.push([D, _, N]);
                  } else
                    C.rtpReceiver && C.rtpReceiver.track && (C.associatedRemoteMediaStreams.forEach(function(e2) {
                      var t3, r3, n3 = e2.getTracks().find(function(e3) {
                        return e3.id === C.rtpReceiver.track.id;
                      });
                      n3 && (t3 = n3, (r3 = e2).removeTrack(t3), r3.dispatchEvent(new c.MediaStreamTrackEvent("removetrack", { track: t3 })));
                    }), C.associatedRemoteMediaStreams = []);
                  C.localCapabilities = x, C.remoteCapabilities = M, C.rtpReceiver = _, C.rtcpParameters = O, C.sendEncodingParameters = k, C.recvEncodingParameters = b, r2._transceive(r2.transceivers[o2], false, A);
                }
              }
            }), r2._dtlsRole === void 0 && (r2._dtlsRole = t2.type === "offer" ? "active" : "passive"), r2._remoteDescription = { type: t2.type, sdp: t2.sdp }, t2.type === "offer" ? r2._updateSignalingState("have-remote-offer") : r2._updateSignalingState("stable"), Object.keys(n2).forEach(function(e2) {
              var t3 = n2[e2];
              if (t3.getTracks().length) {
                if (r2.remoteStreams.indexOf(t3) === -1) {
                  r2.remoteStreams.push(t3);
                  var a2 = new Event("addstream");
                  a2.stream = t3, c.setTimeout(function() {
                    r2._dispatchEvent("addstream", a2);
                  });
                }
                f2.forEach(function(e3) {
                  var n3 = e3[0], a3 = e3[1];
                  t3.id === e3[2].id && l(r2, n3, a3, [t3]);
                });
              }
            }), f2.forEach(function(e2) {
              e2[2] || l(r2, e2[0], e2[1], []);
            }), c.setTimeout(function() {
              r2 && r2.transceivers && r2.transceivers.forEach(function(e2) {
                e2.iceTransport && e2.iceTransport.state === "new" && e2.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e2.iceTransport.addRemoteCandidate({}));
              });
            }, 4e3), Promise.resolve();
          }, f.prototype.close = function() {
            this.transceivers.forEach(function(e2) {
              e2.iceTransport && e2.iceTransport.stop(), e2.dtlsTransport && e2.dtlsTransport.stop(), e2.rtpSender && e2.rtpSender.stop(), e2.rtpReceiver && e2.rtpReceiver.stop();
            }), this._isClosed = true, this._updateSignalingState("closed");
          }, f.prototype._updateSignalingState = function(e2) {
            this.signalingState = e2;
            var t2 = new Event("signalingstatechange");
            this._dispatchEvent("signalingstatechange", t2);
          }, f.prototype._maybeFireNegotiationNeeded = function() {
            var e2 = this;
            this.signalingState === "stable" && this.needNegotiation !== true && (this.needNegotiation = true, c.setTimeout(function() {
              if (e2.needNegotiation) {
                e2.needNegotiation = false;
                var t2 = new Event("negotiationneeded");
                e2._dispatchEvent("negotiationneeded", t2);
              }
            }, 0));
          }, f.prototype._updateIceConnectionState = function() {
            var e2, t2 = { new: 0, closed: 0, checking: 0, connected: 0, completed: 0, disconnected: 0, failed: 0 };
            if (this.transceivers.forEach(function(e3) {
              e3.iceTransport && !e3.rejected && t2[e3.iceTransport.state]++;
            }), e2 = "new", t2.failed > 0 ? e2 = "failed" : t2.checking > 0 ? e2 = "checking" : t2.disconnected > 0 ? e2 = "disconnected" : t2.new > 0 ? e2 = "new" : t2.connected > 0 ? e2 = "connected" : t2.completed > 0 && (e2 = "completed"), e2 !== this.iceConnectionState) {
              this.iceConnectionState = e2;
              var r2 = new Event("iceconnectionstatechange");
              this._dispatchEvent("iceconnectionstatechange", r2);
            }
          }, f.prototype._updateConnectionState = function() {
            var e2, t2 = { new: 0, closed: 0, connecting: 0, connected: 0, completed: 0, disconnected: 0, failed: 0 };
            if (this.transceivers.forEach(function(e3) {
              e3.iceTransport && e3.dtlsTransport && !e3.rejected && (t2[e3.iceTransport.state]++, t2[e3.dtlsTransport.state]++);
            }), t2.connected += t2.completed, e2 = "new", t2.failed > 0 ? e2 = "failed" : t2.connecting > 0 ? e2 = "connecting" : t2.disconnected > 0 ? e2 = "disconnected" : t2.new > 0 ? e2 = "new" : t2.connected > 0 && (e2 = "connected"), e2 !== this.connectionState) {
              this.connectionState = e2;
              var r2 = new Event("connectionstatechange");
              this._dispatchEvent("connectionstatechange", r2);
            }
          }, f.prototype.createOffer = function() {
            var t2 = this;
            if (t2._isClosed)
              return Promise.reject(o("InvalidStateError", "Can not call createOffer after close"));
            var n2 = t2.transceivers.filter(function(e2) {
              return e2.kind === "audio";
            }).length, a2 = t2.transceivers.filter(function(e2) {
              return e2.kind === "video";
            }).length, i2 = arguments[0];
            if (i2) {
              if (i2.mandatory || i2.optional)
                throw new TypeError("Legacy mandatory/optional constraints not supported.");
              i2.offerToReceiveAudio !== void 0 && (n2 = i2.offerToReceiveAudio === true ? 1 : i2.offerToReceiveAudio === false ? 0 : i2.offerToReceiveAudio), i2.offerToReceiveVideo !== void 0 && (a2 = i2.offerToReceiveVideo === true ? 1 : i2.offerToReceiveVideo === false ? 0 : i2.offerToReceiveVideo);
            }
            for (t2.transceivers.forEach(function(e2) {
              e2.kind === "audio" ? --n2 < 0 && (e2.wantReceive = false) : e2.kind === "video" && --a2 < 0 && (e2.wantReceive = false);
            }); n2 > 0 || a2 > 0; )
              n2 > 0 && (t2._createTransceiver("audio"), n2--), a2 > 0 && (t2._createTransceiver("video"), a2--);
            var s2 = e.writeSessionBoilerplate(t2._sdpSessionId, t2._sdpSessionVersion++);
            t2.transceivers.forEach(function(r2, n3) {
              var a3 = r2.track, i3 = r2.kind, s3 = r2.mid || e.generateIdentifier();
              r2.mid = s3, r2.iceGatherer || (r2.iceGatherer = t2._createIceGatherer(n3, t2.usingBundle));
              var o2 = c.RTCRtpSender.getCapabilities(i3);
              d < 15019 && (o2.codecs = o2.codecs.filter(function(e2) {
                return e2.name !== "rtx";
              })), o2.codecs.forEach(function(e2) {
                e2.name === "H264" && e2.parameters["level-asymmetry-allowed"] === void 0 && (e2.parameters["level-asymmetry-allowed"] = "1"), r2.remoteCapabilities && r2.remoteCapabilities.codecs && r2.remoteCapabilities.codecs.forEach(function(t3) {
                  e2.name.toLowerCase() === t3.name.toLowerCase() && e2.clockRate === t3.clockRate && (e2.preferredPayloadType = t3.payloadType);
                });
              }), o2.headerExtensions.forEach(function(e2) {
                (r2.remoteCapabilities && r2.remoteCapabilities.headerExtensions || []).forEach(function(t3) {
                  e2.uri === t3.uri && (e2.id = t3.id);
                });
              });
              var p3 = r2.sendEncodingParameters || [{ ssrc: 1001 * (2 * n3 + 1) }];
              a3 && d >= 15019 && i3 === "video" && !p3[0].rtx && (p3[0].rtx = { ssrc: p3[0].ssrc + 1 }), r2.wantReceive && (r2.rtpReceiver = new c.RTCRtpReceiver(r2.dtlsTransport, i3)), r2.localCapabilities = o2, r2.sendEncodingParameters = p3;
            }), t2._config.bundlePolicy !== "max-compat" && (s2 += "a=group:BUNDLE " + t2.transceivers.map(function(e2) {
              return e2.mid;
            }).join(" ") + "\r\n"), s2 += "a=ice-options:trickle\r\n", t2.transceivers.forEach(function(n3, a3) {
              s2 += r(n3, n3.localCapabilities, "offer", n3.stream, t2._dtlsRole), s2 += "a=rtcp-rsize\r\n", !n3.iceGatherer || t2.iceGatheringState === "new" || a3 !== 0 && t2.usingBundle || (n3.iceGatherer.getLocalCandidates().forEach(function(t3) {
                t3.component = 1, s2 += "a=" + e.writeCandidate(t3) + "\r\n";
              }), n3.iceGatherer.state === "completed" && (s2 += "a=end-of-candidates\r\n"));
            });
            var p2 = new c.RTCSessionDescription({ type: "offer", sdp: s2 });
            return Promise.resolve(p2);
          }, f.prototype.createAnswer = function() {
            var t2 = this;
            if (t2._isClosed)
              return Promise.reject(o("InvalidStateError", "Can not call createAnswer after close"));
            if (t2.signalingState !== "have-remote-offer" && t2.signalingState !== "have-local-pranswer")
              return Promise.reject(o("InvalidStateError", "Can not call createAnswer in signalingState " + t2.signalingState));
            var n2 = e.writeSessionBoilerplate(t2._sdpSessionId, t2._sdpSessionVersion++);
            t2.usingBundle && (n2 += "a=group:BUNDLE " + t2.transceivers.map(function(e2) {
              return e2.mid;
            }).join(" ") + "\r\n"), n2 += "a=ice-options:trickle\r\n";
            var i2 = e.getMediaSections(t2._remoteDescription.sdp).length;
            t2.transceivers.forEach(function(e2, s3) {
              if (!(s3 + 1 > i2)) {
                if (e2.rejected)
                  return e2.kind === "application" ? e2.protocol === "DTLS/SCTP" ? n2 += "m=application 0 DTLS/SCTP 5000\r\n" : n2 += "m=application 0 " + e2.protocol + " webrtc-datachannel\r\n" : e2.kind === "audio" ? n2 += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : e2.kind === "video" && (n2 += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void (n2 += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e2.mid + "\r\n");
                var o2;
                if (e2.stream)
                  e2.kind === "audio" ? o2 = e2.stream.getAudioTracks()[0] : e2.kind === "video" && (o2 = e2.stream.getVideoTracks()[0]), o2 && d >= 15019 && e2.kind === "video" && !e2.sendEncodingParameters[0].rtx && (e2.sendEncodingParameters[0].rtx = { ssrc: e2.sendEncodingParameters[0].ssrc + 1 });
                var c2 = a(e2.localCapabilities, e2.remoteCapabilities);
                !c2.codecs.filter(function(e3) {
                  return e3.name.toLowerCase() === "rtx";
                }).length && e2.sendEncodingParameters[0].rtx && delete e2.sendEncodingParameters[0].rtx, n2 += r(e2, c2, "answer", e2.stream, t2._dtlsRole), e2.rtcpParameters && e2.rtcpParameters.reducedSize && (n2 += "a=rtcp-rsize\r\n");
              }
            });
            var s2 = new c.RTCSessionDescription({ type: "answer", sdp: n2 });
            return Promise.resolve(s2);
          }, f.prototype.addIceCandidate = function(t2) {
            var r2, n2 = this;
            return t2 && t2.sdpMLineIndex === void 0 && !t2.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(a2, i2) {
              if (!n2._remoteDescription)
                return i2(o("InvalidStateError", "Can not add ICE candidate without a remote description"));
              if (t2 && t2.candidate !== "") {
                var c2 = t2.sdpMLineIndex;
                if (t2.sdpMid) {
                  for (var d2 = 0; d2 < n2.transceivers.length; d2++)
                    if (n2.transceivers[d2].mid === t2.sdpMid) {
                      c2 = d2;
                      break;
                    }
                }
                var p2 = n2.transceivers[c2];
                if (!p2)
                  return i2(o("OperationError", "Can not add ICE candidate"));
                if (p2.rejected)
                  return a2();
                var l2 = Object.keys(t2.candidate).length > 0 ? e.parseCandidate(t2.candidate) : {};
                if (l2.protocol === "tcp" && (l2.port === 0 || l2.port === 9))
                  return a2();
                if (l2.component && l2.component !== 1)
                  return a2();
                if ((c2 === 0 || c2 > 0 && p2.iceTransport !== n2.transceivers[0].iceTransport) && !s(p2.iceTransport, l2))
                  return i2(o("OperationError", "Can not add ICE candidate"));
                var f2 = t2.candidate.trim();
                f2.indexOf("a=") === 0 && (f2 = f2.substr(2)), (r2 = e.getMediaSections(n2._remoteDescription.sdp))[c2] += "a=" + (l2.type ? f2 : "end-of-candidates") + "\r\n", n2._remoteDescription.sdp = e.getDescription(n2._remoteDescription.sdp) + r2.join("");
              } else
                for (var u2 = 0; u2 < n2.transceivers.length && (n2.transceivers[u2].rejected || (n2.transceivers[u2].iceTransport.addRemoteCandidate({}), (r2 = e.getMediaSections(n2._remoteDescription.sdp))[u2] += "a=end-of-candidates\r\n", n2._remoteDescription.sdp = e.getDescription(n2._remoteDescription.sdp) + r2.join(""), !n2.usingBundle)); u2++)
                  ;
              a2();
            });
          }, f.prototype.getStats = function(e2) {
            if (e2 && e2 instanceof c.MediaStreamTrack) {
              var t2 = null;
              if (this.transceivers.forEach(function(r3) {
                r3.rtpSender && r3.rtpSender.track === e2 ? t2 = r3.rtpSender : r3.rtpReceiver && r3.rtpReceiver.track === e2 && (t2 = r3.rtpReceiver);
              }), !t2)
                throw o("InvalidAccessError", "Invalid selector.");
              return t2.getStats();
            }
            var r2 = [];
            return this.transceivers.forEach(function(e3) {
              ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(t3) {
                e3[t3] && r2.push(e3[t3].getStats());
              });
            }), Promise.all(r2).then(function(e3) {
              var t3 = /* @__PURE__ */ new Map();
              return e3.forEach(function(e4) {
                e4.forEach(function(e5) {
                  t3.set(e5.id, e5);
                });
              }), t3;
            });
          };
          ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function(e2) {
            var r2 = c[e2];
            if (r2 && r2.prototype && r2.prototype.getStats) {
              var n2 = r2.prototype.getStats;
              r2.prototype.getStats = function() {
                return n2.apply(this).then(function(e3) {
                  var r3 = /* @__PURE__ */ new Map();
                  return Object.keys(e3).forEach(function(n3) {
                    e3[n3].type = t(e3[n3]), r3.set(n3, e3[n3]);
                  }), r3;
                });
              };
            }
          });
          var u = ["createOffer", "createAnswer"];
          return u.forEach(function(e2) {
            var t2 = f.prototype[e2];
            f.prototype[e2] = function() {
              var e3 = arguments;
              return typeof e3[0] == "function" || typeof e3[1] == "function" ? t2.apply(this, [arguments[2]]).then(function(t3) {
                typeof e3[0] == "function" && e3[0].apply(null, [t3]);
              }, function(t3) {
                typeof e3[1] == "function" && e3[1].apply(null, [t3]);
              }) : t2.apply(this, arguments);
            };
          }), (u = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function(e2) {
            var t2 = f.prototype[e2];
            f.prototype[e2] = function() {
              var e3 = arguments;
              return typeof e3[1] == "function" || typeof e3[2] == "function" ? t2.apply(this, arguments).then(function() {
                typeof e3[1] == "function" && e3[1].apply(null);
              }, function(t3) {
                typeof e3[2] == "function" && e3[2].apply(null, [t3]);
              }) : t2.apply(this, arguments);
            };
          }), ["getStats"].forEach(function(e2) {
            var t2 = f.prototype[e2];
            f.prototype[e2] = function() {
              var e3 = arguments;
              return typeof e3[1] == "function" ? t2.apply(this, arguments).then(function() {
                typeof e3[1] == "function" && e3[1].apply(null);
              }) : t2.apply(this, arguments);
            };
          }), f;
        };
      }, { "sdp": "YHvh" }], "YdKx": [function(require2, module2, exports2) {
        "use strict";
        function e(e2) {
          var r = e2 && e2.navigator, t = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
          r.mediaDevices.getUserMedia = function(e3) {
            return t(e3).catch(function(e4) {
              return Promise.reject(function(e5) {
                return { name: { PermissionDeniedError: "NotAllowedError" }[e5.name] || e5.name, message: e5.message, constraint: e5.constraint, toString: function() {
                  return this.name;
                } };
              }(e4));
            });
          };
        }
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimGetUserMedia = e;
      }, {}], "P3bV": [function(require2, module2, exports2) {
        "use strict";
        function e(e2) {
          "getDisplayMedia" in e2.navigator && e2.navigator.mediaDevices && (e2.navigator.mediaDevices && "getDisplayMedia" in e2.navigator.mediaDevices || (e2.navigator.mediaDevices.getDisplayMedia = e2.navigator.getDisplayMedia.bind(e2.navigator)));
        }
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimGetDisplayMedia = e;
      }, {}], "XRic": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimPeerConnection = p, exports2.shimReplaceTrack = a, Object.defineProperty(exports2, "shimGetUserMedia", { enumerable: true, get: function() {
          return n.shimGetUserMedia;
        } }), Object.defineProperty(exports2, "shimGetDisplayMedia", { enumerable: true, get: function() {
          return i.shimGetDisplayMedia;
        } });
        var e = s(require2("../utils")), t = require2("./filtericeservers"), r = o(require2("rtcpeerconnection-shim")), n = require2("./getusermedia"), i = require2("./getdisplaymedia");
        function o(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        function c() {
          if (typeof WeakMap != "function")
            return null;
          var e2 = /* @__PURE__ */ new WeakMap();
          return c = function() {
            return e2;
          }, e2;
        }
        function s(e2) {
          if (e2 && e2.__esModule)
            return e2;
          if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
            return { default: e2 };
          var t2 = c();
          if (t2 && t2.has(e2))
            return t2.get(e2);
          var r2 = {}, n2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i2 in e2)
            if (Object.prototype.hasOwnProperty.call(e2, i2)) {
              var o2 = n2 ? Object.getOwnPropertyDescriptor(e2, i2) : null;
              o2 && (o2.get || o2.set) ? Object.defineProperty(r2, i2, o2) : r2[i2] = e2[i2];
            }
          return r2.default = e2, t2 && t2.set(e2, r2), r2;
        }
        function p(n2, i2) {
          if (n2.RTCIceGatherer && (n2.RTCIceCandidate || (n2.RTCIceCandidate = function(e2) {
            return e2;
          }), n2.RTCSessionDescription || (n2.RTCSessionDescription = function(e2) {
            return e2;
          }), i2.version < 15025)) {
            var o2 = Object.getOwnPropertyDescriptor(n2.MediaStreamTrack.prototype, "enabled");
            Object.defineProperty(n2.MediaStreamTrack.prototype, "enabled", { set: function(e2) {
              o2.set.call(this, e2);
              var t2 = new Event("enabled");
              t2.enabled = e2, this.dispatchEvent(t2);
            } });
          }
          !n2.RTCRtpSender || "dtmf" in n2.RTCRtpSender.prototype || Object.defineProperty(n2.RTCRtpSender.prototype, "dtmf", { get: function() {
            return this._dtmf === void 0 && (this.track.kind === "audio" ? this._dtmf = new n2.RTCDtmfSender(this) : this.track.kind === "video" && (this._dtmf = null)), this._dtmf;
          } }), n2.RTCDtmfSender && !n2.RTCDTMFSender && (n2.RTCDTMFSender = n2.RTCDtmfSender);
          var c2 = (0, r.default)(n2, i2.version);
          n2.RTCPeerConnection = function(r2) {
            return r2 && r2.iceServers && (r2.iceServers = (0, t.filterIceServers)(r2.iceServers, i2.version), e.log("ICE servers after filtering:", r2.iceServers)), new c2(r2);
          }, n2.RTCPeerConnection.prototype = c2.prototype;
        }
        function a(e2) {
          !e2.RTCRtpSender || "replaceTrack" in e2.RTCRtpSender.prototype || (e2.RTCRtpSender.prototype.replaceTrack = e2.RTCRtpSender.prototype.setTrack);
        }
      }, { "../utils": "iSxC", "./filtericeservers": "NZ1C", "rtcpeerconnection-shim": "NJ2u", "./getusermedia": "YdKx", "./getdisplaymedia": "P3bV" }], "GzSv": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimGetUserMedia = n;
        var e = o(require2("../utils"));
        function t() {
          if (typeof WeakMap != "function")
            return null;
          var e2 = /* @__PURE__ */ new WeakMap();
          return t = function() {
            return e2;
          }, e2;
        }
        function o(e2) {
          if (e2 && e2.__esModule)
            return e2;
          if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
            return { default: e2 };
          var o2 = t();
          if (o2 && o2.has(e2))
            return o2.get(e2);
          var r2 = {}, n2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e2)
            if (Object.prototype.hasOwnProperty.call(e2, i)) {
              var a = n2 ? Object.getOwnPropertyDescriptor(e2, i) : null;
              a && (a.get || a.set) ? Object.defineProperty(r2, i, a) : r2[i] = e2[i];
            }
          return r2.default = e2, o2 && o2.set(e2, r2), r2;
        }
        function r(e2) {
          return (r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        function n(t2, o2) {
          var n2 = t2 && t2.navigator, i = t2 && t2.MediaStreamTrack;
          if (n2.getUserMedia = function(t3, o3, r2) {
            e.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n2.mediaDevices.getUserMedia(t3).then(o3, r2);
          }, !(o2.version > 55 && "autoGainControl" in n2.mediaDevices.getSupportedConstraints())) {
            var a = function(e2, t3, o3) {
              t3 in e2 && !(o3 in e2) && (e2[o3] = e2[t3], delete e2[t3]);
            }, s = n2.mediaDevices.getUserMedia.bind(n2.mediaDevices);
            if (n2.mediaDevices.getUserMedia = function(e2) {
              return r(e2) === "object" && r(e2.audio) === "object" && (e2 = JSON.parse(JSON.stringify(e2)), a(e2.audio, "autoGainControl", "mozAutoGainControl"), a(e2.audio, "noiseSuppression", "mozNoiseSuppression")), s(e2);
            }, i && i.prototype.getSettings) {
              var p = i.prototype.getSettings;
              i.prototype.getSettings = function() {
                var e2 = p.apply(this, arguments);
                return a(e2, "mozAutoGainControl", "autoGainControl"), a(e2, "mozNoiseSuppression", "noiseSuppression"), e2;
              };
            }
            if (i && i.prototype.applyConstraints) {
              var u = i.prototype.applyConstraints;
              i.prototype.applyConstraints = function(e2) {
                return this.kind === "audio" && r(e2) === "object" && (e2 = JSON.parse(JSON.stringify(e2)), a(e2, "autoGainControl", "mozAutoGainControl"), a(e2, "noiseSuppression", "mozNoiseSuppression")), u.apply(this, [e2]);
              };
            }
          }
        }
      }, { "../utils": "iSxC" }], "UuGU": [function(require2, module2, exports2) {
        "use strict";
        function e(e2, i) {
          e2.navigator.mediaDevices && "getDisplayMedia" in e2.navigator.mediaDevices || e2.navigator.mediaDevices && (e2.navigator.mediaDevices.getDisplayMedia = function(a) {
            if (!a || !a.video) {
              var t = new DOMException("getDisplayMedia without video constraints is undefined");
              return t.name = "NotFoundError", t.code = 8, Promise.reject(t);
            }
            return a.video === true ? a.video = { mediaSource: i } : a.video.mediaSource = i, e2.navigator.mediaDevices.getUserMedia(a);
          });
        }
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimGetDisplayMedia = e;
      }, {}], "Fzdr": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimOnTrack = s, exports2.shimPeerConnection = c, exports2.shimSenderGetStats = p, exports2.shimReceiverGetStats = u, exports2.shimRemoveStream = f, exports2.shimRTCDataChannel = d, exports2.shimAddTransceiver = C, exports2.shimGetParameters = y, exports2.shimCreateOffer = l, exports2.shimCreateAnswer = m, Object.defineProperty(exports2, "shimGetUserMedia", { enumerable: true, get: function() {
          return t.shimGetUserMedia;
        } }), Object.defineProperty(exports2, "shimGetDisplayMedia", { enumerable: true, get: function() {
          return n.shimGetDisplayMedia;
        } });
        var e = o(require2("../utils")), t = require2("./getusermedia"), n = require2("./getdisplaymedia");
        function r() {
          if (typeof WeakMap != "function")
            return null;
          var e2 = /* @__PURE__ */ new WeakMap();
          return r = function() {
            return e2;
          }, e2;
        }
        function o(e2) {
          if (e2 && e2.__esModule)
            return e2;
          if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
            return { default: e2 };
          var t2 = r();
          if (t2 && t2.has(e2))
            return t2.get(e2);
          var n2 = {}, o2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i2 in e2)
            if (Object.prototype.hasOwnProperty.call(e2, i2)) {
              var a2 = o2 ? Object.getOwnPropertyDescriptor(e2, i2) : null;
              a2 && (a2.get || a2.set) ? Object.defineProperty(n2, i2, a2) : n2[i2] = e2[i2];
            }
          return n2.default = e2, t2 && t2.set(e2, n2), n2;
        }
        function i(e2, t2, n2) {
          return t2 in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
        }
        function a(e2) {
          return (a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        function s(e2) {
          a(e2) === "object" && e2.RTCTrackEvent && "receiver" in e2.RTCTrackEvent.prototype && !("transceiver" in e2.RTCTrackEvent.prototype) && Object.defineProperty(e2.RTCTrackEvent.prototype, "transceiver", { get: function() {
            return { receiver: this.receiver };
          } });
        }
        function c(e2, t2) {
          if (a(e2) === "object" && (e2.RTCPeerConnection || e2.mozRTCPeerConnection)) {
            !e2.RTCPeerConnection && e2.mozRTCPeerConnection && (e2.RTCPeerConnection = e2.mozRTCPeerConnection), t2.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t3) {
              var n3 = e2.RTCPeerConnection.prototype[t3], r3 = i({}, t3, function() {
                return arguments[0] = new (t3 === "addIceCandidate" ? e2.RTCIceCandidate : e2.RTCSessionDescription)(arguments[0]), n3.apply(this, arguments);
              });
              e2.RTCPeerConnection.prototype[t3] = r3[t3];
            });
            var n2 = { inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate" }, r2 = e2.RTCPeerConnection.prototype.getStats;
            e2.RTCPeerConnection.prototype.getStats = function() {
              var [e3, o2, i2] = arguments;
              return r2.apply(this, [e3 || null]).then(function(e4) {
                if (t2.version < 53 && !o2)
                  try {
                    e4.forEach(function(e5) {
                      e5.type = n2[e5.type] || e5.type;
                    });
                  } catch (r3) {
                    if (r3.name !== "TypeError")
                      throw r3;
                    e4.forEach(function(t3, r4) {
                      e4.set(r4, Object.assign({}, t3, { type: n2[t3.type] || t3.type }));
                    });
                  }
                return e4;
              }).then(o2, i2);
            };
          }
        }
        function p(e2) {
          if (a(e2) === "object" && e2.RTCPeerConnection && e2.RTCRtpSender && !(e2.RTCRtpSender && "getStats" in e2.RTCRtpSender.prototype)) {
            var t2 = e2.RTCPeerConnection.prototype.getSenders;
            t2 && (e2.RTCPeerConnection.prototype.getSenders = function() {
              var e3 = this, n3 = t2.apply(this, []);
              return n3.forEach(function(t3) {
                return t3._pc = e3;
              }), n3;
            });
            var n2 = e2.RTCPeerConnection.prototype.addTrack;
            n2 && (e2.RTCPeerConnection.prototype.addTrack = function() {
              var e3 = n2.apply(this, arguments);
              return e3._pc = this, e3;
            }), e2.RTCRtpSender.prototype.getStats = function() {
              return this.track ? this._pc.getStats(this.track) : Promise.resolve(/* @__PURE__ */ new Map());
            };
          }
        }
        function u(t2) {
          if (a(t2) === "object" && t2.RTCPeerConnection && t2.RTCRtpSender && !(t2.RTCRtpSender && "getStats" in t2.RTCRtpReceiver.prototype)) {
            var n2 = t2.RTCPeerConnection.prototype.getReceivers;
            n2 && (t2.RTCPeerConnection.prototype.getReceivers = function() {
              var e2 = this, t3 = n2.apply(this, []);
              return t3.forEach(function(t4) {
                return t4._pc = e2;
              }), t3;
            }), e.wrapPeerConnectionEvent(t2, "track", function(e2) {
              return e2.receiver._pc = e2.srcElement, e2;
            }), t2.RTCRtpReceiver.prototype.getStats = function() {
              return this._pc.getStats(this.track);
            };
          }
        }
        function f(t2) {
          !t2.RTCPeerConnection || "removeStream" in t2.RTCPeerConnection.prototype || (t2.RTCPeerConnection.prototype.removeStream = function(t3) {
            var n2 = this;
            e.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function(e2) {
              e2.track && t3.getTracks().includes(e2.track) && n2.removeTrack(e2);
            });
          });
        }
        function d(e2) {
          e2.DataChannel && !e2.RTCDataChannel && (e2.RTCDataChannel = e2.DataChannel);
        }
        function C(e2) {
          if (a(e2) === "object" && e2.RTCPeerConnection) {
            var t2 = e2.RTCPeerConnection.prototype.addTransceiver;
            t2 && (e2.RTCPeerConnection.prototype.addTransceiver = function() {
              this.setParametersPromises = [];
              var e3 = arguments[1], n2 = e3 && "sendEncodings" in e3;
              n2 && e3.sendEncodings.forEach(function(e4) {
                if ("rid" in e4) {
                  if (!/^[a-z0-9]{0,16}$/i.test(e4.rid))
                    throw new TypeError("Invalid RID value provided.");
                }
                if ("scaleResolutionDownBy" in e4 && !(parseFloat(e4.scaleResolutionDownBy) >= 1))
                  throw new RangeError("scale_resolution_down_by must be >= 1.0");
                if ("maxFramerate" in e4 && !(parseFloat(e4.maxFramerate) >= 0))
                  throw new RangeError("max_framerate must be >= 0.0");
              });
              var r2 = t2.apply(this, arguments);
              if (n2) {
                var { sender: o2 } = r2, i2 = o2.getParameters();
                "encodings" in i2 && (i2.encodings.length !== 1 || Object.keys(i2.encodings[0]).length !== 0) || (i2.encodings = e3.sendEncodings, o2.sendEncodings = e3.sendEncodings, this.setParametersPromises.push(o2.setParameters(i2).then(function() {
                  delete o2.sendEncodings;
                }).catch(function() {
                  delete o2.sendEncodings;
                })));
              }
              return r2;
            });
          }
        }
        function y(e2) {
          if (a(e2) === "object" && e2.RTCRtpSender) {
            var t2 = e2.RTCRtpSender.prototype.getParameters;
            t2 && (e2.RTCRtpSender.prototype.getParameters = function() {
              var e3 = t2.apply(this, arguments);
              return "encodings" in e3 || (e3.encodings = [].concat(this.sendEncodings || [{}])), e3;
            });
          }
        }
        function l(e2) {
          if (a(e2) === "object" && e2.RTCPeerConnection) {
            var t2 = e2.RTCPeerConnection.prototype.createOffer;
            e2.RTCPeerConnection.prototype.createOffer = function() {
              var e3 = arguments, n2 = this;
              return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(function() {
                return t2.apply(n2, e3);
              }).finally(function() {
                n2.setParametersPromises = [];
              }) : t2.apply(this, arguments);
            };
          }
        }
        function m(e2) {
          if (a(e2) === "object" && e2.RTCPeerConnection) {
            var t2 = e2.RTCPeerConnection.prototype.createAnswer;
            e2.RTCPeerConnection.prototype.createAnswer = function() {
              var e3 = arguments, n2 = this;
              return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(function() {
                return t2.apply(n2, e3);
              }).finally(function() {
                n2.setParametersPromises = [];
              }) : t2.apply(this, arguments);
            };
          }
        }
      }, { "../utils": "iSxC", "./getusermedia": "GzSv", "./getdisplaymedia": "UuGU" }], "t1lL": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimLocalStreamsAPI = n, exports2.shimRemoteStreamsAPI = i, exports2.shimCallbacksAPI = a, exports2.shimGetUserMedia = c, exports2.shimConstraints = s, exports2.shimRTCIceServerUrls = d, exports2.shimTrackEventTransceiver = f, exports2.shimCreateOfferLegacy = p, exports2.shimAudioContext = u;
        var e = r(require2("../utils"));
        function t() {
          if (typeof WeakMap != "function")
            return null;
          var e2 = /* @__PURE__ */ new WeakMap();
          return t = function() {
            return e2;
          }, e2;
        }
        function r(e2) {
          if (e2 && e2.__esModule)
            return e2;
          if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
            return { default: e2 };
          var r2 = t();
          if (r2 && r2.has(e2))
            return r2.get(e2);
          var o2 = {}, n2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i2 in e2)
            if (Object.prototype.hasOwnProperty.call(e2, i2)) {
              var a2 = n2 ? Object.getOwnPropertyDescriptor(e2, i2) : null;
              a2 && (a2.get || a2.set) ? Object.defineProperty(o2, i2, a2) : o2[i2] = e2[i2];
            }
          return o2.default = e2, r2 && r2.set(e2, o2), o2;
        }
        function o(e2) {
          return (o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        function n(e2) {
          if (o(e2) === "object" && e2.RTCPeerConnection) {
            if ("getLocalStreams" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.getLocalStreams = function() {
              return this._localStreams || (this._localStreams = []), this._localStreams;
            }), !("addStream" in e2.RTCPeerConnection.prototype)) {
              var t2 = e2.RTCPeerConnection.prototype.addTrack;
              e2.RTCPeerConnection.prototype.addStream = function(e3) {
                var r2 = this;
                this._localStreams || (this._localStreams = []), this._localStreams.includes(e3) || this._localStreams.push(e3), e3.getAudioTracks().forEach(function(o2) {
                  return t2.call(r2, o2, e3);
                }), e3.getVideoTracks().forEach(function(o2) {
                  return t2.call(r2, o2, e3);
                });
              }, e2.RTCPeerConnection.prototype.addTrack = function(e3) {
                for (var r2 = this, o2 = arguments.length, n2 = new Array(o2 > 1 ? o2 - 1 : 0), i2 = 1; i2 < o2; i2++)
                  n2[i2 - 1] = arguments[i2];
                return n2 && n2.forEach(function(e4) {
                  r2._localStreams ? r2._localStreams.includes(e4) || r2._localStreams.push(e4) : r2._localStreams = [e4];
                }), t2.apply(this, arguments);
              };
            }
            "removeStream" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.removeStream = function(e3) {
              var t3 = this;
              this._localStreams || (this._localStreams = []);
              var r2 = this._localStreams.indexOf(e3);
              if (r2 !== -1) {
                this._localStreams.splice(r2, 1);
                var o2 = e3.getTracks();
                this.getSenders().forEach(function(e4) {
                  o2.includes(e4.track) && t3.removeTrack(e4);
                });
              }
            });
          }
        }
        function i(e2) {
          if (o(e2) === "object" && e2.RTCPeerConnection && ("getRemoteStreams" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.getRemoteStreams = function() {
            return this._remoteStreams ? this._remoteStreams : [];
          }), !("onaddstream" in e2.RTCPeerConnection.prototype))) {
            Object.defineProperty(e2.RTCPeerConnection.prototype, "onaddstream", { get: function() {
              return this._onaddstream;
            }, set: function(e3) {
              var t3 = this;
              this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e3), this.addEventListener("track", this._onaddstreampoly = function(e4) {
                e4.streams.forEach(function(e5) {
                  if (t3._remoteStreams || (t3._remoteStreams = []), !t3._remoteStreams.includes(e5)) {
                    t3._remoteStreams.push(e5);
                    var r2 = new Event("addstream");
                    r2.stream = e5, t3.dispatchEvent(r2);
                  }
                });
              });
            } });
            var t2 = e2.RTCPeerConnection.prototype.setRemoteDescription;
            e2.RTCPeerConnection.prototype.setRemoteDescription = function() {
              var e3 = this;
              return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(t3) {
                t3.streams.forEach(function(t4) {
                  if (e3._remoteStreams || (e3._remoteStreams = []), !(e3._remoteStreams.indexOf(t4) >= 0)) {
                    e3._remoteStreams.push(t4);
                    var r2 = new Event("addstream");
                    r2.stream = t4, e3.dispatchEvent(r2);
                  }
                });
              }), t2.apply(e3, arguments);
            };
          }
        }
        function a(e2) {
          if (o(e2) === "object" && e2.RTCPeerConnection) {
            var t2 = e2.RTCPeerConnection.prototype, r2 = t2.createOffer, n2 = t2.createAnswer, i2 = t2.setLocalDescription, a2 = t2.setRemoteDescription, c2 = t2.addIceCandidate;
            t2.createOffer = function(e3, t3) {
              var o2 = arguments.length >= 2 ? arguments[2] : arguments[0], n3 = r2.apply(this, [o2]);
              return t3 ? (n3.then(e3, t3), Promise.resolve()) : n3;
            }, t2.createAnswer = function(e3, t3) {
              var r3 = arguments.length >= 2 ? arguments[2] : arguments[0], o2 = n2.apply(this, [r3]);
              return t3 ? (o2.then(e3, t3), Promise.resolve()) : o2;
            };
            var s2 = function(e3, t3, r3) {
              var o2 = i2.apply(this, [e3]);
              return r3 ? (o2.then(t3, r3), Promise.resolve()) : o2;
            };
            t2.setLocalDescription = s2, s2 = function(e3, t3, r3) {
              var o2 = a2.apply(this, [e3]);
              return r3 ? (o2.then(t3, r3), Promise.resolve()) : o2;
            }, t2.setRemoteDescription = s2, s2 = function(e3, t3, r3) {
              var o2 = c2.apply(this, [e3]);
              return r3 ? (o2.then(t3, r3), Promise.resolve()) : o2;
            }, t2.addIceCandidate = s2;
          }
        }
        function c(e2) {
          var t2 = e2 && e2.navigator;
          if (t2.mediaDevices && t2.mediaDevices.getUserMedia) {
            var r2 = t2.mediaDevices, o2 = r2.getUserMedia.bind(r2);
            t2.mediaDevices.getUserMedia = function(e3) {
              return o2(s(e3));
            };
          }
          !t2.getUserMedia && t2.mediaDevices && t2.mediaDevices.getUserMedia && (t2.getUserMedia = function(e3, r3, o3) {
            t2.mediaDevices.getUserMedia(e3).then(r3, o3);
          }.bind(t2));
        }
        function s(t2) {
          return t2 && t2.video !== void 0 ? Object.assign({}, t2, { video: e.compactObject(t2.video) }) : t2;
        }
        function d(t2) {
          if (t2.RTCPeerConnection) {
            var r2 = t2.RTCPeerConnection;
            t2.RTCPeerConnection = function(t3, o2) {
              if (t3 && t3.iceServers) {
                for (var n2 = [], i2 = 0; i2 < t3.iceServers.length; i2++) {
                  var a2 = t3.iceServers[i2];
                  !a2.hasOwnProperty("urls") && a2.hasOwnProperty("url") ? (e.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (a2 = JSON.parse(JSON.stringify(a2))).urls = a2.url, delete a2.url, n2.push(a2)) : n2.push(t3.iceServers[i2]);
                }
                t3.iceServers = n2;
              }
              return new r2(t3, o2);
            }, t2.RTCPeerConnection.prototype = r2.prototype, "generateCertificate" in r2 && Object.defineProperty(t2.RTCPeerConnection, "generateCertificate", { get: function() {
              return r2.generateCertificate;
            } });
          }
        }
        function f(e2) {
          o(e2) === "object" && e2.RTCTrackEvent && "receiver" in e2.RTCTrackEvent.prototype && !("transceiver" in e2.RTCTrackEvent.prototype) && Object.defineProperty(e2.RTCTrackEvent.prototype, "transceiver", { get: function() {
            return { receiver: this.receiver };
          } });
        }
        function p(e2) {
          var t2 = e2.RTCPeerConnection.prototype.createOffer;
          e2.RTCPeerConnection.prototype.createOffer = function(e3) {
            if (e3) {
              e3.offerToReceiveAudio !== void 0 && (e3.offerToReceiveAudio = !!e3.offerToReceiveAudio);
              var r2 = this.getTransceivers().find(function(e4) {
                return e4.receiver.track.kind === "audio";
              });
              e3.offerToReceiveAudio === false && r2 ? r2.direction === "sendrecv" ? r2.setDirection ? r2.setDirection("sendonly") : r2.direction = "sendonly" : r2.direction === "recvonly" && (r2.setDirection ? r2.setDirection("inactive") : r2.direction = "inactive") : e3.offerToReceiveAudio !== true || r2 || this.addTransceiver("audio"), e3.offerToReceiveVideo !== void 0 && (e3.offerToReceiveVideo = !!e3.offerToReceiveVideo);
              var o2 = this.getTransceivers().find(function(e4) {
                return e4.receiver.track.kind === "video";
              });
              e3.offerToReceiveVideo === false && o2 ? o2.direction === "sendrecv" ? o2.setDirection ? o2.setDirection("sendonly") : o2.direction = "sendonly" : o2.direction === "recvonly" && (o2.setDirection ? o2.setDirection("inactive") : o2.direction = "inactive") : e3.offerToReceiveVideo !== true || o2 || this.addTransceiver("video");
            }
            return t2.apply(this, arguments);
          };
        }
        function u(e2) {
          o(e2) !== "object" || e2.AudioContext || (e2.AudioContext = e2.webkitAudioContext);
        }
      }, { "../utils": "iSxC" }], "GOQK": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.shimRTCIceCandidate = a, exports2.shimMaxMessageSize = c, exports2.shimSendThrowTypeError = s, exports2.shimConnectionState = p, exports2.removeExtmapAllowMixed = d, exports2.shimAddIceCandidateNullOrEmpty = u;
        var e = r(require2("sdp")), t = o(require2("./utils"));
        function n() {
          if (typeof WeakMap != "function")
            return null;
          var e2 = /* @__PURE__ */ new WeakMap();
          return n = function() {
            return e2;
          }, e2;
        }
        function o(e2) {
          if (e2 && e2.__esModule)
            return e2;
          if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
            return { default: e2 };
          var t2 = n();
          if (t2 && t2.has(e2))
            return t2.get(e2);
          var o2 = {}, r2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i2 in e2)
            if (Object.prototype.hasOwnProperty.call(e2, i2)) {
              var a2 = r2 ? Object.getOwnPropertyDescriptor(e2, i2) : null;
              a2 && (a2.get || a2.set) ? Object.defineProperty(o2, i2, a2) : o2[i2] = e2[i2];
            }
          return o2.default = e2, t2 && t2.set(e2, o2), o2;
        }
        function r(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        }
        function i(e2) {
          return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        function a(n2) {
          if (n2.RTCIceCandidate && !(n2.RTCIceCandidate && "foundation" in n2.RTCIceCandidate.prototype)) {
            var o2 = n2.RTCIceCandidate;
            n2.RTCIceCandidate = function(t2) {
              if (i(t2) === "object" && t2.candidate && t2.candidate.indexOf("a=") === 0 && ((t2 = JSON.parse(JSON.stringify(t2))).candidate = t2.candidate.substr(2)), t2.candidate && t2.candidate.length) {
                var n3 = new o2(t2), r2 = e.default.parseCandidate(t2.candidate), a2 = Object.assign(n3, r2);
                return a2.toJSON = function() {
                  return { candidate: a2.candidate, sdpMid: a2.sdpMid, sdpMLineIndex: a2.sdpMLineIndex, usernameFragment: a2.usernameFragment };
                }, a2;
              }
              return new o2(t2);
            }, n2.RTCIceCandidate.prototype = o2.prototype, t.wrapPeerConnectionEvent(n2, "icecandidate", function(e2) {
              return e2.candidate && Object.defineProperty(e2, "candidate", { value: new n2.RTCIceCandidate(e2.candidate), writable: "false" }), e2;
            });
          }
        }
        function c(t2, n2) {
          if (t2.RTCPeerConnection) {
            "sctp" in t2.RTCPeerConnection.prototype || Object.defineProperty(t2.RTCPeerConnection.prototype, "sctp", { get: function() {
              return this._sctp === void 0 ? null : this._sctp;
            } });
            var o2 = t2.RTCPeerConnection.prototype.setRemoteDescription;
            t2.RTCPeerConnection.prototype.setRemoteDescription = function() {
              if (this._sctp = null, n2.browser === "chrome" && n2.version >= 76) {
                var { sdpSemantics: t3 } = this.getConfiguration();
                t3 === "plan-b" && Object.defineProperty(this, "sctp", { get: function() {
                  return this._sctp === void 0 ? null : this._sctp;
                }, enumerable: true, configurable: true });
              }
              if (function(t4) {
                if (!t4 || !t4.sdp)
                  return false;
                var n3 = e.default.splitSections(t4.sdp);
                return n3.shift(), n3.some(function(t5) {
                  var n4 = e.default.parseMLine(t5);
                  return n4 && n4.kind === "application" && n4.protocol.indexOf("SCTP") !== -1;
                });
              }(arguments[0])) {
                var r2, i2 = function(e2) {
                  var t4 = e2.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                  if (t4 === null || t4.length < 2)
                    return -1;
                  var n3 = parseInt(t4[1], 10);
                  return n3 != n3 ? -1 : n3;
                }(arguments[0]), a2 = (p2 = i2, d2 = 65536, n2.browser === "firefox" && (d2 = n2.version < 57 ? p2 === -1 ? 16384 : 2147483637 : n2.version < 60 ? n2.version === 57 ? 65535 : 65536 : 2147483637), d2), c2 = function(t4, o3) {
                  var r3 = 65536;
                  n2.browser === "firefox" && n2.version === 57 && (r3 = 65535);
                  var i3 = e.default.matchPrefix(t4.sdp, "a=max-message-size:");
                  return i3.length > 0 ? r3 = parseInt(i3[0].substr(19), 10) : n2.browser === "firefox" && o3 !== -1 && (r3 = 2147483637), r3;
                }(arguments[0], i2);
                r2 = a2 === 0 && c2 === 0 ? Number.POSITIVE_INFINITY : a2 === 0 || c2 === 0 ? Math.max(a2, c2) : Math.min(a2, c2);
                var s2 = {};
                Object.defineProperty(s2, "maxMessageSize", { get: function() {
                  return r2;
                } }), this._sctp = s2;
              }
              var p2, d2;
              return o2.apply(this, arguments);
            };
          }
        }
        function s(e2) {
          if (e2.RTCPeerConnection && "createDataChannel" in e2.RTCPeerConnection.prototype) {
            var n2 = e2.RTCPeerConnection.prototype.createDataChannel;
            e2.RTCPeerConnection.prototype.createDataChannel = function() {
              var e3 = n2.apply(this, arguments);
              return o2(e3, this), e3;
            }, t.wrapPeerConnectionEvent(e2, "datachannel", function(e3) {
              return o2(e3.channel, e3.target), e3;
            });
          }
          function o2(e3, t2) {
            var n3 = e3.send;
            e3.send = function() {
              var o3 = arguments[0], r2 = o3.length || o3.size || o3.byteLength;
              if (e3.readyState === "open" && t2.sctp && r2 > t2.sctp.maxMessageSize)
                throw new TypeError("Message too large (can send a maximum of " + t2.sctp.maxMessageSize + " bytes)");
              return n3.apply(e3, arguments);
            };
          }
        }
        function p(e2) {
          if (e2.RTCPeerConnection && !("connectionState" in e2.RTCPeerConnection.prototype)) {
            var t2 = e2.RTCPeerConnection.prototype;
            Object.defineProperty(t2, "connectionState", { get: function() {
              return { completed: "connected", checking: "connecting" }[this.iceConnectionState] || this.iceConnectionState;
            }, enumerable: true, configurable: true }), Object.defineProperty(t2, "onconnectionstatechange", { get: function() {
              return this._onconnectionstatechange || null;
            }, set: function(e3) {
              this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), e3 && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e3);
            }, enumerable: true, configurable: true }), ["setLocalDescription", "setRemoteDescription"].forEach(function(e3) {
              var n2 = t2[e3];
              t2[e3] = function() {
                return this._connectionstatechangepoly || (this._connectionstatechangepoly = function(e4) {
                  var t3 = e4.target;
                  if (t3._lastConnectionState !== t3.connectionState) {
                    t3._lastConnectionState = t3.connectionState;
                    var n3 = new Event("connectionstatechange", e4);
                    t3.dispatchEvent(n3);
                  }
                  return e4;
                }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n2.apply(this, arguments);
              };
            });
          }
        }
        function d(e2, t2) {
          if (e2.RTCPeerConnection && !(t2.browser === "chrome" && t2.version >= 71 || t2.browser === "safari" && t2.version >= 605)) {
            var n2 = e2.RTCPeerConnection.prototype.setRemoteDescription;
            e2.RTCPeerConnection.prototype.setRemoteDescription = function(t3) {
              if (t3 && t3.sdp && t3.sdp.indexOf("\na=extmap-allow-mixed") !== -1) {
                var o2 = t3.sdp.split("\n").filter(function(e3) {
                  return e3.trim() !== "a=extmap-allow-mixed";
                }).join("\n");
                e2.RTCSessionDescription && t3 instanceof e2.RTCSessionDescription ? arguments[0] = new e2.RTCSessionDescription({ type: t3.type, sdp: o2 }) : t3.sdp = o2;
              }
              return n2.apply(this, arguments);
            };
          }
        }
        function u(e2, t2) {
          if (e2.RTCPeerConnection && e2.RTCPeerConnection.prototype) {
            var n2 = e2.RTCPeerConnection.prototype.addIceCandidate;
            n2 && n2.length !== 0 && (e2.RTCPeerConnection.prototype.addIceCandidate = function() {
              return arguments[0] ? (t2.browser === "chrome" && t2.version < 78 || t2.browser === "firefox" && t2.version < 68 || t2.browser === "safari") && arguments[0] && arguments[0].candidate === "" ? Promise.resolve() : n2.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
            });
          }
        }
      }, { "sdp": "YHvh", "./utils": "iSxC" }], "KtlG": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.adapterFactory = o;
        var e = m(require2("./utils")), i = m(require2("./chrome/chrome_shim")), r = m(require2("./edge/edge_shim")), s = m(require2("./firefox/firefox_shim")), t = m(require2("./safari/safari_shim")), a = m(require2("./common_shim"));
        function n() {
          if (typeof WeakMap != "function")
            return null;
          var e2 = /* @__PURE__ */ new WeakMap();
          return n = function() {
            return e2;
          }, e2;
        }
        function m(e2) {
          if (e2 && e2.__esModule)
            return e2;
          if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
            return { default: e2 };
          var i2 = n();
          if (i2 && i2.has(e2))
            return i2.get(e2);
          var r2 = {}, s2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var t2 in e2)
            if (Object.prototype.hasOwnProperty.call(e2, t2)) {
              var a2 = s2 ? Object.getOwnPropertyDescriptor(e2, t2) : null;
              a2 && (a2.get || a2.set) ? Object.defineProperty(r2, t2, a2) : r2[t2] = e2[t2];
            }
          return r2.default = e2, i2 && i2.set(e2, r2), r2;
        }
        function o() {
          var { window: n2 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, m2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { shimChrome: true, shimFirefox: true, shimEdge: true, shimSafari: true }, o2 = e.log, h = e.detectBrowser(n2), d = { browserDetails: h, commonShim: a, extractVersion: e.extractVersion, disableLog: e.disableLog, disableWarnings: e.disableWarnings };
          switch (h.browser) {
            case "chrome":
              if (!i || !i.shimPeerConnection || !m2.shimChrome)
                return o2("Chrome shim is not included in this adapter release."), d;
              if (h.version === null)
                return o2("Chrome shim can not determine version, not shimming."), d;
              o2("adapter.js shimming chrome."), d.browserShim = i, a.shimAddIceCandidateNullOrEmpty(n2, h), i.shimGetUserMedia(n2, h), i.shimMediaStream(n2, h), i.shimPeerConnection(n2, h), i.shimOnTrack(n2, h), i.shimAddTrackRemoveTrack(n2, h), i.shimGetSendersWithDtmf(n2, h), i.shimGetStats(n2, h), i.shimSenderReceiverGetStats(n2, h), i.fixNegotiationNeeded(n2, h), a.shimRTCIceCandidate(n2, h), a.shimConnectionState(n2, h), a.shimMaxMessageSize(n2, h), a.shimSendThrowTypeError(n2, h), a.removeExtmapAllowMixed(n2, h);
              break;
            case "firefox":
              if (!s || !s.shimPeerConnection || !m2.shimFirefox)
                return o2("Firefox shim is not included in this adapter release."), d;
              o2("adapter.js shimming firefox."), d.browserShim = s, a.shimAddIceCandidateNullOrEmpty(n2, h), s.shimGetUserMedia(n2, h), s.shimPeerConnection(n2, h), s.shimOnTrack(n2, h), s.shimRemoveStream(n2, h), s.shimSenderGetStats(n2, h), s.shimReceiverGetStats(n2, h), s.shimRTCDataChannel(n2, h), s.shimAddTransceiver(n2, h), s.shimGetParameters(n2, h), s.shimCreateOffer(n2, h), s.shimCreateAnswer(n2, h), a.shimRTCIceCandidate(n2, h), a.shimConnectionState(n2, h), a.shimMaxMessageSize(n2, h), a.shimSendThrowTypeError(n2, h);
              break;
            case "edge":
              if (!r || !r.shimPeerConnection || !m2.shimEdge)
                return o2("MS edge shim is not included in this adapter release."), d;
              o2("adapter.js shimming edge."), d.browserShim = r, r.shimGetUserMedia(n2, h), r.shimGetDisplayMedia(n2, h), r.shimPeerConnection(n2, h), r.shimReplaceTrack(n2, h), a.shimMaxMessageSize(n2, h), a.shimSendThrowTypeError(n2, h);
              break;
            case "safari":
              if (!t || !m2.shimSafari)
                return o2("Safari shim is not included in this adapter release."), d;
              o2("adapter.js shimming safari."), d.browserShim = t, a.shimAddIceCandidateNullOrEmpty(n2, h), t.shimRTCIceServerUrls(n2, h), t.shimCreateOfferLegacy(n2, h), t.shimCallbacksAPI(n2, h), t.shimLocalStreamsAPI(n2, h), t.shimRemoteStreamsAPI(n2, h), t.shimTrackEventTransceiver(n2, h), t.shimGetUserMedia(n2, h), t.shimAudioContext(n2, h), a.shimRTCIceCandidate(n2, h), a.shimMaxMessageSize(n2, h), a.shimSendThrowTypeError(n2, h), a.removeExtmapAllowMixed(n2, h);
              break;
            default:
              o2("Unsupported browser!");
          }
          return d;
        }
      }, { "./utils": "iSxC", "./chrome/chrome_shim": "uI5X", "./edge/edge_shim": "XRic", "./firefox/firefox_shim": "Fzdr", "./safari/safari_shim": "t1lL", "./common_shim": "GOQK" }], "tI1X": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.default = void 0;
        var e = require2("./adapter_factory.js"), t = (0, e.adapterFactory)({ window: typeof window == "undefined" ? void 0 : window }), d = t;
        exports2.default = d;
      }, { "./adapter_factory.js": "KtlG" }], "sXtV": [function(require2, module2, exports2) {
        "use strict";
        var e = this && this.__importDefault || function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        };
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.webRTCAdapter = void 0;
        var t = e(require2("webrtc-adapter"));
        exports2.webRTCAdapter = t.default;
      }, { "webrtc-adapter": "tI1X" }], "I31f": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.Supports = void 0;
        var r = require2("./adapter");
        exports2.Supports = new (function() {
          function e() {
            this.isIOS = ["iPad", "iPhone", "iPod"].includes(navigator.platform), this.supportedBrowsers = ["firefox", "chrome", "safari"], this.minFirefoxVersion = 59, this.minChromeVersion = 72, this.minSafariVersion = 605;
          }
          return e.prototype.isWebRTCSupported = function() {
            return typeof RTCPeerConnection != "undefined";
          }, e.prototype.isBrowserSupported = function() {
            var r2 = this.getBrowser(), e2 = this.getVersion();
            return !!this.supportedBrowsers.includes(r2) && (r2 === "chrome" ? e2 >= this.minChromeVersion : r2 === "firefox" ? e2 >= this.minFirefoxVersion : r2 === "safari" && (!this.isIOS && e2 >= this.minSafariVersion));
          }, e.prototype.getBrowser = function() {
            return r.webRTCAdapter.browserDetails.browser;
          }, e.prototype.getVersion = function() {
            return r.webRTCAdapter.browserDetails.version || 0;
          }, e.prototype.isUnifiedPlanSupported = function() {
            var e2, i = this.getBrowser(), t = r.webRTCAdapter.browserDetails.version || 0;
            if (i === "chrome" && t < 72)
              return false;
            if (i === "firefox" && t >= 59)
              return true;
            if (!(window.RTCRtpTransceiver && "currentDirection" in RTCRtpTransceiver.prototype))
              return false;
            var o = false;
            try {
              (e2 = new RTCPeerConnection()).addTransceiver("audio"), o = true;
            } catch (s) {
            } finally {
              e2 && e2.close();
            }
            return o;
          }, e.prototype.toString = function() {
            return "Supports: \n    browser:" + this.getBrowser() + " \n    version:" + this.getVersion() + " \n    isIOS:" + this.isIOS + " \n    isWebRTCSupported:" + this.isWebRTCSupported() + " \n    isBrowserSupported:" + this.isBrowserSupported() + " \n    isUnifiedPlanSupported:" + this.isUnifiedPlanSupported();
          }, e;
        }())();
      }, { "./adapter": "sXtV" }], "BHXf": [function(require2, module2, exports2) {
        "use strict";
        var e = this && this.__createBinding || (Object.create ? function(e2, t2, r2, o2) {
          o2 === void 0 && (o2 = r2), Object.defineProperty(e2, o2, { enumerable: true, get: function() {
            return t2[r2];
          } });
        } : function(e2, t2, r2, o2) {
          o2 === void 0 && (o2 = r2), e2[o2] = t2[r2];
        }), t = this && this.__setModuleDefault || (Object.create ? function(e2, t2) {
          Object.defineProperty(e2, "default", { enumerable: true, value: t2 });
        } : function(e2, t2) {
          e2.default = t2;
        }), r = this && this.__importStar || function(r2) {
          if (r2 && r2.__esModule)
            return r2;
          var o2 = {};
          if (r2 != null)
            for (var n2 in r2)
              n2 !== "default" && Object.prototype.hasOwnProperty.call(r2, n2) && e(o2, r2, n2);
          return t(o2, r2), o2;
        };
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.util = void 0;
        var o = r(require2("peerjs-js-binarypack")), n = require2("./supports"), i = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "turn:0.peerjs.com:3478", username: "peerjs", credential: "peerjsp" }], sdpSemantics: "unified-plan" };
        exports2.util = new (function() {
          function e2() {
            this.CLOUD_HOST = "0.peerjs.com", this.CLOUD_PORT = 443, this.chunkedBrowsers = { Chrome: 1, chrome: 1 }, this.chunkedMTU = 16300, this.defaultConfig = i, this.browser = n.Supports.getBrowser(), this.browserVersion = n.Supports.getVersion(), this.supports = function() {
              var e3, t2 = { browser: n.Supports.isBrowserSupported(), webRTC: n.Supports.isWebRTCSupported(), audioVideo: false, data: false, binaryBlob: false, reliable: false };
              if (!t2.webRTC)
                return t2;
              try {
                e3 = new RTCPeerConnection(i), t2.audioVideo = true;
                var r2 = void 0;
                try {
                  r2 = e3.createDataChannel("_PEERJSTEST", { ordered: true }), t2.data = true, t2.reliable = !!r2.ordered;
                  try {
                    r2.binaryType = "blob", t2.binaryBlob = !n.Supports.isIOS;
                  } catch (o2) {
                  }
                } catch (o2) {
                } finally {
                  r2 && r2.close();
                }
              } catch (o2) {
              } finally {
                e3 && e3.close();
              }
              return t2;
            }(), this.pack = o.pack, this.unpack = o.unpack, this._dataCount = 1;
          }
          return e2.prototype.noop = function() {
          }, e2.prototype.validateId = function(e3) {
            return !e3 || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e3);
          }, e2.prototype.chunk = function(e3) {
            for (var t2 = [], r2 = e3.size, o2 = Math.ceil(r2 / exports2.util.chunkedMTU), n2 = 0, i2 = 0; i2 < r2; ) {
              var a = Math.min(r2, i2 + exports2.util.chunkedMTU), u = e3.slice(i2, a), s = { __peerData: this._dataCount, n: n2, data: u, total: o2 };
              t2.push(s), i2 = a, n2++;
            }
            return this._dataCount++, t2;
          }, e2.prototype.blobToArrayBuffer = function(e3, t2) {
            var r2 = new FileReader();
            return r2.onload = function(e4) {
              e4.target && t2(e4.target.result);
            }, r2.readAsArrayBuffer(e3), r2;
          }, e2.prototype.binaryStringToArrayBuffer = function(e3) {
            for (var t2 = new Uint8Array(e3.length), r2 = 0; r2 < e3.length; r2++)
              t2[r2] = 255 & e3.charCodeAt(r2);
            return t2.buffer;
          }, e2.prototype.randomToken = function() {
            return Math.random().toString(36).substr(2);
          }, e2.prototype.isSecure = function() {
            return location.protocol === "https:";
          }, e2;
        }())();
      }, { "peerjs-js-binarypack": "kdPp", "./supports": "I31f" }], "JJlS": [function(require2, module2, exports2) {
        "use strict";
        var e = Object.prototype.hasOwnProperty, t = "~";
        function n() {
        }
        function r(e2, t2, n2) {
          this.fn = e2, this.context = t2, this.once = n2 || false;
        }
        function o(e2, n2, o2, s2, i2) {
          if (typeof o2 != "function")
            throw new TypeError("The listener must be a function");
          var c = new r(o2, s2 || e2, i2), f = t ? t + n2 : n2;
          return e2._events[f] ? e2._events[f].fn ? e2._events[f] = [e2._events[f], c] : e2._events[f].push(c) : (e2._events[f] = c, e2._eventsCount++), e2;
        }
        function s(e2, t2) {
          --e2._eventsCount == 0 ? e2._events = new n() : delete e2._events[t2];
        }
        function i() {
          this._events = new n(), this._eventsCount = 0;
        }
        Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (t = false)), i.prototype.eventNames = function() {
          var n2, r2, o2 = [];
          if (this._eventsCount === 0)
            return o2;
          for (r2 in n2 = this._events)
            e.call(n2, r2) && o2.push(t ? r2.slice(1) : r2);
          return Object.getOwnPropertySymbols ? o2.concat(Object.getOwnPropertySymbols(n2)) : o2;
        }, i.prototype.listeners = function(e2) {
          var n2 = t ? t + e2 : e2, r2 = this._events[n2];
          if (!r2)
            return [];
          if (r2.fn)
            return [r2.fn];
          for (var o2 = 0, s2 = r2.length, i2 = new Array(s2); o2 < s2; o2++)
            i2[o2] = r2[o2].fn;
          return i2;
        }, i.prototype.listenerCount = function(e2) {
          var n2 = t ? t + e2 : e2, r2 = this._events[n2];
          return r2 ? r2.fn ? 1 : r2.length : 0;
        }, i.prototype.emit = function(e2, n2, r2, o2, s2, i2) {
          var c = t ? t + e2 : e2;
          if (!this._events[c])
            return false;
          var f, u, a = this._events[c], l = arguments.length;
          if (a.fn) {
            switch (a.once && this.removeListener(e2, a.fn, void 0, true), l) {
              case 1:
                return a.fn.call(a.context), true;
              case 2:
                return a.fn.call(a.context, n2), true;
              case 3:
                return a.fn.call(a.context, n2, r2), true;
              case 4:
                return a.fn.call(a.context, n2, r2, o2), true;
              case 5:
                return a.fn.call(a.context, n2, r2, o2, s2), true;
              case 6:
                return a.fn.call(a.context, n2, r2, o2, s2, i2), true;
            }
            for (u = 1, f = new Array(l - 1); u < l; u++)
              f[u - 1] = arguments[u];
            a.fn.apply(a.context, f);
          } else {
            var v, h = a.length;
            for (u = 0; u < h; u++)
              switch (a[u].once && this.removeListener(e2, a[u].fn, void 0, true), l) {
                case 1:
                  a[u].fn.call(a[u].context);
                  break;
                case 2:
                  a[u].fn.call(a[u].context, n2);
                  break;
                case 3:
                  a[u].fn.call(a[u].context, n2, r2);
                  break;
                case 4:
                  a[u].fn.call(a[u].context, n2, r2, o2);
                  break;
                default:
                  if (!f)
                    for (v = 1, f = new Array(l - 1); v < l; v++)
                      f[v - 1] = arguments[v];
                  a[u].fn.apply(a[u].context, f);
              }
          }
          return true;
        }, i.prototype.on = function(e2, t2, n2) {
          return o(this, e2, t2, n2, false);
        }, i.prototype.once = function(e2, t2, n2) {
          return o(this, e2, t2, n2, true);
        }, i.prototype.removeListener = function(e2, n2, r2, o2) {
          var i2 = t ? t + e2 : e2;
          if (!this._events[i2])
            return this;
          if (!n2)
            return s(this, i2), this;
          var c = this._events[i2];
          if (c.fn)
            c.fn !== n2 || o2 && !c.once || r2 && c.context !== r2 || s(this, i2);
          else {
            for (var f = 0, u = [], a = c.length; f < a; f++)
              (c[f].fn !== n2 || o2 && !c[f].once || r2 && c[f].context !== r2) && u.push(c[f]);
            u.length ? this._events[i2] = u.length === 1 ? u[0] : u : s(this, i2);
          }
          return this;
        }, i.prototype.removeAllListeners = function(e2) {
          var r2;
          return e2 ? (r2 = t ? t + e2 : e2, this._events[r2] && s(this, r2)) : (this._events = new n(), this._eventsCount = 0), this;
        }, i.prototype.off = i.prototype.removeListener, i.prototype.addListener = i.prototype.on, i.prefixed = t, i.EventEmitter = i, typeof module2 != "undefined" && (module2.exports = i);
      }, {}], "WOs9": [function(require2, module2, exports2) {
        "use strict";
        var r = this && this.__read || function(r2, e2) {
          var o2 = typeof Symbol == "function" && r2[Symbol.iterator];
          if (!o2)
            return r2;
          var t2, n2, l = o2.call(r2), i = [];
          try {
            for (; (e2 === void 0 || e2-- > 0) && !(t2 = l.next()).done; )
              i.push(t2.value);
          } catch (s) {
            n2 = { error: s };
          } finally {
            try {
              t2 && !t2.done && (o2 = l.return) && o2.call(l);
            } finally {
              if (n2)
                throw n2.error;
            }
          }
          return i;
        }, e = this && this.__spreadArray || function(r2, e2) {
          for (var o2 = 0, t2 = e2.length, n2 = r2.length; o2 < t2; o2++, n2++)
            r2[n2] = e2[o2];
          return r2;
        };
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.LogLevel = void 0;
        var o, t = "PeerJS: ";
        !function(r2) {
          r2[r2.Disabled = 0] = "Disabled", r2[r2.Errors = 1] = "Errors", r2[r2.Warnings = 2] = "Warnings", r2[r2.All = 3] = "All";
        }(o = exports2.LogLevel || (exports2.LogLevel = {}));
        var n = function() {
          function n2() {
            this._logLevel = o.Disabled;
          }
          return Object.defineProperty(n2.prototype, "logLevel", { get: function() {
            return this._logLevel;
          }, set: function(r2) {
            this._logLevel = r2;
          }, enumerable: false, configurable: true }), n2.prototype.log = function() {
            for (var t2 = [], n3 = 0; n3 < arguments.length; n3++)
              t2[n3] = arguments[n3];
            this._logLevel >= o.All && this._print.apply(this, e([o.All], r(t2)));
          }, n2.prototype.warn = function() {
            for (var t2 = [], n3 = 0; n3 < arguments.length; n3++)
              t2[n3] = arguments[n3];
            this._logLevel >= o.Warnings && this._print.apply(this, e([o.Warnings], r(t2)));
          }, n2.prototype.error = function() {
            for (var t2 = [], n3 = 0; n3 < arguments.length; n3++)
              t2[n3] = arguments[n3];
            this._logLevel >= o.Errors && this._print.apply(this, e([o.Errors], r(t2)));
          }, n2.prototype.setLogFunction = function(r2) {
            this._print = r2;
          }, n2.prototype._print = function(n3) {
            for (var l = [], i = 1; i < arguments.length; i++)
              l[i - 1] = arguments[i];
            var s = e([t], r(l));
            for (var a in s)
              s[a] instanceof Error && (s[a] = "(" + s[a].name + ") " + s[a].message);
            n3 >= o.All ? console.log.apply(console, e([], r(s))) : n3 >= o.Warnings ? console.warn.apply(console, e(["WARNING"], r(s))) : n3 >= o.Errors && console.error.apply(console, e(["ERROR"], r(s)));
          }, n2;
        }();
        exports2.default = new n();
      }, {}], "ZRYf": [function(require2, module2, exports2) {
        "use strict";
        var e, r, o, n, t, a, i;
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.ServerMessageType = exports2.SocketEventType = exports2.SerializationType = exports2.PeerErrorType = exports2.PeerEventType = exports2.ConnectionType = exports2.ConnectionEventType = void 0, function(e2) {
          e2.Open = "open", e2.Stream = "stream", e2.Data = "data", e2.Close = "close", e2.Error = "error", e2.IceStateChanged = "iceStateChanged";
        }(e = exports2.ConnectionEventType || (exports2.ConnectionEventType = {})), function(e2) {
          e2.Data = "data", e2.Media = "media";
        }(r = exports2.ConnectionType || (exports2.ConnectionType = {})), function(e2) {
          e2.Open = "open", e2.Close = "close", e2.Connection = "connection", e2.Call = "call", e2.Disconnected = "disconnected", e2.Error = "error";
        }(o = exports2.PeerEventType || (exports2.PeerEventType = {})), function(e2) {
          e2.BrowserIncompatible = "browser-incompatible", e2.Disconnected = "disconnected", e2.InvalidID = "invalid-id", e2.InvalidKey = "invalid-key", e2.Network = "network", e2.PeerUnavailable = "peer-unavailable", e2.SslUnavailable = "ssl-unavailable", e2.ServerError = "server-error", e2.SocketError = "socket-error", e2.SocketClosed = "socket-closed", e2.UnavailableID = "unavailable-id", e2.WebRTC = "webrtc";
        }(n = exports2.PeerErrorType || (exports2.PeerErrorType = {})), function(e2) {
          e2.Binary = "binary", e2.BinaryUTF8 = "binary-utf8", e2.JSON = "json";
        }(t = exports2.SerializationType || (exports2.SerializationType = {})), function(e2) {
          e2.Message = "message", e2.Disconnected = "disconnected", e2.Error = "error", e2.Close = "close";
        }(a = exports2.SocketEventType || (exports2.SocketEventType = {})), function(e2) {
          e2.Heartbeat = "HEARTBEAT", e2.Candidate = "CANDIDATE", e2.Offer = "OFFER", e2.Answer = "ANSWER", e2.Open = "OPEN", e2.Error = "ERROR", e2.IdTaken = "ID-TAKEN", e2.InvalidKey = "INVALID-KEY", e2.Leave = "LEAVE", e2.Expire = "EXPIRE";
        }(i = exports2.ServerMessageType || (exports2.ServerMessageType = {}));
      }, {}], "wJlv": [function(require2, module2, exports2) {
        "use strict";
        var e = this && this.__extends || function() {
          var e2 = function(t2, n2) {
            return (e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t3) {
              e3.__proto__ = t3;
            } || function(e3, t3) {
              for (var n3 in t3)
                Object.prototype.hasOwnProperty.call(t3, n3) && (e3[n3] = t3[n3]);
            })(t2, n2);
          };
          return function(t2, n2) {
            if (typeof n2 != "function" && n2 !== null)
              throw new TypeError("Class extends value " + String(n2) + " is not a constructor or null");
            function o2() {
              this.constructor = t2;
            }
            e2(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (o2.prototype = n2.prototype, new o2());
          };
        }(), t = this && this.__read || function(e2, t2) {
          var n2 = typeof Symbol == "function" && e2[Symbol.iterator];
          if (!n2)
            return e2;
          var o2, s2, r2 = n2.call(e2), i2 = [];
          try {
            for (; (t2 === void 0 || t2-- > 0) && !(o2 = r2.next()).done; )
              i2.push(o2.value);
          } catch (c2) {
            s2 = { error: c2 };
          } finally {
            try {
              o2 && !o2.done && (n2 = r2.return) && n2.call(r2);
            } finally {
              if (s2)
                throw s2.error;
            }
          }
          return i2;
        }, n = this && this.__spreadArray || function(e2, t2) {
          for (var n2 = 0, o2 = t2.length, s2 = e2.length; n2 < o2; n2++, s2++)
            e2[s2] = t2[n2];
          return e2;
        }, o = this && this.__values || function(e2) {
          var t2 = typeof Symbol == "function" && Symbol.iterator, n2 = t2 && e2[t2], o2 = 0;
          if (n2)
            return n2.call(e2);
          if (e2 && typeof e2.length == "number")
            return { next: function() {
              return e2 && o2 >= e2.length && (e2 = void 0), { value: e2 && e2[o2++], done: !e2 };
            } };
          throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }, s = this && this.__importDefault || function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        };
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.Socket = void 0;
        var r = require2("eventemitter3"), i = s(require2("./logger")), c = require2("./enums"), a = function(s2) {
          function r2(e2, t2, n2, o2, r3, i2) {
            i2 === void 0 && (i2 = 5e3);
            var c2 = s2.call(this) || this;
            c2.pingInterval = i2, c2._disconnected = true, c2._messagesQueue = [];
            var a2 = e2 ? "wss://" : "ws://";
            return c2._baseUrl = a2 + t2 + ":" + n2 + o2 + "peerjs?key=" + r3, c2;
          }
          return e(r2, s2), r2.prototype.start = function(e2, t2) {
            var n2 = this;
            this._id = e2;
            var o2 = this._baseUrl + "&id=" + e2 + "&token=" + t2;
            !this._socket && this._disconnected && (this._socket = new WebSocket(o2), this._disconnected = false, this._socket.onmessage = function(e3) {
              var t3;
              try {
                t3 = JSON.parse(e3.data), i.default.log("Server message received:", t3);
              } catch (o3) {
                return void i.default.log("Invalid server message", e3.data);
              }
              n2.emit(c.SocketEventType.Message, t3);
            }, this._socket.onclose = function(e3) {
              n2._disconnected || (i.default.log("Socket closed.", e3), n2._cleanup(), n2._disconnected = true, n2.emit(c.SocketEventType.Disconnected));
            }, this._socket.onopen = function() {
              n2._disconnected || (n2._sendQueuedMessages(), i.default.log("Socket open"), n2._scheduleHeartbeat());
            });
          }, r2.prototype._scheduleHeartbeat = function() {
            var e2 = this;
            this._wsPingTimer = setTimeout(function() {
              e2._sendHeartbeat();
            }, this.pingInterval);
          }, r2.prototype._sendHeartbeat = function() {
            if (this._wsOpen()) {
              var e2 = JSON.stringify({ type: c.ServerMessageType.Heartbeat });
              this._socket.send(e2), this._scheduleHeartbeat();
            } else
              i.default.log("Cannot send heartbeat, because socket closed");
          }, r2.prototype._wsOpen = function() {
            return !!this._socket && this._socket.readyState === 1;
          }, r2.prototype._sendQueuedMessages = function() {
            var e2, s3, r3 = n([], t(this._messagesQueue));
            this._messagesQueue = [];
            try {
              for (var i2 = o(r3), c2 = i2.next(); !c2.done; c2 = i2.next()) {
                var a2 = c2.value;
                this.send(a2);
              }
            } catch (u) {
              e2 = { error: u };
            } finally {
              try {
                c2 && !c2.done && (s3 = i2.return) && s3.call(i2);
              } finally {
                if (e2)
                  throw e2.error;
              }
            }
          }, r2.prototype.send = function(e2) {
            if (!this._disconnected)
              if (this._id)
                if (e2.type) {
                  if (this._wsOpen()) {
                    var t2 = JSON.stringify(e2);
                    this._socket.send(t2);
                  }
                } else
                  this.emit(c.SocketEventType.Error, "Invalid message");
              else
                this._messagesQueue.push(e2);
          }, r2.prototype.close = function() {
            this._disconnected || (this._cleanup(), this._disconnected = true);
          }, r2.prototype._cleanup = function() {
            this._socket && (this._socket.onopen = this._socket.onmessage = this._socket.onclose = null, this._socket.close(), this._socket = void 0), clearTimeout(this._wsPingTimer);
          }, r2;
        }(r.EventEmitter);
        exports2.Socket = a;
      }, { "eventemitter3": "JJlS", "./logger": "WOs9", "./enums": "ZRYf" }], "HCdX": [function(require2, module2, exports2) {
        "use strict";
        var e = this && this.__assign || function() {
          return (e = Object.assign || function(e2) {
            for (var n2, t2 = 1, o2 = arguments.length; t2 < o2; t2++)
              for (var i2 in n2 = arguments[t2])
                Object.prototype.hasOwnProperty.call(n2, i2) && (e2[i2] = n2[i2]);
            return e2;
          }).apply(this, arguments);
        }, n = this && this.__awaiter || function(e2, n2, t2, o2) {
          return new (t2 || (t2 = Promise))(function(i2, r2) {
            function c2(e3) {
              try {
                s(o2.next(e3));
              } catch (n3) {
                r2(n3);
              }
            }
            function a2(e3) {
              try {
                s(o2.throw(e3));
              } catch (n3) {
                r2(n3);
              }
            }
            function s(e3) {
              var n3;
              e3.done ? i2(e3.value) : (n3 = e3.value, n3 instanceof t2 ? n3 : new t2(function(e4) {
                e4(n3);
              })).then(c2, a2);
            }
            s((o2 = o2.apply(e2, n2 || [])).next());
          });
        }, t = this && this.__generator || function(e2, n2) {
          var t2, o2, i2, r2, c2 = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return r2 = { next: a2(0), throw: a2(1), return: a2(2) }, typeof Symbol == "function" && (r2[Symbol.iterator] = function() {
            return this;
          }), r2;
          function a2(r3) {
            return function(a3) {
              return function(r4) {
                if (t2)
                  throw new TypeError("Generator is already executing.");
                for (; c2; )
                  try {
                    if (t2 = 1, o2 && (i2 = 2 & r4[0] ? o2.return : r4[0] ? o2.throw || ((i2 = o2.return) && i2.call(o2), 0) : o2.next) && !(i2 = i2.call(o2, r4[1])).done)
                      return i2;
                    switch (o2 = 0, i2 && (r4 = [2 & r4[0], i2.value]), r4[0]) {
                      case 0:
                      case 1:
                        i2 = r4;
                        break;
                      case 4:
                        return c2.label++, { value: r4[1], done: false };
                      case 5:
                        c2.label++, o2 = r4[1], r4 = [0];
                        continue;
                      case 7:
                        r4 = c2.ops.pop(), c2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = (i2 = c2.trys).length > 0 && i2[i2.length - 1]) && (r4[0] === 6 || r4[0] === 2)) {
                          c2 = 0;
                          continue;
                        }
                        if (r4[0] === 3 && (!i2 || r4[1] > i2[0] && r4[1] < i2[3])) {
                          c2.label = r4[1];
                          break;
                        }
                        if (r4[0] === 6 && c2.label < i2[1]) {
                          c2.label = i2[1], i2 = r4;
                          break;
                        }
                        if (i2 && c2.label < i2[2]) {
                          c2.label = i2[2], c2.ops.push(r4);
                          break;
                        }
                        i2[2] && c2.ops.pop(), c2.trys.pop();
                        continue;
                    }
                    r4 = n2.call(e2, c2);
                  } catch (a4) {
                    r4 = [6, a4], o2 = 0;
                  } finally {
                    t2 = i2 = 0;
                  }
                if (5 & r4[0])
                  throw r4[1];
                return { value: r4[0] ? r4[1] : void 0, done: true };
              }([r3, a3]);
            };
          }
        }, o = this && this.__importDefault || function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        };
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.Negotiator = void 0;
        var i = require2("./util"), r = o(require2("./logger")), c = require2("./enums"), a = function() {
          function o2(e2) {
            this.connection = e2;
          }
          return o2.prototype.startConnection = function(e2) {
            var n2 = this._startPeerConnection();
            if (this.connection.peerConnection = n2, this.connection.type === c.ConnectionType.Media && e2._stream && this._addTracksToConnection(e2._stream, n2), e2.originator) {
              if (this.connection.type === c.ConnectionType.Data) {
                var t2 = this.connection, o3 = { ordered: !!e2.reliable }, i2 = n2.createDataChannel(t2.label, o3);
                t2.initialize(i2);
              }
              this._makeOffer();
            } else
              this.handleSDP("OFFER", e2.sdp);
          }, o2.prototype._startPeerConnection = function() {
            r.default.log("Creating RTCPeerConnection.");
            var e2 = new RTCPeerConnection(this.connection.provider.options.config);
            return this._setupListeners(e2), e2;
          }, o2.prototype._setupListeners = function(e2) {
            var n2 = this, t2 = this.connection.peer, o3 = this.connection.connectionId, a2 = this.connection.type, s = this.connection.provider;
            r.default.log("Listening for ICE candidates."), e2.onicecandidate = function(e3) {
              e3.candidate && e3.candidate.candidate && (r.default.log("Received ICE candidates for " + t2 + ":", e3.candidate), s.socket.send({ type: c.ServerMessageType.Candidate, payload: { candidate: e3.candidate, type: a2, connectionId: o3 }, dst: t2 }));
            }, e2.oniceconnectionstatechange = function() {
              switch (e2.iceConnectionState) {
                case "failed":
                  r.default.log("iceConnectionState is failed, closing connections to " + t2), n2.connection.emit(c.ConnectionEventType.Error, new Error("Negotiation of connection to " + t2 + " failed.")), n2.connection.close();
                  break;
                case "closed":
                  r.default.log("iceConnectionState is closed, closing connections to " + t2), n2.connection.emit(c.ConnectionEventType.Error, new Error("Connection to " + t2 + " closed.")), n2.connection.close();
                  break;
                case "disconnected":
                  r.default.log("iceConnectionState changed to disconnected on the connection with " + t2);
                  break;
                case "completed":
                  e2.onicecandidate = i.util.noop;
              }
              n2.connection.emit(c.ConnectionEventType.IceStateChanged, e2.iceConnectionState);
            }, r.default.log("Listening for data channel"), e2.ondatachannel = function(e3) {
              r.default.log("Received data channel");
              var n3 = e3.channel;
              s.getConnection(t2, o3).initialize(n3);
            }, r.default.log("Listening for remote stream"), e2.ontrack = function(e3) {
              r.default.log("Received remote stream");
              var i2 = e3.streams[0], a3 = s.getConnection(t2, o3);
              if (a3.type === c.ConnectionType.Media) {
                var d = a3;
                n2._addStreamToMediaConnection(i2, d);
              }
            };
          }, o2.prototype.cleanup = function() {
            r.default.log("Cleaning up PeerConnection to " + this.connection.peer);
            var e2 = this.connection.peerConnection;
            if (e2) {
              this.connection.peerConnection = null, e2.onicecandidate = e2.oniceconnectionstatechange = e2.ondatachannel = e2.ontrack = function() {
              };
              var n2 = e2.signalingState !== "closed", t2 = false;
              if (this.connection.type === c.ConnectionType.Data) {
                var o3 = this.connection.dataChannel;
                o3 && (t2 = !!o3.readyState && o3.readyState !== "closed");
              }
              (n2 || t2) && e2.close();
            }
          }, o2.prototype._makeOffer = function() {
            return n(this, void 0, Promise, function() {
              var n2, o3, a2, s, d, l, u;
              return t(this, function(t2) {
                switch (t2.label) {
                  case 0:
                    n2 = this.connection.peerConnection, o3 = this.connection.provider, t2.label = 1;
                  case 1:
                    return t2.trys.push([1, 7, , 8]), [4, n2.createOffer(this.connection.options.constraints)];
                  case 2:
                    a2 = t2.sent(), r.default.log("Created offer."), this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform == "function" && (a2.sdp = this.connection.options.sdpTransform(a2.sdp) || a2.sdp), t2.label = 3;
                  case 3:
                    return t2.trys.push([3, 5, , 6]), [4, n2.setLocalDescription(a2)];
                  case 4:
                    return t2.sent(), r.default.log("Set localDescription:", a2, "for:" + this.connection.peer), s = { sdp: a2, type: this.connection.type, connectionId: this.connection.connectionId, metadata: this.connection.metadata, browser: i.util.browser }, this.connection.type === c.ConnectionType.Data && (d = this.connection, s = e(e({}, s), { label: d.label, reliable: d.reliable, serialization: d.serialization })), o3.socket.send({ type: c.ServerMessageType.Offer, payload: s, dst: this.connection.peer }), [3, 6];
                  case 5:
                    return (l = t2.sent()) != "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer" && (o3.emitError(c.PeerErrorType.WebRTC, l), r.default.log("Failed to setLocalDescription, ", l)), [3, 6];
                  case 6:
                    return [3, 8];
                  case 7:
                    return u = t2.sent(), o3.emitError(c.PeerErrorType.WebRTC, u), r.default.log("Failed to createOffer, ", u), [3, 8];
                  case 8:
                    return [2];
                }
              });
            });
          }, o2.prototype._makeAnswer = function() {
            return n(this, void 0, Promise, function() {
              var e2, n2, o3, a2, s;
              return t(this, function(t2) {
                switch (t2.label) {
                  case 0:
                    e2 = this.connection.peerConnection, n2 = this.connection.provider, t2.label = 1;
                  case 1:
                    return t2.trys.push([1, 7, , 8]), [4, e2.createAnswer()];
                  case 2:
                    o3 = t2.sent(), r.default.log("Created answer."), this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform == "function" && (o3.sdp = this.connection.options.sdpTransform(o3.sdp) || o3.sdp), t2.label = 3;
                  case 3:
                    return t2.trys.push([3, 5, , 6]), [4, e2.setLocalDescription(o3)];
                  case 4:
                    return t2.sent(), r.default.log("Set localDescription:", o3, "for:" + this.connection.peer), n2.socket.send({ type: c.ServerMessageType.Answer, payload: { sdp: o3, type: this.connection.type, connectionId: this.connection.connectionId, browser: i.util.browser }, dst: this.connection.peer }), [3, 6];
                  case 5:
                    return a2 = t2.sent(), n2.emitError(c.PeerErrorType.WebRTC, a2), r.default.log("Failed to setLocalDescription, ", a2), [3, 6];
                  case 6:
                    return [3, 8];
                  case 7:
                    return s = t2.sent(), n2.emitError(c.PeerErrorType.WebRTC, s), r.default.log("Failed to create answer, ", s), [3, 8];
                  case 8:
                    return [2];
                }
              });
            });
          }, o2.prototype.handleSDP = function(e2, o3) {
            return n(this, void 0, Promise, function() {
              var n2, i2, a2, s;
              return t(this, function(t2) {
                switch (t2.label) {
                  case 0:
                    o3 = new RTCSessionDescription(o3), n2 = this.connection.peerConnection, i2 = this.connection.provider, r.default.log("Setting remote description", o3), a2 = this, t2.label = 1;
                  case 1:
                    return t2.trys.push([1, 5, , 6]), [4, n2.setRemoteDescription(o3)];
                  case 2:
                    return t2.sent(), r.default.log("Set remoteDescription:" + e2 + " for:" + this.connection.peer), e2 !== "OFFER" ? [3, 4] : [4, a2._makeAnswer()];
                  case 3:
                    t2.sent(), t2.label = 4;
                  case 4:
                    return [3, 6];
                  case 5:
                    return s = t2.sent(), i2.emitError(c.PeerErrorType.WebRTC, s), r.default.log("Failed to setRemoteDescription, ", s), [3, 6];
                  case 6:
                    return [2];
                }
              });
            });
          }, o2.prototype.handleCandidate = function(e2) {
            return n(this, void 0, Promise, function() {
              var n2, o3, i2, a2, s, d;
              return t(this, function(t2) {
                switch (t2.label) {
                  case 0:
                    r.default.log("handleCandidate:", e2), n2 = e2.candidate, o3 = e2.sdpMLineIndex, i2 = e2.sdpMid, a2 = this.connection.peerConnection, s = this.connection.provider, t2.label = 1;
                  case 1:
                    return t2.trys.push([1, 3, , 4]), [4, a2.addIceCandidate(new RTCIceCandidate({ sdpMid: i2, sdpMLineIndex: o3, candidate: n2 }))];
                  case 2:
                    return t2.sent(), r.default.log("Added ICE candidate for:" + this.connection.peer), [3, 4];
                  case 3:
                    return d = t2.sent(), s.emitError(c.PeerErrorType.WebRTC, d), r.default.log("Failed to handleCandidate, ", d), [3, 4];
                  case 4:
                    return [2];
                }
              });
            });
          }, o2.prototype._addTracksToConnection = function(e2, n2) {
            if (r.default.log("add tracks from stream " + e2.id + " to peer connection"), !n2.addTrack)
              return r.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
            e2.getTracks().forEach(function(t2) {
              n2.addTrack(t2, e2);
            });
          }, o2.prototype._addStreamToMediaConnection = function(e2, n2) {
            r.default.log("add stream " + e2.id + " to media connection " + n2.connectionId), n2.addStream(e2);
          }, o2;
        }();
        exports2.Negotiator = a;
      }, { "./util": "BHXf", "./logger": "WOs9", "./enums": "ZRYf" }], "tQFK": [function(require2, module2, exports2) {
        "use strict";
        var t = this && this.__extends || function() {
          var t2 = function(e2, n2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var n3 in e3)
                Object.prototype.hasOwnProperty.call(e3, n3) && (t3[n3] = e3[n3]);
            })(e2, n2);
          };
          return function(e2, n2) {
            if (typeof n2 != "function" && n2 !== null)
              throw new TypeError("Class extends value " + String(n2) + " is not a constructor or null");
            function o() {
              this.constructor = e2;
            }
            t2(e2, n2), e2.prototype = n2 === null ? Object.create(n2) : (o.prototype = n2.prototype, new o());
          };
        }();
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.BaseConnection = void 0;
        var e = require2("eventemitter3"), n = function(e2) {
          function n2(t2, n3, o) {
            var r = e2.call(this) || this;
            return r.peer = t2, r.provider = n3, r.options = o, r._open = false, r.metadata = o.metadata, r;
          }
          return t(n2, e2), Object.defineProperty(n2.prototype, "open", { get: function() {
            return this._open;
          }, enumerable: false, configurable: true }), n2;
        }(e.EventEmitter);
        exports2.BaseConnection = n;
      }, { "eventemitter3": "JJlS" }], "dbHP": [function(require2, module2, exports2) {
        "use strict";
        var e = this && this.__extends || function() {
          var e2 = function(t2, o2) {
            return (e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t3) {
              e3.__proto__ = t3;
            } || function(e3, t3) {
              for (var o3 in t3)
                Object.prototype.hasOwnProperty.call(t3, o3) && (e3[o3] = t3[o3]);
            })(t2, o2);
          };
          return function(t2, o2) {
            if (typeof o2 != "function" && o2 !== null)
              throw new TypeError("Class extends value " + String(o2) + " is not a constructor or null");
            function r2() {
              this.constructor = t2;
            }
            e2(t2, o2), t2.prototype = o2 === null ? Object.create(o2) : (r2.prototype = o2.prototype, new r2());
          };
        }(), t = this && this.__assign || function() {
          return (t = Object.assign || function(e2) {
            for (var t2, o2 = 1, r2 = arguments.length; o2 < r2; o2++)
              for (var n2 in t2 = arguments[o2])
                Object.prototype.hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
            return e2;
          }).apply(this, arguments);
        }, o = this && this.__values || function(e2) {
          var t2 = typeof Symbol == "function" && Symbol.iterator, o2 = t2 && e2[t2], r2 = 0;
          if (o2)
            return o2.call(e2);
          if (e2 && typeof e2.length == "number")
            return { next: function() {
              return e2 && r2 >= e2.length && (e2 = void 0), { value: e2 && e2[r2++], done: !e2 };
            } };
          throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }, r = this && this.__importDefault || function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        };
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.MediaConnection = void 0;
        var n = require2("./util"), i = r(require2("./logger")), a = require2("./negotiator"), s = require2("./enums"), l = require2("./baseconnection"), c = function(r2) {
          function l2(e2, t2, o2) {
            var i2 = r2.call(this, e2, t2, o2) || this;
            return i2._localStream = i2.options._stream, i2.connectionId = i2.options.connectionId || l2.ID_PREFIX + n.util.randomToken(), i2._negotiator = new a.Negotiator(i2), i2._localStream && i2._negotiator.startConnection({ _stream: i2._localStream, originator: true }), i2;
          }
          return e(l2, r2), Object.defineProperty(l2.prototype, "type", { get: function() {
            return s.ConnectionType.Media;
          }, enumerable: false, configurable: true }), Object.defineProperty(l2.prototype, "localStream", { get: function() {
            return this._localStream;
          }, enumerable: false, configurable: true }), Object.defineProperty(l2.prototype, "remoteStream", { get: function() {
            return this._remoteStream;
          }, enumerable: false, configurable: true }), l2.prototype.addStream = function(e2) {
            i.default.log("Receiving stream", e2), this._remoteStream = e2, r2.prototype.emit.call(this, s.ConnectionEventType.Stream, e2);
          }, l2.prototype.handleMessage = function(e2) {
            var t2 = e2.type, o2 = e2.payload;
            switch (e2.type) {
              case s.ServerMessageType.Answer:
                this._negotiator.handleSDP(t2, o2.sdp), this._open = true;
                break;
              case s.ServerMessageType.Candidate:
                this._negotiator.handleCandidate(o2.candidate);
                break;
              default:
                i.default.warn("Unrecognized message type:" + t2 + " from peer:" + this.peer);
            }
          }, l2.prototype.answer = function(e2, r3) {
            var n2, a2;
            if (r3 === void 0 && (r3 = {}), this._localStream)
              i.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
            else {
              this._localStream = e2, r3 && r3.sdpTransform && (this.options.sdpTransform = r3.sdpTransform), this._negotiator.startConnection(t(t({}, this.options._payload), { _stream: e2 }));
              var s2 = this.provider._getMessages(this.connectionId);
              try {
                for (var l3 = o(s2), c2 = l3.next(); !c2.done; c2 = l3.next()) {
                  var p = c2.value;
                  this.handleMessage(p);
                }
              } catch (u) {
                n2 = { error: u };
              } finally {
                try {
                  c2 && !c2.done && (a2 = l3.return) && a2.call(l3);
                } finally {
                  if (n2)
                    throw n2.error;
                }
              }
              this._open = true;
            }
          }, l2.prototype.close = function() {
            this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this._localStream = null, this._remoteStream = null, this.provider && (this.provider._removeConnection(this), this.provider = null), this.options && this.options._stream && (this.options._stream = null), this.open && (this._open = false, r2.prototype.emit.call(this, s.ConnectionEventType.Close));
          }, l2.ID_PREFIX = "mc_", l2;
        }(l.BaseConnection);
        exports2.MediaConnection = c;
      }, { "./util": "BHXf", "./logger": "WOs9", "./negotiator": "HCdX", "./enums": "ZRYf", "./baseconnection": "tQFK" }], "GGp6": [function(require2, module2, exports2) {
        "use strict";
        var e = this && this.__extends || function() {
          var e2 = function(t2, r2) {
            return (e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t3) {
              e3.__proto__ = t3;
            } || function(e3, t3) {
              for (var r3 in t3)
                Object.prototype.hasOwnProperty.call(t3, r3) && (e3[r3] = t3[r3]);
            })(t2, r2);
          };
          return function(t2, r2) {
            if (typeof r2 != "function" && r2 !== null)
              throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function o2() {
              this.constructor = t2;
            }
            e2(t2, r2), t2.prototype = r2 === null ? Object.create(r2) : (o2.prototype = r2.prototype, new o2());
          };
        }(), t = this && this.__importDefault || function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        };
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.EncodingQueue = void 0;
        var r = require2("eventemitter3"), o = t(require2("./logger")), n = function(t2) {
          function r2() {
            var e2 = t2.call(this) || this;
            return e2.fileReader = new FileReader(), e2._queue = [], e2._processing = false, e2.fileReader.onload = function(t3) {
              e2._processing = false, t3.target && e2.emit("done", t3.target.result), e2.doNextTask();
            }, e2.fileReader.onerror = function(t3) {
              o.default.error("EncodingQueue error:", t3), e2._processing = false, e2.destroy(), e2.emit("error", t3);
            }, e2;
          }
          return e(r2, t2), Object.defineProperty(r2.prototype, "queue", { get: function() {
            return this._queue;
          }, enumerable: false, configurable: true }), Object.defineProperty(r2.prototype, "size", { get: function() {
            return this.queue.length;
          }, enumerable: false, configurable: true }), Object.defineProperty(r2.prototype, "processing", { get: function() {
            return this._processing;
          }, enumerable: false, configurable: true }), r2.prototype.enque = function(e2) {
            this.queue.push(e2), this.processing || this.doNextTask();
          }, r2.prototype.destroy = function() {
            this.fileReader.abort(), this._queue = [];
          }, r2.prototype.doNextTask = function() {
            this.size !== 0 && (this.processing || (this._processing = true, this.fileReader.readAsArrayBuffer(this.queue.shift())));
          }, r2;
        }(r.EventEmitter);
        exports2.EncodingQueue = n;
      }, { "eventemitter3": "JJlS", "./logger": "WOs9" }], "GBTQ": [function(require2, module2, exports2) {
        "use strict";
        var e = this && this.__extends || function() {
          var e2 = function(t2, n2) {
            return (e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t3) {
              e3.__proto__ = t3;
            } || function(e3, t3) {
              for (var n3 in t3)
                Object.prototype.hasOwnProperty.call(t3, n3) && (e3[n3] = t3[n3]);
            })(t2, n2);
          };
          return function(t2, n2) {
            if (typeof n2 != "function" && n2 !== null)
              throw new TypeError("Class extends value " + String(n2) + " is not a constructor or null");
            function i2() {
              this.constructor = t2;
            }
            e2(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (i2.prototype = n2.prototype, new i2());
          };
        }(), t = this && this.__values || function(e2) {
          var t2 = typeof Symbol == "function" && Symbol.iterator, n2 = t2 && e2[t2], i2 = 0;
          if (n2)
            return n2.call(e2);
          if (e2 && typeof e2.length == "number")
            return { next: function() {
              return e2 && i2 >= e2.length && (e2 = void 0), { value: e2 && e2[i2++], done: !e2 };
            } };
          throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }, n = this && this.__importDefault || function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        };
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.DataConnection = void 0;
        var i = require2("./util"), o = n(require2("./logger")), r = require2("./negotiator"), a = require2("./enums"), s = require2("./baseconnection"), u = require2("./encodingQueue"), l = function(n2) {
          function s2(e2, t2, l2) {
            var f = n2.call(this, e2, t2, l2) || this;
            return f.stringify = JSON.stringify, f.parse = JSON.parse, f._buffer = [], f._bufferSize = 0, f._buffering = false, f._chunkedData = {}, f._encodingQueue = new u.EncodingQueue(), f.connectionId = f.options.connectionId || s2.ID_PREFIX + i.util.randomToken(), f.label = f.options.label || f.connectionId, f.serialization = f.options.serialization || a.SerializationType.Binary, f.reliable = !!f.options.reliable, f._encodingQueue.on("done", function(e3) {
              f._bufferedSend(e3);
            }), f._encodingQueue.on("error", function() {
              o.default.error("DC#" + f.connectionId + ": Error occured in encoding from blob to arraybuffer, close DC"), f.close();
            }), f._negotiator = new r.Negotiator(f), f._negotiator.startConnection(f.options._payload || { originator: true }), f;
          }
          return e(s2, n2), Object.defineProperty(s2.prototype, "type", { get: function() {
            return a.ConnectionType.Data;
          }, enumerable: false, configurable: true }), Object.defineProperty(s2.prototype, "dataChannel", { get: function() {
            return this._dc;
          }, enumerable: false, configurable: true }), Object.defineProperty(s2.prototype, "bufferSize", { get: function() {
            return this._bufferSize;
          }, enumerable: false, configurable: true }), s2.prototype.initialize = function(e2) {
            this._dc = e2, this._configureDataChannel();
          }, s2.prototype._configureDataChannel = function() {
            var e2 = this;
            i.util.supports.binaryBlob && !i.util.supports.reliable || (this.dataChannel.binaryType = "arraybuffer"), this.dataChannel.onopen = function() {
              o.default.log("DC#" + e2.connectionId + " dc connection success"), e2._open = true, e2.emit(a.ConnectionEventType.Open);
            }, this.dataChannel.onmessage = function(t2) {
              o.default.log("DC#" + e2.connectionId + " dc onmessage:", t2.data), e2._handleDataMessage(t2);
            }, this.dataChannel.onclose = function() {
              o.default.log("DC#" + e2.connectionId + " dc closed for:", e2.peer), e2.close();
            };
          }, s2.prototype._handleDataMessage = function(e2) {
            var t2 = this, o2 = e2.data, r2 = o2.constructor, s3 = o2;
            if (this.serialization === a.SerializationType.Binary || this.serialization === a.SerializationType.BinaryUTF8) {
              if (r2 === Blob)
                return void i.util.blobToArrayBuffer(o2, function(e3) {
                  var n3 = i.util.unpack(e3);
                  t2.emit(a.ConnectionEventType.Data, n3);
                });
              if (r2 === ArrayBuffer)
                s3 = i.util.unpack(o2);
              else if (r2 === String) {
                var u2 = i.util.binaryStringToArrayBuffer(o2);
                s3 = i.util.unpack(u2);
              }
            } else
              this.serialization === a.SerializationType.JSON && (s3 = this.parse(o2));
            s3.__peerData ? this._handleChunk(s3) : n2.prototype.emit.call(this, a.ConnectionEventType.Data, s3);
          }, s2.prototype._handleChunk = function(e2) {
            var t2 = e2.__peerData, n3 = this._chunkedData[t2] || { data: [], count: 0, total: e2.total };
            if (n3.data[e2.n] = e2.data, n3.count++, this._chunkedData[t2] = n3, n3.total === n3.count) {
              delete this._chunkedData[t2];
              var i2 = new Blob(n3.data);
              this._handleDataMessage({ data: i2 });
            }
          }, s2.prototype.close = function() {
            this._buffer = [], this._bufferSize = 0, this._chunkedData = {}, this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this.provider && (this.provider._removeConnection(this), this.provider = null), this.dataChannel && (this.dataChannel.onopen = null, this.dataChannel.onmessage = null, this.dataChannel.onclose = null, this._dc = null), this._encodingQueue && (this._encodingQueue.destroy(), this._encodingQueue.removeAllListeners(), this._encodingQueue = null), this.open && (this._open = false, n2.prototype.emit.call(this, a.ConnectionEventType.Close));
          }, s2.prototype.send = function(e2, t2) {
            if (this.open)
              if (this.serialization === a.SerializationType.JSON)
                this._bufferedSend(this.stringify(e2));
              else if (this.serialization === a.SerializationType.Binary || this.serialization === a.SerializationType.BinaryUTF8) {
                var o2 = i.util.pack(e2);
                if (!t2 && o2.size > i.util.chunkedMTU)
                  return void this._sendChunks(o2);
                i.util.supports.binaryBlob ? this._bufferedSend(o2) : this._encodingQueue.enque(o2);
              } else
                this._bufferedSend(e2);
            else
              n2.prototype.emit.call(this, a.ConnectionEventType.Error, new Error("Connection is not open. You should listen for the `open` event before sending messages."));
          }, s2.prototype._bufferedSend = function(e2) {
            !this._buffering && this._trySend(e2) || (this._buffer.push(e2), this._bufferSize = this._buffer.length);
          }, s2.prototype._trySend = function(e2) {
            var t2 = this;
            if (!this.open)
              return false;
            if (this.dataChannel.bufferedAmount > s2.MAX_BUFFERED_AMOUNT)
              return this._buffering = true, setTimeout(function() {
                t2._buffering = false, t2._tryBuffer();
              }, 50), false;
            try {
              this.dataChannel.send(e2);
            } catch (n3) {
              return o.default.error("DC#:" + this.connectionId + " Error when sending:", n3), this._buffering = true, this.close(), false;
            }
            return true;
          }, s2.prototype._tryBuffer = function() {
            if (this.open && this._buffer.length !== 0) {
              var e2 = this._buffer[0];
              this._trySend(e2) && (this._buffer.shift(), this._bufferSize = this._buffer.length, this._tryBuffer());
            }
          }, s2.prototype._sendChunks = function(e2) {
            var n3, r2, a2 = i.util.chunk(e2);
            o.default.log("DC#" + this.connectionId + " Try to send " + a2.length + " chunks...");
            try {
              for (var s3 = t(a2), u2 = s3.next(); !u2.done; u2 = s3.next()) {
                var l2 = u2.value;
                this.send(l2, true);
              }
            } catch (f) {
              n3 = { error: f };
            } finally {
              try {
                u2 && !u2.done && (r2 = s3.return) && r2.call(s3);
              } finally {
                if (n3)
                  throw n3.error;
              }
            }
          }, s2.prototype.handleMessage = function(e2) {
            var t2 = e2.payload;
            switch (e2.type) {
              case a.ServerMessageType.Answer:
                this._negotiator.handleSDP(e2.type, t2.sdp);
                break;
              case a.ServerMessageType.Candidate:
                this._negotiator.handleCandidate(t2.candidate);
                break;
              default:
                o.default.warn("Unrecognized message type:", e2.type, "from peer:", this.peer);
            }
          }, s2.ID_PREFIX = "dc_", s2.MAX_BUFFERED_AMOUNT = 8388608, s2;
        }(s.BaseConnection);
        exports2.DataConnection = l;
      }, { "./util": "BHXf", "./logger": "WOs9", "./negotiator": "HCdX", "./enums": "ZRYf", "./baseconnection": "tQFK", "./encodingQueue": "GGp6" }], "in7L": [function(require2, module2, exports2) {
        "use strict";
        var t = this && this.__awaiter || function(t2, e2, r2, o2) {
          return new (r2 || (r2 = Promise))(function(n2, s2) {
            function i(t3) {
              try {
                a(o2.next(t3));
              } catch (e3) {
                s2(e3);
              }
            }
            function u(t3) {
              try {
                a(o2.throw(t3));
              } catch (e3) {
                s2(e3);
              }
            }
            function a(t3) {
              var e3;
              t3.done ? n2(t3.value) : (e3 = t3.value, e3 instanceof r2 ? e3 : new r2(function(t4) {
                t4(e3);
              })).then(i, u);
            }
            a((o2 = o2.apply(t2, e2 || [])).next());
          });
        }, e = this && this.__generator || function(t2, e2) {
          var r2, o2, n2, s2, i = { label: 0, sent: function() {
            if (1 & n2[0])
              throw n2[1];
            return n2[1];
          }, trys: [], ops: [] };
          return s2 = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (s2[Symbol.iterator] = function() {
            return this;
          }), s2;
          function u(s3) {
            return function(u2) {
              return function(s4) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; i; )
                  try {
                    if (r2 = 1, o2 && (n2 = 2 & s4[0] ? o2.return : s4[0] ? o2.throw || ((n2 = o2.return) && n2.call(o2), 0) : o2.next) && !(n2 = n2.call(o2, s4[1])).done)
                      return n2;
                    switch (o2 = 0, n2 && (s4 = [2 & s4[0], n2.value]), s4[0]) {
                      case 0:
                      case 1:
                        n2 = s4;
                        break;
                      case 4:
                        return i.label++, { value: s4[1], done: false };
                      case 5:
                        i.label++, o2 = s4[1], s4 = [0];
                        continue;
                      case 7:
                        s4 = i.ops.pop(), i.trys.pop();
                        continue;
                      default:
                        if (!(n2 = (n2 = i.trys).length > 0 && n2[n2.length - 1]) && (s4[0] === 6 || s4[0] === 2)) {
                          i = 0;
                          continue;
                        }
                        if (s4[0] === 3 && (!n2 || s4[1] > n2[0] && s4[1] < n2[3])) {
                          i.label = s4[1];
                          break;
                        }
                        if (s4[0] === 6 && i.label < n2[1]) {
                          i.label = n2[1], n2 = s4;
                          break;
                        }
                        if (n2 && i.label < n2[2]) {
                          i.label = n2[2], i.ops.push(s4);
                          break;
                        }
                        n2[2] && i.ops.pop(), i.trys.pop();
                        continue;
                    }
                    s4 = e2.call(t2, i);
                  } catch (u3) {
                    s4 = [6, u3], o2 = 0;
                  } finally {
                    r2 = n2 = 0;
                  }
                if (5 & s4[0])
                  throw s4[1];
                return { value: s4[0] ? s4[1] : void 0, done: true };
              }([s3, u2]);
            };
          }
        }, r = this && this.__importDefault || function(t2) {
          return t2 && t2.__esModule ? t2 : { default: t2 };
        };
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.API = void 0;
        var o = require2("./util"), n = r(require2("./logger")), s = function() {
          function r2(t2) {
            this._options = t2;
          }
          return r2.prototype._buildUrl = function(t2) {
            var e2 = (this._options.secure ? "https://" : "http://") + this._options.host + ":" + this._options.port + this._options.path + this._options.key + "/" + t2;
            return e2 += "?ts=" + new Date().getTime() + Math.random();
          }, r2.prototype.retrieveId = function() {
            return t(this, void 0, Promise, function() {
              var t2, r3, s2, i;
              return e(this, function(e2) {
                switch (e2.label) {
                  case 0:
                    t2 = this._buildUrl("id"), e2.label = 1;
                  case 1:
                    return e2.trys.push([1, 3, , 4]), [4, fetch(t2)];
                  case 2:
                    if ((r3 = e2.sent()).status !== 200)
                      throw new Error("Error. Status:" + r3.status);
                    return [2, r3.text()];
                  case 3:
                    throw s2 = e2.sent(), n.default.error("Error retrieving ID", s2), i = "", this._options.path === "/" && this._options.host !== o.util.CLOUD_HOST && (i = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."), new Error("Could not get an ID from the server." + i);
                  case 4:
                    return [2];
                }
              });
            });
          }, r2.prototype.listAllPeers = function() {
            return t(this, void 0, Promise, function() {
              var t2, r3, s2, i;
              return e(this, function(e2) {
                switch (e2.label) {
                  case 0:
                    t2 = this._buildUrl("peers"), e2.label = 1;
                  case 1:
                    return e2.trys.push([1, 3, , 4]), [4, fetch(t2)];
                  case 2:
                    if ((r3 = e2.sent()).status !== 200) {
                      if (r3.status === 401)
                        throw s2 = "", s2 = this._options.host === o.util.CLOUD_HOST ? "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key." : "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.", new Error("It doesn't look like you have permission to list peers IDs. " + s2);
                      throw new Error("Error. Status:" + r3.status);
                    }
                    return [2, r3.json()];
                  case 3:
                    throw i = e2.sent(), n.default.error("Error retrieving list peers", i), new Error("Could not get list peers from the server." + i);
                  case 4:
                    return [2];
                }
              });
            });
          }, r2;
        }();
        exports2.API = s;
      }, { "./util": "BHXf", "./logger": "WOs9" }], "Hxpd": [function(require2, module2, exports2) {
        "use strict";
        var e = this && this.__extends || function() {
          var e2 = function(t2, n2) {
            return (e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t3) {
              e3.__proto__ = t3;
            } || function(e3, t3) {
              for (var n3 in t3)
                Object.prototype.hasOwnProperty.call(t3, n3) && (e3[n3] = t3[n3]);
            })(t2, n2);
          };
          return function(t2, n2) {
            if (typeof n2 != "function" && n2 !== null)
              throw new TypeError("Class extends value " + String(n2) + " is not a constructor or null");
            function r2() {
              this.constructor = t2;
            }
            e2(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
          };
        }(), t = this && this.__assign || function() {
          return (t = Object.assign || function(e2) {
            for (var t2, n2 = 1, r2 = arguments.length; n2 < r2; n2++)
              for (var o2 in t2 = arguments[n2])
                Object.prototype.hasOwnProperty.call(t2, o2) && (e2[o2] = t2[o2]);
            return e2;
          }).apply(this, arguments);
        }, n = this && this.__values || function(e2) {
          var t2 = typeof Symbol == "function" && Symbol.iterator, n2 = t2 && e2[t2], r2 = 0;
          if (n2)
            return n2.call(e2);
          if (e2 && typeof e2.length == "number")
            return { next: function() {
              return e2 && r2 >= e2.length && (e2 = void 0), { value: e2 && e2[r2++], done: !e2 };
            } };
          throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }, r = this && this.__read || function(e2, t2) {
          var n2 = typeof Symbol == "function" && e2[Symbol.iterator];
          if (!n2)
            return e2;
          var r2, o2, i2 = n2.call(e2), s2 = [];
          try {
            for (; (t2 === void 0 || t2-- > 0) && !(r2 = i2.next()).done; )
              s2.push(r2.value);
          } catch (a2) {
            o2 = { error: a2 };
          } finally {
            try {
              r2 && !r2.done && (n2 = i2.return) && n2.call(i2);
            } finally {
              if (o2)
                throw o2.error;
            }
          }
          return s2;
        }, o = this && this.__importDefault || function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        };
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.Peer = void 0;
        var i = require2("eventemitter3"), s = require2("./util"), a = o(require2("./logger")), c = require2("./socket"), l = require2("./mediaconnection"), u = require2("./dataconnection"), d = require2("./enums"), p = require2("./api"), h = function() {
          return function() {
          };
        }(), f = function(o2) {
          function i2(e2, n2) {
            var r2, c2 = o2.call(this) || this;
            return c2._id = null, c2._lastServerId = null, c2._destroyed = false, c2._disconnected = false, c2._open = false, c2._connections = /* @__PURE__ */ new Map(), c2._lostMessages = /* @__PURE__ */ new Map(), e2 && e2.constructor == Object ? n2 = e2 : e2 && (r2 = e2.toString()), n2 = t({ debug: 0, host: s.util.CLOUD_HOST, port: s.util.CLOUD_PORT, path: "/", key: i2.DEFAULT_KEY, token: s.util.randomToken(), config: s.util.defaultConfig }, n2), c2._options = n2, c2._options.host === "/" && (c2._options.host = window.location.hostname), c2._options.path && (c2._options.path[0] !== "/" && (c2._options.path = "/" + c2._options.path), c2._options.path[c2._options.path.length - 1] !== "/" && (c2._options.path += "/")), c2._options.secure === void 0 && c2._options.host !== s.util.CLOUD_HOST ? c2._options.secure = s.util.isSecure() : c2._options.host == s.util.CLOUD_HOST && (c2._options.secure = true), c2._options.logFunction && a.default.setLogFunction(c2._options.logFunction), a.default.logLevel = c2._options.debug || 0, c2._api = new p.API(n2), c2._socket = c2._createServerConnection(), s.util.supports.audioVideo || s.util.supports.data ? r2 && !s.util.validateId(r2) ? (c2._delayedAbort(d.PeerErrorType.InvalidID, 'ID "' + r2 + '" is invalid'), c2) : (r2 ? c2._initialize(r2) : c2._api.retrieveId().then(function(e3) {
              return c2._initialize(e3);
            }).catch(function(e3) {
              return c2._abort(d.PeerErrorType.ServerError, e3);
            }), c2) : (c2._delayedAbort(d.PeerErrorType.BrowserIncompatible, "The current browser does not support WebRTC"), c2);
          }
          return e(i2, o2), Object.defineProperty(i2.prototype, "id", { get: function() {
            return this._id;
          }, enumerable: false, configurable: true }), Object.defineProperty(i2.prototype, "options", { get: function() {
            return this._options;
          }, enumerable: false, configurable: true }), Object.defineProperty(i2.prototype, "open", { get: function() {
            return this._open;
          }, enumerable: false, configurable: true }), Object.defineProperty(i2.prototype, "socket", { get: function() {
            return this._socket;
          }, enumerable: false, configurable: true }), Object.defineProperty(i2.prototype, "connections", { get: function() {
            var e2, t2, o3 = /* @__PURE__ */ Object.create(null);
            try {
              for (var i3 = n(this._connections), s2 = i3.next(); !s2.done; s2 = i3.next()) {
                var a2 = r(s2.value, 2), c2 = a2[0], l2 = a2[1];
                o3[c2] = l2;
              }
            } catch (u2) {
              e2 = { error: u2 };
            } finally {
              try {
                s2 && !s2.done && (t2 = i3.return) && t2.call(i3);
              } finally {
                if (e2)
                  throw e2.error;
              }
            }
            return o3;
          }, enumerable: false, configurable: true }), Object.defineProperty(i2.prototype, "destroyed", { get: function() {
            return this._destroyed;
          }, enumerable: false, configurable: true }), Object.defineProperty(i2.prototype, "disconnected", { get: function() {
            return this._disconnected;
          }, enumerable: false, configurable: true }), i2.prototype._createServerConnection = function() {
            var e2 = this, t2 = new c.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
            return t2.on(d.SocketEventType.Message, function(t3) {
              e2._handleMessage(t3);
            }), t2.on(d.SocketEventType.Error, function(t3) {
              e2._abort(d.PeerErrorType.SocketError, t3);
            }), t2.on(d.SocketEventType.Disconnected, function() {
              e2.disconnected || (e2.emitError(d.PeerErrorType.Network, "Lost connection to server."), e2.disconnect());
            }), t2.on(d.SocketEventType.Close, function() {
              e2.disconnected || e2._abort(d.PeerErrorType.SocketClosed, "Underlying socket is already closed.");
            }), t2;
          }, i2.prototype._initialize = function(e2) {
            this._id = e2, this.socket.start(e2, this._options.token);
          }, i2.prototype._handleMessage = function(e2) {
            var t2, r2, o3 = e2.type, i3 = e2.payload, s2 = e2.src;
            switch (o3) {
              case d.ServerMessageType.Open:
                this._lastServerId = this.id, this._open = true, this.emit(d.PeerEventType.Open, this.id);
                break;
              case d.ServerMessageType.Error:
                this._abort(d.PeerErrorType.ServerError, i3.msg);
                break;
              case d.ServerMessageType.IdTaken:
                this._abort(d.PeerErrorType.UnavailableID, 'ID "' + this.id + '" is taken');
                break;
              case d.ServerMessageType.InvalidKey:
                this._abort(d.PeerErrorType.InvalidKey, 'API KEY "' + this._options.key + '" is invalid');
                break;
              case d.ServerMessageType.Leave:
                a.default.log("Received leave message from " + s2), this._cleanupPeer(s2), this._connections.delete(s2);
                break;
              case d.ServerMessageType.Expire:
                this.emitError(d.PeerErrorType.PeerUnavailable, "Could not connect to peer " + s2);
                break;
              case d.ServerMessageType.Offer:
                var c2 = i3.connectionId;
                if ((_ = this.getConnection(s2, c2)) && (_.close(), a.default.warn("Offer received for existing Connection ID:" + c2)), i3.type === d.ConnectionType.Media)
                  _ = new l.MediaConnection(s2, this, { connectionId: c2, _payload: i3, metadata: i3.metadata }), this._addConnection(s2, _), this.emit(d.PeerEventType.Call, _);
                else {
                  if (i3.type !== d.ConnectionType.Data)
                    return void a.default.warn("Received malformed connection type:" + i3.type);
                  _ = new u.DataConnection(s2, this, { connectionId: c2, _payload: i3, metadata: i3.metadata, label: i3.label, serialization: i3.serialization, reliable: i3.reliable }), this._addConnection(s2, _), this.emit(d.PeerEventType.Connection, _);
                }
                var p2 = this._getMessages(c2);
                try {
                  for (var h2 = n(p2), f2 = h2.next(); !f2.done; f2 = h2.next()) {
                    var y = f2.value;
                    _.handleMessage(y);
                  }
                } catch (v) {
                  t2 = { error: v };
                } finally {
                  try {
                    f2 && !f2.done && (r2 = h2.return) && r2.call(h2);
                  } finally {
                    if (t2)
                      throw t2.error;
                  }
                }
                break;
              default:
                if (!i3)
                  return void a.default.warn("You received a malformed message from " + s2 + " of type " + o3);
                var _;
                c2 = i3.connectionId;
                (_ = this.getConnection(s2, c2)) && _.peerConnection ? _.handleMessage(e2) : c2 ? this._storeMessage(c2, e2) : a.default.warn("You received an unrecognized message:", e2);
            }
          }, i2.prototype._storeMessage = function(e2, t2) {
            this._lostMessages.has(e2) || this._lostMessages.set(e2, []), this._lostMessages.get(e2).push(t2);
          }, i2.prototype._getMessages = function(e2) {
            var t2 = this._lostMessages.get(e2);
            return t2 ? (this._lostMessages.delete(e2), t2) : [];
          }, i2.prototype.connect = function(e2, t2) {
            if (t2 === void 0 && (t2 = {}), this.disconnected)
              return a.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."), void this.emitError(d.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
            var n2 = new u.DataConnection(e2, this, t2);
            return this._addConnection(e2, n2), n2;
          }, i2.prototype.call = function(e2, t2, n2) {
            if (n2 === void 0 && (n2 = {}), this.disconnected)
              return a.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."), void this.emitError(d.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
            if (t2) {
              n2._stream = t2;
              var r2 = new l.MediaConnection(e2, this, n2);
              return this._addConnection(e2, r2), r2;
            }
            a.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
          }, i2.prototype._addConnection = function(e2, t2) {
            a.default.log("add connection " + t2.type + ":" + t2.connectionId + " to peerId:" + e2), this._connections.has(e2) || this._connections.set(e2, []), this._connections.get(e2).push(t2);
          }, i2.prototype._removeConnection = function(e2) {
            var t2 = this._connections.get(e2.peer);
            if (t2) {
              var n2 = t2.indexOf(e2);
              n2 !== -1 && t2.splice(n2, 1);
            }
            this._lostMessages.delete(e2.connectionId);
          }, i2.prototype.getConnection = function(e2, t2) {
            var r2, o3, i3 = this._connections.get(e2);
            if (!i3)
              return null;
            try {
              for (var s2 = n(i3), a2 = s2.next(); !a2.done; a2 = s2.next()) {
                var c2 = a2.value;
                if (c2.connectionId === t2)
                  return c2;
              }
            } catch (l2) {
              r2 = { error: l2 };
            } finally {
              try {
                a2 && !a2.done && (o3 = s2.return) && o3.call(s2);
              } finally {
                if (r2)
                  throw r2.error;
              }
            }
            return null;
          }, i2.prototype._delayedAbort = function(e2, t2) {
            var n2 = this;
            setTimeout(function() {
              n2._abort(e2, t2);
            }, 0);
          }, i2.prototype._abort = function(e2, t2) {
            a.default.error("Aborting!"), this.emitError(e2, t2), this._lastServerId ? this.disconnect() : this.destroy();
          }, i2.prototype.emitError = function(e2, t2) {
            var n2;
            a.default.error("Error:", t2), (n2 = typeof t2 == "string" ? new Error(t2) : t2).type = e2, this.emit(d.PeerEventType.Error, n2);
          }, i2.prototype.destroy = function() {
            this.destroyed || (a.default.log("Destroy peer with ID:" + this.id), this.disconnect(), this._cleanup(), this._destroyed = true, this.emit(d.PeerEventType.Close));
          }, i2.prototype._cleanup = function() {
            var e2, t2;
            try {
              for (var r2 = n(this._connections.keys()), o3 = r2.next(); !o3.done; o3 = r2.next()) {
                var i3 = o3.value;
                this._cleanupPeer(i3), this._connections.delete(i3);
              }
            } catch (s2) {
              e2 = { error: s2 };
            } finally {
              try {
                o3 && !o3.done && (t2 = r2.return) && t2.call(r2);
              } finally {
                if (e2)
                  throw e2.error;
              }
            }
            this.socket.removeAllListeners();
          }, i2.prototype._cleanupPeer = function(e2) {
            var t2, r2, o3 = this._connections.get(e2);
            if (o3)
              try {
                for (var i3 = n(o3), s2 = i3.next(); !s2.done; s2 = i3.next()) {
                  s2.value.close();
                }
              } catch (a2) {
                t2 = { error: a2 };
              } finally {
                try {
                  s2 && !s2.done && (r2 = i3.return) && r2.call(i3);
                } finally {
                  if (t2)
                    throw t2.error;
                }
              }
          }, i2.prototype.disconnect = function() {
            if (!this.disconnected) {
              var e2 = this.id;
              a.default.log("Disconnect peer with ID:" + e2), this._disconnected = true, this._open = false, this.socket.close(), this._lastServerId = e2, this._id = null, this.emit(d.PeerEventType.Disconnected, e2);
            }
          }, i2.prototype.reconnect = function() {
            if (this.disconnected && !this.destroyed)
              a.default.log("Attempting reconnection to server with ID " + this._lastServerId), this._disconnected = false, this._initialize(this._lastServerId);
            else {
              if (this.destroyed)
                throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
              if (this.disconnected || this.open)
                throw new Error("Peer " + this.id + " cannot reconnect because it is not disconnected from the server!");
              a.default.error("In a hurry? We're still trying to make the initial connection!");
            }
          }, i2.prototype.listAllPeers = function(e2) {
            var t2 = this;
            e2 === void 0 && (e2 = function(e3) {
            }), this._api.listAllPeers().then(function(t3) {
              return e2(t3);
            }).catch(function(e3) {
              return t2._abort(d.PeerErrorType.ServerError, e3);
            });
          }, i2.DEFAULT_KEY = "peerjs", i2;
        }(i.EventEmitter);
        exports2.Peer = f;
      }, { "eventemitter3": "JJlS", "./util": "BHXf", "./logger": "WOs9", "./socket": "wJlv", "./mediaconnection": "dbHP", "./dataconnection": "GBTQ", "./enums": "ZRYf", "./api": "in7L" }], "iTK6": [function(require2, module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true }), exports2.peerjs = void 0;
        var e = require2("./util"), r = require2("./peer");
        exports2.peerjs = { Peer: r.Peer, util: e.util }, exports2.default = r.Peer, window.peerjs = exports2.peerjs, window.Peer = r.Peer;
      }, { "./util": "BHXf", "./peer": "Hxpd" }] }, {}, ["iTK6"], null);
    }
  });

  // src/MeetApp.tsx
  var import_peerjs = __toESM(require_peerjs_min());

  // ../ui/components/Element.ts
  function setElementStyles(el, styles) {
    if (!styles) {
      return;
    }
    for (const key of Object.keys(styles)) {
      el.style[key] = styles[key];
    }
  }

  // ../ui/components/Button.ts
  function Button(props) {
    const el = document.createElement("button");
    setElementStyles(el, props?.styles);
    el.innerText = props?.innerText;
    if (props?.onClick) {
      el.addEventListener("click", props.onClick);
    }
    return el;
  }

  // ../ui/components/Div.ts
  function Div(params) {
    const el = document.createElement("div");
    setElementStyles(el, params?.styles);
    if (params?.innerText) {
      el.innerText = params.innerText;
    }
    if (params?.onClick) {
      el.addEventListener("click", () => {
        params.onClick();
      });
    }
    return el;
  }

  // ../ui/components/Input.ts
  function Input(props) {
    const input = document.createElement("input");
    input.type = props?.type || "text";
    setElementStyles(input, props?.styles);
    return input;
  }

  // ../ui/utils/DomUtils.ts
  function byId(id) {
    return document.getElementById(id);
  }

  // src/MeetApp.tsx
  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  var root = byId("root");
  var connectionDetails = Div();
  var myId = Input();
  connectionDetails.append(myId);
  var peerId = Input();
  connectionDetails.append(peerId);
  var connectBtn = Button({
    innerText: "connect",
    onClick: handleConnectClicked
  });
  connectionDetails.append(connectBtn);
  var callBtn = Button({
    innerText: "Call",
    onClick: handleCallClicked
  });
  connectionDetails.append(callBtn);
  root.append(connectionDetails);
  var peer = null;
  function handleConnectClicked() {
    console.log();
    peer = new import_peerjs.default(myId.value);
    peer.on("call", function(call) {
      getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      }, function(stream) {
        call.answer(stream);
        call.on("stream", handleRemoteStream);
      }, function(err) {
        console.error("Failed to get local stream", err);
      });
    });
  }
  var peerVideo = document.createElement("video");
  root.append(peerVideo);
  function handleRemoteStream(remoteStream) {
    peerVideo.srcObject = remoteStream;
  }
  function handleCallClicked() {
    if (!peer) {
      alert("Peer not connected");
    }
    getUserMedia({ video: { width: 1280, height: 720 }, audio: true }, function(stream) {
      var call = peer.call(peerId.value, stream);
      call.on("stream", handleRemoteStream);
    }, function(err) {
      console.error("Failed to get local stream", err);
    });
  }
})();
