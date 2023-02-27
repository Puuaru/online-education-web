<template>
  <div class="Page Confirm">
    <div class="title">
      <h1 class="fl f18">订单确认</h1>
      <div class="clear"></div>
    </div>
    <form action="" id="flowForm" method="post" name="flowForm">
      <table class="GoodList">
        <tbody>
          <tr>
            <th class="name">商品</th>
            <th class="price">原价</th>
            <th class="priceNew">现价</th>
          </tr>
        </tbody>
        <tbody>
          <tr class="good">
            <td class="name First">
              <nuxt-link :to="`/course/${orderInfo.courseId}`">
                <img :src="orderInfo.courseCover" alt="" />
              </nuxt-link>
              <div class="goodInfo">
                <input type="hidden" class="ids ids_14502" value="14502" />
                <nuxt-link :to="`/course/${orderInfo.courseId}`">
                  {{ orderInfo.courseTitle }}
                  <br>
                  教师：{{ orderInfo.teacherName }}
                </nuxt-link>
              </div>
            </td>
            <td class="price">
              <p>
                ￥<strong>{{ orderInfo.totalFee }}</strong>
              </p>
            </td>
            <td class="red priceNew Last">
              ￥<strong>{{ orderInfo.totalFee }}</strong>
            </td>
          </tr>
          <tr>
            <td class="Billing tr" colspan="3">
              <div class="tr">
                <p>
                  共 <strong class="red">1</strong> 件商品，合计<span
                    class="red f20"
                    >￥<strong>{{ orderInfo.totalFee }}</strong></span
                  >
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <nuxt-link :to="`/course/${orderInfo.courseId}`">返回课程详情页</nuxt-link>
          </div>
        <div class="fr" id="AgreeDiv">
          <label for="Agree"
            ><p class="on">
              <input type="checkbox" checked="checked" />我已阅读并同意
              <a href="#" target="_blank"> 《购买协议》 </a>
            </p></label
          >
        </div>
        </div>
        <input type="hidden" name="score" id="usedScore" value="0">
        <button class="fr redb" type="button" id="submitPay" @click="payOrder()">去支付</button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
</template>

<script>
import order from '@/api/order'

export default {
  asyncData({ params, error }) {
    return order.getOrder(params.id).then((respond) => {
      return {
        orderInfo: respond.data.data.items,
        orderNo: params.id,
      }
    })
  },

  data() {
    return {}
  },

  created() {},

  methods: {
    payOrder() {
      order
        .savePayLog(this.orderNo)
        .then((respond) => {
          if (respond.data.code === 200) {
            this.$message({
              message: '支付成功',
              type: 'success',
            })
            this.$router.push(`/course/${this.courseInfo.courseId}`)
          } else {
            this.$message({
              message: '支付失败:' + respond.data.message,
              type: 'error',
            })
          }
        })
        .catch((error) => {
          this.$message({
            message: '支付失败，' + error,
            type: 'error',
          })
          console.log(error)
        })
    },
  },
}
</script>

<style></style>
