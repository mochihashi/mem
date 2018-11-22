/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./common/App.js":
/*!***********************!*\
  !*** ./common/App.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n\n\nlet _default = class _default {\n  constructor({\n    rootDirs\n  } = {}) {\n    this.TITLE = 'memorize words';\n    this.setPrototypeFunctions();\n    this.rootPath = this.getRootPath(rootDirs);\n    this.args = this.getArgs();\n    this.data = {};\n    this.includedScripts = {};\n    this.includedStyles = {};\n  }\n\n  setTitle(title) {\n    if (title) {\n      title = title + ' - ' + this.TITLE;\n    } else {\n      title = this.TITLE;\n    }\n\n    document.title = title;\n  }\n\n  setPrototypeFunctions() {\n    if (!String.prototype.startsWith) {\n      String.prototype.startsWith = function (str) {\n        str = str.toString();\n        return this.toString().slice(0, str.length) == str;\n      };\n    }\n\n    if (!String.prototype.endsWith) {\n      String.prototype.endsWith = function (str) {\n        str = str.toString();\n        return this.toString().slice(0 - str.length) == str;\n      };\n    }\n  }\n\n  adjustUrl(url) {\n    if (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('/')) return url;\n    return this.rootPath + url;\n  }\n\n  includeScript(url, async = false) {\n    if (!url || this.includedScripts[url]) return this;\n    this.includedScripts[url] = true;\n    let s = document.createElement('script');\n    s.type = 'text/javascript';\n    if (async) s.async = true;\n    s.src = this.adjustUrl(url);\n    document.getElementsByTagName(\"head\")[0].appendChild(s);\n    return this;\n  }\n\n  includeStyle(url) {\n    if (!url || this.includedStyles[url]) return this;\n    this.includedStyles[url] = true;\n    let s = document.createElement('link');\n    s.rel = 'stylesheet';\n    s.href = this.adjustUrl(url);\n    document.getElementsByTagName(\"head\")[0].appendChild(s);\n    return this;\n  }\n  /**\n   * URL = http://domain/root/path/?key1=a&key2=b\n   * ==> '/root';\n   */\n\n\n  getRootPath(rootDirs) {\n    let rootPath = '/';\n\n    if (rootDirs) {\n      if (!Array.isArray(rootDirs)) rootDirs = [rootDirs];\n\n      for (let i in rootDirs) {\n        let dir = rootDirs[i];\n        let p = location.pathname.indexOf(dir);\n        if (p < 0) continue;\n        rootPath = location.pathname.slice(0, p + dir.length);\n        break;\n      }\n    }\n\n    return rootPath;\n  }\n  /**\n   * URL = http://domain/root/path/?key1=a&key2=b\n   * ==> {key1: 'a', key2: 'b'};\n   */\n\n\n  getArgs() {\n    let args = {};\n\n    if (location.search) {\n      let arr = location.search.substring(1).split('&');\n\n      for (let i in arr) {\n        let k = arr[i],\n            v = null;\n        let p = k.indexOf('=');\n\n        if (p >= 0) {\n          v = k.slice(p + 1);\n          k = k.slice(0, p);\n        }\n\n        args[k] = decodeURIComponent(v);\n      }\n    }\n\n    return args;\n  }\n\n};\n\n\n;\n\n//# sourceURL=webpack:///./common/App.js?");

/***/ }),

/***/ "./common/Cookies.js":
/*!***************************!*\
  !*** ./common/Cookies.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n\n\nlet _default = class _default {\n  constructor() {\n    this.map = {};\n    let c = document.cookie;\n    if (!c) return;\n    c = c.split('; ');\n\n    for (let i in c) {\n      let kv = c[i].split('=');\n      if (kv.length < 2 || !kv[1] || kv[1] == 'undefined') continue;\n      this.map[kv[0]] = decodeURIComponent(kv[1]);\n    }\n  }\n\n  get(key) {\n    return this.map[key];\n  }\n\n  set(key, value, expireDays, domain, path) {\n    this.map[key] = value;\n    let c = key + '=' + encodeURIComponent(value);\n    if (!path) path = '/';\n    if (!expireDays) expireDays = 100;\n    c += '; path=' + path;\n    c += '; max-age=' + expireDays * 3600 * 24;\n    if (domain) c += '; domain=' + domain;\n    document.cookie = c;\n  }\n\n  delete(key, domain, path) {\n    if (!this.map[key]) return;\n    this.map[key] = null;\n    let c = key + '=';\n    if (!path) path = '/';\n    c += '; path=' + path;\n    c += '; max-age=0';\n    if (domain) c += '; domain=' + domain;\n    document.cookie = c;\n  }\n\n};\n\n\n;\n\n//# sourceURL=webpack:///./common/Cookies.js?");

/***/ }),

/***/ "./common/InputForm.js":
/*!*****************************!*\
  !*** ./common/InputForm.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var common_Validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/Validator */ \"./common/Validator.js\");\n\n\n\n\nlet _default = class _default {\n  constructor() {\n    this.validator = new common_Validator__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  assign({\n    form,\n    callback,\n    fields,\n    validate\n  }) {\n    this.form = form;\n    let me = this;\n\n    if (fields) {\n      for (let name in fields) {\n        let props = fields[name];\n        form.find('[name=\"' + name + '\"]').change(() => me.validate(name, props));\n      }\n    }\n\n    form.submit(function (event) {\n      event.preventDefault();\n\n      if (fields) {\n        let hasError = false;\n\n        for (let name in fields) {\n          let props = fields[name];\n          if (me.validate(name, props)) continue;\n          if (!hasError) form.find('[name=\"' + name + '\"]').focus();\n          hasError = true;\n        }\n\n        if (hasError) return;\n      }\n\n      if (validate && !validate(form)) return;\n      if (!me.startProcess(form)) return;\n      $.ajax({\n        url: window.app.adjustUrl(form.attr('action')),\n        type: \"POST\",\n        data: form.serialize(),\n        dataType: \"json\",\n        timeout: 10000\n      }).done(function (data, textStatus, jqXHR) {\n        if (data.responseMessages) {\n          me.setMessage(form);\n\n          for (let i = data.responseMessages.length - 1; i >= 0; i--) {\n            me.addMessage(form, data.responseMessages[i], i);\n          }\n        }\n\n        if (!data.error && callback) callback(data);\n      }).fail(function (jqXHR, textStatus, errorThrown) {\n        let error = jqXHR.status + ' ' + textStatus;\n        me.setMessage(form, {\n          error: 'error',\n          suffix: ': ' + jqXHR.status + ' ' + textStatus\n        });\n      }).always(function () {\n        me.endProcess(form);\n      });\n    });\n  }\n\n  setMessage(form, message) {\n    form.parent().find('.alert').remove();\n    if (message) this.addMessage(form, message);\n  }\n\n  addMessage(form, message, index) {\n    let type = message.error ? 'danger' : 'primary';\n    let text = message.text ? message.text : message.error;\n    let prefix = message.prefix || '';\n    let suffix = message.suffix || '';\n    let field = message.field || '';\n    if (text) text = `<span class=\"lang-msg-${text}\"></span>`;\n\n    if (message.error && field) {\n      let obj = form.find('[name=\"' + field + '\"]');\n\n      if (obj.length == 1) {\n        obj.addClass('is-invalid');\n        obj.parent().append(`<div class=\"invalid-feedback\">${prefix}${text}${suffix}</div>`);\n        if (index == 0) form.find('[name=\"' + field + '\"]').focus();\n        return;\n      }\n    }\n\n    if (field) field = `[<span class=\"lang-${field}\"></span>] `;\n    form.parent().prepend(`\n<div class=\"alert alert-${type} alert-dismissible\">\n\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\"></button>\n\t${field}${prefix}${text}${suffix}\n</div>\n\t\t`);\n  }\n\n  startProcess(form) {\n    if (this.isProcessing) return false;\n    this.isProcessing = true;\n    form.find('.dimmer').addClass('active');\n    return true;\n  }\n\n  endProcess(form) {\n    this.isProcessing = false;\n    form.find('.dimmer').removeClass('active');\n  }\n\n  val(object) {\n    let obj = $(object);\n    if (obj.is(':disabled')) return '';\n    let type = obj.attr('type');\n    let name = obj.attr('name');\n    let value = obj.val();\n    if (name === undefined || name == '' || value == '') return '';\n    if (type == 'submit' || type == 'button') return '';\n\n    if (type == 'radio' || type == \"checkbox\") {\n      let arr = [];\n      obj.each(function () {\n        if (this.checked) arr.push(this.val());\n      });\n      value = arr.join(',');\n    }\n\n    return value;\n  }\n\n  validate(name, props) {\n    let obj = this.form.find('[name=\"' + name + '\"]');\n    let value = this.val(obj);\n    obj.parent().find('.invalid-feedback').remove();\n\n    if (this.validator.validate(value, props)) {\n      // ok\n      if (obj.length == 1) obj.removeClass('is-invalid');\n      return true;\n    } else {\n      // error\n      if (obj.length == 1) obj.addClass('is-invalid');\n      let error = this.validator.error;\n      let prefix = this.validator.prefix;\n      let suffix = this.validator.suffix;\n      obj.parent().append(`<div class=\"invalid-feedback\">${prefix}<span class=\"lang-msg-${error}\"></span>${suffix}</div>`);\n      return false;\n    }\n  }\n\n};\n\n\n;\n\n//# sourceURL=webpack:///./common/InputForm.js?");

/***/ }),

/***/ "./common/Lang.js":
/*!************************!*\
  !*** ./common/Lang.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n\n\nlet _default = class _default {\n  constructor({\n    langNames = {\n      en: 'English'\n    },\n    defaultLang = 'en',\n    cssPath = 'css/lang/lang.',\n    jsPath = null\n  }) {\n    this.langNames = langNames;\n    this.cssPath = cssPath;\n    this.jsPath = jsPath;\n    this.texts = {};\n    let lang = window.app.cookies.get('lang');\n\n    if (!lang || !this.langNames[lang]) {\n      lang = defaultLang;\n      let languages = window.navigator.languages || window.navigator.userLanguage || window.navigator.language || [];\n      if (!Array.isArray(languages)) languages = [languages];\n\n      for (let i in languages) {\n        let k = languages[i];\n\n        if (this.langNames[k]) {\n          lang = k;\n          break;\n        }\n      }\n    }\n\n    this.setLang(lang);\n  }\n\n  setLang(lang) {\n    this.lang = lang;\n    $(document).ready(function () {\n      $(document.body).attr('lang', lang);\n    });\n    window.app.includeStyle(this.cssPath + lang + '.css');\n    if (this.jsPath) window.app.includeScript(this.jsPath + lang + '.js', true);\n    window.app.cookies.set('lang', lang);\n  }\n\n  render(selector = '#select-lang') {\n    let options = '';\n\n    for (let k in this.langNames) {\n      let v = this.langNames[k];\n      let selected = k == this.lang ? ' selected=\"selected\"' : '';\n      options += `<option value=\"${k}\"${selected}>${v}</option>`;\n    }\n\n    $(selector).html(options).change(function () {\n      window.app.lang.setLang($('option:selected', this).val());\n    });\n  }\n\n};\n\n\n;\n\n//# sourceURL=webpack:///./common/Lang.js?");

/***/ }),

/***/ "./common/Validator.js":
/*!*****************************!*\
  !*** ./common/Validator.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n\n\nlet _default = class _default {\n  validate(value, props) {\n    this.error = '';\n    this.prefix = '';\n    this.suffix = '';\n    value = value.toString();\n\n    if (value.length == 0) {\n      if (props.required) {\n        this.error = 'required';\n        return false;\n      }\n\n      return true;\n    }\n\n    if (props.type == 'email') {\n      const regex = \"^[a-zA-Z0-9\\\\.\\\\$=_\\\\-\\\\^~\\\\+`]+@[a-zA-Z0-9\\\\._-]+$\";\n\n      if (!value.match(new RegExp(regex))) {\n        this.error = 'not-email';\n        return false;\n      }\n    }\n\n    if (props.minLength && value.length < props.minLength) {\n      this.prefix = props.minLength;\n      this.error = 'length-short';\n      return false;\n    }\n\n    return true;\n  }\n\n};\n\n\n;\n\n//# sourceURL=webpack:///./common/Validator.js?");

/***/ }),

/***/ "./html/FooterHtml.js":
/*!****************************!*\
  !*** ./html/FooterHtml.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var html_Html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html/Html */ \"./html/Html.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  html_Html__WEBPACK_IMPORTED_MODULE_0__[\"renderTo\"]('.footer', `\n<div class=\"container\">\n\t<div class=\"row align-items-center flex-row\">\n\t\t<div class=\"col-12 col-lg-auto mt-3 mt-lg-0 text-center\">\n\t\t\tCopyright © 2018 All rights reserved.\n\t\t</div><!-- .col-12 -->\n\t</div><!-- .row -->\n</div><!-- .container -->\n`);\n});\n\n//# sourceURL=webpack:///./html/FooterHtml.js?");

/***/ }),

/***/ "./html/HeaderHtml.js":
/*!****************************!*\
  !*** ./html/HeaderHtml.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var html_Html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html/Html */ \"./html/Html.js\");\n/* harmony import */ var html_sign_SignOutHtml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html/sign/SignOutHtml */ \"./html/sign/SignOutHtml.js\");\n/* harmony import */ var html_account_AccountControlHtml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! html/account/AccountControlHtml */ \"./html/account/AccountControlHtml.js\");\n/* harmony import */ var html_table_TableEditHtml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! html/table/TableEditHtml */ \"./html/table/TableEditHtml.js\");\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  let div = html_Html__WEBPACK_IMPORTED_MODULE_0__[\"renderTo\"]('.header', `\n<div class=\"container\">\n\t<div class=\"d-flex\">\n\t\t<a class=\"header-brand\" href=\"./\">\n\t\t<i class=\"fe fe-paperclip\"></i>\n\t\tmemorize words\n\t\t</a>\n\t\t<div class=\"d-flex order-lg-2 ml-auto\">\n\t\t\t<button class=\"btn btn-outline-primary mr-2\" name=\"btn-create\"><i class=\"fe fe-plus-circle mr-2\"></i><span class=\"lang-create\"></span></button>\n\t\t\t<select class=\"form-control custom-select w-auto mr-2\" id=\"select-lang\">\n\t\t\t</select>\n\t\t\t<span id=\"account-control\">\n\t\t\t</span>\n\t\t</div><!-- .d-flex -->\n\t</div><!-- .d-flex -->\n</div><!-- .container -->\n`);\n  div.find('[name=\"btn-create\"]').click(html_table_TableEditHtml__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n  Object(html_sign_SignOutHtml__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n    init: true\n  });\n\n  if (window.app.cookies.get('auth')) {\n    $.ajax({\n      url: window.app.adjustUrl('api/sign/auto/'),\n      type: \"POST\",\n      dataType: \"json\",\n      timeout: 10000\n    }).done(function (data, textStatus, jqXHR) {\n      if (data.error) {\n        window.app.cookies.delete('auth');\n      } else {\n        Object(html_account_AccountControlHtml__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(data);\n      }\n    });\n  }\n});\n\n//# sourceURL=webpack:///./html/HeaderHtml.js?");

/***/ }),

/***/ "./html/Html.js":
/*!**********************!*\
  !*** ./html/Html.js ***!
  \**********************/
/*! exports provided: renderTo, renderOverlay, closeOverlay, renderMain, renderOverlayCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderTo\", function() { return renderTo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderOverlay\", function() { return renderOverlay; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeOverlay\", function() { return closeOverlay; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderMain\", function() { return renderMain; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderOverlayCard\", function() { return renderOverlayCard; });\n\n\nfunction renderTo(target, html) {\n  return $(target).html(html);\n}\n\nfunction _initPage() {\n  window.app.pages = {};\n  window.app.activePage = '#main-container';\n}\n\nfunction getOverlayId(pageId, isSelector = true) {\n  let id = 'overlay-container-' + pageId;\n  if (isSelector) id = '#' + id;\n  return id;\n}\n\nfunction renderOverlay(pageName, html) {\n  if (!window.app.pages) _initPage();\n  let pageId = window.app.pages[pageName];\n\n  if (pageId && getOverlayId(pageId) == window.app.activePage) {} else {\n    if (pageId) $(getOverlayId(pageId)).remove();\n    pageId = Object.keys(window.app.pages).length + 1;\n    $('#main-container').parent().append(`<div class=\"container overlay-container\" id=\"${getOverlayId(pageId, false)}\">`);\n    window.app.pages[pageName] = pageId;\n    $(window.app.activePage).hide();\n    window.app.activePage = getOverlayId(pageId);\n  }\n\n  let me = $(window.app.activePage).html(html).show();\n  me.find('.card-options-remove').click(function (event) {\n    event.preventDefault();\n    closeOverlay(pageName);\n  });\n  return me;\n}\nfunction closeOverlay(pageName) {\n  let pageId = window.app.pages[pageName];\n  $(getOverlayId(pageId)).remove();\n  window.app.pages[pageName] = null;\n  let maxId = 0;\n\n  for (let n in window.app.pages) {\n    let id = window.app.pages[n];\n    if (id && id > maxId) maxId = id;\n  }\n\n  if (maxId == 0) {\n    _initPage();\n  } else {\n    window.app.activePage = getOverlayId(maxId);\n  }\n\n  $(window.app.activePage).show();\n}\nfunction renderMain(html) {\n  $('.overlay-container').remove();\n\n  _initPage();\n\n  return $('#main-container').html(html).show();\n}\nfunction renderOverlayCard({\n  pageName,\n  title = '',\n  colClass = 'col-12',\n  html\n}) {\n  return renderOverlay(pageName, `\n<div class=\"row\">\n\t<div class=\"${colClass}\">\n\t\t<div class=\"card\">\n\t\t\t<div class=\"card-header\">\n\t\t\t\t<h3 class=\"card-title\">${title}</h3>\n\t\t\t\t<div class=\"card-options\">\n\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"card-options-remove\" data-toggle=\"card-remove\"><i class=\"fe fe-x\"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"card-body p-6\">\n\t\t\t\t<div class=\"dimmer\"><div class=\"loader\"></div><div class=\"dimmer-content\">\n\t\t\t\t${html}\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\t`);\n}\n\n//# sourceURL=webpack:///./html/Html.js?");

/***/ }),

/***/ "./html/MessageHtml.js":
/*!*****************************!*\
  !*** ./html/MessageHtml.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var html_Html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html/Html */ \"./html/Html.js\");\n/* harmony import */ var html_sign_SignInHtml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html/sign/SignInHtml */ \"./html/sign/SignInHtml.js\");\n/* harmony import */ var html_sign_SignUpHtml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! html/sign/SignUpHtml */ \"./html/sign/SignUpHtml.js\");\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (message) {\n  let div = html_Html__WEBPACK_IMPORTED_MODULE_0__[\"renderOverlay\"]('message', `\n<div class=\"row\">\n\t<div class=\"col col-login mx-auto\">\n\t\t<div class=\"card\">\n\t\t\t<div class=\"card-header\">\n\t\t\t\t<h3 class=\"card-title\"></h3>\n\t\t\t\t<div class=\"card-options\">\n\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"card-options-remove\" data-toggle=\"card-remove\"><i class=\"fe fe-x\"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"card-body p-6\">\n\t\t\t\t<span class=\"lang-msg-${message}\"></span>\n\t\t\t\t<div class=\"btn-list mt-3\"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div><!-- .col-login -->\n</div><!-- .row -->\n\t`);\n\n  if (message == 'activated') {\n    div.find('.btn-list').html(`<button class=\"btn btn-primary\"><span class=\"lang-sign-in\"></span></button>`);\n    div.find('.btn-list button').click(html_sign_SignInHtml__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  } else if (message == 'activate-expired') {\n    div.find('.btn-list').html(`<button class=\"btn btn-primary\"><span class=\"lang-sign-up\"></span></button>`);\n    div.find('.btn-list button').click(html_sign_SignUpHtml__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n  }\n});\n\n//# sourceURL=webpack:///./html/MessageHtml.js?");

/***/ }),

/***/ "./html/account/AccountControlHtml.js":
/*!********************************************!*\
  !*** ./html/account/AccountControlHtml.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var html_Html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html/Html */ \"./html/Html.js\");\n/* harmony import */ var html_sign_SignOutHtml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html/sign/SignOutHtml */ \"./html/sign/SignOutHtml.js\");\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (data) {\n  window.app.cookies.set('auth', data.auth);\n  let div = html_Html__WEBPACK_IMPORTED_MODULE_0__[\"renderTo\"]('#account-control', `\n<div class=\"dropdown\" id=\"div-login-user\">\n\t<a href=\"javascript:void(0)\" class=\"nav-link pr-0 leading-none\" data-toggle=\"dropdown\">\n\t<span class=\"avatar\"><i class=\"fe fe-user\"></i></span>\n\t<span class=\"ml-2 d-none d-lg-block\">\n\t<span class=\"text-default\">${data.name}</span>\n\t</span>\n\t</a>\n\t<div class=\"dropdown-menu dropdown-menu-right dropdown-menu-arrow\">\n\t\t<a class=\"dropdown-item\" href=\"account.html\">\n\t\t<i class=\"dropdown-icon fe fe-home\"></i> <span class=\"lang-my-page\"></span>\n\t\t</a>\n\t\t<div class=\"dropdown-divider\"></div>\n\t\t<button class=\"dropdown-item\">\n\t\t<i class=\"dropdown-icon fe fe-user\"></i> <span class=\"lang-profile\"></span>\n\t\t</button>\n\t\t<button class=\"dropdown-item\">\n\t\t<i class=\"dropdown-icon fe fe-grid\"></i> <span class=\"lang-tables\"></span>\n\t\t</button>\n\t\t<button class=\"dropdown-item\">\n\t\t<i class=\"dropdown-icon fe fe-folder\"></i> <span class=\"lang-categories\"></span>\n\t\t</button>\n\t\t<div class=\"dropdown-divider\"></div>\n\t\t<button class=\"dropdown-item\" id=\"btn-sign-out\">\n\t\t<i class=\"dropdown-icon fe fe-log-out\"></i> <span class=\"lang-sign-out\"></span>\n\t\t</button>\n\t</div>\n</div>\n\t`);\n  div.find('#btn-sign-out').click(html_sign_SignOutHtml__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n});\n\n//# sourceURL=webpack:///./html/account/AccountControlHtml.js?");

/***/ }),

/***/ "./html/sign/SignInHtml.js":
/*!*********************************!*\
  !*** ./html/sign/SignInHtml.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var html_Html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html/Html */ \"./html/Html.js\");\n/* harmony import */ var html_sign_SignUpHtml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html/sign/SignUpHtml */ \"./html/sign/SignUpHtml.js\");\n/* harmony import */ var html_account_AccountControlHtml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! html/account/AccountControlHtml */ \"./html/account/AccountControlHtml.js\");\n/* harmony import */ var common_InputForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/InputForm */ \"./common/InputForm.js\");\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  let div = html_Html__WEBPACK_IMPORTED_MODULE_0__[\"renderOverlay\"]('sign', `\n<div class=\"row\">\n\t<div class=\"col col-login mx-auto\">\n\t\t<form class=\"card\" action=\"api/sign/in/\">\n\t\t\t<div class=\"card-header\">\n\t\t\t\t<h3 class=\"card-title\"><span class=\"lang-sign-in\"></span></h3>\n\t\t\t\t<div class=\"card-options\">\n\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"card-options-remove\" data-toggle=\"card-remove\"><i class=\"fe fe-x\"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"card-body p-6\">\n\t\t\t\t<div class=\"dimmer\"><div class=\"loader\"></div><div class=\"dimmer-content\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label class=\"form-label\"><span class=\"lang-email-address\"></span></label>\n\t\t\t\t\t<input type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"Email\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label class=\"form-label\">\n\t\t\t\t\t<span class=\"lang-password\"></span>\n\t\t\t\t\t<a href=\"./forgot-password.html\" class=\"float-right small\"><span class=\"lang-msg-forgot-password\"></span></a>\n\t\t\t\t\t</label>\n\t\t\t\t\t<input type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"Password\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-footer\">\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-block\"><span class=\"lang-sign-in\"></span></button>\n\t\t\t\t</div>\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t</form>\n\t\t<div class=\"text-center text-muted\">\n\t\t\t<span class=\"lang-msg-no-account\"></span>\n\t\t\t<button class=\"btn btn-outline-primary\" name=\"btn-to-sign-up\"><span class=\"lang-sign-up\"></span></button>\n\t\t</div>\n\t</div><!-- .col-login -->\n</div><!-- .row -->\n\t`);\n  div.find('[name=\"btn-to-sign-up\"]').click(html_sign_SignUpHtml__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  div.find('[name=\"email\"]').focus();\n  new common_InputForm__WEBPACK_IMPORTED_MODULE_3__[\"default\"]().assign({\n    form: div.find('form'),\n    fields: {\n      email: {\n        required: true,\n        type: 'email'\n      },\n      password: {\n        required: true,\n        minLength: 8\n      }\n    },\n    callback: function (data) {\n      html_Html__WEBPACK_IMPORTED_MODULE_0__[\"closeOverlay\"]('sign');\n      Object(html_account_AccountControlHtml__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(data);\n    }\n  });\n});\n\n//# sourceURL=webpack:///./html/sign/SignInHtml.js?");

/***/ }),

/***/ "./html/sign/SignOutHtml.js":
/*!**********************************!*\
  !*** ./html/sign/SignOutHtml.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var html_Html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html/Html */ \"./html/Html.js\");\n/* harmony import */ var html_sign_SignInHtml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html/sign/SignInHtml */ \"./html/sign/SignInHtml.js\");\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function ({\n  init = false\n}) {\n  let div = html_Html__WEBPACK_IMPORTED_MODULE_0__[\"renderTo\"]('#account-control', `\n<button class=\"btn btn-primary\" id=\"btn-sign-in\"><span class=\"lang-sign-in\"></span></button>\n\t`);\n  div.find('#btn-sign-in').click(html_sign_SignInHtml__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  if (!init) window.app.cookies.delete('auth');\n});\n\n//# sourceURL=webpack:///./html/sign/SignOutHtml.js?");

/***/ }),

/***/ "./html/sign/SignUpHtml.js":
/*!*********************************!*\
  !*** ./html/sign/SignUpHtml.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var html_Html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html/Html */ \"./html/Html.js\");\n/* harmony import */ var html_sign_SignInHtml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html/sign/SignInHtml */ \"./html/sign/SignInHtml.js\");\n/* harmony import */ var common_InputForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/InputForm */ \"./common/InputForm.js\");\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  let div = html_Html__WEBPACK_IMPORTED_MODULE_0__[\"renderOverlay\"]('sign', `\n<div class=\"row\">\n\t<div class=\"col col-login mx-auto\">\n\t\t<form class=\"card\" action=\"api/sign/up/\">\n\t\t\t<div class=\"card-header\">\n\t\t\t\t<h3 class=\"card-title\"><span class=\"lang-sign-up\"></span></h3>\n\t\t\t\t<div class=\"card-options\">\n\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"card-options-remove\" data-toggle=\"card-remove\"><i class=\"fe fe-x\"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"card-body p-6\">\n\t\t\t\t<div class=\"dimmer\"><div class=\"loader\"></div><div class=\"dimmer-content\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label class=\"form-label\"><span class=\"lang-name\"></span></label>\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"Name\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label class=\"form-label\"><span class=\"lang-email-address\"></span></label>\n\t\t\t\t\t<input type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"Email\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label class=\"form-label\"><span class=\"lang-password\"></span></label>\n\t\t\t\t\t<input type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"Password\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-footer\">\n\t\t\t\t\t<input type=\"hidden\" name=\"lang\" value=\"${window.app.lang.lang}\"/>\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-block\"><span class=\"lang-create-new-account\"></span></button>\n\t\t\t\t</div>\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t</form>\n\t\t<div class=\"text-center text-muted\">\n\t\t\t<span class=\"lang-msg-already-have-account\"></span>\n\t\t\t<button class=\"btn btn-outline-primary\" name=\"btn-to-sign-in\"><span class=\"lang-sign-in\"></span></button>\n\t\t</div>\n\t</div><!-- .col-login -->\n</div><!-- .row -->\n\t`);\n  div.find('[name=\"btn-to-sign-in\"]').click(html_sign_SignInHtml__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  div.find('[name=\"name\"]').focus();\n  new common_InputForm__WEBPACK_IMPORTED_MODULE_2__[\"default\"]().assign({\n    form: div.find('form'),\n    fields: {\n      name: {\n        required: true,\n        minLength: 3\n      },\n      email: {\n        required: true,\n        type: 'email'\n      },\n      password: {\n        required: true,\n        minLength: 8\n      }\n    },\n    callback: renderRegistered\n  });\n});\n\nfunction renderRegistered() {\n  html_Html__WEBPACK_IMPORTED_MODULE_0__[\"renderOverlay\"]('sign', `\n<div class=\"row\">\n\t<div class=\"col col-login mx-auto\">\n\t\t<div class=\"card\">\n\t\t\t<div class=\"card-header\">\n\t\t\t\t<h3 class=\"card-title\"><span class=\"lang-msg-account-registered\"></span></h3>\n\t\t\t\t<div class=\"card-options\">\n\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"card-options-remove\" data-toggle=\"card-remove\"><i class=\"fe fe-x\"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"card-body p-6\">\n\t\t\t\t<div><span class=\"lang-msg-activation-email-sent\"></span></div>\n\t\t\t</div>\n\t\t</div>\n\t</div><!-- .col-login -->\n</div><!-- .row -->\n\t`);\n}\n\n//# sourceURL=webpack:///./html/sign/SignUpHtml.js?");

/***/ }),

/***/ "./html/table/TableEditHtml.js":
/*!*************************************!*\
  !*** ./html/table/TableEditHtml.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var html_Html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html/Html */ \"./html/Html.js\");\n/* harmony import */ var common_InputForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/InputForm */ \"./common/InputForm.js\");\n/* harmony import */ var html_sign_SignInHtml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! html/sign/SignInHtml */ \"./html/sign/SignInHtml.js\");\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function ({\n  title,\n  words,\n  description,\n  category,\n  isPrivate,\n  tableId\n}) {\n  if (!words) words = `English\tSpanish\nHello\tHola\nGood morning\tBuenos días\nGoodbye\tAdiós\nThank you\tGracias\nSorry\tLo siento\nI don't know\tNo lo sé`;\n  let div = html_Html__WEBPACK_IMPORTED_MODULE_0__[\"renderOverlay\"]('edit', `\n<div class=\"row\">\n\t<div class=\"col-12\">\n\t\t<form class=\"card\" action=\"api/table/save/\">\n\t\t\t<div class=\"card-header\">\n\t\t\t\t<div class=\"form-group col-10 mb-0\">\n\t\t\t\t<input type=\"text\" name=\"title\" class=\"form-control\" value=\"${title || ''}\" placeholder=\"Title\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-options\">\n\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"card-options-remove\" data-toggle=\"card-remove\"><i class=\"fe fe-x\"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"card-body\">\n\t\t\t\t<div class=\"btn-list\">\n\t\t\t\t\t<button class=\"btn btn-primary btn-lg\"><i class=\"fe fe-play mr-2\"></i><span class=\"lang-start-test\"></span></button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group mt-2\">\n\t\t\t\t\t<textarea rows=\"9\" name=\"words\" class=\"form-control\">${words}</textarea>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<label class=\"form-label\"><span class=\"lang-description\"></span></label>\n\t\t\t\t\t\t\t<textarea name=\"description\" rows=\"3\" class=\"form-control\">${description || ''}</textarea>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-md-6 col-lg-3\">\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<label class=\"form-label\"><i class=\"fe fe-folder\"></i> <span class=\"lang-category\"></span></label>\n\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t<input type=\"text\" name=\"category\" class=\"form-control\" value=\"${category || ''}\">\n\t\t\t\t\t\t\t\t<!--\n\t\t\t\t\t\t\t\t<div class=\"input-group-append\">\n\t\t\t\t\t\t\t\t\t<button data-toggle=\"dropdown\" type=\"button\" class=\"btn btn-secondary dropdown-toggle\"></button>\n\t\t\t\t\t\t\t\t\t<div class=\"dropdown-menu dropdown-menu-right\">\n\t\t\t\t\t\t\t\t\t\t<a class=\"dropdown-item\" href=\"javascript:void(0);\" onclick=\"$(this).parent().parent().parent().find('input').val($(this).text());\">Study Japanese</a>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t-->\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-md-6 col-lg-3\">\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<label class=\"form-label\"><span class=\"lang-option\"></span></label>\n\t\t\t\t\t\t\t<label class=\"custom-switch\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" name=\"private\" class=\"custom-switch-input\" ${isPrivate ? 'checked' : ''}>\n\t\t\t\t\t\t\t\t<span class=\"custom-switch-indicator\"></span>\n\t\t\t\t\t\t\t\t<span class=\"custom-switch-description\"><span class=\"lang-private\"></span></span>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div><!-- .card-body -->\n\t\t\t<div class=\"card-footer d-flex align-items-center\">\n\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\"><i class=\"fe fe-save mr-2\"></i><span class=\"lang-save\"></span></button>\n\t\t\t\t<label class=\"custom-control custom-checkbox ml-3\" name=\"control-overwrite\">\n\t\t\t\t\t<input type=\"checkbox\" class=\"custom-control-input\" name=\"overwrite\" value=\"1\" ${tableId ? 'checked' : ''}>\n\t\t\t\t\t<span class=\"custom-control-label\"><span class=\"lang-overwrite\"></span></span>\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t</form><!-- .card -->\n\t</div><!-- .col-12 -->\n</div><!-- .row -->\n\t`);\n  let obj = div.find('[name=\"words\"]');\n  obj[0].setSelectionRange(0, obj.text().length);\n  obj.focus();\n  if (!tableId) div.find('[name=\"control-overwrite\"]').hide();\n  let inputForm = new common_InputForm__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  inputForm.assign({\n    form: div.find('form'),\n    fields: {\n      title: {\n        required: true\n      },\n      words: {\n        required: true\n      }\n    },\n    validate: function (form) {\n      let text = div.find('[name=\"words\"]').val();\n      let arr = CSV.parse(text, {\n        delimiter: '\\t'\n      });\n\n      if (arr.length < 3) {\n        inputForm.setMessage(form, {\n          'field': 'words',\n          'error': 'row-short',\n          'prefix': 3\n        });\n        return false;\n      }\n\n      if (arr[0].length < 2) {\n        inputForm.setMessage(form, {\n          'field': 'words',\n          'error': 'column-short',\n          'prefix': 2\n        });\n        return false;\n      }\n\n      if (!window.app.cookies.get('auth')) {\n        Object(html_sign_SignInHtml__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n        return false;\n      }\n\n      return true;\n    },\n    callback: function (data) {\n      if (data.table_path) location.href = data.table_path;\n    }\n  });\n});\n\n//# sourceURL=webpack:///./html/table/TableEditHtml.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var common_App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/App */ \"./common/App.js\");\n/* harmony import */ var common_Cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/Cookies */ \"./common/Cookies.js\");\n/* harmony import */ var common_Lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/Lang */ \"./common/Lang.js\");\n/* harmony import */ var html_HeaderHtml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! html/HeaderHtml */ \"./html/HeaderHtml.js\");\n/* harmony import */ var html_FooterHtml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html/FooterHtml */ \"./html/FooterHtml.js\");\n/* harmony import */ var html_MessageHtml__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! html/MessageHtml */ \"./html/MessageHtml.js\");\n\n\n\n\n\n\nwindow.app = new common_App__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  rootDirs: '/public/'\n});\nwindow.app.includeStyle('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css').includeStyle('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext').includeScript('https://mochihashi.github.io/static/tabler/assets/js/vendors/bootstrap.bundle.min.js').includeScript('https://mochihashi.github.io/static/tabler/assets/js/tabler-core.js').includeStyle('https://mochihashi.github.io/static/tabler/assets/css/tabler.css').includeScript('https://mochihashi.github.io/static/js/csv.min.js').includeStyle('css/style.css');\nwindow.app.cookies = new common_Cookies__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nwindow.app.lang = new common_Lang__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  langNames: {\n    en: 'English',\n    ja: '日本語'\n  },\n  cssPath: 'css/lang/lang.',\n  jsPath: 'js/lang/lang.'\n});\n$(document).ready(function () {\n  Object(html_HeaderHtml__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n  Object(html_FooterHtml__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n  window.app.lang.render('#select-lang');\n\n  if (window.app.args.msg) {\n    Object(html_MessageHtml__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(window.app.args.msg);\n  }\n});\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ });