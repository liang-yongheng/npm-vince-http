'use strict';

class response{
  constructor (data = {}) {
    this.status = false;//请求是否成功标志(仅代表请求的动作)
    this.statusCode = null;
    this.headers = {};
    this.cookies = {};
    this.errors = null;
    this.body = null;
  }

  setHeaders (headers) {
    for (const k in headers) {
      const lowerK = k.toString().toLowerCase();
      if (lowerK === 'set-cookie') {
        this.groupCookies(headers[k]);
        continue;
      }
      this.setHeader(k, headers[k]);
    }
  }

  setBody (body) {
    let content_type = this.getHeader('content-type');
    if(!content_type) return body;
    let is_json = content_type.includes('json');
    if(is_json){
      body = JSON.parse(body);
    }
    this.body = body;
  }

  getHeader (k) {
    k = k.toString().toLowerCase();
    if (this.headers[k]) {
      return this.headers[k];
    }
    return null;
  }

  setHeader (k, v) {
    k = k.toString().toLowerCase();
    this.headers[k] = v;
    return v;
  }

  getCookie (k) {
    if (this.cookies[k]) {
      return this.cookies[k];
    }
    return null;
  }

  setCookie (k, v) {
    this.cookies[k] = v;
    return v;
  }

  /**
   * 组装响应cookie
   * @param {*} headers 响应的header
   */
  groupCookies (cookies) {
    if (!cookies) return;
    for(let val of cookies){
      let arr = val.split(';');
      let co = arr[0].split('=');
      this.setCookie(co[0], co[1]);
    }
    return true;
  }
}

module.exports = response;
