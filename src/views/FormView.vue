<template>
    <div >
      
      <a-form ref="form" :item="form_item" :field="form_field" :button="form_button" :before-submit="submitForm">
        
    </a-form>
    </div>
  </template>
  
  <script>
export default {
  name: "FormView",
  components: {
    "a-form": () => import("@/components/form/index.vue"),
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
          prop: "name",
          label: "姓名",
          required: true,
          message: "请输入姓名",
          // rules: [
          //   {
          //     min: 3,
          //     max: 5,
          //     message: "长度在 3 到 5 个字符",
          //     trigger: "blur",
          //   },
          //   // 自定义校验规则
          //   { validator: validateName, trigger: "blur" },
          // ],
        },
        {
          type: "input",
          value_type: "phone",
          prop: "phone",
          label: "手机号",
          required: true,
          message: "请输入手机号",
        },
        {
          type: "input",
          prop: "email",
          label: "邮箱",
          rules: [
            {
              required: true,
              message: "必填",
            },
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
  