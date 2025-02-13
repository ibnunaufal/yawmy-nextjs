"use client";
import { auth } from "@/utils/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/login");
      } else {
        console.log(JSON.stringify(authUser));
        setUser(authUser);
      }
    });
    console.log(JSON.stringify(user));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return user ? (
    <div>
      {/* top item */}
      <div className="flex justify-between my-5">
        <div className="flex flex-col justify-center">
          <span className=" text-lg caprasimo">yawmy</span>
        </div>
        <div>
          <Avatar>
            <AvatarImage src={user.photoURL} />
            <AvatarFallback>HH</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* date and fill today's mutabaah */}
      <div className=" flex justify-between bg-card-gradient rounded-md p-4 my-5 border-2 border-black">
        <div>
          <h6 className=" text-sm font-normal">Assalamualaikum 👋</h6>
          <h1 className=" text-xl caprasimo">{user.displayName}</h1>
        </div>
        <div className=" flex items-center justify-center flex-col">
          <h2 className="text-md text-background font-bold mb-1">Kamis, 6 Feb 2025</h2>
          <Button>Isi mutabaah hari ini</Button>
        </div>
      </div>

      {/* progress and percentage */}
      <div className="flex overflow-y-hidden my-5">
        {[0, 1, 2, 3, 4].map((element) => (
          <div
            key={element}
            className="bg-foreground text-background w-fit min-w-40 min-h-56 mx-2 p-2 rounded-md"
          >
            {element}
          </div>
        ))}
      </div>

      {/* calendar */}
      <div className="bg-foreground my-5 rounded-md min-h-56">
        calendar
      </div>

      {/* daily quote */}
      <div className="bg-foreground my-5 rounded-md">
        calendar
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
        <a
          href="/profile"
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Go to Profile
        </a>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  ) : null;
}
