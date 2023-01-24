(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/peerjs-js-binarypack/lib/bufferbuilder.js
  var require_bufferbuilder = __commonJS({
    "node_modules/peerjs-js-binarypack/lib/bufferbuilder.js"(exports, module) {
      var binaryFeatures = {};
      binaryFeatures.useBlobBuilder = function() {
        try {
          new Blob([]);
          return false;
        } catch (e) {
          return true;
        }
      }();
      binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && function() {
        try {
          return new Blob([new Uint8Array([])]).size === 0;
        } catch (e) {
          return true;
        }
      }();
      module.exports.binaryFeatures = binaryFeatures;
      var BlobBuilder = module.exports.BlobBuilder;
      if (typeof window !== "undefined") {
        BlobBuilder = module.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
      }
      function BufferBuilder() {
        this._pieces = [];
        this._parts = [];
      }
      BufferBuilder.prototype.append = function(data) {
        if (typeof data === "number") {
          this._pieces.push(data);
        } else {
          this.flush();
          this._parts.push(data);
        }
      };
      BufferBuilder.prototype.flush = function() {
        if (this._pieces.length > 0) {
          var buf = new Uint8Array(this._pieces);
          if (!binaryFeatures.useArrayBufferView) {
            buf = buf.buffer;
          }
          this._parts.push(buf);
          this._pieces = [];
        }
      };
      BufferBuilder.prototype.getBuffer = function() {
        this.flush();
        if (binaryFeatures.useBlobBuilder) {
          var builder = new BlobBuilder();
          for (var i2 = 0, ii = this._parts.length; i2 < ii; i2++) {
            builder.append(this._parts[i2]);
          }
          return builder.getBlob();
        } else {
          return new Blob(this._parts);
        }
      };
      module.exports.BufferBuilder = BufferBuilder;
    }
  });

  // node_modules/peerjs-js-binarypack/lib/binarypack.js
  var require_binarypack = __commonJS({
    "node_modules/peerjs-js-binarypack/lib/binarypack.js"(exports, module) {
      var BufferBuilder = require_bufferbuilder().BufferBuilder;
      var binaryFeatures = require_bufferbuilder().binaryFeatures;
      var BinaryPack = {
        unpack: function(data) {
          var unpacker = new Unpacker(data);
          return unpacker.unpack();
        },
        pack: function(data) {
          var packer = new Packer();
          packer.pack(data);
          var buffer = packer.getBuffer();
          return buffer;
        }
      };
      module.exports = BinaryPack;
      function Unpacker(data) {
        this.index = 0;
        this.dataBuffer = data;
        this.dataView = new Uint8Array(this.dataBuffer);
        this.length = this.dataBuffer.byteLength;
      }
      Unpacker.prototype.unpack = function() {
        var type = this.unpack_uint8();
        if (type < 128) {
          return type;
        } else if ((type ^ 224) < 32) {
          return (type ^ 224) - 32;
        }
        var size;
        if ((size = type ^ 160) <= 15) {
          return this.unpack_raw(size);
        } else if ((size = type ^ 176) <= 15) {
          return this.unpack_string(size);
        } else if ((size = type ^ 144) <= 15) {
          return this.unpack_array(size);
        } else if ((size = type ^ 128) <= 15) {
          return this.unpack_map(size);
        }
        switch (type) {
          case 192:
            return null;
          case 193:
            return void 0;
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
            return void 0;
          case 213:
            return void 0;
          case 214:
            return void 0;
          case 215:
            return void 0;
          case 216:
            size = this.unpack_uint16();
            return this.unpack_string(size);
          case 217:
            size = this.unpack_uint32();
            return this.unpack_string(size);
          case 218:
            size = this.unpack_uint16();
            return this.unpack_raw(size);
          case 219:
            size = this.unpack_uint32();
            return this.unpack_raw(size);
          case 220:
            size = this.unpack_uint16();
            return this.unpack_array(size);
          case 221:
            size = this.unpack_uint32();
            return this.unpack_array(size);
          case 222:
            size = this.unpack_uint16();
            return this.unpack_map(size);
          case 223:
            size = this.unpack_uint32();
            return this.unpack_map(size);
        }
      };
      Unpacker.prototype.unpack_uint8 = function() {
        var byte = this.dataView[this.index] & 255;
        this.index++;
        return byte;
      };
      Unpacker.prototype.unpack_uint16 = function() {
        var bytes = this.read(2);
        var uint16 = (bytes[0] & 255) * 256 + (bytes[1] & 255);
        this.index += 2;
        return uint16;
      };
      Unpacker.prototype.unpack_uint32 = function() {
        var bytes = this.read(4);
        var uint32 = ((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3];
        this.index += 4;
        return uint32;
      };
      Unpacker.prototype.unpack_uint64 = function() {
        var bytes = this.read(8);
        var uint64 = ((((((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3]) * 256 + bytes[4]) * 256 + bytes[5]) * 256 + bytes[6]) * 256 + bytes[7];
        this.index += 8;
        return uint64;
      };
      Unpacker.prototype.unpack_int8 = function() {
        var uint8 = this.unpack_uint8();
        return uint8 < 128 ? uint8 : uint8 - (1 << 8);
      };
      Unpacker.prototype.unpack_int16 = function() {
        var uint16 = this.unpack_uint16();
        return uint16 < 32768 ? uint16 : uint16 - (1 << 16);
      };
      Unpacker.prototype.unpack_int32 = function() {
        var uint32 = this.unpack_uint32();
        return uint32 < Math.pow(2, 31) ? uint32 : uint32 - Math.pow(2, 32);
      };
      Unpacker.prototype.unpack_int64 = function() {
        var uint64 = this.unpack_uint64();
        return uint64 < Math.pow(2, 63) ? uint64 : uint64 - Math.pow(2, 64);
      };
      Unpacker.prototype.unpack_raw = function(size) {
        if (this.length < this.index + size) {
          throw new Error("BinaryPackFailure: index is out of range " + this.index + " " + size + " " + this.length);
        }
        var buf = this.dataBuffer.slice(this.index, this.index + size);
        this.index += size;
        return buf;
      };
      Unpacker.prototype.unpack_string = function(size) {
        var bytes = this.read(size);
        var i2 = 0;
        var str = "";
        var c;
        var code;
        while (i2 < size) {
          c = bytes[i2];
          if (c < 128) {
            str += String.fromCharCode(c);
            i2++;
          } else if ((c ^ 192) < 32) {
            code = (c ^ 192) << 6 | bytes[i2 + 1] & 63;
            str += String.fromCharCode(code);
            i2 += 2;
          } else {
            code = (c & 15) << 12 | (bytes[i2 + 1] & 63) << 6 | bytes[i2 + 2] & 63;
            str += String.fromCharCode(code);
            i2 += 3;
          }
        }
        this.index += size;
        return str;
      };
      Unpacker.prototype.unpack_array = function(size) {
        var objects = new Array(size);
        for (var i2 = 0; i2 < size; i2++) {
          objects[i2] = this.unpack();
        }
        return objects;
      };
      Unpacker.prototype.unpack_map = function(size) {
        var map2 = {};
        for (var i2 = 0; i2 < size; i2++) {
          var key = this.unpack();
          var value2 = this.unpack();
          map2[key] = value2;
        }
        return map2;
      };
      Unpacker.prototype.unpack_float = function() {
        var uint32 = this.unpack_uint32();
        var sign = uint32 >> 31;
        var exp = (uint32 >> 23 & 255) - 127;
        var fraction = uint32 & 8388607 | 8388608;
        return (sign === 0 ? 1 : -1) * fraction * Math.pow(2, exp - 23);
      };
      Unpacker.prototype.unpack_double = function() {
        var h32 = this.unpack_uint32();
        var l32 = this.unpack_uint32();
        var sign = h32 >> 31;
        var exp = (h32 >> 20 & 2047) - 1023;
        var hfrac = h32 & 1048575 | 1048576;
        var frac = hfrac * Math.pow(2, exp - 20) + l32 * Math.pow(2, exp - 52);
        return (sign === 0 ? 1 : -1) * frac;
      };
      Unpacker.prototype.read = function(length2) {
        var j = this.index;
        if (j + length2 <= this.length) {
          return this.dataView.subarray(j, j + length2);
        } else {
          throw new Error("BinaryPackFailure: read index out of range");
        }
      };
      function Packer() {
        this.bufferBuilder = new BufferBuilder();
      }
      Packer.prototype.getBuffer = function() {
        return this.bufferBuilder.getBuffer();
      };
      Packer.prototype.pack = function(value2) {
        var type = typeof value2;
        if (type === "string") {
          this.pack_string(value2);
        } else if (type === "number") {
          if (Math.floor(value2) === value2) {
            this.pack_integer(value2);
          } else {
            this.pack_double(value2);
          }
        } else if (type === "boolean") {
          if (value2 === true) {
            this.bufferBuilder.append(195);
          } else if (value2 === false) {
            this.bufferBuilder.append(194);
          }
        } else if (type === "undefined") {
          this.bufferBuilder.append(192);
        } else if (type === "object") {
          if (value2 === null) {
            this.bufferBuilder.append(192);
          } else {
            var constructor = value2.constructor;
            if (constructor == Array) {
              this.pack_array(value2);
            } else if (constructor == Blob || constructor == File || value2 instanceof Blob || value2 instanceof File) {
              this.pack_bin(value2);
            } else if (constructor == ArrayBuffer) {
              if (binaryFeatures.useArrayBufferView) {
                this.pack_bin(new Uint8Array(value2));
              } else {
                this.pack_bin(value2);
              }
            } else if ("BYTES_PER_ELEMENT" in value2) {
              if (binaryFeatures.useArrayBufferView) {
                this.pack_bin(new Uint8Array(value2.buffer));
              } else {
                this.pack_bin(value2.buffer);
              }
            } else if (constructor == Object || constructor.toString().startsWith("class")) {
              this.pack_object(value2);
            } else if (constructor == Date) {
              this.pack_string(value2.toString());
            } else if (typeof value2.toBinaryPack === "function") {
              this.bufferBuilder.append(value2.toBinaryPack());
            } else {
              throw new Error('Type "' + constructor.toString() + '" not yet supported');
            }
          }
        } else {
          throw new Error('Type "' + type + '" not yet supported');
        }
        this.bufferBuilder.flush();
      };
      Packer.prototype.pack_bin = function(blob) {
        var length2 = blob.length || blob.byteLength || blob.size;
        if (length2 <= 15) {
          this.pack_uint8(160 + length2);
        } else if (length2 <= 65535) {
          this.bufferBuilder.append(218);
          this.pack_uint16(length2);
        } else if (length2 <= 4294967295) {
          this.bufferBuilder.append(219);
          this.pack_uint32(length2);
        } else {
          throw new Error("Invalid length");
        }
        this.bufferBuilder.append(blob);
      };
      Packer.prototype.pack_string = function(str) {
        var length2 = utf8Length2(str);
        if (length2 <= 15) {
          this.pack_uint8(176 + length2);
        } else if (length2 <= 65535) {
          this.bufferBuilder.append(216);
          this.pack_uint16(length2);
        } else if (length2 <= 4294967295) {
          this.bufferBuilder.append(217);
          this.pack_uint32(length2);
        } else {
          throw new Error("Invalid length");
        }
        this.bufferBuilder.append(str);
      };
      Packer.prototype.pack_array = function(ary) {
        var length2 = ary.length;
        if (length2 <= 15) {
          this.pack_uint8(144 + length2);
        } else if (length2 <= 65535) {
          this.bufferBuilder.append(220);
          this.pack_uint16(length2);
        } else if (length2 <= 4294967295) {
          this.bufferBuilder.append(221);
          this.pack_uint32(length2);
        } else {
          throw new Error("Invalid length");
        }
        for (var i2 = 0; i2 < length2; i2++) {
          this.pack(ary[i2]);
        }
      };
      Packer.prototype.pack_integer = function(num) {
        if (num >= -32 && num <= 127) {
          this.bufferBuilder.append(num & 255);
        } else if (num >= 0 && num <= 255) {
          this.bufferBuilder.append(204);
          this.pack_uint8(num);
        } else if (num >= -128 && num <= 127) {
          this.bufferBuilder.append(208);
          this.pack_int8(num);
        } else if (num >= 0 && num <= 65535) {
          this.bufferBuilder.append(205);
          this.pack_uint16(num);
        } else if (num >= -32768 && num <= 32767) {
          this.bufferBuilder.append(209);
          this.pack_int16(num);
        } else if (num >= 0 && num <= 4294967295) {
          this.bufferBuilder.append(206);
          this.pack_uint32(num);
        } else if (num >= -2147483648 && num <= 2147483647) {
          this.bufferBuilder.append(210);
          this.pack_int32(num);
        } else if (num >= -9223372036854776e3 && num <= 9223372036854776e3) {
          this.bufferBuilder.append(211);
          this.pack_int64(num);
        } else if (num >= 0 && num <= 18446744073709552e3) {
          this.bufferBuilder.append(207);
          this.pack_uint64(num);
        } else {
          throw new Error("Invalid integer");
        }
      };
      Packer.prototype.pack_double = function(num) {
        var sign = 0;
        if (num < 0) {
          sign = 1;
          num = -num;
        }
        var exp = Math.floor(Math.log(num) / Math.LN2);
        var frac0 = num / Math.pow(2, exp) - 1;
        var frac1 = Math.floor(frac0 * Math.pow(2, 52));
        var b32 = Math.pow(2, 32);
        var h32 = sign << 31 | exp + 1023 << 20 | frac1 / b32 & 1048575;
        var l32 = frac1 % b32;
        this.bufferBuilder.append(203);
        this.pack_int32(h32);
        this.pack_int32(l32);
      };
      Packer.prototype.pack_object = function(obj) {
        var keys = Object.keys(obj);
        var length2 = keys.length;
        if (length2 <= 15) {
          this.pack_uint8(128 + length2);
        } else if (length2 <= 65535) {
          this.bufferBuilder.append(222);
          this.pack_uint16(length2);
        } else if (length2 <= 4294967295) {
          this.bufferBuilder.append(223);
          this.pack_uint32(length2);
        } else {
          throw new Error("Invalid length");
        }
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            this.pack(prop);
            this.pack(obj[prop]);
          }
        }
      };
      Packer.prototype.pack_uint8 = function(num) {
        this.bufferBuilder.append(num);
      };
      Packer.prototype.pack_uint16 = function(num) {
        this.bufferBuilder.append(num >> 8);
        this.bufferBuilder.append(num & 255);
      };
      Packer.prototype.pack_uint32 = function(num) {
        var n = num & 4294967295;
        this.bufferBuilder.append((n & 4278190080) >>> 24);
        this.bufferBuilder.append((n & 16711680) >>> 16);
        this.bufferBuilder.append((n & 65280) >>> 8);
        this.bufferBuilder.append(n & 255);
      };
      Packer.prototype.pack_uint64 = function(num) {
        var high = num / Math.pow(2, 32);
        var low = num % Math.pow(2, 32);
        this.bufferBuilder.append((high & 4278190080) >>> 24);
        this.bufferBuilder.append((high & 16711680) >>> 16);
        this.bufferBuilder.append((high & 65280) >>> 8);
        this.bufferBuilder.append(high & 255);
        this.bufferBuilder.append((low & 4278190080) >>> 24);
        this.bufferBuilder.append((low & 16711680) >>> 16);
        this.bufferBuilder.append((low & 65280) >>> 8);
        this.bufferBuilder.append(low & 255);
      };
      Packer.prototype.pack_int8 = function(num) {
        this.bufferBuilder.append(num & 255);
      };
      Packer.prototype.pack_int16 = function(num) {
        this.bufferBuilder.append((num & 65280) >> 8);
        this.bufferBuilder.append(num & 255);
      };
      Packer.prototype.pack_int32 = function(num) {
        this.bufferBuilder.append(num >>> 24 & 255);
        this.bufferBuilder.append((num & 16711680) >>> 16);
        this.bufferBuilder.append((num & 65280) >>> 8);
        this.bufferBuilder.append(num & 255);
      };
      Packer.prototype.pack_int64 = function(num) {
        var high = Math.floor(num / Math.pow(2, 32));
        var low = num % Math.pow(2, 32);
        this.bufferBuilder.append((high & 4278190080) >>> 24);
        this.bufferBuilder.append((high & 16711680) >>> 16);
        this.bufferBuilder.append((high & 65280) >>> 8);
        this.bufferBuilder.append(high & 255);
        this.bufferBuilder.append((low & 4278190080) >>> 24);
        this.bufferBuilder.append((low & 16711680) >>> 16);
        this.bufferBuilder.append((low & 65280) >>> 8);
        this.bufferBuilder.append(low & 255);
      };
      function _utf8Replace(m) {
        var code = m.charCodeAt(0);
        if (code <= 2047)
          return "00";
        if (code <= 65535)
          return "000";
        if (code <= 2097151)
          return "0000";
        if (code <= 67108863)
          return "00000";
        return "000000";
      }
      function utf8Length2(str) {
        if (str.length > 600) {
          return new Blob([str]).size;
        } else {
          return str.replace(/[^\u0000-\u007F]/g, _utf8Replace).length;
        }
      }
    }
  });

  // node_modules/sdp/sdp.js
  var require_sdp = __commonJS({
    "node_modules/sdp/sdp.js"(exports, module) {
      "use strict";
      var SDPUtils2 = {};
      SDPUtils2.generateIdentifier = function() {
        return Math.random().toString(36).substr(2, 10);
      };
      SDPUtils2.localCName = SDPUtils2.generateIdentifier();
      SDPUtils2.splitLines = function(blob) {
        return blob.trim().split("\n").map(function(line) {
          return line.trim();
        });
      };
      SDPUtils2.splitSections = function(blob) {
        var parts2 = blob.split("\nm=");
        return parts2.map(function(part, index) {
          return (index > 0 ? "m=" + part : part).trim() + "\r\n";
        });
      };
      SDPUtils2.getDescription = function(blob) {
        var sections = SDPUtils2.splitSections(blob);
        return sections && sections[0];
      };
      SDPUtils2.getMediaSections = function(blob) {
        var sections = SDPUtils2.splitSections(blob);
        sections.shift();
        return sections;
      };
      SDPUtils2.matchPrefix = function(blob, prefix) {
        return SDPUtils2.splitLines(blob).filter(function(line) {
          return line.indexOf(prefix) === 0;
        });
      };
      SDPUtils2.parseCandidate = function(line) {
        var parts2;
        if (line.indexOf("a=candidate:") === 0) {
          parts2 = line.substring(12).split(" ");
        } else {
          parts2 = line.substring(10).split(" ");
        }
        var candidate = {
          foundation: parts2[0],
          component: parseInt(parts2[1], 10),
          protocol: parts2[2].toLowerCase(),
          priority: parseInt(parts2[3], 10),
          ip: parts2[4],
          address: parts2[4],
          port: parseInt(parts2[5], 10),
          type: parts2[7]
        };
        for (var i2 = 8; i2 < parts2.length; i2 += 2) {
          switch (parts2[i2]) {
            case "raddr":
              candidate.relatedAddress = parts2[i2 + 1];
              break;
            case "rport":
              candidate.relatedPort = parseInt(parts2[i2 + 1], 10);
              break;
            case "tcptype":
              candidate.tcpType = parts2[i2 + 1];
              break;
            case "ufrag":
              candidate.ufrag = parts2[i2 + 1];
              candidate.usernameFragment = parts2[i2 + 1];
              break;
            default:
              candidate[parts2[i2]] = parts2[i2 + 1];
              break;
          }
        }
        return candidate;
      };
      SDPUtils2.writeCandidate = function(candidate) {
        var sdp = [];
        sdp.push(candidate.foundation);
        sdp.push(candidate.component);
        sdp.push(candidate.protocol.toUpperCase());
        sdp.push(candidate.priority);
        sdp.push(candidate.address || candidate.ip);
        sdp.push(candidate.port);
        var type = candidate.type;
        sdp.push("typ");
        sdp.push(type);
        if (type !== "host" && candidate.relatedAddress && candidate.relatedPort) {
          sdp.push("raddr");
          sdp.push(candidate.relatedAddress);
          sdp.push("rport");
          sdp.push(candidate.relatedPort);
        }
        if (candidate.tcpType && candidate.protocol.toLowerCase() === "tcp") {
          sdp.push("tcptype");
          sdp.push(candidate.tcpType);
        }
        if (candidate.usernameFragment || candidate.ufrag) {
          sdp.push("ufrag");
          sdp.push(candidate.usernameFragment || candidate.ufrag);
        }
        return "candidate:" + sdp.join(" ");
      };
      SDPUtils2.parseIceOptions = function(line) {
        return line.substr(14).split(" ");
      };
      SDPUtils2.parseRtpMap = function(line) {
        var parts2 = line.substr(9).split(" ");
        var parsed = {
          payloadType: parseInt(parts2.shift(), 10)
        };
        parts2 = parts2[0].split("/");
        parsed.name = parts2[0];
        parsed.clockRate = parseInt(parts2[1], 10);
        parsed.channels = parts2.length === 3 ? parseInt(parts2[2], 10) : 1;
        parsed.numChannels = parsed.channels;
        return parsed;
      };
      SDPUtils2.writeRtpMap = function(codec) {
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== void 0) {
          pt = codec.preferredPayloadType;
        }
        var channels = codec.channels || codec.numChannels || 1;
        return "a=rtpmap:" + pt + " " + codec.name + "/" + codec.clockRate + (channels !== 1 ? "/" + channels : "") + "\r\n";
      };
      SDPUtils2.parseExtmap = function(line) {
        var parts2 = line.substr(9).split(" ");
        return {
          id: parseInt(parts2[0], 10),
          direction: parts2[0].indexOf("/") > 0 ? parts2[0].split("/")[1] : "sendrecv",
          uri: parts2[1]
        };
      };
      SDPUtils2.writeExtmap = function(headerExtension) {
        return "a=extmap:" + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== "sendrecv" ? "/" + headerExtension.direction : "") + " " + headerExtension.uri + "\r\n";
      };
      SDPUtils2.parseFmtp = function(line) {
        var parsed = {};
        var kv;
        var parts2 = line.substr(line.indexOf(" ") + 1).split(";");
        for (var j = 0; j < parts2.length; j++) {
          kv = parts2[j].trim().split("=");
          parsed[kv[0].trim()] = kv[1];
        }
        return parsed;
      };
      SDPUtils2.writeFmtp = function(codec) {
        var line = "";
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== void 0) {
          pt = codec.preferredPayloadType;
        }
        if (codec.parameters && Object.keys(codec.parameters).length) {
          var params = [];
          Object.keys(codec.parameters).forEach(function(param) {
            if (codec.parameters[param]) {
              params.push(param + "=" + codec.parameters[param]);
            } else {
              params.push(param);
            }
          });
          line += "a=fmtp:" + pt + " " + params.join(";") + "\r\n";
        }
        return line;
      };
      SDPUtils2.parseRtcpFb = function(line) {
        var parts2 = line.substr(line.indexOf(" ") + 1).split(" ");
        return {
          type: parts2.shift(),
          parameter: parts2.join(" ")
        };
      };
      SDPUtils2.writeRtcpFb = function(codec) {
        var lines = "";
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== void 0) {
          pt = codec.preferredPayloadType;
        }
        if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
          codec.rtcpFeedback.forEach(function(fb) {
            lines += "a=rtcp-fb:" + pt + " " + fb.type + (fb.parameter && fb.parameter.length ? " " + fb.parameter : "") + "\r\n";
          });
        }
        return lines;
      };
      SDPUtils2.parseSsrcMedia = function(line) {
        var sp = line.indexOf(" ");
        var parts2 = {
          ssrc: parseInt(line.substr(7, sp - 7), 10)
        };
        var colon = line.indexOf(":", sp);
        if (colon > -1) {
          parts2.attribute = line.substr(sp + 1, colon - sp - 1);
          parts2.value = line.substr(colon + 1);
        } else {
          parts2.attribute = line.substr(sp + 1);
        }
        return parts2;
      };
      SDPUtils2.parseSsrcGroup = function(line) {
        var parts2 = line.substr(13).split(" ");
        return {
          semantics: parts2.shift(),
          ssrcs: parts2.map(function(ssrc) {
            return parseInt(ssrc, 10);
          })
        };
      };
      SDPUtils2.getMid = function(mediaSection) {
        var mid = SDPUtils2.matchPrefix(mediaSection, "a=mid:")[0];
        if (mid) {
          return mid.substr(6);
        }
      };
      SDPUtils2.parseFingerprint = function(line) {
        var parts2 = line.substr(14).split(" ");
        return {
          algorithm: parts2[0].toLowerCase(),
          value: parts2[1]
        };
      };
      SDPUtils2.getDtlsParameters = function(mediaSection, sessionpart) {
        var lines = SDPUtils2.matchPrefix(
          mediaSection + sessionpart,
          "a=fingerprint:"
        );
        return {
          role: "auto",
          fingerprints: lines.map(SDPUtils2.parseFingerprint)
        };
      };
      SDPUtils2.writeDtlsParameters = function(params, setupType) {
        var sdp = "a=setup:" + setupType + "\r\n";
        params.fingerprints.forEach(function(fp) {
          sdp += "a=fingerprint:" + fp.algorithm + " " + fp.value + "\r\n";
        });
        return sdp;
      };
      SDPUtils2.parseCryptoLine = function(line) {
        var parts2 = line.substr(9).split(" ");
        return {
          tag: parseInt(parts2[0], 10),
          cryptoSuite: parts2[1],
          keyParams: parts2[2],
          sessionParams: parts2.slice(3)
        };
      };
      SDPUtils2.writeCryptoLine = function(parameters) {
        return "a=crypto:" + parameters.tag + " " + parameters.cryptoSuite + " " + (typeof parameters.keyParams === "object" ? SDPUtils2.writeCryptoKeyParams(parameters.keyParams) : parameters.keyParams) + (parameters.sessionParams ? " " + parameters.sessionParams.join(" ") : "") + "\r\n";
      };
      SDPUtils2.parseCryptoKeyParams = function(keyParams) {
        if (keyParams.indexOf("inline:") !== 0) {
          return null;
        }
        var parts2 = keyParams.substr(7).split("|");
        return {
          keyMethod: "inline",
          keySalt: parts2[0],
          lifeTime: parts2[1],
          mkiValue: parts2[2] ? parts2[2].split(":")[0] : void 0,
          mkiLength: parts2[2] ? parts2[2].split(":")[1] : void 0
        };
      };
      SDPUtils2.writeCryptoKeyParams = function(keyParams) {
        return keyParams.keyMethod + ":" + keyParams.keySalt + (keyParams.lifeTime ? "|" + keyParams.lifeTime : "") + (keyParams.mkiValue && keyParams.mkiLength ? "|" + keyParams.mkiValue + ":" + keyParams.mkiLength : "");
      };
      SDPUtils2.getCryptoParameters = function(mediaSection, sessionpart) {
        var lines = SDPUtils2.matchPrefix(
          mediaSection + sessionpart,
          "a=crypto:"
        );
        return lines.map(SDPUtils2.parseCryptoLine);
      };
      SDPUtils2.getIceParameters = function(mediaSection, sessionpart) {
        var ufrag = SDPUtils2.matchPrefix(
          mediaSection + sessionpart,
          "a=ice-ufrag:"
        )[0];
        var pwd = SDPUtils2.matchPrefix(
          mediaSection + sessionpart,
          "a=ice-pwd:"
        )[0];
        if (!(ufrag && pwd)) {
          return null;
        }
        return {
          usernameFragment: ufrag.substr(12),
          password: pwd.substr(10)
        };
      };
      SDPUtils2.writeIceParameters = function(params) {
        return "a=ice-ufrag:" + params.usernameFragment + "\r\na=ice-pwd:" + params.password + "\r\n";
      };
      SDPUtils2.parseRtpParameters = function(mediaSection) {
        var description = {
          codecs: [],
          headerExtensions: [],
          fecMechanisms: [],
          rtcp: []
        };
        var lines = SDPUtils2.splitLines(mediaSection);
        var mline = lines[0].split(" ");
        for (var i2 = 3; i2 < mline.length; i2++) {
          var pt = mline[i2];
          var rtpmapline = SDPUtils2.matchPrefix(
            mediaSection,
            "a=rtpmap:" + pt + " "
          )[0];
          if (rtpmapline) {
            var codec = SDPUtils2.parseRtpMap(rtpmapline);
            var fmtps = SDPUtils2.matchPrefix(
              mediaSection,
              "a=fmtp:" + pt + " "
            );
            codec.parameters = fmtps.length ? SDPUtils2.parseFmtp(fmtps[0]) : {};
            codec.rtcpFeedback = SDPUtils2.matchPrefix(
              mediaSection,
              "a=rtcp-fb:" + pt + " "
            ).map(SDPUtils2.parseRtcpFb);
            description.codecs.push(codec);
            switch (codec.name.toUpperCase()) {
              case "RED":
              case "ULPFEC":
                description.fecMechanisms.push(codec.name.toUpperCase());
                break;
              default:
                break;
            }
          }
        }
        SDPUtils2.matchPrefix(mediaSection, "a=extmap:").forEach(function(line) {
          description.headerExtensions.push(SDPUtils2.parseExtmap(line));
        });
        return description;
      };
      SDPUtils2.writeRtpDescription = function(kind, caps) {
        var sdp = "";
        sdp += "m=" + kind + " ";
        sdp += caps.codecs.length > 0 ? "9" : "0";
        sdp += " UDP/TLS/RTP/SAVPF ";
        sdp += caps.codecs.map(function(codec) {
          if (codec.preferredPayloadType !== void 0) {
            return codec.preferredPayloadType;
          }
          return codec.payloadType;
        }).join(" ") + "\r\n";
        sdp += "c=IN IP4 0.0.0.0\r\n";
        sdp += "a=rtcp:9 IN IP4 0.0.0.0\r\n";
        caps.codecs.forEach(function(codec) {
          sdp += SDPUtils2.writeRtpMap(codec);
          sdp += SDPUtils2.writeFmtp(codec);
          sdp += SDPUtils2.writeRtcpFb(codec);
        });
        var maxptime = 0;
        caps.codecs.forEach(function(codec) {
          if (codec.maxptime > maxptime) {
            maxptime = codec.maxptime;
          }
        });
        if (maxptime > 0) {
          sdp += "a=maxptime:" + maxptime + "\r\n";
        }
        sdp += "a=rtcp-mux\r\n";
        if (caps.headerExtensions) {
          caps.headerExtensions.forEach(function(extension) {
            sdp += SDPUtils2.writeExtmap(extension);
          });
        }
        return sdp;
      };
      SDPUtils2.parseRtpEncodingParameters = function(mediaSection) {
        var encodingParameters = [];
        var description = SDPUtils2.parseRtpParameters(mediaSection);
        var hasRed = description.fecMechanisms.indexOf("RED") !== -1;
        var hasUlpfec = description.fecMechanisms.indexOf("ULPFEC") !== -1;
        var ssrcs = SDPUtils2.matchPrefix(mediaSection, "a=ssrc:").map(function(line) {
          return SDPUtils2.parseSsrcMedia(line);
        }).filter(function(parts2) {
          return parts2.attribute === "cname";
        });
        var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
        var secondarySsrc;
        var flows = SDPUtils2.matchPrefix(mediaSection, "a=ssrc-group:FID").map(function(line) {
          var parts2 = line.substr(17).split(" ");
          return parts2.map(function(part) {
            return parseInt(part, 10);
          });
        });
        if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
          secondarySsrc = flows[0][1];
        }
        description.codecs.forEach(function(codec) {
          if (codec.name.toUpperCase() === "RTX" && codec.parameters.apt) {
            var encParam = {
              ssrc: primarySsrc,
              codecPayloadType: parseInt(codec.parameters.apt, 10)
            };
            if (primarySsrc && secondarySsrc) {
              encParam.rtx = { ssrc: secondarySsrc };
            }
            encodingParameters.push(encParam);
            if (hasRed) {
              encParam = JSON.parse(JSON.stringify(encParam));
              encParam.fec = {
                ssrc: primarySsrc,
                mechanism: hasUlpfec ? "red+ulpfec" : "red"
              };
              encodingParameters.push(encParam);
            }
          }
        });
        if (encodingParameters.length === 0 && primarySsrc) {
          encodingParameters.push({
            ssrc: primarySsrc
          });
        }
        var bandwidth = SDPUtils2.matchPrefix(mediaSection, "b=");
        if (bandwidth.length) {
          if (bandwidth[0].indexOf("b=TIAS:") === 0) {
            bandwidth = parseInt(bandwidth[0].substr(7), 10);
          } else if (bandwidth[0].indexOf("b=AS:") === 0) {
            bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1e3 * 0.95 - 50 * 40 * 8;
          } else {
            bandwidth = void 0;
          }
          encodingParameters.forEach(function(params) {
            params.maxBitrate = bandwidth;
          });
        }
        return encodingParameters;
      };
      SDPUtils2.parseRtcpParameters = function(mediaSection) {
        var rtcpParameters = {};
        var remoteSsrc = SDPUtils2.matchPrefix(mediaSection, "a=ssrc:").map(function(line) {
          return SDPUtils2.parseSsrcMedia(line);
        }).filter(function(obj) {
          return obj.attribute === "cname";
        })[0];
        if (remoteSsrc) {
          rtcpParameters.cname = remoteSsrc.value;
          rtcpParameters.ssrc = remoteSsrc.ssrc;
        }
        var rsize = SDPUtils2.matchPrefix(mediaSection, "a=rtcp-rsize");
        rtcpParameters.reducedSize = rsize.length > 0;
        rtcpParameters.compound = rsize.length === 0;
        var mux = SDPUtils2.matchPrefix(mediaSection, "a=rtcp-mux");
        rtcpParameters.mux = mux.length > 0;
        return rtcpParameters;
      };
      SDPUtils2.parseMsid = function(mediaSection) {
        var parts2;
        var spec = SDPUtils2.matchPrefix(mediaSection, "a=msid:");
        if (spec.length === 1) {
          parts2 = spec[0].substr(7).split(" ");
          return { stream: parts2[0], track: parts2[1] };
        }
        var planB = SDPUtils2.matchPrefix(mediaSection, "a=ssrc:").map(function(line) {
          return SDPUtils2.parseSsrcMedia(line);
        }).filter(function(msidParts) {
          return msidParts.attribute === "msid";
        });
        if (planB.length > 0) {
          parts2 = planB[0].value.split(" ");
          return { stream: parts2[0], track: parts2[1] };
        }
      };
      SDPUtils2.parseSctpDescription = function(mediaSection) {
        var mline = SDPUtils2.parseMLine(mediaSection);
        var maxSizeLine = SDPUtils2.matchPrefix(mediaSection, "a=max-message-size:");
        var maxMessageSize;
        if (maxSizeLine.length > 0) {
          maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
        }
        if (isNaN(maxMessageSize)) {
          maxMessageSize = 65536;
        }
        var sctpPort = SDPUtils2.matchPrefix(mediaSection, "a=sctp-port:");
        if (sctpPort.length > 0) {
          return {
            port: parseInt(sctpPort[0].substr(12), 10),
            protocol: mline.fmt,
            maxMessageSize
          };
        }
        var sctpMapLines = SDPUtils2.matchPrefix(mediaSection, "a=sctpmap:");
        if (sctpMapLines.length > 0) {
          var parts2 = SDPUtils2.matchPrefix(mediaSection, "a=sctpmap:")[0].substr(10).split(" ");
          return {
            port: parseInt(parts2[0], 10),
            protocol: parts2[1],
            maxMessageSize
          };
        }
      };
      SDPUtils2.writeSctpDescription = function(media, sctp) {
        var output = [];
        if (media.protocol !== "DTLS/SCTP") {
          output = [
            "m=" + media.kind + " 9 " + media.protocol + " " + sctp.protocol + "\r\n",
            "c=IN IP4 0.0.0.0\r\n",
            "a=sctp-port:" + sctp.port + "\r\n"
          ];
        } else {
          output = [
            "m=" + media.kind + " 9 " + media.protocol + " " + sctp.port + "\r\n",
            "c=IN IP4 0.0.0.0\r\n",
            "a=sctpmap:" + sctp.port + " " + sctp.protocol + " 65535\r\n"
          ];
        }
        if (sctp.maxMessageSize !== void 0) {
          output.push("a=max-message-size:" + sctp.maxMessageSize + "\r\n");
        }
        return output.join("");
      };
      SDPUtils2.generateSessionId = function() {
        return Math.random().toString().substr(2, 21);
      };
      SDPUtils2.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
        var sessionId;
        var version = sessVer !== void 0 ? sessVer : 2;
        if (sessId) {
          sessionId = sessId;
        } else {
          sessionId = SDPUtils2.generateSessionId();
        }
        var user = sessUser || "thisisadapterortc";
        return "v=0\r\no=" + user + " " + sessionId + " " + version + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n";
      };
      SDPUtils2.writeMediaSection = function(transceiver, caps, type, stream) {
        var sdp = SDPUtils2.writeRtpDescription(transceiver.kind, caps);
        sdp += SDPUtils2.writeIceParameters(
          transceiver.iceGatherer.getLocalParameters()
        );
        sdp += SDPUtils2.writeDtlsParameters(
          transceiver.dtlsTransport.getLocalParameters(),
          type === "offer" ? "actpass" : "active"
        );
        sdp += "a=mid:" + transceiver.mid + "\r\n";
        if (transceiver.direction) {
          sdp += "a=" + transceiver.direction + "\r\n";
        } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
          sdp += "a=sendrecv\r\n";
        } else if (transceiver.rtpSender) {
          sdp += "a=sendonly\r\n";
        } else if (transceiver.rtpReceiver) {
          sdp += "a=recvonly\r\n";
        } else {
          sdp += "a=inactive\r\n";
        }
        if (transceiver.rtpSender) {
          var msid = "msid:" + stream.id + " " + transceiver.rtpSender.track.id + "\r\n";
          sdp += "a=" + msid;
          sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].ssrc + " " + msid;
          if (transceiver.sendEncodingParameters[0].rtx) {
            sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].rtx.ssrc + " " + msid;
            sdp += "a=ssrc-group:FID " + transceiver.sendEncodingParameters[0].ssrc + " " + transceiver.sendEncodingParameters[0].rtx.ssrc + "\r\n";
          }
        }
        sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].ssrc + " cname:" + SDPUtils2.localCName + "\r\n";
        if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
          sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].rtx.ssrc + " cname:" + SDPUtils2.localCName + "\r\n";
        }
        return sdp;
      };
      SDPUtils2.getDirection = function(mediaSection, sessionpart) {
        var lines = SDPUtils2.splitLines(mediaSection);
        for (var i2 = 0; i2 < lines.length; i2++) {
          switch (lines[i2]) {
            case "a=sendrecv":
            case "a=sendonly":
            case "a=recvonly":
            case "a=inactive":
              return lines[i2].substr(2);
            default:
          }
        }
        if (sessionpart) {
          return SDPUtils2.getDirection(sessionpart);
        }
        return "sendrecv";
      };
      SDPUtils2.getKind = function(mediaSection) {
        var lines = SDPUtils2.splitLines(mediaSection);
        var mline = lines[0].split(" ");
        return mline[0].substr(2);
      };
      SDPUtils2.isRejected = function(mediaSection) {
        return mediaSection.split(" ", 2)[1] === "0";
      };
      SDPUtils2.parseMLine = function(mediaSection) {
        var lines = SDPUtils2.splitLines(mediaSection);
        var parts2 = lines[0].substr(2).split(" ");
        return {
          kind: parts2[0],
          port: parseInt(parts2[1], 10),
          protocol: parts2[2],
          fmt: parts2.slice(3).join(" ")
        };
      };
      SDPUtils2.parseOLine = function(mediaSection) {
        var line = SDPUtils2.matchPrefix(mediaSection, "o=")[0];
        var parts2 = line.substr(2).split(" ");
        return {
          username: parts2[0],
          sessionId: parts2[1],
          sessionVersion: parseInt(parts2[2], 10),
          netType: parts2[3],
          addressType: parts2[4],
          address: parts2[5]
        };
      };
      SDPUtils2.isValidSDP = function(blob) {
        if (typeof blob !== "string" || blob.length === 0) {
          return false;
        }
        var lines = SDPUtils2.splitLines(blob);
        for (var i2 = 0; i2 < lines.length; i2++) {
          if (lines[i2].length < 2 || lines[i2].charAt(1) !== "=") {
            return false;
          }
        }
        return true;
      };
      if (typeof module === "object") {
        module.exports = SDPUtils2;
      }
    }
  });

  // node_modules/rtcpeerconnection-shim/rtcpeerconnection.js
  var require_rtcpeerconnection = __commonJS({
    "node_modules/rtcpeerconnection-shim/rtcpeerconnection.js"(exports, module) {
      "use strict";
      var SDPUtils2 = require_sdp();
      function fixStatsType(stat) {
        return {
          inboundrtp: "inbound-rtp",
          outboundrtp: "outbound-rtp",
          candidatepair: "candidate-pair",
          localcandidate: "local-candidate",
          remotecandidate: "remote-candidate"
        }[stat.type] || stat.type;
      }
      function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
        var sdp = SDPUtils2.writeRtpDescription(transceiver.kind, caps);
        sdp += SDPUtils2.writeIceParameters(
          transceiver.iceGatherer.getLocalParameters()
        );
        sdp += SDPUtils2.writeDtlsParameters(
          transceiver.dtlsTransport.getLocalParameters(),
          type === "offer" ? "actpass" : dtlsRole || "active"
        );
        sdp += "a=mid:" + transceiver.mid + "\r\n";
        if (transceiver.rtpSender && transceiver.rtpReceiver) {
          sdp += "a=sendrecv\r\n";
        } else if (transceiver.rtpSender) {
          sdp += "a=sendonly\r\n";
        } else if (transceiver.rtpReceiver) {
          sdp += "a=recvonly\r\n";
        } else {
          sdp += "a=inactive\r\n";
        }
        if (transceiver.rtpSender) {
          var trackId = transceiver.rtpSender._initialTrackId || transceiver.rtpSender.track.id;
          transceiver.rtpSender._initialTrackId = trackId;
          var msid = "msid:" + (stream ? stream.id : "-") + " " + trackId + "\r\n";
          sdp += "a=" + msid;
          sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].ssrc + " " + msid;
          if (transceiver.sendEncodingParameters[0].rtx) {
            sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].rtx.ssrc + " " + msid;
            sdp += "a=ssrc-group:FID " + transceiver.sendEncodingParameters[0].ssrc + " " + transceiver.sendEncodingParameters[0].rtx.ssrc + "\r\n";
          }
        }
        sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].ssrc + " cname:" + SDPUtils2.localCName + "\r\n";
        if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
          sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].rtx.ssrc + " cname:" + SDPUtils2.localCName + "\r\n";
        }
        return sdp;
      }
      function filterIceServers2(iceServers, edgeVersion) {
        var hasTurn = false;
        iceServers = JSON.parse(JSON.stringify(iceServers));
        return iceServers.filter(function(server) {
          if (server && (server.urls || server.url)) {
            var urls = server.urls || server.url;
            if (server.url && !server.urls) {
              console.warn("RTCIceServer.url is deprecated! Use urls instead.");
            }
            var isString = typeof urls === "string";
            if (isString) {
              urls = [urls];
            }
            urls = urls.filter(function(url2) {
              var validTurn = url2.indexOf("turn:") === 0 && url2.indexOf("transport=udp") !== -1 && url2.indexOf("turn:[") === -1 && !hasTurn;
              if (validTurn) {
                hasTurn = true;
                return true;
              }
              return url2.indexOf("stun:") === 0 && edgeVersion >= 14393 && url2.indexOf("?transport=udp") === -1;
            });
            delete server.url;
            server.urls = isString ? urls[0] : urls;
            return !!urls.length;
          }
        });
      }
      function getCommonCapabilities(localCapabilities, remoteCapabilities) {
        var commonCapabilities = {
          codecs: [],
          headerExtensions: [],
          fecMechanisms: []
        };
        var findCodecByPayloadType = function(pt, codecs) {
          pt = parseInt(pt, 10);
          for (var i2 = 0; i2 < codecs.length; i2++) {
            if (codecs[i2].payloadType === pt || codecs[i2].preferredPayloadType === pt) {
              return codecs[i2];
            }
          }
        };
        var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
          var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
          var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
          return lCodec && rCodec && lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
        };
        localCapabilities.codecs.forEach(function(lCodec) {
          for (var i2 = 0; i2 < remoteCapabilities.codecs.length; i2++) {
            var rCodec = remoteCapabilities.codecs[i2];
            if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate) {
              if (lCodec.name.toLowerCase() === "rtx" && lCodec.parameters && rCodec.parameters.apt) {
                if (!rtxCapabilityMatches(
                  lCodec,
                  rCodec,
                  localCapabilities.codecs,
                  remoteCapabilities.codecs
                )) {
                  continue;
                }
              }
              rCodec = JSON.parse(JSON.stringify(rCodec));
              rCodec.numChannels = Math.min(
                lCodec.numChannels,
                rCodec.numChannels
              );
              commonCapabilities.codecs.push(rCodec);
              rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
                for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                  if (lCodec.rtcpFeedback[j].type === fb.type && lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                    return true;
                  }
                }
                return false;
              });
              break;
            }
          }
        });
        localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
          for (var i2 = 0; i2 < remoteCapabilities.headerExtensions.length; i2++) {
            var rHeaderExtension = remoteCapabilities.headerExtensions[i2];
            if (lHeaderExtension.uri === rHeaderExtension.uri) {
              commonCapabilities.headerExtensions.push(rHeaderExtension);
              break;
            }
          }
        });
        return commonCapabilities;
      }
      function isActionAllowedInSignalingState(action, type, signalingState) {
        return {
          offer: {
            setLocalDescription: ["stable", "have-local-offer"],
            setRemoteDescription: ["stable", "have-remote-offer"]
          },
          answer: {
            setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
            setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
          }
        }[type][action].indexOf(signalingState) !== -1;
      }
      function maybeAddCandidate(iceTransport, candidate) {
        var alreadyAdded = iceTransport.getRemoteCandidates().find(function(remoteCandidate) {
          return candidate.foundation === remoteCandidate.foundation && candidate.ip === remoteCandidate.ip && candidate.port === remoteCandidate.port && candidate.priority === remoteCandidate.priority && candidate.protocol === remoteCandidate.protocol && candidate.type === remoteCandidate.type;
        });
        if (!alreadyAdded) {
          iceTransport.addRemoteCandidate(candidate);
        }
        return !alreadyAdded;
      }
      function makeError(name, description) {
        var e = new Error(description);
        e.name = name;
        e.code = {
          NotSupportedError: 9,
          InvalidStateError: 11,
          InvalidAccessError: 15,
          TypeError: void 0,
          OperationError: void 0
        }[name];
        return e;
      }
      module.exports = function(window2, edgeVersion) {
        function addTrackToStreamAndFireEvent(track, stream) {
          stream.addTrack(track);
          stream.dispatchEvent(new window2.MediaStreamTrackEvent(
            "addtrack",
            { track }
          ));
        }
        function removeTrackFromStreamAndFireEvent(track, stream) {
          stream.removeTrack(track);
          stream.dispatchEvent(new window2.MediaStreamTrackEvent(
            "removetrack",
            { track }
          ));
        }
        function fireAddTrack(pc, track, receiver, streams) {
          var trackEvent = new Event("track");
          trackEvent.track = track;
          trackEvent.receiver = receiver;
          trackEvent.transceiver = { receiver };
          trackEvent.streams = streams;
          window2.setTimeout(function() {
            pc._dispatchEvent("track", trackEvent);
          });
        }
        var RTCPeerConnection2 = function(config) {
          var pc = this;
          var _eventTarget = document.createDocumentFragment();
          ["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(method) {
            pc[method] = _eventTarget[method].bind(_eventTarget);
          });
          this.canTrickleIceCandidates = null;
          this.needNegotiation = false;
          this.localStreams = [];
          this.remoteStreams = [];
          this._localDescription = null;
          this._remoteDescription = null;
          this.signalingState = "stable";
          this.iceConnectionState = "new";
          this.connectionState = "new";
          this.iceGatheringState = "new";
          config = JSON.parse(JSON.stringify(config || {}));
          this.usingBundle = config.bundlePolicy === "max-bundle";
          if (config.rtcpMuxPolicy === "negotiate") {
            throw makeError(
              "NotSupportedError",
              "rtcpMuxPolicy 'negotiate' is not supported"
            );
          } else if (!config.rtcpMuxPolicy) {
            config.rtcpMuxPolicy = "require";
          }
          switch (config.iceTransportPolicy) {
            case "all":
            case "relay":
              break;
            default:
              config.iceTransportPolicy = "all";
              break;
          }
          switch (config.bundlePolicy) {
            case "balanced":
            case "max-compat":
            case "max-bundle":
              break;
            default:
              config.bundlePolicy = "balanced";
              break;
          }
          config.iceServers = filterIceServers2(config.iceServers || [], edgeVersion);
          this._iceGatherers = [];
          if (config.iceCandidatePoolSize) {
            for (var i2 = config.iceCandidatePoolSize; i2 > 0; i2--) {
              this._iceGatherers.push(new window2.RTCIceGatherer({
                iceServers: config.iceServers,
                gatherPolicy: config.iceTransportPolicy
              }));
            }
          } else {
            config.iceCandidatePoolSize = 0;
          }
          this._config = config;
          this.transceivers = [];
          this._sdpSessionId = SDPUtils2.generateSessionId();
          this._sdpSessionVersion = 0;
          this._dtlsRole = void 0;
          this._isClosed = false;
        };
        Object.defineProperty(RTCPeerConnection2.prototype, "localDescription", {
          configurable: true,
          get: function() {
            return this._localDescription;
          }
        });
        Object.defineProperty(RTCPeerConnection2.prototype, "remoteDescription", {
          configurable: true,
          get: function() {
            return this._remoteDescription;
          }
        });
        RTCPeerConnection2.prototype.onicecandidate = null;
        RTCPeerConnection2.prototype.onaddstream = null;
        RTCPeerConnection2.prototype.ontrack = null;
        RTCPeerConnection2.prototype.onremovestream = null;
        RTCPeerConnection2.prototype.onsignalingstatechange = null;
        RTCPeerConnection2.prototype.oniceconnectionstatechange = null;
        RTCPeerConnection2.prototype.onconnectionstatechange = null;
        RTCPeerConnection2.prototype.onicegatheringstatechange = null;
        RTCPeerConnection2.prototype.onnegotiationneeded = null;
        RTCPeerConnection2.prototype.ondatachannel = null;
        RTCPeerConnection2.prototype._dispatchEvent = function(name, event) {
          if (this._isClosed) {
            return;
          }
          this.dispatchEvent(event);
          if (typeof this["on" + name] === "function") {
            this["on" + name](event);
          }
        };
        RTCPeerConnection2.prototype._emitGatheringStateChange = function() {
          var event = new Event("icegatheringstatechange");
          this._dispatchEvent("icegatheringstatechange", event);
        };
        RTCPeerConnection2.prototype.getConfiguration = function() {
          return this._config;
        };
        RTCPeerConnection2.prototype.getLocalStreams = function() {
          return this.localStreams;
        };
        RTCPeerConnection2.prototype.getRemoteStreams = function() {
          return this.remoteStreams;
        };
        RTCPeerConnection2.prototype._createTransceiver = function(kind, doNotAdd) {
          var hasBundleTransport = this.transceivers.length > 0;
          var transceiver = {
            track: null,
            iceGatherer: null,
            iceTransport: null,
            dtlsTransport: null,
            localCapabilities: null,
            remoteCapabilities: null,
            rtpSender: null,
            rtpReceiver: null,
            kind,
            mid: null,
            sendEncodingParameters: null,
            recvEncodingParameters: null,
            stream: null,
            associatedRemoteMediaStreams: [],
            wantReceive: true
          };
          if (this.usingBundle && hasBundleTransport) {
            transceiver.iceTransport = this.transceivers[0].iceTransport;
            transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
          } else {
            var transports2 = this._createIceAndDtlsTransports();
            transceiver.iceTransport = transports2.iceTransport;
            transceiver.dtlsTransport = transports2.dtlsTransport;
          }
          if (!doNotAdd) {
            this.transceivers.push(transceiver);
          }
          return transceiver;
        };
        RTCPeerConnection2.prototype.addTrack = function(track, stream) {
          if (this._isClosed) {
            throw makeError(
              "InvalidStateError",
              "Attempted to call addTrack on a closed peerconnection."
            );
          }
          var alreadyExists = this.transceivers.find(function(s) {
            return s.track === track;
          });
          if (alreadyExists) {
            throw makeError("InvalidAccessError", "Track already exists.");
          }
          var transceiver;
          for (var i2 = 0; i2 < this.transceivers.length; i2++) {
            if (!this.transceivers[i2].track && this.transceivers[i2].kind === track.kind) {
              transceiver = this.transceivers[i2];
            }
          }
          if (!transceiver) {
            transceiver = this._createTransceiver(track.kind);
          }
          this._maybeFireNegotiationNeeded();
          if (this.localStreams.indexOf(stream) === -1) {
            this.localStreams.push(stream);
          }
          transceiver.track = track;
          transceiver.stream = stream;
          transceiver.rtpSender = new window2.RTCRtpSender(
            track,
            transceiver.dtlsTransport
          );
          return transceiver.rtpSender;
        };
        RTCPeerConnection2.prototype.addStream = function(stream) {
          var pc = this;
          if (edgeVersion >= 15025) {
            stream.getTracks().forEach(function(track) {
              pc.addTrack(track, stream);
            });
          } else {
            var clonedStream = stream.clone();
            stream.getTracks().forEach(function(track, idx) {
              var clonedTrack = clonedStream.getTracks()[idx];
              track.addEventListener("enabled", function(event) {
                clonedTrack.enabled = event.enabled;
              });
            });
            clonedStream.getTracks().forEach(function(track) {
              pc.addTrack(track, clonedStream);
            });
          }
        };
        RTCPeerConnection2.prototype.removeTrack = function(sender) {
          if (this._isClosed) {
            throw makeError(
              "InvalidStateError",
              "Attempted to call removeTrack on a closed peerconnection."
            );
          }
          if (!(sender instanceof window2.RTCRtpSender)) {
            throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
          }
          var transceiver = this.transceivers.find(function(t) {
            return t.rtpSender === sender;
          });
          if (!transceiver) {
            throw makeError(
              "InvalidAccessError",
              "Sender was not created by this connection."
            );
          }
          var stream = transceiver.stream;
          transceiver.rtpSender.stop();
          transceiver.rtpSender = null;
          transceiver.track = null;
          transceiver.stream = null;
          var localStreams = this.transceivers.map(function(t) {
            return t.stream;
          });
          if (localStreams.indexOf(stream) === -1 && this.localStreams.indexOf(stream) > -1) {
            this.localStreams.splice(this.localStreams.indexOf(stream), 1);
          }
          this._maybeFireNegotiationNeeded();
        };
        RTCPeerConnection2.prototype.removeStream = function(stream) {
          var pc = this;
          stream.getTracks().forEach(function(track) {
            var sender = pc.getSenders().find(function(s) {
              return s.track === track;
            });
            if (sender) {
              pc.removeTrack(sender);
            }
          });
        };
        RTCPeerConnection2.prototype.getSenders = function() {
          return this.transceivers.filter(function(transceiver) {
            return !!transceiver.rtpSender;
          }).map(function(transceiver) {
            return transceiver.rtpSender;
          });
        };
        RTCPeerConnection2.prototype.getReceivers = function() {
          return this.transceivers.filter(function(transceiver) {
            return !!transceiver.rtpReceiver;
          }).map(function(transceiver) {
            return transceiver.rtpReceiver;
          });
        };
        RTCPeerConnection2.prototype._createIceGatherer = function(sdpMLineIndex, usingBundle) {
          var pc = this;
          if (usingBundle && sdpMLineIndex > 0) {
            return this.transceivers[0].iceGatherer;
          } else if (this._iceGatherers.length) {
            return this._iceGatherers.shift();
          }
          var iceGatherer = new window2.RTCIceGatherer({
            iceServers: this._config.iceServers,
            gatherPolicy: this._config.iceTransportPolicy
          });
          Object.defineProperty(
            iceGatherer,
            "state",
            { value: "new", writable: true }
          );
          this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
          this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
            var end = !event.candidate || Object.keys(event.candidate).length === 0;
            iceGatherer.state = end ? "completed" : "gathering";
            if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
              pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
            }
          };
          iceGatherer.addEventListener(
            "localcandidate",
            this.transceivers[sdpMLineIndex].bufferCandidates
          );
          return iceGatherer;
        };
        RTCPeerConnection2.prototype._gather = function(mid, sdpMLineIndex) {
          var pc = this;
          var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
          if (iceGatherer.onlocalcandidate) {
            return;
          }
          var bufferedCandidateEvents = this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
          this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
          iceGatherer.removeEventListener(
            "localcandidate",
            this.transceivers[sdpMLineIndex].bufferCandidates
          );
          iceGatherer.onlocalcandidate = function(evt) {
            if (pc.usingBundle && sdpMLineIndex > 0) {
              return;
            }
            var event = new Event("icecandidate");
            event.candidate = { sdpMid: mid, sdpMLineIndex };
            var cand = evt.candidate;
            var end = !cand || Object.keys(cand).length === 0;
            if (end) {
              if (iceGatherer.state === "new" || iceGatherer.state === "gathering") {
                iceGatherer.state = "completed";
              }
            } else {
              if (iceGatherer.state === "new") {
                iceGatherer.state = "gathering";
              }
              cand.component = 1;
              cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;
              var serializedCandidate = SDPUtils2.writeCandidate(cand);
              event.candidate = Object.assign(
                event.candidate,
                SDPUtils2.parseCandidate(serializedCandidate)
              );
              event.candidate.candidate = serializedCandidate;
              event.candidate.toJSON = function() {
                return {
                  candidate: event.candidate.candidate,
                  sdpMid: event.candidate.sdpMid,
                  sdpMLineIndex: event.candidate.sdpMLineIndex,
                  usernameFragment: event.candidate.usernameFragment
                };
              };
            }
            var sections = SDPUtils2.getMediaSections(pc._localDescription.sdp);
            if (!end) {
              sections[event.candidate.sdpMLineIndex] += "a=" + event.candidate.candidate + "\r\n";
            } else {
              sections[event.candidate.sdpMLineIndex] += "a=end-of-candidates\r\n";
            }
            pc._localDescription.sdp = SDPUtils2.getDescription(pc._localDescription.sdp) + sections.join("");
            var complete = pc.transceivers.every(function(transceiver) {
              return transceiver.iceGatherer && transceiver.iceGatherer.state === "completed";
            });
            if (pc.iceGatheringState !== "gathering") {
              pc.iceGatheringState = "gathering";
              pc._emitGatheringStateChange();
            }
            if (!end) {
              pc._dispatchEvent("icecandidate", event);
            }
            if (complete) {
              pc._dispatchEvent("icecandidate", new Event("icecandidate"));
              pc.iceGatheringState = "complete";
              pc._emitGatheringStateChange();
            }
          };
          window2.setTimeout(function() {
            bufferedCandidateEvents.forEach(function(e) {
              iceGatherer.onlocalcandidate(e);
            });
          }, 0);
        };
        RTCPeerConnection2.prototype._createIceAndDtlsTransports = function() {
          var pc = this;
          var iceTransport = new window2.RTCIceTransport(null);
          iceTransport.onicestatechange = function() {
            pc._updateIceConnectionState();
            pc._updateConnectionState();
          };
          var dtlsTransport = new window2.RTCDtlsTransport(iceTransport);
          dtlsTransport.ondtlsstatechange = function() {
            pc._updateConnectionState();
          };
          dtlsTransport.onerror = function() {
            Object.defineProperty(
              dtlsTransport,
              "state",
              { value: "failed", writable: true }
            );
            pc._updateConnectionState();
          };
          return {
            iceTransport,
            dtlsTransport
          };
        };
        RTCPeerConnection2.prototype._disposeIceAndDtlsTransports = function(sdpMLineIndex) {
          var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
          if (iceGatherer) {
            delete iceGatherer.onlocalcandidate;
            delete this.transceivers[sdpMLineIndex].iceGatherer;
          }
          var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
          if (iceTransport) {
            delete iceTransport.onicestatechange;
            delete this.transceivers[sdpMLineIndex].iceTransport;
          }
          var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
          if (dtlsTransport) {
            delete dtlsTransport.ondtlsstatechange;
            delete dtlsTransport.onerror;
            delete this.transceivers[sdpMLineIndex].dtlsTransport;
          }
        };
        RTCPeerConnection2.prototype._transceive = function(transceiver, send, recv) {
          var params = getCommonCapabilities(
            transceiver.localCapabilities,
            transceiver.remoteCapabilities
          );
          if (send && transceiver.rtpSender) {
            params.encodings = transceiver.sendEncodingParameters;
            params.rtcp = {
              cname: SDPUtils2.localCName,
              compound: transceiver.rtcpParameters.compound
            };
            if (transceiver.recvEncodingParameters.length) {
              params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
            }
            transceiver.rtpSender.send(params);
          }
          if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
            if (transceiver.kind === "video" && transceiver.recvEncodingParameters && edgeVersion < 15019) {
              transceiver.recvEncodingParameters.forEach(function(p) {
                delete p.rtx;
              });
            }
            if (transceiver.recvEncodingParameters.length) {
              params.encodings = transceiver.recvEncodingParameters;
            } else {
              params.encodings = [{}];
            }
            params.rtcp = {
              compound: transceiver.rtcpParameters.compound
            };
            if (transceiver.rtcpParameters.cname) {
              params.rtcp.cname = transceiver.rtcpParameters.cname;
            }
            if (transceiver.sendEncodingParameters.length) {
              params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
            }
            transceiver.rtpReceiver.receive(params);
          }
        };
        RTCPeerConnection2.prototype.setLocalDescription = function(description) {
          var pc = this;
          if (["offer", "answer"].indexOf(description.type) === -1) {
            return Promise.reject(makeError(
              "TypeError",
              'Unsupported type "' + description.type + '"'
            ));
          }
          if (!isActionAllowedInSignalingState(
            "setLocalDescription",
            description.type,
            pc.signalingState
          ) || pc._isClosed) {
            return Promise.reject(makeError(
              "InvalidStateError",
              "Can not set local " + description.type + " in state " + pc.signalingState
            ));
          }
          var sections;
          var sessionpart;
          if (description.type === "offer") {
            sections = SDPUtils2.splitSections(description.sdp);
            sessionpart = sections.shift();
            sections.forEach(function(mediaSection, sdpMLineIndex) {
              var caps = SDPUtils2.parseRtpParameters(mediaSection);
              pc.transceivers[sdpMLineIndex].localCapabilities = caps;
            });
            pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
              pc._gather(transceiver.mid, sdpMLineIndex);
            });
          } else if (description.type === "answer") {
            sections = SDPUtils2.splitSections(pc._remoteDescription.sdp);
            sessionpart = sections.shift();
            var isIceLite = SDPUtils2.matchPrefix(
              sessionpart,
              "a=ice-lite"
            ).length > 0;
            sections.forEach(function(mediaSection, sdpMLineIndex) {
              var transceiver = pc.transceivers[sdpMLineIndex];
              var iceGatherer = transceiver.iceGatherer;
              var iceTransport = transceiver.iceTransport;
              var dtlsTransport = transceiver.dtlsTransport;
              var localCapabilities = transceiver.localCapabilities;
              var remoteCapabilities = transceiver.remoteCapabilities;
              var rejected = SDPUtils2.isRejected(mediaSection) && SDPUtils2.matchPrefix(mediaSection, "a=bundle-only").length === 0;
              if (!rejected && !transceiver.rejected) {
                var remoteIceParameters = SDPUtils2.getIceParameters(
                  mediaSection,
                  sessionpart
                );
                var remoteDtlsParameters = SDPUtils2.getDtlsParameters(
                  mediaSection,
                  sessionpart
                );
                if (isIceLite) {
                  remoteDtlsParameters.role = "server";
                }
                if (!pc.usingBundle || sdpMLineIndex === 0) {
                  pc._gather(transceiver.mid, sdpMLineIndex);
                  if (iceTransport.state === "new") {
                    iceTransport.start(
                      iceGatherer,
                      remoteIceParameters,
                      isIceLite ? "controlling" : "controlled"
                    );
                  }
                  if (dtlsTransport.state === "new") {
                    dtlsTransport.start(remoteDtlsParameters);
                  }
                }
                var params = getCommonCapabilities(
                  localCapabilities,
                  remoteCapabilities
                );
                pc._transceive(
                  transceiver,
                  params.codecs.length > 0,
                  false
                );
              }
            });
          }
          pc._localDescription = {
            type: description.type,
            sdp: description.sdp
          };
          if (description.type === "offer") {
            pc._updateSignalingState("have-local-offer");
          } else {
            pc._updateSignalingState("stable");
          }
          return Promise.resolve();
        };
        RTCPeerConnection2.prototype.setRemoteDescription = function(description) {
          var pc = this;
          if (["offer", "answer"].indexOf(description.type) === -1) {
            return Promise.reject(makeError(
              "TypeError",
              'Unsupported type "' + description.type + '"'
            ));
          }
          if (!isActionAllowedInSignalingState(
            "setRemoteDescription",
            description.type,
            pc.signalingState
          ) || pc._isClosed) {
            return Promise.reject(makeError(
              "InvalidStateError",
              "Can not set remote " + description.type + " in state " + pc.signalingState
            ));
          }
          var streams = {};
          pc.remoteStreams.forEach(function(stream) {
            streams[stream.id] = stream;
          });
          var receiverList = [];
          var sections = SDPUtils2.splitSections(description.sdp);
          var sessionpart = sections.shift();
          var isIceLite = SDPUtils2.matchPrefix(
            sessionpart,
            "a=ice-lite"
          ).length > 0;
          var usingBundle = SDPUtils2.matchPrefix(
            sessionpart,
            "a=group:BUNDLE "
          ).length > 0;
          pc.usingBundle = usingBundle;
          var iceOptions = SDPUtils2.matchPrefix(
            sessionpart,
            "a=ice-options:"
          )[0];
          if (iceOptions) {
            pc.canTrickleIceCandidates = iceOptions.substr(14).split(" ").indexOf("trickle") >= 0;
          } else {
            pc.canTrickleIceCandidates = false;
          }
          sections.forEach(function(mediaSection, sdpMLineIndex) {
            var lines = SDPUtils2.splitLines(mediaSection);
            var kind = SDPUtils2.getKind(mediaSection);
            var rejected = SDPUtils2.isRejected(mediaSection) && SDPUtils2.matchPrefix(mediaSection, "a=bundle-only").length === 0;
            var protocol4 = lines[0].substr(2).split(" ")[2];
            var direction = SDPUtils2.getDirection(mediaSection, sessionpart);
            var remoteMsid = SDPUtils2.parseMsid(mediaSection);
            var mid = SDPUtils2.getMid(mediaSection) || SDPUtils2.generateIdentifier();
            if (rejected || kind === "application" && (protocol4 === "DTLS/SCTP" || protocol4 === "UDP/DTLS/SCTP")) {
              pc.transceivers[sdpMLineIndex] = {
                mid,
                kind,
                protocol: protocol4,
                rejected: true
              };
              return;
            }
            if (!rejected && pc.transceivers[sdpMLineIndex] && pc.transceivers[sdpMLineIndex].rejected) {
              pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
            }
            var transceiver;
            var iceGatherer;
            var iceTransport;
            var dtlsTransport;
            var rtpReceiver;
            var sendEncodingParameters;
            var recvEncodingParameters;
            var localCapabilities;
            var track;
            var remoteCapabilities = SDPUtils2.parseRtpParameters(mediaSection);
            var remoteIceParameters;
            var remoteDtlsParameters;
            if (!rejected) {
              remoteIceParameters = SDPUtils2.getIceParameters(
                mediaSection,
                sessionpart
              );
              remoteDtlsParameters = SDPUtils2.getDtlsParameters(
                mediaSection,
                sessionpart
              );
              remoteDtlsParameters.role = "client";
            }
            recvEncodingParameters = SDPUtils2.parseRtpEncodingParameters(mediaSection);
            var rtcpParameters = SDPUtils2.parseRtcpParameters(mediaSection);
            var isComplete = SDPUtils2.matchPrefix(
              mediaSection,
              "a=end-of-candidates",
              sessionpart
            ).length > 0;
            var cands = SDPUtils2.matchPrefix(mediaSection, "a=candidate:").map(function(cand) {
              return SDPUtils2.parseCandidate(cand);
            }).filter(function(cand) {
              return cand.component === 1;
            });
            if ((description.type === "offer" || description.type === "answer") && !rejected && usingBundle && sdpMLineIndex > 0 && pc.transceivers[sdpMLineIndex]) {
              pc._disposeIceAndDtlsTransports(sdpMLineIndex);
              pc.transceivers[sdpMLineIndex].iceGatherer = pc.transceivers[0].iceGatherer;
              pc.transceivers[sdpMLineIndex].iceTransport = pc.transceivers[0].iceTransport;
              pc.transceivers[sdpMLineIndex].dtlsTransport = pc.transceivers[0].dtlsTransport;
              if (pc.transceivers[sdpMLineIndex].rtpSender) {
                pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
                  pc.transceivers[0].dtlsTransport
                );
              }
              if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
                pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
                  pc.transceivers[0].dtlsTransport
                );
              }
            }
            if (description.type === "offer" && !rejected) {
              transceiver = pc.transceivers[sdpMLineIndex] || pc._createTransceiver(kind);
              transceiver.mid = mid;
              if (!transceiver.iceGatherer) {
                transceiver.iceGatherer = pc._createIceGatherer(
                  sdpMLineIndex,
                  usingBundle
                );
              }
              if (cands.length && transceiver.iceTransport.state === "new") {
                if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
                  transceiver.iceTransport.setRemoteCandidates(cands);
                } else {
                  cands.forEach(function(candidate) {
                    maybeAddCandidate(transceiver.iceTransport, candidate);
                  });
                }
              }
              localCapabilities = window2.RTCRtpReceiver.getCapabilities(kind);
              if (edgeVersion < 15019) {
                localCapabilities.codecs = localCapabilities.codecs.filter(
                  function(codec) {
                    return codec.name !== "rtx";
                  }
                );
              }
              sendEncodingParameters = transceiver.sendEncodingParameters || [{
                ssrc: (2 * sdpMLineIndex + 2) * 1001
              }];
              var isNewTrack = false;
              if (direction === "sendrecv" || direction === "sendonly") {
                isNewTrack = !transceiver.rtpReceiver;
                rtpReceiver = transceiver.rtpReceiver || new window2.RTCRtpReceiver(transceiver.dtlsTransport, kind);
                if (isNewTrack) {
                  var stream;
                  track = rtpReceiver.track;
                  if (remoteMsid && remoteMsid.stream === "-") {
                  } else if (remoteMsid) {
                    if (!streams[remoteMsid.stream]) {
                      streams[remoteMsid.stream] = new window2.MediaStream();
                      Object.defineProperty(streams[remoteMsid.stream], "id", {
                        get: function() {
                          return remoteMsid.stream;
                        }
                      });
                    }
                    Object.defineProperty(track, "id", {
                      get: function() {
                        return remoteMsid.track;
                      }
                    });
                    stream = streams[remoteMsid.stream];
                  } else {
                    if (!streams.default) {
                      streams.default = new window2.MediaStream();
                    }
                    stream = streams.default;
                  }
                  if (stream) {
                    addTrackToStreamAndFireEvent(track, stream);
                    transceiver.associatedRemoteMediaStreams.push(stream);
                  }
                  receiverList.push([track, rtpReceiver, stream]);
                }
              } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
                transceiver.associatedRemoteMediaStreams.forEach(function(s) {
                  var nativeTrack = s.getTracks().find(function(t) {
                    return t.id === transceiver.rtpReceiver.track.id;
                  });
                  if (nativeTrack) {
                    removeTrackFromStreamAndFireEvent(nativeTrack, s);
                  }
                });
                transceiver.associatedRemoteMediaStreams = [];
              }
              transceiver.localCapabilities = localCapabilities;
              transceiver.remoteCapabilities = remoteCapabilities;
              transceiver.rtpReceiver = rtpReceiver;
              transceiver.rtcpParameters = rtcpParameters;
              transceiver.sendEncodingParameters = sendEncodingParameters;
              transceiver.recvEncodingParameters = recvEncodingParameters;
              pc._transceive(
                pc.transceivers[sdpMLineIndex],
                false,
                isNewTrack
              );
            } else if (description.type === "answer" && !rejected) {
              transceiver = pc.transceivers[sdpMLineIndex];
              iceGatherer = transceiver.iceGatherer;
              iceTransport = transceiver.iceTransport;
              dtlsTransport = transceiver.dtlsTransport;
              rtpReceiver = transceiver.rtpReceiver;
              sendEncodingParameters = transceiver.sendEncodingParameters;
              localCapabilities = transceiver.localCapabilities;
              pc.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
              pc.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
              pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;
              if (cands.length && iceTransport.state === "new") {
                if ((isIceLite || isComplete) && (!usingBundle || sdpMLineIndex === 0)) {
                  iceTransport.setRemoteCandidates(cands);
                } else {
                  cands.forEach(function(candidate) {
                    maybeAddCandidate(transceiver.iceTransport, candidate);
                  });
                }
              }
              if (!usingBundle || sdpMLineIndex === 0) {
                if (iceTransport.state === "new") {
                  iceTransport.start(
                    iceGatherer,
                    remoteIceParameters,
                    "controlling"
                  );
                }
                if (dtlsTransport.state === "new") {
                  dtlsTransport.start(remoteDtlsParameters);
                }
              }
              var commonCapabilities = getCommonCapabilities(
                transceiver.localCapabilities,
                transceiver.remoteCapabilities
              );
              var hasRtx = commonCapabilities.codecs.filter(function(c) {
                return c.name.toLowerCase() === "rtx";
              }).length;
              if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                delete transceiver.sendEncodingParameters[0].rtx;
              }
              pc._transceive(
                transceiver,
                direction === "sendrecv" || direction === "recvonly",
                direction === "sendrecv" || direction === "sendonly"
              );
              if (rtpReceiver && (direction === "sendrecv" || direction === "sendonly")) {
                track = rtpReceiver.track;
                if (remoteMsid) {
                  if (!streams[remoteMsid.stream]) {
                    streams[remoteMsid.stream] = new window2.MediaStream();
                  }
                  addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                  receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
                } else {
                  if (!streams.default) {
                    streams.default = new window2.MediaStream();
                  }
                  addTrackToStreamAndFireEvent(track, streams.default);
                  receiverList.push([track, rtpReceiver, streams.default]);
                }
              } else {
                delete transceiver.rtpReceiver;
              }
            }
          });
          if (pc._dtlsRole === void 0) {
            pc._dtlsRole = description.type === "offer" ? "active" : "passive";
          }
          pc._remoteDescription = {
            type: description.type,
            sdp: description.sdp
          };
          if (description.type === "offer") {
            pc._updateSignalingState("have-remote-offer");
          } else {
            pc._updateSignalingState("stable");
          }
          Object.keys(streams).forEach(function(sid) {
            var stream = streams[sid];
            if (stream.getTracks().length) {
              if (pc.remoteStreams.indexOf(stream) === -1) {
                pc.remoteStreams.push(stream);
                var event = new Event("addstream");
                event.stream = stream;
                window2.setTimeout(function() {
                  pc._dispatchEvent("addstream", event);
                });
              }
              receiverList.forEach(function(item) {
                var track = item[0];
                var receiver = item[1];
                if (stream.id !== item[2].id) {
                  return;
                }
                fireAddTrack(pc, track, receiver, [stream]);
              });
            }
          });
          receiverList.forEach(function(item) {
            if (item[2]) {
              return;
            }
            fireAddTrack(pc, item[0], item[1], []);
          });
          window2.setTimeout(function() {
            if (!(pc && pc.transceivers)) {
              return;
            }
            pc.transceivers.forEach(function(transceiver) {
              if (transceiver.iceTransport && transceiver.iceTransport.state === "new" && transceiver.iceTransport.getRemoteCandidates().length > 0) {
                console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification");
                transceiver.iceTransport.addRemoteCandidate({});
              }
            });
          }, 4e3);
          return Promise.resolve();
        };
        RTCPeerConnection2.prototype.close = function() {
          this.transceivers.forEach(function(transceiver) {
            if (transceiver.iceTransport) {
              transceiver.iceTransport.stop();
            }
            if (transceiver.dtlsTransport) {
              transceiver.dtlsTransport.stop();
            }
            if (transceiver.rtpSender) {
              transceiver.rtpSender.stop();
            }
            if (transceiver.rtpReceiver) {
              transceiver.rtpReceiver.stop();
            }
          });
          this._isClosed = true;
          this._updateSignalingState("closed");
        };
        RTCPeerConnection2.prototype._updateSignalingState = function(newState) {
          this.signalingState = newState;
          var event = new Event("signalingstatechange");
          this._dispatchEvent("signalingstatechange", event);
        };
        RTCPeerConnection2.prototype._maybeFireNegotiationNeeded = function() {
          var pc = this;
          if (this.signalingState !== "stable" || this.needNegotiation === true) {
            return;
          }
          this.needNegotiation = true;
          window2.setTimeout(function() {
            if (pc.needNegotiation) {
              pc.needNegotiation = false;
              var event = new Event("negotiationneeded");
              pc._dispatchEvent("negotiationneeded", event);
            }
          }, 0);
        };
        RTCPeerConnection2.prototype._updateIceConnectionState = function() {
          var newState;
          var states = {
            "new": 0,
            closed: 0,
            checking: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0
          };
          this.transceivers.forEach(function(transceiver) {
            if (transceiver.iceTransport && !transceiver.rejected) {
              states[transceiver.iceTransport.state]++;
            }
          });
          newState = "new";
          if (states.failed > 0) {
            newState = "failed";
          } else if (states.checking > 0) {
            newState = "checking";
          } else if (states.disconnected > 0) {
            newState = "disconnected";
          } else if (states.new > 0) {
            newState = "new";
          } else if (states.connected > 0) {
            newState = "connected";
          } else if (states.completed > 0) {
            newState = "completed";
          }
          if (newState !== this.iceConnectionState) {
            this.iceConnectionState = newState;
            var event = new Event("iceconnectionstatechange");
            this._dispatchEvent("iceconnectionstatechange", event);
          }
        };
        RTCPeerConnection2.prototype._updateConnectionState = function() {
          var newState;
          var states = {
            "new": 0,
            closed: 0,
            connecting: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0
          };
          this.transceivers.forEach(function(transceiver) {
            if (transceiver.iceTransport && transceiver.dtlsTransport && !transceiver.rejected) {
              states[transceiver.iceTransport.state]++;
              states[transceiver.dtlsTransport.state]++;
            }
          });
          states.connected += states.completed;
          newState = "new";
          if (states.failed > 0) {
            newState = "failed";
          } else if (states.connecting > 0) {
            newState = "connecting";
          } else if (states.disconnected > 0) {
            newState = "disconnected";
          } else if (states.new > 0) {
            newState = "new";
          } else if (states.connected > 0) {
            newState = "connected";
          }
          if (newState !== this.connectionState) {
            this.connectionState = newState;
            var event = new Event("connectionstatechange");
            this._dispatchEvent("connectionstatechange", event);
          }
        };
        RTCPeerConnection2.prototype.createOffer = function() {
          var pc = this;
          if (pc._isClosed) {
            return Promise.reject(makeError(
              "InvalidStateError",
              "Can not call createOffer after close"
            ));
          }
          var numAudioTracks = pc.transceivers.filter(function(t) {
            return t.kind === "audio";
          }).length;
          var numVideoTracks = pc.transceivers.filter(function(t) {
            return t.kind === "video";
          }).length;
          var offerOptions = arguments[0];
          if (offerOptions) {
            if (offerOptions.mandatory || offerOptions.optional) {
              throw new TypeError(
                "Legacy mandatory/optional constraints not supported."
              );
            }
            if (offerOptions.offerToReceiveAudio !== void 0) {
              if (offerOptions.offerToReceiveAudio === true) {
                numAudioTracks = 1;
              } else if (offerOptions.offerToReceiveAudio === false) {
                numAudioTracks = 0;
              } else {
                numAudioTracks = offerOptions.offerToReceiveAudio;
              }
            }
            if (offerOptions.offerToReceiveVideo !== void 0) {
              if (offerOptions.offerToReceiveVideo === true) {
                numVideoTracks = 1;
              } else if (offerOptions.offerToReceiveVideo === false) {
                numVideoTracks = 0;
              } else {
                numVideoTracks = offerOptions.offerToReceiveVideo;
              }
            }
          }
          pc.transceivers.forEach(function(transceiver) {
            if (transceiver.kind === "audio") {
              numAudioTracks--;
              if (numAudioTracks < 0) {
                transceiver.wantReceive = false;
              }
            } else if (transceiver.kind === "video") {
              numVideoTracks--;
              if (numVideoTracks < 0) {
                transceiver.wantReceive = false;
              }
            }
          });
          while (numAudioTracks > 0 || numVideoTracks > 0) {
            if (numAudioTracks > 0) {
              pc._createTransceiver("audio");
              numAudioTracks--;
            }
            if (numVideoTracks > 0) {
              pc._createTransceiver("video");
              numVideoTracks--;
            }
          }
          var sdp = SDPUtils2.writeSessionBoilerplate(
            pc._sdpSessionId,
            pc._sdpSessionVersion++
          );
          pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
            var track = transceiver.track;
            var kind = transceiver.kind;
            var mid = transceiver.mid || SDPUtils2.generateIdentifier();
            transceiver.mid = mid;
            if (!transceiver.iceGatherer) {
              transceiver.iceGatherer = pc._createIceGatherer(
                sdpMLineIndex,
                pc.usingBundle
              );
            }
            var localCapabilities = window2.RTCRtpSender.getCapabilities(kind);
            if (edgeVersion < 15019) {
              localCapabilities.codecs = localCapabilities.codecs.filter(
                function(codec) {
                  return codec.name !== "rtx";
                }
              );
            }
            localCapabilities.codecs.forEach(function(codec) {
              if (codec.name === "H264" && codec.parameters["level-asymmetry-allowed"] === void 0) {
                codec.parameters["level-asymmetry-allowed"] = "1";
              }
              if (transceiver.remoteCapabilities && transceiver.remoteCapabilities.codecs) {
                transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
                  if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() && codec.clockRate === remoteCodec.clockRate) {
                    codec.preferredPayloadType = remoteCodec.payloadType;
                  }
                });
              }
            });
            localCapabilities.headerExtensions.forEach(function(hdrExt) {
              var remoteExtensions = transceiver.remoteCapabilities && transceiver.remoteCapabilities.headerExtensions || [];
              remoteExtensions.forEach(function(rHdrExt) {
                if (hdrExt.uri === rHdrExt.uri) {
                  hdrExt.id = rHdrExt.id;
                }
              });
            });
            var sendEncodingParameters = transceiver.sendEncodingParameters || [{
              ssrc: (2 * sdpMLineIndex + 1) * 1001
            }];
            if (track) {
              if (edgeVersion >= 15019 && kind === "video" && !sendEncodingParameters[0].rtx) {
                sendEncodingParameters[0].rtx = {
                  ssrc: sendEncodingParameters[0].ssrc + 1
                };
              }
            }
            if (transceiver.wantReceive) {
              transceiver.rtpReceiver = new window2.RTCRtpReceiver(
                transceiver.dtlsTransport,
                kind
              );
            }
            transceiver.localCapabilities = localCapabilities;
            transceiver.sendEncodingParameters = sendEncodingParameters;
          });
          if (pc._config.bundlePolicy !== "max-compat") {
            sdp += "a=group:BUNDLE " + pc.transceivers.map(function(t) {
              return t.mid;
            }).join(" ") + "\r\n";
          }
          sdp += "a=ice-options:trickle\r\n";
          pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
            sdp += writeMediaSection(
              transceiver,
              transceiver.localCapabilities,
              "offer",
              transceiver.stream,
              pc._dtlsRole
            );
            sdp += "a=rtcp-rsize\r\n";
            if (transceiver.iceGatherer && pc.iceGatheringState !== "new" && (sdpMLineIndex === 0 || !pc.usingBundle)) {
              transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
                cand.component = 1;
                sdp += "a=" + SDPUtils2.writeCandidate(cand) + "\r\n";
              });
              if (transceiver.iceGatherer.state === "completed") {
                sdp += "a=end-of-candidates\r\n";
              }
            }
          });
          var desc = new window2.RTCSessionDescription({
            type: "offer",
            sdp
          });
          return Promise.resolve(desc);
        };
        RTCPeerConnection2.prototype.createAnswer = function() {
          var pc = this;
          if (pc._isClosed) {
            return Promise.reject(makeError(
              "InvalidStateError",
              "Can not call createAnswer after close"
            ));
          }
          if (!(pc.signalingState === "have-remote-offer" || pc.signalingState === "have-local-pranswer")) {
            return Promise.reject(makeError(
              "InvalidStateError",
              "Can not call createAnswer in signalingState " + pc.signalingState
            ));
          }
          var sdp = SDPUtils2.writeSessionBoilerplate(
            pc._sdpSessionId,
            pc._sdpSessionVersion++
          );
          if (pc.usingBundle) {
            sdp += "a=group:BUNDLE " + pc.transceivers.map(function(t) {
              return t.mid;
            }).join(" ") + "\r\n";
          }
          sdp += "a=ice-options:trickle\r\n";
          var mediaSectionsInOffer = SDPUtils2.getMediaSections(
            pc._remoteDescription.sdp
          ).length;
          pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
            if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
              return;
            }
            if (transceiver.rejected) {
              if (transceiver.kind === "application") {
                if (transceiver.protocol === "DTLS/SCTP") {
                  sdp += "m=application 0 DTLS/SCTP 5000\r\n";
                } else {
                  sdp += "m=application 0 " + transceiver.protocol + " webrtc-datachannel\r\n";
                }
              } else if (transceiver.kind === "audio") {
                sdp += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n";
              } else if (transceiver.kind === "video") {
                sdp += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n";
              }
              sdp += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + transceiver.mid + "\r\n";
              return;
            }
            if (transceiver.stream) {
              var localTrack;
              if (transceiver.kind === "audio") {
                localTrack = transceiver.stream.getAudioTracks()[0];
              } else if (transceiver.kind === "video") {
                localTrack = transceiver.stream.getVideoTracks()[0];
              }
              if (localTrack) {
                if (edgeVersion >= 15019 && transceiver.kind === "video" && !transceiver.sendEncodingParameters[0].rtx) {
                  transceiver.sendEncodingParameters[0].rtx = {
                    ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                  };
                }
              }
            }
            var commonCapabilities = getCommonCapabilities(
              transceiver.localCapabilities,
              transceiver.remoteCapabilities
            );
            var hasRtx = commonCapabilities.codecs.filter(function(c) {
              return c.name.toLowerCase() === "rtx";
            }).length;
            if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
              delete transceiver.sendEncodingParameters[0].rtx;
            }
            sdp += writeMediaSection(
              transceiver,
              commonCapabilities,
              "answer",
              transceiver.stream,
              pc._dtlsRole
            );
            if (transceiver.rtcpParameters && transceiver.rtcpParameters.reducedSize) {
              sdp += "a=rtcp-rsize\r\n";
            }
          });
          var desc = new window2.RTCSessionDescription({
            type: "answer",
            sdp
          });
          return Promise.resolve(desc);
        };
        RTCPeerConnection2.prototype.addIceCandidate = function(candidate) {
          var pc = this;
          var sections;
          if (candidate && !(candidate.sdpMLineIndex !== void 0 || candidate.sdpMid)) {
            return Promise.reject(new TypeError("sdpMLineIndex or sdpMid required"));
          }
          return new Promise(function(resolve, reject) {
            if (!pc._remoteDescription) {
              return reject(makeError(
                "InvalidStateError",
                "Can not add ICE candidate without a remote description"
              ));
            } else if (!candidate || candidate.candidate === "") {
              for (var j = 0; j < pc.transceivers.length; j++) {
                if (pc.transceivers[j].rejected) {
                  continue;
                }
                pc.transceivers[j].iceTransport.addRemoteCandidate({});
                sections = SDPUtils2.getMediaSections(pc._remoteDescription.sdp);
                sections[j] += "a=end-of-candidates\r\n";
                pc._remoteDescription.sdp = SDPUtils2.getDescription(pc._remoteDescription.sdp) + sections.join("");
                if (pc.usingBundle) {
                  break;
                }
              }
            } else {
              var sdpMLineIndex = candidate.sdpMLineIndex;
              if (candidate.sdpMid) {
                for (var i2 = 0; i2 < pc.transceivers.length; i2++) {
                  if (pc.transceivers[i2].mid === candidate.sdpMid) {
                    sdpMLineIndex = i2;
                    break;
                  }
                }
              }
              var transceiver = pc.transceivers[sdpMLineIndex];
              if (transceiver) {
                if (transceiver.rejected) {
                  return resolve();
                }
                var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils2.parseCandidate(candidate.candidate) : {};
                if (cand.protocol === "tcp" && (cand.port === 0 || cand.port === 9)) {
                  return resolve();
                }
                if (cand.component && cand.component !== 1) {
                  return resolve();
                }
                if (sdpMLineIndex === 0 || sdpMLineIndex > 0 && transceiver.iceTransport !== pc.transceivers[0].iceTransport) {
                  if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                    return reject(makeError(
                      "OperationError",
                      "Can not add ICE candidate"
                    ));
                  }
                }
                var candidateString = candidate.candidate.trim();
                if (candidateString.indexOf("a=") === 0) {
                  candidateString = candidateString.substr(2);
                }
                sections = SDPUtils2.getMediaSections(pc._remoteDescription.sdp);
                sections[sdpMLineIndex] += "a=" + (cand.type ? candidateString : "end-of-candidates") + "\r\n";
                pc._remoteDescription.sdp = SDPUtils2.getDescription(pc._remoteDescription.sdp) + sections.join("");
              } else {
                return reject(makeError(
                  "OperationError",
                  "Can not add ICE candidate"
                ));
              }
            }
            resolve();
          });
        };
        RTCPeerConnection2.prototype.getStats = function(selector) {
          if (selector && selector instanceof window2.MediaStreamTrack) {
            var senderOrReceiver = null;
            this.transceivers.forEach(function(transceiver) {
              if (transceiver.rtpSender && transceiver.rtpSender.track === selector) {
                senderOrReceiver = transceiver.rtpSender;
              } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track === selector) {
                senderOrReceiver = transceiver.rtpReceiver;
              }
            });
            if (!senderOrReceiver) {
              throw makeError("InvalidAccessError", "Invalid selector.");
            }
            return senderOrReceiver.getStats();
          }
          var promises = [];
          this.transceivers.forEach(function(transceiver) {
            [
              "rtpSender",
              "rtpReceiver",
              "iceGatherer",
              "iceTransport",
              "dtlsTransport"
            ].forEach(function(method) {
              if (transceiver[method]) {
                promises.push(transceiver[method].getStats());
              }
            });
          });
          return Promise.all(promises).then(function(allStats) {
            var results = /* @__PURE__ */ new Map();
            allStats.forEach(function(stats) {
              stats.forEach(function(stat) {
                results.set(stat.id, stat);
              });
            });
            return results;
          });
        };
        var ortcObjects = [
          "RTCRtpSender",
          "RTCRtpReceiver",
          "RTCIceGatherer",
          "RTCIceTransport",
          "RTCDtlsTransport"
        ];
        ortcObjects.forEach(function(ortcObjectName) {
          var obj = window2[ortcObjectName];
          if (obj && obj.prototype && obj.prototype.getStats) {
            var nativeGetstats = obj.prototype.getStats;
            obj.prototype.getStats = function() {
              return nativeGetstats.apply(this).then(function(nativeStats) {
                var mapStats = /* @__PURE__ */ new Map();
                Object.keys(nativeStats).forEach(function(id) {
                  nativeStats[id].type = fixStatsType(nativeStats[id]);
                  mapStats.set(id, nativeStats[id]);
                });
                return mapStats;
              });
            };
          }
        });
        var methods = ["createOffer", "createAnswer"];
        methods.forEach(function(method) {
          var nativeMethod = RTCPeerConnection2.prototype[method];
          RTCPeerConnection2.prototype[method] = function() {
            var args = arguments;
            if (typeof args[0] === "function" || typeof args[1] === "function") {
              return nativeMethod.apply(this, [arguments[2]]).then(function(description) {
                if (typeof args[0] === "function") {
                  args[0].apply(null, [description]);
                }
              }, function(error) {
                if (typeof args[1] === "function") {
                  args[1].apply(null, [error]);
                }
              });
            }
            return nativeMethod.apply(this, arguments);
          };
        });
        methods = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"];
        methods.forEach(function(method) {
          var nativeMethod = RTCPeerConnection2.prototype[method];
          RTCPeerConnection2.prototype[method] = function() {
            var args = arguments;
            if (typeof args[1] === "function" || typeof args[2] === "function") {
              return nativeMethod.apply(this, arguments).then(function() {
                if (typeof args[1] === "function") {
                  args[1].apply(null);
                }
              }, function(error) {
                if (typeof args[2] === "function") {
                  args[2].apply(null, [error]);
                }
              });
            }
            return nativeMethod.apply(this, arguments);
          };
        });
        ["getStats"].forEach(function(method) {
          var nativeMethod = RTCPeerConnection2.prototype[method];
          RTCPeerConnection2.prototype[method] = function() {
            var args = arguments;
            if (typeof args[1] === "function") {
              return nativeMethod.apply(this, arguments).then(function() {
                if (typeof args[1] === "function") {
                  args[1].apply(null);
                }
              });
            }
            return nativeMethod.apply(this, arguments);
          };
        });
        return RTCPeerConnection2;
      };
    }
  });

  // ../labs/ui/components/Element.ts
  function setElementStyles(el, styles) {
    if (!styles) {
      return;
    }
    for (const key of Object.keys(styles)) {
      el.style[key] = styles[key];
    }
  }

  // ../labs/ui/components/Div.ts
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

  // ../labs/ui/components/Button.ts
  function Button(props) {
    const el = document.createElement("button");
    setElementStyles(el, props?.styles);
    el.innerText = props?.innerText;
    if (props?.onClick) {
      el.addEventListener("click", props.onClick);
    }
    return el;
  }

  // ../labs/ui/components/Input.ts
  function Input(props) {
    const input = document.createElement("input");
    input.type = props?.type || "text";
    setElementStyles(input, props?.styles);
    return input;
  }

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i2 = 0; i2 < 256; ++i2) {
    byteToHex.push((i2 + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }

  // node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i2 = 0; i2 < 16; ++i2) {
        buf[offset + i2] = rnds[i2];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // src/views/Home.ts
  function Home() {
    const el = Div();
    const container = Div();
    const text = Div();
    text.innerText = "Get random id";
    container.append(text);
    const myId = Input();
    myId.id = "input-id";
    container.append(myId);
    const getIdBtn = Button({
      innerText: "Get",
      onClick: () => {
        const input = document.getElementById("input-id");
        if (input) {
          input.value = v4_default();
        }
      }
    });
    container.append(getIdBtn);
    el.append(container);
    return el;
  }

  // node_modules/engine.io-parser/build/esm/commons.js
  var PACKET_TYPES = /* @__PURE__ */ Object.create(null);
  PACKET_TYPES["open"] = "0";
  PACKET_TYPES["close"] = "1";
  PACKET_TYPES["ping"] = "2";
  PACKET_TYPES["pong"] = "3";
  PACKET_TYPES["message"] = "4";
  PACKET_TYPES["upgrade"] = "5";
  PACKET_TYPES["noop"] = "6";
  var PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
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
      callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
  };
  var encodePacket_browser_default = encodePacket;

  // node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (let i2 = 0; i2 < chars.length; i2++) {
    lookup[chars.charCodeAt(i2)] = i2;
  }
  var decode = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i2 = 0; i2 < len; i2 += 4) {
      encoded1 = lookup[base64.charCodeAt(i2)];
      encoded2 = lookup[base64.charCodeAt(i2 + 1)];
      encoded3 = lookup[base64.charCodeAt(i2 + 2)];
      encoded4 = lookup[base64.charCodeAt(i2 + 3)];
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
    const length2 = packets.length;
    const encodedPackets = new Array(length2);
    let count = 0;
    packets.forEach((packet, i2) => {
      encodePacket_browser_default(packet, false, (encodedPacket) => {
        encodedPackets[i2] = encodedPacket;
        if (++count === length2) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };
  var decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i2 = 0; i2 < encodedPackets.length; i2++) {
      const decodedPacket = decodePacket_browser_default(encodedPackets[i2], binaryType);
      packets.push(decodedPacket);
      if (decodedPacket.type === "error") {
        break;
      }
    }
    return packets;
  };
  var protocol = 4;

  // node_modules/@socket.io/component-emitter/index.mjs
  function Emitter(obj) {
    if (obj)
      return mixin(obj);
  }
  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }
  Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
    return this;
  };
  Emitter.prototype.once = function(event, fn) {
    function on3() {
      this.off(event, on3);
      fn.apply(this, arguments);
    }
    on3.fn = fn;
    this.on(event, on3);
    return this;
  };
  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }
    var callbacks = this._callbacks["$" + event];
    if (!callbacks)
      return this;
    if (1 == arguments.length) {
      delete this._callbacks["$" + event];
      return this;
    }
    var cb;
    for (var i2 = 0; i2 < callbacks.length; i2++) {
      cb = callbacks[i2];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i2, 1);
        break;
      }
    }
    if (callbacks.length === 0) {
      delete this._callbacks["$" + event];
    }
    return this;
  };
  Emitter.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
    for (var i2 = 1; i2 < arguments.length; i2++) {
      args[i2 - 1] = arguments[i2];
    }
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
        callbacks[i2].apply(this, args);
      }
    }
    return this;
  };
  Emitter.prototype.emitReserved = Emitter.prototype.emit;
  Emitter.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks["$" + event] || [];
  };
  Emitter.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
  };

  // node_modules/engine.io-client/build/esm/globalThis.browser.js
  var globalThisShim = (() => {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  })();

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
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
    } else {
      obj.setTimeoutFn = setTimeout.bind(globalThisShim);
      obj.clearTimeoutFn = clearTimeout.bind(globalThisShim);
    }
  }
  var BASE64_OVERHEAD = 1.33;
  function byteLength(obj) {
    if (typeof obj === "string") {
      return utf8Length(obj);
    }
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
  }
  function utf8Length(str) {
    let c = 0, length2 = 0;
    for (let i2 = 0, l = str.length; i2 < l; i2++) {
      c = str.charCodeAt(i2);
      if (c < 128) {
        length2 += 1;
      } else if (c < 2048) {
        length2 += 2;
      } else if (c < 55296 || c >= 57344) {
        length2 += 3;
      } else {
        i2++;
        length2 += 4;
      }
    }
    return length2;
  }

  // node_modules/engine.io-client/build/esm/transport.js
  var TransportError = class extends Error {
    constructor(reason, description, context) {
      super(reason);
      this.description = description;
      this.context = context;
      this.type = "TransportError";
    }
  };
  var Transport = class extends Emitter {
    constructor(opts) {
      super();
      this.writable = false;
      installTimerFunctions(this, opts);
      this.opts = opts;
      this.query = opts.query;
      this.readyState = "";
      this.socket = opts.socket;
    }
    onError(reason, description, context) {
      super.emitReserved("error", new TransportError(reason, description, context));
      return this;
    }
    open() {
      if ("closed" === this.readyState || "" === this.readyState) {
        this.readyState = "opening";
        this.doOpen();
      }
      return this;
    }
    close() {
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.doClose();
        this.onClose();
      }
      return this;
    }
    send(packets) {
      if ("open" === this.readyState) {
        this.write(packets);
      } else {
      }
    }
    onOpen() {
      this.readyState = "open";
      this.writable = true;
      super.emitReserved("open");
    }
    onData(data) {
      const packet = decodePacket_browser_default(data, this.socket.binaryType);
      this.onPacket(packet);
    }
    onPacket(packet) {
      super.emitReserved("packet", packet);
    }
    onClose(details) {
      this.readyState = "closed";
      super.emitReserved("close", details);
    }
  };

  // node_modules/engine.io-client/build/esm/contrib/yeast.js
  var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
  var length = 64;
  var map = {};
  var seed = 0;
  var i = 0;
  var prev;
  function encode(num) {
    let encoded = "";
    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
  }
  function yeast() {
    const now = encode(+new Date());
    if (now !== prev)
      return seed = 0, prev = now;
    return now + "." + encode(seed++);
  }
  for (; i < length; i++)
    map[alphabet[i]] = i;

  // node_modules/engine.io-client/build/esm/contrib/parseqs.js
  function encode2(obj) {
    let str = "";
    for (let i2 in obj) {
      if (obj.hasOwnProperty(i2)) {
        if (str.length)
          str += "&";
        str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj[i2]);
      }
    }
    return str;
  }
  function decode2(qs) {
    let qry = {};
    let pairs = qs.split("&");
    for (let i2 = 0, l = pairs.length; i2 < l; i2++) {
      let pair = pairs[i2].split("=");
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  }

  // node_modules/engine.io-client/build/esm/contrib/has-cors.js
  var value = false;
  try {
    value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
  } catch (err) {
  }
  var hasCORS = value;

  // node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js
  function XHR(opts) {
    const xdomain = opts.xdomain;
    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {
    }
    if (!xdomain) {
      try {
        return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {
      }
    }
  }

  // node_modules/engine.io-client/build/esm/transports/polling.js
  function empty() {
  }
  var hasXHR2 = function() {
    const xhr = new XHR({
      xdomain: false
    });
    return null != xhr.responseType;
  }();
  var Polling = class extends Transport {
    constructor(opts) {
      super(opts);
      this.polling = false;
      if (typeof location !== "undefined") {
        const isSSL = "https:" === location.protocol;
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
      this.emitReserved("poll");
    }
    onData(data) {
      const callback = (packet) => {
        if ("opening" === this.readyState && packet.type === "open") {
          this.onOpen();
        }
        if ("close" === packet.type) {
          this.onClose({ description: "transport closed by the server" });
          return false;
        }
        this.onPacket(packet);
      };
      decodePayload(data, this.socket.binaryType).forEach(callback);
      if ("closed" !== this.readyState) {
        this.polling = false;
        this.emitReserved("pollComplete");
        if ("open" === this.readyState) {
          this.poll();
        } else {
        }
      }
    }
    doClose() {
      const close = () => {
        this.write([{ type: "close" }]);
      };
      if ("open" === this.readyState) {
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
          this.emitReserved("drain");
        });
      });
    }
    uri() {
      let query = this.query || {};
      const schema = this.opts.secure ? "https" : "http";
      let port = "";
      if (false !== this.opts.timestampRequests) {
        query[this.opts.timestampParam] = yeast();
      }
      if (!this.supportsBinary && !query.sid) {
        query.b64 = 1;
      }
      if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
        port = ":" + this.opts.port;
      }
      const encodedQuery = encode2(query);
      const ipv6 = this.opts.hostname.indexOf(":") !== -1;
      return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
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
      req.on("error", (xhrStatus, context) => {
        this.onError("xhr post error", xhrStatus, context);
      });
    }
    doPoll() {
      const req = this.request();
      req.on("data", this.onData.bind(this));
      req.on("error", (xhrStatus, context) => {
        this.onError("xhr poll error", xhrStatus, context);
      });
      this.pollXhr = req;
    }
  };
  var Request = class extends Emitter {
    constructor(uri, opts) {
      super();
      installTimerFunctions(this, opts);
      this.opts = opts;
      this.method = opts.method || "GET";
      this.uri = uri;
      this.async = false !== opts.async;
      this.data = void 0 !== opts.data ? opts.data : null;
      this.create();
    }
    create() {
      const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
      opts.xdomain = !!this.opts.xd;
      opts.xscheme = !!this.opts.xs;
      const xhr = this.xhr = new XHR(opts);
      try {
        xhr.open(this.method, this.uri, this.async);
        try {
          if (this.opts.extraHeaders) {
            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
            for (let i2 in this.opts.extraHeaders) {
              if (this.opts.extraHeaders.hasOwnProperty(i2)) {
                xhr.setRequestHeader(i2, this.opts.extraHeaders[i2]);
              }
            }
          }
        } catch (e) {
        }
        if ("POST" === this.method) {
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
          if (4 !== xhr.readyState)
            return;
          if (200 === xhr.status || 1223 === xhr.status) {
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
    onError(err) {
      this.emitReserved("error", err, this.xhr);
      this.cleanup(true);
    }
    cleanup(fromError) {
      if ("undefined" === typeof this.xhr || null === this.xhr) {
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
        this.emitReserved("data", data);
        this.emitReserved("success");
        this.cleanup();
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
      const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }
  function unloadHandler() {
    for (let i2 in Request.requests) {
      if (Request.requests.hasOwnProperty(i2)) {
        Request.requests[i2].abort();
      }
    }
  }

  // node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js
  var nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
      return (cb) => Promise.resolve().then(cb);
    } else {
      return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
  })();
  var WebSocket2 = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
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
        this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket2(uri, protocols) : new WebSocket2(uri) : new WebSocket2(uri, protocols, opts);
      } catch (err) {
        return this.emitReserved("error", err);
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
      this.ws.onclose = (closeEvent) => this.onClose({
        description: "websocket connection closed",
        context: closeEvent
      });
      this.ws.onmessage = (ev) => this.onData(ev.data);
      this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
      this.writable = false;
      for (let i2 = 0; i2 < packets.length; i2++) {
        const packet = packets[i2];
        const lastPacket = i2 === packets.length - 1;
        encodePacket_browser_default(packet, this.supportsBinary, (data) => {
          const opts = {};
          if (!usingBrowserWebSocket) {
            if (packet.options) {
              opts.compress = packet.options.compress;
            }
            if (this.opts.perMessageDeflate) {
              const len = "string" === typeof data ? Buffer.byteLength(data) : data.length;
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
              this.emitReserved("drain");
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
      if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
        port = ":" + this.opts.port;
      }
      if (this.opts.timestampRequests) {
        query[this.opts.timestampParam] = yeast();
      }
      if (!this.supportsBinary) {
        query.b64 = 1;
      }
      const encodedQuery = encode2(query);
      const ipv6 = this.opts.hostname.indexOf(":") !== -1;
      return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
    }
    check() {
      return !!WebSocket2;
    }
  };

  // node_modules/engine.io-client/build/esm/transports/index.js
  var transports = {
    websocket: WS,
    polling: Polling
  };

  // node_modules/engine.io-client/build/esm/contrib/parseuri.js
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
  function parse(str) {
    const src = str, b = str.indexOf("["), e = str.indexOf("]");
    if (b != -1 && e != -1) {
      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
    }
    let m = re.exec(str || ""), uri = {}, i2 = 14;
    while (i2--) {
      uri[parts[i2]] = m[i2] || "";
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
  }
  function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == "/" || path.length === 0) {
      names.splice(0, 1);
    }
    if (path.slice(-1) == "/") {
      names.splice(names.length - 1, 1);
    }
    return names;
  }
  function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
      if ($1) {
        data[$1] = $2;
      }
    });
    return data;
  }

  // node_modules/engine.io-client/build/esm/socket.js
  var Socket = class extends Emitter {
    constructor(uri, opts = {}) {
      super();
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = null;
      }
      if (uri) {
        uri = parse(uri);
        opts.hostname = uri.host;
        opts.secure = uri.protocol === "https" || uri.protocol === "wss";
        opts.port = uri.port;
        if (uri.query)
          opts.query = uri.query;
      } else if (opts.host) {
        opts.hostname = parse(opts.host).host;
      }
      installTimerFunctions(this, opts);
      this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
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
        this.opts.query = decode2(this.opts.query);
      }
      this.id = null;
      this.upgrades = null;
      this.pingInterval = null;
      this.pingTimeout = null;
      this.pingTimeoutTimer = null;
      if (typeof addEventListener === "function") {
        if (this.opts.closeOnBeforeunload) {
          this.beforeunloadEventListener = () => {
            if (this.transport) {
              this.transport.removeAllListeners();
              this.transport.close();
            }
          };
          addEventListener("beforeunload", this.beforeunloadEventListener, false);
        }
        if (this.hostname !== "localhost") {
          this.offlineEventListener = () => {
            this.onClose("transport close", {
              description: "network connection lost"
            });
          };
          addEventListener("offline", this.offlineEventListener, false);
        }
      }
      this.open();
    }
    createTransport(name) {
      const query = Object.assign({}, this.opts.query);
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
      } else if (0 === this.transports.length) {
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
      transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (reason) => this.onClose("transport close", reason));
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
          if ("pong" === msg.type && "probe" === msg.data) {
            this.upgrading = true;
            this.emitReserved("upgrading", transport);
            if (!transport)
              return;
            Socket.priorWebsocketSuccess = "websocket" === transport.name;
            this.transport.pause(() => {
              if (failed)
                return;
              if ("closed" === this.readyState)
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
      Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
      this.emitReserved("open");
      this.flush();
      if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
        let i2 = 0;
        const l = this.upgrades.length;
        for (; i2 < l; i2++) {
          this.probe(this.upgrades[i2]);
        }
      }
    }
    onPacket(packet) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
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
      this.maxPayload = data.maxPayload;
      this.onOpen();
      if ("closed" === this.readyState)
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
      if (0 === this.writeBuffer.length) {
        this.emitReserved("drain");
      } else {
        this.flush();
      }
    }
    flush() {
      if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
        const packets = this.getWritablePackets();
        this.transport.send(packets);
        this.prevBufferLen = packets.length;
        this.emitReserved("flush");
      }
    }
    getWritablePackets() {
      const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
      if (!shouldCheckPayloadSize) {
        return this.writeBuffer;
      }
      let payloadSize = 1;
      for (let i2 = 0; i2 < this.writeBuffer.length; i2++) {
        const data = this.writeBuffer[i2].data;
        if (data) {
          payloadSize += byteLength(data);
        }
        if (i2 > 0 && payloadSize > this.maxPayload) {
          return this.writeBuffer.slice(0, i2);
        }
        payloadSize += 2;
      }
      return this.writeBuffer;
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
      if ("function" === typeof data) {
        fn = data;
        data = void 0;
      }
      if ("function" === typeof options) {
        fn = options;
        options = null;
      }
      if ("closing" === this.readyState || "closed" === this.readyState) {
        return;
      }
      options = options || {};
      options.compress = false !== options.compress;
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
      if ("opening" === this.readyState || "open" === this.readyState) {
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
    onClose(reason, description) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.transport.removeAllListeners("close");
        this.transport.close();
        this.transport.removeAllListeners();
        if (typeof removeEventListener === "function") {
          removeEventListener("beforeunload", this.beforeunloadEventListener, false);
          removeEventListener("offline", this.offlineEventListener, false);
        }
        this.readyState = "closed";
        this.id = null;
        this.emitReserved("close", reason, description);
        this.writeBuffer = [];
        this.prevBufferLen = 0;
      }
    }
    filterUpgrades(upgrades) {
      const filteredUpgrades = [];
      let i2 = 0;
      const j = upgrades.length;
      for (; i2 < j; i2++) {
        if (~this.transports.indexOf(upgrades[i2]))
          filteredUpgrades.push(upgrades[i2]);
      }
      return filteredUpgrades;
    }
  };
  Socket.protocol = protocol;

  // node_modules/engine.io-client/build/esm/index.js
  var protocol2 = Socket.protocol;

  // node_modules/socket.io-client/build/esm/url.js
  function url(uri, path = "", loc) {
    let obj = uri;
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri)
      uri = loc.protocol + "//" + loc.host;
    if (typeof uri === "string") {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }
      if (!/^(https?|wss?):\/\//.test(uri)) {
        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      }
      obj = parse(uri);
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

  // node_modules/socket.io-parser/build/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    Decoder: () => Decoder,
    Encoder: () => Encoder,
    PacketType: () => PacketType,
    protocol: () => protocol3
  });

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
      for (let i2 = 0, l = obj.length; i2 < l; i2++) {
        if (hasBinary(obj[i2])) {
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
      for (let i2 = 0; i2 < data.length; i2++) {
        newData[i2] = _deconstructPacket(data[i2], buffers);
      }
      return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
      const newData = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          newData[key] = _deconstructPacket(data[key], buffers);
        }
      }
      return newData;
    }
    return data;
  }
  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments;
    return packet;
  }
  function _reconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (data && data._placeholder === true) {
      const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
      if (isIndexValid) {
        return buffers[data.num];
      } else {
        throw new Error("illegal attachments");
      }
    } else if (Array.isArray(data)) {
      for (let i2 = 0; i2 < data.length; i2++) {
        data[i2] = _reconstructPacket(data[i2], buffers);
      }
    } else if (typeof data === "object") {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
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
    constructor(replacer) {
      this.replacer = replacer;
    }
    encode(obj) {
      if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
        if (hasBinary(obj)) {
          return this.encodeAsBinary({
            type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
            nsp: obj.nsp,
            data: obj.data,
            id: obj.id
          });
        }
      }
      return [this.encodeAsString(obj)];
    }
    encodeAsString(obj) {
      let str = "" + obj.type;
      if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
        str += obj.attachments + "-";
      }
      if (obj.nsp && "/" !== obj.nsp) {
        str += obj.nsp + ",";
      }
      if (null != obj.id) {
        str += obj.id;
      }
      if (null != obj.data) {
        str += JSON.stringify(obj.data, this.replacer);
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
  var Decoder = class extends Emitter {
    constructor(reviver) {
      super();
      this.reviver = reviver;
    }
    add(obj) {
      let packet;
      if (typeof obj === "string") {
        if (this.reconstructor) {
          throw new Error("got plaintext data when reconstructing a packet");
        }
        packet = this.decodeString(obj);
        const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
        if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
          packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
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
      let i2 = 0;
      const p = {
        type: Number(str.charAt(0))
      };
      if (PacketType[p.type] === void 0) {
        throw new Error("unknown packet type " + p.type);
      }
      if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
        const start = i2 + 1;
        while (str.charAt(++i2) !== "-" && i2 != str.length) {
        }
        const buf = str.substring(start, i2);
        if (buf != Number(buf) || str.charAt(i2) !== "-") {
          throw new Error("Illegal attachments");
        }
        p.attachments = Number(buf);
      }
      if ("/" === str.charAt(i2 + 1)) {
        const start = i2 + 1;
        while (++i2) {
          const c = str.charAt(i2);
          if ("," === c)
            break;
          if (i2 === str.length)
            break;
        }
        p.nsp = str.substring(start, i2);
      } else {
        p.nsp = "/";
      }
      const next = str.charAt(i2 + 1);
      if ("" !== next && Number(next) == next) {
        const start = i2 + 1;
        while (++i2) {
          const c = str.charAt(i2);
          if (null == c || Number(c) != c) {
            --i2;
            break;
          }
          if (i2 === str.length)
            break;
        }
        p.id = Number(str.substring(start, i2 + 1));
      }
      if (str.charAt(++i2)) {
        const payload = this.tryParse(str.substr(i2));
        if (Decoder.isPayloadValid(p.type, payload)) {
          p.data = payload;
        } else {
          throw new Error("invalid payload");
        }
      }
      return p;
    }
    tryParse(str) {
      try {
        return JSON.parse(str, this.reviver);
      } catch (e) {
        return false;
      }
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
        this.reconstructor = null;
      }
    }
  };
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
  var RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1
  });
  var Socket2 = class extends Emitter {
    constructor(io, nsp, opts) {
      super();
      this.connected = false;
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
    get disconnected() {
      return !this.connected;
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
      if ("open" === this.io._readyState)
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
        throw new Error('"' + ev.toString() + '" is a reserved event name');
      }
      args.unshift(ev);
      const packet = {
        type: PacketType.EVENT,
        data: args
      };
      packet.options = {};
      packet.options.compress = this.flags.compress !== false;
      if ("function" === typeof args[args.length - 1]) {
        const id = this.ids++;
        const ack = args.pop();
        this._registerAckCallback(id, ack);
        packet.id = id;
      }
      const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
      const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
      if (discardPacket) {
      } else if (this.connected) {
        this.notifyOutgoingListeners(packet);
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
        for (let i2 = 0; i2 < this.sendBuffer.length; i2++) {
          if (this.sendBuffer[i2].id === id) {
            this.sendBuffer.splice(i2, 1);
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
    onclose(reason, description) {
      this.connected = false;
      delete this.id;
      this.emitReserved("disconnect", reason, description);
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
        case PacketType.BINARY_EVENT:
          this.onevent(packet);
          break;
        case PacketType.ACK:
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
      if (null != packet.id) {
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
        const listeners2 = this._anyListeners.slice();
        for (const listener of listeners2) {
          listener.apply(this, args);
        }
      }
      super.emit.apply(this, args);
    }
    ack(id) {
      const self2 = this;
      let sent = false;
      return function(...args) {
        if (sent)
          return;
        sent = true;
        self2.packet({
          type: PacketType.ACK,
          id,
          data: args
        });
      };
    }
    onack(packet) {
      const ack = this.acks[packet.id];
      if ("function" === typeof ack) {
        ack.apply(this, packet.data);
        delete this.acks[packet.id];
      } else {
      }
    }
    onconnect(id) {
      this.id = id;
      this.connected = true;
      this.emitBuffered();
      this.emitReserved("connect");
    }
    emitBuffered() {
      this.receiveBuffer.forEach((args) => this.emitEvent(args));
      this.receiveBuffer = [];
      this.sendBuffer.forEach((packet) => {
        this.notifyOutgoingListeners(packet);
        this.packet(packet);
      });
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
        const listeners2 = this._anyListeners;
        for (let i2 = 0; i2 < listeners2.length; i2++) {
          if (listener === listeners2[i2]) {
            listeners2.splice(i2, 1);
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
    onAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.push(listener);
      return this;
    }
    prependAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.unshift(listener);
      return this;
    }
    offAnyOutgoing(listener) {
      if (!this._anyOutgoingListeners) {
        return this;
      }
      if (listener) {
        const listeners2 = this._anyOutgoingListeners;
        for (let i2 = 0; i2 < listeners2.length; i2++) {
          if (listener === listeners2[i2]) {
            listeners2.splice(i2, 1);
            return this;
          }
        }
      } else {
        this._anyOutgoingListeners = [];
      }
      return this;
    }
    listenersAnyOutgoing() {
      return this._anyOutgoingListeners || [];
    }
    notifyOutgoingListeners(packet) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        const listeners2 = this._anyOutgoingListeners.slice();
        for (const listener of listeners2) {
          listener.apply(this, packet.data);
        }
      }
    }
  };

  // node_modules/socket.io-client/build/esm/contrib/backo2.js
  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 1e4;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  Backoff.prototype.duration = function() {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
  };
  Backoff.prototype.reset = function() {
    this.attempts = 0;
  };
  Backoff.prototype.setMin = function(min) {
    this.ms = min;
  };
  Backoff.prototype.setMax = function(max) {
    this.max = max;
  };
  Backoff.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
  };

  // node_modules/socket.io-client/build/esm/manager.js
  var Manager = class extends Emitter {
    constructor(uri, opts) {
      var _a;
      super();
      this.nsps = {};
      this.subs = [];
      if (uri && "object" === typeof uri) {
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
      this.backoff = new Backoff({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor()
      });
      this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
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
      const socket2 = this.engine;
      const self2 = this;
      this._readyState = "opening";
      this.skipReconnect = false;
      const openSubDestroy = on(socket2, "open", function() {
        self2.onopen();
        fn && fn();
      });
      const errorSub = on(socket2, "error", (err) => {
        self2.cleanup();
        self2._readyState = "closed";
        this.emitReserved("error", err);
        if (fn) {
          fn(err);
        } else {
          self2.maybeReconnectOnOpen();
        }
      });
      if (false !== this._timeout) {
        const timeout = this._timeout;
        if (timeout === 0) {
          openSubDestroy();
        }
        const timer = this.setTimeoutFn(() => {
          openSubDestroy();
          socket2.close();
          socket2.emit("error", new Error("timeout"));
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
      const socket2 = this.engine;
      this.subs.push(on(socket2, "ping", this.onping.bind(this)), on(socket2, "data", this.ondata.bind(this)), on(socket2, "error", this.onerror.bind(this)), on(socket2, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    onping() {
      this.emitReserved("ping");
    }
    ondata(data) {
      try {
        this.decoder.add(data);
      } catch (e) {
        this.onclose("parse error", e);
      }
    }
    ondecoded(packet) {
      nextTick(() => {
        this.emitReserved("packet", packet);
      }, this.setTimeoutFn);
    }
    onerror(err) {
      this.emitReserved("error", err);
    }
    socket(nsp, opts) {
      let socket2 = this.nsps[nsp];
      if (!socket2) {
        socket2 = new Socket2(this, nsp, opts);
        this.nsps[nsp] = socket2;
      }
      return socket2;
    }
    _destroy(socket2) {
      const nsps = Object.keys(this.nsps);
      for (const nsp of nsps) {
        const socket3 = this.nsps[nsp];
        if (socket3.active) {
          return;
        }
      }
      this._close();
    }
    _packet(packet) {
      const encodedPackets = this.encoder.encode(packet);
      for (let i2 = 0; i2 < encodedPackets.length; i2++) {
        this.engine.write(encodedPackets[i2], packet.options);
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
    onclose(reason, description) {
      this.cleanup();
      this.backoff.reset();
      this._readyState = "closed";
      this.emitReserved("close", reason, description);
      if (this._reconnection && !this.skipReconnect) {
        this.reconnect();
      }
    }
    reconnect() {
      if (this._reconnecting || this.skipReconnect)
        return this;
      const self2 = this;
      if (this.backoff.attempts >= this._reconnectionAttempts) {
        this.backoff.reset();
        this.emitReserved("reconnect_failed");
        this._reconnecting = false;
      } else {
        const delay = this.backoff.duration();
        this._reconnecting = true;
        const timer = this.setTimeoutFn(() => {
          if (self2.skipReconnect)
            return;
          this.emitReserved("reconnect_attempt", self2.backoff.attempts);
          if (self2.skipReconnect)
            return;
          self2.open((err) => {
            if (err) {
              self2._reconnecting = false;
              self2.reconnect();
              this.emitReserved("reconnect_error", err);
            } else {
              self2.onreconnect();
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
    const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
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

  // node_modules/peerjs/dist/bundler.mjs
  var import_peerjs_js_binarypack = __toESM(require_binarypack(), 1);

  // node_modules/webrtc-adapter/src/js/utils.js
  var logDisabled_ = true;
  var deprecationWarnings_ = true;
  function extractVersion(uastring, expr, pos) {
    const match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
  }
  function wrapPeerConnectionEvent(window2, eventNameToWrap, wrapper) {
    if (!window2.RTCPeerConnection) {
      return;
    }
    const proto = window2.RTCPeerConnection.prototype;
    const nativeAddEventListener = proto.addEventListener;
    proto.addEventListener = function(nativeEventName, cb) {
      if (nativeEventName !== eventNameToWrap) {
        return nativeAddEventListener.apply(this, arguments);
      }
      const wrappedCallback = (e) => {
        const modifiedEvent = wrapper(e);
        if (modifiedEvent) {
          if (cb.handleEvent) {
            cb.handleEvent(modifiedEvent);
          } else {
            cb(modifiedEvent);
          }
        }
      };
      this._eventMap = this._eventMap || {};
      if (!this._eventMap[eventNameToWrap]) {
        this._eventMap[eventNameToWrap] = /* @__PURE__ */ new Map();
      }
      this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
      return nativeAddEventListener.apply(this, [
        nativeEventName,
        wrappedCallback
      ]);
    };
    const nativeRemoveEventListener = proto.removeEventListener;
    proto.removeEventListener = function(nativeEventName, cb) {
      if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      if (!this._eventMap[eventNameToWrap].has(cb)) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      const unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
      this._eventMap[eventNameToWrap].delete(cb);
      if (this._eventMap[eventNameToWrap].size === 0) {
        delete this._eventMap[eventNameToWrap];
      }
      if (Object.keys(this._eventMap).length === 0) {
        delete this._eventMap;
      }
      return nativeRemoveEventListener.apply(this, [
        nativeEventName,
        unwrappedCb
      ]);
    };
    Object.defineProperty(proto, "on" + eventNameToWrap, {
      get() {
        return this["_on" + eventNameToWrap];
      },
      set(cb) {
        if (this["_on" + eventNameToWrap]) {
          this.removeEventListener(
            eventNameToWrap,
            this["_on" + eventNameToWrap]
          );
          delete this["_on" + eventNameToWrap];
        }
        if (cb) {
          this.addEventListener(
            eventNameToWrap,
            this["_on" + eventNameToWrap] = cb
          );
        }
      },
      enumerable: true,
      configurable: true
    });
  }
  function disableLog(bool) {
    if (typeof bool !== "boolean") {
      return new Error("Argument type: " + typeof bool + ". Please use a boolean.");
    }
    logDisabled_ = bool;
    return bool ? "adapter.js logging disabled" : "adapter.js logging enabled";
  }
  function disableWarnings(bool) {
    if (typeof bool !== "boolean") {
      return new Error("Argument type: " + typeof bool + ". Please use a boolean.");
    }
    deprecationWarnings_ = !bool;
    return "adapter.js deprecation warnings " + (bool ? "disabled" : "enabled");
  }
  function log() {
    if (typeof window === "object") {
      if (logDisabled_) {
        return;
      }
      if (typeof console !== "undefined" && typeof console.log === "function") {
        console.log.apply(console, arguments);
      }
    }
  }
  function deprecated(oldMethod, newMethod) {
    if (!deprecationWarnings_) {
      return;
    }
    console.warn(oldMethod + " is deprecated, please use " + newMethod + " instead.");
  }
  function detectBrowser(window2) {
    const result = { browser: null, version: null };
    if (typeof window2 === "undefined" || !window2.navigator) {
      result.browser = "Not a browser.";
      return result;
    }
    const { navigator: navigator2 } = window2;
    if (navigator2.mozGetUserMedia) {
      result.browser = "firefox";
      result.version = extractVersion(
        navigator2.userAgent,
        /Firefox\/(\d+)\./,
        1
      );
    } else if (navigator2.webkitGetUserMedia || window2.isSecureContext === false && window2.webkitRTCPeerConnection && !window2.RTCIceGatherer) {
      result.browser = "chrome";
      result.version = extractVersion(
        navigator2.userAgent,
        /Chrom(e|ium)\/(\d+)\./,
        2
      );
    } else if (navigator2.mediaDevices && navigator2.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
      result.browser = "edge";
      result.version = extractVersion(
        navigator2.userAgent,
        /Edge\/(\d+).(\d+)$/,
        2
      );
    } else if (window2.RTCPeerConnection && navigator2.userAgent.match(/AppleWebKit\/(\d+)\./)) {
      result.browser = "safari";
      result.version = extractVersion(
        navigator2.userAgent,
        /AppleWebKit\/(\d+)\./,
        1
      );
      result.supportsUnifiedPlan = window2.RTCRtpTransceiver && "currentDirection" in window2.RTCRtpTransceiver.prototype;
    } else {
      result.browser = "Not a supported browser.";
      return result;
    }
    return result;
  }
  function isObject(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
  }
  function compactObject(data) {
    if (!isObject(data)) {
      return data;
    }
    return Object.keys(data).reduce(function(accumulator, key) {
      const isObj = isObject(data[key]);
      const value2 = isObj ? compactObject(data[key]) : data[key];
      const isEmptyObject = isObj && !Object.keys(value2).length;
      if (value2 === void 0 || isEmptyObject) {
        return accumulator;
      }
      return Object.assign(accumulator, { [key]: value2 });
    }, {});
  }
  function walkStats(stats, base, resultSet) {
    if (!base || resultSet.has(base.id)) {
      return;
    }
    resultSet.set(base.id, base);
    Object.keys(base).forEach((name) => {
      if (name.endsWith("Id")) {
        walkStats(stats, stats.get(base[name]), resultSet);
      } else if (name.endsWith("Ids")) {
        base[name].forEach((id) => {
          walkStats(stats, stats.get(id), resultSet);
        });
      }
    });
  }
  function filterStats(result, track, outbound) {
    const streamStatsType = outbound ? "outbound-rtp" : "inbound-rtp";
    const filteredResult = /* @__PURE__ */ new Map();
    if (track === null) {
      return filteredResult;
    }
    const trackStats = [];
    result.forEach((value2) => {
      if (value2.type === "track" && value2.trackIdentifier === track.id) {
        trackStats.push(value2);
      }
    });
    trackStats.forEach((trackStat) => {
      result.forEach((stats) => {
        if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
          walkStats(result, stats, filteredResult);
        }
      });
    });
    return filteredResult;
  }

  // node_modules/webrtc-adapter/src/js/chrome/chrome_shim.js
  var chrome_shim_exports = {};
  __export(chrome_shim_exports, {
    fixNegotiationNeeded: () => fixNegotiationNeeded,
    shimAddTrackRemoveTrack: () => shimAddTrackRemoveTrack,
    shimAddTrackRemoveTrackWithNative: () => shimAddTrackRemoveTrackWithNative,
    shimGetDisplayMedia: () => shimGetDisplayMedia,
    shimGetSendersWithDtmf: () => shimGetSendersWithDtmf,
    shimGetStats: () => shimGetStats,
    shimGetUserMedia: () => shimGetUserMedia,
    shimMediaStream: () => shimMediaStream,
    shimOnTrack: () => shimOnTrack,
    shimPeerConnection: () => shimPeerConnection,
    shimSenderReceiverGetStats: () => shimSenderReceiverGetStats
  });

  // node_modules/webrtc-adapter/src/js/chrome/getusermedia.js
  var logging = log;
  function shimGetUserMedia(window2, browserDetails) {
    const navigator2 = window2 && window2.navigator;
    if (!navigator2.mediaDevices) {
      return;
    }
    const constraintsToChrome_ = function(c) {
      if (typeof c !== "object" || c.mandatory || c.optional) {
        return c;
      }
      const cc = {};
      Object.keys(c).forEach((key) => {
        if (key === "require" || key === "advanced" || key === "mediaSource") {
          return;
        }
        const r = typeof c[key] === "object" ? c[key] : { ideal: c[key] };
        if (r.exact !== void 0 && typeof r.exact === "number") {
          r.min = r.max = r.exact;
        }
        const oldname_ = function(prefix, name) {
          if (prefix) {
            return prefix + name.charAt(0).toUpperCase() + name.slice(1);
          }
          return name === "deviceId" ? "sourceId" : name;
        };
        if (r.ideal !== void 0) {
          cc.optional = cc.optional || [];
          let oc = {};
          if (typeof r.ideal === "number") {
            oc[oldname_("min", key)] = r.ideal;
            cc.optional.push(oc);
            oc = {};
            oc[oldname_("max", key)] = r.ideal;
            cc.optional.push(oc);
          } else {
            oc[oldname_("", key)] = r.ideal;
            cc.optional.push(oc);
          }
        }
        if (r.exact !== void 0 && typeof r.exact !== "number") {
          cc.mandatory = cc.mandatory || {};
          cc.mandatory[oldname_("", key)] = r.exact;
        } else {
          ["min", "max"].forEach((mix) => {
            if (r[mix] !== void 0) {
              cc.mandatory = cc.mandatory || {};
              cc.mandatory[oldname_(mix, key)] = r[mix];
            }
          });
        }
      });
      if (c.advanced) {
        cc.optional = (cc.optional || []).concat(c.advanced);
      }
      return cc;
    };
    const shimConstraints_ = function(constraints, func) {
      if (browserDetails.version >= 61) {
        return func(constraints);
      }
      constraints = JSON.parse(JSON.stringify(constraints));
      if (constraints && typeof constraints.audio === "object") {
        const remap = function(obj, a, b) {
          if (a in obj && !(b in obj)) {
            obj[b] = obj[a];
            delete obj[a];
          }
        };
        constraints = JSON.parse(JSON.stringify(constraints));
        remap(constraints.audio, "autoGainControl", "googAutoGainControl");
        remap(constraints.audio, "noiseSuppression", "googNoiseSuppression");
        constraints.audio = constraintsToChrome_(constraints.audio);
      }
      if (constraints && typeof constraints.video === "object") {
        let face = constraints.video.facingMode;
        face = face && (typeof face === "object" ? face : { ideal: face });
        const getSupportedFacingModeLies = browserDetails.version < 66;
        if (face && (face.exact === "user" || face.exact === "environment" || face.ideal === "user" || face.ideal === "environment") && !(navigator2.mediaDevices.getSupportedConstraints && navigator2.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
          delete constraints.video.facingMode;
          let matches;
          if (face.exact === "environment" || face.ideal === "environment") {
            matches = ["back", "rear"];
          } else if (face.exact === "user" || face.ideal === "user") {
            matches = ["front"];
          }
          if (matches) {
            return navigator2.mediaDevices.enumerateDevices().then((devices) => {
              devices = devices.filter((d) => d.kind === "videoinput");
              let dev = devices.find((d) => matches.some((match) => d.label.toLowerCase().includes(match)));
              if (!dev && devices.length && matches.includes("back")) {
                dev = devices[devices.length - 1];
              }
              if (dev) {
                constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
              }
              constraints.video = constraintsToChrome_(constraints.video);
              logging("chrome: " + JSON.stringify(constraints));
              return func(constraints);
            });
          }
        }
        constraints.video = constraintsToChrome_(constraints.video);
      }
      logging("chrome: " + JSON.stringify(constraints));
      return func(constraints);
    };
    const shimError_ = function(e) {
      if (browserDetails.version >= 64) {
        return e;
      }
      return {
        name: {
          PermissionDeniedError: "NotAllowedError",
          PermissionDismissedError: "NotAllowedError",
          InvalidStateError: "NotAllowedError",
          DevicesNotFoundError: "NotFoundError",
          ConstraintNotSatisfiedError: "OverconstrainedError",
          TrackStartError: "NotReadableError",
          MediaDeviceFailedDueToShutdown: "NotAllowedError",
          MediaDeviceKillSwitchOn: "NotAllowedError",
          TabCaptureError: "AbortError",
          ScreenCaptureError: "AbortError",
          DeviceCaptureError: "AbortError"
        }[e.name] || e.name,
        message: e.message,
        constraint: e.constraint || e.constraintName,
        toString() {
          return this.name + (this.message && ": ") + this.message;
        }
      };
    };
    const getUserMedia_ = function(constraints, onSuccess, onError) {
      shimConstraints_(constraints, (c) => {
        navigator2.webkitGetUserMedia(c, onSuccess, (e) => {
          if (onError) {
            onError(shimError_(e));
          }
        });
      });
    };
    navigator2.getUserMedia = getUserMedia_.bind(navigator2);
    if (navigator2.mediaDevices.getUserMedia) {
      const origGetUserMedia = navigator2.mediaDevices.getUserMedia.bind(navigator2.mediaDevices);
      navigator2.mediaDevices.getUserMedia = function(cs) {
        return shimConstraints_(cs, (c) => origGetUserMedia(c).then((stream) => {
          if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
            stream.getTracks().forEach((track) => {
              track.stop();
            });
            throw new DOMException("", "NotFoundError");
          }
          return stream;
        }, (e) => Promise.reject(shimError_(e))));
      };
    }
  }

  // node_modules/webrtc-adapter/src/js/chrome/getdisplaymedia.js
  function shimGetDisplayMedia(window2, getSourceId) {
    if (window2.navigator.mediaDevices && "getDisplayMedia" in window2.navigator.mediaDevices) {
      return;
    }
    if (!window2.navigator.mediaDevices) {
      return;
    }
    if (typeof getSourceId !== "function") {
      console.error("shimGetDisplayMedia: getSourceId argument is not a function");
      return;
    }
    window2.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
      return getSourceId(constraints).then((sourceId) => {
        const widthSpecified = constraints.video && constraints.video.width;
        const heightSpecified = constraints.video && constraints.video.height;
        const frameRateSpecified = constraints.video && constraints.video.frameRate;
        constraints.video = {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: sourceId,
            maxFrameRate: frameRateSpecified || 3
          }
        };
        if (widthSpecified) {
          constraints.video.mandatory.maxWidth = widthSpecified;
        }
        if (heightSpecified) {
          constraints.video.mandatory.maxHeight = heightSpecified;
        }
        return window2.navigator.mediaDevices.getUserMedia(constraints);
      });
    };
  }

  // node_modules/webrtc-adapter/src/js/chrome/chrome_shim.js
  function shimMediaStream(window2) {
    window2.MediaStream = window2.MediaStream || window2.webkitMediaStream;
  }
  function shimOnTrack(window2) {
    if (typeof window2 === "object" && window2.RTCPeerConnection && !("ontrack" in window2.RTCPeerConnection.prototype)) {
      Object.defineProperty(window2.RTCPeerConnection.prototype, "ontrack", {
        get() {
          return this._ontrack;
        },
        set(f) {
          if (this._ontrack) {
            this.removeEventListener("track", this._ontrack);
          }
          this.addEventListener("track", this._ontrack = f);
        },
        enumerable: true,
        configurable: true
      });
      const origSetRemoteDescription = window2.RTCPeerConnection.prototype.setRemoteDescription;
      window2.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
        if (!this._ontrackpoly) {
          this._ontrackpoly = (e) => {
            e.stream.addEventListener("addtrack", (te) => {
              let receiver;
              if (window2.RTCPeerConnection.prototype.getReceivers) {
                receiver = this.getReceivers().find((r) => r.track && r.track.id === te.track.id);
              } else {
                receiver = { track: te.track };
              }
              const event = new Event("track");
              event.track = te.track;
              event.receiver = receiver;
              event.transceiver = { receiver };
              event.streams = [e.stream];
              this.dispatchEvent(event);
            });
            e.stream.getTracks().forEach((track) => {
              let receiver;
              if (window2.RTCPeerConnection.prototype.getReceivers) {
                receiver = this.getReceivers().find((r) => r.track && r.track.id === track.id);
              } else {
                receiver = { track };
              }
              const event = new Event("track");
              event.track = track;
              event.receiver = receiver;
              event.transceiver = { receiver };
              event.streams = [e.stream];
              this.dispatchEvent(event);
            });
          };
          this.addEventListener("addstream", this._ontrackpoly);
        }
        return origSetRemoteDescription.apply(this, arguments);
      };
    } else {
      wrapPeerConnectionEvent(window2, "track", (e) => {
        if (!e.transceiver) {
          Object.defineProperty(
            e,
            "transceiver",
            { value: { receiver: e.receiver } }
          );
        }
        return e;
      });
    }
  }
  function shimGetSendersWithDtmf(window2) {
    if (typeof window2 === "object" && window2.RTCPeerConnection && !("getSenders" in window2.RTCPeerConnection.prototype) && "createDTMFSender" in window2.RTCPeerConnection.prototype) {
      const shimSenderWithDtmf = function(pc, track) {
        return {
          track,
          get dtmf() {
            if (this._dtmf === void 0) {
              if (track.kind === "audio") {
                this._dtmf = pc.createDTMFSender(track);
              } else {
                this._dtmf = null;
              }
            }
            return this._dtmf;
          },
          _pc: pc
        };
      };
      if (!window2.RTCPeerConnection.prototype.getSenders) {
        window2.RTCPeerConnection.prototype.getSenders = function getSenders() {
          this._senders = this._senders || [];
          return this._senders.slice();
        };
        const origAddTrack = window2.RTCPeerConnection.prototype.addTrack;
        window2.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
          let sender = origAddTrack.apply(this, arguments);
          if (!sender) {
            sender = shimSenderWithDtmf(this, track);
            this._senders.push(sender);
          }
          return sender;
        };
        const origRemoveTrack = window2.RTCPeerConnection.prototype.removeTrack;
        window2.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
          origRemoveTrack.apply(this, arguments);
          const idx = this._senders.indexOf(sender);
          if (idx !== -1) {
            this._senders.splice(idx, 1);
          }
        };
      }
      const origAddStream = window2.RTCPeerConnection.prototype.addStream;
      window2.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._senders = this._senders || [];
        origAddStream.apply(this, [stream]);
        stream.getTracks().forEach((track) => {
          this._senders.push(shimSenderWithDtmf(this, track));
        });
      };
      const origRemoveStream = window2.RTCPeerConnection.prototype.removeStream;
      window2.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        this._senders = this._senders || [];
        origRemoveStream.apply(this, [stream]);
        stream.getTracks().forEach((track) => {
          const sender = this._senders.find((s) => s.track === track);
          if (sender) {
            this._senders.splice(this._senders.indexOf(sender), 1);
          }
        });
      };
    } else if (typeof window2 === "object" && window2.RTCPeerConnection && "getSenders" in window2.RTCPeerConnection.prototype && "createDTMFSender" in window2.RTCPeerConnection.prototype && window2.RTCRtpSender && !("dtmf" in window2.RTCRtpSender.prototype)) {
      const origGetSenders = window2.RTCPeerConnection.prototype.getSenders;
      window2.RTCPeerConnection.prototype.getSenders = function getSenders() {
        const senders = origGetSenders.apply(this, []);
        senders.forEach((sender) => sender._pc = this);
        return senders;
      };
      Object.defineProperty(window2.RTCRtpSender.prototype, "dtmf", {
        get() {
          if (this._dtmf === void 0) {
            if (this.track.kind === "audio") {
              this._dtmf = this._pc.createDTMFSender(this.track);
            } else {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }
  }
  function shimGetStats(window2) {
    if (!window2.RTCPeerConnection) {
      return;
    }
    const origGetStats = window2.RTCPeerConnection.prototype.getStats;
    window2.RTCPeerConnection.prototype.getStats = function getStats() {
      const [selector, onSucc, onErr] = arguments;
      if (arguments.length > 0 && typeof selector === "function") {
        return origGetStats.apply(this, arguments);
      }
      if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== "function")) {
        return origGetStats.apply(this, []);
      }
      const fixChromeStats_ = function(response) {
        const standardReport = {};
        const reports = response.result();
        reports.forEach((report) => {
          const standardStats = {
            id: report.id,
            timestamp: report.timestamp,
            type: {
              localcandidate: "local-candidate",
              remotecandidate: "remote-candidate"
            }[report.type] || report.type
          };
          report.names().forEach((name) => {
            standardStats[name] = report.stat(name);
          });
          standardReport[standardStats.id] = standardStats;
        });
        return standardReport;
      };
      const makeMapStats = function(stats) {
        return new Map(Object.keys(stats).map((key) => [key, stats[key]]));
      };
      if (arguments.length >= 2) {
        const successCallbackWrapper_ = function(response) {
          onSucc(makeMapStats(fixChromeStats_(response)));
        };
        return origGetStats.apply(this, [
          successCallbackWrapper_,
          selector
        ]);
      }
      return new Promise((resolve, reject) => {
        origGetStats.apply(this, [
          function(response) {
            resolve(makeMapStats(fixChromeStats_(response)));
          },
          reject
        ]);
      }).then(onSucc, onErr);
    };
  }
  function shimSenderReceiverGetStats(window2) {
    if (!(typeof window2 === "object" && window2.RTCPeerConnection && window2.RTCRtpSender && window2.RTCRtpReceiver)) {
      return;
    }
    if (!("getStats" in window2.RTCRtpSender.prototype)) {
      const origGetSenders = window2.RTCPeerConnection.prototype.getSenders;
      if (origGetSenders) {
        window2.RTCPeerConnection.prototype.getSenders = function getSenders() {
          const senders = origGetSenders.apply(this, []);
          senders.forEach((sender) => sender._pc = this);
          return senders;
        };
      }
      const origAddTrack = window2.RTCPeerConnection.prototype.addTrack;
      if (origAddTrack) {
        window2.RTCPeerConnection.prototype.addTrack = function addTrack() {
          const sender = origAddTrack.apply(this, arguments);
          sender._pc = this;
          return sender;
        };
      }
      window2.RTCRtpSender.prototype.getStats = function getStats() {
        const sender = this;
        return this._pc.getStats().then((result) => filterStats(result, sender.track, true));
      };
    }
    if (!("getStats" in window2.RTCRtpReceiver.prototype)) {
      const origGetReceivers = window2.RTCPeerConnection.prototype.getReceivers;
      if (origGetReceivers) {
        window2.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
          const receivers = origGetReceivers.apply(this, []);
          receivers.forEach((receiver) => receiver._pc = this);
          return receivers;
        };
      }
      wrapPeerConnectionEvent(window2, "track", (e) => {
        e.receiver._pc = e.srcElement;
        return e;
      });
      window2.RTCRtpReceiver.prototype.getStats = function getStats() {
        const receiver = this;
        return this._pc.getStats().then((result) => filterStats(result, receiver.track, false));
      };
    }
    if (!("getStats" in window2.RTCRtpSender.prototype && "getStats" in window2.RTCRtpReceiver.prototype)) {
      return;
    }
    const origGetStats = window2.RTCPeerConnection.prototype.getStats;
    window2.RTCPeerConnection.prototype.getStats = function getStats() {
      if (arguments.length > 0 && arguments[0] instanceof window2.MediaStreamTrack) {
        const track = arguments[0];
        let sender;
        let receiver;
        let err;
        this.getSenders().forEach((s) => {
          if (s.track === track) {
            if (sender) {
              err = true;
            } else {
              sender = s;
            }
          }
        });
        this.getReceivers().forEach((r) => {
          if (r.track === track) {
            if (receiver) {
              err = true;
            } else {
              receiver = r;
            }
          }
          return r.track === track;
        });
        if (err || sender && receiver) {
          return Promise.reject(new DOMException(
            "There are more than one sender or receiver for the track.",
            "InvalidAccessError"
          ));
        } else if (sender) {
          return sender.getStats();
        } else if (receiver) {
          return receiver.getStats();
        }
        return Promise.reject(new DOMException(
          "There is no sender or receiver for the track.",
          "InvalidAccessError"
        ));
      }
      return origGetStats.apply(this, arguments);
    };
  }
  function shimAddTrackRemoveTrackWithNative(window2) {
    window2.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      return Object.keys(this._shimmedLocalStreams).map((streamId) => this._shimmedLocalStreams[streamId][0]);
    };
    const origAddTrack = window2.RTCPeerConnection.prototype.addTrack;
    window2.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
      if (!stream) {
        return origAddTrack.apply(this, arguments);
      }
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      const sender = origAddTrack.apply(this, arguments);
      if (!this._shimmedLocalStreams[stream.id]) {
        this._shimmedLocalStreams[stream.id] = [stream, sender];
      } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
        this._shimmedLocalStreams[stream.id].push(sender);
      }
      return sender;
    };
    const origAddStream = window2.RTCPeerConnection.prototype.addStream;
    window2.RTCPeerConnection.prototype.addStream = function addStream(stream) {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      stream.getTracks().forEach((track) => {
        const alreadyExists = this.getSenders().find((s) => s.track === track);
        if (alreadyExists) {
          throw new DOMException(
            "Track already exists.",
            "InvalidAccessError"
          );
        }
      });
      const existingSenders = this.getSenders();
      origAddStream.apply(this, arguments);
      const newSenders = this.getSenders().filter((newSender) => existingSenders.indexOf(newSender) === -1);
      this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
    };
    const origRemoveStream = window2.RTCPeerConnection.prototype.removeStream;
    window2.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      delete this._shimmedLocalStreams[stream.id];
      return origRemoveStream.apply(this, arguments);
    };
    const origRemoveTrack = window2.RTCPeerConnection.prototype.removeTrack;
    window2.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      if (sender) {
        Object.keys(this._shimmedLocalStreams).forEach((streamId) => {
          const idx = this._shimmedLocalStreams[streamId].indexOf(sender);
          if (idx !== -1) {
            this._shimmedLocalStreams[streamId].splice(idx, 1);
          }
          if (this._shimmedLocalStreams[streamId].length === 1) {
            delete this._shimmedLocalStreams[streamId];
          }
        });
      }
      return origRemoveTrack.apply(this, arguments);
    };
  }
  function shimAddTrackRemoveTrack(window2, browserDetails) {
    if (!window2.RTCPeerConnection) {
      return;
    }
    if (window2.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
      return shimAddTrackRemoveTrackWithNative(window2);
    }
    const origGetLocalStreams = window2.RTCPeerConnection.prototype.getLocalStreams;
    window2.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
      const nativeStreams = origGetLocalStreams.apply(this);
      this._reverseStreams = this._reverseStreams || {};
      return nativeStreams.map((stream) => this._reverseStreams[stream.id]);
    };
    const origAddStream = window2.RTCPeerConnection.prototype.addStream;
    window2.RTCPeerConnection.prototype.addStream = function addStream(stream) {
      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};
      stream.getTracks().forEach((track) => {
        const alreadyExists = this.getSenders().find((s) => s.track === track);
        if (alreadyExists) {
          throw new DOMException(
            "Track already exists.",
            "InvalidAccessError"
          );
        }
      });
      if (!this._reverseStreams[stream.id]) {
        const newStream = new window2.MediaStream(stream.getTracks());
        this._streams[stream.id] = newStream;
        this._reverseStreams[newStream.id] = stream;
        stream = newStream;
      }
      origAddStream.apply(this, [stream]);
    };
    const origRemoveStream = window2.RTCPeerConnection.prototype.removeStream;
    window2.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};
      origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
      delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
      delete this._streams[stream.id];
    };
    window2.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
      if (this.signalingState === "closed") {
        throw new DOMException(
          "The RTCPeerConnection's signalingState is 'closed'.",
          "InvalidStateError"
        );
      }
      const streams = [].slice.call(arguments, 1);
      if (streams.length !== 1 || !streams[0].getTracks().find((t) => t === track)) {
        throw new DOMException(
          "The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
          "NotSupportedError"
        );
      }
      const alreadyExists = this.getSenders().find((s) => s.track === track);
      if (alreadyExists) {
        throw new DOMException(
          "Track already exists.",
          "InvalidAccessError"
        );
      }
      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};
      const oldStream = this._streams[stream.id];
      if (oldStream) {
        oldStream.addTrack(track);
        Promise.resolve().then(() => {
          this.dispatchEvent(new Event("negotiationneeded"));
        });
      } else {
        const newStream = new window2.MediaStream([track]);
        this._streams[stream.id] = newStream;
        this._reverseStreams[newStream.id] = stream;
        this.addStream(newStream);
      }
      return this.getSenders().find((s) => s.track === track);
    };
    function replaceInternalStreamId(pc, description) {
      let sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach((internalId) => {
        const externalStream = pc._reverseStreams[internalId];
        const internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(
          new RegExp(internalStream.id, "g"),
          externalStream.id
        );
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp
      });
    }
    function replaceExternalStreamId(pc, description) {
      let sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach((internalId) => {
        const externalStream = pc._reverseStreams[internalId];
        const internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(
          new RegExp(externalStream.id, "g"),
          internalStream.id
        );
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp
      });
    }
    ["createOffer", "createAnswer"].forEach(function(method) {
      const nativeMethod = window2.RTCPeerConnection.prototype[method];
      const methodObj = { [method]() {
        const args = arguments;
        const isLegacyCall = arguments.length && typeof arguments[0] === "function";
        if (isLegacyCall) {
          return nativeMethod.apply(this, [
            (description) => {
              const desc = replaceInternalStreamId(this, description);
              args[0].apply(null, [desc]);
            },
            (err) => {
              if (args[1]) {
                args[1].apply(null, err);
              }
            },
            arguments[2]
          ]);
        }
        return nativeMethod.apply(this, arguments).then((description) => replaceInternalStreamId(this, description));
      } };
      window2.RTCPeerConnection.prototype[method] = methodObj[method];
    });
    const origSetLocalDescription = window2.RTCPeerConnection.prototype.setLocalDescription;
    window2.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
      if (!arguments.length || !arguments[0].type) {
        return origSetLocalDescription.apply(this, arguments);
      }
      arguments[0] = replaceExternalStreamId(this, arguments[0]);
      return origSetLocalDescription.apply(this, arguments);
    };
    const origLocalDescription = Object.getOwnPropertyDescriptor(
      window2.RTCPeerConnection.prototype,
      "localDescription"
    );
    Object.defineProperty(
      window2.RTCPeerConnection.prototype,
      "localDescription",
      {
        get() {
          const description = origLocalDescription.get.apply(this);
          if (description.type === "") {
            return description;
          }
          return replaceInternalStreamId(this, description);
        }
      }
    );
    window2.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
      if (this.signalingState === "closed") {
        throw new DOMException(
          "The RTCPeerConnection's signalingState is 'closed'.",
          "InvalidStateError"
        );
      }
      if (!sender._pc) {
        throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
      }
      const isLocal = sender._pc === this;
      if (!isLocal) {
        throw new DOMException(
          "Sender was not created by this connection.",
          "InvalidAccessError"
        );
      }
      this._streams = this._streams || {};
      let stream;
      Object.keys(this._streams).forEach((streamid) => {
        const hasTrack = this._streams[streamid].getTracks().find((track) => sender.track === track);
        if (hasTrack) {
          stream = this._streams[streamid];
        }
      });
      if (stream) {
        if (stream.getTracks().length === 1) {
          this.removeStream(this._reverseStreams[stream.id]);
        } else {
          stream.removeTrack(sender.track);
        }
        this.dispatchEvent(new Event("negotiationneeded"));
      }
    };
  }
  function shimPeerConnection(window2, browserDetails) {
    if (!window2.RTCPeerConnection && window2.webkitRTCPeerConnection) {
      window2.RTCPeerConnection = window2.webkitRTCPeerConnection;
    }
    if (!window2.RTCPeerConnection) {
      return;
    }
    if (browserDetails.version < 53) {
      ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(method) {
        const nativeMethod = window2.RTCPeerConnection.prototype[method];
        const methodObj = { [method]() {
          arguments[0] = new (method === "addIceCandidate" ? window2.RTCIceCandidate : window2.RTCSessionDescription)(arguments[0]);
          return nativeMethod.apply(this, arguments);
        } };
        window2.RTCPeerConnection.prototype[method] = methodObj[method];
      });
    }
  }
  function fixNegotiationNeeded(window2, browserDetails) {
    wrapPeerConnectionEvent(window2, "negotiationneeded", (e) => {
      const pc = e.target;
      if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === "plan-b") {
        if (pc.signalingState !== "stable") {
          return;
        }
      }
      return e;
    });
  }

  // node_modules/webrtc-adapter/src/js/edge/edge_shim.js
  var edge_shim_exports = {};
  __export(edge_shim_exports, {
    shimGetDisplayMedia: () => shimGetDisplayMedia2,
    shimGetUserMedia: () => shimGetUserMedia2,
    shimPeerConnection: () => shimPeerConnection2,
    shimReplaceTrack: () => shimReplaceTrack
  });

  // node_modules/webrtc-adapter/src/js/edge/filtericeservers.js
  function filterIceServers(iceServers, edgeVersion) {
    let hasTurn = false;
    iceServers = JSON.parse(JSON.stringify(iceServers));
    return iceServers.filter((server) => {
      if (server && (server.urls || server.url)) {
        let urls = server.urls || server.url;
        if (server.url && !server.urls) {
          deprecated("RTCIceServer.url", "RTCIceServer.urls");
        }
        const isString = typeof urls === "string";
        if (isString) {
          urls = [urls];
        }
        urls = urls.filter((url2) => {
          if (url2.indexOf("stun:") === 0) {
            return false;
          }
          const validTurn = url2.startsWith("turn") && !url2.startsWith("turn:[") && url2.includes("transport=udp");
          if (validTurn && !hasTurn) {
            hasTurn = true;
            return true;
          }
          return validTurn && !hasTurn;
        });
        delete server.url;
        server.urls = isString ? urls[0] : urls;
        return !!urls.length;
      }
    });
  }

  // node_modules/webrtc-adapter/src/js/edge/edge_shim.js
  var import_rtcpeerconnection_shim = __toESM(require_rtcpeerconnection());

  // node_modules/webrtc-adapter/src/js/edge/getusermedia.js
  function shimGetUserMedia2(window2) {
    const navigator2 = window2 && window2.navigator;
    const shimError_ = function(e) {
      return {
        name: { PermissionDeniedError: "NotAllowedError" }[e.name] || e.name,
        message: e.message,
        constraint: e.constraint,
        toString() {
          return this.name;
        }
      };
    };
    const origGetUserMedia = navigator2.mediaDevices.getUserMedia.bind(navigator2.mediaDevices);
    navigator2.mediaDevices.getUserMedia = function(c) {
      return origGetUserMedia(c).catch((e) => Promise.reject(shimError_(e)));
    };
  }

  // node_modules/webrtc-adapter/src/js/edge/getdisplaymedia.js
  function shimGetDisplayMedia2(window2) {
    if (!("getDisplayMedia" in window2.navigator)) {
      return;
    }
    if (!window2.navigator.mediaDevices) {
      return;
    }
    if (window2.navigator.mediaDevices && "getDisplayMedia" in window2.navigator.mediaDevices) {
      return;
    }
    window2.navigator.mediaDevices.getDisplayMedia = window2.navigator.getDisplayMedia.bind(window2.navigator);
  }

  // node_modules/webrtc-adapter/src/js/edge/edge_shim.js
  function shimPeerConnection2(window2, browserDetails) {
    if (window2.RTCIceGatherer) {
      if (!window2.RTCIceCandidate) {
        window2.RTCIceCandidate = function RTCIceCandidate2(args) {
          return args;
        };
      }
      if (!window2.RTCSessionDescription) {
        window2.RTCSessionDescription = function RTCSessionDescription2(args) {
          return args;
        };
      }
      if (browserDetails.version < 15025) {
        const origMSTEnabled = Object.getOwnPropertyDescriptor(
          window2.MediaStreamTrack.prototype,
          "enabled"
        );
        Object.defineProperty(window2.MediaStreamTrack.prototype, "enabled", {
          set(value2) {
            origMSTEnabled.set.call(this, value2);
            const ev = new Event("enabled");
            ev.enabled = value2;
            this.dispatchEvent(ev);
          }
        });
      }
    }
    if (window2.RTCRtpSender && !("dtmf" in window2.RTCRtpSender.prototype)) {
      Object.defineProperty(window2.RTCRtpSender.prototype, "dtmf", {
        get() {
          if (this._dtmf === void 0) {
            if (this.track.kind === "audio") {
              this._dtmf = new window2.RTCDtmfSender(this);
            } else if (this.track.kind === "video") {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }
    if (window2.RTCDtmfSender && !window2.RTCDTMFSender) {
      window2.RTCDTMFSender = window2.RTCDtmfSender;
    }
    const RTCPeerConnectionShim = (0, import_rtcpeerconnection_shim.default)(
      window2,
      browserDetails.version
    );
    window2.RTCPeerConnection = function RTCPeerConnection2(config) {
      if (config && config.iceServers) {
        config.iceServers = filterIceServers(
          config.iceServers,
          browserDetails.version
        );
        log("ICE servers after filtering:", config.iceServers);
      }
      return new RTCPeerConnectionShim(config);
    };
    window2.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
  }
  function shimReplaceTrack(window2) {
    if (window2.RTCRtpSender && !("replaceTrack" in window2.RTCRtpSender.prototype)) {
      window2.RTCRtpSender.prototype.replaceTrack = window2.RTCRtpSender.prototype.setTrack;
    }
  }

  // node_modules/webrtc-adapter/src/js/firefox/firefox_shim.js
  var firefox_shim_exports = {};
  __export(firefox_shim_exports, {
    shimAddTransceiver: () => shimAddTransceiver,
    shimCreateAnswer: () => shimCreateAnswer,
    shimCreateOffer: () => shimCreateOffer,
    shimGetDisplayMedia: () => shimGetDisplayMedia3,
    shimGetParameters: () => shimGetParameters,
    shimGetUserMedia: () => shimGetUserMedia3,
    shimOnTrack: () => shimOnTrack2,
    shimPeerConnection: () => shimPeerConnection3,
    shimRTCDataChannel: () => shimRTCDataChannel,
    shimReceiverGetStats: () => shimReceiverGetStats,
    shimRemoveStream: () => shimRemoveStream,
    shimSenderGetStats: () => shimSenderGetStats
  });

  // node_modules/webrtc-adapter/src/js/firefox/getusermedia.js
  function shimGetUserMedia3(window2, browserDetails) {
    const navigator2 = window2 && window2.navigator;
    const MediaStreamTrack = window2 && window2.MediaStreamTrack;
    navigator2.getUserMedia = function(constraints, onSuccess, onError) {
      deprecated(
        "navigator.getUserMedia",
        "navigator.mediaDevices.getUserMedia"
      );
      navigator2.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    };
    if (!(browserDetails.version > 55 && "autoGainControl" in navigator2.mediaDevices.getSupportedConstraints())) {
      const remap = function(obj, a, b) {
        if (a in obj && !(b in obj)) {
          obj[b] = obj[a];
          delete obj[a];
        }
      };
      const nativeGetUserMedia = navigator2.mediaDevices.getUserMedia.bind(navigator2.mediaDevices);
      navigator2.mediaDevices.getUserMedia = function(c) {
        if (typeof c === "object" && typeof c.audio === "object") {
          c = JSON.parse(JSON.stringify(c));
          remap(c.audio, "autoGainControl", "mozAutoGainControl");
          remap(c.audio, "noiseSuppression", "mozNoiseSuppression");
        }
        return nativeGetUserMedia(c);
      };
      if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
        const nativeGetSettings = MediaStreamTrack.prototype.getSettings;
        MediaStreamTrack.prototype.getSettings = function() {
          const obj = nativeGetSettings.apply(this, arguments);
          remap(obj, "mozAutoGainControl", "autoGainControl");
          remap(obj, "mozNoiseSuppression", "noiseSuppression");
          return obj;
        };
      }
      if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
        const nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
        MediaStreamTrack.prototype.applyConstraints = function(c) {
          if (this.kind === "audio" && typeof c === "object") {
            c = JSON.parse(JSON.stringify(c));
            remap(c, "autoGainControl", "mozAutoGainControl");
            remap(c, "noiseSuppression", "mozNoiseSuppression");
          }
          return nativeApplyConstraints.apply(this, [c]);
        };
      }
    }
  }

  // node_modules/webrtc-adapter/src/js/firefox/getdisplaymedia.js
  function shimGetDisplayMedia3(window2, preferredMediaSource) {
    if (window2.navigator.mediaDevices && "getDisplayMedia" in window2.navigator.mediaDevices) {
      return;
    }
    if (!window2.navigator.mediaDevices) {
      return;
    }
    window2.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
      if (!(constraints && constraints.video)) {
        const err = new DOMException("getDisplayMedia without video constraints is undefined");
        err.name = "NotFoundError";
        err.code = 8;
        return Promise.reject(err);
      }
      if (constraints.video === true) {
        constraints.video = { mediaSource: preferredMediaSource };
      } else {
        constraints.video.mediaSource = preferredMediaSource;
      }
      return window2.navigator.mediaDevices.getUserMedia(constraints);
    };
  }

  // node_modules/webrtc-adapter/src/js/firefox/firefox_shim.js
  function shimOnTrack2(window2) {
    if (typeof window2 === "object" && window2.RTCTrackEvent && "receiver" in window2.RTCTrackEvent.prototype && !("transceiver" in window2.RTCTrackEvent.prototype)) {
      Object.defineProperty(window2.RTCTrackEvent.prototype, "transceiver", {
        get() {
          return { receiver: this.receiver };
        }
      });
    }
  }
  function shimPeerConnection3(window2, browserDetails) {
    if (typeof window2 !== "object" || !(window2.RTCPeerConnection || window2.mozRTCPeerConnection)) {
      return;
    }
    if (!window2.RTCPeerConnection && window2.mozRTCPeerConnection) {
      window2.RTCPeerConnection = window2.mozRTCPeerConnection;
    }
    if (browserDetails.version < 53) {
      ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(method) {
        const nativeMethod = window2.RTCPeerConnection.prototype[method];
        const methodObj = { [method]() {
          arguments[0] = new (method === "addIceCandidate" ? window2.RTCIceCandidate : window2.RTCSessionDescription)(arguments[0]);
          return nativeMethod.apply(this, arguments);
        } };
        window2.RTCPeerConnection.prototype[method] = methodObj[method];
      });
    }
    const modernStatsTypes = {
      inboundrtp: "inbound-rtp",
      outboundrtp: "outbound-rtp",
      candidatepair: "candidate-pair",
      localcandidate: "local-candidate",
      remotecandidate: "remote-candidate"
    };
    const nativeGetStats = window2.RTCPeerConnection.prototype.getStats;
    window2.RTCPeerConnection.prototype.getStats = function getStats() {
      const [selector, onSucc, onErr] = arguments;
      return nativeGetStats.apply(this, [selector || null]).then((stats) => {
        if (browserDetails.version < 53 && !onSucc) {
          try {
            stats.forEach((stat) => {
              stat.type = modernStatsTypes[stat.type] || stat.type;
            });
          } catch (e) {
            if (e.name !== "TypeError") {
              throw e;
            }
            stats.forEach((stat, i2) => {
              stats.set(i2, Object.assign({}, stat, {
                type: modernStatsTypes[stat.type] || stat.type
              }));
            });
          }
        }
        return stats;
      }).then(onSucc, onErr);
    };
  }
  function shimSenderGetStats(window2) {
    if (!(typeof window2 === "object" && window2.RTCPeerConnection && window2.RTCRtpSender)) {
      return;
    }
    if (window2.RTCRtpSender && "getStats" in window2.RTCRtpSender.prototype) {
      return;
    }
    const origGetSenders = window2.RTCPeerConnection.prototype.getSenders;
    if (origGetSenders) {
      window2.RTCPeerConnection.prototype.getSenders = function getSenders() {
        const senders = origGetSenders.apply(this, []);
        senders.forEach((sender) => sender._pc = this);
        return senders;
      };
    }
    const origAddTrack = window2.RTCPeerConnection.prototype.addTrack;
    if (origAddTrack) {
      window2.RTCPeerConnection.prototype.addTrack = function addTrack() {
        const sender = origAddTrack.apply(this, arguments);
        sender._pc = this;
        return sender;
      };
    }
    window2.RTCRtpSender.prototype.getStats = function getStats() {
      return this.track ? this._pc.getStats(this.track) : Promise.resolve(/* @__PURE__ */ new Map());
    };
  }
  function shimReceiverGetStats(window2) {
    if (!(typeof window2 === "object" && window2.RTCPeerConnection && window2.RTCRtpSender)) {
      return;
    }
    if (window2.RTCRtpSender && "getStats" in window2.RTCRtpReceiver.prototype) {
      return;
    }
    const origGetReceivers = window2.RTCPeerConnection.prototype.getReceivers;
    if (origGetReceivers) {
      window2.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
        const receivers = origGetReceivers.apply(this, []);
        receivers.forEach((receiver) => receiver._pc = this);
        return receivers;
      };
    }
    wrapPeerConnectionEvent(window2, "track", (e) => {
      e.receiver._pc = e.srcElement;
      return e;
    });
    window2.RTCRtpReceiver.prototype.getStats = function getStats() {
      return this._pc.getStats(this.track);
    };
  }
  function shimRemoveStream(window2) {
    if (!window2.RTCPeerConnection || "removeStream" in window2.RTCPeerConnection.prototype) {
      return;
    }
    window2.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      deprecated("removeStream", "removeTrack");
      this.getSenders().forEach((sender) => {
        if (sender.track && stream.getTracks().includes(sender.track)) {
          this.removeTrack(sender);
        }
      });
    };
  }
  function shimRTCDataChannel(window2) {
    if (window2.DataChannel && !window2.RTCDataChannel) {
      window2.RTCDataChannel = window2.DataChannel;
    }
  }
  function shimAddTransceiver(window2) {
    if (!(typeof window2 === "object" && window2.RTCPeerConnection)) {
      return;
    }
    const origAddTransceiver = window2.RTCPeerConnection.prototype.addTransceiver;
    if (origAddTransceiver) {
      window2.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
        this.setParametersPromises = [];
        const initParameters = arguments[1];
        const shouldPerformCheck = initParameters && "sendEncodings" in initParameters;
        if (shouldPerformCheck) {
          initParameters.sendEncodings.forEach((encodingParam) => {
            if ("rid" in encodingParam) {
              const ridRegex = /^[a-z0-9]{0,16}$/i;
              if (!ridRegex.test(encodingParam.rid)) {
                throw new TypeError("Invalid RID value provided.");
              }
            }
            if ("scaleResolutionDownBy" in encodingParam) {
              if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1)) {
                throw new RangeError("scale_resolution_down_by must be >= 1.0");
              }
            }
            if ("maxFramerate" in encodingParam) {
              if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
                throw new RangeError("max_framerate must be >= 0.0");
              }
            }
          });
        }
        const transceiver = origAddTransceiver.apply(this, arguments);
        if (shouldPerformCheck) {
          const { sender } = transceiver;
          const params = sender.getParameters();
          if (!("encodings" in params) || params.encodings.length === 1 && Object.keys(params.encodings[0]).length === 0) {
            params.encodings = initParameters.sendEncodings;
            sender.sendEncodings = initParameters.sendEncodings;
            this.setParametersPromises.push(
              sender.setParameters(params).then(() => {
                delete sender.sendEncodings;
              }).catch(() => {
                delete sender.sendEncodings;
              })
            );
          }
        }
        return transceiver;
      };
    }
  }
  function shimGetParameters(window2) {
    if (!(typeof window2 === "object" && window2.RTCRtpSender)) {
      return;
    }
    const origGetParameters = window2.RTCRtpSender.prototype.getParameters;
    if (origGetParameters) {
      window2.RTCRtpSender.prototype.getParameters = function getParameters() {
        const params = origGetParameters.apply(this, arguments);
        if (!("encodings" in params)) {
          params.encodings = [].concat(this.sendEncodings || [{}]);
        }
        return params;
      };
    }
  }
  function shimCreateOffer(window2) {
    if (!(typeof window2 === "object" && window2.RTCPeerConnection)) {
      return;
    }
    const origCreateOffer = window2.RTCPeerConnection.prototype.createOffer;
    window2.RTCPeerConnection.prototype.createOffer = function createOffer() {
      if (this.setParametersPromises && this.setParametersPromises.length) {
        return Promise.all(this.setParametersPromises).then(() => {
          return origCreateOffer.apply(this, arguments);
        }).finally(() => {
          this.setParametersPromises = [];
        });
      }
      return origCreateOffer.apply(this, arguments);
    };
  }
  function shimCreateAnswer(window2) {
    if (!(typeof window2 === "object" && window2.RTCPeerConnection)) {
      return;
    }
    const origCreateAnswer = window2.RTCPeerConnection.prototype.createAnswer;
    window2.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
      if (this.setParametersPromises && this.setParametersPromises.length) {
        return Promise.all(this.setParametersPromises).then(() => {
          return origCreateAnswer.apply(this, arguments);
        }).finally(() => {
          this.setParametersPromises = [];
        });
      }
      return origCreateAnswer.apply(this, arguments);
    };
  }

  // node_modules/webrtc-adapter/src/js/safari/safari_shim.js
  var safari_shim_exports = {};
  __export(safari_shim_exports, {
    shimAudioContext: () => shimAudioContext,
    shimCallbacksAPI: () => shimCallbacksAPI,
    shimConstraints: () => shimConstraints,
    shimCreateOfferLegacy: () => shimCreateOfferLegacy,
    shimGetUserMedia: () => shimGetUserMedia4,
    shimLocalStreamsAPI: () => shimLocalStreamsAPI,
    shimRTCIceServerUrls: () => shimRTCIceServerUrls,
    shimRemoteStreamsAPI: () => shimRemoteStreamsAPI,
    shimTrackEventTransceiver: () => shimTrackEventTransceiver
  });
  function shimLocalStreamsAPI(window2) {
    if (typeof window2 !== "object" || !window2.RTCPeerConnection) {
      return;
    }
    if (!("getLocalStreams" in window2.RTCPeerConnection.prototype)) {
      window2.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        return this._localStreams;
      };
    }
    if (!("addStream" in window2.RTCPeerConnection.prototype)) {
      const _addTrack = window2.RTCPeerConnection.prototype.addTrack;
      window2.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        if (!this._localStreams.includes(stream)) {
          this._localStreams.push(stream);
        }
        stream.getAudioTracks().forEach((track) => _addTrack.call(
          this,
          track,
          stream
        ));
        stream.getVideoTracks().forEach((track) => _addTrack.call(
          this,
          track,
          stream
        ));
      };
      window2.RTCPeerConnection.prototype.addTrack = function addTrack(track, ...streams) {
        if (streams) {
          streams.forEach((stream) => {
            if (!this._localStreams) {
              this._localStreams = [stream];
            } else if (!this._localStreams.includes(stream)) {
              this._localStreams.push(stream);
            }
          });
        }
        return _addTrack.apply(this, arguments);
      };
    }
    if (!("removeStream" in window2.RTCPeerConnection.prototype)) {
      window2.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        const index = this._localStreams.indexOf(stream);
        if (index === -1) {
          return;
        }
        this._localStreams.splice(index, 1);
        const tracks = stream.getTracks();
        this.getSenders().forEach((sender) => {
          if (tracks.includes(sender.track)) {
            this.removeTrack(sender);
          }
        });
      };
    }
  }
  function shimRemoteStreamsAPI(window2) {
    if (typeof window2 !== "object" || !window2.RTCPeerConnection) {
      return;
    }
    if (!("getRemoteStreams" in window2.RTCPeerConnection.prototype)) {
      window2.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
        return this._remoteStreams ? this._remoteStreams : [];
      };
    }
    if (!("onaddstream" in window2.RTCPeerConnection.prototype)) {
      Object.defineProperty(window2.RTCPeerConnection.prototype, "onaddstream", {
        get() {
          return this._onaddstream;
        },
        set(f) {
          if (this._onaddstream) {
            this.removeEventListener("addstream", this._onaddstream);
            this.removeEventListener("track", this._onaddstreampoly);
          }
          this.addEventListener("addstream", this._onaddstream = f);
          this.addEventListener("track", this._onaddstreampoly = (e) => {
            e.streams.forEach((stream) => {
              if (!this._remoteStreams) {
                this._remoteStreams = [];
              }
              if (this._remoteStreams.includes(stream)) {
                return;
              }
              this._remoteStreams.push(stream);
              const event = new Event("addstream");
              event.stream = stream;
              this.dispatchEvent(event);
            });
          });
        }
      });
      const origSetRemoteDescription = window2.RTCPeerConnection.prototype.setRemoteDescription;
      window2.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
        const pc = this;
        if (!this._onaddstreampoly) {
          this.addEventListener("track", this._onaddstreampoly = function(e) {
            e.streams.forEach((stream) => {
              if (!pc._remoteStreams) {
                pc._remoteStreams = [];
              }
              if (pc._remoteStreams.indexOf(stream) >= 0) {
                return;
              }
              pc._remoteStreams.push(stream);
              const event = new Event("addstream");
              event.stream = stream;
              pc.dispatchEvent(event);
            });
          });
        }
        return origSetRemoteDescription.apply(pc, arguments);
      };
    }
  }
  function shimCallbacksAPI(window2) {
    if (typeof window2 !== "object" || !window2.RTCPeerConnection) {
      return;
    }
    const prototype = window2.RTCPeerConnection.prototype;
    const origCreateOffer = prototype.createOffer;
    const origCreateAnswer = prototype.createAnswer;
    const setLocalDescription = prototype.setLocalDescription;
    const setRemoteDescription = prototype.setRemoteDescription;
    const addIceCandidate = prototype.addIceCandidate;
    prototype.createOffer = function createOffer(successCallback, failureCallback) {
      const options = arguments.length >= 2 ? arguments[2] : arguments[0];
      const promise = origCreateOffer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
      const options = arguments.length >= 2 ? arguments[2] : arguments[0];
      const promise = origCreateAnswer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    let withCallback = function(description, successCallback, failureCallback) {
      const promise = setLocalDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setLocalDescription = withCallback;
    withCallback = function(description, successCallback, failureCallback) {
      const promise = setRemoteDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setRemoteDescription = withCallback;
    withCallback = function(candidate, successCallback, failureCallback) {
      const promise = addIceCandidate.apply(this, [candidate]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.addIceCandidate = withCallback;
  }
  function shimGetUserMedia4(window2) {
    const navigator2 = window2 && window2.navigator;
    if (navigator2.mediaDevices && navigator2.mediaDevices.getUserMedia) {
      const mediaDevices = navigator2.mediaDevices;
      const _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
      navigator2.mediaDevices.getUserMedia = (constraints) => {
        return _getUserMedia(shimConstraints(constraints));
      };
    }
    if (!navigator2.getUserMedia && navigator2.mediaDevices && navigator2.mediaDevices.getUserMedia) {
      navigator2.getUserMedia = function getUserMedia2(constraints, cb, errcb) {
        navigator2.mediaDevices.getUserMedia(constraints).then(cb, errcb);
      }.bind(navigator2);
    }
  }
  function shimConstraints(constraints) {
    if (constraints && constraints.video !== void 0) {
      return Object.assign(
        {},
        constraints,
        { video: compactObject(constraints.video) }
      );
    }
    return constraints;
  }
  function shimRTCIceServerUrls(window2) {
    if (!window2.RTCPeerConnection) {
      return;
    }
    const OrigPeerConnection = window2.RTCPeerConnection;
    window2.RTCPeerConnection = function RTCPeerConnection2(pcConfig, pcConstraints) {
      if (pcConfig && pcConfig.iceServers) {
        const newIceServers = [];
        for (let i2 = 0; i2 < pcConfig.iceServers.length; i2++) {
          let server = pcConfig.iceServers[i2];
          if (!server.hasOwnProperty("urls") && server.hasOwnProperty("url")) {
            deprecated("RTCIceServer.url", "RTCIceServer.urls");
            server = JSON.parse(JSON.stringify(server));
            server.urls = server.url;
            delete server.url;
            newIceServers.push(server);
          } else {
            newIceServers.push(pcConfig.iceServers[i2]);
          }
        }
        pcConfig.iceServers = newIceServers;
      }
      return new OrigPeerConnection(pcConfig, pcConstraints);
    };
    window2.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
    if ("generateCertificate" in OrigPeerConnection) {
      Object.defineProperty(window2.RTCPeerConnection, "generateCertificate", {
        get() {
          return OrigPeerConnection.generateCertificate;
        }
      });
    }
  }
  function shimTrackEventTransceiver(window2) {
    if (typeof window2 === "object" && window2.RTCTrackEvent && "receiver" in window2.RTCTrackEvent.prototype && !("transceiver" in window2.RTCTrackEvent.prototype)) {
      Object.defineProperty(window2.RTCTrackEvent.prototype, "transceiver", {
        get() {
          return { receiver: this.receiver };
        }
      });
    }
  }
  function shimCreateOfferLegacy(window2) {
    const origCreateOffer = window2.RTCPeerConnection.prototype.createOffer;
    window2.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
      if (offerOptions) {
        if (typeof offerOptions.offerToReceiveAudio !== "undefined") {
          offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
        }
        const audioTransceiver = this.getTransceivers().find((transceiver) => transceiver.receiver.track.kind === "audio");
        if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
          if (audioTransceiver.direction === "sendrecv") {
            if (audioTransceiver.setDirection) {
              audioTransceiver.setDirection("sendonly");
            } else {
              audioTransceiver.direction = "sendonly";
            }
          } else if (audioTransceiver.direction === "recvonly") {
            if (audioTransceiver.setDirection) {
              audioTransceiver.setDirection("inactive");
            } else {
              audioTransceiver.direction = "inactive";
            }
          }
        } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
          this.addTransceiver("audio");
        }
        if (typeof offerOptions.offerToReceiveVideo !== "undefined") {
          offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
        }
        const videoTransceiver = this.getTransceivers().find((transceiver) => transceiver.receiver.track.kind === "video");
        if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
          if (videoTransceiver.direction === "sendrecv") {
            if (videoTransceiver.setDirection) {
              videoTransceiver.setDirection("sendonly");
            } else {
              videoTransceiver.direction = "sendonly";
            }
          } else if (videoTransceiver.direction === "recvonly") {
            if (videoTransceiver.setDirection) {
              videoTransceiver.setDirection("inactive");
            } else {
              videoTransceiver.direction = "inactive";
            }
          }
        } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
          this.addTransceiver("video");
        }
      }
      return origCreateOffer.apply(this, arguments);
    };
  }
  function shimAudioContext(window2) {
    if (typeof window2 !== "object" || window2.AudioContext) {
      return;
    }
    window2.AudioContext = window2.webkitAudioContext;
  }

  // node_modules/webrtc-adapter/src/js/common_shim.js
  var common_shim_exports = {};
  __export(common_shim_exports, {
    removeExtmapAllowMixed: () => removeExtmapAllowMixed,
    shimAddIceCandidateNullOrEmpty: () => shimAddIceCandidateNullOrEmpty,
    shimConnectionState: () => shimConnectionState,
    shimMaxMessageSize: () => shimMaxMessageSize,
    shimRTCIceCandidate: () => shimRTCIceCandidate,
    shimSendThrowTypeError: () => shimSendThrowTypeError
  });
  var import_sdp = __toESM(require_sdp());
  function shimRTCIceCandidate(window2) {
    if (!window2.RTCIceCandidate || window2.RTCIceCandidate && "foundation" in window2.RTCIceCandidate.prototype) {
      return;
    }
    const NativeRTCIceCandidate = window2.RTCIceCandidate;
    window2.RTCIceCandidate = function RTCIceCandidate2(args) {
      if (typeof args === "object" && args.candidate && args.candidate.indexOf("a=") === 0) {
        args = JSON.parse(JSON.stringify(args));
        args.candidate = args.candidate.substr(2);
      }
      if (args.candidate && args.candidate.length) {
        const nativeCandidate = new NativeRTCIceCandidate(args);
        const parsedCandidate = import_sdp.default.parseCandidate(args.candidate);
        const augmentedCandidate = Object.assign(
          nativeCandidate,
          parsedCandidate
        );
        augmentedCandidate.toJSON = function toJSON() {
          return {
            candidate: augmentedCandidate.candidate,
            sdpMid: augmentedCandidate.sdpMid,
            sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
            usernameFragment: augmentedCandidate.usernameFragment
          };
        };
        return augmentedCandidate;
      }
      return new NativeRTCIceCandidate(args);
    };
    window2.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;
    wrapPeerConnectionEvent(window2, "icecandidate", (e) => {
      if (e.candidate) {
        Object.defineProperty(e, "candidate", {
          value: new window2.RTCIceCandidate(e.candidate),
          writable: "false"
        });
      }
      return e;
    });
  }
  function shimMaxMessageSize(window2, browserDetails) {
    if (!window2.RTCPeerConnection) {
      return;
    }
    if (!("sctp" in window2.RTCPeerConnection.prototype)) {
      Object.defineProperty(window2.RTCPeerConnection.prototype, "sctp", {
        get() {
          return typeof this._sctp === "undefined" ? null : this._sctp;
        }
      });
    }
    const sctpInDescription = function(description) {
      if (!description || !description.sdp) {
        return false;
      }
      const sections = import_sdp.default.splitSections(description.sdp);
      sections.shift();
      return sections.some((mediaSection) => {
        const mLine = import_sdp.default.parseMLine(mediaSection);
        return mLine && mLine.kind === "application" && mLine.protocol.indexOf("SCTP") !== -1;
      });
    };
    const getRemoteFirefoxVersion = function(description) {
      const match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
      if (match === null || match.length < 2) {
        return -1;
      }
      const version = parseInt(match[1], 10);
      return version !== version ? -1 : version;
    };
    const getCanSendMaxMessageSize = function(remoteIsFirefox) {
      let canSendMaxMessageSize = 65536;
      if (browserDetails.browser === "firefox") {
        if (browserDetails.version < 57) {
          if (remoteIsFirefox === -1) {
            canSendMaxMessageSize = 16384;
          } else {
            canSendMaxMessageSize = 2147483637;
          }
        } else if (browserDetails.version < 60) {
          canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
        } else {
          canSendMaxMessageSize = 2147483637;
        }
      }
      return canSendMaxMessageSize;
    };
    const getMaxMessageSize = function(description, remoteIsFirefox) {
      let maxMessageSize = 65536;
      if (browserDetails.browser === "firefox" && browserDetails.version === 57) {
        maxMessageSize = 65535;
      }
      const match = import_sdp.default.matchPrefix(
        description.sdp,
        "a=max-message-size:"
      );
      if (match.length > 0) {
        maxMessageSize = parseInt(match[0].substr(19), 10);
      } else if (browserDetails.browser === "firefox" && remoteIsFirefox !== -1) {
        maxMessageSize = 2147483637;
      }
      return maxMessageSize;
    };
    const origSetRemoteDescription = window2.RTCPeerConnection.prototype.setRemoteDescription;
    window2.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
      this._sctp = null;
      if (browserDetails.browser === "chrome" && browserDetails.version >= 76) {
        const { sdpSemantics } = this.getConfiguration();
        if (sdpSemantics === "plan-b") {
          Object.defineProperty(this, "sctp", {
            get() {
              return typeof this._sctp === "undefined" ? null : this._sctp;
            },
            enumerable: true,
            configurable: true
          });
        }
      }
      if (sctpInDescription(arguments[0])) {
        const isFirefox = getRemoteFirefoxVersion(arguments[0]);
        const canSendMMS = getCanSendMaxMessageSize(isFirefox);
        const remoteMMS = getMaxMessageSize(arguments[0], isFirefox);
        let maxMessageSize;
        if (canSendMMS === 0 && remoteMMS === 0) {
          maxMessageSize = Number.POSITIVE_INFINITY;
        } else if (canSendMMS === 0 || remoteMMS === 0) {
          maxMessageSize = Math.max(canSendMMS, remoteMMS);
        } else {
          maxMessageSize = Math.min(canSendMMS, remoteMMS);
        }
        const sctp = {};
        Object.defineProperty(sctp, "maxMessageSize", {
          get() {
            return maxMessageSize;
          }
        });
        this._sctp = sctp;
      }
      return origSetRemoteDescription.apply(this, arguments);
    };
  }
  function shimSendThrowTypeError(window2) {
    if (!(window2.RTCPeerConnection && "createDataChannel" in window2.RTCPeerConnection.prototype)) {
      return;
    }
    function wrapDcSend(dc, pc) {
      const origDataChannelSend = dc.send;
      dc.send = function send() {
        const data = arguments[0];
        const length2 = data.length || data.size || data.byteLength;
        if (dc.readyState === "open" && pc.sctp && length2 > pc.sctp.maxMessageSize) {
          throw new TypeError("Message too large (can send a maximum of " + pc.sctp.maxMessageSize + " bytes)");
        }
        return origDataChannelSend.apply(dc, arguments);
      };
    }
    const origCreateDataChannel = window2.RTCPeerConnection.prototype.createDataChannel;
    window2.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
      const dataChannel = origCreateDataChannel.apply(this, arguments);
      wrapDcSend(dataChannel, this);
      return dataChannel;
    };
    wrapPeerConnectionEvent(window2, "datachannel", (e) => {
      wrapDcSend(e.channel, e.target);
      return e;
    });
  }
  function shimConnectionState(window2) {
    if (!window2.RTCPeerConnection || "connectionState" in window2.RTCPeerConnection.prototype) {
      return;
    }
    const proto = window2.RTCPeerConnection.prototype;
    Object.defineProperty(proto, "connectionState", {
      get() {
        return {
          completed: "connected",
          checking: "connecting"
        }[this.iceConnectionState] || this.iceConnectionState;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(proto, "onconnectionstatechange", {
      get() {
        return this._onconnectionstatechange || null;
      },
      set(cb) {
        if (this._onconnectionstatechange) {
          this.removeEventListener(
            "connectionstatechange",
            this._onconnectionstatechange
          );
          delete this._onconnectionstatechange;
        }
        if (cb) {
          this.addEventListener(
            "connectionstatechange",
            this._onconnectionstatechange = cb
          );
        }
      },
      enumerable: true,
      configurable: true
    });
    ["setLocalDescription", "setRemoteDescription"].forEach((method) => {
      const origMethod = proto[method];
      proto[method] = function() {
        if (!this._connectionstatechangepoly) {
          this._connectionstatechangepoly = (e) => {
            const pc = e.target;
            if (pc._lastConnectionState !== pc.connectionState) {
              pc._lastConnectionState = pc.connectionState;
              const newEvent = new Event("connectionstatechange", e);
              pc.dispatchEvent(newEvent);
            }
            return e;
          };
          this.addEventListener(
            "iceconnectionstatechange",
            this._connectionstatechangepoly
          );
        }
        return origMethod.apply(this, arguments);
      };
    });
  }
  function removeExtmapAllowMixed(window2, browserDetails) {
    if (!window2.RTCPeerConnection) {
      return;
    }
    if (browserDetails.browser === "chrome" && browserDetails.version >= 71) {
      return;
    }
    if (browserDetails.browser === "safari" && browserDetails.version >= 605) {
      return;
    }
    const nativeSRD = window2.RTCPeerConnection.prototype.setRemoteDescription;
    window2.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
      if (desc && desc.sdp && desc.sdp.indexOf("\na=extmap-allow-mixed") !== -1) {
        const sdp = desc.sdp.split("\n").filter((line) => {
          return line.trim() !== "a=extmap-allow-mixed";
        }).join("\n");
        if (window2.RTCSessionDescription && desc instanceof window2.RTCSessionDescription) {
          arguments[0] = new window2.RTCSessionDescription({
            type: desc.type,
            sdp
          });
        } else {
          desc.sdp = sdp;
        }
      }
      return nativeSRD.apply(this, arguments);
    };
  }
  function shimAddIceCandidateNullOrEmpty(window2, browserDetails) {
    if (!(window2.RTCPeerConnection && window2.RTCPeerConnection.prototype)) {
      return;
    }
    const nativeAddIceCandidate = window2.RTCPeerConnection.prototype.addIceCandidate;
    if (!nativeAddIceCandidate || nativeAddIceCandidate.length === 0) {
      return;
    }
    window2.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
      if (!arguments[0]) {
        if (arguments[1]) {
          arguments[1].apply(null);
        }
        return Promise.resolve();
      }
      if ((browserDetails.browser === "chrome" && browserDetails.version < 78 || browserDetails.browser === "firefox" && browserDetails.version < 68 || browserDetails.browser === "safari") && arguments[0] && arguments[0].candidate === "") {
        return Promise.resolve();
      }
      return nativeAddIceCandidate.apply(this, arguments);
    };
  }

  // node_modules/webrtc-adapter/src/js/adapter_factory.js
  function adapterFactory({ window: window2 } = {}, options = {
    shimChrome: true,
    shimFirefox: true,
    shimEdge: true,
    shimSafari: true
  }) {
    const logging2 = log;
    const browserDetails = detectBrowser(window2);
    const adapter2 = {
      browserDetails,
      commonShim: common_shim_exports,
      extractVersion,
      disableLog,
      disableWarnings
    };
    switch (browserDetails.browser) {
      case "chrome":
        if (!chrome_shim_exports || !shimPeerConnection || !options.shimChrome) {
          logging2("Chrome shim is not included in this adapter release.");
          return adapter2;
        }
        if (browserDetails.version === null) {
          logging2("Chrome shim can not determine version, not shimming.");
          return adapter2;
        }
        logging2("adapter.js shimming chrome.");
        adapter2.browserShim = chrome_shim_exports;
        shimAddIceCandidateNullOrEmpty(window2, browserDetails);
        shimGetUserMedia(window2, browserDetails);
        shimMediaStream(window2, browserDetails);
        shimPeerConnection(window2, browserDetails);
        shimOnTrack(window2, browserDetails);
        shimAddTrackRemoveTrack(window2, browserDetails);
        shimGetSendersWithDtmf(window2, browserDetails);
        shimGetStats(window2, browserDetails);
        shimSenderReceiverGetStats(window2, browserDetails);
        fixNegotiationNeeded(window2, browserDetails);
        shimRTCIceCandidate(window2, browserDetails);
        shimConnectionState(window2, browserDetails);
        shimMaxMessageSize(window2, browserDetails);
        shimSendThrowTypeError(window2, browserDetails);
        removeExtmapAllowMixed(window2, browserDetails);
        break;
      case "firefox":
        if (!firefox_shim_exports || !shimPeerConnection3 || !options.shimFirefox) {
          logging2("Firefox shim is not included in this adapter release.");
          return adapter2;
        }
        logging2("adapter.js shimming firefox.");
        adapter2.browserShim = firefox_shim_exports;
        shimAddIceCandidateNullOrEmpty(window2, browserDetails);
        shimGetUserMedia3(window2, browserDetails);
        shimPeerConnection3(window2, browserDetails);
        shimOnTrack2(window2, browserDetails);
        shimRemoveStream(window2, browserDetails);
        shimSenderGetStats(window2, browserDetails);
        shimReceiverGetStats(window2, browserDetails);
        shimRTCDataChannel(window2, browserDetails);
        shimAddTransceiver(window2, browserDetails);
        shimGetParameters(window2, browserDetails);
        shimCreateOffer(window2, browserDetails);
        shimCreateAnswer(window2, browserDetails);
        shimRTCIceCandidate(window2, browserDetails);
        shimConnectionState(window2, browserDetails);
        shimMaxMessageSize(window2, browserDetails);
        shimSendThrowTypeError(window2, browserDetails);
        break;
      case "edge":
        if (!edge_shim_exports || !shimPeerConnection2 || !options.shimEdge) {
          logging2("MS edge shim is not included in this adapter release.");
          return adapter2;
        }
        logging2("adapter.js shimming edge.");
        adapter2.browserShim = edge_shim_exports;
        shimGetUserMedia2(window2, browserDetails);
        shimGetDisplayMedia2(window2, browserDetails);
        shimPeerConnection2(window2, browserDetails);
        shimReplaceTrack(window2, browserDetails);
        shimMaxMessageSize(window2, browserDetails);
        shimSendThrowTypeError(window2, browserDetails);
        break;
      case "safari":
        if (!safari_shim_exports || !options.shimSafari) {
          logging2("Safari shim is not included in this adapter release.");
          return adapter2;
        }
        logging2("adapter.js shimming safari.");
        adapter2.browserShim = safari_shim_exports;
        shimAddIceCandidateNullOrEmpty(window2, browserDetails);
        shimRTCIceServerUrls(window2, browserDetails);
        shimCreateOfferLegacy(window2, browserDetails);
        shimCallbacksAPI(window2, browserDetails);
        shimLocalStreamsAPI(window2, browserDetails);
        shimRemoteStreamsAPI(window2, browserDetails);
        shimTrackEventTransceiver(window2, browserDetails);
        shimGetUserMedia4(window2, browserDetails);
        shimAudioContext(window2, browserDetails);
        shimRTCIceCandidate(window2, browserDetails);
        shimMaxMessageSize(window2, browserDetails);
        shimSendThrowTypeError(window2, browserDetails);
        removeExtmapAllowMixed(window2, browserDetails);
        break;
      default:
        logging2("Unsupported browser!");
        break;
    }
    return adapter2;
  }

  // node_modules/webrtc-adapter/src/js/adapter_core.js
  var adapter = adapterFactory({ window: typeof window === "undefined" ? void 0 : window });
  var adapter_core_default = adapter;

  // node_modules/peerjs/dist/bundler.mjs
  function $parcel$export(e, n, v, s) {
    Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
  }
  var $af8cf1f663f490f4$var$webRTCAdapter = adapter_core_default.default || adapter_core_default;
  var $af8cf1f663f490f4$export$25be9502477c137d = new (function() {
    function class_1() {
      this.isIOS = [
        "iPad",
        "iPhone",
        "iPod"
      ].includes(navigator.platform);
      this.supportedBrowsers = [
        "firefox",
        "chrome",
        "safari"
      ];
      this.minFirefoxVersion = 59;
      this.minChromeVersion = 72;
      this.minSafariVersion = 605;
    }
    class_1.prototype.isWebRTCSupported = function() {
      return typeof RTCPeerConnection !== "undefined";
    };
    class_1.prototype.isBrowserSupported = function() {
      var browser = this.getBrowser();
      var version = this.getVersion();
      var validBrowser = this.supportedBrowsers.includes(browser);
      if (!validBrowser)
        return false;
      if (browser === "chrome")
        return version >= this.minChromeVersion;
      if (browser === "firefox")
        return version >= this.minFirefoxVersion;
      if (browser === "safari")
        return !this.isIOS && version >= this.minSafariVersion;
      return false;
    };
    class_1.prototype.getBrowser = function() {
      return $af8cf1f663f490f4$var$webRTCAdapter.browserDetails.browser;
    };
    class_1.prototype.getVersion = function() {
      return $af8cf1f663f490f4$var$webRTCAdapter.browserDetails.version || 0;
    };
    class_1.prototype.isUnifiedPlanSupported = function() {
      var browser = this.getBrowser();
      var version = $af8cf1f663f490f4$var$webRTCAdapter.browserDetails.version || 0;
      if (browser === "chrome" && version < this.minChromeVersion)
        return false;
      if (browser === "firefox" && version >= this.minFirefoxVersion)
        return true;
      if (!window.RTCRtpTransceiver || !("currentDirection" in RTCRtpTransceiver.prototype))
        return false;
      var tempPc;
      var supported = false;
      try {
        tempPc = new RTCPeerConnection();
        tempPc.addTransceiver("audio");
        supported = true;
      } catch (e) {
      } finally {
        if (tempPc)
          tempPc.close();
      }
      return supported;
    };
    class_1.prototype.toString = function() {
      return "Supports:\n    browser:".concat(this.getBrowser(), "\n    version:").concat(this.getVersion(), "\n    isIOS:").concat(this.isIOS, "\n    isWebRTCSupported:").concat(this.isWebRTCSupported(), "\n    isBrowserSupported:").concat(this.isBrowserSupported(), "\n    isUnifiedPlanSupported:").concat(this.isUnifiedPlanSupported());
    };
    return class_1;
  }())();
  var $06cb531ed7840f78$var$DEFAULT_CONFIG = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302"
      },
      {
        urls: [
          "turn:eu-0.turn.peerjs.com:3478",
          "turn:us-0.turn.peerjs.com:3478"
        ],
        username: "peerjs",
        credential: "peerjsp"
      }
    ],
    sdpSemantics: "unified-plan"
  };
  var $06cb531ed7840f78$var$Util = function() {
    function Util() {
      this.CLOUD_HOST = "0.peerjs.com";
      this.CLOUD_PORT = 443;
      this.chunkedBrowsers = {
        Chrome: 1,
        chrome: 1
      };
      this.chunkedMTU = 16300;
      this.defaultConfig = $06cb531ed7840f78$var$DEFAULT_CONFIG;
      this.browser = $af8cf1f663f490f4$export$25be9502477c137d.getBrowser();
      this.browserVersion = $af8cf1f663f490f4$export$25be9502477c137d.getVersion();
      this.supports = function() {
        var supported = {
          browser: $af8cf1f663f490f4$export$25be9502477c137d.isBrowserSupported(),
          webRTC: $af8cf1f663f490f4$export$25be9502477c137d.isWebRTCSupported(),
          audioVideo: false,
          data: false,
          binaryBlob: false,
          reliable: false
        };
        if (!supported.webRTC)
          return supported;
        var pc;
        try {
          pc = new RTCPeerConnection($06cb531ed7840f78$var$DEFAULT_CONFIG);
          supported.audioVideo = true;
          var dc = void 0;
          try {
            dc = pc.createDataChannel("_PEERJSTEST", {
              ordered: true
            });
            supported.data = true;
            supported.reliable = !!dc.ordered;
            try {
              dc.binaryType = "blob";
              supported.binaryBlob = !$af8cf1f663f490f4$export$25be9502477c137d.isIOS;
            } catch (e) {
            }
          } catch (e) {
          } finally {
            if (dc)
              dc.close();
          }
        } catch (e) {
        } finally {
          if (pc)
            pc.close();
        }
        return supported;
      }();
      this.pack = import_peerjs_js_binarypack.default.pack;
      this.unpack = import_peerjs_js_binarypack.default.unpack;
      this._dataCount = 1;
    }
    Util.prototype.noop = function() {
    };
    Util.prototype.validateId = function(id) {
      return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(id);
    };
    Util.prototype.chunk = function(blob) {
      var chunks = [];
      var size = blob.size;
      var total = Math.ceil(size / $06cb531ed7840f78$export$7debb50ef11d5e0b.chunkedMTU);
      var index = 0;
      var start = 0;
      while (start < size) {
        var end = Math.min(size, start + $06cb531ed7840f78$export$7debb50ef11d5e0b.chunkedMTU);
        var b = blob.slice(start, end);
        var chunk = {
          __peerData: this._dataCount,
          n: index,
          data: b,
          total
        };
        chunks.push(chunk);
        start = end;
        index++;
      }
      this._dataCount++;
      return chunks;
    };
    Util.prototype.blobToArrayBuffer = function(blob, cb) {
      var fr = new FileReader();
      fr.onload = function(evt) {
        if (evt.target)
          cb(evt.target.result);
      };
      fr.readAsArrayBuffer(blob);
      return fr;
    };
    Util.prototype.binaryStringToArrayBuffer = function(binary) {
      var byteArray = new Uint8Array(binary.length);
      for (var i2 = 0; i2 < binary.length; i2++)
        byteArray[i2] = binary.charCodeAt(i2) & 255;
      return byteArray.buffer;
    };
    Util.prototype.randomToken = function() {
      return Math.random().toString(36).slice(2);
    };
    Util.prototype.isSecure = function() {
      return location.protocol === "https:";
    };
    return Util;
  }();
  var $06cb531ed7840f78$export$7debb50ef11d5e0b = new $06cb531ed7840f78$var$Util();
  var $26088d7da5b03f69$exports = {};
  $parcel$export($26088d7da5b03f69$exports, "Peer", () => $26088d7da5b03f69$export$ecd1fc136c422448, (v) => $26088d7da5b03f69$export$ecd1fc136c422448 = v);
  var $ac9b757d51178e15$exports = {};
  var $ac9b757d51178e15$var$has = Object.prototype.hasOwnProperty;
  var $ac9b757d51178e15$var$prefix = "~";
  function $ac9b757d51178e15$var$Events() {
  }
  if (Object.create) {
    $ac9b757d51178e15$var$Events.prototype = /* @__PURE__ */ Object.create(null);
    if (!new $ac9b757d51178e15$var$Events().__proto__)
      $ac9b757d51178e15$var$prefix = false;
  }
  function $ac9b757d51178e15$var$EE(fn, context, once2) {
    this.fn = fn;
    this.context = context;
    this.once = once2 || false;
  }
  function $ac9b757d51178e15$var$addListener(emitter, event, fn, context, once2) {
    if (typeof fn !== "function")
      throw new TypeError("The listener must be a function");
    var listener = new $ac9b757d51178e15$var$EE(fn, context || emitter, once2), evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [
        emitter._events[evt],
        listener
      ];
    return emitter;
  }
  function $ac9b757d51178e15$var$clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new $ac9b757d51178e15$var$Events();
    else
      delete emitter._events[evt];
  }
  function $ac9b757d51178e15$var$EventEmitter() {
    this._events = new $ac9b757d51178e15$var$Events();
    this._eventsCount = 0;
  }
  $ac9b757d51178e15$var$EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events)
      if ($ac9b757d51178e15$var$has.call(events, name))
        names.push($ac9b757d51178e15$var$prefix ? name.slice(1) : name);
    if (Object.getOwnPropertySymbols)
      return names.concat(Object.getOwnPropertySymbols(events));
    return names;
  };
  $ac9b757d51178e15$var$EventEmitter.prototype.listeners = function listeners(event) {
    var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [
        handlers.fn
      ];
    for (var i2 = 0, l = handlers.length, ee = new Array(l); i2 < l; i2++)
      ee[i2] = handlers[i2].fn;
    return ee;
  };
  $ac9b757d51178e15$var$EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event, listeners2 = this._events[evt];
    if (!listeners2)
      return 0;
    if (listeners2.fn)
      return 1;
    return listeners2.length;
  };
  $ac9b757d51178e15$var$EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners2 = this._events[evt], len = arguments.length, args, i2;
    if (listeners2.fn) {
      if (listeners2.once)
        this.removeListener(event, listeners2.fn, void 0, true);
      switch (len) {
        case 1:
          return listeners2.fn.call(listeners2.context), true;
        case 2:
          return listeners2.fn.call(listeners2.context, a1), true;
        case 3:
          return listeners2.fn.call(listeners2.context, a1, a2), true;
        case 4:
          return listeners2.fn.call(listeners2.context, a1, a2, a3), true;
        case 5:
          return listeners2.fn.call(listeners2.context, a1, a2, a3, a4), true;
        case 6:
          return listeners2.fn.call(listeners2.context, a1, a2, a3, a4, a5), true;
      }
      for (i2 = 1, args = new Array(len - 1); i2 < len; i2++)
        args[i2 - 1] = arguments[i2];
      listeners2.fn.apply(listeners2.context, args);
    } else {
      var length2 = listeners2.length, j;
      for (i2 = 0; i2 < length2; i2++) {
        if (listeners2[i2].once)
          this.removeListener(event, listeners2[i2].fn, void 0, true);
        switch (len) {
          case 1:
            listeners2[i2].fn.call(listeners2[i2].context);
            break;
          case 2:
            listeners2[i2].fn.call(listeners2[i2].context, a1);
            break;
          case 3:
            listeners2[i2].fn.call(listeners2[i2].context, a1, a2);
            break;
          case 4:
            listeners2[i2].fn.call(listeners2[i2].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++)
                args[j - 1] = arguments[j];
            listeners2[i2].fn.apply(listeners2[i2].context, args);
        }
      }
    }
    return true;
  };
  $ac9b757d51178e15$var$EventEmitter.prototype.on = function on2(event, fn, context) {
    return $ac9b757d51178e15$var$addListener(this, event, fn, context, false);
  };
  $ac9b757d51178e15$var$EventEmitter.prototype.once = function once(event, fn, context) {
    return $ac9b757d51178e15$var$addListener(this, event, fn, context, true);
  };
  $ac9b757d51178e15$var$EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once2) {
    var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      $ac9b757d51178e15$var$clearEvent(this, evt);
      return this;
    }
    var listeners2 = this._events[evt];
    if (listeners2.fn) {
      if (listeners2.fn === fn && (!once2 || listeners2.once) && (!context || listeners2.context === context))
        $ac9b757d51178e15$var$clearEvent(this, evt);
    } else {
      for (var i2 = 0, events = [], length2 = listeners2.length; i2 < length2; i2++)
        if (listeners2[i2].fn !== fn || once2 && !listeners2[i2].once || context && listeners2[i2].context !== context)
          events.push(listeners2[i2]);
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        $ac9b757d51178e15$var$clearEvent(this, evt);
    }
    return this;
  };
  $ac9b757d51178e15$var$EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
      if (this._events[evt])
        $ac9b757d51178e15$var$clearEvent(this, evt);
    } else {
      this._events = new $ac9b757d51178e15$var$Events();
      this._eventsCount = 0;
    }
    return this;
  };
  $ac9b757d51178e15$var$EventEmitter.prototype.off = $ac9b757d51178e15$var$EventEmitter.prototype.removeListener;
  $ac9b757d51178e15$var$EventEmitter.prototype.addListener = $ac9b757d51178e15$var$EventEmitter.prototype.on;
  $ac9b757d51178e15$var$EventEmitter.prefixed = $ac9b757d51178e15$var$prefix;
  $ac9b757d51178e15$var$EventEmitter.EventEmitter = $ac9b757d51178e15$var$EventEmitter;
  $ac9b757d51178e15$exports = $ac9b757d51178e15$var$EventEmitter;
  var $1615705ecc6adca3$exports = {};
  $parcel$export($1615705ecc6adca3$exports, "LogLevel", () => $1615705ecc6adca3$export$243e62d78d3b544d, (v) => $1615705ecc6adca3$export$243e62d78d3b544d = v);
  $parcel$export($1615705ecc6adca3$exports, "default", () => $1615705ecc6adca3$export$2e2bcd8739ae039, (v) => $1615705ecc6adca3$export$2e2bcd8739ae039 = v);
  var $1615705ecc6adca3$var$__read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i2 = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i2.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = {
        error
      };
    } finally {
      try {
        if (r && !r.done && (m = i2["return"]))
          m.call(i2);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var $1615705ecc6adca3$var$__spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2) {
      for (var i2 = 0, l = from.length, ar; i2 < l; i2++)
        if (ar || !(i2 in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i2);
          ar[i2] = from[i2];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var $1615705ecc6adca3$var$LOG_PREFIX = "PeerJS: ";
  var $1615705ecc6adca3$export$243e62d78d3b544d;
  (function($1615705ecc6adca3$export$243e62d78d3b544d2) {
    $1615705ecc6adca3$export$243e62d78d3b544d2[$1615705ecc6adca3$export$243e62d78d3b544d2["Disabled"] = 0] = "Disabled";
    $1615705ecc6adca3$export$243e62d78d3b544d2[$1615705ecc6adca3$export$243e62d78d3b544d2["Errors"] = 1] = "Errors";
    $1615705ecc6adca3$export$243e62d78d3b544d2[$1615705ecc6adca3$export$243e62d78d3b544d2["Warnings"] = 2] = "Warnings";
    $1615705ecc6adca3$export$243e62d78d3b544d2[$1615705ecc6adca3$export$243e62d78d3b544d2["All"] = 3] = "All";
  })($1615705ecc6adca3$export$243e62d78d3b544d || ($1615705ecc6adca3$export$243e62d78d3b544d = {}));
  var $1615705ecc6adca3$var$Logger = function() {
    function Logger() {
      this._logLevel = $1615705ecc6adca3$export$243e62d78d3b544d.Disabled;
    }
    Object.defineProperty(Logger.prototype, "logLevel", {
      get: function() {
        return this._logLevel;
      },
      set: function(logLevel) {
        this._logLevel = logLevel;
      },
      enumerable: false,
      configurable: true
    });
    Logger.prototype.log = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++)
        args[_i] = arguments[_i];
      if (this._logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.All)
        this._print.apply(this, $1615705ecc6adca3$var$__spreadArray([
          $1615705ecc6adca3$export$243e62d78d3b544d.All
        ], $1615705ecc6adca3$var$__read(args), false));
    };
    Logger.prototype.warn = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++)
        args[_i] = arguments[_i];
      if (this._logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Warnings)
        this._print.apply(this, $1615705ecc6adca3$var$__spreadArray([
          $1615705ecc6adca3$export$243e62d78d3b544d.Warnings
        ], $1615705ecc6adca3$var$__read(args), false));
    };
    Logger.prototype.error = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++)
        args[_i] = arguments[_i];
      if (this._logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Errors)
        this._print.apply(this, $1615705ecc6adca3$var$__spreadArray([
          $1615705ecc6adca3$export$243e62d78d3b544d.Errors
        ], $1615705ecc6adca3$var$__read(args), false));
    };
    Logger.prototype.setLogFunction = function(fn) {
      this._print = fn;
    };
    Logger.prototype._print = function(logLevel) {
      var rest = [];
      for (var _i = 1; _i < arguments.length; _i++)
        rest[_i - 1] = arguments[_i];
      var copy = $1615705ecc6adca3$var$__spreadArray([
        $1615705ecc6adca3$var$LOG_PREFIX
      ], $1615705ecc6adca3$var$__read(rest), false);
      for (var i2 in copy)
        if (copy[i2] instanceof Error)
          copy[i2] = "(" + copy[i2].name + ") " + copy[i2].message;
      if (logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.All)
        console.log.apply(console, $1615705ecc6adca3$var$__spreadArray([], $1615705ecc6adca3$var$__read(copy), false));
      else if (logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Warnings)
        console.warn.apply(console, $1615705ecc6adca3$var$__spreadArray([
          "WARNING"
        ], $1615705ecc6adca3$var$__read(copy), false));
      else if (logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Errors)
        console.error.apply(console, $1615705ecc6adca3$var$__spreadArray([
          "ERROR"
        ], $1615705ecc6adca3$var$__read(copy), false));
    };
    return Logger;
  }();
  var $1615705ecc6adca3$export$2e2bcd8739ae039 = new $1615705ecc6adca3$var$Logger();
  var $31d11a8d122cb4b7$exports = {};
  $parcel$export($31d11a8d122cb4b7$exports, "Socket", () => $31d11a8d122cb4b7$export$4798917dbf149b79, (v) => $31d11a8d122cb4b7$export$4798917dbf149b79 = v);
  var $60fadef21a2daafc$export$3157d57b4135e3bc;
  (function($60fadef21a2daafc$export$3157d57b4135e3bc2) {
    $60fadef21a2daafc$export$3157d57b4135e3bc2["Data"] = "data";
    $60fadef21a2daafc$export$3157d57b4135e3bc2["Media"] = "media";
  })($60fadef21a2daafc$export$3157d57b4135e3bc || ($60fadef21a2daafc$export$3157d57b4135e3bc = {}));
  var $60fadef21a2daafc$export$9547aaa2e39030ff;
  (function($60fadef21a2daafc$export$9547aaa2e39030ff2) {
    $60fadef21a2daafc$export$9547aaa2e39030ff2["BrowserIncompatible"] = "browser-incompatible";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["Disconnected"] = "disconnected";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["InvalidID"] = "invalid-id";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["InvalidKey"] = "invalid-key";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["Network"] = "network";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["PeerUnavailable"] = "peer-unavailable";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["SslUnavailable"] = "ssl-unavailable";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["ServerError"] = "server-error";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["SocketError"] = "socket-error";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["SocketClosed"] = "socket-closed";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["UnavailableID"] = "unavailable-id";
    $60fadef21a2daafc$export$9547aaa2e39030ff2["WebRTC"] = "webrtc";
  })($60fadef21a2daafc$export$9547aaa2e39030ff || ($60fadef21a2daafc$export$9547aaa2e39030ff = {}));
  var $60fadef21a2daafc$export$89f507cf986a947;
  (function($60fadef21a2daafc$export$89f507cf986a9472) {
    $60fadef21a2daafc$export$89f507cf986a9472["Binary"] = "binary";
    $60fadef21a2daafc$export$89f507cf986a9472["BinaryUTF8"] = "binary-utf8";
    $60fadef21a2daafc$export$89f507cf986a9472["JSON"] = "json";
  })($60fadef21a2daafc$export$89f507cf986a947 || ($60fadef21a2daafc$export$89f507cf986a947 = {}));
  var $60fadef21a2daafc$export$3b5c4a4b6354f023;
  (function($60fadef21a2daafc$export$3b5c4a4b6354f0232) {
    $60fadef21a2daafc$export$3b5c4a4b6354f0232["Message"] = "message";
    $60fadef21a2daafc$export$3b5c4a4b6354f0232["Disconnected"] = "disconnected";
    $60fadef21a2daafc$export$3b5c4a4b6354f0232["Error"] = "error";
    $60fadef21a2daafc$export$3b5c4a4b6354f0232["Close"] = "close";
  })($60fadef21a2daafc$export$3b5c4a4b6354f023 || ($60fadef21a2daafc$export$3b5c4a4b6354f023 = {}));
  var $60fadef21a2daafc$export$adb4a1754da6f10d;
  (function($60fadef21a2daafc$export$adb4a1754da6f10d2) {
    $60fadef21a2daafc$export$adb4a1754da6f10d2["Heartbeat"] = "HEARTBEAT";
    $60fadef21a2daafc$export$adb4a1754da6f10d2["Candidate"] = "CANDIDATE";
    $60fadef21a2daafc$export$adb4a1754da6f10d2["Offer"] = "OFFER";
    $60fadef21a2daafc$export$adb4a1754da6f10d2["Answer"] = "ANSWER";
    $60fadef21a2daafc$export$adb4a1754da6f10d2["Open"] = "OPEN";
    $60fadef21a2daafc$export$adb4a1754da6f10d2["Error"] = "ERROR";
    $60fadef21a2daafc$export$adb4a1754da6f10d2["IdTaken"] = "ID-TAKEN";
    $60fadef21a2daafc$export$adb4a1754da6f10d2["InvalidKey"] = "INVALID-KEY";
    $60fadef21a2daafc$export$adb4a1754da6f10d2["Leave"] = "LEAVE";
    $60fadef21a2daafc$export$adb4a1754da6f10d2["Expire"] = "EXPIRE";
  })($60fadef21a2daafc$export$adb4a1754da6f10d || ($60fadef21a2daafc$export$adb4a1754da6f10d = {}));
  var $0d1ed891c5cb27c0$exports = {};
  $0d1ed891c5cb27c0$exports = JSON.parse('{"name":"peerjs","version":"1.4.7","keywords":["peerjs","webrtc","p2p","rtc"],"description":"PeerJS client","homepage":"https://peerjs.com","bugs":{"url":"https://github.com/peers/peerjs/issues"},"repository":{"type":"git","url":"https://github.com/peers/peerjs"},"license":"MIT","contributors":["Michelle Bu <michelle@michellebu.com>","afrokick <devbyru@gmail.com>","ericz <really.ez@gmail.com>","Jairo <kidandcat@gmail.com>","Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>","Jairo Caro-Accino Viciana <jairo@galax.be>","Carlos Caballero <carlos.caballero.gonzalez@gmail.com>","hc <hheennrryy@gmail.com>","Muhammad Asif <capripio@gmail.com>","PrashoonB <prashoonbhattacharjee@gmail.com>","Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>","akotynski <aleksanderkotbury@gmail.com>","lmb <i@lmb.io>","Jairooo <jairocaro@msn.com>","Moritz St\xFCckler <moritz.stueckler@gmail.com>","Simon <crydotsnakegithub@gmail.com>","Denis Lukov <denismassters@gmail.com>","Philipp Hancke <fippo@andyet.net>","Hans Oksendahl <hansoksendahl@gmail.com>","Jess <jessachandler@gmail.com>","khankuan <khankuan@gmail.com>","DUODVK <kurmanov.work@gmail.com>","XiZhao <kwang1imsa@gmail.com>","Matthias Lohr <matthias@lohr.me>","=frank tree <=frnktrb@googlemail.com>","Andre Eckardt <aeckardt@outlook.com>","Chris Cowan <agentme49@gmail.com>","Alex Chuev <alex@chuev.com>","alxnull <alxnull@e.mail.de>","Yemel Jardi <angel.jardi@gmail.com>","Ben Parnell <benjaminparnell.94@gmail.com>","Benny Lichtner <bennlich@gmail.com>","fresheneesz <bitetrudpublic@gmail.com>","bob.barstead@exaptive.com <bob.barstead@exaptive.com>","chandika <chandika@gmail.com>","emersion <contact@emersion.fr>","Christopher Van <cvan@users.noreply.github.com>","eddieherm <edhermoso@gmail.com>","Eduardo Pinho <enet4mikeenet@gmail.com>","Evandro Zanatta <ezanatta@tray.net.br>","Gardner Bickford <gardner@users.noreply.github.com>","Gian Luca <gianluca.cecchi@cynny.com>","PatrickJS <github@gdi2290.com>","jonnyf <github@jonathanfoss.co.uk>","Hizkia Felix <hizkifw@gmail.com>","Hristo Oskov <hristo.oskov@gmail.com>","Isaac Madwed <i.madwed@gmail.com>","Ilya Konanykhin <ilya.konanykhin@gmail.com>","jasonbarry <jasbarry@me.com>","Jonathan Burke <jonathan.burke.1311@googlemail.com>","Josh Hamit <josh.hamit@gmail.com>","Jordan Austin <jrax86@gmail.com>","Joel Wetzell <jwetzell@yahoo.com>","xizhao <kevin.wang@cloudera.com>","Alberto Torres <kungfoobar@gmail.com>","Jonathan Mayol <mayoljonathan@gmail.com>","Jefferson Felix <me@jsfelix.dev>","Rolf Erik Lekang <me@rolflekang.com>","Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>","Pepijn de Vos <pepijndevos@gmail.com>","JooYoung <qkdlql@naver.com>","Tobias Speicher <rootcommander@gmail.com>","Steve Blaurock <sblaurock@gmail.com>","Kyrylo Shegeda <shegeda@ualberta.ca>","Diwank Singh Tomer <singh@diwank.name>","So\u0308ren Balko <Soeren.Balko@gmail.com>","Arpit Solanki <solankiarpit1997@gmail.com>","Yuki Ito <yuki@gnnk.net>","Artur Zayats <zag2art@gmail.com>"],"funding":{"type":"opencollective","url":"https://opencollective.com/peer"},"collective":{"type":"opencollective","url":"https://opencollective.com/peer"},"files":["dist/*"],"sideEffects":["lib/global.ts","lib/supports.ts"],"main":"dist/bundler.cjs","module":"dist/bundler.mjs","browser-minified":"dist/peerjs.min.js","browser-unminified":"dist/peerjs.js","types":"dist/types.d.ts","engines":{"node":">= 10"},"targets":{"types":{"source":"lib/exports.ts"},"main":{"source":"lib/exports.ts","sourceMap":{"inlineSources":true}},"module":{"source":"lib/exports.ts","includeNodeModules":["eventemitter3"],"sourceMap":{"inlineSources":true}},"browser-minified":{"context":"browser","outputFormat":"global","optimize":true,"engines":{"browsers":"cover 99%, not dead"},"source":"lib/global.ts"},"browser-unminified":{"context":"browser","outputFormat":"global","optimize":false,"engines":{"browsers":"cover 99%, not dead"},"source":"lib/global.ts"}},"scripts":{"contributors":"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\"chore(contributors): update and sort contributors list\\"","check":"tsc --noEmit","watch":"parcel watch","build":"rm -rf dist && parcel build","prepublishOnly":"npm run build","test":"mocha -r ts-node/register -r jsdom-global/register test/**/*.ts","format":"prettier --write .","semantic-release":"semantic-release"},"devDependencies":{"@parcel/config-default":"^2.5.0","@parcel/packager-ts":"^2.5.0","@parcel/transformer-typescript-tsc":"^2.5.0","@parcel/transformer-typescript-types":"^2.5.0","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@types/chai":"^4.3.0","@types/mocha":"^9.1.0","@types/node":"^17.0.18","chai":"^4.3.6","git-authors-cli":"^1.0.40","jsdom":"^19.0.0","jsdom-global":"^3.0.2","mocha":"^9.2.0","mock-socket":"8.0.5","parcel":"^2.5.0","parcel-transformer-tsc-sourcemaps":"^1.0.2","prettier":"^2.6.2","semantic-release":"^19.0.2","standard":"^16.0.4","ts-node":"^10.5.0","typescript":"^4.5.5"},"dependencies":{"@swc/helpers":"^0.3.13","eventemitter3":"^4.0.7","peerjs-js-binarypack":"1.0.1","webrtc-adapter":"^7.7.1"}}');
  var $31d11a8d122cb4b7$var$__extends = function() {
    var extendStatics = function(d1, b1) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      return extendStatics(d1, b1);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var $31d11a8d122cb4b7$var$__read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i2 = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i2.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = {
        error
      };
    } finally {
      try {
        if (r && !r.done && (m = i2["return"]))
          m.call(i2);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var $31d11a8d122cb4b7$var$__spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2) {
      for (var i2 = 0, l = from.length, ar; i2 < l; i2++)
        if (ar || !(i2 in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i2);
          ar[i2] = from[i2];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var $31d11a8d122cb4b7$var$__values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i2 = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i2 >= o.length)
            o = void 0;
          return {
            value: o && o[i2++],
            done: !o
          };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var $31d11a8d122cb4b7$export$4798917dbf149b79 = function(_super) {
    $31d11a8d122cb4b7$var$__extends($31d11a8d122cb4b7$export$4798917dbf149b792, _super);
    function $31d11a8d122cb4b7$export$4798917dbf149b792(secure, host, port, path, key, pingInterval) {
      if (pingInterval === void 0)
        pingInterval = 5e3;
      var _this = _super.call(this) || this;
      _this.pingInterval = pingInterval;
      _this._disconnected = true;
      _this._messagesQueue = [];
      var wsProtocol = secure ? "wss://" : "ws://";
      _this._baseUrl = wsProtocol + host + ":" + port + path + "peerjs?key=" + key;
      return _this;
    }
    $31d11a8d122cb4b7$export$4798917dbf149b792.prototype.start = function(id, token) {
      var _this = this;
      this._id = id;
      var wsUrl = "".concat(this._baseUrl, "&id=").concat(id, "&token=").concat(token);
      if (!!this._socket || !this._disconnected)
        return;
      this._socket = new WebSocket(wsUrl + "&version=" + $0d1ed891c5cb27c0$exports.version);
      this._disconnected = false;
      this._socket.onmessage = function(event) {
        var data;
        try {
          data = JSON.parse(event.data);
          $1615705ecc6adca3$exports.default.log("Server message received:", data);
        } catch (e) {
          $1615705ecc6adca3$exports.default.log("Invalid server message", event.data);
          return;
        }
        _this.emit($60fadef21a2daafc$export$3b5c4a4b6354f023.Message, data);
      };
      this._socket.onclose = function(event) {
        if (_this._disconnected)
          return;
        $1615705ecc6adca3$exports.default.log("Socket closed.", event);
        _this._cleanup();
        _this._disconnected = true;
        _this.emit($60fadef21a2daafc$export$3b5c4a4b6354f023.Disconnected);
      };
      this._socket.onopen = function() {
        if (_this._disconnected)
          return;
        _this._sendQueuedMessages();
        $1615705ecc6adca3$exports.default.log("Socket open");
        _this._scheduleHeartbeat();
      };
    };
    $31d11a8d122cb4b7$export$4798917dbf149b792.prototype._scheduleHeartbeat = function() {
      var _this = this;
      this._wsPingTimer = setTimeout(function() {
        _this._sendHeartbeat();
      }, this.pingInterval);
    };
    $31d11a8d122cb4b7$export$4798917dbf149b792.prototype._sendHeartbeat = function() {
      if (!this._wsOpen()) {
        $1615705ecc6adca3$exports.default.log("Cannot send heartbeat, because socket closed");
        return;
      }
      var message = JSON.stringify({
        type: $60fadef21a2daafc$export$adb4a1754da6f10d.Heartbeat
      });
      this._socket.send(message);
      this._scheduleHeartbeat();
    };
    $31d11a8d122cb4b7$export$4798917dbf149b792.prototype._wsOpen = function() {
      return !!this._socket && this._socket.readyState === 1;
    };
    $31d11a8d122cb4b7$export$4798917dbf149b792.prototype._sendQueuedMessages = function() {
      var e_1, _a;
      var copiedQueue = $31d11a8d122cb4b7$var$__spreadArray([], $31d11a8d122cb4b7$var$__read(this._messagesQueue), false);
      this._messagesQueue = [];
      try {
        for (var copiedQueue_1 = $31d11a8d122cb4b7$var$__values(copiedQueue), copiedQueue_1_1 = copiedQueue_1.next(); !copiedQueue_1_1.done; copiedQueue_1_1 = copiedQueue_1.next()) {
          var message = copiedQueue_1_1.value;
          this.send(message);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (copiedQueue_1_1 && !copiedQueue_1_1.done && (_a = copiedQueue_1.return))
            _a.call(copiedQueue_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    };
    $31d11a8d122cb4b7$export$4798917dbf149b792.prototype.send = function(data) {
      if (this._disconnected)
        return;
      if (!this._id) {
        this._messagesQueue.push(data);
        return;
      }
      if (!data.type) {
        this.emit($60fadef21a2daafc$export$3b5c4a4b6354f023.Error, "Invalid message");
        return;
      }
      if (!this._wsOpen())
        return;
      var message = JSON.stringify(data);
      this._socket.send(message);
    };
    $31d11a8d122cb4b7$export$4798917dbf149b792.prototype.close = function() {
      if (this._disconnected)
        return;
      this._cleanup();
      this._disconnected = true;
    };
    $31d11a8d122cb4b7$export$4798917dbf149b792.prototype._cleanup = function() {
      if (this._socket) {
        this._socket.onopen = this._socket.onmessage = this._socket.onclose = null;
        this._socket.close();
        this._socket = void 0;
      }
      clearTimeout(this._wsPingTimer);
    };
    return $31d11a8d122cb4b7$export$4798917dbf149b792;
  }($ac9b757d51178e15$exports.EventEmitter);
  var $353dee38f9ab557b$exports = {};
  $parcel$export($353dee38f9ab557b$exports, "MediaConnection", () => $353dee38f9ab557b$export$4a84e95a2324ac29, (v) => $353dee38f9ab557b$export$4a84e95a2324ac29 = v);
  var $77f14d3e81888156$exports = {};
  $parcel$export($77f14d3e81888156$exports, "Negotiator", () => $77f14d3e81888156$export$89e6bb5ad64bf4a, (v) => $77f14d3e81888156$export$89e6bb5ad64bf4a = v);
  var $77f14d3e81888156$var$__assign = function() {
    $77f14d3e81888156$var$__assign = Object.assign || function(t) {
      for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
        s = arguments[i2];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return $77f14d3e81888156$var$__assign.apply(this, arguments);
  };
  var $77f14d3e81888156$var$__awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value2) {
      return value2 instanceof P ? value2 : new P(function(resolve) {
        resolve(value2);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value2) {
        try {
          step(generator.next(value2));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value2) {
        try {
          step(generator["throw"](value2));
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
  var $77f14d3e81888156$var$__generator = function(thisArg, body) {
    var _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    }, f, y, t, g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
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
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
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
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };
  var $77f14d3e81888156$export$89e6bb5ad64bf4a = function() {
    function $77f14d3e81888156$export$89e6bb5ad64bf4a2(connection) {
      this.connection = connection;
    }
    $77f14d3e81888156$export$89e6bb5ad64bf4a2.prototype.startConnection = function(options) {
      var peerConnection = this._startPeerConnection();
      this.connection.peerConnection = peerConnection;
      if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Media && options._stream)
        this._addTracksToConnection(options._stream, peerConnection);
      if (options.originator) {
        if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
          var dataConnection = this.connection;
          var config = {
            ordered: !!options.reliable
          };
          var dataChannel = peerConnection.createDataChannel(dataConnection.label, config);
          dataConnection.initialize(dataChannel);
        }
        this._makeOffer();
      } else
        this.handleSDP("OFFER", options.sdp);
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a2.prototype._startPeerConnection = function() {
      $1615705ecc6adca3$exports.default.log("Creating RTCPeerConnection.");
      var peerConnection = new RTCPeerConnection(this.connection.provider.options.config);
      this._setupListeners(peerConnection);
      return peerConnection;
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a2.prototype._setupListeners = function(peerConnection) {
      var _this = this;
      var peerId = this.connection.peer;
      var connectionId = this.connection.connectionId;
      var connectionType = this.connection.type;
      var provider = this.connection.provider;
      $1615705ecc6adca3$exports.default.log("Listening for ICE candidates.");
      peerConnection.onicecandidate = function(evt) {
        if (!evt.candidate || !evt.candidate.candidate)
          return;
        $1615705ecc6adca3$exports.default.log("Received ICE candidates for ".concat(peerId, ":"), evt.candidate);
        provider.socket.send({
          type: $60fadef21a2daafc$export$adb4a1754da6f10d.Candidate,
          payload: {
            candidate: evt.candidate,
            type: connectionType,
            connectionId
          },
          dst: peerId
        });
      };
      peerConnection.oniceconnectionstatechange = function() {
        switch (peerConnection.iceConnectionState) {
          case "failed":
            $1615705ecc6adca3$exports.default.log("iceConnectionState is failed, closing connections to " + peerId);
            _this.connection.emit("error", new Error("Negotiation of connection to " + peerId + " failed."));
            _this.connection.close();
            break;
          case "closed":
            $1615705ecc6adca3$exports.default.log("iceConnectionState is closed, closing connections to " + peerId);
            _this.connection.emit("error", new Error("Connection to " + peerId + " closed."));
            _this.connection.close();
            break;
          case "disconnected":
            $1615705ecc6adca3$exports.default.log("iceConnectionState changed to disconnected on the connection with " + peerId);
            break;
          case "completed":
            peerConnection.onicecandidate = $06cb531ed7840f78$export$7debb50ef11d5e0b.noop;
            break;
        }
        _this.connection.emit("iceStateChanged", peerConnection.iceConnectionState);
      };
      $1615705ecc6adca3$exports.default.log("Listening for data channel");
      peerConnection.ondatachannel = function(evt) {
        $1615705ecc6adca3$exports.default.log("Received data channel");
        var dataChannel = evt.channel;
        var connection = provider.getConnection(peerId, connectionId);
        connection.initialize(dataChannel);
      };
      $1615705ecc6adca3$exports.default.log("Listening for remote stream");
      peerConnection.ontrack = function(evt) {
        $1615705ecc6adca3$exports.default.log("Received remote stream");
        var stream = evt.streams[0];
        var connection = provider.getConnection(peerId, connectionId);
        if (connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Media) {
          var mediaConnection = connection;
          _this._addStreamToMediaConnection(stream, mediaConnection);
        }
      };
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a2.prototype.cleanup = function() {
      $1615705ecc6adca3$exports.default.log("Cleaning up PeerConnection to " + this.connection.peer);
      var peerConnection = this.connection.peerConnection;
      if (!peerConnection)
        return;
      this.connection.peerConnection = null;
      peerConnection.onicecandidate = peerConnection.oniceconnectionstatechange = peerConnection.ondatachannel = peerConnection.ontrack = function() {
      };
      var peerConnectionNotClosed = peerConnection.signalingState !== "closed";
      var dataChannelNotClosed = false;
      if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
        var dataConnection = this.connection;
        var dataChannel = dataConnection.dataChannel;
        if (dataChannel)
          dataChannelNotClosed = !!dataChannel.readyState && dataChannel.readyState !== "closed";
      }
      if (peerConnectionNotClosed || dataChannelNotClosed)
        peerConnection.close();
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a2.prototype._makeOffer = function() {
      return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function() {
        var peerConnection, provider, offer, payload, dataConnection, err_2, err_1_1;
        return $77f14d3e81888156$var$__generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              peerConnection = this.connection.peerConnection;
              provider = this.connection.provider;
              _a.label = 1;
            case 1:
              _a.trys.push([
                1,
                7,
                ,
                8
              ]);
              return [
                4,
                peerConnection.createOffer(this.connection.options.constraints)
              ];
            case 2:
              offer = _a.sent();
              $1615705ecc6adca3$exports.default.log("Created offer.");
              if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function")
                offer.sdp = this.connection.options.sdpTransform(offer.sdp) || offer.sdp;
              _a.label = 3;
            case 3:
              _a.trys.push([
                3,
                5,
                ,
                6
              ]);
              return [
                4,
                peerConnection.setLocalDescription(offer)
              ];
            case 4:
              _a.sent();
              $1615705ecc6adca3$exports.default.log("Set localDescription:", offer, "for:".concat(this.connection.peer));
              payload = {
                sdp: offer,
                type: this.connection.type,
                connectionId: this.connection.connectionId,
                metadata: this.connection.metadata,
                browser: $06cb531ed7840f78$export$7debb50ef11d5e0b.browser
              };
              if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
                dataConnection = this.connection;
                payload = $77f14d3e81888156$var$__assign($77f14d3e81888156$var$__assign({}, payload), {
                  label: dataConnection.label,
                  reliable: dataConnection.reliable,
                  serialization: dataConnection.serialization
                });
              }
              provider.socket.send({
                type: $60fadef21a2daafc$export$adb4a1754da6f10d.Offer,
                payload,
                dst: this.connection.peer
              });
              return [
                3,
                6
              ];
            case 5:
              err_2 = _a.sent();
              if (err_2 != "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer") {
                provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_2);
                $1615705ecc6adca3$exports.default.log("Failed to setLocalDescription, ", err_2);
              }
              return [
                3,
                6
              ];
            case 6:
              return [
                3,
                8
              ];
            case 7:
              err_1_1 = _a.sent();
              provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_1_1);
              $1615705ecc6adca3$exports.default.log("Failed to createOffer, ", err_1_1);
              return [
                3,
                8
              ];
            case 8:
              return [
                2
              ];
          }
        });
      });
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a2.prototype._makeAnswer = function() {
      return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function() {
        var peerConnection, provider, answer, err_3, err_1_2;
        return $77f14d3e81888156$var$__generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              peerConnection = this.connection.peerConnection;
              provider = this.connection.provider;
              _a.label = 1;
            case 1:
              _a.trys.push([
                1,
                7,
                ,
                8
              ]);
              return [
                4,
                peerConnection.createAnswer()
              ];
            case 2:
              answer = _a.sent();
              $1615705ecc6adca3$exports.default.log("Created answer.");
              if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function")
                answer.sdp = this.connection.options.sdpTransform(answer.sdp) || answer.sdp;
              _a.label = 3;
            case 3:
              _a.trys.push([
                3,
                5,
                ,
                6
              ]);
              return [
                4,
                peerConnection.setLocalDescription(answer)
              ];
            case 4:
              _a.sent();
              $1615705ecc6adca3$exports.default.log("Set localDescription:", answer, "for:".concat(this.connection.peer));
              provider.socket.send({
                type: $60fadef21a2daafc$export$adb4a1754da6f10d.Answer,
                payload: {
                  sdp: answer,
                  type: this.connection.type,
                  connectionId: this.connection.connectionId,
                  browser: $06cb531ed7840f78$export$7debb50ef11d5e0b.browser
                },
                dst: this.connection.peer
              });
              return [
                3,
                6
              ];
            case 5:
              err_3 = _a.sent();
              provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_3);
              $1615705ecc6adca3$exports.default.log("Failed to setLocalDescription, ", err_3);
              return [
                3,
                6
              ];
            case 6:
              return [
                3,
                8
              ];
            case 7:
              err_1_2 = _a.sent();
              provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_1_2);
              $1615705ecc6adca3$exports.default.log("Failed to create answer, ", err_1_2);
              return [
                3,
                8
              ];
            case 8:
              return [
                2
              ];
          }
        });
      });
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a2.prototype.handleSDP = function(type, sdp) {
      return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function() {
        var peerConnection, provider, self2, err_4;
        return $77f14d3e81888156$var$__generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              sdp = new RTCSessionDescription(sdp);
              peerConnection = this.connection.peerConnection;
              provider = this.connection.provider;
              $1615705ecc6adca3$exports.default.log("Setting remote description", sdp);
              self2 = this;
              _a.label = 1;
            case 1:
              _a.trys.push([
                1,
                5,
                ,
                6
              ]);
              return [
                4,
                peerConnection.setRemoteDescription(sdp)
              ];
            case 2:
              _a.sent();
              $1615705ecc6adca3$exports.default.log("Set remoteDescription:".concat(type, " for:").concat(this.connection.peer));
              if (!(type === "OFFER"))
                return [
                  3,
                  4
                ];
              return [
                4,
                self2._makeAnswer()
              ];
            case 3:
              _a.sent();
              _a.label = 4;
            case 4:
              return [
                3,
                6
              ];
            case 5:
              err_4 = _a.sent();
              provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_4);
              $1615705ecc6adca3$exports.default.log("Failed to setRemoteDescription, ", err_4);
              return [
                3,
                6
              ];
            case 6:
              return [
                2
              ];
          }
        });
      });
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a2.prototype.handleCandidate = function(ice) {
      return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function() {
        var candidate, sdpMLineIndex, sdpMid, peerConnection, provider, err_5;
        return $77f14d3e81888156$var$__generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              $1615705ecc6adca3$exports.default.log("handleCandidate:", ice);
              candidate = ice.candidate;
              sdpMLineIndex = ice.sdpMLineIndex;
              sdpMid = ice.sdpMid;
              peerConnection = this.connection.peerConnection;
              provider = this.connection.provider;
              _a.label = 1;
            case 1:
              _a.trys.push([
                1,
                3,
                ,
                4
              ]);
              return [
                4,
                peerConnection.addIceCandidate(new RTCIceCandidate({
                  sdpMid,
                  sdpMLineIndex,
                  candidate
                }))
              ];
            case 2:
              _a.sent();
              $1615705ecc6adca3$exports.default.log("Added ICE candidate for:".concat(this.connection.peer));
              return [
                3,
                4
              ];
            case 3:
              err_5 = _a.sent();
              provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_5);
              $1615705ecc6adca3$exports.default.log("Failed to handleCandidate, ", err_5);
              return [
                3,
                4
              ];
            case 4:
              return [
                2
              ];
          }
        });
      });
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a2.prototype._addTracksToConnection = function(stream, peerConnection) {
      $1615705ecc6adca3$exports.default.log("add tracks from stream ".concat(stream.id, " to peer connection"));
      if (!peerConnection.addTrack)
        return $1615705ecc6adca3$exports.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
      stream.getTracks().forEach(function(track) {
        peerConnection.addTrack(track, stream);
      });
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a2.prototype._addStreamToMediaConnection = function(stream, mediaConnection) {
      $1615705ecc6adca3$exports.default.log("add stream ".concat(stream.id, " to media connection ").concat(mediaConnection.connectionId));
      mediaConnection.addStream(stream);
    };
    return $77f14d3e81888156$export$89e6bb5ad64bf4a2;
  }();
  var $0b3b332fd86c5202$exports = {};
  $parcel$export($0b3b332fd86c5202$exports, "BaseConnection", () => $0b3b332fd86c5202$export$23a2a68283c24d80, (v) => $0b3b332fd86c5202$export$23a2a68283c24d80 = v);
  var $0b3b332fd86c5202$var$__extends = function() {
    var extendStatics = function(d1, b1) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      return extendStatics(d1, b1);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var $0b3b332fd86c5202$export$23a2a68283c24d80 = function(_super) {
    $0b3b332fd86c5202$var$__extends($0b3b332fd86c5202$export$23a2a68283c24d802, _super);
    function $0b3b332fd86c5202$export$23a2a68283c24d802(peer, provider, options) {
      var _this = _super.call(this) || this;
      _this.peer = peer;
      _this.provider = provider;
      _this.options = options;
      _this._open = false;
      _this.metadata = options.metadata;
      return _this;
    }
    Object.defineProperty($0b3b332fd86c5202$export$23a2a68283c24d802.prototype, "open", {
      get: function() {
        return this._open;
      },
      enumerable: false,
      configurable: true
    });
    return $0b3b332fd86c5202$export$23a2a68283c24d802;
  }($ac9b757d51178e15$exports.EventEmitter);
  var $353dee38f9ab557b$var$__extends = function() {
    var extendStatics = function(d1, b1) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      return extendStatics(d1, b1);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var $353dee38f9ab557b$var$__assign = function() {
    $353dee38f9ab557b$var$__assign = Object.assign || function(t) {
      for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
        s = arguments[i2];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return $353dee38f9ab557b$var$__assign.apply(this, arguments);
  };
  var $353dee38f9ab557b$var$__values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i2 = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i2 >= o.length)
            o = void 0;
          return {
            value: o && o[i2++],
            done: !o
          };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var $353dee38f9ab557b$export$4a84e95a2324ac29 = function(_super) {
    $353dee38f9ab557b$var$__extends($353dee38f9ab557b$export$4a84e95a2324ac292, _super);
    function $353dee38f9ab557b$export$4a84e95a2324ac292(peerId, provider, options) {
      var _this = _super.call(this, peerId, provider, options) || this;
      _this._localStream = _this.options._stream;
      _this.connectionId = _this.options.connectionId || $353dee38f9ab557b$export$4a84e95a2324ac292.ID_PREFIX + $06cb531ed7840f78$export$7debb50ef11d5e0b.randomToken();
      _this._negotiator = new $77f14d3e81888156$exports.Negotiator(_this);
      if (_this._localStream)
        _this._negotiator.startConnection({
          _stream: _this._localStream,
          originator: true
        });
      return _this;
    }
    Object.defineProperty($353dee38f9ab557b$export$4a84e95a2324ac292.prototype, "type", {
      get: function() {
        return $60fadef21a2daafc$export$3157d57b4135e3bc.Media;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($353dee38f9ab557b$export$4a84e95a2324ac292.prototype, "localStream", {
      get: function() {
        return this._localStream;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($353dee38f9ab557b$export$4a84e95a2324ac292.prototype, "remoteStream", {
      get: function() {
        return this._remoteStream;
      },
      enumerable: false,
      configurable: true
    });
    $353dee38f9ab557b$export$4a84e95a2324ac292.prototype.addStream = function(remoteStream) {
      $1615705ecc6adca3$exports.default.log("Receiving stream", remoteStream);
      this._remoteStream = remoteStream;
      _super.prototype.emit.call(this, "stream", remoteStream);
    };
    $353dee38f9ab557b$export$4a84e95a2324ac292.prototype.handleMessage = function(message) {
      var type = message.type;
      var payload = message.payload;
      switch (message.type) {
        case $60fadef21a2daafc$export$adb4a1754da6f10d.Answer:
          this._negotiator.handleSDP(type, payload.sdp);
          this._open = true;
          break;
        case $60fadef21a2daafc$export$adb4a1754da6f10d.Candidate:
          this._negotiator.handleCandidate(payload.candidate);
          break;
        default:
          $1615705ecc6adca3$exports.default.warn("Unrecognized message type:".concat(type, " from peer:").concat(this.peer));
          break;
      }
    };
    $353dee38f9ab557b$export$4a84e95a2324ac292.prototype.answer = function(stream, options) {
      var e_1, _a;
      if (options === void 0)
        options = {};
      if (this._localStream) {
        $1615705ecc6adca3$exports.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
        return;
      }
      this._localStream = stream;
      if (options && options.sdpTransform)
        this.options.sdpTransform = options.sdpTransform;
      this._negotiator.startConnection($353dee38f9ab557b$var$__assign($353dee38f9ab557b$var$__assign({}, this.options._payload), {
        _stream: stream
      }));
      var messages = this.provider._getMessages(this.connectionId);
      try {
        for (var messages_1 = $353dee38f9ab557b$var$__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
          var message = messages_1_1.value;
          this.handleMessage(message);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return))
            _a.call(messages_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      this._open = true;
    };
    $353dee38f9ab557b$export$4a84e95a2324ac292.prototype.close = function() {
      if (this._negotiator) {
        this._negotiator.cleanup();
        this._negotiator = null;
      }
      this._localStream = null;
      this._remoteStream = null;
      if (this.provider) {
        this.provider._removeConnection(this);
        this.provider = null;
      }
      if (this.options && this.options._stream)
        this.options._stream = null;
      if (!this.open)
        return;
      this._open = false;
      _super.prototype.emit.call(this, "close");
    };
    $353dee38f9ab557b$export$4a84e95a2324ac292.ID_PREFIX = "mc_";
    return $353dee38f9ab557b$export$4a84e95a2324ac292;
  }($0b3b332fd86c5202$exports.BaseConnection);
  var $3356170d7bce7f20$exports = {};
  $parcel$export($3356170d7bce7f20$exports, "DataConnection", () => $3356170d7bce7f20$export$d365f7ad9d7df9c9, (v) => $3356170d7bce7f20$export$d365f7ad9d7df9c9 = v);
  var $3014d862dcc9946b$exports = {};
  $parcel$export($3014d862dcc9946b$exports, "EncodingQueue", () => $3014d862dcc9946b$export$c6913ae0ed687038, (v) => $3014d862dcc9946b$export$c6913ae0ed687038 = v);
  var $3014d862dcc9946b$var$__extends = function() {
    var extendStatics = function(d1, b1) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      return extendStatics(d1, b1);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var $3014d862dcc9946b$export$c6913ae0ed687038 = function(_super) {
    $3014d862dcc9946b$var$__extends($3014d862dcc9946b$export$c6913ae0ed6870382, _super);
    function $3014d862dcc9946b$export$c6913ae0ed6870382() {
      var _this = _super.call(this) || this;
      _this.fileReader = new FileReader();
      _this._queue = [];
      _this._processing = false;
      _this.fileReader.onload = function(evt) {
        _this._processing = false;
        if (evt.target)
          _this.emit("done", evt.target.result);
        _this.doNextTask();
      };
      _this.fileReader.onerror = function(evt) {
        $1615705ecc6adca3$exports.default.error("EncodingQueue error:", evt);
        _this._processing = false;
        _this.destroy();
        _this.emit("error", evt);
      };
      return _this;
    }
    Object.defineProperty($3014d862dcc9946b$export$c6913ae0ed6870382.prototype, "queue", {
      get: function() {
        return this._queue;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($3014d862dcc9946b$export$c6913ae0ed6870382.prototype, "size", {
      get: function() {
        return this.queue.length;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($3014d862dcc9946b$export$c6913ae0ed6870382.prototype, "processing", {
      get: function() {
        return this._processing;
      },
      enumerable: false,
      configurable: true
    });
    $3014d862dcc9946b$export$c6913ae0ed6870382.prototype.enque = function(blob) {
      this.queue.push(blob);
      if (this.processing)
        return;
      this.doNextTask();
    };
    $3014d862dcc9946b$export$c6913ae0ed6870382.prototype.destroy = function() {
      this.fileReader.abort();
      this._queue = [];
    };
    $3014d862dcc9946b$export$c6913ae0ed6870382.prototype.doNextTask = function() {
      if (this.size === 0)
        return;
      if (this.processing)
        return;
      this._processing = true;
      this.fileReader.readAsArrayBuffer(this.queue.shift());
    };
    return $3014d862dcc9946b$export$c6913ae0ed6870382;
  }($ac9b757d51178e15$exports.EventEmitter);
  var $3356170d7bce7f20$var$__extends = function() {
    var extendStatics = function(d1, b1) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      return extendStatics(d1, b1);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var $3356170d7bce7f20$var$__values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i2 = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i2 >= o.length)
            o = void 0;
          return {
            value: o && o[i2++],
            done: !o
          };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var $3356170d7bce7f20$export$d365f7ad9d7df9c9 = function(_super) {
    $3356170d7bce7f20$var$__extends($3356170d7bce7f20$export$d365f7ad9d7df9c92, _super);
    function $3356170d7bce7f20$export$d365f7ad9d7df9c92(peerId, provider, options) {
      var _this = _super.call(this, peerId, provider, options) || this;
      _this.stringify = JSON.stringify;
      _this.parse = JSON.parse;
      _this._buffer = [];
      _this._bufferSize = 0;
      _this._buffering = false;
      _this._chunkedData = {};
      _this._encodingQueue = new $3014d862dcc9946b$exports.EncodingQueue();
      _this.connectionId = _this.options.connectionId || $3356170d7bce7f20$export$d365f7ad9d7df9c92.ID_PREFIX + $06cb531ed7840f78$export$7debb50ef11d5e0b.randomToken();
      _this.label = _this.options.label || _this.connectionId;
      _this.serialization = _this.options.serialization || $60fadef21a2daafc$export$89f507cf986a947.Binary;
      _this.reliable = !!_this.options.reliable;
      _this._encodingQueue.on("done", function(ab) {
        _this._bufferedSend(ab);
      });
      _this._encodingQueue.on("error", function() {
        $1615705ecc6adca3$exports.default.error("DC#".concat(_this.connectionId, ": Error occured in encoding from blob to arraybuffer, close DC"));
        _this.close();
      });
      _this._negotiator = new $77f14d3e81888156$exports.Negotiator(_this);
      _this._negotiator.startConnection(_this.options._payload || {
        originator: true
      });
      return _this;
    }
    Object.defineProperty($3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype, "type", {
      get: function() {
        return $60fadef21a2daafc$export$3157d57b4135e3bc.Data;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype, "dataChannel", {
      get: function() {
        return this._dc;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype, "bufferSize", {
      get: function() {
        return this._bufferSize;
      },
      enumerable: false,
      configurable: true
    });
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype.initialize = function(dc) {
      this._dc = dc;
      this._configureDataChannel();
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype._configureDataChannel = function() {
      var _this = this;
      if (!$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.binaryBlob || $06cb531ed7840f78$export$7debb50ef11d5e0b.supports.reliable)
        this.dataChannel.binaryType = "arraybuffer";
      this.dataChannel.onopen = function() {
        $1615705ecc6adca3$exports.default.log("DC#".concat(_this.connectionId, " dc connection success"));
        _this._open = true;
        _this.emit("open");
      };
      this.dataChannel.onmessage = function(e) {
        $1615705ecc6adca3$exports.default.log("DC#".concat(_this.connectionId, " dc onmessage:"), e.data);
        _this._handleDataMessage(e);
      };
      this.dataChannel.onclose = function() {
        $1615705ecc6adca3$exports.default.log("DC#".concat(_this.connectionId, " dc closed for:"), _this.peer);
        _this.close();
      };
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype._handleDataMessage = function(_a) {
      var _this = this;
      var data = _a.data;
      var datatype = data.constructor;
      var isBinarySerialization = this.serialization === $60fadef21a2daafc$export$89f507cf986a947.Binary || this.serialization === $60fadef21a2daafc$export$89f507cf986a947.BinaryUTF8;
      var deserializedData = data;
      if (isBinarySerialization) {
        if (datatype === Blob) {
          $06cb531ed7840f78$export$7debb50ef11d5e0b.blobToArrayBuffer(data, function(ab) {
            var unpackedData = $06cb531ed7840f78$export$7debb50ef11d5e0b.unpack(ab);
            _this.emit("data", unpackedData);
          });
          return;
        } else if (datatype === ArrayBuffer)
          deserializedData = $06cb531ed7840f78$export$7debb50ef11d5e0b.unpack(data);
        else if (datatype === String) {
          var ab1 = $06cb531ed7840f78$export$7debb50ef11d5e0b.binaryStringToArrayBuffer(data);
          deserializedData = $06cb531ed7840f78$export$7debb50ef11d5e0b.unpack(ab1);
        }
      } else if (this.serialization === $60fadef21a2daafc$export$89f507cf986a947.JSON)
        deserializedData = this.parse(data);
      if (deserializedData.__peerData) {
        this._handleChunk(deserializedData);
        return;
      }
      _super.prototype.emit.call(this, "data", deserializedData);
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype._handleChunk = function(data) {
      var id = data.__peerData;
      var chunkInfo = this._chunkedData[id] || {
        data: [],
        count: 0,
        total: data.total
      };
      chunkInfo.data[data.n] = data.data;
      chunkInfo.count++;
      this._chunkedData[id] = chunkInfo;
      if (chunkInfo.total === chunkInfo.count) {
        delete this._chunkedData[id];
        var data_1 = new Blob(chunkInfo.data);
        this._handleDataMessage({
          data: data_1
        });
      }
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype.close = function() {
      this._buffer = [];
      this._bufferSize = 0;
      this._chunkedData = {};
      if (this._negotiator) {
        this._negotiator.cleanup();
        this._negotiator = null;
      }
      if (this.provider) {
        this.provider._removeConnection(this);
        this.provider = null;
      }
      if (this.dataChannel) {
        this.dataChannel.onopen = null;
        this.dataChannel.onmessage = null;
        this.dataChannel.onclose = null;
        this._dc = null;
      }
      if (this._encodingQueue) {
        this._encodingQueue.destroy();
        this._encodingQueue.removeAllListeners();
        this._encodingQueue = null;
      }
      if (!this.open)
        return;
      this._open = false;
      _super.prototype.emit.call(this, "close");
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype.send = function(data, chunked) {
      if (!this.open) {
        _super.prototype.emit.call(this, "error", new Error("Connection is not open. You should listen for the `open` event before sending messages."));
        return;
      }
      if (this.serialization === $60fadef21a2daafc$export$89f507cf986a947.JSON)
        this._bufferedSend(this.stringify(data));
      else if (this.serialization === $60fadef21a2daafc$export$89f507cf986a947.Binary || this.serialization === $60fadef21a2daafc$export$89f507cf986a947.BinaryUTF8) {
        var blob = $06cb531ed7840f78$export$7debb50ef11d5e0b.pack(data);
        if (!chunked && blob.size > $06cb531ed7840f78$export$7debb50ef11d5e0b.chunkedMTU) {
          this._sendChunks(blob);
          return;
        }
        if (!$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.binaryBlob)
          this._encodingQueue.enque(blob);
        else
          this._bufferedSend(blob);
      } else
        this._bufferedSend(data);
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype._bufferedSend = function(msg) {
      if (this._buffering || !this._trySend(msg)) {
        this._buffer.push(msg);
        this._bufferSize = this._buffer.length;
      }
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype._trySend = function(msg) {
      var _this = this;
      if (!this.open)
        return false;
      if (this.dataChannel.bufferedAmount > $3356170d7bce7f20$export$d365f7ad9d7df9c92.MAX_BUFFERED_AMOUNT) {
        this._buffering = true;
        setTimeout(function() {
          _this._buffering = false;
          _this._tryBuffer();
        }, 50);
        return false;
      }
      try {
        this.dataChannel.send(msg);
      } catch (e) {
        $1615705ecc6adca3$exports.default.error("DC#:".concat(this.connectionId, " Error when sending:"), e);
        this._buffering = true;
        this.close();
        return false;
      }
      return true;
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype._tryBuffer = function() {
      if (!this.open)
        return;
      if (this._buffer.length === 0)
        return;
      var msg = this._buffer[0];
      if (this._trySend(msg)) {
        this._buffer.shift();
        this._bufferSize = this._buffer.length;
        this._tryBuffer();
      }
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype._sendChunks = function(blob) {
      var e_1, _a;
      var blobs = $06cb531ed7840f78$export$7debb50ef11d5e0b.chunk(blob);
      $1615705ecc6adca3$exports.default.log("DC#".concat(this.connectionId, " Try to send ").concat(blobs.length, " chunks..."));
      try {
        for (var blobs_1 = $3356170d7bce7f20$var$__values(blobs), blobs_1_1 = blobs_1.next(); !blobs_1_1.done; blobs_1_1 = blobs_1.next()) {
          var blob_1 = blobs_1_1.value;
          this.send(blob_1, true);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (blobs_1_1 && !blobs_1_1.done && (_a = blobs_1.return))
            _a.call(blobs_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.prototype.handleMessage = function(message) {
      var payload = message.payload;
      switch (message.type) {
        case $60fadef21a2daafc$export$adb4a1754da6f10d.Answer:
          this._negotiator.handleSDP(message.type, payload.sdp);
          break;
        case $60fadef21a2daafc$export$adb4a1754da6f10d.Candidate:
          this._negotiator.handleCandidate(payload.candidate);
          break;
        default:
          $1615705ecc6adca3$exports.default.warn("Unrecognized message type:", message.type, "from peer:", this.peer);
          break;
      }
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.ID_PREFIX = "dc_";
    $3356170d7bce7f20$export$d365f7ad9d7df9c92.MAX_BUFFERED_AMOUNT = 8388608;
    return $3356170d7bce7f20$export$d365f7ad9d7df9c92;
  }($0b3b332fd86c5202$exports.BaseConnection);
  var $9e85b3e1327369e6$exports = {};
  $parcel$export($9e85b3e1327369e6$exports, "API", () => $9e85b3e1327369e6$export$2c4e825dc9120f87, (v) => $9e85b3e1327369e6$export$2c4e825dc9120f87 = v);
  var $9e85b3e1327369e6$var$__awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value2) {
      return value2 instanceof P ? value2 : new P(function(resolve) {
        resolve(value2);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value2) {
        try {
          step(generator.next(value2));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value2) {
        try {
          step(generator["throw"](value2));
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
  var $9e85b3e1327369e6$var$__generator = function(thisArg, body) {
    var _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    }, f, y, t, g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
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
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
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
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };
  var $9e85b3e1327369e6$export$2c4e825dc9120f87 = function() {
    function $9e85b3e1327369e6$export$2c4e825dc9120f872(_options) {
      this._options = _options;
    }
    $9e85b3e1327369e6$export$2c4e825dc9120f872.prototype._buildRequest = function(method) {
      var protocol4 = this._options.secure ? "https" : "http";
      var _a = this._options, host = _a.host, port = _a.port, path = _a.path, key = _a.key;
      var url2 = new URL("".concat(protocol4, "://").concat(host, ":").concat(port).concat(path).concat(key, "/").concat(method));
      url2.searchParams.set("ts", "".concat(Date.now()).concat(Math.random()));
      url2.searchParams.set("version", $0d1ed891c5cb27c0$exports.version);
      return fetch(url2.href, {
        referrerPolicy: this._options.referrerPolicy
      });
    };
    $9e85b3e1327369e6$export$2c4e825dc9120f872.prototype.retrieveId = function() {
      return $9e85b3e1327369e6$var$__awaiter(this, void 0, Promise, function() {
        var response, error_1, pathError;
        return $9e85b3e1327369e6$var$__generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([
                0,
                2,
                ,
                3
              ]);
              return [
                4,
                this._buildRequest("id")
              ];
            case 1:
              response = _a.sent();
              if (response.status !== 200)
                throw new Error("Error. Status:".concat(response.status));
              return [
                2,
                response.text()
              ];
            case 2:
              error_1 = _a.sent();
              $1615705ecc6adca3$exports.default.error("Error retrieving ID", error_1);
              pathError = "";
              if (this._options.path === "/" && this._options.host !== $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST)
                pathError = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer.";
              throw new Error("Could not get an ID from the server." + pathError);
            case 3:
              return [
                2
              ];
          }
        });
      });
    };
    $9e85b3e1327369e6$export$2c4e825dc9120f872.prototype.listAllPeers = function() {
      return $9e85b3e1327369e6$var$__awaiter(this, void 0, Promise, function() {
        var response, helpfulError, error_2;
        return $9e85b3e1327369e6$var$__generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([
                0,
                2,
                ,
                3
              ]);
              return [
                4,
                this._buildRequest("peers")
              ];
            case 1:
              response = _a.sent();
              if (response.status !== 200) {
                if (response.status === 401) {
                  helpfulError = "";
                  if (this._options.host === $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST)
                    helpfulError = "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.";
                  else
                    helpfulError = "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.";
                  throw new Error("It doesn't look like you have permission to list peers IDs. " + helpfulError);
                }
                throw new Error("Error. Status:".concat(response.status));
              }
              return [
                2,
                response.json()
              ];
            case 2:
              error_2 = _a.sent();
              $1615705ecc6adca3$exports.default.error("Error retrieving list peers", error_2);
              throw new Error("Could not get list peers from the server." + error_2);
            case 3:
              return [
                2
              ];
          }
        });
      });
    };
    return $9e85b3e1327369e6$export$2c4e825dc9120f872;
  }();
  var $26088d7da5b03f69$var$__extends = function() {
    var extendStatics = function(d1, b1) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      return extendStatics(d1, b1);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var $26088d7da5b03f69$var$__assign = function() {
    $26088d7da5b03f69$var$__assign = Object.assign || function(t) {
      for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
        s = arguments[i2];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return $26088d7da5b03f69$var$__assign.apply(this, arguments);
  };
  var $26088d7da5b03f69$var$__values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i2 = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i2 >= o.length)
            o = void 0;
          return {
            value: o && o[i2++],
            done: !o
          };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var $26088d7da5b03f69$var$__read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i2 = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i2.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = {
        error
      };
    } finally {
      try {
        if (r && !r.done && (m = i2["return"]))
          m.call(i2);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var $26088d7da5b03f69$var$PeerOptions = function() {
    function PeerOptions() {
    }
    return PeerOptions;
  }();
  var $26088d7da5b03f69$export$ecd1fc136c422448 = function(_super) {
    $26088d7da5b03f69$var$__extends($26088d7da5b03f69$export$ecd1fc136c4224482, _super);
    function $26088d7da5b03f69$export$ecd1fc136c4224482(id1, options) {
      var _this = _super.call(this) || this;
      _this._id = null;
      _this._lastServerId = null;
      _this._destroyed = false;
      _this._disconnected = false;
      _this._open = false;
      _this._connections = /* @__PURE__ */ new Map();
      _this._lostMessages = /* @__PURE__ */ new Map();
      var userId;
      if (id1 && id1.constructor == Object)
        options = id1;
      else if (id1)
        userId = id1.toString();
      options = $26088d7da5b03f69$var$__assign({
        debug: 0,
        host: $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST,
        port: $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_PORT,
        path: "/",
        key: $26088d7da5b03f69$export$ecd1fc136c4224482.DEFAULT_KEY,
        token: $06cb531ed7840f78$export$7debb50ef11d5e0b.randomToken(),
        config: $06cb531ed7840f78$export$7debb50ef11d5e0b.defaultConfig,
        referrerPolicy: "strict-origin-when-cross-origin"
      }, options);
      _this._options = options;
      if (_this._options.host === "/")
        _this._options.host = window.location.hostname;
      if (_this._options.path) {
        if (_this._options.path[0] !== "/")
          _this._options.path = "/" + _this._options.path;
        if (_this._options.path[_this._options.path.length - 1] !== "/")
          _this._options.path += "/";
      }
      if (_this._options.secure === void 0 && _this._options.host !== $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST)
        _this._options.secure = $06cb531ed7840f78$export$7debb50ef11d5e0b.isSecure();
      else if (_this._options.host == $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST)
        _this._options.secure = true;
      if (_this._options.logFunction)
        $1615705ecc6adca3$exports.default.setLogFunction(_this._options.logFunction);
      $1615705ecc6adca3$exports.default.logLevel = _this._options.debug || 0;
      _this._api = new $9e85b3e1327369e6$exports.API(options);
      _this._socket = _this._createServerConnection();
      if (!$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.audioVideo && !$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.data) {
        _this._delayedAbort($60fadef21a2daafc$export$9547aaa2e39030ff.BrowserIncompatible, "The current browser does not support WebRTC");
        return _this;
      }
      if (!!userId && !$06cb531ed7840f78$export$7debb50ef11d5e0b.validateId(userId)) {
        _this._delayedAbort($60fadef21a2daafc$export$9547aaa2e39030ff.InvalidID, 'ID "'.concat(userId, '" is invalid'));
        return _this;
      }
      if (userId)
        _this._initialize(userId);
      else
        _this._api.retrieveId().then(function(id) {
          return _this._initialize(id);
        }).catch(function(error) {
          return _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.ServerError, error);
        });
      return _this;
    }
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224482.prototype, "id", {
      get: function() {
        return this._id;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224482.prototype, "options", {
      get: function() {
        return this._options;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224482.prototype, "open", {
      get: function() {
        return this._open;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224482.prototype, "socket", {
      get: function() {
        return this._socket;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224482.prototype, "connections", {
      get: function() {
        var e_1, _a;
        var plainConnections = /* @__PURE__ */ Object.create(null);
        try {
          for (var _b = $26088d7da5b03f69$var$__values(this._connections), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = $26088d7da5b03f69$var$__read(_c.value, 2), k = _d[0], v = _d[1];
            plainConnections[k] = v;
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return plainConnections;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224482.prototype, "destroyed", {
      get: function() {
        return this._destroyed;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224482.prototype, "disconnected", {
      get: function() {
        return this._disconnected;
      },
      enumerable: false,
      configurable: true
    });
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._createServerConnection = function() {
      var _this = this;
      var socket2 = new $31d11a8d122cb4b7$exports.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
      socket2.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Message, function(data) {
        _this._handleMessage(data);
      });
      socket2.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Error, function(error) {
        _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.SocketError, error);
      });
      socket2.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Disconnected, function() {
        if (_this.disconnected)
          return;
        _this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.Network, "Lost connection to server.");
        _this.disconnect();
      });
      socket2.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Close, function() {
        if (_this.disconnected)
          return;
        _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.SocketClosed, "Underlying socket is already closed.");
      });
      return socket2;
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._initialize = function(id) {
      this._id = id;
      this.socket.start(id, this._options.token);
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._handleMessage = function(message) {
      var e_2, _a;
      var type = message.type;
      var payload = message.payload;
      var peerId = message.src;
      switch (type) {
        case $60fadef21a2daafc$export$adb4a1754da6f10d.Open:
          this._lastServerId = this.id;
          this._open = true;
          this.emit("open", this.id);
          break;
        case $60fadef21a2daafc$export$adb4a1754da6f10d.Error:
          this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.ServerError, payload.msg);
          break;
        case $60fadef21a2daafc$export$adb4a1754da6f10d.IdTaken:
          this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.UnavailableID, 'ID "'.concat(this.id, '" is taken'));
          break;
        case $60fadef21a2daafc$export$adb4a1754da6f10d.InvalidKey:
          this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.InvalidKey, 'API KEY "'.concat(this._options.key, '" is invalid'));
          break;
        case $60fadef21a2daafc$export$adb4a1754da6f10d.Leave:
          $1615705ecc6adca3$exports.default.log("Received leave message from ".concat(peerId));
          this._cleanupPeer(peerId);
          this._connections.delete(peerId);
          break;
        case $60fadef21a2daafc$export$adb4a1754da6f10d.Expire:
          this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.PeerUnavailable, "Could not connect to peer ".concat(peerId));
          break;
        case $60fadef21a2daafc$export$adb4a1754da6f10d.Offer:
          var connectionId = payload.connectionId;
          var connection = this.getConnection(peerId, connectionId);
          if (connection) {
            connection.close();
            $1615705ecc6adca3$exports.default.warn("Offer received for existing Connection ID:".concat(connectionId));
          }
          if (payload.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Media) {
            var mediaConnection = new $353dee38f9ab557b$exports.MediaConnection(peerId, this, {
              connectionId,
              _payload: payload,
              metadata: payload.metadata
            });
            connection = mediaConnection;
            this._addConnection(peerId, connection);
            this.emit("call", mediaConnection);
          } else if (payload.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
            var dataConnection = new $3356170d7bce7f20$exports.DataConnection(peerId, this, {
              connectionId,
              _payload: payload,
              metadata: payload.metadata,
              label: payload.label,
              serialization: payload.serialization,
              reliable: payload.reliable
            });
            connection = dataConnection;
            this._addConnection(peerId, connection);
            this.emit("connection", dataConnection);
          } else {
            $1615705ecc6adca3$exports.default.warn("Received malformed connection type:".concat(payload.type));
            return;
          }
          var messages = this._getMessages(connectionId);
          try {
            for (var messages_1 = $26088d7da5b03f69$var$__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
              var message_1 = messages_1_1.value;
              connection.handleMessage(message_1);
            }
          } catch (e_2_1) {
            e_2 = {
              error: e_2_1
            };
          } finally {
            try {
              if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return))
                _a.call(messages_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
          break;
        default:
          if (!payload) {
            $1615705ecc6adca3$exports.default.warn("You received a malformed message from ".concat(peerId, " of type ").concat(type));
            return;
          }
          var connectionId = payload.connectionId;
          var connection = this.getConnection(peerId, connectionId);
          if (connection && connection.peerConnection)
            connection.handleMessage(message);
          else if (connectionId)
            this._storeMessage(connectionId, message);
          else
            $1615705ecc6adca3$exports.default.warn("You received an unrecognized message:", message);
          break;
      }
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._storeMessage = function(connectionId, message) {
      if (!this._lostMessages.has(connectionId))
        this._lostMessages.set(connectionId, []);
      this._lostMessages.get(connectionId).push(message);
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._getMessages = function(connectionId) {
      var messages = this._lostMessages.get(connectionId);
      if (messages) {
        this._lostMessages.delete(connectionId);
        return messages;
      }
      return [];
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype.connect = function(peer, options) {
      if (options === void 0)
        options = {};
      if (this.disconnected) {
        $1615705ecc6adca3$exports.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available.");
        this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
        return;
      }
      var dataConnection = new $3356170d7bce7f20$exports.DataConnection(peer, this, options);
      this._addConnection(peer, dataConnection);
      return dataConnection;
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype.call = function(peer, stream, options) {
      if (options === void 0)
        options = {};
      if (this.disconnected) {
        $1615705ecc6adca3$exports.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect.");
        this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
        return;
      }
      if (!stream) {
        $1615705ecc6adca3$exports.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
        return;
      }
      var mediaConnection = new $353dee38f9ab557b$exports.MediaConnection(peer, this, $26088d7da5b03f69$var$__assign($26088d7da5b03f69$var$__assign({}, options), {
        _stream: stream
      }));
      this._addConnection(peer, mediaConnection);
      return mediaConnection;
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._addConnection = function(peerId, connection) {
      $1615705ecc6adca3$exports.default.log("add connection ".concat(connection.type, ":").concat(connection.connectionId, " to peerId:").concat(peerId));
      if (!this._connections.has(peerId))
        this._connections.set(peerId, []);
      this._connections.get(peerId).push(connection);
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._removeConnection = function(connection) {
      var connections = this._connections.get(connection.peer);
      if (connections) {
        var index = connections.indexOf(connection);
        if (index !== -1)
          connections.splice(index, 1);
      }
      this._lostMessages.delete(connection.connectionId);
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype.getConnection = function(peerId, connectionId) {
      var e_3, _a;
      var connections = this._connections.get(peerId);
      if (!connections)
        return null;
      try {
        for (var connections_1 = $26088d7da5b03f69$var$__values(connections), connections_1_1 = connections_1.next(); !connections_1_1.done; connections_1_1 = connections_1.next()) {
          var connection = connections_1_1.value;
          if (connection.connectionId === connectionId)
            return connection;
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (connections_1_1 && !connections_1_1.done && (_a = connections_1.return))
            _a.call(connections_1);
        } finally {
          if (e_3)
            throw e_3.error;
        }
      }
      return null;
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._delayedAbort = function(type, message) {
      var _this = this;
      setTimeout(function() {
        _this._abort(type, message);
      }, 0);
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._abort = function(type, message) {
      $1615705ecc6adca3$exports.default.error("Aborting!");
      this.emitError(type, message);
      if (!this._lastServerId)
        this.destroy();
      else
        this.disconnect();
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype.emitError = function(type, err) {
      $1615705ecc6adca3$exports.default.error("Error:", err);
      var error;
      if (typeof err === "string")
        error = new Error(err);
      else
        error = err;
      error.type = type;
      this.emit("error", error);
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype.destroy = function() {
      if (this.destroyed)
        return;
      $1615705ecc6adca3$exports.default.log("Destroy peer with ID:".concat(this.id));
      this.disconnect();
      this._cleanup();
      this._destroyed = true;
      this.emit("close");
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._cleanup = function() {
      var e_4, _a;
      try {
        for (var _b = $26088d7da5b03f69$var$__values(this._connections.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var peerId = _c.value;
          this._cleanupPeer(peerId);
          this._connections.delete(peerId);
        }
      } catch (e_4_1) {
        e_4 = {
          error: e_4_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_4)
            throw e_4.error;
        }
      }
      this.socket.removeAllListeners();
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype._cleanupPeer = function(peerId) {
      var e_5, _a;
      var connections = this._connections.get(peerId);
      if (!connections)
        return;
      try {
        for (var connections_2 = $26088d7da5b03f69$var$__values(connections), connections_2_1 = connections_2.next(); !connections_2_1.done; connections_2_1 = connections_2.next()) {
          var connection = connections_2_1.value;
          connection.close();
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1
        };
      } finally {
        try {
          if (connections_2_1 && !connections_2_1.done && (_a = connections_2.return))
            _a.call(connections_2);
        } finally {
          if (e_5)
            throw e_5.error;
        }
      }
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype.disconnect = function() {
      if (this.disconnected)
        return;
      var currentId = this.id;
      $1615705ecc6adca3$exports.default.log("Disconnect peer with ID:".concat(currentId));
      this._disconnected = true;
      this._open = false;
      this.socket.close();
      this._lastServerId = currentId;
      this._id = null;
      this.emit("disconnected", currentId);
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype.reconnect = function() {
      if (this.disconnected && !this.destroyed) {
        $1615705ecc6adca3$exports.default.log("Attempting reconnection to server with ID ".concat(this._lastServerId));
        this._disconnected = false;
        this._initialize(this._lastServerId);
      } else if (this.destroyed)
        throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
      else if (!this.disconnected && !this.open)
        $1615705ecc6adca3$exports.default.error("In a hurry? We're still trying to make the initial connection!");
      else
        throw new Error("Peer ".concat(this.id, " cannot reconnect because it is not disconnected from the server!"));
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.prototype.listAllPeers = function(cb) {
      var _this = this;
      if (cb === void 0)
        cb = function(_) {
        };
      this._api.listAllPeers().then(function(peers) {
        return cb(peers);
      }).catch(function(error) {
        return _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.ServerError, error);
      });
    };
    $26088d7da5b03f69$export$ecd1fc136c4224482.DEFAULT_KEY = "peerjs";
    return $26088d7da5b03f69$export$ecd1fc136c4224482;
  }($ac9b757d51178e15$exports.EventEmitter);
  var $70d766613f57b014$export$2e2bcd8739ae039 = $26088d7da5b03f69$exports.Peer;

  // ../labs/ui/components/Video.ts
  function Video(params) {
    const el = document.createElement("video");
    setElementStyles(el, params?.styles);
    if (params?.srcObject) {
      el.srcObject = params.srcObject;
    }
    if (params?.muted) {
      el.muted = params.muted;
    }
    return el;
  }

  // src/views/Videocall.ts
  var socket = lookup2();
  var getUserMedia = navigator?.mediaDevices?.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  function Videocall() {
    const roomId = window.location.pathname.split("/")[1];
    const peers = {};
    const myPeer = new $70d766613f57b014$export$2e2bcd8739ae039();
    myPeer.on("open", (id) => {
      socket.emit("join-room", roomId, id);
    });
    const el = Div({
      styles: {
        height: "100vh",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center"
      }
    });
    const myVideo = Video({
      muted: true,
      styles: {
        height: "100%",
        width: "100%",
        maxWidth: "600px",
        maxHeight: "400px"
      }
    });
    getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      addVideoStream(myVideo, stream);
      myPeer.on("call", (call) => {
        call.answer(stream);
        const video = Video({
          styles: {
            height: "100%",
            width: "100%",
            maxWidth: "600px",
            maxHeight: "400px"
          }
        });
        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      });
      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });
    });
    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) {
        peers[userId].close();
      }
    });
    function addVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      el.append(video);
    }
    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream);
      const otherUserVideo = Video({
        styles: {
          height: "100%",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "400px"
        }
      });
      call.on("stream", (userVideoStream) => {
        addVideoStream(otherUserVideo, userVideoStream);
      });
      call.on("close", () => {
        otherUserVideo.remove();
      });
      peers[userId] = call;
    }
    return el;
  }

  // src/views/Router.ts
  function Router() {
    const router = Div({ styles: { height: "100%", overflow: "hidden" } });
    function init() {
      handleRouteUpdated();
    }
    window.addEventListener("popstate", handleRouteUpdated);
    async function handleRouteUpdated() {
      router.innerHTML = "";
      const path = window.location.pathname;
      const urlPath = path.split("/");
      let roomId = "";
      if (urlPath[1]) {
        roomId = path;
      }
      switch (path) {
        case "/":
          router.append(Home());
          break;
        case roomId:
          router.append(Videocall());
          break;
        default:
          break;
      }
    }
    init();
    return router;
  }

  // src/app.ts
  async function run() {
    const root = document.getElementById("root");
    if (root) {
      const router = Router();
      root.append(router);
    }
  }
  run();
})();
