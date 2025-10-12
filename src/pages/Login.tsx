import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserToken } = useAuth();
  const navigate = useNavigate();

  const { mutate: handleLogin, isLoading, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(
      { username, password },
      {
        onSuccess: (res) => {
          if (res.status === 1 && res.data?.userToken) {
            setUserToken(res.data.userToken);
            // 🔹 فقط پیام ساده‌ی موفقیت
            alert("✅ ورود موفق بود!");
            navigate("/home");
          } else {
            alert(res.message || "ورود ناموفق ❌");
          }
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-1/4 flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">ورود</h2>

        <p className="text-gray-500 text-sm pb-1">نام کاربری</p>
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full border rounded-4xl p-3 mb-4 text-black 
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition
            ${username ? "bg-blue-50 border-blue-100" : "border-blue-300"}`}
          required
        />

        <p className="text-gray-500 text-sm pb-1">کلمه عبور</p>
        <input
          type="password"
          placeholder="کلمه عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full border rounded-4xl p-3 mb-4 text-black 
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition
            ${username ? "bg-blue-50 border-blue-100" : "border-blue-300"}`}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold rounded-4xl py-3 transition-all"
        >
          {isLoading ? "در حال ورود..." : "ورود"}
        </button>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error.message}</p>}
      </form>
    </div>
  );
}
