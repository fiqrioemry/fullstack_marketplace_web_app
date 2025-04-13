## 🛠️ Environment Configuration (.env)

Buat file `.env` di root folder server Anda dan isikan seperti berikut ini:

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
