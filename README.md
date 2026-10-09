# Jamnagar Civic Care (JMC) - Official Citizen Portal

**Jamnagar Civic Care** is a citizen grievance redressal, civic utility services, and municipal administration web application built for the **Jamnagar Municipal Corporation (JMC / જામનગર મહાનગર સેવા સદન)**, Government of Gujarat.

---

## 🌟 Key Features & Civic Modules

### 1. 🔐 Role-Based Authentication & Account Creation (NEW)
- **Unified Authentication Modal**:
  - **Citizen Login**: Sign in using registered 10-digit mobile number or email and password.
  - **Create Account (Citizen Registration)**: Full name, mobile number, email, Ward selection (1 to 16), residential address in Jamnagar, and password.
  - **Admin / Officer Login**: Secure authentication for Ward Officers, Assistant Engineers, and Control Room Administrators.
- **Login Requirements**:
  - **Filing Grievances**: Guests must sign in or create an account before submitting a complaint. Authenticated citizens enjoy auto-filled profiles (Name, Phone, Ward, Address).
  - **My Grievances**: Only logged-in citizens can access their personal redressal history.
  - **Staff Portal**: Restricted to verified administrators and officers (`pruthvi77@gmail.com`). Citizens cannot access the staff portal.
- **1-Click Demo Logins**:
  - **Demo Citizen**: Ramesh Patel (`9825012345` / `citizen123`, Ward 4)
  - **Admin / Officer**: Pruthvi (`pruthvi77@gmail.com` / `pruthvi@123`, Central Desk)
- **Header Profile Badges**: Real-time avatar pill with user name, role, ward jurisdiction, and instant sign-out.

### 2. 🏛️ Official Government Identity & Branding
- Authentic Jamnagar Municipal Corporation emblem, municipal crest motif, and official Gujarat government styling.
- Government Tricolor ribbon strip (`#FF9933` | `#FFFFFF` | `#138808`).
- Deep Navy (`#0F2850`), Saffron (`#D97706`), and Emerald (`#15803D`) color palette.
- Accessible UI: **Font Resizing (`A-`, `A`, `A+`)**, **High Contrast Mode toggle**, and **Bilingual support (English & ગુજરાતી)**.

### 3. 📝 Interactive Grievance Redressal (ફરિયાદ નિવારણ)
- **8 Dedicated Civic Departments**:
  - 💧 **Water Supply** (Pipeline bursts, low pressure, contamination, valve repair)
  - 💡 **Street Lighting** (Defective LED fittings, dark spots, dangling wires)
  - 🗑️ **Solid Waste & Sanitation** (Door-to-door tipping vans, community bins, street sweeping)
  - 🚰 **Drainage & Sewerage** (Choked sewer lines, broken manholes, storm drains)
  - 🛣️ **Roads & Civil Works** (Pothole repairs, speed breakers, caved-in surfaces)
  - 🏥 **Public Health & Vector Control** (Mosquito fogging, insecticide spraying, stray cattle)
  - 🌳 **Gardens & Tree Trimming** (Overhanging branches, Lakhota park maintenance)
  - 📄 **Civic Certificates & Tax** (Birth/death certificate status, property tax queries)
- **Location Pinpointing**: Simulated GPS Auto-Detection with realistic Jamnagar landmark coordinates.
- **Photo Upload**: Supports live photo attachment preview (via `FileReader`) with immediate thumbnail display.
- **Official Acknowledgement Slip**: Instant printable slip with unique reference ID (e.g. `JMC-2026-W04-1082`) and QR code branding.

### 4. 🔍 Real-Time Grievance Tracker (લાઈવ ટ્રેકિંગ)
- Search any ticket reference ID to see current status, assigned field engineer, and department SLA.
- Multi-stage visual timeline: **Complaint Registered ➔ Assigned to Ward Cell ➔ On-site Field Resolution ➔ Verification & Citizen Closure**.
- **Interactive Escalation**: Citizens can escalate delayed tickets directly to the Municipal Commissioner's office.
- **Citizen Satisfaction Rating**: Rate resolved tickets from 1 to 5 stars with custom feedback.

### 5. 📋 My Grievances History (Authenticated)
- Personalized tracking of complaints submitted by the logged-in citizen.
- Real-time status indicators (Assigned, In Progress, Resolved).
- 1-click shortcut to track or re-print acknowledgement slips.

### 6. 💧 Jamnagar Ward Water Supply Timetable
- Daily water distribution schedule across all 16 municipal wards.
- Shows morning and evening supply windows, source reservoir (Ranjit Sagar Dam, Sasoi Dam, Narmada Canal Grid), water pressure status, and Ward Water Inspector contact numbers.

### 7. 💰 Property Tax Assessment & e-Receipt Calculator
- Self-assessment calculator based on property category (Residential, Commercial, Industrial, Open Plot), carpet area, building age, and occupancy.
- Calculates General Tax, Conservancy Tax, and Water & Drainage charges.
- Applies the **10% Early Bird Rebate** for Financial Year 2026-27.
- **Simulate Online Payment**: Generates an official, printable **JMC Property Tax Payment Receipt** with Tenement Number and Transaction ID.

### 8. 🗺️ 16 Administrative Wards Directory
- Searchable directory covering Jamnagar's 16 municipal wards (Patel Colony, Digvijay Plot, Bedi, Gulabnagar, Lal Bungalow, Ranjit Sagar Road, Hapa, Vibhapar, etc.).
- Complete list of Ward Corporators, Ward Engineers, and Ward Civic Center addresses.

### 9. 🏢 JMC Staff / Ward Officer Control Room Portal (Admin Only)
- Dedicated mode for municipal engineers and control room staff.
- Filter tickets by Ward (1 to 16), Department, and Resolution Status.
- **Update Ticket Stage**: Change status to *Work In Progress* or *Resolved*, append field log remarks, and notify citizens.

### 10. 🚨 24x7 Helplines & Emergency Desk
- JMC Toll-Free Civic Desk: `1800-233-0131`
- Disaster & Flood Control Room: `0288-2550231`
- Fire & Rescue: `101 / 0288-2550101`
- Medical Emergency: `108`

---

## 🔑 Login Credentials

| Role | Email / Mobile | Password | Notes |
| :--- | :--- | :--- | :--- |
| **Admin / Municipal Officer** | `pruthvi77@gmail.com` | `pruthvi@123` | Full access to JMC Staff Portal & Ward Ticket Controls |
| **Citizen (Demo)** | `9825012345` | `citizen123` | Pre-configured citizen profile (Ramesh Patel, Ward 4) |
| **New Citizen** | Any 10-digit mobile | *Your chosen password* | Created via "Create Account" tab |

---

## 🚀 How to Run the Website

Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Brave):
- Double click on [index.html](file:///c:/Users/DELL/Desktop/jamnagar%20app/index.html)
- Or right-click and choose **Open with > Google Chrome** / **Microsoft Edge**.

---

## 📁 File Structure

- [`index.html`](file:///c:/Users/DELL/Desktop/jamnagar%20app/index.html) - Complete single-page civic application layout with authentication modal, Tailwind CSS, and Lucide icons.
- [`style.css`](file:///c:/Users/DELL/Desktop/jamnagar%20app/style.css) - Government styling, auth tab active states, accessibility font controls, high-contrast mode, and print templates.
- [`app.js`](file:///c:/Users/DELL/Desktop/jamnagar%20app/app.js) - Authentication engine (Citizen & Admin), login requirement guards, local storage user persistence, grievance lifecycle, water schedule, and tax calculator.
- [`README.md`](file:///c:/Users/DELL/Desktop/jamnagar%20app/README.md) - Project documentation and user guide.
