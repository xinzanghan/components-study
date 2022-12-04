const regPhone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * 验证手机号
 * @param {*} rule
 * @param {*} value
 * @param {*} callBack
 */
export function validatorPhone(rule, value, callBack) {
  if (regPhone.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的手机号"));
  }
}

/**
 * 验证邮箱
 * @param {*} rule
 * @param {*} value
 * @param {*} callBack
 */
export function validatorEmail(rule, value, callBack) {
  if (regEmail.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的手机号"));
  }
}
