<template>
  <div >
    <!-- <a-button :before-change="asyncFunction" :loading="flag">默认按钮</a-button>
    <a-button type="primary" :loading="true" prefix="upload" block border size="small">primary</a-button>
    <a-button type="success" suffix="shezhi" size="mini" round>success</a-button>
    <a-button type="warning" prefix="geren" min-width="160px" disabled>warning</a-button>
    <a-button type="danger" border>danger</a-button> -->

    <a-button>默认按钮</a-button>
    <a-button type="primary">primary</a-button>
    <a-button type="success">success</a-button>
    <a-button type="warning">warning</a-button>
    <a-button type="danger">danger</a-button>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
    'a-button':()=>import("@/components/button/index.vue")
  },
  data() {
    return {
      flag:false
    }
  },
  methods: {
    // 父组件方法调用，现模拟asyncFunction，实际应用为请求接口。当点击change时优先判断beforeChange是否为一个函数，是函数将loading显示出来，三秒钟之后执行resolve方法，也就是执行.then方法，将loading改为false
    asyncFunction() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 2000)
        
      })
    },
  }
}
</script>
