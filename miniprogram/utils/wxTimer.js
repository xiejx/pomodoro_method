// 参考：https://github.com/baqihg/wxTimer
var timer = function (initObj) {
  initObj = initObj || {};
  this.beginTime = initObj.beginTime || "00:00:00";  // 开始时间
  this.complete = initObj.complete;  // 结束任务
  this.name = initObj.name;  // 计时器名称
  this.callback = initObj.callback;  // 如何处理当前时间和剩下的秒数

  this.intervarID;  // 计时ID
  this.endTime;  // 结束时间
  this.endSystemTime;  // 结束的系统时间
  this.remainTime = this.beginTime;  // 剩下的时间
};

timer.prototype = {
  start: function () {
    // 1970年1月1日的00：00：00的时间戳
    this.endTime = new Date("1970/01/01 " + this.remainTime).getTime();  // 结束时长
    this.endSystemTime = new Date(Date.now() + this.endTime);  // 结束系统时间
    var that = this;

    /**
     * 开始/继续倒计时
     */
    function begin() {
      // 剩余的时间
      var tmpTime = new Date(that.endSystemTime - Date.now());
      // 去掉前面的年月日就剩时分秒了
      that.remainTime = tmpTime.toString().substr(16, 8);
      var remainSecond =
        Math.round((tmpTime.getTime() - new Date("1970/01/01 00:00:00").getTime()) / 1000);
      that.callback(that.remainTime, remainSecond);

      //结束执行函数
      if (remainSecond <= 0) {
        if (that.complete) {
          that.complete();
        }
        that.stop();
      }
    }
    this.intervarID = setInterval(begin, 250);
  },

  /**
   * 暂停倒计时
   */
  pause: function () {
    clearInterval(this.intervarID);
  },

  /**
   * 停止倒计时
   */
  stop: function () {
    this.remainTime = this.beginTime;
    clearInterval(this.intervarID);
  },

  /**
   * 重新开始倒计时
   */
  restart: function () {
    if (this.intervarID) {
      clearInterval(this.intervarID);
    }
    this.remainTime = this.beginTime;
    this.start();
  }
}

module.exports = timer;
