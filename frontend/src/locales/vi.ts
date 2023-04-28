import en from "./en";

export default {
  common: {
    login: "Đăng nhập",
    createAccount: "Tạo tài khoản",
  },
  Navbar: {
    label: "Thanh điều kiểu",
    logout: "Đăng xuất",
    myLearning: "Học tập của tôi",
    instructor: "Giảng viên",
    academy: "Trung tâm",
    searching: "Tìm kiếm bất cứ thứ gì",
    category: "Thể loại",
    searchCourse: "Tìm kiếm khóa học",
    searchClass: "Tìm kiếm lớp học",
    wishlist: "Yêu thích",
    notification: "Thông báo",
  },
  UserMenu: {
    label: "Bảng Người dùng",
    user: "Người dùng",
    lists: "Danh sách",
    useful: "Hữu ích",
  },
  LoginPage: {
    label: "Đăng nhập vào tài khoản EngMan của bạn",
    notHaveAccount: "Bạn chưa có tài khoản",
    registerNow: "Đăng ký ngay",
  },
  RegisterPage: {
    label: "Đăng ký tài khoản",
    haveAccount: "Bạn đã có tài khoản",
    loginNow: "Đăng nhập ngay",
  },
  validation: {
    required: "$t({{name}}.label) bắt buộc phải điền",
    min: "$t({{name}}.label) có độ dài tối thiểu là {{data.0}}",
    max: "$t({{name}}.label) có độ dài tối đa là {{data.0}}",
    minMax: "$t({{name}}.label) phải có độ dài từ {{data.0}} đến {{data.1}}",
    missMatch:
      "$t(retypePassword.label) phải trùng khớp với $t({{data.0}}.label)",
    invalid: "$t({{name}}.label) không hợp lệ",
    username: {
      label: "Tên đăng nhập",
      missPattern:
        "$t({{name}}.label) phải có độ dài từ {{data.0}} đến {{data.1}} và chỉ gồm các ký tự trong khoảng a-z, A-Z, 0-9",
    },
    password: { label: "Mật khẩu" },
    retypePassword: {
      label: "Nhập lại mật khẩu",
    },
    firstName: { label: "Tên" },
    lastName: { label: "Họ" },
    login: {
      title: "Đăng nhập thất bại",
      message: "Tài khoản hoặc mật khẩu không đúng",
    },
    register: {
      title: "Tạo tài khoản thất bại",
      exists: "Người dùng này đã tồn tại",
    },
    system: {
      title: "Lỗi hệ thống",
      message: "Đã có lỗi xảy ra trong hệ thống",
    },
  },
  glossary: {},
} as typeof en;
