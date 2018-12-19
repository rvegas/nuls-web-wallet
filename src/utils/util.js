import {BigNumber} from 'bignumber.js'
import copy from 'copy-to-clipboard'

/**
 * 左移八位
 * Execute the float addition
 * @param arg
 * @returns {BigNumber}
 */
export function LeftShiftEight(arg) {
  let left8 = new BigNumber(0.00000001);
  return left8.times(arg);
}

/**
 * 右移八位
 * Execute the float addition
 * @param arg
 * @returns {BigNumber}
 */
export function RightShiftEight(arg) {
  let right8 = new BigNumber(100000000);
  return right8.times(arg);
}

/**
 * 复制 copy
 * @param value
 */
export const copys = (value) => copy(value);

/**
 * 根据不同时区显示时间
 * According to the display time of different time zones
 * @param time
 * @returns {*}
 */
export function getLocalTime(time) {
  if (typeof time !== 'number') return;
  let d = new Date();
  let offset = d.getTimezoneOffset() * 60000;
  let localUtc = new Date().getTimezoneOffset() / 60;
  let utcTime;
  if (localUtc > 0) {
    utcTime = time - offset;
  } else {
    utcTime = time + offset;
  }
  let localTime = utcTime + 3600000 * Math.abs(localUtc);
  return new Date(localTime);
}

/**
 * 给main-content一个最小高度
 * Give main-content a minimum height.
 */
export function contentMinHeight() {
  let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  let headerHeight = document.getElementsByClassName('top')[0].offsetHeight;
  let footerHeight = document.getElementsByClassName('bottom')[0].offsetHeight;
  let contentHeight = document.getElementsByClassName('main-content')[0].style.minHeight;
  contentHeight = clientHeight - headerHeight - footerHeight + 'px';
}
/**
 * 根据时间差，转换为天，时，分
 * According to the time difference, convert to day, hour, minute
 */
export function timeSlot(time) {
  let timeArr=[];
  let day,hour,minute,second;
  day = Math.floor(time/(24 * 3600 * 1000));
  timeArr.push(day);
  time = time%(3600*24* 1000);//除去整天之后剩余的时间
  hour = Math.floor(time/(3600* 1000));
  timeArr.push(hour);
  time = time%(3600* 1000);//除去整小时之后剩余的时间
  minute = Math.floor(time/(60* 1000));
  timeArr.push(minute);
  second = time%1000;//除去整分钟之后剩余的时间
  return timeArr;
}

/**
 * 判断打开的终端
 * According to the time difference, convert to day, hour, minute
 */
export function versions() {
  let u = navigator.userAgent, app = navigator.appVersion;
  let mobile,ios,android,iPhone,iPad;
  let mobileVersions;
    mobile= !!u.match(/AppleWebKit.*Mobile.*/); //是否为移动终端
    ios= !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    android= u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    iPhone= u.indexOf('iPhone') > -1; //是否为iPhone或者QQHD浏览器
    iPad= u.indexOf('iPad') > -1;//是否iPad
    if(mobile || ios || android || iPhone || iPad){
      mobileVersions = true
    }else{
      mobileVersions = false
    }
  return {
    mobileVersions
  };
}
