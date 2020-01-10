// pages/indexTimer/indexTimer.js
var timer = require('../../utils/wxTimer.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 计时状态
    // 0:没有计时（开始） 1: 正在计时（暂停）
    // 2:停止（继续、停止） 
    state: 0,
    clockType: 'work', // 时钟类型
    wxTimer: "25:00", // 剩余时间
    wxTimerSecond: "1500", // 剩余秒数
  },
  /**
   * 非页面数据
   */
  workTimer: null, // 番茄钟
  totalTime: "00:25:00", // 总时间
  // 不同工作类型对应的时间
  workType: {
    work: "00:25:00",
    rest: "00:03:00",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 开始工作倒计时
   */
  startClock: function() {
    var that = this;
    this.totalTime = this.workType[this.data.clockType];

    // 创建计时器
    this.workTimer = new timer({
      beginTime: this.totalTime,
      name: "workTimer",
      callback: function(param1) {
        that.setData({
          wxTimer: param1.substring(3),
        });
      },
      complete: function() {
        that.setData({
          state: 0,
        });
        console.log("完成了");

        // 振动四次
        let count = 0;
        let inter = setInterval(function() {
          if (count == 4) {
            clearInterval(inter);
          } else {
            wx.vibrateLong();
            count++;
          }
        }, 600);
      }
    });

    this.setData({
      state: 1,
    });
    this.workTimer.restart();  // 为了防止出错
  },

  /**
   * 暂停计时器
   */
  pauseClock: function() {
    this.workTimer.pause();
    this.setData({
      state: 2,
    });
  },

  /**
   * 继续计时器
   */
  continueClock: function() {
    this.setData({
      state: 1,
    });
    this.workTimer.start();
  },

  /**
   * 停止计时器
   */
  stopClock: function() {
    this.workTimer.stop();
    this.setData({
      state: 0,
      wxTimer: this.workType[this.data.clockType].substring(3),
    });
  },

  /**
   * 选择计时器类型
   */
  selectType: function(event) {
    var workType = event.currentTarget.dataset.type;
    if (workType == this.data.clockType || this.data.state != 0) {
      return;
    }
    this.totalTime = this.workType[workType];
    this.setData({
      clockType: workType,
      wxTimer: this.totalTime.substring(3),
    });
  }
})
