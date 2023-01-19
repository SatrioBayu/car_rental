
# Car Rental PT. Tambang Freeport

## Overview

Aplikasi peminjaman mobil untuk sebuah perusahaan. 
User dibagi menjadi 2 yakni Admin dan Pihak Penyetuju.
Admin dapat menginput pemesanan/peminjaman kendaraan.
Penyetuju dapat menyetujui atau menolak ajuan pemesanan/peminjaman.




## Features

- Login dipisahkan untuk Admin dan Pihak Penyetuju
- Encryption untuk password
- Beberapa interaksi menerapkan penggunaan token (JWT)
- Peminjaman/Pemesanan kendaraan
- Dashboard
- Grafik
- Export Data to CSV
- Responsive Design


## Link Website

Currently not hosted yet due Heroku Policy Change
## Tech Stack

**Client:** React JS (18.2.0), Recharts (2.3.2), React CSV (2.2.2), Bootstrap (5.1)

**Server:** Node JS (16.14.0), Express (4.18.2), Sequelize (6.28), PostgreSQL (8.8), Bcryptjs (2.4.3), JWT (9.0)


## Database Relation Model

![App Screenshot](https://res.cloudinary.com/dgr7ck0sl/image/upload/v1674127818/Screenshot_2023-01-19_182740_jletbx.png)


# Penggunaan

## Prerequisite

    1. Pastikan perangkat sudah terinstall Node JS
    2. Clone repository ini

## Running the Server
    1. Masuk kedalam folder backend
    2. Jalankan npm i / npm install
    3. Buat file .env
    4. Isi file .env sesuai dengan petunjuk dibawah
    5. Pada file database.js di folder config, sesuaikan "dialect" dengan jenis database yang digunakan. Contoh: "postgres" untuk PostgreSQL
    6. Jalankan "sequelize db:migrate"
    7. Jalankan "sequelize db:seed:all"
    8. Untuk menjalankan server ketik "npm run start:dev"

### .env
    1. PORT = Isi port untuk menjalankan server
    2. DB_USER = Sesuaikan dengan database
    3. DB_PASSWORD = Sesuaikan dengan database
    4. DB_NAME = Sesuaikan dengan database
    5. DB_HOST = "127.0.0.1"
    6. DB_PORT = Sesuaikan dengan database
    7. JWT_SECRET = isi bebas

## Running the Client
    1. Masuk kedalam folder frontend
    2. Jalankan npm i / npm install
    3. Untuk menjalankan client ketik "npm start"

## Penggunaan Fitur Aplikasi
    1. Ketika sudah menjalankan client maka langsung dihadapkan pada halaman login admin
    2. Untuk login penyetuju bisa mengklik tautan dibawah tombol login
    3. Setelah login maka akan menuju halaman dashboard yang berisikan grafik sederhana terkait penggunaan kendaraan
    4. Untuk melihat list kendaraan / pemesanan bisa melakukan klik pada sidebar
    5. Pada list kendaraan bisa melihat detail dari kendaraan dan akan ditampilkan informasi mengenai kendaraan tersebut
    6. Pada pemesanan, untuk menambahkan peminjaman bisa melakukan klik pada tombol tambah peminjaman
    7. Akan muncul form dalam bentuk modal yang harus diisi.
    8. Hanya ADMIN yang bisa menambahkan peminjaman. Apabila login sebagai penyetuju maka ketika menambahkan akan ditampilkan pesan error
    9. Setelah menambahkan maka halaman akan terefresh dan data akan terupdate.
    10. Penyetuju bisa menyetujui / menolak peminjaman dengan mengklik tombol setuju / tolak.
    11. ADMIN tidak bisa menyetujui peminjaman
    12. Logout bisa dengan menekan tombol logout pada sidebar
