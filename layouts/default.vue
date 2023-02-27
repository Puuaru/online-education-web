<template>
  <div class="in-wrap">
    <!-- 公共头 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <nuxt-link to="/" title="Education">
            <img src="@/assets/img/logo.png" width="100%" alt="Education" />
          </nuxt-link>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <nuxt-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </nuxt-link>
            <nuxt-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </nuxt-link>
            <nuxt-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </nuxt-link>
            <nuxt-link to="/article" tag="li" active-class="current">
              <a>文章</a>
            </nuxt-link>
            <nuxt-link to="/qa" tag="li" active-class="current">
              <a>问答</a>
            </nuxt-link>
          </ul>
          <ul class="h-r-login">
            <li id="no-login" v-if="!memberInfo.id">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>

            <li class="mr10" id="is-login-one" v-if="memberInfo.id">
              <a href="#" title="消息" id="headerMsgCountId">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>

            <li class="h-r-user" id="is-login-two" v-if="memberInfo.id">
              <a href="#" title>
                <img
                  :src="memberInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                />
                <span class="vam disIb" id="userName">{{
                  memberInfo.nickname
                }}</span>
              </a>
              <a
                href="javascript:void(0);"
                title="退出"
                @click="logout()"
                class="ml5"
                >退出</a
              >
            </li>
          </ul>

          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input
                  type="text"
                  placeholder="输入想搜索的课程"
                  v-model="courseName"
                  value
                />
                <nuxt-link :to="{path: '/course', query: {courseName: courseName}}">
                  <button class="s-btn" type="submit">
                    <em class="icon18">&nbsp;</em>
                  </button>
                </nuxt-link>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="nw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- 公共头 -->

    <nuxt />

    <!-- 公共底 -->
    <footer id="footer">
      <section class="container">
        <div>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a
                href="https://github.com/Puuaru"
                title="github"
                target="_blank"
              >
                <svg
                  class="w-6 h-6 text-gray-600 hover:text-gray-800 button--github"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  width="32"
                  height="32"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 0 1 1.025-2.688a3.594 3.594 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 0 1 .1 2.65a3.869 3.869 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 0 1 .675 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：暂无</span>
                <span>Email：暂无</span>
              </section>
              <section class="b-f-link mt10">
                <span>在线教育网站</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="@/assets/img/wx-icon.png" alt />
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="@/assets/img/wb-icon.png" alt />
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
  </div>
</template>
<script>
import '@/assets/css/reset.css'
import '@/assets/css/theme.css'
import '@/assets/css/global.css'
import '@/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'

import cookie from 'js-cookie'
import login from '@/api/login'

export default {
  data() {
    return {
      memberInfo: {
        id: '',
        nickname: '',
        email: '',
        age: '',
        sex: '',
        avatar: '',
      },
      token: '',
      courseName: '',
    }
  },

  created() {
    if (this.$route.query.token) {
      this.getGithubLoginToken()
    }
    this.getMemberInfo()
  },

  methods: {
    getMemberInfo() {
      let cookieValue = cookie.get('EDUSER')
      if (cookieValue) {
        this.memberInfo = JSON.parse(cookieValue)
      }
    },

    getGithubLoginToken() {
      this.token = this.$route.query.token
      cookie.set('token', this.token)
      login.getMemberInfo().then((response) => {
        this.memberInfo = response.data.data.items
        cookie.set('EDUSER', this.memberInfo)
      })
    },

    logout() {
      cookie.remove('token')
      cookie.remove('EDUSER')
      this.memberInfo = {
        id: '',
        nickname: '',
        email: '',
        age: '',
        sex: '',
        avatar: '',
      }
    },
  },
}
</script>
