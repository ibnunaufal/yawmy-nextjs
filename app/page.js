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
  MapPinned,
  Menu,
  MessageCircleQuestion,
  NotebookPen,
  Scroll,
  Sun,
  User,
} from "lucide-react";
import moment from "moment";
import JadwalSholat from "./JadwalSholat";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import Hijriah1446 from "./HijriCalendar";


export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [nextPrayerTime, setNextPrayerTime] = useState("");
  const [nextPrayerName, setNextPrayerName] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");

  const [hijriDate, setHijriDate] = useState("");
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
      name: "Matsurat",
      href: "/almatsurat",
      icon: <Sun />,
    },
  ];

  const carousels = [
    {
      id: 1,
      title: "Mutabaah",
      description:
        "Mutabaah adalah evaluasi yang dilakukan untuk mengukur sejauh mana kita telah melaksanakan kewajiban dan ibadah harian kita sebagai seorang muslim.",
      href: "/mutabaah",
      icon: <ListChecks size={54} />,
    },
    {
      id: 2,
      title: "InfaQris",
      description:
        "InfaQris adalah sarana untuk berinfaq dan bersedekah dengan menggunakan QRIS.",
      href: "/qris",
      icon: <HandCoins size={54} />,
    },
    {
      id: 3,
      title: "Quran",
      description:
        "Quran adalah kitab suci umat Islam yang diturunkan kepada Nabi Muhammad SAW.",
      href: "/quran",
      icon: <BookOpenText size={54} />,
    },
    {
      id: 4,
      title: "Al-Matsurat",
      description:
        "Al-Matsurat adalah kumpulan dzikir pagi dan petang yang disusun oleh Imam Hasan Al-Banna, berisi ayat-ayat Al-Qur’an dan hadits. Dzikir ini dianjurkan untuk diamalkan setiap hari sebagai bentuk mengingat Allah dan memohon perlindungan-Nya.",
      href: "/almatsurat",
      icon: <Sun size={54} />,
    },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        // router.push("/login");
      } else {
        // console.log(JSON.stringify(authUser));
        setUser(authUser);
      }
    });
    getNextPrayer();
    // console.log(JSON.stringify(user));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  function getNextPrayer() {
    let prayerTimes = JadwalSholat[moment().format("yyyy-MM-DD")];
    // console.log(prayerTimes);
    if (!prayerTimes) {
      // console.log("No prayer times found for this date.");
    }
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHours * 60 + currentMinutes; // Convert to total minutes

    let nextPrayer = null;
    let nextPrayerName = "";
    let minDifference = Infinity;
    let hourDifference = Infinity;
    let tempMinute = 0;

    Object.keys(prayerTimes).forEach((prayer) => {
      if (prayer === "tanggal") return; // Skip the date field

      const [hours, minutes] = prayerTimes[prayer].split(":").map(Number);
      const prayerTime = hours * 60 + minutes; // Convert to total minutes
      // console.log(prayerTime, currentTime, prayerTime - currentTime);
      if (
        prayerTime > currentTime &&
        prayerTime - currentTime < minDifference
      ) {
        nextPrayer = prayerTimes[prayer];
        nextPrayerName = prayer;
        minDifference = prayerTime - currentTime;

        hourDifference = Math.floor(minDifference / 60);
        tempMinute = (60 * hourDifference - minDifference) * -1;

        if (nextPrayer) {
          if (hourDifference < 1) {
            setNextPrayer(`${minDifference} menit lagi`);
          } else {
            setNextPrayer(`${hourDifference} jam ${tempMinute} menit`);
          }
          // console.log("Next prayer is", nextPrayer, "at", nextPrayerName);
          setNextPrayerTime(nextPrayer);
          setNextPrayerName(nextPrayerName);
        } else {
          // console.log("No prayer found for today.");
        }
      }
    });
  }

  return (
    <div>
      {/* top item */}
      <div className="flex justify-between my-5">
        <div className="flex flex-col justify-center">
          <span className=" text-lg caprasimo">yawmy</span>
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <span className=" text-lg caprasimo">yawmy</span>
                </SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {user ? (
                  <div className="flex flex-col items-center">
                    <Avatar className="mb-2">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback>
                        {String(user.displayName).substring(0, 3)}
                      </AvatarFallback>
                    </Avatar>
                    <span className=" text-sm mb-4">{user.displayName}</span>
                    {menu.map((item) => (
                      <Button
                        key={item.name}
                        onClick={() => {
                          router.push(item.href);
                        }}
                        className="bg-bg w-full mb-4"
                      >
                        {item.name}
                      </Button>
                    ))}
                    <hr className="w-full my-5" />
                    <Button
                      onClick={() => {
                        router.push("/contribute");
                      }}
                      className="bg-white w-full mb-4"
                    >
                      Upload QRIS
                    </Button>
                    <hr className="w-full mt-5" />
                    <Button className="mt-5" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* welcome section */}
      <div className=" flex items-center rounded-md my-10">
        <div>
          {user ? (
            <Avatar>
              <AvatarImage src={user.photoURL} />
              <AvatarFallback>
                {String(user.displayName).substring(0, 3)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        <div className="ml-3">
          <h6 className=" text-sm font-normal">Assalamualaikum 👋</h6>
          {user ? (
            <h2 className=" text-md font-bold">{user.displayName}</h2>
          ) : (
            <div>
              <h2 className=" text-md font-bold">Selamat datang</h2>
              <span className=" text-sm">Silahkan login untuk melanjutkan</span>
            </div>
          )}
        </div>
      </div>

      {/* date and fill today's mutabaah */}
      <div className="bg-white p-4 rounded-base border-2 border-black flex mb-4 items-center">
        <div className="w-full">
          <h2 className="text-md font-bold mb-1">
            {moment().locale("id").format("dddd, D MMM YYYY")}
          </h2>
          <h2 className="text-sm mb-1">
            {Hijriah1446.map((item) => {
              if (item.gregorian === moment().format("DD-MM-YYYY")) {
                return <span key={item.hijri}>{item.hijri}</span>;
              }
            })}
          </h2>
        </div>
        <div className="flex flex-col items-center">
        <Button
          onClick={() => {
            router.push(`/mutabaah/${moment().format("yyyy-MM-DD")}`);
          }}
          className="text-xs"
        >
          Isi mutabaah hari ini
        </Button>
        <a href="#insight" className="mt-2">
        <span className="text-xs underline">Apa itu mutabaah?</span>
        </a>
        </div>
      </div>
      {nextPrayerTime && (
        <div>
          <div className="flex items-center w-full justify-between bg-bg px-2 pt-2 border-black border-2 rounded-r-base rounded-t-base">
          <div className="flex flex-col">
            <span className="text-xs">Waktu solat terdekat</span>
            <span>
              {nextPrayerName.toUpperCase()} at {nextPrayerTime}
            </span>
            <span className="text-xs">{nextPrayer}</span>
          </div>
          <Image
            src={`/ic_${nextPrayerName}.svg`}
            alt={`/ic_${nextPrayerName}.svg`}
            width={50}
            height={50}
            className=""
          />
          <Image
            src={`/ic_mosque.svg`}
            alt={`/ic_mosque.svg`}
            width={100}
            height={100}
            className=""
          />
        </div>
        <span className="text-sm py-1 border-b-2 border-r-2 border-l-2 rounded-b-base w-fit px-2 pb-1 flex items-center"> <MapPinned size={18} className="mr-2" /> Kota Semarang</span>
        </div>
      )}

      {/* menu */}
      <div className="my-5 bg-card-gradient rounded-md border-2">
        <div className="w-fit py-1 pl-2 flex items-center font-bold">Menu</div>
        <div className="p-1">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {menu.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="
            flex flex-col items-center justify-center bg-bg p-2 m-2 rounded-md
            border-2 border-black
            "
              >
                {item.icon}
                <span className="text-sm mt-1">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* insight */}
      <div className="my-5" id="insight">
        <div className="w-fit py-1 flex items-center font-bold">
          Insight
        </div>
      </div>
      <Carousel className="p-1">
        <CarouselContent>
          {carousels.map((c) => (
            <CarouselItem key={c.id}>
              <div
                key={c.title}
                className="bg-white text-background w-fit min-w-64 min-h-56 mx-2 p-2 rounded-md border-2 border-black flex flex-col items-center"
              >
                <div className="w-48 h-24 flex items-center justify-center">
                  {c.icon}
                </div>
                <div className="text-xl font-caprasimo ">{c.title}</div>
                <div className="text-xs text-center">{c.description}</div>
              </div>
              <div className="flex justify-center">
                {/* indicator */}
                {
                  <div className="flex mt-2">
                    {carousels.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 mx-1 rounded-full bg-background ${
                          index === c.id - 1 ? "bg-main" : "bg-black"
                        }`}
                      />
                    ))}
                  </div>
                }
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
      <CarouselNext />
      </Carousel>

      {/* app explanation */}
      <div className="my-5">
        <div className="w-fit bg-card-gradient py-1 px-5 border-black border-t-2 border-x-2 rounded-t-base flex items-center font-bold">
          <Lightbulb className="mr-2 w-5 h-5" />
          Apa itu Yawmy?
        </div>
        <div className="bg-bg p-4 rounded-r-base rounded-b-base border-2 border-black">
          <p className="text-sm text-justify">
            Yawmy (dibaca Yaumi) berasal dari istilah Mutaba’ah Yaumiyyah, yang
            berarti evaluasi amal harian—baik yang wajib maupun sunnah. Dengan
            Yawmy, Anda dapat merefleksikan ibadah harian dan lebih mudah
            mengamati perkembangan spiritual Anda. Aplikasi ini hadir sebagai
            sahabat dalam perjalanan meningkatkan kualitas iman, membantu Anda
            lebih konsisten dalam beribadah, dan mendekatkan diri kepada Allah.
            Mari jadikan setiap hari lebih bermakna dengan Yawmy!
          </p>
        </div>
      </div>

      {/* contribute */}
      <div className="my-5">
        <div className="w-fit bg-card-gradient py-1 px-5 border-black border-t-2 border-x-2 rounded-t-base flex items-center font-bold">
          <NotebookPen className="mr-2 w-5 h-5" />
          Contribute
        </div>
        <div className="bg-bg p-4 rounded-r-base rounded-b-base border-2 border-black">
          <p className="text-sm text-justify">
            Unggah QRIS infaq yang anda temui atau miliki, dengan begitu orang
            lain akan berinfaq lalu anda akan berpotensi mendapat pahala
            jariyah!😉{" "}
          </p>
          <br/>
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
  );
}