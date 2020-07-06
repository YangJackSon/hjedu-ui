import request from '@/utils/request'

export function getInfoById(id) {
    return request({
        url: 'api/teacher/drill/get_by_id/' + id,
        method: 'get',
        // params: params,
    })
}
