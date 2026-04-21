// Mock data for the entire application

export const stats = [
  { label: "Today's Appointments", value: 24, change: "+3", trend: "up", color: "teal" },
  { label: "Active Queue", value: 8, change: "-2", trend: "down", color: "blue" },
  { label: "Inpatients", value: 3, change: "0", trend: "neutral", color: "yellow" },
  { label: "Revenue Today", value: "฿18,450", change: "+12%", trend: "up", color: "green" },
];

export const appointments = [
  { id: 1, pet: "Mochi", species: "Dog", breed: "Shih Tzu", owner: "Somchai P.", time: "09:00", doctor: "Dr. Araya", status: "confirmed", type: "Checkup", avatar: "🐶" },
  { id: 2, pet: "Luna", species: "Cat", breed: "Persian", owner: "Wanida K.", time: "09:30", doctor: "Dr. Thanat", status: "confirmed", type: "Vaccination", avatar: "🐱" },
  { id: 3, pet: "Max", species: "Dog", breed: "Golden Retriever", owner: "Krisana T.", time: "10:00", doctor: "Dr. Araya", status: "pending", type: "Surgery", avatar: "🐶" },
  { id: 4, pet: "Coco", species: "Rabbit", breed: "Holland Lop", owner: "Pimchanok S.", time: "10:30", doctor: "Dr. Thanat", status: "confirmed", type: "Grooming", avatar: "🐰" },
  { id: 5, pet: "Bella", species: "Cat", breed: "Siamese", owner: "Natchaya W.", time: "11:00", doctor: "Dr. Araya", status: "cancelled", type: "Lab Results", avatar: "🐱" },
  { id: 6, pet: "Rocky", species: "Dog", breed: "Pomeranian", owner: "Tanawat B.", time: "11:30", doctor: "Dr. Patcha", status: "confirmed", type: "X-ray", avatar: "🐶" },
  { id: 7, pet: "Nemo", species: "Fish", breed: "Clownfish", owner: "Siriwan A.", time: "13:00", doctor: "Dr. Patcha", status: "pending", type: "Checkup", avatar: "🐟" },
  { id: 8, pet: "Daisy", species: "Dog", breed: "Beagle", owner: "Monthon C.", time: "14:00", doctor: "Dr. Araya", status: "confirmed", type: "Dentistry", avatar: "🐶" },
];

export const queue = [
  { id: 1, number: "A001", pet: "Mochi", owner: "Somchai P.", type: "Checkup", waitTime: "5 min", status: "in-progress", doctor: "Dr. Araya", avatar: "🐶" },
  { id: 2, number: "A002", pet: "Luna", owner: "Wanida K.", type: "Vaccination", waitTime: "20 min", status: "waiting", doctor: "Dr. Thanat", avatar: "🐱" },
  { id: 3, number: "A003", pet: "Coco", owner: "Pimchanok S.", type: "Grooming", waitTime: "35 min", status: "waiting", doctor: "Dr. Thanat", avatar: "🐰" },
  { id: 4, number: "A004", pet: "Rocky", owner: "Tanawat B.", type: "X-ray", waitTime: "50 min", status: "waiting", doctor: "Dr. Patcha", avatar: "🐶" },
  { id: 5, number: "A005", pet: "Daisy", owner: "Monthon C.", type: "Dentistry", waitTime: "65 min", status: "waiting", doctor: "Dr. Araya", avatar: "🐶" },
  { id: 6, number: "B001", pet: "Max", owner: "Krisana T.", type: "Surgery Consult", waitTime: "Scheduled 10:00", status: "scheduled", doctor: "Dr. Araya", avatar: "🐶" },
];

export const patients = [
  { id: 1, name: "Mochi", species: "Dog", breed: "Shih Tzu", age: "3 yrs", weight: "5.2 kg", owner: "Somchai Phongsakul", phone: "081-234-5678", lastVisit: "2026-04-15", allergies: ["Penicillin"], status: "active", avatar: "🐶", hn: "HN-2024-001" },
  { id: 2, name: "Luna", species: "Cat", breed: "Persian", age: "2 yrs", weight: "3.8 kg", owner: "Wanida Kaewmanee", phone: "089-876-5432", lastVisit: "2026-04-18", allergies: [], status: "active", avatar: "🐱", hn: "HN-2024-002" },
  { id: 3, name: "Max", species: "Dog", breed: "Golden Retriever", age: "5 yrs", weight: "28.5 kg", owner: "Krisana Thammasit", phone: "062-111-2222", lastVisit: "2026-04-10", allergies: ["Aspirin", "NSAIDs"], status: "inpatient", avatar: "🐶", hn: "HN-2023-088" },
  { id: 4, name: "Coco", species: "Rabbit", breed: "Holland Lop", age: "1 yr", weight: "1.8 kg", owner: "Pimchanok Suwan", phone: "095-333-4444", lastVisit: "2026-03-20", allergies: [], status: "active", avatar: "🐰", hn: "HN-2025-015" },
  { id: 5, name: "Bella", species: "Cat", breed: "Siamese", age: "4 yrs", weight: "4.1 kg", owner: "Natchaya Wongpan", phone: "083-555-6666", lastVisit: "2026-04-01", allergies: ["Ketamine"], status: "active", avatar: "🐱", hn: "HN-2022-045" },
  { id: 6, name: "Rocky", species: "Dog", breed: "Pomeranian", age: "6 yrs", weight: "3.5 kg", owner: "Tanawat Burin", phone: "088-777-8888", lastVisit: "2026-04-20", allergies: [], status: "active", avatar: "🐶", hn: "HN-2020-133" },
];

export const inventory = [
  { id: 1, name: "Amoxicillin 250mg", category: "Antibiotics", stock: 150, unit: "tabs", minStock: 50, price: 12, status: "ok", sku: "MED-001" },
  { id: 2, name: "Dexamethasone Injection", category: "Steroids", stock: 22, unit: "vials", minStock: 30, price: 85, status: "low", sku: "MED-002" },
  { id: 3, name: "Rabies Vaccine", category: "Vaccines", stock: 48, unit: "doses", minStock: 20, price: 250, status: "ok", sku: "VAC-001" },
  { id: 4, name: "IV Fluid (NaCl 0.9%)", category: "Fluids", stock: 5, unit: "bags", minStock: 20, price: 75, status: "critical", sku: "FLU-003" },
  { id: 5, name: "Elizabethan Collar (M)", category: "Supplies", stock: 35, unit: "pcs", minStock: 10, price: 120, status: "ok", sku: "SUP-010" },
  { id: 6, name: "Dog Shampoo (Medicated)", category: "Grooming", stock: 18, unit: "bottles", minStock: 15, price: 180, status: "ok", sku: "GRM-004" },
  { id: 7, name: "Ketamine 10%", category: "Anesthetics", stock: 8, unit: "vials", minStock: 10, price: 320, status: "low", sku: "MED-015" },
  { id: 8, name: "Meloxicam 1.5mg/ml", category: "NSAIDs", stock: 60, unit: "ml", minStock: 30, price: 95, status: "ok", sku: "MED-022" },
];

export const billingRecords = [
  { id: 1, invoiceNo: "INV-2026-0421", pet: "Mochi", owner: "Somchai P.", services: ["Checkup", "Vaccination"], total: 850, status: "paid", date: "2026-04-21", payMethod: "Cash" },
  { id: 2, invoiceNo: "INV-2026-0420", pet: "Luna", owner: "Wanida K.", services: ["Grooming", "Medication"], total: 1200, status: "paid", date: "2026-04-20", payMethod: "Credit Card" },
  { id: 3, invoiceNo: "INV-2026-0419", pet: "Max", owner: "Krisana T.", services: ["Surgery", "Hospitalization (3d)"], total: 12500, status: "pending", date: "2026-04-19", payMethod: "-" },
  { id: 4, invoiceNo: "INV-2026-0418", pet: "Rocky", owner: "Tanawat B.", services: ["X-ray", "Checkup", "Medication"], total: 2400, status: "paid", date: "2026-04-18", payMethod: "Transfer" },
  { id: 5, invoiceNo: "INV-2026-0417", pet: "Bella", owner: "Natchaya W.", services: ["Lab Test"], total: 650, status: "paid", date: "2026-04-17", payMethod: "Cash" },
];

export const doctors = [
  { id: 1, name: "Dr. Araya Sombat", specialty: "General Practice", schedule: "Mon-Fri 08:00-17:00", status: "on-duty" },
  { id: 2, name: "Dr. Thanat Wichai", specialty: "Internal Medicine", schedule: "Mon-Wed-Fri 08:00-17:00", status: "on-duty" },
  { id: 3, name: "Dr. Patcha Rungrot", specialty: "Surgery", schedule: "Tue-Thu 09:00-18:00", status: "off-duty" },
];

export const revenueData = [
  { day: "Mon", revenue: 12400 },
  { day: "Tue", revenue: 15800 },
  { day: "Wed", revenue: 9200 },
  { day: "Thu", revenue: 18600 },
  { day: "Fri", revenue: 21000 },
  { day: "Sat", revenue: 16500 },
  { day: "Sun", revenue: 8900 },
];

export const appointmentTypeData = [
  { name: "Checkup", value: 35 },
  { name: "Vaccination", value: 20 },
  { name: "Surgery", value: 10 },
  { name: "Grooming", value: 18 },
  { name: "Lab/X-ray", value: 17 },
];
