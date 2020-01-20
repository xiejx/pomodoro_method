// pages/activity/today/today.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoTask: [],  // 待办任务
    fullfilTask: [],  // 已完成任务
    inputTask: null,  // 用于添加任务之后清空输入框
  },

  /**
   * 其他数据 
   */
  inputData: null,  // 输入数据

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 添加任务
   */
  addTask: function (event) {
    if (this.inputData != null && this.inputData.trim() != null) {
      this.data.todoTask.push(this.inputData);
      this.setData({
        todoTask: this.data.todoTask,
        inputTask: null,
      });
    }
  },

  /**
   * 输入今日待办内容
   */
  inputTask: function (event) {
    this.inputData = event.detail.value;
  },

  /**
   * 删除任务
   */
  deleteTask: function (event) {
    let taskId = event.currentTarget.dataset.taskid;
    console.log(taskId);
    this.data.todoTask.splice(taskId, 1);
    this.setData({
      todoTask: this.data.todoTask,
    });
  },

  /**
   * 完成任务
   */
  compTask: function (event) {
    let taskId = event.currentTarget.dataset.taskid;
    var temp = this.data.todoTask.splice(taskId, 1);
    this.setData({
      todoTask: this.data.todoTask,
      fullfilTask: this.data.fullfilTask.concat(temp),
    });
  },

  /**
   * 未完成任务
   */
  uncompTask: function (event) {
    let taskId = event.currentTarget.dataset.taskid;
    var temp = this.data.fullfilTask.splice(taskId, 1);
    this.setData({
      todoTask: this.data.todoTask.concat(temp),
      fullfilTask: this.data.fullfilTask,
    });
  }
})
