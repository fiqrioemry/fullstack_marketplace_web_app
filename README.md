cara menjalankan proyek :
via docker (rekomendasi) :
1. pastikan kamu udah download docker dekstop. Jalankan terlebih dahulu docker dekstop
2. Buat file `.env` di root folder server Anda dan isikan seperti dibawah.
3. Pastikan kamu sudah memiliki semua configurasi key yang diperlukan untuk third parties
4. jalankan docker-compose up --build
5. Jika sudah berhasil dan container berjalan akses via local di port yang sudah kamu definisikan di port 5000
6. pengujian bisa melalui postman
How to run this project : 
1. Install Docker Desktop terlebih dahulu jika belum tersedia di perangkatmu
→ https://www.docker.com/products/docker-desktop

2. Jalankan Docker Desktop hingga status-nya "Running".

3. Buat file .env di root folder proyek (di sebelah docker-compose.yml), lalu isi dengan konfigurasi contoh di paling bawah readme ini.

4. Jalankan perintah berikut untuk membangun dan menjalankan semua service (app, MySQL, Redis, dsb):
```
docker-compose up --build

```
5.  Tunggu sampai container berhasil berjalan. Jika berhasil, akses API di port local yang telah didefinisikan pada .env

6.  Gunakan Postman atau Curl untuk menguji endpoint-endpoint API.

🧭 Route yang Tersedia dan Penjelasannya
Berikut adalah daftar lengkap endpoint API yang tersedia dalam proyek ini, dikelompokkan berdasarkan fungsionalitas dan otorisasi akses.

🔐 Auth Routes (/api/auth)
Method	Endpoint	Deskripsi
POST	/api/auth/login	Login dengan email dan password
POST	/api/auth/send-otp	Mengirim OTP ke email
POST	/api/auth/register	Registrasi akun baru
POST	/api/auth/refresh	Memperbarui access token
POST	/api/auth/verify-otp	Verifikasi OTP pengguna
GET	/api/auth/me	Cek status autentikasi pengguna (login check)
POST	/api/auth/logout	Logout dan menghapus token
POST	/api/auth/create-store	Membuat toko baru untuk akun seller
GET	/api/auth/google	Inisialisasi login via Google OAuth
GET	/api/auth/google/callback	Callback dari Google OAuth
🛒 Cart Routes (/api/cart)
Method	Endpoint	Deskripsi
GET	/api/cart	Mendapatkan daftar item di keranjang
POST	/api/cart	Menambahkan produk ke keranjang
PUT	/api/cart/:cartId	Memperbarui jumlah item di keranjang
DELETE	/api/cart/:cartId	Menghapus item dari keranjang
📁 Category Routes (/api/category)
Method	Endpoint	Deskripsi
GET	/api/category	Mendapatkan semua kategori produk
POST	/api/category	Menambahkan kategori baru (admin only)
PUT	/api/category/:categoryId	Memperbarui data kategori (admin only)
DELETE	/api/category/:categoryId	Menghapus kategori produk (admin only)
🔔 Notification Routes (/api/notification)
Method	Endpoint	Deskripsi
POST	/api/notification	Membuat notifikasi pesanan
GET	/api/notification/customer	Melihat semua notifikasi untuk customer
GET	/api/notification/seller	Melihat semua notifikasi untuk seller
📦 Order & Transaction Routes
👤 Customer (/api/customer)
Method	Endpoint	Deskripsi
GET	/api/customer/transaction	Mendapatkan semua transaksi
POST	/api/customer/transaction	Membuat transaksi baru
PUT	/api/customer/transaction/:transactionId	Membatalkan transaksi
GET	/api/customer/transaction/:transactionId	Melihat detail transaksi tertentu
GET	/api/customer/order	Melihat semua pesanan customer
GET	/api/customer/order/:orderId	Melihat detail pesanan
GET	/api/customer/order/:orderId/shipment	Melihat informasi pengiriman pesanan
PUT	/api/customer/order/:orderId/cancel	Membatalkan pesanan
PUT	/api/customer/order/:orderId/confirm	Konfirmasi pesanan diterima oleh customer
🏪 Seller (/api/seller)
Method	Endpoint	Deskripsi
GET	/api/seller/order	Mendapatkan semua pesanan ke toko seller
GET	/api/seller/order/:orderId	Mendapatkan detail pesanan dari customer
PUT	/api/seller/order/:orderId/cancel	Seller membatalkan pesanan
PUT	/api/seller/order/:orderId/confirm	Seller mengonfirmasi pengiriman pesanan
🛍 Product Routes (/api/product)
Method	Endpoint	Deskripsi
GET	/api/product	Mendapatkan semua produk (filter & search)
GET	/api/product/:slug	Mendapatkan detail produk berdasarkan slug
GET	/api/product/store/:slug	Mendapatkan info toko dari produk tertentu
🏬 Store Routes (/api/store)
Method	Endpoint	Deskripsi
POST	/api/store/product	Menambahkan produk baru ke toko
GET	/api/store/summary	Mendapatkan ringkasan performa toko
GET	/api/store/profile	Melihat profil toko
PUT	/api/store/profile	Memperbarui profil toko
GET	/api/store/product	Melihat semua produk milik toko
PUT	/api/store/product/:productId	Memperbarui produk tertentu
DELETE	/api/store/product/:productId	Menghapus produk dari toko
👤 User Profile & Address Routes (/api/user)
Method	Endpoint	Deskripsi
GET	/api/user/profile	Melihat profil pengguna
PUT	/api/user/profile	Memperbarui data profil
GET	/api/user/address	Mendapatkan semua alamat pengguna
POST	/api/user/address	Menambahkan alamat baru
PUT	/api/user/address/:addressId	Memperbarui alamat pengguna
DELETE	/api/user/address/:addressId	Menghapus alamat tertentu
⚠️ Semua endpoint yang dilindungi menggunakan middleware autentikasi JWT, role-based access (customer/seller/admin), serta validasi API key untuk keamanan tambahan.

```env
# ======= Database Config =======
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_DATABASE=fullstack_marketplace_db
DB_HOST=127.0.0.1

# ======= Redis Config =======
REDIS_PORT=6379

# ======= App Settings =======
PORT=5001
NODE_ENV=development or later for production
CLIENT_URL=http://localhost:5173 or your domain www.domain.com

# ======= Token Config =======
REFRESH_TOKEN=your-refresh-token-secret
ACCESS_TOKEN=your-access-token-secret
API_KEY=your-api-key-for-secure-access

# ======= Midtrans Config =======
MIDTRANS_CLIENT_KEY=your-midtrans-client-key
MIDTRANS_SERVER_KEY=your-midtrans-server-key

# ======= Cloudinary Config =======
CLOUD_NAME=your-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret
CLOUD_FOLDER=your-cloudinary-folder-name

# ======= Nodemailer Config =======
USER_EMAIL=your-smtp-email
USER_PASSWORD=your-smtp-app-password

# ======= Google OAuth Config =======
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5001/api/auth/google/callback or use your domain -> https://www.domain.com/api/auth/google/callback
