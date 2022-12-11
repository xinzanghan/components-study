<template>
  <el-form ref="form" :model="field" :rules="rules" label-width="80px">
    <template v-for="item in form_item">
      <el-form-item
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
      >
        <slot v-if="item.type === 'slot'" :name="item.slot_name"></slot>
        <component
          v-else
          :value.sync="field[item.prop]"
          :config="item"
          :is="!item.type ? 'com-text' : `com-${item.type}`"
        />
      </el-form-item>
      <!-- <el-form-item v-if="item.type==='select'"  :key="item.prop" :label="item.label" :prop="item.prop" :rules="item.rules">
            <el-select v-model="field[item.prop]"></el-select>
        </el-form-item> -->
    </template>

    <el-form-item>
      <el-button
        v-for="item in button"
        :loading="item.loading"
        :key="item.key"
        :type="item.type"
        @click="handlerBtn(item)"
        >{{ item.label }}</el-button
      >
    </el-form-item>
  </el-form>
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
import createRules from "./createRules";

export default {
  name: "Form",
  components: {
    ...modules,
  },
  props: {
    item: {
      type: Array,
      default: () => [],
    },
    field: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },

    button: {
      type: Array,
      default: () => [],
    },
    beforeSumit: Function,
  },
  data() {
    return {
      form_item: [], //接收父组件传进来的item项
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },

  beforeMount() {
    this.form_item = createRules(this.item);
  },
  mounted: {},

  methods: {
    handlerBtn(data) {
      console.log(data.key);
      if (data.key === "submit") {
        this.submit(data);
        return false;
      }
      if (data.key === "cancel") {
        this.cancel(data);
        return false;
      }
      //   其他按钮
      data.callback && data.callback(data);
    },
    submit(data) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (typeof this.beforeSumit == "function") {
            this.$set(data, "loading", true);
            this.beforeSumit()
              .then((res) => {
                this.$set(data, "loading", false);
              })
              .catch(() => {
                this.$set(data, "loading", false);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel(data) {
      this.$refs.form.resetFields();
      data.callback && data.callback(data);
    },
  },
};
</script>
<style lang="less" scoped></style>
