# Veterinary Hospital Management System - Design Draft

This document outlines the proposed system architecture, module structure, and technical stack based on the requested features. Please review this draft before we proceed to database design or coding.

## 1. System Overview
*   **Platform:** Cloud-Based Web Application (SaaS model with Multi-Branch Support).
*   **Accessibility:** Responsive design (Desktop, Tablet, Mobile) supporting all devices natively.
*   **Target Environments:** Veterinary Clinics, Animal Hospitals, Pet Shops, and Pet Hotels.
*   **Data Strategy:** Scalable architecture for unlimited cloud data storage (images, documents, records).

## 2. Core Modules

### 2.1. CRM: Patient & Owner Management
*   **Owner Profiles:** Smart onboarding with ID card reader integration.
*   **Pet Profiles:** Comprehensive records including characteristics, allergy tracking, and underlying conditions.
*   **Loyalty & Membership:** Tiered memberships, group/item discounts, and reward point accumulation/redemption.
*   **Proactive Care:** Automated pet and owner reminders for continuous care (e.g., follow-ups, regular checkups).
*   **Vaccinations:** Dedicated pet vaccination history tracking.

### 2.2. Clinical & Treatment System (EHR)
*   **Treatment Records:** Problem Solving Pattern methodology for standardized, accurate veterinarian records.
*   **Diagnostic Imaging (PACS):** Integrated DICOM image support (X-rays, ultrasounds) with historical tracking.
*   **Mobile Image Capture:** Capabilities to snap and attach treatment images directly to patient records from a mobile device.
*   **Laboratory Integration:** Record and trend lab results/values.
*   **Document Management:** Secure PDF storage and retrieval for external lab results and treatment reports.
*   **Visual Treatment Planning:** Built-in drawing and annotation tool for precise treatment planning directly on images or templates.
*   **Blood Bank:** Systematic recording of blood donations and transfusions.

### 2.3. Hospitalization (Inpatient) & Grooming
*   **Hospitalization Management:** Management of daily inpatient care utilizing scheduled time slots for systematic handovers.
*   **Grooming Management:** Dedicated capacity tracking, booking, and queue management for grooming services.

### 2.4. Queue & Scheduling System
*   **Scheduling:** Advance booking system with doctor schedule validation to entirely prevent overlaps.
*   **Service Queue:** Real-time, multi-department queue routing to reduce congestion.
*   **Automated Notifications:** SMS and LINE Official Account (OA) integrations for system-generated appointment reminders.

### 2.5. POS, Billing & Retail
*   **Retail System:** Seamless pet-shop retail operations with barcode scanning and rapid product search.
*   **Payment Gateway System:** Support for versatile payment methods (Cash, Credit Cards, Bank Transfers).
*   **Discounting Engine:** Highly configurable pre-set discount formats.

### 2.6. Inventory Management System
*   **Core Stock Control:** Purchasing, receiving, and regular stock counting.
*   **Stock Ledger:** Granular stock movement tracking utilizing a complete stock card system.
*   **Multi-Branch Transfer:** Instant product and medication transfers between branches or hospital departments.

### 2.7. Administration, Security & Analytics
*   **Hospital Setup:** Granular configuration of operational hours, branch details, addresses, and doctor shifts.
*   **Access Control (RBAC):** Tight permission definitions via distinct user groups.
*   **Security Restrictions:** Implementation of individual login time restrictions to prevent unauthorized off-hours access.
*   **Activity Monitoring:** Detailed audit logs of user login history and actions for administrator oversight.
*   **Dashboards:** Real-time statistical snapshot reports regarding clinical, financial, and operational performance.

## 3. Proposed Technical Stack
*   **Frontend End-User Interface:** React.js / Next.js / Tailwind CSS (Responsive and highly interactive).
*   **Backend API Services:** Node.js (NestJS or Express) or Python (FastAPI).
*   **Database Systems:** PostgreSQL (Primary transactional data) + Redis (Temporary queue state).
*   **File & Image Storage:** Amazon S3 / Google Cloud Storage.
*   **Medical Imaging Viewer:** Cornerstone.js (Web-based DICOM viewing logic).

## 4. Next Steps for Review
1.  **Module Adjustments:** Are there any additional features missing from the modules above?
2.  **Data Structure:** Once the features are approved, we can begin drafting the Database Entity-Relationship (ER) models.
3.  **UI/UX Views:** Then we can generate placeholder mockups for key screens (such as the main Dashboard, POS, and the Vet EHR Screen).
