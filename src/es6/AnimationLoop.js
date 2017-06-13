/**
 * @author       Axel SHAÏTA <shaita.axel@gmail.com>
 * @license      {@link https://github.com/arkerone/AnimationLoop/blob/master/LICENSE|MIT License}
 */

/**
 * @class AnimationLoop
 */
class AnimationLoop {

  /**
   * @constructor
   * @param {Function} callback - The callback function called by the loop. The callback method is passed a
   * single argument : the elapsed time (in seconds) since the last update
   */
  constructor(callback) {
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
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
      window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`]
        || window[`${vendors[x]}CancelRequestAnimationFrame`];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
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
  }

  /**
   * @function update
   * @description The update function for the loop
   * @param {number} now - The current time
   */
  update(now) {
    const dt = this.time ? now - this.time : 0;
    this.time = now;
    if (this.isRunning) {
      this.callback(dt / 1000);
      this.requestID = window.requestAnimationFrame(time => this.update(time));
    }
  }

  /**
   * @function start
   * @description Start the loop
   */
  start() {
    this.isRunning = true;
    this.requestID = window.requestAnimationFrame(time => this.update(time));
  }

  /**
   * @function stop
   * @description Stop the loop
   */
  stop() {
    this.time = null;
    this.isRunning = false;
    window.cancelAnimationFrame(this.requestID);
  }
}
