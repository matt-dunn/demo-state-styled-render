parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"oT5c":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TestSVG=void 0;var e=require("../../packages/render"),t=function(t){var r=t.empty,s=t.size,i=void 0===s?40:s;return(0,e.jsx)("svg",{viewBox:"0 0 1024 1024",style:{height:i+"px"}},(0,e.jsx)("path",{fill:r?"yellow":"#fff",style:{cursor:"text"},d:"M448 0c-247.36 0-448 200.64-448 448 0 122.624 49.504 233.504 129.376 314.496l-1.376 261.504 214.496-141.888c34.016 8.384 68.992 13.888 105.504 13.888 247.36 0 448-200.64 448-448s-200.64-448-448-448z",stroke:"inherit"}))};exports.TestSVG=t;
},{"../../packages/render":"ll1T"}]},{},[], null)
//# sourceMappingURL=TestSVG.cbe7c0cc.js.map