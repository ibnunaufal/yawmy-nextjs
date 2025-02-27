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
  getDoc,
} from "firebase/firestore";
import { auth } from "@/utils/auth";
import db from "@/utils/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SquarePen } from "lucide-react";

export default function Mutabaah() {
  const router = useRouter();
  let dayInAWeek = ["Aha", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  let dayInAWeekFull = [
    "Ahad",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  let [records, setRecords] = useState([]);
  let [fields, setFields] = useState([]);
  let [dates, setDates] = useState([]);
  const percentage = 67;

  let [dateArray, setDateArray] = useState([]);
  let [email, setEmail] = useState("");
  let [user, setUser] = useState({});
  let [currentDate, setCurrentDate] = useState(new Date());
  let [firstDayOfWeek, setFirstDayOfWeek] = useState(0);

  let [selectedDate, setSelectedDate] = useState(new Date());
  let [selectedDateRecords, setSelectedDateRecords] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [isEmpty, setIsEmpty] = useState(false);
  let [currentWeek, setCurrentWeek] = useState([]);

  let [percentageWajib, setPercentageWajib] = useState(0);
  let [percentageRawatib, setPercentageRawatib] = useState(0);
  let [percentageJamaah, setPercentageJamaah] = useState(0);
  let [percentageSunnah, setPercentageSunnah] = useState(0);
  let [percentageLainnya, setPercentageLainnya] = useState(0);

  let [finishedDates, setFinishedDates] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    generateCurrentMonthArray();
    generateCurrentWeekArray();
    getEmail();
    console.log(dateArray);
  }, []);

  async function getFinishedDates(em) {
    try {
      const month = moment().format("YYYY-MM");
      const docRef = doc(db, `mutabaah/${em}/monthly/${month}`);
      const docSnap = await getDoc(docRef);
      console.log("Document data:", docSnap.data());
      if (docSnap.exists()) {
        setFinishedDates(docSnap.data().finishedDates);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }

  function getEmail() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in.");
        console.log(user.email);
        setEmail(user.email);
        setUser(user);
        getSelectedDateRecords(user.email, selectedDate);
        getFinishedDates(user.email);
      } else {
        setIsEmpty(true);
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

  function getSelectedDateRecords(em, date) {
    // get data from firestore
    setIsLoading(true);
    console.log(`mutabaah/${em}/records/${moment(date).format("YYYY-MM-DD")}`);
    const docRef = doc(
      db,
      `mutabaah/${em}/records/${moment(date).format("YYYY-MM-DD")}`
    );
    getDoc(docRef)
      .then((docSnap) => {
        setIsLoading(false);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setSelectedDateRecords(docSnap.data().mutabaahData);
          setIsEmpty(false);
          console.log(docSnap.data().mutabaahData);

          // count percentage
          let totalWajib = 5;
          let totalRawatib = 5;
          let totalJamaah = 5;
          let totalSunnah = 3;
          let totalLainnya = 4;

          let countWajib = 0;
          let countRawatib = 0;
          let countJamaah = 0;
          let countSunnah = 0;
          let countLainnya = 0;

          if (docSnap.data().mutabaahData.subuh) countWajib++;
          if (docSnap.data().mutabaahData.dhuhur) countWajib++;
          if (docSnap.data().mutabaahData.ashar) countWajib++;
          if (docSnap.data().mutabaahData.magrib) countWajib++;
          if (docSnap.data().mutabaahData.isya) countWajib++;

          if (docSnap.data().mutabaahData.subuh_rawatib) countRawatib++;
          if (docSnap.data().mutabaahData.dhuhur_rawatib) countRawatib++;
          if (docSnap.data().mutabaahData.ashar_rawatib) countRawatib++;
          if (docSnap.data().mutabaahData.magrib_rawatib) countRawatib++;
          if (docSnap.data().mutabaahData.isya_rawatib) countRawatib++;

          if (docSnap.data().mutabaahData.subuh_jamaah) countJamaah++;
          if (docSnap.data().mutabaahData.dhuhur_jamaah) countJamaah++;
          if (docSnap.data().mutabaahData.ashar_jamaah) countJamaah++;
          if (docSnap.data().mutabaahData.magrib_jamaah) countJamaah++;
          if (docSnap.data().mutabaahData.isya_jamaah) countJamaah++;

          if (docSnap.data().mutabaahData.qiyaamul_lail) countSunnah++;
          if (docSnap.data().mutabaahData.dhuha) countSunnah++;
          if (docSnap.data().mutabaahData.tarawih) countSunnah++;

          if (docSnap.data().mutabaahData.infaq) countLainnya++;
          if (docSnap.data().mutabaahData.tilawah) countLainnya++;
          if (docSnap.data().mutabaahData.dzikir_pagi) countLainnya++;
          if (docSnap.data().mutabaahData.dzikir_petang) countLainnya++;

          setPercentageWajib((countWajib / totalWajib) * 100);
          setPercentageRawatib((countRawatib / totalRawatib) * 100);
          setPercentageJamaah((countJamaah / totalJamaah) * 100);
          setPercentageSunnah(((countSunnah / totalSunnah) * 100).toFixed(1));
          setPercentageLainnya(
            ((countLainnya / totalLainnya) * 100).toFixed(1)
          );
          console.log("Percentage Wajib", percentageWajib);
          console.log("Percentage Rawatib", percentageRawatib);
          console.log("Percentage Jamaah", percentageJamaah);
          console.log("Percentage Sunnah", percentageSunnah);
          console.log("Percentage Lainnya", percentageLainnya);
        } else {
          setIsEmpty(true);
          console.log("No such document!");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error getting document:", error);
      });
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

  const handleDateClickWeek = (date) => {
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

    setSelectedDate(date);
    getSelectedDateRecords(user.email, date);
  };

  async function getRecordsInRange() {
    toast({
      description: `Fitur ini masih dikembangin, mohon ditunggu ya 😊`,
      duration: 2000,
    });
    return;
    try {
      const recordsRef = collection(db, `mutabaah/${email}/records`); // Reference to records subcollection

      const startDate = moment().subtract(7, "d").format("yyyy-MM-dd"); // "2025-02-01"; // Start date
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
            <div key={index} className="text-center font-bold w-full">
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
              <span className={"text-sm min-h-10"}>
                {date.getMonth() === currentDate.getMonth() &&
                finishedDates.includes(moment(date).format("YYYY-MM-DD"))
                  ? "✅"
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
      <div className="mt-4">
        <span className="text-xl font-bold">Riwayat Mutabaah</span>
        <p className="text-gray-600">
          Mutabaah yang pernah diisi pada beberapa hari terakhir
        </p>
      </div>
      <div className="flex justify-between items-center my-4">
        {/* <div className=" flex justify-center items-center text-center bg-bg rounded-base border border-black">
          <ChevronLeftIcon className="h-5 w-5" />
        </div> */}
        <div className="w-full mx-1 grid grid-cols-7 gap-1 py-2 rounded-base text-black">
          {currentWeek.map((date, index) => (
            <div
              key={index}
              className={
                moment(date).format("YYYY-MM-DD") ===
                moment(selectedDate).format("YYYY-MM-DD")
                  ? "flex flex-col items-center my-1 bg-main rounded-base"
                  : "flex flex-col justify-center items-center my-1 text-gray-600"
              }
              onClick={() => handleDateClickWeek(date)}
            >
              <span className="caprasimo text-2xl">
                {moment(date).format("DD")}
              </span>
              <span>{dayInAWeek[index]}</span>
            </div>
          ))}
        </div>
        {/* <div className=" flex justify-center items-center text-center bg-bg rounded-base border border-black">
          <ChevronRightIcon className="h-5 w-5" />
        </div> */}
      </div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          {!isEmpty ? (
            <Card className="bg-bg">
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between">
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-bold">
                        {dayInAWeekFull[moment(selectedDate).day()]},{" "}
                        {moment(selectedDate).format("DD MMMM YYYY")}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {user.displayName} ({user.email})
                      </span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className=" my-6">
                  <Accordion
                    className="w-full lg:w-[unset]"
                    type="single"
                    collapsible
                    defaultValue="item-1"
                  >
                    <AccordionItem
                      className="lg:w-[500px] max-w-full"
                      value="item-1"
                    >
                      <AccordionTrigger>Solat Wajib</AccordionTrigger>
                      <AccordionContent>
                        <div>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold underline">
                                Solat Wajib
                              </span>
                              <ul>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.subuh ? "✅" : "❌"}
                                  </span>
                                  Solat Subuh{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.dhuhur ? "✅" : "❌"}
                                  </span>
                                  Solat Dhuhur{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.ashar ? "✅" : "❌"}
                                  </span>
                                  Solat Ashar{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.magrib ? "✅" : "❌"}
                                  </span>
                                  Solat Maghrib{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.isya ? "✅" : "❌"}
                                  </span>
                                  Solat Isya{" "}
                                </li>
                              </ul>
                            </div>
                            <div className="w-24">
                              <CircularProgressbar
                                value={percentageWajib}
                                text={`${percentageWajib}%`}
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                  backgroundColor: "#FFAB5B",
                                  textColor: "#000",
                                  pathColor: "#fff",
                                  trailColor: "transparent",
                                })}
                              />
                            </div>
                          </div>
                          <hr className="my-4" />
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold underline">
                                Solat Rawatib
                              </span>
                              <ul>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.subuh_rawatib
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  Solat Rawatib Subuh{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.dhuhur_rawatib
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  Solat Rawatib Dhuhur{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.ashar_rawatib
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  Solat Rawatib Ashar{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.magrib_rawatib
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  Solat Rawatib Maghrib{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.isya_rawatib
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  Solat Rawatib Isya{" "}
                                </li>
                              </ul>
                            </div>
                            <div className="w-24">
                              <CircularProgressbar
                                value={percentageRawatib}
                                text={`${percentageRawatib}%`}
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                  backgroundColor: "#FFAB5B",
                                  textColor: "#000",
                                  pathColor: "#fff",
                                  trailColor: "transparent",
                                })}
                              />
                            </div>
                          </div>
                          <hr className="my-4" />
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold underline">
                                Solat Berjamaah
                              </span>
                              <ul>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.subuh_jamaah
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  Solat Subuh Berjamaah{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.dhuhur_jamaah
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  Solat Dhuhur Berjamaah{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.ashar_jamaah
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  Solat Ashar Berjamaah{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.magrib_jamaah
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  Solat Maghrib Berjamaah{" "}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    {selectedDateRecords.isya_jamaah
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  Solat Isya Berjamaah{" "}
                                </li>
                              </ul>
                            </div>
                            <div className="w-24">
                              <CircularProgressbar
                                value={percentageJamaah}
                                text={`${percentageJamaah}%`}
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                  backgroundColor: "#FFAB5B",
                                  textColor: "#000",
                                  pathColor: "#fff",
                                  trailColor: "transparent",
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="my-6">
                  <Accordion
                    className="w-full lg:w-[unset]"
                    type="single"
                    collapsible
                    defaultValue="item-1"
                  >
                    <AccordionItem
                      className="lg:w-[500px] max-w-full"
                      value="item-1"
                    >
                      <AccordionTrigger>Solat Sunnah</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex justify-between items-center">
                          <div>
                            <ul>
                              <li>
                                <span className="mr-2">
                                  {selectedDateRecords.qiyaamul_lail
                                    ? "✅"
                                    : "❌"}
                                </span>
                                Qiyamul Lail{" "}
                              </li>
                              <li>
                                <span className="mr-2">
                                  {selectedDateRecords.dhuha ? "✅" : "❌"}
                                </span>
                                Solat Dhuha{" "}
                              </li>
                              <li>
                                <span className="mr-2">
                                  {selectedDateRecords.tarawih ? "✅" : "❌"}
                                </span>
                                Solat Tarawih{" "}
                              </li>
                            </ul>
                          </div>
                          <div className="w-24">
                            <CircularProgressbar
                              value={percentageSunnah}
                              text={`${percentageSunnah}%`}
                              background
                              backgroundPadding={6}
                              styles={buildStyles({
                                backgroundColor: "#FFAB5B",
                                textColor: "#000",
                                pathColor: "#fff",
                                trailColor: "transparent",
                              })}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="my-6">
                  <Accordion
                    className="w-full lg:w-[unset]"
                    type="single"
                    collapsible
                    defaultValue="item-1"
                  >
                    <AccordionItem
                      className="lg:w-[500px] max-w-full"
                      value="item-1"
                    >
                      <AccordionTrigger>Ibadah Lainnya</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex justify-between items-center">
                          <div>
                            <ul>
                              <li>
                                <span className="mr-2">
                                  {selectedDateRecords.infaq ? "✅" : "❌"}
                                </span>
                                Infaq
                              </li>
                              <li>
                                <span className="mr-2">
                                  {selectedDateRecords.tilawah ? "✅" : "❌"}
                                </span>
                                Tilawah
                              </li>
                              <li>
                                <span className="mr-2">
                                  {selectedDateRecords.dzikir_pagi
                                    ? "✅"
                                    : "❌"}
                                </span>
                                Dzikir Pagi
                              </li>
                              <li>
                                <span className="mr-2">
                                  {selectedDateRecords.dzikir_petang
                                    ? "✅"
                                    : "❌"}
                                </span>
                                Dzikir Petang
                              </li>
                            </ul>
                          </div>
                          <div className="w-24">
                            <CircularProgressbar
                              value={percentageLainnya}
                              text={`${percentageLainnya}%`}
                              background
                              backgroundPadding={6}
                              styles={buildStyles({
                                backgroundColor: "#FFAB5B",
                                textColor: "#000",
                                pathColor: "#fff",
                                trailColor: "transparent",
                              })}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div>
                  <Button onClick={() => handleDateClick(selectedDate)} className="bg-white">
                    <SquarePen />
                    Edit Mutabaah
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col justify-center items-center my-10">
              <span className="text-gray-600 my-2">
                Belum ada data mutabaah
              </span>
              <Button
                onClick={() =>
                  router.push(`/mutabaah/${moment().format("yyyy-MM-DD")}`)
                }
              >
                Isi Mutabaah
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 pb-20">
        <span className="text-xl font-bold">Tabel Mutabaah</span>
        <p className="text-gray-600">
          Lihat mutabaah yang sudah diisi pada beberapa hari terakhir
        </p>
        <Button onClick={() => getRecordsInRange()} className="my-2">
          Tampilkan
        </Button>
      </div>
      <div className="my-4 pb-4 overflow-x-auto hidden" id="mutabaah-table">
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
                      {record?.hasOwnProperty("subuh")
                        ? record?.subuh
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("subuh_rawatib")
                        ? record?.subuh_rawatib
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("subuh_jamaah")
                        ? record?.subuh_jamaah
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("dhuhur")
                        ? record?.dhuhur
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("dhuhur_rawatib")
                        ? record?.dhuhur_rawatib
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("dhuhur_jamaah")
                        ? record?.dhuhur_jamaah
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("ashar")
                        ? record?.ashar
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("ashar_rawatib")
                        ? record?.ashar_rawatib
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("ashar_jamaah")
                        ? record?.ashar_jamaah
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("maghrib")
                        ? record?.maghrib
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("maghrib_rawatib")
                        ? record?.maghrib_rawatib
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("maghrib_jamaah")
                        ? record?.maghrib_jamaah
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("isya")
                        ? record?.isya
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("isya_rawatib")
                        ? record?.isya_rawatib
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("isya_jamaah")
                        ? record?.isya_jamaah
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("qiyaamul_lail")
                        ? record?.qiyaamul_lail
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("dhuha")
                        ? record?.dhuha
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("tarawih")
                        ? record?.tarawih
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("infaq")
                        ? record?.infaq
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("tilawah")
                        ? record?.tilawah
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("puasa_sunnah")
                        ? record?.puasa_sunnah
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("dzikir_pagi")
                        ? record?.dzikir_pagi
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
                      {record?.hasOwnProperty("dzikir_petang")
                        ? record?.dzikir_petang
                          ? "✅"
                          : "❌"
                        : "⛔️"}
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
