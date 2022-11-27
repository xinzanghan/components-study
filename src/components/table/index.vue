<template>
  <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange">
      <el-table-column v-if="checkBox" type="selection" width="55"></el-table-column>
      <el-table-column v-if="index" type="index" width="50"></el-table-column>
      <el-table-column v-for="item in column"  :sortable="item.sort" :sort-by="item.sort_by" :render-header="item.render_header" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" >
          <template slot-scope="scope">
            <slot v-if="item.type==='slot'" :name="item.slot_name" :data1111="scope.row"></slot>
            <component v-else :data="scope.row" :config="item" :prop="item.prop" :is="!item.type ? 'com-text' : `com-${item.type}`" />
                <!-- <div v-html="item.callback&&item.callback(scope.row)"></div> -->
          </template>
      </el-table-column>

      <!-- <el-table-column  v-if="item.type==='slot'"  :sortable="item.sort" :sort-by="item.sort_by"  :render-header="item.render_header" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
          <template slot-scope="scope">
              <slot :name="item.slot_name" :data1111="scope.row"></slot>
          </template>
      </el-table-column>
      <el-table-column v-else :key="item.prop"  :sortable="item.sort" :sort-by="item.sort_by"  :render-header="item.render_header" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column> -->


</el-table>
</template>

<script>
// 2.定义一个对象 用于拼接
const modules = {};

// 动态组件 自动化规则，通过type属性自动读取目录组件
// 1.使用node.js 引入文件  .context 三个参数 1.指定目录 2.true 读取这个目录的子目录，fasle 不会读取 3.读取指定后缀的文件
const files = require.context("../control", true, /\index.vue$/);
files.keys().forEach((item) => {
  const key = item.split("/"); // item:./function/index.vue   key:['.', 'function', 'index.vue']
  const name = key[1]; //name: function
  const component = files(item).default; // 获取到 当前文件 导出的 默认 模块

  // 3.组件名字"com-function"拼接————组件集成
  modules[`com-${name}`] = files(item).default;
  console.log(component, "component");
  console.log(modules, "modules");
});
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
    // 复选框
    checkBox: Boolean,
    index: Boolean,
    // 父组件是否接收子组件的回调函数返回值
    onload: Boolean,
    url: {
      type: String,
      default: "",
      required: true,
    },
    methods: {
      type: String,
      default: "post",
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    // 是否初始化默认请求
    initRequest: {
      type: Boolean,
      default: true,
    },
    // 数据格式化
    format: Function,
    // 复选框数据更新
    checkList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          sex: "男",
          id: 20,
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
  components: {
    // "com-function": () => import("../control/function"),
    // "com-image": () => import("../control/image"),
    ...modules,
  },
  beforeMount() {
    this.initRequest && this.getTableList();
  },
  mounted() {
    // 手动调用方法
    setTimeout(() => {
      this.$refs.table.handlerRequest();
    }, 2000);
  },
  methods: {
    // 远程排序
    sortChange(column, prop, order) {
      console.log(column, prop, order);
      const sort_by = column.sortBy;
      console.log(sort_by, order);
    },
    // 复选框回调
    handleSelectionChange(val) {
      this.$emit("update:checkList", val);
    },
    getTableList() {
      const url = this.url;
      if (!url) {
        console.log("请求地址不存在");
        return false;
      }
      const requst_data = {
        url: this.url,
        method: this.method,
      };
      // 转为字符串 来判读是否有值 若有值 则进行赋值，一般data/params只存在一个
      // 参数处理
      if (JSON.stringify(this.data) !== "{}") {
        requst_data.data = this.data;
      }
      if (JSON.stringify(this.params) !== "{}") {
        requst_data.params = this.params;
      }
      // 接口请求
      this.$axios(requst_data).then((response) => {
        let response_data = response.data.data;
        // 格式化数据
        if (this.format && typeof this.format === "function") {
          response_data = this.format(response.data.data);
        }

        this.tableData = response_data;
        // if (this.onload) {
        //   this.$emit("onload", response.data.data);
        // }
        //回调数据
        this.onload && this.$emit("onload", response.data.data);
      });
    },
    // 手动调用  不建议直接调用getTableList，建议写一个方法handlerRequest包一层
    handlerRequest() {
      this.getTableList();
    },
  },
};
</script>
<style lang='scss' scoped>
</style>