'use strict';

class request{
  constructor (data = {}) {
    this.url = '';
    this.method = null;
    this.headers = {};
    this.cookies = {};
    if(data.headers){
      this.headers = Object.assign({}, data.headers);
    }
    if(data.cookies){
      this.cookies = Object.assign({}, data.cookies);
    }
  }

  setHeaders (headers) {
    for (const k in headers) {
      this.setHeader(k, headers[k]);
    }
  }

  getHeader (k) {
    k = k.toString().toLowerCase();
    if (this.headers[k]) {
      return this.headers[k];
    }
    return null;
  }

  setHeader (k, v) {
    let lowerK = k.toString().toLowerCase();
    if (lowerK === 'cookies') {
      for (const key in v) {
        this.setCookie(key, v[key]);
      }
      lowerK = 'Cookie';
      v = this.groupCookies(v)
    }
    this.headers[lowerK] = v;
    return v;
  }

  getCookie (k) {
    return this.cookies[k] || null;
  }

  setCookie (k, v) {
    this.cookies[k] = v;
    return v;
  }

  groupCookies(cookies){
    let arr = [];
    for(let i in cookies){
      let cookie = cookies[i];
      arr.push(`${i}=${cookie}`)
    }
    return arr.join('; ');
  }
}

module.exports = request;
