<template>
    <div >
      <a-table :column="column" checkBox index></a-table>
    </div>
  </template>
  
  <script>
export default {
  name: "TableView",
  components: {
    "a-table": () => import("@/components/table/index.vue"),
  },
  data() {
    return {
      column: [
        {
          label: "日期",
          prop: "date",
          width: 300,
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
      ],
    };
  },
  methods: {},
};
</script>
  