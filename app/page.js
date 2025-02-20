"use client";
import { auth } from "@/utils/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AppWindow,
  BookOpenText,
  CloudUpload,
  HandCoins,
  Lightbulb,
  ListChecks,
  MessageCircleQuestion,
  NotebookPen,
  Scroll,
  User,
} from "lucide-react";
import moment from "moment";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const menu = [
    {
      name: "Mutabaah",
      href: "/mutabaah",
      icon: <ListChecks />,
    },
    {
      name: "InfaQris",
      href: "/qris",
      icon: <HandCoins />,
    },
    {
      name: "Quran",
      href: "/quran",
      icon: <BookOpenText />,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <User />,
    },
  ];

  const carousels = [
    {
      title: "Mutabaah",
      description:
        "Mutabaah adalah evaluasi yang dilakukan untuk mengukur sejauh mana kita telah melaksanakan kewajiban dan ibadah harian kita sebagai seorang muslim.",
      href: "/mutabaah",
      icon: <ListChecks size={54} />,
    },
    {
      title: "InfaQris",
      description:
        "InfaQris adalah sarana untuk berinfaq dan bersedekah dengan menggunakan QRIS.",
      href: "/qris",
      icon: <HandCoins size={54} />,
    },
    {
      title: "Quran",
      description:
        "Quran adalah kitab suci umat Islam yang diturunkan kepada Nabi Muhammad SAW.",
      href: "/quran",
      icon: <BookOpenText size={54} />,
    },
    {
      title: "Profile",
      description:
        "Profile adalah halaman untuk melihat dan mengubah data diri.",
      href: "/profile",
      icon: <User size={54} />,
    },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        // router.push("/login");
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
            <AvatarFallback>
              {String(user.displayName).substring(0, 3)}
            </AvatarFallback>
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
          <h2 className="text-md text-background font-bold mb-1">
            {moment().format("dddd, D MMM YYYY")}
          </h2>
          <Button>Isi mutabaah hari ini</Button>
        </div>
      </div>

      {/* menu */}
      <div className="my-5">
        <div className="w-fit bg-bg py-1 px-5 border-black border-t-2 border-x-2 rounded-t-base flex items-center font-bold">
          <Scroll className="mr-2 w-5 h-5" />
          Menu
        </div>
        <div className="bg-main p-4 rounded-r-base rounded-b-base border-2 border-black">
          <div className="grid grid-cols-4 gap-4">
            {menu.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="
                flex flex-col items-center justify-center bg-bg p-4 rounded-md
                border-2 border-black
                "
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* menu */}
      <div className="my-5">
        <div className="w-fit bg-main py-1 px-5 border-black border-t-2 border-x-2 rounded-t-base flex items-center font-bold">
          <NotebookPen className="mr-2 w-5 h-5" />
          Contribute
        </div>
        <div className="bg-bg p-4 rounded-r-base rounded-b-base border-2 border-black">
          <span className="text-sm">
            Unggah QRIS infaq yang anda temui atau miliki, dengan begitu orang
            lain akan berinfaq lalu anda akan berpotensi mendapat pahala
            jariyah!{" "}
          </span>
          <Button
            className="mt-2"
            onClick={() => {
              router.push("/contribute");
            }}
          >
            <CloudUpload className="mr-1 w-5 h-5" />
            Unggah QRIS
          </Button>
        </div>
      </div>

      {/* insight */}
      <div className="my-5">
        <div className="w-fit bg-bg py-1 px-5 border-black border-t-2 border-x-2 rounded-t-base flex items-center font-bold">
          <MessageCircleQuestion className="mr-2 w-5 h-5" />
          Insight
        </div>
        <div className="bg-main py-4 px-2 rounded-r-base rounded-b-base border-2 border-black">
          <div className="flex overflow-y-hidden my-2 no-scrollbar">
            {carousels.map((c) => (
              <div
                key={c.title}
                className="bg-bg text-background w-fit min-w-64 min-h-56 mx-2 p-2 rounded-md border-2 border-black"
              >
                <div className="w-48 h-24 flex items-center">{c.icon}</div>
                <div className="text-xl font-caprasimo ">{c.title}</div>
                <div className="text-xs ">{c.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="bg-foreground my-5 rounded-md min-h-56">calendar</div>
      <div className="bg-foreground my-5 rounded-md">calendar</div>

      <div className="flex flex-col items-center justify-center">
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
      </div> */}
    </div>
  ) : (
    <div>
      {/* top item */}
      <div className="flex justify-between my-5">
        <div className="flex flex-col justify-center">
          <span className=" text-lg caprasimo">yawmy</span>
        </div>
        <div>
          <Avatar>
            <AvatarImage src={""} />
            <AvatarFallback>
              hai
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* date and fill today's mutabaah */}
      <div className=" flex justify-between bg-card-gradient rounded-md p-4 my-5 border-2 border-black">
        <div>
          <h6 className=" text-sm font-normal">Assalamualaikum 👋</h6>
          <h1 className=" text-xl caprasimo">hamba allah</h1>
        </div>
        <div className=" flex items-center justify-center flex-col">
          <h2 className="text-md text-background font-bold mb-1">
            {moment().format("dddd, D MMM YYYY")}
          </h2>
          <Button>Isi mutabaah hari ini</Button>
        </div>
      </div>

      {/* menu */}
      <div className="my-5">
        <div className="w-fit bg-bg py-1 px-5 border-black border-t-2 border-x-2 rounded-t-base flex items-center font-bold">
          <Scroll className="mr-2 w-5 h-5" />
          Menu
        </div>
        <div className="bg-main p-4 rounded-r-base rounded-b-base border-2 border-black">
          <div className="grid grid-cols-4 gap-4">
            {menu.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="
            flex flex-col items-center justify-center bg-bg p-4 rounded-md
            border-2 border-black
            "
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* menu */}
      <div className="my-5">
        <div className="w-fit bg-main py-1 px-5 border-black border-t-2 border-x-2 rounded-t-base flex items-center font-bold">
          <NotebookPen className="mr-2 w-5 h-5" />
          Contribute
        </div>
        <div className="bg-bg p-4 rounded-r-base rounded-b-base border-2 border-black">
          <span className="text-sm">
            Unggah QRIS infaq yang anda temui atau miliki, dengan begitu orang
            lain akan berinfaq lalu anda akan berpotensi mendapat pahala
            jariyah!{" "}
          </span>
          <Button
            className="mt-2"
            onClick={() => {
              router.push("/contribute");
            }}
          >
            <CloudUpload className="mr-1 w-5 h-5" />
            Unggah QRIS
          </Button>
        </div>
      </div>

      {/* insight */}
      <div className="my-5">
        <div className="w-fit bg-bg py-1 px-5 border-black border-t-2 border-x-2 rounded-t-base flex items-center font-bold">
          <MessageCircleQuestion className="mr-2 w-5 h-5" />
          Insight
        </div>
        <div className="bg-main py-4 px-2 rounded-r-base rounded-b-base border-2 border-black">
          <div className="flex overflow-y-hidden my-2 no-scrollbar">
            {carousels.map((c) => (
              <div
                key={c.title}
                className="bg-bg text-background w-fit min-w-64 min-h-56 mx-2 p-2 rounded-md border-2 border-black"
              >
                <div className="w-48 h-24 flex items-center">{c.icon}</div>
                <div className="text-xl font-caprasimo ">{c.title}</div>
                <div className="text-xs ">{c.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
