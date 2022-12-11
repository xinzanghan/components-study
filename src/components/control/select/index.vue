<template>
  <div>
    <el-select
      v-model="val"
      @change="handlerChange"
      :filterable="fetchSearch"
      :remote="'fetchSearch'"
      :remote-method="keywordRequest"
      :multiple="multiple"
      :collapse-tags="multiple"
    >
      <el-option
        v-for="item in option"
        :key="item[props.value]"
        :label="item[props.label]"
        :value="item[props.value]"
      >
        <slot name="select" :data="item"></slot>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "SelectComponent",
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      val: "",
      option: [],
      // 默认值
      props: {
        label: "label",
        value: "value",
      },
    };
  },
  watch: {
    config: {
      handler(newValue) {
        this.initOptions();
        this.initProps();
      },
      immediate: true,
    },
    value: {
      handler(newValue) {
        this.val = newValue;
      },
      immediate: true,
    },
  },

  components: {},

  computed: {
    url() {
      return this.config?.url;
    },
    initRequest() {
      return this.config?.init_request;
    },
    method() {
      return this.config?.method || "get";
    },
    fetchSearch() {
      return this.config?.fetch_search;
    },
    keyword() {
      return this.config?.keyword || "keyword";
    },
    multiple() {
      return this.config?.multiple;
    },
  },

  mounted: {},

  methods: {
    handlerChange() {
      // 同步更新父组件所绑定的值 父组件一定要用.sync
      this.$emit("update:value", this.val);
    },

    // 初始化下拉数据
    initOptions() {
      const url = this.config.url;
      if (url) {
        // 如果异步url存在 去掉异步的方法
        this.fentchOptions();
        return false;
      }

      const option = this.config.options;
      if (option && Array.isArray(option) && option.length > 0) {
        this.option = option;
      }
    },
    // 异步请求
    fentchOptions() {
      // this.initRequest&&this.getOption();
      if (!this.initRequest) {
        return false;
      }
      this.getOption();

      // console.log("异步操作");
      // const init_request = this.config.init_request;
      // const url = this.config.url;
      // const method = this.config.method;
      // console.log(init_request, url, method, "init_request");
    },
    // 异步关键字请求
    keywordRequest(query) {
      // query && this.fetchSearch&&this.getOption(query)
      if (query && this.fetchSearch) {
        this.getOption(query);
      }
    },
    // 获取option列表
    getOption(value) {
      const request_data = {
        url: this.url,
        method: this.method,
      };
      // 参数处理 复制的table index
      // get post delete put
      if (this.method === "get") {
        request_data.params = value ? { [this.keyword]: value } : {};
      }
      if (this.method === "post") {
        request_data.data = value ? { [this.keyword]: value } : {};
      }

      // 接口请求
      this.$axios(request_data).then((res) => {
        this.option = res.data.data;
      });
    },
    initProps() {
      const option = this.config.props;
      //获取默认值的key
      const keys = Object.keys(this.props);
      if (
        option &&
        Object.prototype.toString.call(option) === "[object Object]"
      ) {
        for (const key in option) {
          if (keys.includes(key)) {
            this.props[key] = option[key];
          }
        }
      }
    },
  },
};
</script>
<style lang="less" scoped></style>
