"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { use, useEffect, useState } from "react";
import JuzList from "@/app/JuzList";
import SurahList from "@/app/SurahList";
import { ChevronLeft, ChevronRight, Home, Search } from 'lucide-react';

const searchType = [
  { id: 1, name: "Berdasarkan Juz" },
  { id: 2, name: "Berdasarkan Nama Surah" },
  { id: 3, name: "Berdasarkan Halaman" },
];

export default function QuranPage({ params }) {
  const { id } = use(params);
  // const currentPage = Number(id);

  let [isOpen, setIsOpen] = useState(false);
  let [selectedJuz, setSelectedJuz] = useState(1);
  let [selectedSurah, setSelectedSurah] = useState(1);
  let [currentPage, setCurrentPage] = useState(Number(id));
  let [selectedSearchType, setSelectedSearchType] = useState(searchType[0]);

  const router = useRouter();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handlePrevPage = () => {
    let num = Number(id);
    if (num > 1) {
      let newId = num - 1;
      router.push(`/quran/${getStringPage(newId)}`);
    }
  };

  const handleNextPage = () => {
    let num = Number(id);
    if (num < 604) {
      let newId = num + 1;
      router.push(`/quran/${getStringPage(newId)}`);
    }
  };

  const goToPage = (page) => {
    let newId = Number(page);
    router.push(`/quran/${getStringPage(newId)}`);
  };

  const getStringPage = (page) => {
    let num = Number(page);
    if (num < 10) {
      return `00${num}`;
    } else if (num < 100) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleSearch = () => {
    router.push("/quran")
  };

  const saveLastOpenedPageToLocalStorage = (value) => {
    localStorage.setItem("lastOpenedPage", value);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [id]);

  useEffect(() => {
    // get juz-table-list.json from public folder then save it into a variable
    JuzList.map((juz) => {
      if (id >= juz.start.page && id <= juz.end.page) {
        setSelectedJuz(juz.start.page);
      }
    });
    SurahList.map((surah) => {
      if (id >= surah.page && id <= (surah.page_end || surah.page)) {
        setSelectedSurah(surah.page);
      }
    });
    saveLastOpenedPageToLocalStorage(id);
  }, []);

  return (
    <div className="h-screen py-2">
      <div className=" h-5/6">
        <img
          src={`https://quranimage.sgp1.digitaloceanspaces.com/QK_${getStringPage(
            id
          )}.webp`}
          alt={`Quran page ${getStringPage(id)}`}
          className="w-full h-full object-contain dark:invert"
        />
      </div>
      <div className=" h-1/6 mx-4 my-2">
        <div className="flex justify-center my-2 hidden">
          <select
            value={selectedJuz}
            onChange={(e) => goToPage(e.target.value)}
            className="relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white dark:bg-black/5 focus:outline-none"
          >
            {JuzList.map((juz) => (
              <option key={juz.id} value={juz.start.page}>
                Juz {juz.juz}
              </option>
            ))}
          </select>

          <select
            value={selectedSurah}
            onChange={(e) => goToPage(e.target.value)}
            className="relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white dark:bg-black/5 focus:outline-none"
          >
            {SurahList.map((surah) => (
              <option key={surah.id} value={surah.page}>
                {surah.latin}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div>
            <Button
              onClick={handleGoHome}
              className="mr-2"
            >
              <Home size={24} />
            </Button>
            <Button
              onClick={handleSearch}
            >
             <Search size={24} />
            </Button>
          </div>
          <div className="flex items-center">
            <span className="caprasimo text-xl underline">
              Quran
            </span>
          </div>
          <div>
            <Button
              onClick={handleNextPage}
              className="mr-2"
            >
              <ChevronLeft size={24} />
            </Button>

            <Button
              onClick={handlePrevPage}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
