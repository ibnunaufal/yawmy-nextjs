/**
 * let mutabaahData = {
  qiyaamul_lail: false,
  qiyaamul_lail_rakaat: 0,
  subuh: false,
  subuh_rawatib: true,
  subuh_jamaah: false,
  dhuha: false,
  dhuha_rakaat: 0,
  dhuhur: false,
  dhuhur_rawatib: false,
  dhuhur_jamaah: false,
  ashar: false,
  ashar_rawatib: false,
  ashar_jamaah: false,
  magrib: false,
  magrib_rawatib: false,
  magrib_jamaah: false,
  isya: false,
  isya_rawatib: false,
  isya_jamaah: false,
  tarawih: false,
  infaq: false,
  infaq_amount: 0,
  tilawah: false,
  tilawah_pages: 0,
  puasa: false,
  dzikir_pagi: false,
  dzikir_petang: false,
  finish_mutabaah: false,
};
 */
export function getKeyName(key) {
  const keyName = {
    qiyaamul_lail: "Qiyaamul Lail",
    qiyaamul_lail_rakaat: "Rakaat Qiyaamul Lail",
    subuh: "Solat Subuh",
    subuh_rawatib: "Solat Rawatib Subuh",
    subuh_jamaah: "Solat Jamaah Subuh",
    dhuha: "Solat Dhuha",
    dhuha_rakaat: "Rakaat Solat Dhuha",
    dhuhur: "Solat Dhuhur",
    dhuhur_rawatib: "Solat Rawatib Dhuhur",
    dhuhur_jamaah: "Solat Jamaah Dhuhur",
    ashar: "Solat Ashar",
    ashar_rawatib: "Solat Rawatib Ashar",
    ashar_jamaah: "Solat Jamaah Ashar",
    magrib: "Solat Magrib",
    magrib_rawatib: "Solat Rawatib Magrib",
    magrib_jamaah: "Solat Jamaah Magrib",
    isya: "Solat Isya",
    isya_rawatib: "Solat Rawatib Isya",
    isya_jamaah: "Solat Jamaah Isya",
    tarawih: "Solat Tarawih",
    infaq: "Infaq",
    infaq_amount: "Jumlah Infaq",
    tilawah: "Tilawah",
    tilawah_pages: "Jumlah Halaman Tilawah",
    puasa: "Puasa",
    dzikir_pagi: "Dzikir Pagi",
    dzikir_petang: "Dzikir Petang",
    finish_mutabaah: "Selesai Mutabaah"
}
return keyName[key]
}