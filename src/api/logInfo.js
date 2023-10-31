import request from '../utils/request';
// const baseUrl = "http://192.168.199.217:3333";
const baseUrl = "http://localhost:8080";

export function getNowLog(line) {
  return request({
    url: '/_api/logView/read/'+line,
    method: 'get',
    // params: query,
    baseURL:baseUrl
  })
}