import { validatorPhone, validatorEmail } from "@/utils/validator";
const createRules = (data) => {
  data.forEach((item) => {
    //检测规则是一个数组类型
    let rules_array = [];
    if (item.required) {
      const rule = {
        required: true,
        message: item.message || createMessage(item),
      };
      rules_array.push(rule);
    }

    //   校验手机号
    if (item.value_type && item.value_type === "phone") {
      // 因为引入了import { phone } from "@/utils/validator"; 下方代码可不要
      //   const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      //   const phone = (rule, value, callBack) => {
      //     if (reg.test(value)) {
      //       callBack();
      //     } else {
      //       callBack(new Error("请输入正确的手机号"));
      //     }
      //   };
      const rule = { validator: validatorPhone, trigger: "change" };
      rules_array.push(rule);
    }

    //   校验邮箱
    if (item.value_type && item.value_type === "email") {
      const rule = { validator: validatorEmail, trigger: "change" };
      rules_array.push(rule);
    }

    // 是否有额外的检验规则
    if (item.rules && Array.isArray(item.rules) && item.rules.length > 0) {
      rules_array = rules_array.concat(item.rules);
    }
    item.rules = rules_array;
  });
  console.log(data);

  return data;
};

const createMessage = (data) => {
  let msg = "";
  switch (data.type) {
    case "input":
      msg = "请输入";
      break;
    case "select":
      msg = "请选择";
      break;
  }
  return `${msg}${data.label}`;
};

export default createRules;
