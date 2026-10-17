// Khởi tạo tinymce

const initTinyMce = () => {
  tinymce.init({
    selector: '[textarea-mce]',
    plugins: 'charmap'
  });
}

initTinyMce();

// End khởi tạo tinymce

// Menu Mobile
const buttonMenuMobile = document.querySelector(".header .inner-button-menu");
if(buttonMenuMobile){
  const sider = document.querySelector(".sider");

  buttonMenuMobile.addEventListener("click", () => {
    sider.classList.toggle("show");
  })
}
// End Menu Mobile

// Schedule section 8
const scheduleSection8 = document.querySelector(".section-8 .inner-schedule")
if(scheduleSection8){
  const buttonCreate = scheduleSection8.querySelector(".inner-schedule-create");
  const boxList = scheduleSection8.querySelector(".inner-schedule-list");

  // Tạo khối mới
  buttonCreate.addEventListener("click", () => {
    const firstItem = scheduleSection8.querySelector(".inner-schedule-item");
    const cloneItem = firstItem.cloneNode(true);
    cloneItem.querySelector("input").value = "";
    cloneItem.querySelector(".inner-schedule-body").innerHTML =  `<textarea textarea-mce></textarea>`;

    boxList.appendChild(cloneItem);
    initTinyMce()
    
  });
  let contentTinyMce = "";
  // Sắp xếp các khối
  new Sortable(boxList, {
    handle: '.inner-move', // handle's class
    animation: 150,

    onStart: function (/**Event*/evt) {
      const itemEl = evt.item;
      const textarea = itemEl.querySelector(".inner-schedule-body textarea");
      const content = tinymce.get(textarea.id).getContent();
      contentTinyMce = content;
    },

    onEnd: function (/**Event*/evt) {
      const itemEl = evt.item;  // dragged HTMLElement

      itemEl.querySelector(".inner-schedule-body").innerHTML =  `<textarea textarea-mce>${contentTinyMce}</textarea>`;
      initTinyMce();
      contentTinyMce = "";
    },
  });



  boxList.addEventListener("click", (event) => {
    // Đóng / Mở item
    if(event.target.closest(".inner-more")){
      const item = event.target.closest(".inner-schedule-item");
      item.classList.toggle("hidden");
    }

    // Xóa item
    if(event.target.closest(".inner-remove")){
      const item = event.target.closest(".inner-schedule-item");
      if(boxList.querySelectorAll(".inner-schedule-item").length > 1)
        item.remove();
    }
  });
}
// End Schedule section 8
// File pond
const listFilepondImage = document.querySelectorAll("[filepond-image]");
const filePond = {};
if(listFilepondImage.length > 0) {
  FilePond.registerPlugin(FilePondPluginImagePreview);
  FilePond.registerPlugin(FilePondPluginFileValidateType);

  listFilepondImage.forEach((input) => {
    filePond[input.name] = FilePond.create(input, {
      labelIdle: "+",
      acceptedFileTypes : ["image/*"],
    });
  });
  
}

// End file pond

// Category Create Form
const categoryCreateForm = document.querySelector("#categoryCreateForm");
if(categoryCreateForm) {
  const validator = new JustValidate('#categoryCreateForm');

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên danh mục!'
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const parent = event.target.parent.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile() ? filePond.avatar.getFile().file : null;
      const description = tinymce.get("description").getContent();
      console.log(description)
    })
}
// End Category Create Form
// Tour Create Form
const tourCreateForm = document.querySelector("#tourCreateForm");
if(categoryCreateForm) {
  const validator = new JustValidate('#categoryCreateForm');

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên tour!'
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const category = event.target.category.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatar = filePond.avatar.getFile() ? filePond.avatar.getFile().file : null;
      const priceAdult = event.target.priceAdult.value;
      const priceChildren = event.target.priceChildren.value;
      const priceBaby = event.target.priceBaby.value;
      const priceNewAdult = event.target.priceNewAdult.value;
      const priceNewChildren = event.target.priceNewChildren.value;
      const priceNewBaby = event.target.priceNewBaby.value;
      const stockAdult = event.target.stockAdult.value;
      const stockChildren = event.target.stockChildren.value;
      const stockBaby = event.target.stockBaby.value;
      const locations = []
      const time = event.target.time.value;
      const vehicle = event.target.vehicle.value;
      const departureDate = event.target.departureDate.value;
      const information = tiny.get("information").getContent();
      const schedule = []
      //locations
      const listInputLocationChecked = document.querySelectorAll("input[name='locations']:checked");
      listInputLocationChecked.forEach((input) => {
        locations.push(input.value);
      })
      //end locations

      //schedule
      const listScheduleItem = document.querySelectorAll(".inner-schedule-item");
      listScheduleItem.forEach((item) => {
        const title = item.querySelector(".inner-schedule-head input").value;
        const textarea = item.querySelector(".inner-schedule-body textarea");
        const description = tinymce.get(textarea.id).getContent();
        schedule.push({
          title: title,
          description: description
        })
      })
      //end schedule
    })
}
// End Tour Create Form

// orderEditForm
const orderEditForm = document.querySelector("#orderEditForm");
if(orderEditForm) {
  const validator = new JustValidate('#orderEditForm');

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
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập số điện thoại!'
      },
      {
        rule: 'customRegexp',
        value: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/gi,
        errorMessage: 'Số điện thoại không đúng định dạng!'
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const note = event.target.note.value;
      const paymentMethod = event.target.paymentMethod.value;
      const paymentStatus = event.target.paymentStatus.value;
      const status = event.target.status.value;
      console.log(fullName);
      console.log(phone);
      console.log(note);
      console.log(paymentMethod);
      console.log(paymentStatus);
      console.log(status);
    })
}
// End orderEditForm
// settingWebsiteInfoForm
const settingWebsiteInfoForm = document.querySelector("#settingWebsiteInfoForm");
if(settingWebsiteInfoForm) {
  const validator = new JustValidate('#settingWebsiteInfoForm');

  validator
    .addField('#email', [
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!'
      },
    ])
    .onSuccess((event) => {
      const websiteName = event.target.websiteName.value;
      const phone = event.target.phone.value;
      const email = event.target.email.value;
      const address = event.target.address.value;
      const logo = filePond.logo.getFile()?.file || null;
      const favicon = filePond.favicon.getFile()?.file || null;

      console.log(websiteName);
      console.log(phone);
      console.log(email);
      console.log(address);
      console.log(logo);
      console.log(favicon);
    })
}
// End settingWebsiteInfoForm
// settingAccountAdminCreateForm
const settingAccountAdminCreateForm = document.querySelector("#settingAccountAdminCreateForm");
if(settingAccountAdminCreateForm) {
  const validator = new JustValidate('#settingAccountAdminCreateForm');

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
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const role = event.target.role.value;
      const positionCompany = event.target.positionCompany.value;
      const status = event.target.status.value;
      const password = event.target.password.value;
      const avatar = filePond.avatar.getFile()?.file || null;
      
      console.log(fullName);
      console.log(email);
      console.log(phone);
      console.log(role);
      console.log(positionCompany);
      console.log(status);
      console.log(password);
      console.log(avatar);
    })
}
// End settingAccountAdminCreateForm
// settingRoleCreateForm
const settingRoleCreateForm = document.querySelector("#settingRoleCreateForm");
if(settingRoleCreateForm) {
  const validator = new JustValidate('#settingRoleCreateForm');

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên nhóm quyền!'
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const description = event.target.description.value;
      const permissions = [];

      // permissions
      const listInputChecked = document.querySelectorAll(`[name="permissions"]:checked`);
      listInputChecked.forEach(input => {
        permissions.push(input.value);
      })
      // End permissions

      console.log(name);
      console.log(description);
      console.log(permissions);
    })
}
// End settingRoleCreateForm
// profileEditForm
const profileEditForm = document.querySelector("#profileEditForm");
if(profileEditForm) {
  const validator = new JustValidate('#profileEditForm');

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
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const avatar = filePond.avatar.getFile()?.file || null;
      
      console.log(fullName);
      console.log(email);
      console.log(phone);
      console.log(avatar);
    })
}
// End profileEditForm
// profileChangePasswordForm
const profileChangePasswordForm = document.querySelector("#profileChangePasswordForm");
if(profileChangePasswordForm) {
  const validator = new JustValidate('#profileChangePasswordForm');

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
// End profileChangePasswordForm
