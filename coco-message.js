"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

!function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.cocoMessage = factory());
}(void 0, function () {
  "use strict";

  if (typeof window === "undefined") {
    return;
  }

  var msgWrapper = c({
    className: "coco-msg-stage"
  });

  function c(args, children) {
    var el = document.createElement("div");

    for (var key in args) {
      var element = args[key];

      if (key == "className") {
        key = "class";
        el.setAttribute(key, element);
      } else if (key[0] == "_") {
        el.addEventListener(key.slice(1), element);
      }
    }

    if (typeof children == "string") {
      el.innerHTML = children;
    } else if (_typeof(children) == "object" && children.tagName) {
      el.appendChild(children);
    } else if (children) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        el.appendChild(child);
      }
    }

    return el;
  }

  function addAnimationEnd(el, fn) {
    ["a", "webkitA"].forEach(function (prefix) {
      var name = prefix + "nimationEnd";
      el.addEventListener(name, function () {
        fn();
      });
    });
  }

  function css(el, css) {
    for (var key in css) {
      el.style[key] = css[key];
    }

    if (el.getAttribute("style") === "") {
      el.removeAttribute("style");
    }
  }

  function addClass(el, s) {
    var c = el.className || "";

    if (!hasClass(c, s)) {
      var arr = c.split(/\s+/);
      arr.push(s);
      el.className = arr.join(" ");
    }
  }

  function hasClass(c, s) {
    return c.indexOf(s) > -1 ? !0 : !1;
  }

  function removeClass(el, s) {
    var c = el.className || "";

    if (hasClass(c, s)) {
      var arr = c.split(/\s+/);
      var i = arr.indexOf(s);
      arr.splice(i, 1);
      el.className = arr.join(" ");
    }

    if (el.className === "") {
      el.removeAttribute("class");
    }
  }

  var initArgs = {
    msg: "",
    duration: 2000,
    showClose: false
  };
  var cocoMessage = {
    info: function info() {
      initConfig(arguments, "info");
    },
    success: function success() {
      initConfig(arguments, "success");
    },
    warning: function warning() {
      initConfig(arguments, "warning");
    },
    error: function error() {
      initConfig(arguments, "error");
    },
    loading: function loading() {
      return initConfig(arguments, "loading");
    },
    destroyAll: function destroyAll() {
      _destroyAll();
    },
    config: function config(obj) {
      for (var key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          if (obj[key] !== undefined) {
            initArgs[key] = obj[key];
          }
        }
      }
    }
  };

  function initConfig(obj, type) {
    var args = {};

    for (var key in initArgs) {
      args[key] = initArgs[key];
    }

    for (var i = 0; i < obj.length; i++) {
      var it = obj[i];

      if (it !== undefined) {
        if (typeof it == "string" || _typeof(it) == "object") {
          args.msg = it;
        } else if (typeof it == "boolean") {
          args.showClose = it;
        } else if (typeof it == "function") {
          args.onClose = it;
        } else if (typeof it == "number") {
          args.duration = it;
        }
      }
    }

    args.type = type;
    return createMsgEl(args);
  }

  function createMsgEl(args) {
    var type = args.type,
        duration = args.duration,
        msg = args.msg,
        showClose = args.showClose,
        onClose = args.onClose;
    var closable = duration === 0;
    var iconObj = getIconObj();

    if (type == "loading") {
      msg = msg === "" ? "正在加载，请稍后" : msg;
      closable = showClose;
      duration = 0;
    }

    var el = c({
      className: "coco-msg-wrapper"
    }, [c({
      className: "coco-msg coco-msg-fade-in ".concat(type)
    }, [c({
      className: "coco-msg-icon"
    }, iconObj[type]), c({
      className: "coco-msg-content"
    }, msg), c({
      className: "coco-msg-wait ".concat(closable ? "coco-msg-pointer" : ""),
      _click: function _click() {
        if (closable) {
          closeMsg(el, onClose);
        }
      }
    }, getMsgRight(closable))])]);
    var anm = el.querySelector(".coco-msg__circle");

    if (anm && type !== "loading") {
      css(anm, {
        animation: "coco-msg__circle ".concat(duration, "ms linear")
      });

      if ("onanimationend" in window) {
        addAnimationEnd(anm, function () {
          closeMsg(el, onClose);
        });
      } else {
        setTimeout(function () {
          closeMsg(el, onClose);
        }, duration);
      }
    }

    if (type == "loading" && duration !== 0) {
      setTimeout(function () {
        closeMsg(el, onClose);
      }, duration);
    }

    if (!msgWrapper.children.length) {
      document.body.appendChild(msgWrapper);
    }

    msgWrapper.appendChild(el);
    css(el, {
      height: el.offsetHeight + "px"
    });
    setTimeout(function () {
      removeClass(el.children[0], "coco-msg-fade-in");
    }, 300);

    if (type == "loading") {
      return function () {
        closeMsg(el, onClose);
      };
    }
  }

  function getMsgRight(showClose) {
    if (showClose) {
      return "\n    <svg class=\"coco-msg-close\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5514\"><path d=\"M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z\" p-id=\"5515\"></path></svg>\n    ";
    } else {
      return "<svg class=\"coco-msg-progress\" viewBox=\"0 0 33.83098862 33.83098862\" xmlns=\"http://www.w3.org/2000/svg\">\n    <circle class=\"coco-msg__background\" cx=\"16.9\" cy=\"16.9\" r=\"15.9\"></circle>\n    <circle class=\"coco-msg__circle\" stroke-dasharray=\"100,100\" cx=\"16.9\" cy=\"16.9\" r=\"15.9\"></circle>\n    </svg>\n    ";
    }
  }

  function closeMsg(el, cb) {
    if (!el) return;
    css(el, {
      padding: 0,
      height: 0
    });
    addClass(el.children[0], "coco-msg-fade-out");
    cb && cb();
    setTimeout(function () {
      if (!el) return;
      var has = false;

      for (var i = 0; i < msgWrapper.children.length; i++) {
        if (msgWrapper.children[i] === el) {
          has = true;
        }
      }

      has && removeChild(el);
      el = null;

      if (!msgWrapper.children.length) {
        has && removeChild(msgWrapper);
      }
    }, 300);
  }

  function getIconObj() {
    return {
      info: "\n    <svg t=\"1609810636603\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3250\"><path d=\"M469.333333 341.333333h85.333334v469.333334H469.333333z\" fill=\"#ffffff\" p-id=\"3251\"></path><path d=\"M469.333333 213.333333h85.333334v85.333334H469.333333z\" fill=\"#ffffff\" p-id=\"3252\"></path><path d=\"M384 341.333333h170.666667v85.333334H384z\" fill=\"#ffffff\" p-id=\"3253\"></path><path d=\"M384 725.333333h256v85.333334H384z\" fill=\"#ffffff\" p-id=\"3254\"></path></svg>\n    ",
      success: "\n    <svg t=\"1609781242911\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1807\"><path d=\"M455.42 731.04c-8.85 0-17.75-3.05-24.99-9.27L235.14 553.91c-16.06-13.81-17.89-38.03-4.09-54.09 13.81-16.06 38.03-17.89 54.09-4.09l195.29 167.86c16.06 13.81 17.89 38.03 4.09 54.09-7.58 8.83-18.31 13.36-29.1 13.36z\" p-id=\"1808\" fill=\"#ffffff\"></path><path d=\"M469.89 731.04c-8.51 0-17.07-2.82-24.18-8.6-16.43-13.37-18.92-37.53-5.55-53.96L734.1 307.11c13.37-16.44 37.53-18.92 53.96-5.55 16.43 13.37 18.92 37.53 5.55 53.96L499.67 716.89c-7.58 9.31-18.64 14.15-29.78 14.15z\" p-id=\"1809\" fill=\"#ffffff\"></path></svg>\n    ",
      warning: "\n    <svg t=\"1609776406944\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"18912\"><path d=\"M468.114286 621.714286c7.314286 21.942857 21.942857 36.571429 43.885714 36.571428s36.571429-14.628571 43.885714-36.571428L585.142857 219.428571c0-43.885714-36.571429-73.142857-73.142857-73.142857-43.885714 0-73.142857 36.571429-73.142857 80.457143l29.257143 394.971429zM512 731.428571c-43.885714 0-73.142857 29.257143-73.142857 73.142858s29.257143 73.142857 73.142857 73.142857 73.142857-29.257143 73.142857-73.142857-29.257143-73.142857-73.142857-73.142858z\" p-id=\"18913\" fill=\"#ffffff\"></path></svg>\n    ",
      error: "\n    <svg t=\"1609810716933\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5514\"><path d=\"M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z\" p-id=\"5515\" fill=\"#ffffff\"></path></svg>\n    ",
      loading: "\n    <div class=\"coco-msg_loading\">\n    <svg class=\"coco-msg-circular\" viewBox=\"25 25 50 50\">\n      <circle class=\"coco-msg-path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"4\" stroke-miterlimit=\"10\"/>\n    </svg>\n    </div>\n    "
    };
  }

  function removeChild(el) {
    el && el.parentNode.removeChild(el);
  }

  function _destroyAll() {
    for (var i = 0; i < msgWrapper.children.length; i++) {
      var element = msgWrapper.children[i];
      closeMsg(element);
    }
  }

  window.addEventListener("DOMContentLoaded", function () {
    insertCssInHead();
  });

  function insertCssInHead() {
    var doc = document;

    if (doc && doc.head) {
      var head = doc.head;

      var _css = doc.createElement("style");

      var cssStr = "[class|=coco],[class|=coco]::after,[class|=coco]::before{box-sizing:border-box;outline:0}.coco-msg-progress{width:14px;height:14px}.coco-msg__circle{stroke-width:2;stroke-linecap:square;fill:none;transform:rotate(-90deg);transform-origin:center}.coco-msg-stage:hover .coco-msg__circle{-webkit-animation-play-state:paused!important;animation-play-state:paused!important}.coco-msg__background{stroke-width:2;fill:none}.coco-msg-stage{position:fixed;top:20px;left:50%;width:auto;transform:translate(-50%,0);z-index:3000;padding-top:constant(safe-area-inset-top);padding-top:env(safe-area-inset-top)}.coco-msg-wrapper{position:relative;left:50%;transform:translate(-50%,0);transition:height .35s ease-out,padding .35s ease-out;padding:8px 0;will-change:transform,opacity}.coco-msg-content,.coco-msg-icon,.coco-msg-wait{display:inline-block}.coco-msg-icon{position:relative;width:16px;height:16px;border-radius:100%;display:flex;justify-content:center;align-items:center;opacity:.87654321}.coco-msg-icon svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;box-sizing:content-box}.coco-msg-wait{width:20px;height:20px;position:relative}.coco-msg-wait svg{position:absolute;top:50%;right:-4px;transform:translate(0,-50%);fill:currentColor}.coco-msg-close{width:14px;height:14px}.coco-msg-content{margin:0 10px;min-width:180px;text-align:left;font-size:14px;font-weight:400}.coco-msg.error .coco-msg-icon,.coco-msg.info .coco-msg-icon,.coco-msg.success .coco-msg-icon,.coco-msg.warning .coco-msg-icon{background-color:currentColor}.coco-msg{padding:10px 20px;border-radius:10px;border-radius:2px;position:relative;left:50%;transform:translate(-50%,0);display:flex;align-items:center}.coco-msg.info,.coco-msg.loading{background-color:#f7f8fa;color:#4e5969;box-shadow:0 0 0 1px rgba(192,192,192,.2)}.coco-msg.success{background-color:#e8ffea;color:#129a37;box-shadow:0 0 0 1px rgba(213,235,215,.2)}.coco-msg.warning{background-color:#fffce8;color:#cc9213;box-shadow:0 0 0 1px rgba(214,201,152,.2)}.coco-msg.error{color:#f53f3f;background-color:#fff0ec;box-shadow:0 0 0 1px rgba(238,189,189,.2)}.coco-msg.info .coco-msg-icon path,.coco-msg.loading .coco-msg-icon path{fill:#f7f8fa}.coco-msg.success .coco-msg-icon path{fill:#e8ffea}.coco-msg.warning .coco-msg-icon path{fill:#fffce8}.coco-msg.error .coco-msg-icon path{fill:#ffece8}.dark .coco-msg.info,.dark .coco-msg.loading{background-color:#2e2e30;color:#dfdfdf}.dark .coco-msg.success{background-color:#004d1c;color:#50d266}.dark .coco-msg.warning{background-color:#4d3800;color:#f7c034}.dark .coco-msg.error{background-color:#4d000a;color:#f98d86}.dark .coco-msg{box-shadow:0 0 1px 0 rgba(55,55,55,.3)!important}.dark .coco-msg.info .coco-msg-icon path,.dark .coco-msg.loading .coco-msg-icon path{fill:#2e2e30}.dark .coco-msg.success .coco-msg-icon path{fill:#004d1c}.dark .coco-msg.warning .coco-msg-icon path{fill:#4d3800}.dark .coco-msg.error .coco-msg-icon path{fill:#4d000a}.coco-msg.loading .coco-msg-icon{background-color:transparent}@keyframes coco-msg__circle{0%{stroke:#b3b9b9;stroke:currentColor}to{stroke:#b3b9b9;stroke:currentColor;stroke-dasharray:0 100}}.coco-msg_loading{flex-shrink:0;width:20px;height:20px;position:relative}.coco-msg-circular{-webkit-animation:coco-msg-rotate 2s linear infinite both;animation:coco-msg-rotate 2s linear infinite both;transform-origin:center center;height:18px!important;width:18px!important}.coco-msg-path{stroke-dasharray:1,200;stroke-dashoffset:0;stroke:currentColor;-webkit-animation:coco-msg-dash 1.5s ease-in-out infinite;animation:coco-msg-dash 1.5s ease-in-out infinite;stroke-linecap:round}@-webkit-keyframes coco-msg-rotate{100%{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes coco-msg-rotate{100%{transform:translate(-50%,-50%) rotate(360deg)}}@-webkit-keyframes coco-msg-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes coco-msg-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}.coco-msg-pointer{cursor:pointer}.coco-msg-fade-in{-webkit-animation:coco-msg-fade .22s ease-out both;animation:coco-msg-fade .22s ease-out both}.coco-msg-fade-out{animation:coco-msg-fade .22s linear reverse both}@-webkit-keyframes coco-msg-fade{0%{opacity:0;transform:translate(-50%,-80%)}to{opacity:1;transform:translate(-50%,0)}}@keyframes coco-msg-fade{0%{opacity:0;transform:translate(-50%,-80%)}to{opacity:1;transform:translate(-50%,0)}}";
      _css.innerHTML = cssStr;
      head.appendChild(_css);
    }
  }

  return cocoMessage;
});