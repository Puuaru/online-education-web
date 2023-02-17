<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll">
<i class="fa-solid fa-filter-list"></i>
          </a>
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list">
            <ul class="of">

              <li v-for="teacher in teachers" v-bind:key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <nuxt-link
                      :to="`/teacher/${teacher.id}`"
                      :title="teacher.name"
                    >
                      <img :src="teacher.avatar" 
                        width="270"
                        height="150"
                        alt />
                    </nuxt-link>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <nuxt-link
                      :to="`/teacher/${teacher.id}`"
                      :title="teacher.name"
                      class="fsize18 c-666"
                      >{{ teacher.name }}</nuxt-link
                    >
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999"
                      >{{ teacher.intro }}</span
                    >
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ teacher.career }}</p>
                  </div>
                </section>
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
            @current-change="getTeacherListPage"
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
          >
          </el-pagination>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
import teacher from '@/api/teacher'

export default {
  data() {
    return {
      teachers: {},
      teacherQuery: {
        name: '',
        level: '',
      },
      current: 1,
      limit: 8,
      total: 0,
    }
  },

  created() {
    this.getTeacherListPage()
  },

  methods: {
    getTeacherListPage(current = 1) {
      teacher
        .getTeacherListPage(current, this.limit, this.teacherQuery)
        .then((response) => {
          this.teachers = response.data.data.items
          this.total = response.data.data.total
        })
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

