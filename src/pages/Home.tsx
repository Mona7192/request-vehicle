//src/Home.tsx
import RideRequestForm from "../components/RideRequestForm";

export default function HomePage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/*Map and Form */}
      <RideRequestForm />
    </div>
  );
}
