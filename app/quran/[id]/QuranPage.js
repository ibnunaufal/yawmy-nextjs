"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { use, useEffect, useState } from "react";
import JuzList from "@/app/JuzList";
import SurahList from "@/app/SurahList";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  Search,
  Share,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const searchType = [
  { id: 1, name: "Berdasarkan Juz" },
  { id: 2, name: "Berdasarkan Nama Surah" },
  { id: 3, name: "Berdasarkan Halaman" },
];
export default function QuranPage({ id }) {
  // const { id } = use(params);
  // const currentPage = Number(id);

  let [isOpen, setIsOpen] = useState(false);
  let [selectedJuz, setSelectedJuz] = useState(1);
  let [selectedSurah, setSelectedSurah] = useState(1);
  let [currentPage, setCurrentPage] = useState(Number(id));
  let [selectedSearchType, setSelectedSearchType] = useState(searchType[0]);
  let [progressJuz, setProgressJuz] = useState(0);
  let [remainingJuzPage, setRemainingJuzPage] = useState(0);
  let [progressQuran, setProgressQuran] = useState(0);
  let [remainingQuranPage, setRemainingQuranPage] = useState(0);

  const router = useRouter();

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
    router.push("/quran");
  };

  const saveLastOpenedPageToLocalStorage = (value) => {
    localStorage.setItem("lastOpenedPage", value);
  };

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
        let firstPage = juz.start.page;
        let lastPage = juz.end.page;
        let currentPage = id;
        let totalPage = lastPage - firstPage;
        let currentPageInJuz = currentPage - firstPage;
        let progress = (currentPageInJuz / totalPage) * 100;
        setProgressJuz(progress);
        setRemainingJuzPage(totalPage - currentPageInJuz);
        setSelectedJuz(juz.juz);
      }
    });
    setProgressQuran((id / 604) * 100);
    setRemainingQuranPage(604 - id);

    let surahArray = [];
    SurahList.map((surah) => {
      if (id >= surah.page && id <= (surah.page_end || surah.page)) {
        surahArray.push(surah.latin);
      }
    });
    setSelectedSurah(surahArray.join(", "));
    saveLastOpenedPageToLocalStorage(id);
  }, []);

  return (
    <div className="h-screen py-2">
      <div className=" h-5/6">
        <img
          src={`https://quranimage.sgp1.cdn.digitaloceanspaces.com/QK_${getStringPage(
            id
          )}.webp`}
          alt={`Quran page ${getStringPage(id)}`}
          className="w-full h-full object-contain dark:invert"
        />
      </div>
      <div className=" h-1/6 mx-4 my-2">
        <div className="flex justify-between">
          <div>
            <Button onClick={handleGoHome} className="mr-2">
              <Home size={24} />
            </Button>
            <Drawer>
              <DrawerTrigger asChild>
                <Button>
                  <Menu size={24} />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-[300px]">
                  <DrawerHeader>
                    <DrawerTitle>Halaman {id}</DrawerTitle>
                  </DrawerHeader>
                  <div>
                    <div>
                      <span className="text-sm/6 font-light">Juz : </span>
                      <span className="text-sm/6">Juz {selectedJuz}</span>
                    </div>
                    <div>
                      <span className="text-sm/6 font-light">Surah : </span>
                      <span className="text-sm/6">{selectedSurah}</span>
                    </div>
                    <div className="my-2">
                      <span className="text-sm/6 font-light">
                        Menuju Akhir Juz Kurang <span>{remainingJuzPage}</span>{" "}
                        Halaman lagi{" "}
                      </span>
                      <Progress value={progressJuz} />
                    </div>
                    <div className="my-2">
                      <span className="text-sm/6 font-light">
                        Menuju Khatam Kurang <span>{remainingQuranPage}</span>{" "}
                        Halaman lagi{" "}
                      </span>
                      <Progress value={progressQuran} />
                    </div>
                    <div className="my-2">
                      <span className="text-sm/6">Navigasi</span>
                      <div className="mt-1">
                        <Button onClick={handleSearch} className="w-full">
                          <Search size={24} />
                          Pencarian
                        </Button>
                      </div>
                      <div className="mt-3">
                        <Button onClick={handleGoHome} className="w-full">
                          <Home size={24} />
                          Home
                        </Button>
                      </div>
                      <div className="mt-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="neutral" className="w-full">
                              <Share size={24} />
                              Bagikan
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div>
                              <span className="flex justify-center mb-2">
                                Bagikan melalui
                              </span>
                              <div className="flex justify-evenly p-1">
                                <WhatsappShareButton
                                  url={`https://yaw.my.id/quran/${id}`}
                                  title={`Quran Halaman ${id}`}
                                >
                                  <WhatsappIcon size={24} />
                                </WhatsappShareButton>
                                <TelegramShareButton
                                  url={`https://yaw.my.id/quran/${id}`}
                                  title={`Quran Halaman ${id}`}
                                >
                                  <TelegramIcon size={24} />
                                </TelegramShareButton>
                                <FacebookShareButton
                                  url={`https://yaw.my.id/quran/${id}`}
                                  quote={`Quran Halaman ${id}`}
                                >
                                  <FacebookIcon size={24} />
                                </FacebookShareButton>
                                <TwitterShareButton
                                  url={`https://yaw.my.id/quran/${id}`}
                                  title={`Quran Halaman ${id}`}
                                >
                                  <TwitterIcon size={24} />
                                </TwitterShareButton>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="h-9"></div>
                  </div>
                  {/* <DrawerFooter className="grid grid-cols-2">
                  <Button variant="noShadow">Submit</Button>
                  <DrawerClose asChild>
                    <Button className="bg-bw text-text" variant="noShadow">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter> */}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <div>
            <Button onClick={handleNextPage} className="mr-2">
              <ChevronLeft size={24} />
            </Button>

            <Button onClick={handlePrevPage}>
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
