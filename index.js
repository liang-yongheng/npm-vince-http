
const client = require('./lib/httpClient');

/**
 * get方法
 */
exports.get = async function (url, params = {}, headers = {}, options = {}) {
  const server = new client(options);
  return await server.get(url, params, headers);
}

/**
 * post方法
 */
exports.post = async function (url, params = {}, headers = {}, options = {}) {
  const server = new client(options);
  return await server.post(url, params, headers);
}

/**
 * put方法
 */
exports.put = async function (url, params = {}, headers = {}, options = {}) {
  const server = new client(options);
  return await server.put(url, params, headers);
}

/**
 * delete方法
 */
exports.del = async function (url, params = {}, headers = {}, options = {}) {
  const server = new client(options);
  return await server.delete(url, params, headers);
}