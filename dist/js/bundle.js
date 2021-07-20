/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/parts/calc.js":
/*!******************************!*\
  !*** ./src/js/parts/calc.js ***!
  \******************************/
/***/ ((module) => {

function calc() {
  // Калькулятор
  var persons = document.querySelectorAll('.counter-block-input')[0],
      restDays = document.querySelectorAll('.counter-block-input')[1],
      place = document.getElementById('select'),
      totalValue = document.getElementById('total'),
      personsSum = 0,
      daysSum = 0,
      total = 0;
  totalValue.innerHTML = 0;
  persons.addEventListener('change', function () {
    personsSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });
  restDays.addEventListener('change', function () {
    daysSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (persons.value == '' || restDays.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });
  place.addEventListener('change', function () {
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      var a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });
}

module.exports = calc;

/***/ }),

/***/ "./src/js/parts/form.js":
/*!******************************!*\
  !*** ./src/js/parts/form.js ***!
  \******************************/
/***/ ((module) => {

function form() {
  // Форма
  var message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };
  var form = document.querySelector('.main-form'),
      input = form.getElementsByTagName('input'),
      formContact = document.getElementById('form'),
      inputContact = formContact.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
  statusMessage.classList.add('status'); // function submitForm(nameForm, inputForm) {
  //     nameForm.addEventListener('submit', function(event) {
  //         event.preventDefault();
  //         nameForm.appendChild(statusMessage);
  //         let request = new XMLHttpRequest();
  //         request.open('POST', 'server.php');
  //         // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //         request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  //         // let formData = new FormData(nameForm);
  //         // request.send(formData);
  //         let formData = new FormData(nameForm);
  //         let obj = {};
  //         formData.forEach(function(value, key) {
  //             obj[key] = value;
  //         });
  //         let json = JSON.stringify(obj);
  //         request.send(json);
  //         request.addEventListener('readystatechange', function() {
  //             if (request.readyState < 4) {
  //                 statusMessage.innerHTML = message.loading;
  //             } else if(request.readyState === 4 && request.status == 200) {
  //                 statusMessage.innerHTML = message.success;
  //             } else {
  //                 statusMessage.innerHTML = message.failure;
  //             }
  //         });
  //         for (let i = 0; i < inputForm.length; i++) {
  //             inputForm[i].value = '';
  //         }
  //     });
  // }
  // submitForm(form, input);
  // submitForm(formContact, inputContact);
  // Отправка форм с использованием Promise

  function submitForm(nameForm, nameInput) {
    nameForm.addEventListener('submit', function (event) {
      event.preventDefault();
      nameForm.appendChild(statusMessage);
      var formData = new FormData(nameForm);
      var obj = {};
      formData.forEach(function (value, key) {
        obj[key] = value;
      });
      var json = JSON.stringify(obj);

      function postData(data) {
        return new Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
          request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4 && request.status == 200) {
              resolve();
            } else {
              reject();
            }
          });
          request.send(data);
        });
      }

      function clearInput() {
        for (var i = 0; i < nameInput.length; i++) {
          nameInput[i].value = '';
        }
      }

      postData(json).then(function () {
        return statusMessage.innerHTML = message.loading;
      }).then(function () {
        return statusMessage.innerHTML = message.success;
      }).catch(function () {
        return statusMessage.innerHTML = message.failure;
      }).then(clearInput);
    });
  }

  submitForm(form, input);
  submitForm(formContact, inputContact);
}

module.exports = form;

/***/ }),

/***/ "./src/js/parts/modal.js":
/*!*******************************!*\
  !*** ./src/js/parts/modal.js ***!
  \*******************************/
/***/ ((module) => {

function modal() {
  // Модальное окно
  var more = document.querySelector('.more'),
      overvlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close'),
      description = document.querySelectorAll('.description-btn');

  function showModal(btn) {
    btn.addEventListener('click', function () {
      overvlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function () {
      overvlay.style.display = 'none';
      btn.classList.remove('more-splash');
      document.body.style.overflow = '';
    });
  }

  showModal(more);
  description.forEach(function (item) {
    showModal(item);
  });
}

module.exports = modal;

/***/ }),

/***/ "./src/js/parts/slider.js":
/*!********************************!*\
  !*** ./src/js/parts/slider.js ***!
  \********************************/
/***/ ((module) => {

function slider() {
  // Слайдер
  var slideIndex = 1,
      slides = document.querySelectorAll('.slider-item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot');
  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(function (item) {
      return item.style.display = 'none';
    }); // for (let i = 0; i < slides.length; i++) {
    //     slides[i].style.display = 'none';
    // }

    dots.forEach(function (item) {
      return item.classList.remove('dot-active');
    });
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', function () {
    plusSlides(-1);
  });
  next.addEventListener('click', function () {
    plusSlides(1);
  });
  dotsWrap.addEventListener('click', function (event) {
    for (var i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  });
}

module.exports = slider;

/***/ }),

/***/ "./src/js/parts/tabs.js":
/*!******************************!*\
  !*** ./src/js/parts/tabs.js ***!
  \******************************/
/***/ ((module) => {

function tabs() {
  // Табы на странице
  var tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function (event) {
    var target = event.target;

    if (target && target.classList.contains('info-header-tab')) {
      for (var i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/parts/timer.js":
/*!*******************************!*\
  !*** ./src/js/parts/timer.js ***!
  \*******************************/
/***/ ((module) => {

function timer() {
  // Таймер
  var deadline = '2021-07-15';

  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor(t / 1000 % 60),
        minutes = Math.floor(t / 1000 / 60 % 60),
        hours = Math.floor(t / (1000 * 60 * 60));
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function setClock(id, endtime) {
    var timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      var t = getTimeRemaining(endtime);

      function addZeroForNumber(number) {
        if (number < 10) {
          return '0' + number;
        } else return number;
      }

      hours.textContent = addZeroForNumber(t.hours);
      minutes.textContent = addZeroForNumber(t.minutes);
      seconds.textContent = addZeroForNumber(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }

  setClock('timer', deadline);
}

module.exports = timer;

/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof __webpack_require__.g !== 'undefined') {
    local = __webpack_require__.g;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "./node_modules/formdata-polyfill/formdata.min.js":
/*!********************************************************!*\
  !*** ./node_modules/formdata-polyfill/formdata.min.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
;(function(){var h;function l(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}}var m="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(a==Array.prototype||a==Object.prototype)return a;a[c]=b.value;return a};
function n(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var b=a[c];if(b&&b.Math==Math)return b}throw Error("Cannot find global object");}var q=n(this);function r(a,c){if(c)a:{for(var b=q,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];if(!(f in b))break a;b=b[f]}d=d[d.length-1];e=b[d];f=c(e);f!=e&&null!=f&&m(b,d,{configurable:!0,writable:!0,value:f})}}
r("Symbol",function(a){function c(f){if(this instanceof c)throw new TypeError("Symbol is not a constructor");return new b(d+(f||"")+"_"+e++,f)}function b(f,g){this.A=f;m(this,"description",{configurable:!0,writable:!0,value:g})}if(a)return a;b.prototype.toString=function(){return this.A};var d="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",e=0;return c});
r("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var c="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),b=0;b<c.length;b++){var d=q[c[b]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&m(d.prototype,a,{configurable:!0,writable:!0,value:function(){return u(l(this))}})}return a});function u(a){a={next:a};a[Symbol.iterator]=function(){return this};return a}
function v(a){var c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return c?c.call(a):{next:l(a)}}var w;if("function"==typeof Object.setPrototypeOf)w=Object.setPrototypeOf;else{var y;a:{var z={a:!0},A={};try{A.__proto__=z;y=A.a;break a}catch(a){}y=!1}w=y?function(a,c){a.__proto__=c;if(a.__proto__!==c)throw new TypeError(a+" is not extensible");return a}:null}var B=w;function C(){this.m=!1;this.j=null;this.v=void 0;this.h=1;this.u=this.C=0;this.l=null}
function D(a){if(a.m)throw new TypeError("Generator is already running");a.m=!0}C.prototype.o=function(a){this.v=a};C.prototype.s=function(a){this.l={D:a,F:!0};this.h=this.C||this.u};C.prototype["return"]=function(a){this.l={"return":a};this.h=this.u};function E(a,c){a.h=3;return{value:c}}function F(a){this.g=new C;this.G=a}F.prototype.o=function(a){D(this.g);if(this.g.j)return G(this,this.g.j.next,a,this.g.o);this.g.o(a);return H(this)};
function I(a,c){D(a.g);var b=a.g.j;if(b)return G(a,"return"in b?b["return"]:function(d){return{value:d,done:!0}},c,a.g["return"]);a.g["return"](c);return H(a)}F.prototype.s=function(a){D(this.g);if(this.g.j)return G(this,this.g.j["throw"],a,this.g.o);this.g.s(a);return H(this)};
function G(a,c,b,d){try{var e=c.call(a.g.j,b);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.g.m=!1,e;var f=e.value}catch(g){return a.g.j=null,a.g.s(g),H(a)}a.g.j=null;d.call(a.g,f);return H(a)}function H(a){for(;a.g.h;)try{var c=a.G(a.g);if(c)return a.g.m=!1,{value:c.value,done:!1}}catch(b){a.g.v=void 0,a.g.s(b)}a.g.m=!1;if(a.g.l){c=a.g.l;a.g.l=null;if(c.F)throw c.D;return{value:c["return"],done:!0}}return{value:void 0,done:!0}}
function J(a){this.next=function(c){return a.o(c)};this["throw"]=function(c){return a.s(c)};this["return"]=function(c){return I(a,c)};this[Symbol.iterator]=function(){return this}}function K(a,c){var b=new J(new F(c));B&&a.prototype&&B(b,a.prototype);return b}
if("undefined"!==typeof Blob&&("undefined"===typeof FormData||!FormData.prototype.keys)){var L=function(a,c){for(var b=0;b<a.length;b++)c(a[b])},M=function(a){return a.replace(/\r?\n|\r/g,"\r\n")},N=function(a,c,b){if(c instanceof Blob){b=void 0!==b?String(b+""):"string"===typeof c.name?c.name:"blob";if(c.name!==b||"[object Blob]"===Object.prototype.toString.call(c))c=new File([c],b);return[String(a),c]}return[String(a),String(c)]},O=function(a,c){if(a.length<c)throw new TypeError(c+" argument required, but only "+
a.length+" present.");},P="object"===typeof globalThis?globalThis:"object"===typeof window?window:"object"===typeof self?self:this,Q=P.FormData,R=P.XMLHttpRequest&&P.XMLHttpRequest.prototype.send,S=P.Request&&P.fetch,T=P.navigator&&P.navigator.sendBeacon,U=P.Element&&P.Element.prototype,V=P.Symbol&&Symbol.toStringTag;V&&(Blob.prototype[V]||(Blob.prototype[V]="Blob"),"File"in P&&!File.prototype[V]&&(File.prototype[V]="File"));try{new File([],"")}catch(a){P.File=function(c,b,d){c=new Blob(c,d||{});
Object.defineProperties(c,{name:{value:b},lastModified:{value:+(d&&void 0!==d.lastModified?new Date(d.lastModified):new Date)},toString:{value:function(){return"[object File]"}}});V&&Object.defineProperty(c,V,{value:"File"});return c}}var escape=function(a){return a.replace(/\n/g,"%0A").replace(/\r/g,"%0D").replace(/"/g,"%22")},W=function(a){this.i=[];var c=this;a&&L(a.elements,function(b){if(b.name&&!b.disabled&&"submit"!==b.type&&"button"!==b.type&&!b.matches("form fieldset[disabled] *"))if("file"===
b.type){var d=b.files&&b.files.length?b.files:[new File([],"",{type:"application/octet-stream"})];L(d,function(e){c.append(b.name,e)})}else"select-multiple"===b.type||"select-one"===b.type?L(b.options,function(e){!e.disabled&&e.selected&&c.append(b.name,e.value)}):"checkbox"===b.type||"radio"===b.type?b.checked&&c.append(b.name,b.value):(d="textarea"===b.type?M(b.value):b.value,c.append(b.name,d))})};h=W.prototype;h.append=function(a,c,b){O(arguments,2);this.i.push(N(a,c,b))};h["delete"]=function(a){O(arguments,
1);var c=[];a=String(a);L(this.i,function(b){b[0]!==a&&c.push(b)});this.i=c};h.entries=function c(){var b,d=this;return K(c,function(e){1==e.h&&(b=0);if(3!=e.h)return b<d.i.length?e=E(e,d.i[b]):(e.h=0,e=void 0),e;b++;e.h=2})};h.forEach=function(c,b){O(arguments,1);for(var d=v(this),e=d.next();!e.done;e=d.next()){var f=v(e.value);e=f.next().value;f=f.next().value;c.call(b,f,e,this)}};h.get=function(c){O(arguments,1);var b=this.i;c=String(c);for(var d=0;d<b.length;d++)if(b[d][0]===c)return b[d][1];
return null};h.getAll=function(c){O(arguments,1);var b=[];c=String(c);L(this.i,function(d){d[0]===c&&b.push(d[1])});return b};h.has=function(c){O(arguments,1);c=String(c);for(var b=0;b<this.i.length;b++)if(this.i[b][0]===c)return!0;return!1};h.keys=function b(){var d=this,e,f,g,k,p;return K(b,function(t){1==t.h&&(e=v(d),f=e.next());if(3!=t.h){if(f.done){t.h=0;return}g=f.value;k=v(g);p=k.next().value;return E(t,p)}f=e.next();t.h=2})};h.set=function(b,d,e){O(arguments,2);b=String(b);var f=[],g=N(b,
d,e),k=!0;L(this.i,function(p){p[0]===b?k&&(k=!f.push(g)):f.push(p)});k&&f.push(g);this.i=f};h.values=function d(){var e=this,f,g,k,p,t;return K(d,function(x){1==x.h&&(f=v(e),g=f.next());if(3!=x.h){if(g.done){x.h=0;return}k=g.value;p=v(k);p.next();t=p.next().value;return E(x,t)}g=f.next();x.h=2})};W.prototype._asNative=function(){for(var d=new Q,e=v(this),f=e.next();!f.done;f=e.next()){var g=v(f.value);f=g.next().value;g=g.next().value;d.append(f,g)}return d};W.prototype._blob=function(){var d="----formdata-polyfill-"+
Math.random(),e=[],f="--"+d+'\r\nContent-Disposition: form-data; name="';this.forEach(function(g,k){return"string"==typeof g?e.push(f+escape(M(k))+('"\r\n\r\n'+M(g)+"\r\n")):e.push(f+escape(M(k))+('"; filename="'+escape(g.name)+'"\r\nContent-Type: '+(g.type||"application/octet-stream")+"\r\n\r\n"),g,"\r\n")});e.push("--"+d+"--");return new Blob(e,{type:"multipart/form-data; boundary="+d})};W.prototype[Symbol.iterator]=function(){return this.entries()};W.prototype.toString=function(){return"[object FormData]"};
U&&!U.matches&&(U.matches=U.matchesSelector||U.mozMatchesSelector||U.msMatchesSelector||U.oMatchesSelector||U.webkitMatchesSelector||function(d){d=(this.document||this.ownerDocument).querySelectorAll(d);for(var e=d.length;0<=--e&&d.item(e)!==this;);return-1<e});V&&(W.prototype[V]="FormData");if(R){var X=P.XMLHttpRequest.prototype.setRequestHeader;P.XMLHttpRequest.prototype.setRequestHeader=function(d,e){X.call(this,d,e);"content-type"===d.toLowerCase()&&(this.B=!0)};P.XMLHttpRequest.prototype.send=
function(d){d instanceof W?(d=d._blob(),this.B||this.setRequestHeader("Content-Type",d.type),R.call(this,d)):R.call(this,d)}}S&&(P.fetch=function(d,e){e&&e.body&&e.body instanceof W&&(e.body=e.body._blob());return S.call(this,d,e)});T&&(P.navigator.sendBeacon=function(d,e){e instanceof W&&(e=e._asNative());return T.call(this,d,e)});P.FormData=W};
})();


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (() => {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var formdata_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! formdata-polyfill */ "./node_modules/formdata-polyfill/formdata.min.js");
__webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill();

__webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");


window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var calc = __webpack_require__(/*! ./parts/calc.js */ "./src/js/parts/calc.js"),
      form = __webpack_require__(/*! ./parts/form.js */ "./src/js/parts/form.js"),
      slider = __webpack_require__(/*! ./parts/slider.js */ "./src/js/parts/slider.js"),
      tabs = __webpack_require__(/*! ./parts/tabs.js */ "./src/js/parts/tabs.js"),
      timer = __webpack_require__(/*! ./parts/timer.js */ "./src/js/parts/timer.js"),
      modal = __webpack_require__(/*! ./parts/modal.js */ "./src/js/parts/modal.js");

  calc();
  form();
  slider();
  tabs();
  timer();
  modal();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map