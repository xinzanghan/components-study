<template>
    <div >
      <a-table :column="column" checkBox index url="/api/name/">
        <template v-slot:operation="slot">
            {{slot.data1111.date}}
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
          type: "function",
          label: "URL地址",
          prop: "date",
          callback: (data) => {
            return `<a href="http://www.baidu.com">${data.name}</a>`;
          },
        },
        {
          label: "名称",
          prop: "name",
        },
        {
          label: "地址",
          prop: "address",
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
        },
      ],
    };
  },
  methods: {
    jump(data) {
      console.log(data);
    },
  },
};
</script>
  