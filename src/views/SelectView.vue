<template>
  <div>
    <a-form
      ref="form"
      :item="form_item"
      :field="form_field"
      :button="form_button"
      :before-submit="submitForm"
    >
      <template v-slot:classroom>
        <a-select :config="select_classroom">
          <template v-slot:select="slot">
            <div style="font-size: 30px">{{ slot.data.class_name }}</div>
          </template>
        </a-select>
      </template>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "FormView",
  components: {
    "a-form": () => import("@/components/form/index.vue"),
    "a-select": () => import("@/components/control/select/index.vue"),
  },
  data() {
    var validateName = (rule, value, callback) => {
      // 校验通过 执行callback();
      // 校验不通过 执行callback(new Error())
      if (value && value !== "wyh") {
        callback(new Error("请输入wyh"));
      } else {
        callback();
      }
    };
    return {
      form_item: [
        {
          type: "input",
          value_type: "phone",
          prop: "phone",
          label: "手机号",
          required: true,
          message: "请输入手机号",
        },
        // 本地配置option
        {
          type: "select",
          prop: "class_room",
          label: "教室",
          required: true,
          multiple: true,
          // 自定义配置
          props: {
            label: "name",
            value: "id",
          },
          options: [
            { name: "vue.js一班", id: "1" },
            { name: "vue.js二班", id: "2" },
            { name: "vue.js三班", id: "3" },
          ],
        },
        // 走接口 获取option
        {
          type: "select",
          prop: "class_room1",
          label: "异步教室",
          required: true,
          keyword: "aaa",
          // 自定义配置
          props: {
            label: "name",
            value: "id",
          },
          // 配置初始化时 数据是否请求
          init_request: true,
          // 配置是否远程搜索
          fetch_search: true,
          //  url:/api/classname/
          url: "/api/classname/",
          method: "get",
        },
        // 自定义模板
        {
          type: "slot",
          slot_anme: "class_room",
          prop: "class_room",
          label: "教室",
          required: true,
          multiple: true,
          // 自定义配置
          props: {
            label: "name",
            value: "id",
          },
          options: [
            { name: "vue.js一班", id: "1" },
            { name: "vue.js二班", id: "2" },
            { name: "vue.js三班", id: "3" },
          ],
        },
      ],
      form_field: {
        phone: "11111",
        sex: "",
      },
      form_button: [
        // 确定按钮，取消按钮和其他按钮
        {
          label: "确定",
          key: "submit",
          type: "primary",
        },
        {
          label: "重置",
          key: "cancel",
          type: "danger",
          callback: (data) => this.cancel(data),
        },
        {
          label: "下一步",
          key: "next",
          type: "primary",
          callback: (data) => this.next(data),
        },
      ],

      select_classroom: {
        multiple: true,
        // 自定义配置
        props: {
          label: "class_name",
          value: "id",
        },
        options: [
          { name: "vue.js一班", id: "1" },
          { name: "vue.js二班", id: "2" },
          { name: "vue.js三班", id: "3" },
        ],
      },
    };
  },
  watch: {},
  methods: {
    submitForm() {
      return new Promise((res, reject) => {
        setTimeout(() => {
          reject();
        }, 2000);
      });
    },
    cancel(data) {
      console.log("cancel");
    },
    next(data) {
      console.log("next");
    },
  },
};
</script>
