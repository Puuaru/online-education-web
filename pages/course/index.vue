<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <!-- 一级分类 -->
                <li>
                  <!-- <a title="全部" href="#">全部</a> -->
                  <a
                    title="全部"
                    :class="{ active: firstIndex === -1 }"
                    @click="clearSubjectFilter()"
                    href="#"
                    >全部</a
                  >
                </li>
                <li
                  v-for="(subjectFirst, index) in subjects"
                  v-bind:key="subjectFirst.id"
                >
                  <a
                    :title="subjectFirst.title"
                    href="#"
                    @click="selectFirstSubject(index)"
                    :class="{ active: firstIndex === index }"
                    >{{ subjectFirst.title }}</a
                  >
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix" v-if="firstIndex !== -1">
                <!-- 二级分类 -->
                <li
                  v-for="(subjectSecond, index) in subjects[firstIndex]
                    .children"
                  v-bind:key="subjectSecond.id"
                >
                  <a
                    :title="subjectSecond.title"
                    href="#"
                    @click="selectSecondSubject(subjectSecond.id, index)"
                    :class="{ active: secondIndex === index }"
                    >{{ subjectSecond.title }}</a
                  >
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li>
                <a
                  :class="{ active: courseQuery.buyCountSort }"
                  title="最热门"
                  href="#"
                  @click="
                    courseQuery.buyCountSort = courseQuery.buyCountSort
                      ? ''
                      : 'active'
                    getCourseByQuery()
                  "
                  >最热门
                </a>
              </li>
              <li>
                <a
                  :class="{ active: courseQuery.gmtCreateSort }"
                  title="最新"
                  href="#"
                  @click="
                    courseQuery.gmtCreateSort = courseQuery.gmtCreateSort
                      ? ''
                      : 'active'
                    getCourseByQuery()
                  "
                  >最新
                </a>
              </li>
              <!-- <li class="current bg-orange"> -->
              <li>
                <a
                  title="价格"
                  href="#"
                  :class="{ active: courseQuery.priceSort }"
                  @click="togglePriceSort()"
                  >价格&nbsp;
                  <span v-if="courseQuery.priceSort === 'desc'">↓</span>
                  <span v-if="courseQuery.priceSort === 'asc'">↑</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="coursesInfo.total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in coursesInfo" v-bind:key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img
                      width="270"
                      height="150"
                      :src="course.cover"
                      :alt="course.title"
                    />
                    <div class="cc-mask">
                      <nuxt-link
                        :to="`/course/${course.id}`"
                        title="开始学习"
                        class="comm-btn c-btn-1"
                        >开始学习</nuxt-link
                      >
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <nuxt-link
                      :to="`/course/${course.id}`"
                      :title="course.title"
                      class="course-title fsize18 c-333"
                      >{{ course.title }}</nuxt-link
                    >
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">
                        {{ course.price === 0 ? '免费' : course.price + '元' }}
                      </i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.viewCount }}人查看</i>
                      |
                      <i class="c-999 f-fA">{{ course.buyCount }}人学习</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <el-pagination
            background
            :total="total"
            :current-page="current"
            :page-size="limit"
            @current-change="getCourseByQuery"
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
          >
          </el-pagination>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from '@/api/course'

export default {
  data() {
    return {
      coursesInfo: {
        items: '',
        total: 0,
      },
      subjects: [
        {
          id: '',
          children: [],
        },
      ],
      current: 1,
      limit: 8,
      total: 0,
      courseQuery: {
        subjectId: '',
        subjectParentId: '',
        priceSort: '',
        buyCountSort: '',
        gmtCreateSort: '',
        courseName: '',
      },
      // 用于进行分类检索的变量，-1则为非分类状态
      firstIndex: -1,
      secondIndex: -1,
    }
  },

  created() {
    if (this.courseQuery.courseName) {
      this.courseQuery.courseName = this.$route.query.courseName
    }
    this.getSubjects()
    this.getCourseByQuery()
  },

  watch: {
    $route: function () {
      if (this.courseQuery.courseName) {
        this.courseQuery.courseName = this.$route.query.courseName
      }
      this.getCourseByQuery()
    },
  },

  methods: {
    getSubjects() {
      course.getSubjects().then((response) => {
        this.subjects = response.data.data.items
      })
    },

    getCourseByQuery(current = 1) {
      course
        .getCourseByQuery(current, this.limit, this.courseQuery)
        .then((response) => {
          this.coursesInfo = response.data.data.items
          this.total = response.data.data.total
        })
    },

    selectFirstSubject(index) {
      this.firstIndex = index
      this.secondIndex = -1
      this.courseQuery.subjectParentId = this.subjects[index].id
      this.courseQuery.subjectId = ''
      this.getCourseByQuery()
    },

    selectSecondSubject(subjectId, index) {
      this.courseQuery.subjectId = subjectId
      this.secondIndex = index
      this.getCourseByQuery()
    },

    clearSubjectFilter() {
      this.firstIndex = -1
      this.secondIndex = -1
      this.courseQuery = {
        subjectId: '',
        subjectParentId: '',
        priceSort: '',
        buyCountSort: '',
        gmtCreateSort: '',
        courseName: '',
      }
      this.getCourseByQuery()
    },

    togglePriceSort() {
      switch (this.courseQuery.priceSort) {
        case 'asc':
          this.courseQuery.priceSort = 'desc'
          break
        case 'desc':
          this.courseQuery.priceSort = 'asc'
          break
        default:
          this.courseQuery.priceSort = 'desc'
      }
      this.getCourseByQuery()
    },
  },
}
</script>

<style scoped>
.active {
  background: #68cb9b;
  color: #fff;
}
</style>

<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #68cb9b;
  color: #fff;
}
.el-pagination.is-background .el-pager li.active {
  color: #fff;
  cursor: default;
}
.el-pagination.is-background .el-pager li:hover {
  color: #68cb9b;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #68cb9b;
}
.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
  background-color: #68cb9b;
  color: #fff;
}
</style>
