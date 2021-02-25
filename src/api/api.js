import axios from '@/config/httpConfig'

// const baseOaUrl = 'http://192.168.65.29:8085' //测试环境
// export var viewUrl = baseOaUrl;
// const documentURL = 'http://192.168.65.220:8078' //测试环境
export function getoatoken(params) {
    return axios.post( '/getoatoken', params)
}
export function getUsers(params) {
    return axios.get( '/sysUser/getUsers', params)
}
export function addressList(params) {
    return axios.get( '/sysUser/addressList', params)
}
export function getById(params) {
    return axios.get( '/sysUser/getById', params)
}
export function avatar(params) {
    return axios.get( '/sysUserPhoto/downloadImage', params)
}
