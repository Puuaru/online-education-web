import request from '@/utils/request'

export default {
  getTeacherDetails(id) {
    return request({
      url: `/edu/front/teacher/details/${id}`,
      method: 'get',
    })
  },
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/edu/teacher/page/condition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery,
    })
  },
}
