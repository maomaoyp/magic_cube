const Page = require('../../utils/ald-stat.js').Page;
const Util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carousel:{},
    list:[],
    adData:{},
    loadingHidden: false,
    showModal: false,
    screenHidden: true,
    channel_id:'',
  },

  bannerClick: function(e) {

    wx.request({
      url: Util.apiUrl + '/ad_click',
      data: {
        cmd: 'ad_click',
        type: 'banner',
        wxid: e.currentTarget.id,
        channel_id: this.data.channel_id,
      },
      method: 'POST',
      complete: function (res) {
      }
    })

    app.aldstat.sendEvent('点击轮播图', {
      channelId: this.data.channel_id,
      wxid: e.currentTarget.id,
    });
  },

  iconClick:function(e) {

    wx.request({
      url: Util.apiUrl + '/ad_click',
      data: {
        cmd: 'ad_click',
        type: 'list',
        wxid: e.currentTarget.id,
        channel_id: this.data.channel_id,
      },
      method: 'POST',
      complete: function (res) {
      }
    })

    app.aldstat.sendEvent('点击列表', {
      channelId: this.data.channel_id,
      wxid: e.currentTarget.id,
    });
  },

  adClick:function(e) {

    wx.request({
      url: Util.apiUrl + '/ad_click',
      data: {
        cmd: 'ad_click',
        type: 'default',
        wxid: e.currentTarget.id,
        channel_id: this.data.channel_id,
      },
      method: 'POST',
      complete: function (res) {
      }
    })

    app.aldstat.sendEvent('点击默认', {
      channelId: this.data.channel_id,
      wxid: e.currentTarget.id,
    });
  },

  /**
   * 点击关闭事件 -- 遮罩层隐藏， 关闭弹框
   */
  clickClose:function(e) {
    app.aldstat.sendEvent('主动关闭', {
      channelId: this.data.channel_id,
      wxid: e.currentTarget.id,
    });

    this.setData({
      showModal: false,
      screenHidden: true,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.data.channel_id = options.channel_id;

    // 请求数据
    this.requestData('get_ad', options);
  },

  /**
   * 请求详情列表函数
   */
  requestData: function (url, e) {
    var that = this;
    wx.request({
      url: Util.apiUrl + '/' + url,
      data: {
        cmd: url,
      },
      method: 'POST',
      success: function (res) {
      },
      complete:function(res) {
        that.setData({
          carousel: res.data.bannerList ? res.data.bannerList : that.data.carousel,
          list: res.data.adList ? res.data.adList : that.data.list,
          adData: res.data.adData ? res.data.adData : {},
          loadingHidden: true,
          showModal: res.data.adData ? true : false,
          screenHidden: res.data.adData ? false : true,
        }); 
      }
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
  onShow: function (options) {

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