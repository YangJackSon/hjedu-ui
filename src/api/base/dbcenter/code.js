import request from '@/utils/request'

export function getCodTree() {
    return request({
        url: '/baseDbcenterDept/tree',
        method: 'get',

    })
}
// 添加部门
export function addCode(params) {
  return request({
    url: '/baseDbcenterDept',
    method: 'post',
    data: params
  })
}

// 修改部门
export function changeData(params) {
  return request({
    url: '/baseDbcenterDept',
    method: 'PUT',
    data: params
  })
}

// 添加专业
export function addMajor(data) {
  return request({
    url: '/baseDbcenterMajor',
    method: 'post',
    data: data
  })
}

// 查询全部专业
export function findAllMajor(id) {
  return request({
    url: '/baseDbcenterMajor/list',
    method: 'get',
  })
}

// 根据id查找专业
export function findOneMajor(id) {
  return request({
    url: '/baseDbcenterMajor/id/' + id,
    method: 'get',
  })
}

//  修改专业
export function changeMajor(params) {
  return request({
    url: '/baseDbcenterMajor',
    method: 'PUT',
    data: params
  })
}