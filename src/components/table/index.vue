<template>
  <el-table :data="tableData" style="width: 100%">
      <el-table-column v-if="checkBox" type="selection" width="55"></el-table-column>
      <el-table-column v-if="index" type="index" width="50"></el-table-column>
      <el-table-column v-for="item in column" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
</el-table>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ATable",
  props: {
    column: {
      type: Array,
      default: () => [],
    },
    // checkBox: {
    //   type: Boolean,
    //   default: true,
    // },
    checkBox: Boolean,
    index: Boolean,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          sex: "男",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          sex: "男",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          sex: "男",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          sex: "男",
        },
      ],
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {},
};
</script>
<style lang='less' scoped>
</style>