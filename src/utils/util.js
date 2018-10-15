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
  //console.log(contentHeight)
}


