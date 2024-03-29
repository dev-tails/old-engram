(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/papaparse/papaparse.min.js
  var require_papaparse_min = __commonJS({
    "node_modules/papaparse/papaparse.min.js"(exports, module) {
      !function(e, t) {
        typeof define == "function" && define.amd ? define([], t) : typeof module == "object" && typeof exports != "undefined" ? module.exports = t() : e.Papa = t();
      }(exports, function s() {
        "use strict";
        var f = typeof self != "undefined" ? self : typeof window != "undefined" ? window : f !== void 0 ? f : {};
        var n = !f.document && !!f.postMessage, o = n && /blob:/i.test((f.location || {}).protocol), a = {}, h = 0, b = { parse: function(e, t) {
          var i2 = (t = t || {}).dynamicTyping || false;
          M(i2) && (t.dynamicTypingFunction = i2, i2 = {});
          if (t.dynamicTyping = i2, t.transform = !!M(t.transform) && t.transform, t.worker && b.WORKERS_SUPPORTED) {
            var r = function() {
              if (!b.WORKERS_SUPPORTED)
                return false;
              var e2 = (i3 = f.URL || f.webkitURL || null, r2 = s.toString(), b.BLOB_URL || (b.BLOB_URL = i3.createObjectURL(new Blob(["(", r2, ")();"], { type: "text/javascript" })))), t2 = new f.Worker(e2);
              var i3, r2;
              return t2.onmessage = _, t2.id = h++, a[t2.id] = t2;
            }();
            return r.userStep = t.step, r.userChunk = t.chunk, r.userComplete = t.complete, r.userError = t.error, t.step = M(t.step), t.chunk = M(t.chunk), t.complete = M(t.complete), t.error = M(t.error), delete t.worker, void r.postMessage({ input: e, config: t, workerId: r.id });
          }
          var n2 = null;
          b.NODE_STREAM_INPUT, typeof e == "string" ? n2 = t.download ? new l(t) : new p(t) : e.readable === true && M(e.read) && M(e.on) ? n2 = new g(t) : (f.File && e instanceof File || e instanceof Object) && (n2 = new c(t));
          return n2.stream(e);
        }, unparse: function(e, t) {
          var n2 = false, _2 = true, m2 = ",", y2 = "\r\n", s2 = '"', a2 = s2 + s2, i2 = false, r = null, o2 = false;
          !function() {
            if (typeof t != "object")
              return;
            typeof t.delimiter != "string" || b.BAD_DELIMITERS.filter(function(e2) {
              return t.delimiter.indexOf(e2) !== -1;
            }).length || (m2 = t.delimiter);
            (typeof t.quotes == "boolean" || typeof t.quotes == "function" || Array.isArray(t.quotes)) && (n2 = t.quotes);
            typeof t.skipEmptyLines != "boolean" && typeof t.skipEmptyLines != "string" || (i2 = t.skipEmptyLines);
            typeof t.newline == "string" && (y2 = t.newline);
            typeof t.quoteChar == "string" && (s2 = t.quoteChar);
            typeof t.header == "boolean" && (_2 = t.header);
            if (Array.isArray(t.columns)) {
              if (t.columns.length === 0)
                throw new Error("Option columns is empty");
              r = t.columns;
            }
            t.escapeChar !== void 0 && (a2 = t.escapeChar + s2);
            typeof t.escapeFormulae == "boolean" && (o2 = t.escapeFormulae);
          }();
          var h2 = new RegExp(j(s2), "g");
          typeof e == "string" && (e = JSON.parse(e));
          if (Array.isArray(e)) {
            if (!e.length || Array.isArray(e[0]))
              return u2(null, e, i2);
            if (typeof e[0] == "object")
              return u2(r || Object.keys(e[0]), e, i2);
          } else if (typeof e == "object")
            return typeof e.data == "string" && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : typeof e.data[0] == "object" ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || typeof e.data[0] == "object" || (e.data = [e.data])), u2(e.fields || [], e.data || [], i2);
          throw new Error("Unable to serialize unrecognized input");
          function u2(e2, t2, i3) {
            var r2 = "";
            typeof e2 == "string" && (e2 = JSON.parse(e2)), typeof t2 == "string" && (t2 = JSON.parse(t2));
            var n3 = Array.isArray(e2) && 0 < e2.length, s3 = !Array.isArray(t2[0]);
            if (n3 && _2) {
              for (var a3 = 0; a3 < e2.length; a3++)
                0 < a3 && (r2 += m2), r2 += v2(e2[a3], a3);
              0 < t2.length && (r2 += y2);
            }
            for (var o3 = 0; o3 < t2.length; o3++) {
              var h3 = n3 ? e2.length : t2[o3].length, u3 = false, f2 = n3 ? Object.keys(t2[o3]).length === 0 : t2[o3].length === 0;
              if (i3 && !n3 && (u3 = i3 === "greedy" ? t2[o3].join("").trim() === "" : t2[o3].length === 1 && t2[o3][0].length === 0), i3 === "greedy" && n3) {
                for (var d2 = [], l2 = 0; l2 < h3; l2++) {
                  var c2 = s3 ? e2[l2] : l2;
                  d2.push(t2[o3][c2]);
                }
                u3 = d2.join("").trim() === "";
              }
              if (!u3) {
                for (var p2 = 0; p2 < h3; p2++) {
                  0 < p2 && !f2 && (r2 += m2);
                  var g2 = n3 && s3 ? e2[p2] : p2;
                  r2 += v2(t2[o3][g2], p2);
                }
                o3 < t2.length - 1 && (!i3 || 0 < h3 && !f2) && (r2 += y2);
              }
            }
            return r2;
          }
          function v2(e2, t2) {
            if (e2 == null)
              return "";
            if (e2.constructor === Date)
              return JSON.stringify(e2).slice(1, 25);
            o2 === true && typeof e2 == "string" && e2.match(/^[=+\-@].*$/) !== null && (e2 = "'" + e2);
            var i3 = e2.toString().replace(h2, a2), r2 = typeof n2 == "boolean" && n2 || typeof n2 == "function" && n2(e2, t2) || Array.isArray(n2) && n2[t2] || function(e3, t3) {
              for (var i4 = 0; i4 < t3.length; i4++)
                if (-1 < e3.indexOf(t3[i4]))
                  return true;
              return false;
            }(i3, b.BAD_DELIMITERS) || -1 < i3.indexOf(m2) || i3.charAt(0) === " " || i3.charAt(i3.length - 1) === " ";
            return r2 ? s2 + i3 + s2 : i3;
          }
        } };
        if (b.RECORD_SEP = String.fromCharCode(30), b.UNIT_SEP = String.fromCharCode(31), b.BYTE_ORDER_MARK = "\uFEFF", b.BAD_DELIMITERS = ["\r", "\n", '"', b.BYTE_ORDER_MARK], b.WORKERS_SUPPORTED = !n && !!f.Worker, b.NODE_STREAM_INPUT = 1, b.LocalChunkSize = 10485760, b.RemoteChunkSize = 5242880, b.DefaultDelimiter = ",", b.Parser = E, b.ParserHandle = i, b.NetworkStreamer = l, b.FileStreamer = c, b.StringStreamer = p, b.ReadableStreamStreamer = g, f.jQuery) {
          var d = f.jQuery;
          d.fn.parse = function(o2) {
            var i2 = o2.config || {}, h2 = [];
            return this.each(function(e2) {
              if (!(d(this).prop("tagName").toUpperCase() === "INPUT" && d(this).attr("type").toLowerCase() === "file" && f.FileReader) || !this.files || this.files.length === 0)
                return true;
              for (var t = 0; t < this.files.length; t++)
                h2.push({ file: this.files[t], inputElem: this, instanceConfig: d.extend({}, i2) });
            }), e(), this;
            function e() {
              if (h2.length !== 0) {
                var e2, t, i3, r, n2 = h2[0];
                if (M(o2.before)) {
                  var s2 = o2.before(n2.file, n2.inputElem);
                  if (typeof s2 == "object") {
                    if (s2.action === "abort")
                      return e2 = "AbortError", t = n2.file, i3 = n2.inputElem, r = s2.reason, void (M(o2.error) && o2.error({ name: e2 }, t, i3, r));
                    if (s2.action === "skip")
                      return void u2();
                    typeof s2.config == "object" && (n2.instanceConfig = d.extend(n2.instanceConfig, s2.config));
                  } else if (s2 === "skip")
                    return void u2();
                }
                var a2 = n2.instanceConfig.complete;
                n2.instanceConfig.complete = function(e3) {
                  M(a2) && a2(e3, n2.file, n2.inputElem), u2();
                }, b.parse(n2.file, n2.instanceConfig);
              } else
                M(o2.complete) && o2.complete();
            }
            function u2() {
              h2.splice(0, 1), e();
            }
          };
        }
        function u(e) {
          this._handle = null, this._finished = false, this._completed = false, this._halted = false, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = true, this._completeResults = { data: [], errors: [], meta: {} }, function(e2) {
            var t = w(e2);
            t.chunkSize = parseInt(t.chunkSize), e2.step || e2.chunk || (t.chunkSize = null);
            this._handle = new i(t), (this._handle.streamer = this)._config = t;
          }.call(this, e), this.parseChunk = function(e2, t) {
            if (this.isFirstChunk && M(this._config.beforeFirstChunk)) {
              var i2 = this._config.beforeFirstChunk(e2);
              i2 !== void 0 && (e2 = i2);
            }
            this.isFirstChunk = false, this._halted = false;
            var r = this._partialLine + e2;
            this._partialLine = "";
            var n2 = this._handle.parse(r, this._baseIndex, !this._finished);
            if (!this._handle.paused() && !this._handle.aborted()) {
              var s2 = n2.meta.cursor;
              this._finished || (this._partialLine = r.substring(s2 - this._baseIndex), this._baseIndex = s2), n2 && n2.data && (this._rowCount += n2.data.length);
              var a2 = this._finished || this._config.preview && this._rowCount >= this._config.preview;
              if (o)
                f.postMessage({ results: n2, workerId: b.WORKER_ID, finished: a2 });
              else if (M(this._config.chunk) && !t) {
                if (this._config.chunk(n2, this._handle), this._handle.paused() || this._handle.aborted())
                  return void (this._halted = true);
                n2 = void 0, this._completeResults = void 0;
              }
              return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(n2.data), this._completeResults.errors = this._completeResults.errors.concat(n2.errors), this._completeResults.meta = n2.meta), this._completed || !a2 || !M(this._config.complete) || n2 && n2.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = true), a2 || n2 && n2.meta.paused || this._nextChunk(), n2;
            }
            this._halted = true;
          }, this._sendError = function(e2) {
            M(this._config.error) ? this._config.error(e2) : o && this._config.error && f.postMessage({ workerId: b.WORKER_ID, error: e2, finished: false });
          };
        }
        function l(e) {
          var r;
          (e = e || {}).chunkSize || (e.chunkSize = b.RemoteChunkSize), u.call(this, e), this._nextChunk = n ? function() {
            this._readChunk(), this._chunkLoaded();
          } : function() {
            this._readChunk();
          }, this.stream = function(e2) {
            this._input = e2, this._nextChunk();
          }, this._readChunk = function() {
            if (this._finished)
              this._chunkLoaded();
            else {
              if (r = new XMLHttpRequest(), this._config.withCredentials && (r.withCredentials = this._config.withCredentials), n || (r.onload = v(this._chunkLoaded, this), r.onerror = v(this._chunkError, this)), r.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !n), this._config.downloadRequestHeaders) {
                var e2 = this._config.downloadRequestHeaders;
                for (var t in e2)
                  r.setRequestHeader(t, e2[t]);
              }
              if (this._config.chunkSize) {
                var i2 = this._start + this._config.chunkSize - 1;
                r.setRequestHeader("Range", "bytes=" + this._start + "-" + i2);
              }
              try {
                r.send(this._config.downloadRequestBody);
              } catch (e3) {
                this._chunkError(e3.message);
              }
              n && r.status === 0 && this._chunkError();
            }
          }, this._chunkLoaded = function() {
            r.readyState === 4 && (r.status < 200 || 400 <= r.status ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : r.responseText.length, this._finished = !this._config.chunkSize || this._start >= function(e2) {
              var t = e2.getResponseHeader("Content-Range");
              if (t === null)
                return -1;
              return parseInt(t.substring(t.lastIndexOf("/") + 1));
            }(r), this.parseChunk(r.responseText)));
          }, this._chunkError = function(e2) {
            var t = r.statusText || e2;
            this._sendError(new Error(t));
          };
        }
        function c(e) {
          var r, n2;
          (e = e || {}).chunkSize || (e.chunkSize = b.LocalChunkSize), u.call(this, e);
          var s2 = typeof FileReader != "undefined";
          this.stream = function(e2) {
            this._input = e2, n2 = e2.slice || e2.webkitSlice || e2.mozSlice, s2 ? ((r = new FileReader()).onload = v(this._chunkLoaded, this), r.onerror = v(this._chunkError, this)) : r = new FileReaderSync(), this._nextChunk();
          }, this._nextChunk = function() {
            this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
          }, this._readChunk = function() {
            var e2 = this._input;
            if (this._config.chunkSize) {
              var t = Math.min(this._start + this._config.chunkSize, this._input.size);
              e2 = n2.call(e2, this._start, t);
            }
            var i2 = r.readAsText(e2, this._config.encoding);
            s2 || this._chunkLoaded({ target: { result: i2 } });
          }, this._chunkLoaded = function(e2) {
            this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e2.target.result);
          }, this._chunkError = function() {
            this._sendError(r.error);
          };
        }
        function p(e) {
          var i2;
          u.call(this, e = e || {}), this.stream = function(e2) {
            return i2 = e2, this._nextChunk();
          }, this._nextChunk = function() {
            if (!this._finished) {
              var e2, t = this._config.chunkSize;
              return t ? (e2 = i2.substring(0, t), i2 = i2.substring(t)) : (e2 = i2, i2 = ""), this._finished = !i2, this.parseChunk(e2);
            }
          };
        }
        function g(e) {
          u.call(this, e = e || {});
          var t = [], i2 = true, r = false;
          this.pause = function() {
            u.prototype.pause.apply(this, arguments), this._input.pause();
          }, this.resume = function() {
            u.prototype.resume.apply(this, arguments), this._input.resume();
          }, this.stream = function(e2) {
            this._input = e2, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
          }, this._checkIsFinished = function() {
            r && t.length === 1 && (this._finished = true);
          }, this._nextChunk = function() {
            this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i2 = true;
          }, this._streamData = v(function(e2) {
            try {
              t.push(typeof e2 == "string" ? e2 : e2.toString(this._config.encoding)), i2 && (i2 = false, this._checkIsFinished(), this.parseChunk(t.shift()));
            } catch (e3) {
              this._streamError(e3);
            }
          }, this), this._streamError = v(function(e2) {
            this._streamCleanUp(), this._sendError(e2);
          }, this), this._streamEnd = v(function() {
            this._streamCleanUp(), r = true, this._streamData("");
          }, this), this._streamCleanUp = v(function() {
            this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
          }, this);
        }
        function i(m2) {
          var a2, o2, h2, r = Math.pow(2, 53), n2 = -r, s2 = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, u2 = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/, t = this, i2 = 0, f2 = 0, d2 = false, e = false, l2 = [], c2 = { data: [], errors: [], meta: {} };
          if (M(m2.step)) {
            var p2 = m2.step;
            m2.step = function(e2) {
              if (c2 = e2, _2())
                g2();
              else {
                if (g2(), c2.data.length === 0)
                  return;
                i2 += e2.data.length, m2.preview && i2 > m2.preview ? o2.abort() : (c2.data = c2.data[0], p2(c2, t));
              }
            };
          }
          function y2(e2) {
            return m2.skipEmptyLines === "greedy" ? e2.join("").trim() === "" : e2.length === 1 && e2[0].length === 0;
          }
          function g2() {
            if (c2 && h2 && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + b.DefaultDelimiter + "'"), h2 = false), m2.skipEmptyLines)
              for (var e2 = 0; e2 < c2.data.length; e2++)
                y2(c2.data[e2]) && c2.data.splice(e2--, 1);
            return _2() && function() {
              if (!c2)
                return;
              function e3(e4, t3) {
                M(m2.transformHeader) && (e4 = m2.transformHeader(e4, t3)), l2.push(e4);
              }
              if (Array.isArray(c2.data[0])) {
                for (var t2 = 0; _2() && t2 < c2.data.length; t2++)
                  c2.data[t2].forEach(e3);
                c2.data.splice(0, 1);
              } else
                c2.data.forEach(e3);
            }(), function() {
              if (!c2 || !m2.header && !m2.dynamicTyping && !m2.transform)
                return c2;
              function e3(e4, t3) {
                var i3, r2 = m2.header ? {} : [];
                for (i3 = 0; i3 < e4.length; i3++) {
                  var n3 = i3, s3 = e4[i3];
                  m2.header && (n3 = i3 >= l2.length ? "__parsed_extra" : l2[i3]), m2.transform && (s3 = m2.transform(s3, n3)), s3 = v2(n3, s3), n3 === "__parsed_extra" ? (r2[n3] = r2[n3] || [], r2[n3].push(s3)) : r2[n3] = s3;
                }
                return m2.header && (i3 > l2.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + l2.length + " fields but parsed " + i3, f2 + t3) : i3 < l2.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + l2.length + " fields but parsed " + i3, f2 + t3)), r2;
              }
              var t2 = 1;
              !c2.data.length || Array.isArray(c2.data[0]) ? (c2.data = c2.data.map(e3), t2 = c2.data.length) : c2.data = e3(c2.data, 0);
              m2.header && c2.meta && (c2.meta.fields = l2);
              return f2 += t2, c2;
            }();
          }
          function _2() {
            return m2.header && l2.length === 0;
          }
          function v2(e2, t2) {
            return i3 = e2, m2.dynamicTypingFunction && m2.dynamicTyping[i3] === void 0 && (m2.dynamicTyping[i3] = m2.dynamicTypingFunction(i3)), (m2.dynamicTyping[i3] || m2.dynamicTyping) === true ? t2 === "true" || t2 === "TRUE" || t2 !== "false" && t2 !== "FALSE" && (function(e3) {
              if (s2.test(e3)) {
                var t3 = parseFloat(e3);
                if (n2 < t3 && t3 < r)
                  return true;
              }
              return false;
            }(t2) ? parseFloat(t2) : u2.test(t2) ? new Date(t2) : t2 === "" ? null : t2) : t2;
            var i3;
          }
          function k(e2, t2, i3, r2) {
            var n3 = { type: e2, code: t2, message: i3 };
            r2 !== void 0 && (n3.row = r2), c2.errors.push(n3);
          }
          this.parse = function(e2, t2, i3) {
            var r2 = m2.quoteChar || '"';
            if (m2.newline || (m2.newline = function(e3, t3) {
              e3 = e3.substring(0, 1048576);
              var i4 = new RegExp(j(t3) + "([^]*?)" + j(t3), "gm"), r3 = (e3 = e3.replace(i4, "")).split("\r"), n4 = e3.split("\n"), s4 = 1 < n4.length && n4[0].length < r3[0].length;
              if (r3.length === 1 || s4)
                return "\n";
              for (var a3 = 0, o3 = 0; o3 < r3.length; o3++)
                r3[o3][0] === "\n" && a3++;
              return a3 >= r3.length / 2 ? "\r\n" : "\r";
            }(e2, r2)), h2 = false, m2.delimiter)
              M(m2.delimiter) && (m2.delimiter = m2.delimiter(e2), c2.meta.delimiter = m2.delimiter);
            else {
              var n3 = function(e3, t3, i4, r3, n4) {
                var s4, a3, o3, h3;
                n4 = n4 || [",", "	", "|", ";", b.RECORD_SEP, b.UNIT_SEP];
                for (var u3 = 0; u3 < n4.length; u3++) {
                  var f3 = n4[u3], d3 = 0, l3 = 0, c3 = 0;
                  o3 = void 0;
                  for (var p3 = new E({ comments: r3, delimiter: f3, newline: t3, preview: 10 }).parse(e3), g3 = 0; g3 < p3.data.length; g3++)
                    if (i4 && y2(p3.data[g3]))
                      c3++;
                    else {
                      var _3 = p3.data[g3].length;
                      l3 += _3, o3 !== void 0 ? 0 < _3 && (d3 += Math.abs(_3 - o3), o3 = _3) : o3 = _3;
                    }
                  0 < p3.data.length && (l3 /= p3.data.length - c3), (a3 === void 0 || d3 <= a3) && (h3 === void 0 || h3 < l3) && 1.99 < l3 && (a3 = d3, s4 = f3, h3 = l3);
                }
                return { successful: !!(m2.delimiter = s4), bestDelimiter: s4 };
              }(e2, m2.newline, m2.skipEmptyLines, m2.comments, m2.delimitersToGuess);
              n3.successful ? m2.delimiter = n3.bestDelimiter : (h2 = true, m2.delimiter = b.DefaultDelimiter), c2.meta.delimiter = m2.delimiter;
            }
            var s3 = w(m2);
            return m2.preview && m2.header && s3.preview++, a2 = e2, o2 = new E(s3), c2 = o2.parse(a2, t2, i3), g2(), d2 ? { meta: { paused: true } } : c2 || { meta: { paused: false } };
          }, this.paused = function() {
            return d2;
          }, this.pause = function() {
            d2 = true, o2.abort(), a2 = M(m2.chunk) ? "" : a2.substring(o2.getCharIndex());
          }, this.resume = function() {
            t.streamer._halted ? (d2 = false, t.streamer.parseChunk(a2, true)) : setTimeout(t.resume, 3);
          }, this.aborted = function() {
            return e;
          }, this.abort = function() {
            e = true, o2.abort(), c2.meta.aborted = true, M(m2.complete) && m2.complete(c2), a2 = "";
          };
        }
        function j(e) {
          return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        function E(e) {
          var S, O = (e = e || {}).delimiter, x = e.newline, I = e.comments, T = e.step, D = e.preview, A = e.fastMode, L = S = e.quoteChar === void 0 ? '"' : e.quoteChar;
          if (e.escapeChar !== void 0 && (L = e.escapeChar), (typeof O != "string" || -1 < b.BAD_DELIMITERS.indexOf(O)) && (O = ","), I === O)
            throw new Error("Comment character same as delimiter");
          I === true ? I = "#" : (typeof I != "string" || -1 < b.BAD_DELIMITERS.indexOf(I)) && (I = false), x !== "\n" && x !== "\r" && x !== "\r\n" && (x = "\n");
          var F = 0, z = false;
          this.parse = function(r, t, i2) {
            if (typeof r != "string")
              throw new Error("Input must be a string");
            var n2 = r.length, e2 = O.length, s2 = x.length, a2 = I.length, o2 = M(T), h2 = [], u2 = [], f2 = [], d2 = F = 0;
            if (!r)
              return C();
            if (A || A !== false && r.indexOf(S) === -1) {
              for (var l2 = r.split(x), c2 = 0; c2 < l2.length; c2++) {
                if (f2 = l2[c2], F += f2.length, c2 !== l2.length - 1)
                  F += x.length;
                else if (i2)
                  return C();
                if (!I || f2.substring(0, a2) !== I) {
                  if (o2) {
                    if (h2 = [], k(f2.split(O)), R(), z)
                      return C();
                  } else
                    k(f2.split(O));
                  if (D && D <= c2)
                    return h2 = h2.slice(0, D), C(true);
                }
              }
              return C();
            }
            for (var p2 = r.indexOf(O, F), g2 = r.indexOf(x, F), _2 = new RegExp(j(L) + j(S), "g"), m2 = r.indexOf(S, F); ; )
              if (r[F] !== S)
                if (I && f2.length === 0 && r.substring(F, F + a2) === I) {
                  if (g2 === -1)
                    return C();
                  F = g2 + s2, g2 = r.indexOf(x, F), p2 = r.indexOf(O, F);
                } else if (p2 !== -1 && (p2 < g2 || g2 === -1))
                  f2.push(r.substring(F, p2)), F = p2 + e2, p2 = r.indexOf(O, F);
                else {
                  if (g2 === -1)
                    break;
                  if (f2.push(r.substring(F, g2)), w2(g2 + s2), o2 && (R(), z))
                    return C();
                  if (D && h2.length >= D)
                    return C(true);
                }
              else
                for (m2 = F, F++; ; ) {
                  if ((m2 = r.indexOf(S, m2 + 1)) === -1)
                    return i2 || u2.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: h2.length, index: F }), E2();
                  if (m2 === n2 - 1)
                    return E2(r.substring(F, m2).replace(_2, S));
                  if (S !== L || r[m2 + 1] !== L) {
                    if (S === L || m2 === 0 || r[m2 - 1] !== L) {
                      p2 !== -1 && p2 < m2 + 1 && (p2 = r.indexOf(O, m2 + 1)), g2 !== -1 && g2 < m2 + 1 && (g2 = r.indexOf(x, m2 + 1));
                      var y2 = b2(g2 === -1 ? p2 : Math.min(p2, g2));
                      if (r[m2 + 1 + y2] === O) {
                        f2.push(r.substring(F, m2).replace(_2, S)), r[F = m2 + 1 + y2 + e2] !== S && (m2 = r.indexOf(S, F)), p2 = r.indexOf(O, F), g2 = r.indexOf(x, F);
                        break;
                      }
                      var v2 = b2(g2);
                      if (r.substring(m2 + 1 + v2, m2 + 1 + v2 + s2) === x) {
                        if (f2.push(r.substring(F, m2).replace(_2, S)), w2(m2 + 1 + v2 + s2), p2 = r.indexOf(O, F), m2 = r.indexOf(S, F), o2 && (R(), z))
                          return C();
                        if (D && h2.length >= D)
                          return C(true);
                        break;
                      }
                      u2.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: h2.length, index: F }), m2++;
                    }
                  } else
                    m2++;
                }
            return E2();
            function k(e3) {
              h2.push(e3), d2 = F;
            }
            function b2(e3) {
              var t2 = 0;
              if (e3 !== -1) {
                var i3 = r.substring(m2 + 1, e3);
                i3 && i3.trim() === "" && (t2 = i3.length);
              }
              return t2;
            }
            function E2(e3) {
              return i2 || (e3 === void 0 && (e3 = r.substring(F)), f2.push(e3), F = n2, k(f2), o2 && R()), C();
            }
            function w2(e3) {
              F = e3, k(f2), f2 = [], g2 = r.indexOf(x, F);
            }
            function C(e3) {
              return { data: h2, errors: u2, meta: { delimiter: O, linebreak: x, aborted: z, truncated: !!e3, cursor: d2 + (t || 0) } };
            }
            function R() {
              T(C()), h2 = [], u2 = [];
            }
          }, this.abort = function() {
            z = true;
          }, this.getCharIndex = function() {
            return F;
          };
        }
        function _(e) {
          var t = e.data, i2 = a[t.workerId], r = false;
          if (t.error)
            i2.userError(t.error, t.file);
          else if (t.results && t.results.data) {
            var n2 = { abort: function() {
              r = true, m(t.workerId, { data: [], errors: [], meta: { aborted: true } });
            }, pause: y, resume: y };
            if (M(i2.userStep)) {
              for (var s2 = 0; s2 < t.results.data.length && (i2.userStep({ data: t.results.data[s2], errors: t.results.errors, meta: t.results.meta }, n2), !r); s2++)
                ;
              delete t.results;
            } else
              M(i2.userChunk) && (i2.userChunk(t.results, n2, t.file), delete t.results);
          }
          t.finished && !r && m(t.workerId, t.results);
        }
        function m(e, t) {
          var i2 = a[e];
          M(i2.userComplete) && i2.userComplete(t), i2.terminate(), delete a[e];
        }
        function y() {
          throw new Error("Not implemented.");
        }
        function w(e) {
          if (typeof e != "object" || e === null)
            return e;
          var t = Array.isArray(e) ? [] : {};
          for (var i2 in e)
            t[i2] = w(e[i2]);
          return t;
        }
        function v(e, t) {
          return function() {
            e.apply(t, arguments);
          };
        }
        function M(e) {
          return typeof e == "function";
        }
        return o && (f.onmessage = function(e) {
          var t = e.data;
          b.WORKER_ID === void 0 && t && (b.WORKER_ID = t.workerId);
          if (typeof t.input == "string")
            f.postMessage({ workerId: b.WORKER_ID, results: b.parse(t.input, t.config), finished: true });
          else if (f.File && t.input instanceof File || t.input instanceof Object) {
            var i2 = b.parse(t.input, t.config);
            i2 && f.postMessage({ workerId: b.WORKER_ID, results: i2, finished: true });
          }
        }), (l.prototype = Object.create(u.prototype)).constructor = l, (c.prototype = Object.create(u.prototype)).constructor = c, (p.prototype = Object.create(p.prototype)).constructor = p, (g.prototype = Object.create(u.prototype)).constructor = g, b;
      });
    }
  });

  // import.ts
  var import_papaparse = __toESM(require_papaparse_min());
  var csvInput = document.getElementById("csv-file");
  csvInput.addEventListener("change", () => {
    const file = csvInput.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function(evt) {
      const csvText = evt.target.result;
      const parseResult = import_papaparse.default.parse(csvText);
      let cards = [];
      for (const data of parseResult.data) {
        cards.push({
          front: data[0],
          back: data[1]
        });
      }
      localStorage.setItem("cards", JSON.stringify(cards));
    };
  });
})();
/* @license
Papa Parse
v5.3.1
https://github.com/mholt/PapaParse
License: MIT
*/
