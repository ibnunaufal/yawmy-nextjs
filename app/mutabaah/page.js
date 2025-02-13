"use client";
import HeadComponent from "@/components/HeadComponent";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import moment, { duration } from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from "@/components/ui/toaster";

export default function Mutabaah() {
  const router = useRouter();
  let dayInAWeek = ["Aha", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  let [mutabaah, setMutabaah] = useState([]);
  let [dateArray, setDateArray] = useState([]);
  let [currentDate, setCurrentDate] = useState(new Date());
  let [firstDayOfWeek, setFirstDayOfWeek] = useState(0);
  const { toast } = useToast()


  useEffect(() => {
    generateCurrentMonthArray();
    console.log(dateArray);
  }, []);

  function generateCurrentMonthArray() {
    let firstDateOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    let lastDateOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    let monthArray = [];
    let firstDay = firstDateOfMonth.getDay();
    console.log(firstDay);
    // add previous month in the first week
    for (let i = firstDay; i > 0; i--) {
      let tempDate = new Date(firstDateOfMonth);
      tempDate.setDate(tempDate.getDate() - i);
      console.log(`${i} tempDate: ${tempDate}`);
      monthArray.push(new Date(tempDate));
    }

    // add current month
    for (
      let i = firstDateOfMonth;
      i <= lastDateOfMonth;
      i.setDate(i.getDate() + 1)
    ) {
      monthArray.push(new Date(i));
    }

    // add next month
    let lastDay = lastDateOfMonth.getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
      let tempDate = new Date(lastDateOfMonth);
      tempDate.setDate(tempDate.getDate() + i);
      monthArray.push(new Date(tempDate));
    }
    setDateArray(monthArray);
  }

  function nextMonth() {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    generateCurrentMonthArray();
  }

  function prevMonth() {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    generateCurrentMonthArray();
  }

  const handleDateClick = (date) => {
    console.log(date);
    if (date.getMonth() !== currentDate.getMonth()) {
      return;
    }
    let today = new Date();
    if (date.getDate() > today.getDate()) {
      console.log("tanggal belum bisa diisi");
      toast({
        description: `Tanggal ${date.getDate()} belum bisa diisi, pilih hari ini atau hari sebelumnya ya 😊`,
        duration: 2000,
      });
      return;
    }

    let mutabaahDate = moment(date).format("YYYY-MM-DD");
    router.push(`/mutabaah/${mutabaahDate}`);
  };

  return (
    <div className="h-screen py-2">
      <title>Mutabaah | Yawmy</title>
      <HeadComponent title="Mutabaah" />
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold">
          {moment(currentDate).format("MMM YYYY")}
        </span>
        <div>
          <button
            className="rounded-l-md p-2 text-sm/6 font-semibold text-white focus:outline-none hover:bg-violet-500/50 bg-foreground"
            onClick={() => prevMonth()}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            className="rounded-r-md p-2 text-sm/6 font-semibold text-white focus:outline-none hover:bg-violet-500/50 bg-foreground"
            onClick={() => nextMonth()}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <p className="text-gray-600">
        Pilih tanggal untuk mulai mengisi mutabaah
      </p>

      <div className="mb-8 mt-4">
        <div className="grid grid-cols-7 gap-1 py-2 rounded-base bg-main text-black border-2 border-black">
          {dayInAWeek.map((day, index) => (
            <div key={index} className="text-center w-full">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-1 rounded-base pb-4 bg-bg border-2 border-black">
          {dateArray.map((date, index) => (
            <div
              key={index}
              className={
                date.getMonth() === currentDate.getMonth()
                  ? "flex flex-col items-center my-1"
                  : "flex flex-col justify-center items-center my-1"
              }
              onClick={() => handleDateClick(date)}
            >
              <span
                className={
                  date.getMonth() === currentDate.getMonth()
                    ? "text-black font-bold text-lg"
                    : "text-gray-600 font-extralight items-center"
                }
              >
                {date.getDate()}
              </span>
              <span className={"text-xs"}>
                {date.getMonth() === currentDate.getMonth() &&
                date.getDay() % 2 == 0
                  ? "✅"
                  : ""}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center my-20">
          <Image src="/ic_pray.png" alt="icon pray" width={250} height={150} className="" />
        </div>
      </div>
    </div>
  );
}
