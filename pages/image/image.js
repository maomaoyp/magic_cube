const Page = require('../../utils/ald-stat.js').Page;
const Util = require('../../utils/util.js');
var detail = '../detail/detail';

Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false,
    hasMore:true,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.requestData('newlist');

  },
  /**
   * 滚动到底部时加载下一页
   */
  bindscrolltolower: function () {
    console.log('到底部')
    this.requestData('list');

  },

  onReachBottom: function () {
    //加载更多
    this.requestData('list');
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    // 加载最新
    this.requestData('newlist');
  },

  /**
   * 加载数据
   */
  requestData: function (a) {
    var that = this;
    wx.request({
      url: Util.apiUrl + '/img',
      data: {
        action: a,
        model: 'data',
        // 上一页的maxtime作为加载下一页的条件，
        maxtime: that.data.maxtime,
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        console.log('上一页', that.datalist)
        that.setData({
          // 拼接数组
          list: a == 'newlist' ? [].concat(res.data.list).concat(that.data.list) : that.data.list.concat(res.data.list),
          loadingHidden: true,
          maxtime: res.data.info.maxtime,
          hasMore: false,
        })

        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  /**
   * 查看大图
   */
  lookBigPicture: function (e) {
    console.log(e);
    console.log(e.currentTarget.id)
    //图片url 对应wxml中data-url="{{item.url}}"
    var url = e.currentTarget.dataset.url;
    //获取图片高度 对应wxml中data-height="{{item.height}}"
    var height = e.currentTarget.dataset.height;
    //获取图片高度 对应wxml中data-width="{{item.width}}"
    var width = e.currentTarget.dataset.width;
    // 传参方式向GET请求
    wx.navigateTo({
      url: detail + '?' + 'url=' + url + "&height=" + height + "&width=" + width,
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      },
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: Util.shareConfig
})