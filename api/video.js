import request from '@/utils/request'

export default {
  getPlayAuth(videoSourceId) {
    return request({
      url: `/vod/${videoSourceId}`,
      method: 'get',
    })
  },
}
