# Gemini AI

Gemini AI adalah sebuah proyek yang menggunakan teknologi kecerdasan buatan (AI) untuk membantu pengguna dalam melakukan tugas-tugas tertentu.

## Fitur

* Menggunakan Google Generative AI untuk memproses input pengguna
* Mendukung berbagai fungsi, seperti:
  + Menambahkan penghasilan
  + Menambahkan pengeluaran
  + Mendapatkan transaksi pada hari tertentu
  + Mendapatkan waktu saat ini
* Menggunakan MongoDB sebagai database untuk menyimpan data

## Cara Menggunakan

### 1. Clone Repo

Clone repo ini ke komputer Anda dengan menjalankan perintah berikut:
```bash
git clone https://github.com/your-username/your-repo-name.git
```

### 2. Install Dependencies
Install dependencies dengan menjalankan perintah berikut
```bash
npm install
```

### 3. Buat File .env
Buat file .env dengan isi berikut:
```bash
GEMINI_API_KEY=YOUR_API_KEY
MONGO_URI=YOUR_MONGO_URI
```

### 4. Jalankan Aplikasi
Jalankan aplikasi dengan menjalankan perintah berikut:
```bash
node index.js
```


Fungsi

* addIncome
Menambahkan penghasilan baru.

* addExpense
Menambahkan pengeluaran baru.

* getTransaction
Mendapatkan transaksi pada hari tertentu.

* getTime
Mendapatkan waktu saat ini.