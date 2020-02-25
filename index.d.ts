import request from './lib/request'
import response from './lib/response'

interface RequestHeader {
  /**
   * set cookie is object
   */
  cookies?: object;

  [propName: string]: any;
}

interface HttpResult {
  timeout: number;

  gzip: boolean;

  options: object;

  request: request;

  response: response;
}

export function get(url: string, params?: object, headers?: RequestHeader): HttpResult

export function post(url: string, params?: object, headers?: RequestHeader): HttpResult

export function put(url: string, params?: object, headers?: RequestHeader): HttpResult

export function del(url: string, params?: object, headers?: RequestHeader): HttpResult

// declare function delete(url: string, params?: object, headers?: RequestHeader): HttpResult


