# Pishgaman Ride Request Test

---

## English Version

### Overview
This project is built as a technical assessment for the **Frontend Developer** position.  
Users can log in, select pickup and drop-off locations on the map, choose a vehicle type, and send a ride request.

### Features
- User authentication (login)
- Select pickup and drop-off points on the map
- Vehicle type selection
- Send ride request
- Responsive design for desktop and mobile

### Technologies
- **React 18 + TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Query**
- **Context API** (for authentication)
- **Leaflet** (map)

### Project Structure

src/
 ┣ components/      # UI components like MapPicker, VehicleSelector
 ┣ hooks/           # React Query hooks for API calls
 ┣ api/             # Axios files for server communication
 ┣ context/         # AuthContext for token management
 ┣ pages/           # Login and Home pages
 ┣ types/           # TypeScript types
 ┗ main.tsx, App.tsx

 ## Code Quality
- ESLint + Prettier integrated  
- Lint command: `npm run lint`  
- Format command: `npm run format`  
- Automatically formats code on save via VSCode settings

### Installation & Running

```bash

# Clone the repository
git clone https://github.com/Mona7192/request-vehicle.git
cd request-vehicle

# Install dependencies
npm install

# Start development server
npm run dev
```

#  Pishgaman Ride Request Test Farsi
این پروژه برای ارزیابی فنی موقعیت Frontend Developer ساخته شده است.
کاربر می‌تواند با ورود به سیستم، مبدا و مقصد خود را روی نقشه انتخاب کند، نوع خودرو را جستجو و انتخاب کند، و درخواست سفر ارسال نماید.

---

##  تکنولوژی‌ها

- **React 18 + TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Query**
- **Context API (برای احراز هویت)**
- **Leaflet (نقشه)**

# ویژگی‌ها

- ورود و ثبت‌نام کاربر

- انتخاب مبدا و مقصد روی نقشه

- انتخاب نوع خودرو

- ارسال درخواست سفر

- طراحی واکنش‌گرا برای دسکتاپ و موبایل

---
# ساختار پروژه
src/
 ┣ components/      # اجزای UI مثل MapPicker, VehicleSelector
 ┣ hooks/           # هوک‌های React Query برای APIها
 ┣ api/             # فایل‌های ارتباط با سرور (axios)
 ┣ context/         # AuthContext برای مدیریت توکن
 ┣ pages/           # صفحات Login و Home
 ┣ types/           # تایپ‌های TypeScript
 ┗ main.tsx, App.tsx

 
 ---

 ## Code Quality
- ESLint + Prettier integrated  
- Lint command: `npm run lint`  
- Format command: `npm run format`  
- Automatically formats code on save via VSCode settings
 

## نصب و راه‌اندازی

```bash

 # github Repository

  https://github.com/Mona7192/request-vehicle.git

# نصب وابستگی‌ها
npm install

# اجرای پروژه در محیط توسعه
npm run dev
