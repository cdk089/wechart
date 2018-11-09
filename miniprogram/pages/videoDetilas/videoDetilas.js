// pages/videoDetilas/videoDetilas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openFlag:{
      naviFlag:false  //跳转开关
    },                //开关控制
    recomentList: [], //推荐视频信息
    dataList:{},      //视频信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dataInfo();
  },
  _dataInfo: function () {
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
  //加载数据
  dataInfo:function(){
    var self=this;
    var dataList= {
        videoSrc: 'cloud://myselffirstyunkaifa-f10156.c063-myselffirstyunkaifa-f10156/baba_sleep/小土婴儿睡眠课2.mp4',
        imageSrc: 'http://spic.xafpz.com/5bdc07b3d03c9.jpg',        
        title: '文章标题',
        context: '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
        time:'2018-11-05',
        author:'金庸'
      },
    recomentList=[
      {
        videoSrc: 'cloud://myselffirstyunkaifa-f10156.c063-myselffirstyunkaifa-f10156/baba_sleep/小土婴儿睡眠课2.mp4',
        imageSrc: 'http://spic.xafpz.com/5bdc07b3d03c9.jpg',
        title: '文章标题',
        context: '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
        time: '2018-11-05',
        author: '金庸'
      }, {
        videoSrc: 'cloud://myselffirstyunkaifa-f10156.c063-myselffirstyunkaifa-f10156/baba_sleep/小土婴儿睡眠课2.mp4',
        imageSrc: 'http://spic.xafpz.com/5bdc07b3d03c9.jpg',
        title: '文章标题',
        context: '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
        time: '2018-11-05',
        author: '金庸'
      }, {
        videoSrc: 'cloud://myselffirstyunkaifa-f10156.c063-myselffirstyunkaifa-f10156/baba_sleep/小土婴儿睡眠课2.mp4',
        imageSrc: 'http://spic.xafpz.com/5bdc07b3d03c9.jpg',
        title: '文章标题',
        context: '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
        time: '2018-11-05',
        author: '金庸'
      }, {
        videoSrc: 'cloud://myselffirstyunkaifa-f10156.c063-myselffirstyunkaifa-f10156/baba_sleep/小土婴儿睡眠课2.mp4',
        imageSrc: 'http://spic.xafpz.com/5bdc07b3d03c9.jpg',
        title: '文章标题',
        context: '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
        time: '2018-11-05',
        author: '金庸'
      }, {
        videoSrc: 'cloud://myselffirstyunkaifa-f10156.c063-myselffirstyunkaifa-f10156/baba_sleep/小土婴儿睡眠课2.mp4',
        imageSrc: 'http://spic.xafpz.com/5bdc07b3d03c9.jpg',
        title: '文章标题',
        context: '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
        time: '2018-11-05',
        author: '金庸'
      }, {
        videoSrc: 'cloud://myselffirstyunkaifa-f10156.c063-myselffirstyunkaifa-f10156/baba_sleep/小土婴儿睡眠课2.mp4',
        imageSrc: 'http://spic.xafpz.com/5bdc07b3d03c9.jpg',
        title: '文章标题',
        context: '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
        time: '2018-11-05',
        author: '金庸'
      },
    ];
    self.setData({
      dataList: dataList,
      recomentList: recomentList
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getSysArgs();
  },
  //获取系统参数
  getSysArgs: function () {
    var self = this;
    var res = wx.getSystemInfoSync();
    self.setData({
      system: res
    })
  },

  //滚动时处理点赞分享显示
  bindscroll:function(e){
    var self = this;

    var scrollTop = e.detail.scrollTop;
    if (scrollTop > 40) {
      if (self.data.animation != 'animation'){
        self.setData({ animation: 'animation' })
      }
      return;
    }
    if (scrollTop >20 && self.data.animation != 'animation') {

      self.setData({ animation: 'animation' })
    }
    if (scrollTop <=20 && self.data.animation == "animation") {
      
      self.setData({ animation: '_animation' })
    }
    if (scrollTop < 20){
      //透明度
      self.setData({opacity:1-scrollTop*0.025})
    }    
  },
  //跳转
  recomNavigate:function(e){
    var self=this;
    var obj=self.data.openFlag;
    //避免重复点击或者多次点击不同视频造成数据请求紊乱。
    if (!obj.naviFlag){
      obj.naviFlag=true;
      self.setData({openFlag:obj});
      wx.navigateTo({
        url: '../videoDetilas/videoDetilas',
        success:function(res){
          //跳转成功,重新赋值，返回该页面时允许点击其它视频
          obj.naviFlag = false;
          self.setData({ openFlag: obj });
        },
        fail:function(res){
          //跳转失败,重新赋值，返回该页面时允许点击其它视频
          obj.naviFlag = false;
          self.setData({ openFlag: obj });
        }
      })
    }
    
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

  }
})