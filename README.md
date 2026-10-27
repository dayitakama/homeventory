# Rumahku — Inventaris Rumah

Aplikasi web (PWA) untuk mencatat barang di rumah beserta lokasi penyimpanannya.
Data tersimpan di iPhone dan bisa dibackup ke Google Drive.

## Isi folder
| File | Fungsi |
|---|---|
| index.html | Seluruh aplikasi (tampilan + logika) |
| manifest.webmanifest | Info aplikasi untuk Home Screen |
| sw.js | Membuat aplikasi tetap bisa dibuka tanpa internet |
| icon-180/192/512.png | Ikon aplikasi |

## Ringkasan pemasangan
1. Upload semua file ke repository GitHub, aktifkan GitHub Pages.
2. Buat OAuth Client ID (Web application) di Google Cloud Console, aktifkan Google Drive API,
   daftarkan origin `https://USERNAME.github.io` dan redirect URI `https://USERNAME.github.io/rumahku/`.
3. Buka alamat aplikasi di Safari iPhone → Bagikan → Tambahkan ke Layar Utama.
4. Buka aplikasi dari ikon → Pengaturan → tempel Client ID → Hubungkan Google Drive.

Panduan lengkap langkah demi langkah ada di dokumen panduan terpisah.

## Catatan teknis
- Penyimpanan lokal: IndexedDB. Foto dikecilkan ke maks. 1000 px (JPEG 75%).
- Backup: satu file `rumahku-backup.json` di Google Drive, upload resumable.
- Izin Google: hanya `drive.file` (aplikasi cuma bisa melihat file yang dibuatnya sendiri).
- Setelah mengubah file, naikkan versi `CACHE` di `sw.js` agar iPhone mengambil versi baru.
