/**
 * @author       Axel SHAÏTA <shaita.axel@gmail.com>
 * @license      {@link https://github.com/arkerone/AnimationLoop/blob/master/LICENSE|MIT License}
 */

/**
 * @class AnimationLoop
 * @constructor
 * @param {Function} callback - The callback function called by the loop. The callback method is passed a
 * single argument : the elapsed time (in seconds) since the last update
 */
var AnimationLoop = function (callback) {
  /**
   * @member {Function} callback - The callback function called by the loop
   * @private
   */
  this.callback = callback;

  /**
   * @member {boolean} isRunning - true is the loop is running, otherwise false
   * @private
   */
  this.isRunning = false;

  /**
   * @member {number} time
   * @private
   */
  this.time = null;

  /**
   * @member {number} requestID - The requestAnimationFrame callback ID
   * @private
   */
  this.requestID = null;

  /* requestAnimationFrame polyfill */
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
      || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
};


AnimationLoop.prototype = {
  /**
   * @function update
   * @description The update function for the loop
   * @param {number} now - The current time
   */
  update: function (now) {
    var self = this;
    var dt = this.time ? now - this.time : 0;
    this.time = now;
    if (this.isRunning) {
      this.callback(dt / 1000);
      this.requestID = window.requestAnimationFrame(function (time) {
        self.update(time);
      });
    }
  },

  /**
   * @function start
   * @description Start the loop
   */
  start: function () {
    var self = this;
    this.isRunning = true;
    this.requestID = window.requestAnimationFrame(function (time) {
      self.update(time);
    });
  },

  /**
   * @function stop
   * @description Stop the loop
   */
  stop: function () {
    this.time = null;
    this.isRunning = false;
    window.cancelAnimationFrame(this.requestID);
  }
};
