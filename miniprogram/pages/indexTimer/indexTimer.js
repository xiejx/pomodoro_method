// pages/indexTimer/indexTimer.js
var timer = require('../../utils/wxTimer.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: false,  // 计时状态
    clockType: 'work',  // 时钟类型
    wxTimerList: {},  // 计时器列表
    wxTimer: "25:00",  // 剩余时间
    wxTimerSecond: "1500",  // 剩余秒数
  },
  /**
   * 非页面数据
   */
  workTimer: null,  // 番茄钟
  totalTime: "00:25:00",  // 总时间

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        console.log(res);
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 控制番茄钟的启动和停止
   */
  controlClock: function () {
    if (!this.data.state) {
      this.startWork();
    } else {
      this.stopWork();
    }
  },
  /**
   * 开始工作倒计时
   */
  startWork: function () {
    var that = this;
    if (this.data.clockType == 'work') {
      this.totalTime = '00:25:00';
    } else if (this.data.clockType == 'rest') {
      this.totalTime = '00:05:00';
    } else {
      this.totalTime = '00:00:10';
    }

    workTimer = new timer({
      beginTime: this.totalTime,
      name: "workTimer",
      complete: function () {
        that.setData({
          state: !that.data.state,
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
    // console.log(workTimer);
    // console.log(this.data.wxTimerList);
    this.setData({
      state: !this.data.state,
    });
    workTimer.start(this);
  },

  /**
   * 停止计时器
   */
  stopWork: function () {
    var that = this;
    workTimer.stop();
    this.setData({
      state: !this.data.state,
    });
  },

  /**
   * 选择计时器类型
   */
  selectType: function (event) {
    var workType = event.currentTarget.dataset.type;
    if (workType == this.data.clockType || this.data.state) {
      return;
    }
    if (workType == 'work') {
      this.totalTime = '00:25:00';
    } else if (workType == 'rest') {
      this.totalTime = '00:05:00';
    } else {
      this.totalTime = '00:10:00';
    }
    this.setData({
      clockType: workType,
      wxTimer: this.totalTime.substring(3),
    });
  }
})
