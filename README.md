<div align="center">

# 🐾 VetDocHome

### Cloud-Based Veterinary Hospital Management System

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

A modern, responsive, cloud-based management system for veterinary clinics, animal hospitals, pet shops, and pet hotels — accessible from any device, anywhere, anytime.

</div>

---

## ✨ Overview

**VetDocHome** is a comprehensive SaaS veterinary management platform designed to streamline every aspect of clinic operations — from patient records and scheduling to billing, inventory, and reporting.

Built with a responsive-first approach, it runs seamlessly on **Desktop, Tablet, and Mobile** devices.

---

## 🚀 Key Features

### 🏥 Clinical & Patient Management (EHR)
- **Patient & Owner Profiles** — Smart onboarding with ID card reader integration
- **Allergy & Condition Tracking** — Records drug allergies and underlying conditions
- **Treatment Records** — Problem Solving Pattern methodology for standardized care
- **DICOM Imaging (PACS)** — X-ray and ultrasound image viewing and storage
- **Mobile Image Capture** — Snap and attach treatment images from a mobile device
- **Lab Results** — Record and trend lab values for continuous monitoring
- **PDF Document Storage** — Secure storage of lab results and treatment reports
- **Visual Treatment Planning** — Built-in drawing and annotation tool
- **Blood Bank Management** — Track donations and transfusions systematically
- **Vaccination Records** — Complete pet vaccination history

### 📅 Queue & Scheduling
- **Appointment Scheduling** — Advance booking with doctor schedule conflict prevention
- **Service Queue Management** — Real-time multi-department queue routing
- **Grooming Queue** — Dedicated grooming booking and capacity tracking
- **SMS & LINE OA Notifications** — Automated appointment reminders

### 🏨 Hospitalization & Grooming
- **Inpatient Management** — Daily care recording with time-slot-based scheduling
- **Grooming Management** — Booking and queue management for grooming services

### 💳 POS, Billing & Retail
- **Retail System** — Pet shop operations with barcode scanning and product search
- **Multiple Payment Methods** — Cash, credit cards, and bank transfers
- **Loyalty Points System** — Points accumulation and redemption for discounts
- **Membership System** — Tiered memberships with group and item-based discounts
- **Discount Engine** — Configurable pre-set discount formats

### 📦 Inventory Management
- **Stock Control** — Purchasing, receiving, and regular stock counting
- **Stock Ledger** — Granular movement tracking with complete stock card system
- **Multi-Branch Transfers** — Instant product and medication transfers between branches

### 🔐 Administration & Security
- **Role-Based Access Control (RBAC)** — Permission management by user group
- **Login Time Restrictions** — Prevent unauthorized off-hours access
- **Activity Monitoring** — Audit logs of user login history and actions
- **Multi-Branch Setup** — Configure hospital hours, branch details, and doctor shifts
- **Analytics Dashboard** — Real-time snapshot reports on clinical and financial performance

---

## 🏗️ System Architecture

```
VetDocHome/
├── animal-clinic-app/          # Next.js Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Dashboard
│   │   │   ├── patients/             # Patient Management
│   │   │   ├── appointments/         # Scheduling
│   │   │   ├── queue/                # Queue Management
│   │   │   ├── inventory/            # Inventory
│   │   │   ├── billing/              # Billing & POS
│   │   │   ├── reports/              # Analytics & Reports
│   │   │   └── settings/             # System Settings
│   │   ├── components/
│   │   │   ├── Sidebar.tsx           # Navigation
│   │   │   └── TopBar.tsx            # Header
│   │   └── lib/
│   │       └── data.ts               # Shared data & types
│   └── public/
├── Feature.md                  # Full feature specification
└── DesignDraft.md              # System design document
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | Radix UI (Dialog, Dropdown, Tabs) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Backend API** *(planned)* | Node.js (NestJS / Express) or Python (FastAPI) |
| **Database** *(planned)* | PostgreSQL + Redis |
| **File Storage** *(planned)* | Amazon S3 / Google Cloud Storage |
| **DICOM Viewer** *(planned)* | Cornerstone.js |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/ouimu/VetDocHome.git
cd VetDocHome

# Navigate to the app directory
cd animal-clinic-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📱 Target Environments

| Environment | Support |
|------------|---------|
| 🖥️ Veterinary Clinics | ✅ Full support |
| 🏥 Animal Hospitals | ✅ Full support |
| 🛁 Pet Hotels & Grooming | ✅ Full support |
| 🛒 Pet Shops (Retail) | ✅ Full support |
| 📱 Mobile Devices | ✅ Responsive design |
| 💊 Multi-Branch Chains | ✅ Supported |

---

## 📋 Roadmap

- [x] Dashboard UI
- [x] Patient Management Module
- [x] Appointment Scheduling Module
- [x] Queue Management Module
- [x] Inventory Management Module
- [x] Billing & POS Module
- [x] Reports & Analytics Module
- [x] System Settings
- [ ] Backend API (NestJS)
- [ ] PostgreSQL Database Integration
- [ ] DICOM Image Viewer
- [ ] SMS & LINE OA Notifications
- [ ] Multi-Branch Support
- [ ] Mobile App (React Native)

---

## 📄 Documentation

- [Feature Specification](Feature.md) — Full list of system features
- [System Design Draft](DesignDraft.md) — Architecture and module structure

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ for veterinary professionals

⭐ Star this project if you find it useful!

</div>
