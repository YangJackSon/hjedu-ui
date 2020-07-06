import request from '@/utils/request'

const catalogAPI = {
  // 获取目录列表
  getCatalogList: function () {
    return request({
      url: '/resDirectory/list/data',
      method: 'post',
    })
  },
  // 删除目录
  deleCatalog: function (id) {
    return request({
      url: '/resDirectory/id/'+id,
      method: 'delete',
    })
  },
  // 添加目录
  addCatalog: function (params) {
    return request({
      url: '/resDirectory/add',
      method: 'post',
      data: params
    })
  },
  // 添加目录
  updataCatalog: function (params) {
    return request({
      url: '/resDirectory/update',
      method: 'post',
      data: params
    })
  }
}

export default catalogAPI