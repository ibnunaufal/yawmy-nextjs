"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, app } from "@/utils/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const db = getFirestore(app);

  const avatars = [
    { name: user?.displayName, url: user?.photoURL },
    { name: "man1", url: "/avatar/man1.svg" },
    { name: "man2", url: "/avatar/man2.svg" },
    { name: "man3", url: "/avatar/man3.svg" },
    { name: "man4", url: "/avatar/man4.svg" },
    { name: "woman1", url: "/avatar/woman1.svg" },
    { name: "woman2", url: "/avatar/woman2.svg" },
    { name: "woman3", url: "/avatar/woman3.svg" },
    { name: "woman4", url: "/avatar/woman4.svg" },
    { name: "woman5", url: "/avatar/woman5.svg" },
  ];

  const registerWithEmail = async () => {
    if (!name || !username || !password) {
      toast({
        description: "Lengkapi data registrasi terlebih dahulu",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      )
      const userData = {
        name: name,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      checkUserProfile(userData);
    } catch (error) {
        console.error("Error registering user", error);
      let errorMessage =
        "Terjadi kesalahan saat registrasi. Silakan coba lagi.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email sudah digunakan. Gunakan email lain.";
          break;
        case "auth/invalid-email":
          errorMessage = "Format email tidak valid.";
          break;
        case "auth/weak-password":
          errorMessage =
            "Password terlalu lemah. Gunakan password yang lebih kuat. Min 6 karakter.";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "Registrasi dengan email dan password tidak diizinkan.";
          break;
      }

      toast({
        description: errorMessage,
      });
    }
  };

  const checkUserProfile = async (userData) => {
    const userDocRef = doc(db, "users", userData.email);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // First-time login, show confirmation popup
      updateProfile(auth.currentUser, {
        displayName: userData.name,
      });
      setUser(userData);
      setSelectedAvatar(userData.photoURL);
      setShowConfirm(true);
    } else {
      // User already exists, redirect to home
      document.cookie = `authToken=${result.user.accessToken}; path=/`;
      router.push("/login");
    }
  };

  const saveUserData = async () => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.email);
      await setDoc(userDocRef, { ...user, photoURL: selectedAvatar }); // Save selected avatar

      // Store auth token
      document.cookie = `authToken=${auth.currentUser.accessToken}; path=/`;
      router.push("/login");
    } catch (error) {
      console.error("Error saving user data", error);
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
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Registrasi</h1>
          <span className=" text-sm underline">
            <a href="/login" className="underline">
              Sudah punya akun?
            </a>
          </span>
        </div>

        <div>
          <Input
            type="name"
            placeholder="Nama"
            className="mt-4"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            type="email"
            placeholder="Email"
            className="mt-4"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            className="mt-4"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div>
            {/* <span className=" text-sm w-full flex justify-end mt-1">
              <a href="/forgot-password" className="underline text-gray-600">
                Lupa Password?
              </a>
            </span> */}
          </div>
          <div>
            <Button className="mt-3 w-full" onClick={registerWithEmail}>
              Daftar
            </Button>
          </div>
          {/* <div className="my-3 flex justify-center items-center">
            <span className=" text-sm">Atau</span>
          </div>
          <Button onClick={loginWithGoogle} className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 30 30"
            >
              <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
            </svg>
            Login with Google
          </Button> */}
          {/* <div className=" my-3 flex flex-col">
            <span className=" text-sm">
              Belum punya akun?{" "}
              <a href="/register" className="underline">
                Buat Akun
              </a>
            </span>
          </div> */}
        </div>
      </Card>
      {/* <h1 className="text-2xl font-bold">Login</h1>
      <button
        onClick={loginWithGoogle}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login with Google
      </button> */}

      {showConfirm && user && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold">Konfirmasi data anda</h2>

            {/* Avatar Selection */}
            <div className="grid grid-cols-5 gap-4 mt-2">
              {avatars.map((avatar) => (
                <Avatar className={`w-16 h-16 rounded-full bg-customBlue cursor-pointer border-2 ${
                    selectedAvatar === avatar.url
                      ? "border-blue-500 border-2 shadow-lg shadow-black"
                      : "border-gray-200"
                  }`} onClick={() => setSelectedAvatar(avatar.url)}>
                <AvatarImage src={avatar.url} />
                <AvatarFallback>{String(name).substring(0,3)}</AvatarFallback>
                </Avatar>
                // <img
                //   key={avatar.name}
                //   src={avatar.url}
                //   alt={avatar.name}
                  
                //   onClick={() => setSelectedAvatar(avatar.url)}
                // />
              ))}
            </div>

            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <Button onClick={saveUserData} className="mt-4">
              Simpan & Lanjutkan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
