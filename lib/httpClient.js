'use strict';

const request = require('request');
const qs = require('querystring');
const requestUtil = require('./request');
const responseUtil = require('./response');

class httpClient{
  constructor (data = {}) {
    this.timeout = data.timeout || 30000;
    this.gzip = data.gzip !== undefined ? data.gzip : true;
    this.options = data.options || {}; // 扩展requestoptions
    this.request = new requestUtil();
    this.response = new responseUtil();
  }

  async get(url, params = {}, headers = {}) {
    this.groupRequest(url, 'get', params, headers);
    return await this.call();
  }

  async post (url, params = {}, headers = {}){
    this.groupRequest(url, 'post', params, headers);
    return await this.call();
  }

  async put (url, params = {}, headers = {}) {
    this.groupRequest(url, 'put', params, headers);
    return await this.call();
  }

  async delete (url, params = {}, headers = {}) {
    this.groupRequest(url, 'delete', params, headers);
    return await this.call();
  }

  async call(){
    let content_type = this.request.getHeader('content-type');
    if(!content_type){
      this.request.setHeader('content-type', 'application/json; charset=utf-8');
      content_type = this.request.getHeader('content-type');
    }
    let options = Object.assign({
      url: this.request.url,
      method: this.request.method,
      headers: this.request.headers,
      timeout: this.timeout,
      gzip: this.gzip
    }, this.options);

    if(options.method != 'get'){
      if(content_type.includes('urlencoded')){
        options.body = qs.stringify(this.request.params);
      }else if(content_type.includes('json')){
        options.body = JSON.stringify(this.request.params);
      }else if(content_type.includes('form-data')){
        options.form = this.request.params;
      }
    }
    this.response.status = false;
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          if(error){
            this.response.errors = error;
            return reject(this);
          }
          this.response.status = true;
          this.response.statusCode = response.statusCode ? response.statusCode : null;
          this.response.setHeaders(response.headers);
          this.response.setBody(body);
          resolve(this);
        });
    });
  }

  /**
   * 组装参数到request里
   * @param {*} url 请求地址
   * @param {*} params 请求参数
   * @param {*} headers 请求header
   */
  groupRequest (url, method, params = {}, headers = {}) {
    if (method === 'get') {
      url = `${url}?${qs.stringify(params)}`;
    }
    this.request.url = url;
    this.request.params = params;
    this.request.setHeaders(headers);
    this.request.method = method;
  }
}

module.exports = httpClient;
