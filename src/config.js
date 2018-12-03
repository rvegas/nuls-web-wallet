const IS_DEV = process.env.NODE_ENV !== 'production';
let host = window.location.host; //获取地址和端口
//Request url
 export const API_ROOT = IS_DEV ? '/api/' : 'https://'+host+'/api/';
// export const API_ROOT = IS_DEV ? '/api/' : 'http://'+host+'/api/';
//Request response time
export const API_TIME = IS_DEV ? '6000' : '8000';



