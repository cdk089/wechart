// pages/demo/demo.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    videoShow: {}, //当前正在播放的视频信息
    hasVideoShow: false, //有没有视频播放
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
  },
  dataInfo: function() {
    var self = this;
    var db = wx.cloud.database()
    var list = [];
    db.collection('videoList').get().then(res => {
      var data = res.data;
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        var obj = {};
        obj.title = getTitle(data[i].src);
        obj.tiemOver = 0;
        obj.openFlag = false;
        obj.id = 'myVideo' + (i + 1);
        obj.src = data[i].src;
        list.push(obj);
      }
      console.log(list)
      self.setData({
        dataList: list
      })
    })

    function getTitle(data) {
      var list = data.split('/');
      for (var i = 0; i < list.length; i++) {
        if (list[i].indexOf('mp4') > -1) {
          return list[i].split('.')[0];
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var self = this;
    var res = wx.getSystemInfoSync();
    self.setData({
      _height: res.screenHeight
    });
    this.dataInfo();
    wx.cloud.callFunction({
      name: 'select',
      data: {
        a: 1,
        b: 2
      },
      success: function(res) {
        console.log(res.result)
      },
      fail: function(err) {

      }
    })
  },
  bindscroll: function(event) {
    var self = this;
    var scrollTop = event.detail.scrollTop;
    var obj = self.data.videoShow;
    if (self.data.hasVideoShow) {
      const query = wx.createSelectorQuery();
      query.select('#' + obj.id).boundingClientRect();
      query.exec(function(res) {
        if (res[0].bottom < 0 || res[0].top > self.data._height)
          self.bindpause(obj.id);
      })
    }
  },
  //视频进行中
  bindtimeupdate: function(e) {
    var self = this;
    var id = e.currentTarget.dataset.id;
    var currentTime = e.detail.currentTime
    var dataList = self.data.dataList;
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].id == id) {
        dataList[i].tiemOver = currentTime;
        self.setData({
          dataList: dataList
        });
      }
    }
  },
  //视频开始
  bindplay: function(e) {
    var self = this;
    var id = e.currentTarget.dataset.id;
    var dataList = self.data.dataList;
    var obj = {};
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].id == id) {
        dataList[i].openFlag = true;
        self.setData({
          dataList: dataList
        });
        // _getHeight(id)
      } else if (dataList[i].openFlag) {
        //其它正在播放的视频暂停
        var videoContext = wx.createVideoContext(dataList[i].id);
        videoContext.pause();
        dataList[i].openFlag = false;
        self.setData({
          dataList: dataList
        });
      }
      obj.id = id;
      self.setData({
        videoShow: obj,
        hasVideoShow: true
      })
    }    
  },
  //视频暂停
  bindpause: function(e) {
    var self = this;
    var id;
    if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.id) {
      id = e.currentTarget.dataset.id;
    } else {
      id = e;
      var videoContext = wx.createVideoContext(id);
      videoContext.pause();
    }

    var dataList = self.data.dataList;
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].id == id) {
        dataList[i].openFlag = false;
        self.setData({
          dataList: dataList
        });
      }
    }


    self.setData({
      obj: {},
      hasVideoShow: false
    })
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

  }
})