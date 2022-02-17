(() => {
  // node_modules/@capacitor/core/dist/index.js
  var createCapacitorPlatforms = (win) => {
    const defaultPlatformMap = /* @__PURE__ */ new Map();
    defaultPlatformMap.set("web", { name: "web" });
    const capPlatforms = win.CapacitorPlatforms || {
      currentPlatform: { name: "web" },
      platforms: defaultPlatformMap
    };
    const addPlatform2 = (name, platform) => {
      capPlatforms.platforms.set(name, platform);
    };
    const setPlatform2 = (name) => {
      if (capPlatforms.platforms.has(name)) {
        capPlatforms.currentPlatform = capPlatforms.platforms.get(name);
      }
    };
    capPlatforms.addPlatform = addPlatform2;
    capPlatforms.setPlatform = setPlatform2;
    return capPlatforms;
  };
  var initPlatforms = (win) => win.CapacitorPlatforms = createCapacitorPlatforms(win);
  var CapacitorPlatforms = /* @__PURE__ */ initPlatforms(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  var addPlatform = CapacitorPlatforms.addPlatform;
  var setPlatform = CapacitorPlatforms.setPlatform;
  var ExceptionCode;
  (function(ExceptionCode2) {
    ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
    ExceptionCode2["Unavailable"] = "UNAVAILABLE";
  })(ExceptionCode || (ExceptionCode = {}));
  var CapacitorException = class extends Error {
    constructor(message, code) {
      super(message);
      this.message = message;
      this.code = code;
    }
  };
  var getPlatformId = (win) => {
    var _a, _b;
    if (win === null || win === void 0 ? void 0 : win.androidBridge) {
      return "android";
    } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
      return "ios";
    } else {
      return "web";
    }
  };
  var createCapacitor = (win) => {
    var _a, _b, _c, _d, _e;
    const capCustomPlatform = win.CapacitorCustomPlatform || null;
    const cap = win.Capacitor || {};
    const Plugins2 = cap.Plugins = cap.Plugins || {};
    const capPlatforms = win.CapacitorPlatforms;
    const defaultGetPlatform = () => {
      return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
    };
    const getPlatform = ((_a = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _a === void 0 ? void 0 : _a.getPlatform) || defaultGetPlatform;
    const defaultIsNativePlatform = () => getPlatform() !== "web";
    const isNativePlatform = ((_b = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _b === void 0 ? void 0 : _b.isNativePlatform) || defaultIsNativePlatform;
    const defaultIsPluginAvailable = (pluginName) => {
      const plugin = registeredPlugins.get(pluginName);
      if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
        return true;
      }
      if (getPluginHeader(pluginName)) {
        return true;
      }
      return false;
    };
    const isPluginAvailable = ((_c = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _c === void 0 ? void 0 : _c.isPluginAvailable) || defaultIsPluginAvailable;
    const defaultGetPluginHeader = (pluginName) => {
      var _a2;
      return (_a2 = cap.PluginHeaders) === null || _a2 === void 0 ? void 0 : _a2.find((h) => h.name === pluginName);
    };
    const getPluginHeader = ((_d = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _d === void 0 ? void 0 : _d.getPluginHeader) || defaultGetPluginHeader;
    const handleError = (err) => win.console.error(err);
    const pluginMethodNoop = (_target, prop, pluginName) => {
      return Promise.reject(`${pluginName} does not have an implementation of "${prop}".`);
    };
    const registeredPlugins = /* @__PURE__ */ new Map();
    const defaultRegisterPlugin = (pluginName, jsImplementations = {}) => {
      const registeredPlugin = registeredPlugins.get(pluginName);
      if (registeredPlugin) {
        console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
        return registeredPlugin.proxy;
      }
      const platform = getPlatform();
      const pluginHeader = getPluginHeader(pluginName);
      let jsImplementation;
      const loadPluginImplementation = async () => {
        if (!jsImplementation && platform in jsImplementations) {
          jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
        } else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) {
          jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
        }
        return jsImplementation;
      };
      const createPluginMethod = (impl, prop) => {
        var _a2, _b2;
        if (pluginHeader) {
          const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
          if (methodHeader) {
            if (methodHeader.rtype === "promise") {
              return (options) => cap.nativePromise(pluginName, prop.toString(), options);
            } else {
              return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
            }
          } else if (impl) {
            return (_a2 = impl[prop]) === null || _a2 === void 0 ? void 0 : _a2.bind(impl);
          }
        } else if (impl) {
          return (_b2 = impl[prop]) === null || _b2 === void 0 ? void 0 : _b2.bind(impl);
        } else {
          throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
        }
      };
      const createPluginMethodWrapper = (prop) => {
        let remove;
        const wrapper = (...args) => {
          const p = loadPluginImplementation().then((impl) => {
            const fn = createPluginMethod(impl, prop);
            if (fn) {
              const p2 = fn(...args);
              remove = p2 === null || p2 === void 0 ? void 0 : p2.remove;
              return p2;
            } else {
              throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
            }
          });
          if (prop === "addListener") {
            p.remove = async () => remove();
          }
          return p;
        };
        wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
        Object.defineProperty(wrapper, "name", {
          value: prop,
          writable: false,
          configurable: false
        });
        return wrapper;
      };
      const addListener = createPluginMethodWrapper("addListener");
      const removeListener = createPluginMethodWrapper("removeListener");
      const addListenerNative = (eventName, callback) => {
        const call = addListener({ eventName }, callback);
        const remove = async () => {
          const callbackId = await call;
          removeListener({
            eventName,
            callbackId
          }, callback);
        };
        const p = new Promise((resolve) => call.then(() => resolve({ remove })));
        p.remove = async () => {
          console.warn(`Using addListener() without 'await' is deprecated.`);
          await remove();
        };
        return p;
      };
      const proxy = new Proxy({}, {
        get(_, prop) {
          switch (prop) {
            case "$$typeof":
              return void 0;
            case "toJSON":
              return () => ({});
            case "addListener":
              return pluginHeader ? addListenerNative : addListener;
            case "removeListener":
              return removeListener;
            default:
              return createPluginMethodWrapper(prop);
          }
        }
      });
      Plugins2[pluginName] = proxy;
      registeredPlugins.set(pluginName, {
        name: pluginName,
        proxy,
        platforms: /* @__PURE__ */ new Set([
          ...Object.keys(jsImplementations),
          ...pluginHeader ? [platform] : []
        ])
      });
      return proxy;
    };
    const registerPlugin2 = ((_e = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _e === void 0 ? void 0 : _e.registerPlugin) || defaultRegisterPlugin;
    if (!cap.convertFileSrc) {
      cap.convertFileSrc = (filePath) => filePath;
    }
    cap.getPlatform = getPlatform;
    cap.handleError = handleError;
    cap.isNativePlatform = isNativePlatform;
    cap.isPluginAvailable = isPluginAvailable;
    cap.pluginMethodNoop = pluginMethodNoop;
    cap.registerPlugin = registerPlugin2;
    cap.Exception = CapacitorException;
    cap.DEBUG = !!cap.DEBUG;
    cap.isLoggingEnabled = !!cap.isLoggingEnabled;
    cap.platform = cap.getPlatform();
    cap.isNative = cap.isNativePlatform();
    return cap;
  };
  var initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
  var Capacitor = /* @__PURE__ */ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  var registerPlugin = Capacitor.registerPlugin;
  var Plugins = Capacitor.Plugins;

  // node_modules/@capacitor/push-notifications/dist/esm/index.js
  var PushNotifications = registerPlugin("PushNotifications", {});

  // src/app.ts
  if (Capacitor.isNativePlatform()) {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === "granted") {
        PushNotifications.register();
      } else {
      }
    });
    PushNotifications.addListener("registration", (token) => {
      alert("Push registration success, token: " + token.value);
    });
    PushNotifications.addListener("registrationError", (error) => {
      alert("Error on registration: " + JSON.stringify(error));
    });
    PushNotifications.addListener("pushNotificationReceived", (notification) => {
      alert("Push received: " + JSON.stringify(notification));
    });
    PushNotifications.addListener("pushNotificationActionPerformed", (notification) => {
      alert("Push action performed: " + JSON.stringify(notification));
    });
  }
})();
/*! Capacitor: https://capacitorjs.com/ - MIT License */
