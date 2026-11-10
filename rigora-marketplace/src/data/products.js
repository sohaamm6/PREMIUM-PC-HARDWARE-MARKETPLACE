/**
 * Server-side product catalogue used for checkout totals.
 * The browser may display product data, but it cannot choose the amount charged.
 * Keep prices here synchronized with the frontend catalogue until products are
 * fully managed in MongoDB by an admin interface.
 */
module.exports = {
  "gpu-01": { name: "GeForce RTX 4070 SUPER 12GB", price: 58999 },
  "cpu-01": { name: "Ryzen 7 7800X3D Processor", price: 34999 },
  "ram-01": { name: "Vengeance RGB 32GB DDR5 Kit", price: 9999 },
  "ssd-01": { name: "990 PRO 1TB NVMe SSD", price: 8999 },
  "gpu-02": { name: "RTX 3060 Ti Dual Fan 8GB", price: 21999 },
  "cpu-02": { name: "Core i5-12400F Processor", price: 8999 },
  "mobo-01": { name: "B650M WiFi Motherboard", price: 15999 },
  "psu-01": { name: "750W 80+ Gold Modular PSU", price: 7999 },
  "gpu-03": { name: "Radeon RX 6700 XT 12GB", price: 19999 },
  "case-01": { name: "Airflow Mid-Tower Case", price: 6999 },
  "ram-02": { name: "16GB DDR4 Desktop Memory Kit", price: 1999 },
  "monitor-01": { name: "27-inch QHD 165Hz Monitor", price: 18999 }
};
