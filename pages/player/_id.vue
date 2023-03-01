<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link
      rel="stylesheet"
      href="https://g.alicdn.com/de/prismplayer/2.9.3/skins/default/aliplayer-min.css"
    />
    <!-- 阿里云视频播放器脚本 -->
    <script
      charset="utf-8"
      type="text/javascript"
      src="https://g.alicdn.com/de/prismplayer/2.9.3/aliplayer-min.js"
    ></script>
    <div id="J_prismPlayer" class="prism-player"></div>
  </div>
</template>

<script>
import video from '@/api/video'

export default {
  // layout: 'video',
  data() {
    return {
      playAuth: '',
      vid: '',
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      this.vid = this.$route.params.id
      video.getPlayAuth(this.vid).then((respond) => {
        this.playAuth = respond.data.data.playAuth
        new Aliplayer(
          {
            id: 'J_prismPlayer',
            width: '50%',
            height: '500px',
            autoplay: true,
            vid: this.vid,
            playauth: this.playAuth,
            encryptType: 1,
          },
          function (player) {
            console.log('The player is created.')
          }
        )
      })
    },
  },
}
</script>

<style scoped>
.prism-player {
  margin: auto;
}
</style>
