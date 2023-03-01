<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">课程列表</a>
        \
        <span class="c-333 fsize14">{{ courseInfo.title }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section class="p-h-video-box" id="videoPlay">
            <img
              style="object-fit: cover; width: 100%; height: 100%"
              :src="courseInfo.cover"
              :alt="courseInfo.title"
              class="dis c-v-pic"
            />
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ courseInfo.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size: 24px"
                >￥{{ courseInfo.price }}</b
              >
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14"
                >主讲： {{ courseInfo.teacherName }}&nbsp;&nbsp;&nbsp;</span
              >
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <a class="c-fff vam" href="/login" v-if="!isLogined"
                  >如未登录，请先登录</a
                >
              </span>
            </section>
            <section class="c-attr-mt">
              <a
                href="#chapter-list"
                title="立即观看"
                class="comm-btn c-btn-3"
                v-if="available"
                >立即观看</a
              >
              <a
                @click="createOrder()"
                href="#"
                title="立即购买"
                class="comm-btn c-btn-3"
                v-else
                >立即购买</a
              >
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseInfo.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseInfo.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseInfo.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <div v-html="courseInfo.description"></div>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title"  id="chapter-list">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li
                            class="lh-menu-stair"
                            v-for="(chapter, index) in chapters"
                            v-bind:key="chapter.id"
                          >
                            <a
                              href="javascript: void(0)"
                              :title="chapter.title"
                              class="current-1"
                            >
                              <em class="lh-menu-i-1 icon18 mr10"></em
                              >{{ chapter.title }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block">
                              <li
                                class="lh-menu-second ml30"
                                v-for="video in chapters[index].children"
                                v-bind:key="video.id"
                              >
                                <nuxt-link
                                  :to="`/player/${video.videoSourceId}`"
                                  title
                                  v-if="video.isFree === 1 || available"
                                >
                                  <span class="fr">
                                    <i
                                      class="free-icon vam mr10"
                                      v-if="video.isFree === 1"
                                      >免费试听</i
                                    >
                                    <i class="free-icon vam mr10" v-else
                                      >立即观看</i
                                    >
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em
                                  >{{ video.title }}
                                </nuxt-link>
                                <a href="#" title style="color: grey" v-else>
                                  <span class="fr">
                                    <i class="free-icon vam mr10">请先购买</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em
                                  >{{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <nuxt-link title :to="`/teacher/${courseInfo.teacherId}`"
                  >主讲讲师</nuxt-link
                >
              </section>
              <section class="stud-act-list">
                <ul style="height: auto">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img
                          :src="courseInfo.teacherAvatar"
                          width="50"
                          height="50"
                          alt
                        />
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <nuxt-link
                        class="c-333 fsize16 fl"
                        :to="`/teacher/${courseInfo.teacherId}`"
                        >{{ courseInfo.teacherName }}</nuxt-link
                      >
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ courseInfo.teacherIntro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>

<script>
import course from '@/api/course'
import order from '@/api/order'
import cookie from 'js-cookie'

export default {
  asyncData({ params, error }) {
    return course.getCourseDetails(params.id).then((respond) => {
      return {
        courseInfo: respond.data.data.details,
        chapters: respond.data.data.chapters,
        courseId: params.id,
      }
    })
  },
  data() {
    return {
      isLogined: null,
      available: null,
    }
  },

  created() {
    this.getLoginStatus()
    this.isPurchased()
  },

  methods: {
    getLoginStatus() {
      let cookieValue = cookie.get('EDUSER')
      if (cookieValue) {
        this.isLogined = true
        return
      }
      this.isLogined = false
    },

    isPurchased() {
      if (this.courseInfo.price === 0) {
        this.available = true
      }
      order.isPurchased(this.courseId).then((respond) => {
        this.available = respond.data.code === 200 ? true : false
      })
    },

    createOrder() {
      order.saveOrder(this.courseId).then((response) => {
        this.$router.push({
          path: `/order/${response.data.data.orderNo}`,
        })
      })
    },
  },
}
</script>
