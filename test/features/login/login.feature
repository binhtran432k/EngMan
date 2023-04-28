# language: vi
@Login
Tính năng: Sử dụng trang Đăng nhập

  Tình huống: Chuyển hướng đến trang đăng ký
    Biết tôi chưa đăng nhập vào hệ thống
    Và tôi đang ở "trang đăng nhập"
    Khi tôi nhấn đường dẫn chuyển hướng về trang đăng ký
    Thì tôi thấy biểu mẫu đăng ký

  Tình huống: Đăng nhập vào hệ thống thành công
    Biết tôi chưa đăng nhập vào hệ thống
    Và tôi đang ở "trang đăng nhập"
    Khi tôi hiện thực đăng nhập với tài khoản "student" và mật khẩu "12345678As"
    Và tôi nhấn nút đăng nhập
    Thì tôi bị chuyển hướng về "trang chủ"

  Tình huống: Đăng nhập vào hệ thống thất bại với các trường không hợp lệ
    Biết tôi chưa đăng nhập vào hệ thống
    Và tôi đang ở "trang đăng nhập"
    Khi tôi nhấn nút đăng nhập
    Nhưng Tôi thấy phản hồi đăng nhập với các trường không hợp lệ như sau:
      | Tên           | Đầu vào                          |
      | tên đăng nhập | Tên đăng nhập bắt buộc phải điền |
      | mật khẩu      | Mật khẩu bắt buộc phải điền      |

  Tình huống: Đăng nhập vào hệ thống thất bại
    Biết tôi chưa đăng nhập vào hệ thống
    Và tôi đang ở "trang đăng nhập"
    Khi tôi hiện thực đăng nhập với tài khoản "stu" và mật khẩu "12345678As"
    Và tôi nhấn nút đăng nhập
    Nhưng tôi thấy lỗi xuật hiện với tin nhắn "Tài khoản hoặc mật khẩu không đúng"
