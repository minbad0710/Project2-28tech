// loginForm
const loginForm = document.querySelector("#loginForm");
if(loginForm) {
  const validator = new JustValidate('#loginForm');

  validator
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email của bạn!'
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!'
      },
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu của bạn!'
      },
    ])
    .onSuccess((event) => {
      const email = event.target.email.value;
      const password = event.target.password.value;
      const rememberPassword = event.target.rememberPassword.checked;
      console.log(email);
      console.log(password);
      console.log(rememberPassword);
    })
}
// End loginForm
// registerForm
const registerForm = document.querySelector("#registerForm");
if(registerForm) {
  const validator = new JustValidate('#registerForm');

  validator
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên!'
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Họ tên phải có ít nhất 5 ký tự!'
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Họ tên không được vượt quá 50 ký tự!'
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email của bạn!'
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!'
      },
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu của bạn!'
      },
      {
        rule: 'minLength',
        value: 8,
        errorMessage: 'Mật khẩu phải có ít nhất 8 ký tự!'
      },
      {
        rule: 'customRegexp',
        value: /[A-Z]/,
        errorMessage: 'Mật khẩu phải có ít nhất một chữ cái viết hoa!'
      },
      {
        rule: 'customRegexp',
        value: /[a-z]/,
        errorMessage: 'Mật khẩu phải có ít nhất một chữ cái viết thường!'
      },
      {
        rule: 'customRegexp',
        value: /\d/,
        errorMessage: 'Mật khẩu phải có ít nhất một chữ số!'
      },
      {
        rule: 'customRegexp',
        value: /[^a-zA-Z0-9\s]/,
        errorMessage: 'Mật khẩu phải có ít nhất một ký tự đặc biệt!'
      },
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng đồng ý với điều khoản sử dụng!'
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
      console.log(fullName);
      console.log(email);
      console.log(password);
    })
}
// End registerForm
// forgotPasswordForm
const forgotPasswordForm = document.querySelector("#forgotPasswordForm");
if(forgotPasswordForm) {
  const validator = new JustValidate('#forgotPasswordForm');

  validator
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email của bạn!'
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!'
      },
    ])
    .onSuccess((event) => {
      const email = event.target.email.value;
      console.log(email);
    })
}
// End forgotPasswordForm
// otpPasswordForm
const otpPasswordForm = document.querySelector("#otpPasswordForm");
if(otpPasswordForm) {
  const validator = new JustValidate('#otpPasswordForm');

  validator
    .addField('#otp', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mã OTP!'
      },
    ])
    .onSuccess((event) => {
      const otp = event.target.otp.value;
      console.log(otp);
    })
}
// End otpPasswordForm
// resetPasswordForm
const resetPasswordForm = document.querySelector("#resetPasswordForm");
if(resetPasswordForm) {
  const validator = new JustValidate('#resetPasswordForm');

  validator
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu của bạn!'
      },
      {
        rule: 'minLength',
        value: 8,
        errorMessage: 'Mật khẩu phải có ít nhất 8 ký tự!'
      },
      {
        rule: 'customRegexp',
        value: /[A-Z]/,
        errorMessage: 'Mật khẩu phải có ít nhất một chữ cái viết hoa!'
      },
      {
        rule: 'customRegexp',
        value: /[a-z]/,
        errorMessage: 'Mật khẩu phải có ít nhất một chữ cái viết thường!'
      },
      {
        rule: 'customRegexp',
        value: /\d/,
        errorMessage: 'Mật khẩu phải có ít nhất một chữ số!'
      },
      {
        rule: 'customRegexp',
        value: /[^a-zA-Z0-9\s]/,
        errorMessage: 'Mật khẩu phải có ít nhất một ký tự đặc biệt!'
      },
    ])
    .addField('#confirmPassword', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập xác nhận mật khẩu mới!'
      },
      {
        validator: (value, context) => value == context["#password"].elem.value,
        errorMessage: 'Mật khẩu xác nhận không khớp!'
      },
    ])
    .onSuccess((event) => {
      const password = event.target.password.value;
      console.log(password);
    })
}
// End resetPasswordForm
