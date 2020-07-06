import request from '@/utils/request'

export function getCodTree() {
    return request({
        url: '/baseDbcenterCode/tree',
        method: 'get',

    })
}

// 添加学校
export function addSchool(params) {
  return request({
    url: '/baseOrg',
    method: 'post',
    data: params

  })
}

// 查询全部学校
export function findSchool(params) {
  return request({
    url: '/baseOrg/page',
    method: 'get',
    params: params

  })
}

// 根据id查询学校
export function findOneSchool(id) {
  return request({
    url: '/baseOrg/id/' + id,
    method: 'get',

  })
}

// 修改学校
export function putSchool(params) {
  return request({
    url: '/baseOrg',
    method: 'put',
    data: params

  })
}


// 查询菜单树
export function findTree(type) {
  return request({
    url: '/baseMenu/tree/' + type,
    method: 'get',

  })
}

// 查询学校已授权树
export function findOrgTree(id) {
  return request({
    url: '/baseMenu/org/' + id,
    method: 'get',

  })
}

// 学校产品授权
export function bindOrg(params) {
  return request({
    url: '/baseMenu/bind/org',
    method: 'get',
    params: params
  })
}




