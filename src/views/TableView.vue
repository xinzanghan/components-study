<template>
    <div >
      <el-button @click="getCheckList">获取勾选数据</el-button>
      <a-table ref="table" on-load :check-list.sync="check_list" @onLoad="onLoad" :init-request="false" :column="column" checkBox index url="/api/name/" :data="data_1" :params="params_1" :format="formatData">
        <template v-slot:operation="slot">
            {{slot.data1111.sex}}
            <a-button type="primary" @click="jump(slot.data1111)">编辑</a-button>
            <a-button type="danger">删除</a-button>
        </template>
    </a-table>
    </div>
  </template>
  
  <script>
export default {
  name: "TableView",
  components: {
    "a-table": () => import("@/components/table/index.vue"),
    "a-button": () => import("@/components/button/index.vue"),
  },
  data() {
    return {
      column: [
        {
          // 没有type 默认纯文本，有type 拼接使用对应组件
          label: "URL地址",
          prop: "date",
          callback: (data) => {
            return `<a href="http://www.baidu.com">${data.name}</a>`;
          },
        },
        {
          type: "function",
          prop: "name",
          label: "名称",
          callback: (data) => {
            console.log(data, "data");
            return "我返回了";
          },
        },
        {
          label: "地址",
          prop: "address",
          sort: "colunmn",
          sort_by: "a.XXX",
        },
        {
          label: "性别",
          prop: "sex",
        },
        {
          type: "slot",
          label: "操作",
          prop: "operation",
          //   v-slot:operation  与下方的插槽名字一样 operation
          slot_name: "operation",
          sort: true,
          render_header: (h, { column, $index }) => {
            return (
              <div>
                <p>操作</p>
                <el-input value="1" />
              </div>
            );
          },
        },
      ],
      data_1: {
        name: 22,
      },
      params_1: {
        name: 33,
      },
      check_list: [], //接收子组件勾选数据
    };
  },
  watch: {
    check_list: {
      handler(value) {
        console.log(value, "父组件");
      },
    },
  },
  methods: {
    // 获取勾选数据
    getCheckList() {
      console.log(this.check_list);
    },
    onLoad(data) {
      console.log(data);
    },
    formatData(data) {
      console.log(1111, data);
    },
    jump(data) {
      console.log(data);
    },
  },
};
</script>
  