import request from '@/utils/request'

export default {
  getTeacherDetails(id) {
    return request({
      url: `/edu/front/teacher/details/${id}`,
      method: 'get',
    })
  },
  getTeacherListPage(current, limit) {
    return request({
      url: `/edu/teacher/page/${current}/${limit}`,
      method: 'get',
    })
  },
}
