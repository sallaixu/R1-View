// api/sysInfo.js
import request from '../utils/request';
// const baseUrl = "http://192.168.199.217:3333";
// const baseUrl = "http://localhost:3333";
export function getSystemInfo(query) {
  return request({
    url: '/_api/sys/info',
    method: 'get',
    params: query
  })
}

export function getMusicItems() {
  return request({
    url: '/_api/music/controller/ITEM_LIST',
    method: 'get'
  })
}

export function musicController(type) {
  return request({
    url: '/_api/music/controller/' + type,
    // baseURL: baseUrl,
    method: 'get'
  })
}

export function ttsChangeReqeust(type) {
  return request({
    url: '/_api/phicomm/change/tts/' + type,
    // baseURL: baseUrl,
    method: 'get'
  })
}


export function musicSourceRequest(type) {
  return request({
    url: '/_api/phicomm/music/source/' + type,
    // baseURL: baseUrl,
    method: 'get'
  })
}
