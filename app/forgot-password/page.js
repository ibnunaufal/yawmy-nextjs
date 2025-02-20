"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, app } from "@/utils/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const db = getFirestore(app);

  const sendPasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, username);
      toast("Password reset email sent", "success");
    } catch (error) {
      toast(error.message, "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="p-6 min-w-[300px] bg-bg">
        <iframe
          className="mt-3"
          src="https://lottie.host/embed/adbec3f6-147c-45df-a800-c273bbf83def/qA0YvSLThJ.lottie"
        ></iframe>
        <span className=" flex justify-center caprasimo text-4xl mb-5">
          yawmy
        </span>
        <div className=" justify-between">
          <h1 className="text-xl font-bold">Lupa Password</h1>
          <span
            className=" text-sm "
          >
            Kami akan mengirim email berisi url untuk melakukan reset password.
          </span>
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email anda"
            className="mt-4"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div>
            <Button className="mt-3 w-full" onClick={sendPasswordReset}>
              Kirim Email Reset Password
            </Button>
          </div>
          
          <div className=" my-3 flex flex-col">
            <span className=" text-sm">
              Belum punya akun?{" "}
              <a href="/register" className="underline">
                Buat Akun
              </a>
            </span>
          </div>
        </div>
      </Card>

      {showConfirm && user && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold">Confirm Your Info</h2>

            {/* Avatar Selection */}
            <div className="grid grid-cols-5 gap-4 mt-2">
              {avatars.map((avatar) => (
                <img
                  key={avatar.name}
                  src={avatar.url}
                  alt={avatar.name}
                  className={`w-16 h-16 rounded-full bg-customBlue cursor-pointer border-2 ${
                    selectedAvatar === avatar.url
                      ? "border-blue-500 shadow-[0px_0px_2px_rgba(0,0,0,1)] border-2 "
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedAvatar(avatar.url)}
                />
              ))}
            </div>

            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={saveUserData}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
