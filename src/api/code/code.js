import request from '@/utils/request'
const code = {
  // 通过父级获取子级
  childrenList (id) {
    return request({
      url: '/baseDbcenterCode/children/list/' + id,
      method: 'get',
    })
  },
  // 专业
  majoryList () {
    return request({
      url: '/baseDbcenterCode/list/' + 'JYT1001_D7',
      method: 'get',
    })
  },
}

export default  code
