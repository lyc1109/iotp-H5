/**
 * 过滤器定义
 *
 * @author  hucw
 * @created 2017-06-23
 */
import moment from "moment";

export default {
  /**
   * 图片过滤器，解析地址
   *
   * @param url 图片地址
   * @param wh  阿里云OSS图片处理样式，支持：
   *   w100, w200, w300, w400
   *   wh100, wh200, wh300, wh400
   *   q70
   */
  img: function (url, wh = "") {
    if (url === null || url === "" || url === undefined) {
      if(wh === '!wh100' || wh === '!wh200' || wh === '') {
        return "/static/images/img-default-1_1.png";
      }else{
        return '/static/images/img-default-2_1.png'
      }
    } else {
      if (url.indexOf("http") > -1) {
        if (url.indexOf("assets.xohaa.net") > -1 || url.indexOf("shmedias.oss-cn-shenzhen.aliyuncs.com") > -1) {
          return url + wh;
        }
      }
    }
    return url;
  },

  /**
   * 头像图片过滤器
   *
   * @param url 图片地址
   */
  avatar: function (url) {
    if (url === null || url === "" || url === "undefined") {
      return "/static/images/avatar.png";
    }
    if (url.indexOf("http") > -1) {
      if (url.indexOf("assets.xohaa.net") > -1 || url.indexOf("shmedias.oss-cn-shenzhen.aliyuncs.com") > -1) {
        return url + '!wh100';
      }
    }
    return url;
  },
  /**
   * 静态图片过滤器，解析地址
   *
   * @param url 图片地址
   * @param wh  阿里云OSS图片处理样式，支持：
   *   w100, w200, w300, w400
   *   wh100, wh200, wh300, wh400
   *   q70
   */
  staticImg: function (url, wh = "") {
    if (url === null || url === "" || url === "undefined") {
      //cdn默认图片地址
      return "http://assets.xohaa.net/static/images/img-default-1_1.png";
    }
    let _url = url.split("/");
    if (_url) {
      if (_url[0].indexOf("http") < 0 && _url[1].indexOf("static") > -1 && _url[2].indexOf("images") > -1) {
        let _cdnURL = "http://assets.xohaa.net/";
        let _imgURL = url.substring(parseInt(url.indexOf('/') + 1), url.length);
        return _cdnURL + _imgURL + wh;
      }
    }
    return url;
  },

  /**
   * 格式化人民币输出
   *
   * @param currency 金额
   * @param symbol   金额符号，默认￥
   */
  formatCurrency: function (currency = "0.00", symbol = "￥") {
    let rmb = "";
    currency = currency + "";
    if (currency.lastIndexOf(".") > 0) {
      let numbers = currency.split(".");
      let digits = numbers[1];
      if (digits.startsWith(0)) {
        rmb = parseInt(digits, 10) > 0 ? parseFloat(currency).toFixed(2) : parseInt(currency);
      } else {
        rmb = parseFloat(currency).toFixed(2);
      }
    } else {
      rmb = currency;
    }
    return symbol + rmb;
  },
  /**
   * 格式化日期
   *
   * @param date    时间
   * @param format  时间格式，默认格式化为 YYYY-MM-DD
   * @returns {string}
   */
  formatDate: function (date, format = "YYYY-MM-DD") {
    return (date === null || date === "") ? "" : moment(date).format(format);
  },

  /**
   * 格式化时间
   *
   * @param date    时间
   * @param format  时间格式，默认格式化为 YYYY-MM-DD  HH:mm
   * @returns {string}
   */
  formatTime: function (date, format = "YYYY-MM-DD HH:mm") {
    return (date === null || date === "") ? "" : moment(date).format(format);
  },

  /**
   * 转化字符串为HTML
   *
   * @param html 所要处理的字符串
   */
  unEscape(html){
    if(typeof html === 'string') {
      return html.replace(/<[^>]+>/g, "")
    }
  }
};
