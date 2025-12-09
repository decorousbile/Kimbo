KIMBO CAMPERS WEBSITE REDESIGN - TODO LIST
Công nghệ: HTML5, CSS3, Bootstrap 5 (CDN), Three.js (CDN).
Phong cách: Kimbo "Twilight" (Midnight Blue, Brushed Aluminum, Ember Orange).
Tài liệu tham khảo: Brochure Kimbo (Camper 6, Modules).

GIAI ĐOẠN 1: KHỞI TẠO DỰ ÁN (SETUP)
 Tạo cấu trúc file:

Tạo index.html.

Tạo style.css.

Tạo script.js.

Tạo thư mục assets/images (nếu cần).

 Viết khung HTML cơ bản (Boilerplate):

Trong index.html: Tạo cấu trúc HTML5 chuẩn.

Nhúng link Bootstrap 5 CSS (CDN) vào thẻ <head>.

Nhúng link Bootstrap Icons (CDN).

Nhúng file style.css của mình.

Nhúng link Three.js và OrbitControls (CDN) trước thẻ đóng </body>.

Nhúng file script.js ở cuối cùng.

GIAI ĐOẠN 2: GIAO DIỆN & BRANDING (UI/UX)
 Thiết lập biến màu CSS (CSS Variables) trong style.css:

--kimbo-midnight: #0B1026 (Nền chính).

--kimbo-metal: #E5E7EB (Màu nhôm/text phụ).

--kimbo-ember: #F97316 (Nút bấm/Highlight).

Thiết lập body background màu midnight, text màu trắng.

 Xây dựng Navbar:

Dùng Bootstrap Navbar (navbar-dark).

Logo "KIMBO" (font đậm, letter-spacing rộng).

Các link: "Camper 6", "Modules", "Contact".

Nút CTA: "Build Your Own" (màu Ember Orange).

Style: Nền trong suốt hoặc bán trong suốt (backdrop-filter).

 Xây dựng Hero Section:

Layout: Chia 2 cột (col-lg-5 cho text, col-lg-7 cho vùng 3D).

Cột trái: Tiêu đề lớn "NIMBLE. SIMPLE. LIVING.", đoạn mô tả ngắn, nút "Start Configuration".

Cột phải: Tạo thẻ div có id canvas-container với chiều cao cố định (ví dụ 600px) để chứa khung 3D.

GIAI ĐOẠN 3: LOGIC CẤU HÌNH (SIDEBAR UI)
 Tạo Panel điều khiển (Configurator UI):

Tạo một cột mới hoặc floating panel bên phải màn hình.

Phần 1: Chọn Xe (Truck): Dropdown hoặc Radio button (Mid-size vs Full-size).

Phần 2: Ngoại thất: Checkbox cho "Solar Panels" (+$300), "Awning" (+$1000).

Phần 3: Nội thất (Modules): Danh sách Checkbox cho:

"Propane Fireplace" ($2,350).

"Foldaway Shower" ($1,980).

"Refrigerator" ($3,850).

Phần 4: Tổng kết: Hiển thị "Estimated Price" và "Total Weight".

 Xử lý xung đột (Logic JS):

Viết hàm JS: Nếu chọn "Shower", tự động disable (vô hiệu hóa) checkbox "Seating Nook" (vì xung đột vị trí). Hiển thị cảnh báo nhỏ.

GIAI ĐOẠN 4: LẬP TRÌNH 3D (THREE.JS)
 Khởi tạo môi trường 3D trong script.js:

Setup Scene, Camera, Renderer gắn vào #canvas-container.

Thêm ánh sáng: AmbientLight (sáng đều) và DirectionalLight (mô phỏng mặt trời).

Thêm OrbitControls để xoay camera bằng chuột.

 Tạo mô hình cơ bản (Primitive Shapes):

Tạo hàm createKimboShell(): Dùng BoxGeometry màu bạc (Silver) để đại diện cho Camper.

Tạo hàm createTruck(): Dùng các khối hộp màu đen đại diện cho xe bán tải bên dưới.

 Kết nối UI với 3D (Interaction):

Viết hàm toggleSolarPanel(isVisible):

Tạo một khối hộp mỏng màu đen trên nóc xe.

Khi checkbox Solar được tích -> hiện khối đó. Bỏ tích -> ẩn đi.

Viết hàm toggleFireplace(isVisible):

Tạo một ống khói nhỏ trên nóc xe.

Ẩn/hiện theo checkbox Fireplace.

GIAI ĐOẠN 5: TÍNH TOÁN GIÁ & TRỌNG LƯỢNG
 Quản lý dữ liệu (State):

Tạo object currentConfig lưu trạng thái các module đang chọn.

Tạo biến basePrice = 24999.

 Hàm cập nhật:

Viết hàm updateQuote(): Cộng giá base + giá các module đã chọn -> Hiển thị ra màn hình HTML.

Viết hàm updateWeight(): Tương tự với trọng lượng (nếu có dữ liệu).