"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [resetSent, setResetSent] = useState(false);
const router = useRouter();

const login = async () => {
try {
await signInWithEmailAndPassword(auth, email, password);
router.push("/app/display-submissions");
} catch (error: any) {
alert("Login failed: " + error.message);
}
};

const handlePasswordReset = async () => {
if (!email) {
alert("Please enter your email address first.");
return;
}

try {
  await sendPasswordResetEmail(auth, email);
  setResetSent(true);
} catch (error: any) {
  alert("Error sending reset email: " + error.message);
}
};

return (
<div className="flex items-center justify-center h-screen bg-gray-100">
<div className="bg-white shadow-md rounded p-8 w-full max-w-sm space-y-4">
<h1 className="text-2xl font-bold text-center">Admin Login</h1>

    <input
      className="w-full border p-2 rounded"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      className="w-full border p-2 rounded"
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      className="w-full bg-blue-600 text-white p-2 rounded"
      onClick={login}
    >
      Login
    </button>

    <button
      className="text-sm text-blue-600 hover:underline mt-2"
      onClick={handlePasswordReset}
    >
      Forgot Password?
    </button>

    {resetSent && (
      <p className="text-sm text-green-600 text-center">
        ✅ Reset email sent. Check your inbox!
      </p>
    )}
  </div>
</div>
);
}