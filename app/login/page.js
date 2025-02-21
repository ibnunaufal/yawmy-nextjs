"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, app } from "@/utils/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { CircleX, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const db = getFirestore(app);

  const [message, setMessage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  
  useEffect(() => {
    console.log("searchParams", searchParams.get("message"));
    let message = searchParams.get("message");
    setMessage(message);
    let nextPage = searchParams.get("next");
    setNextPage(nextPage);

  }, [searchParams]);

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

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      document.cookie = `authToken=${result.user.accessToken}; path=/`;

      checkUserProfile(userData);
      // Check if user exists in Firestore
      // const userDocRef = doc(db, "users", userData.email);
      // const userDoc = await getDoc(userDocRef);

      // if (!userDoc.exists()) {
      //   // First-time login, show confirmation popup
      //   setUser(userData);
      //   setSelectedAvatar(userData.photoURL);
      //   setShowConfirm(true);
      // } else {
      //   // User already exists, redirect to home
      //   document.cookie = `authToken=${result.user.accessToken}; path=/`;
      //   router.push("/home");
      // }
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  const loginWithEmail = async () => {
    if (!username || !password) {
        toast({
            description: "Username dan Password tidak boleh kosong",
        });
        return;
    }

    try {
        const result = await signInWithEmailAndPassword(auth, username, password);
        document.cookie = `authToken=${result.user.accessToken}; path=/`;
        console.log("result", result);
        const userData = {
            name: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
        };
        console.log("userData", userData);

        await checkUserProfile(userData); // Tambahkan `await` agar diproses secara berurutan
    } catch (error) {
        let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";

        switch (error.code) {
            case "auth/invalid-email":
                errorMessage = "Format email tidak valid.";
                break;
            case "auth/user-disabled":
                errorMessage = "Akun ini telah dinonaktifkan.";
                break;
            case "auth/user-not-found":
                errorMessage = "Akun tidak ditemukan. Silakan daftar terlebih dahulu.";
                break;
            case "auth/email-already-in-use":
                errorMessage = "Email sudah digunakan. Silakan gunakan email lain.";
                break;
            case "auth/invalid-credential":
                errorMessage = "Email atau password tidak valid.";
                break;
            case "auth/wrong-password":
                errorMessage = "Password yang dimasukkan salah.";
                break;
            case "auth/too-many-requests":
                errorMessage = "Terlalu banyak percobaan login. Silakan coba lagi nanti.";
                break;
        }

        toast({
            description: errorMessage,
        });

        console.error("Login Gagal", error);
    }
};

const checkUserProfile = async (userData) => {
  try {
      console.log("Checking user profile for", userData.email);
      const userDocRef = doc(db, "users", userData.email);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          console.log("Navigating to /...");
          if (nextPage) {
            router.push(`/${nextPage}`);
          } else {
            router.push("/");
          }
      } else {
          console.log("No such document!");
          setUser(userData);
          setSelectedAvatar(userData.photoURL);
          setShowConfirm(true);
      }
  } catch (error) {
      console.error("Error getting document:", error);
  }
};

  // const checkUserProfile = async (userData) => {
  //   try {
  //       const userDocRef = doc(db, "users", userData.email);
  //       const docSnap = await getDoc(userDocRef);

  //       if (docSnap.exists()) {
  //           console.log("Document data:", docSnap.data());
  //           router.push("/home");
  //           console.log("redirect to home");
  //       } else {
  //           console.log("No such document!");
  //           setUser(userData);
  //           setSelectedAvatar(userData.photoURL);
  //           setShowConfirm(true);
  //       }
  //   } catch (error) {
  //       console.error("Error getting document:", error);
  //   }
  // };

  // const checkUserProfile = async (userData) => {
  //   const userDocRef = doc(db, "users", userData.email);
  //   await getDoc(userDocRef).then((doc) => {
  //     console.log("doc", doc);
  //     if (doc.exists()) {
  //       console.log("Document data:", doc.data());
  //       router.push("/home");
  //     } else {
  //       console.log("No such document!");
  //       setUser(userData);
  //       setSelectedAvatar(userData.photoURL);
  //       setShowConfirm(true);
  //     }
  //   }).catch((error) => {
  //     console.error("Error getting document:", error);
  //   });

  //   // if (!userDoc.exists()) {
  //   //   // First-time login, show confirmation popup
  //   //   setUser(userData);
  //   //   setSelectedAvatar(userData.photoURL);
  //   //   setShowConfirm(true);
  //   // } else {
  //   //   // User already exists, redirect to home
  //   //   // document.cookie = `authToken=${result.user.accessToken}; path=/`;
  //   //   router.push("/home");
  //   // }
  // };

  const saveUserData = async () => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.email);
      await setDoc(userDocRef, { ...user, photoURL: selectedAvatar }); // Save selected avatar

      // Store auth token
      document.cookie = `authToken=${auth.currentUser.accessToken}; path=/`;
      router.push("/");
    } catch (error) {
      console.error("Error saving user data", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="p-6 min-w-[300px] bg-bg">
        <DotLottieReact
          src="https://lottie.host/adbec3f6-147c-45df-a800-c273bbf83def/qA0YvSLThJ.lottie"
          loop autoplay
          className="w-72 p-[-10px] h-fit"
        />
        <span className=" flex justify-center caprasimo text-4xl my-5">
          yawmy
        </span>
        {message && (
          <div className="flex items-center bg-red-200 border-red-600 border p-2 rounded-base mb-5">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span className=" w-full text-xs ml-1">
              {message}
            </span>
            <CircleX className="w-4 h-4 text-red-600 ml-2 cursor-pointer" onClick={() => setMessage(null)} />
          </div>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Login</h1>
          <span
            className=" text-sm underline"
            onClick={() => router.push("/register")}
          >
            Belum punya akun?
          </span>
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
            className="mt-4"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="mt-4"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span
              className=" text-sm w-full flex justify-end mt-1 text-gray-600 underline"
              onClick={() => router.push("/forgot-password")}
            >
              Lupa Password?
            </span>
          </div>
          <div>
            <Button className="mt-3 w-full" onClick={loginWithEmail}>
              Login
            </Button>
          </div>
          <div className="my-3 flex justify-center items-center">
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
          </Button>
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
