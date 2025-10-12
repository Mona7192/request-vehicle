#  Pishgaman Ride Request Test

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

---
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
# نصب وابستگی‌ها
npm install

# اجرای پروژه در محیط توسعه
npm run dev
