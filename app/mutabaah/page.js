"use client";
import HeadComponent from "@/components/HeadComponent";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import moment, { duration } from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
} from "firebase/firestore";
import { auth } from "@/utils/auth";
import db from "@/utils/firestore";

export default function Mutabaah() {
  const router = useRouter();
  let dayInAWeek = ["Aha", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  let [records, setRecords] = useState([]);
  let [fields, setFields] = useState([]);
  let [dates, setDates] = useState([]);

  let [dateArray, setDateArray] = useState([]);
  let [email, setEmail] = useState("");
  let [currentDate, setCurrentDate] = useState(new Date());
  let [firstDayOfWeek, setFirstDayOfWeek] = useState(0);

  let [selectedDate, setSelectedDate] = useState(new Date());
  let [currentWeek, setCurrentWeek] = useState([]);

  const { toast } = useToast();

  useEffect(() => {
    generateCurrentMonthArray();
    generateCurrentWeekArray();
    getEmail();
    console.log(dateArray);
  }, []);

  function getEmail() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in.");
        console.log(user.email);
        setEmail(user.email);
      } else {
        console.log("No user is signed in.");
      }
    });
  }

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

  function generateCurrentWeekArray() {
    let firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    let lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + (6 - currentDate.getDay())
    );

    let weekArray = [];
    for (let i = firstDay; i <= lastDay; i.setDate(i.getDate() + 1)) {
      weekArray.push(new Date(i));
    }
    setCurrentWeek(weekArray);
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

  async function getRecordsInRange() {
    try {
      const recordsRef = collection(db, `mutabaah/${email}/records`); // Reference to records subcollection

      const startDate = moment().subtract(7, 'd').format("yyyy-MM-dd") // "2025-02-01"; // Start date
      const endDate = moment().format("yyyy-MM-dd"); // End date

      // Query: Get documents where the ID (date) is between 2025-02-01 and 2025-02-07
      const q = query(
        recordsRef,
        where("__name__", ">=", startDate),
        where("__name__", "<=", endDate),
        orderBy("__name__") // Order results by document ID (which is the date)
      );

      const querySnapshot = await getDocs(q);
      const fetchedRecords = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Date as ID
        ...doc.data().mutabaahData, // Spread the mutabaahData inside
      }));

      console.log("Records:", fetchedRecords);
      if (fetchedRecords.length > 0) {
        // setDates(fetchedRecords.map((rec) => rec.id)); // Store the date headers
        setFields(Object.keys(fetchedRecords[0]).filter((key) => key !== "id")); // Extract field names
      }

      let tempDates = [...Array(7)].map((_, index) => 
        moment().subtract(index, "days").format("YYYY-MM-DD")
      );
      setDates(tempDates.reverse());
      
      setRecords(fetchedRecords);

      console.log("Dates:", dates);
      console.log("Fields:", fields);

      // setFields(records.length > 0 ? Object.keys(records[0]).filter((key) => key !== "id") : []);
    } catch (error) {
      console.error("Error fetching records:", error);
      // return [];
    }
  }

  return (
    <div className="h-screen py-2">
      <title>Mutabaah | Yawmy</title>
      <HeadComponent title="Mutabaah" />
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold">
          {moment(currentDate).format("MMM YYYY")}
        </span>
        {/* <div>
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
        </div> */}
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
                  ? "flex flex-col items-center my-1 bg-orange-100 rounded-base"
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
              <span className={"text-xs min-h-10"}>
                {date.getMonth() === currentDate.getMonth() &&
                date.getDay() % 2 == 0
                  ? ""
                  : ""}
              </span>
            </div>
          ))}
        </div>
        {/* <div className="flex flex-col items-center justify-center my-20">
          <Image
            src="/ic_pray.png"
            alt="icon pray"
            width={250}
            height={150}
            className=""
          />
        </div> */}
      </div>
      currentWeek
      <div className="mt-4">
        <span className="text-xl font-bold">Riwayat Mutabaah</span>
        <p className="text-gray-600">
          Mutabaah yang pernah diisi pada beberapa hari terakhir
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className=" flex justify-center items-center text-center bg-bg rounded-base border border-black">
          <ChevronLeftIcon className="h-5 w-5" />
        </div>
        <div className="w-full mx-1 grid grid-cols-7 gap-1 py-2 rounded-base text-black">
          {currentWeek.map((date, index) => (
            <div key={index} className={
              moment(date).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD") 
              ? "flex flex-col items-center my-1 bg-main rounded-base"
              : "flex flex-col justify-center items-center my-1"
            } onClick={() => setSelectedDate(date)}>
              <span className="caprasimo text-2xl">{moment(date).format("DD")}</span>
              <span>{dayInAWeek[index]}</span>
            </div>
          ))}
        </div>
        <div className=" flex justify-center items-center text-center bg-bg rounded-base border border-black">
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
      <div>
        
      </div>

      <div className="mt-4">
        <span className="text-xl font-bold">Tabel Mutabaah</span>
        <p className="text-gray-600">
          Lihat mutabaah yang sudah diisi pada beberapa hari terakhir
        </p>
        <Button onClick={() => getRecordsInRange()} className="mt-2">
          Tampilkan
        </Button>
      </div>
      <div className="my-4 pb-4 overflow-x-auto" id="mutabaah-table">
        <div className="min-w-max">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th rowSpan={2} className="border border-gray-300 p-2">
                  Field
                </th>
                <th
                  colSpan={dates.length}
                  className="border border-gray-300 p-2"
                >
                  {" "}
                  {moment().format("MMMM")}{" "}
                </th>
              </tr>

              <tr className="bg-gray-200">
                {dates.map((date) => (
                  <th key={date} className="border border-gray-300 p-2">
                    {moment(date).format("DD")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* subuh */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Solat Subuh</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("subuh") ? (record?.subuh ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="">Solat Rawatib Subuh</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("subuh_rawatib") ? (record?.subuh_rawatib ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="">Solat Subuh Berjamaah</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("subuh_jamaah") ? (record?.subuh_jamaah ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* dhuhur */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Solat Dhuhur</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("dhuhur") ? (record?.dhuhur ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="">Solat Rawatib Dhuhur</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("dhuhur_rawatib") ? (record?.dhuhur_rawatib ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="">Solat Dhuhur Berjamaah</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("dhuhur_jamaah") ? (record?.dhuhur_jamaah ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* ashar */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Solat Ashar</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("ashar") ? (record?.ashar ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="">Solat Rawatib Ashar</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("ashar_rawatib") ? (record?.ashar_rawatib ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="">Solat Ashar Berjamaah</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("ashar_jamaah") ? (record?.ashar_jamaah ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* maghrib */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Solat Maghrib</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("maghrib") ? (record?.maghrib ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="">Solat Rawatib Maghrib</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("maghrib_rawatib") ? (record?.maghrib_rawatib ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="">Solat Maghrib Berjamaah</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("maghrib_jamaah") ? (record?.maghrib_jamaah ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* isya */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Solat Isya</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("isya") ? (record?.isya ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="">Solat Rawatib Isya</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("isya_rawatib") ? (record?.isya_rawatib ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="">Solat Isya Berjamaah</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("isya_jamaah") ? (record?.isya_jamaah ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* qiyamul lail */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Qiyamul Lail</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("qiyamul_lail") ? (record?.qiyamul_lail ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* dhuha */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Solat Dhuha</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("dhuha") ? (record?.dhuha ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* tarawih */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Solat Tarawih</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("tarawih") ? (record?.tarawih ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* infaq */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Infaq</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("infaq") ? (record?.infaq ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* tilawah */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Tilawah Al-Quran</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("tilawah") ? (record?.tilawah ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* puasa */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Puasa Sunnah Senin Kamis</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("puasa_sunnah") ? (record?.puasa_sunnah ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* dzikir pagi */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Dzikir Pagi</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("dzikir_pagi") ? (record?.dzikir_pagi ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* dzikir petang */}
              <tr>
                <td className="border border-gray-300 p-2">
                  <span className="font-bold">Dzikir Petang</span>
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.hasOwnProperty("dzikir_petang") ? (record?.dzikir_petang ? "✅" : "❌") : "⛔️"}
                    </td>
                  );
                })}
              </tr>

              {/* {fields.map((field) => (
              <tr key={field}>
                <td className="border border-gray-300 p-2 capitalize">
                  {field.replace(/_/g, " ")}
                </td>
                {dates.map((date) => {
                  const record = records.find((rec) => rec.id === date);
                  return (
                    <td key={date} className="border border-gray-300 p-2">
                      {record?.[field] ? "✅" : "❌"}
                    </td>
                  );
                })}
              </tr>
            ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
