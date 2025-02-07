"use client";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { use, useEffect, useState } from "react";
import JuzList from "@/app/JuzList";
import SurahList from "@/app/SurahList";

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
              className="rounded-md p-2 m-1 text-sm/6 font-semibold text-white focus:outline-none hover:bg-violet-500/50 bg-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </Button>
            <Button
              onClick={handleSearch}
              className="rounded-md p-2 m-1 text-sm/6 font-semibold text-white focus:outline-none hover:bg-violet-500/50 bg-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
          <div>
            <Button
              onClick={handlePrevPage}
              className="rounded-md p-2 m-1 text-sm/6 font-semibold text-white focus:outline-none hover:bg-violet-500/50 bg-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
              </svg>
            </Button>

            <Button
              onClick={handleNextPage}
              className="rounded-md p-2 m-1 text-sm/6 font-semibold text-white focus:outline-none hover:bg-violet-500/50 bg-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
