import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Họ và tên không được để trống")
    .min(3, "Họ và tên phải có ít nhất 3 ký tự"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(/^(?:\+84|0)(3|5|7|8|9)[0-9]{8}$/, "Số điện thoại không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
      "Mật khẩu phải có ít nhất 6 ký tự, gồm 1 chữ hoa, 1 số và 1 ký tự đặc biệt"
    ),
});
