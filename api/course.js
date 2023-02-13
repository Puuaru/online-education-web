import request from '@/utils/request'

export default {
  getCourseDetails(id) {
    return request({
      url: `/edu/front/course/details/${id}`,
      method: 'get',
    })
  },
  getSubject() {
    return request({
      url: '/edu/subject',
      method: 'get',
    })
  },
  getCourseByQuery(current, limit, courseQuery) {
    return request({
      url: `/edu/front/course/condition/${current}/${limit}`,
      method: 'post',
      data: courseQuery,
    })
  },
}
