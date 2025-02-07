"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, app } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const db = getFirestore(app);

  const avatars = [
    { name: "Current", url: user?.photoURL },
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

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      // Check if user exists in Firestore
      const userDocRef = doc(db, "users", userData.email);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // First-time login, show confirmation popup
        setUser(userData);
        setSelectedAvatar(userData.photoURL);
        setShowConfirm(true);
      } else {
        // User already exists, redirect to home
        document.cookie = `authToken=${result.user.accessToken}; path=/`;
        router.push("/home");
      }
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  const saveUserData = async () => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.email);
      await setDoc(userDocRef, { ...user, photoURL: selectedAvatar }); // Save selected avatar

      // Store auth token
      document.cookie = `authToken=${auth.currentUser.accessToken}; path=/`;
      router.push("/home");
    } catch (error) {
      console.error("Error saving user data", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <button onClick={login} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Login with Google
      </button>

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
                    selectedAvatar === avatar.url ? "border-blue-500 shadow-[0px_0px_2px_rgba(0,0,0,1)] border-2 " : "border-gray-200"
                  }`}
                  onClick={() => setSelectedAvatar(avatar.url)}
                />
              ))}
            </div>

            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
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
