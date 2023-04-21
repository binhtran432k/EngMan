# language: vi
Tính năng: Đăng nhập

  Tình huống: Mở trang đăng nhập bằng đường dẫn khi chưa đăng nhập
    Biết tôi chưa đăng nhập vào hệ thống
    Khi tôi mở "trang đăng nhập" bằng đường dẫn
    Thì tôi thấy biểu mẫu đăng nhập

  Tình huống: Đăng nhập vào hệ thống thành công
    Biết tôi chưa đăng nhập vào hệ thống
    Và tôi đang ở "trang đăng nhập"
    Khi tôi hiện thực đăng nhập với tài khoản "student" và mật khẩu "12345678As"
    Và tôi nhấn nút đăng nhập
    Thì tôi bị chuyển hướng về "trang chủ"

  Tình huống: Đăng nhập vào hệ thống thất bại
    Biết tôi chưa đăng nhập vào hệ thống
    Và tôi đang ở "trang đăng nhập"
    Khi tôi hiện thực đăng nhập với tài khoản "stu" và mật khẩu "12345678As"
    Và tôi nhấn nút đăng nhập
    Thì tôi thấy lỗi xuật hiện với tin nhắn "Tài khoản hoặc mật khẩu không đúng"

  Tình huống: Mở trang đăng nhập bằng đường dẫn chuyển hướng về trang chủ khi đã đăng nhập
    Biết tôi đã đăng nhập vào hệ thống với quyền "mặc định"
    Khi tôi mở "trang đăng nhập" bằng đường dẫn
    Thì tôi bị chuyển hướng về "trang chủ"
