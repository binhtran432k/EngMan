# language: vi
@Register
Tính năng: Sử dụng trang Đăng ký

  Tình huống: Chuyển hướng đến trang đăng nhập
    Biết tôi chưa đăng nhập vào hệ thống
    Và tôi đang ở "trang đăng ký"
    Khi tôi nhấn đường dẫn chuyển hướng về trang đăng nhập
    Thì tôi thấy biểu mẫu đăng nhập

  Tình huống: Tạo tài khoản thành công
    Biết tôi chưa đăng nhập vào hệ thống
    Và tôi đang ở "trang đăng ký"
    Khi tôi hiện thực tạo tài khoản với thông tin sau:
      | Tên               | Đầu vào    |
      | tên               | Binh       |
      | họ                | Tran       |
      | tên đăng nhập     | binhtran   |
      | mật khẩu          | 12345678As |
      | nhập lại mật khẩu | 12345678As |
    Và tôi nhấn nút tạo tài khoản
    Thì tôi bị chuyển hướng về "trang chủ"

  Tình huống: Tạo tài khoản thất bại với các trường không hợp lệ
    Biết tôi chưa đăng nhập vào hệ thống
    Và tôi đang ở "trang đăng ký"
    Khi tôi hiện thực tạo tài khoản với thông tin sau:
      | Tên               | Đầu vào                                                                                                                                                                                                                                                                                                                                                                                                          |
      | tên               | Adipisicing assumenda quia asperiores quisquam omnis aperiam. Sunt iure unde fugiat cum dignissimos Sed beatae tempore aspernatur incidunt nulla Ad quam sunt consequatur labore officiis doloremque similique porro, sed exercitationem nulla? Similique reprehenderit nobis est dolorem obcaecati Eligendi facilis est exercitationem a rerum, accusantium? Vitae quod nihil libero accusamus natus. Suscipit? |
      | họ                | Adipisicing assumenda quia asperiores quisquam omnis aperiam. Sunt iure unde fugiat cum dignissimos Sed beatae tempore aspernatur incidunt nulla Ad quam sunt consequatur labore officiis doloremque similique porro, sed exercitationem nulla? Similique reprehenderit nobis est dolorem obcaecati Eligendi facilis est exercitationem a rerum, accusantium? Vitae quod nihil libero accusamus natus. Suscipit? |
      | tên đăng nhập     | Bình Trần                                                                                                                                                                                                                                                                                                                                                                                                        |
      | mật khẩu          | a123                                                                                                                                                                                                                                                                                                                                                                                                             |
      | nhập lại mật khẩu | a12345678As                                                                                                                                                                                                                                                                                                                                                                                                      |
    Và tôi nhấn nút tạo tài khoản
    Nhưng Tôi thấy phản hồi tạo tài khoản với các trường không hợp lệ như sau:
      | Tên               | Đầu vào                                                                                  |
      | tên               | Tên có độ dài tối đa là 50                                                               |
      | họ                | Họ có độ dài tối đa là 50                                                                |
      | tên đăng nhập     | Tên đăng nhập phải có độ dài từ 3 đến 50 và chỉ gồm các ký tự trong khoảng a-z, A-Z, 0-9 |
      | mật khẩu          | Mật khẩu phải có độ dài từ 8 đến 50                                                      |
      | nhập lại mật khẩu | Nhập lại mật khẩu phải trùng khớp với Mật khẩu                                           |

  Tình huống: Tạo tài khoản thất bại
    Biết tôi chưa đăng nhập vào hệ thống
    Và tôi đang ở "trang đăng ký"
    Khi tôi hiện thực tạo tài khoản với thông tin sau:
      | Tên               | Đầu vào    |
      | tên               | Binh       |
      | họ                | Tran       |
      | tên đăng nhập     | student    |
      | mật khẩu          | 12345678As |
      | nhập lại mật khẩu | 12345678As |
    Và tôi nhấn nút tạo tài khoản
    Nhưng tôi thấy lỗi xuật hiện với tin nhắn "Người dùng này đã tồn tại"
