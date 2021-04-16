import request from '@/utils/request'

export function getRsaKey() {
    return request({
        url: '/api/login/GetKey',
        method: 'get'
    })
}

export function login(data) {
    return request({
        url: '/api/login/jwttoken3.0',
        method: 'get',
        params: data
    })
}

export function getInfo(token) {
    return request({
        url: '/api/user/getInfoByToken',
        method: 'get',
        params: { token }
    })
}

export function getNavigationBar(params){
    return request({
        url: '/api/permission/GetNavigationBar',
        method: 'get',
        params: params
    })
}

export function logout() {
    return request({
        url: '',
        method: 'post'
    })
}
