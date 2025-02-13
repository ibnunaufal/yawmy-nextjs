"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SurahList from "../SurahList";
import JuzList from "../JuzList";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HeadComponent from "@/components/HeadComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";

export default function Quran() {
  const router = useRouter();

  const [lastOpenedPage, setLastOpenedPage] = useState(0);
  const [lastSuratOpened, setLastSuratOpened] = useState(0);
  const [lastJuzOpened, setLastJuzOpened] = useState(0);
  const [filteredList, setFilteredList] = useState(SurahList);

  const continueReading = () => {
    if (!lastOpenedPage) {
      return;
    }
    router.push(`/quran/${lastOpenedPage}`);
  };

  useEffect(() => {
    const lastOpenedPage = localStorage.getItem("lastOpenedPage");
    setLastOpenedPage(lastOpenedPage);
    if (!lastOpenedPage) {
      return;
    }
    let num = Number(lastOpenedPage);
    JuzList.map((juz) => {
      if (juz.start.page <= num && juz.end.page >= num) {
        setLastJuzOpened(juz.juz);
      }
    });
    console.log(lastOpenedPage)
    setFilteredList(SurahList);
    SurahList.map((surah) => {
      if (surah.page <= num && surah.page_end >= num) {
        setLastSuratOpened(surah.latin);
      }
    });
  }, []);

  const handleOnChangeInput = (value) => {
    if (value === "") {
      setFilteredList(SurahList);
      return;
    }
    const filtered = SurahList.filter((surah) =>
      surah.transliteration.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filtered);
  }

  return (
    <div className="h-screen py-2">
      <title>Quran Reader | Yawmy</title>
      <HeadComponent title="Quran Reader" />
      <div className="">
        {lastOpenedPage && lastOpenedPage !== 0 && (
          <div className=" flex justify-between rounded-base bg-bg border-border border-2 p-4 my-5 shadow-md shadow-foreground/20">
            <div>
              <div className="flex mt-1">
                <div className="flex items-center mr-1">
                  <History size={18} />
                </div>
                <h3 className="text-sm">Terakhir dibaca</h3>
              </div>
              <h3 className="text-lg font-bold"> {lastSuratOpened} </h3>
              <span className="text-sm">
                Juz {lastJuzOpened}, Hal {lastOpenedPage}{" "}
              </span>
            </div>
            <div className="flex items-center">
            <Button onClick={continueReading}>
                <span className="">Lanjutkan membaca</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
            </div>
          </div>
        )}
      </div>
      <div className="my-2">
        <Tabs defaultValue="surah" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="surah">Surah</TabsTrigger>
            <TabsTrigger value="juz">Juz</TabsTrigger>
          </TabsList>
          <TabsContent value="surah">
            <Card>
              <CardHeader>
                <CardTitle>Surah</CardTitle>
                <CardDescription>
                  <div className="">
                    <span className="mt-2">Daftar Surah dalam Al-Quran</span>
                    <Input placeholder="Cari Surah" className="mt-2" type="text" onChange={(e) => handleOnChangeInput(e.target.value)} />
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ScrollArea className="h-96">
                  {filteredList.map((surah) => (
                    <div
                      key={surah.id}
                      className="bg-bg rounded-base border-2 my-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                      onClick={() => router.push(`/quran/${surah.page}`)}
                    >
                      <div className="flex justify-between py-2 pr-4 ">
                        <div className="flex">
                          <div className="flex mx-4 px-2 items-center">
                            <p className="text-textColorPrimary font-bold text-2xl">
                              {surah.id}
                            </p>
                          </div>
                          <div>
                            <p className="text-lg text-textColorPrimary font-bold">
                              {surah.transliteration}
                            </p>
                            <p className="text-textColorSecondary">
                              {surah.location} • {surah.num_ayah} Ayat{" "}
                            </p>
                            <p className="text-textColorSecondary">
                              {surah.translation}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <p className="text-2xl font-bold">{surah.arabic}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="juz">
            <Card>
              <CardHeader>
                <CardTitle>Juz</CardTitle>
                <CardDescription>
                  <div className="flex justify-between">
                    <span>Daftar Juz dalam Al-Quran</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ScrollArea className="h-96">
                  {JuzList.map((juz) => (
                    <div
                      key={juz.id}
                      className="bg-bg rounded-base border-2 my-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                      onClick={() => router.push(`/quran/${juz.start.page}`)}
                    >
                      <div className="flex justify-between py-2 pr-4 ">
                      <div className="flex">
                    <div className="flex mx-4 px-2 items-center">
                      <p className="text-textColorPrimary font-bold text-2xl">
                        {juz.juz}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg text-textColorPrimary">
                        Juz {juz.juz}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold">{juz.firstWord}</p>
                  </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* <TabGroup>
          <TabList className="flex justify-between">
            <div>
              <p className="text-lg font-bold">Pencarian</p>
            </div>
            <div>
              <Tab
                key={1}
                className="rounded-md py-1 px-5 text-sm/6 font-semibold text-white focus:outline-none hover:bg-white/10 data-[selected]:bg-foreground"
              >
                Surah
              </Tab>
              <Tab
                key={2}
                className="rounded-md py-1 px-5 text-sm/6 font-semibold text-white focus:outline-none hover:bg-white/10 data-[selected]:bg-foreground"
              >
                Juz
              </Tab>
            </div>
          </TabList>
          <TabPanels>
            <TabPanel key={"surah"}>
              <p className="text-md text-textColorSecondary">
                Berdasarkan Surah
              </p>
              {SurahList.map((surah) => (
                <div
                  key={surah.number}
                  className="flex justify-between my-3 py-2 pr-4 rounded-md bg-violet-500/40"
                  onClick={() => router.push(`/quran/${surah.page}`)}
                >
                  <div className="flex">
                    <div className="flex mx-4 px-2 items-center">
                      <p className="text-textColorPrimary font-bold text-2xl">
                        {surah.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg text-textColorPrimary font-bold">
                        {surah.transliteration}
                      </p>
                      <p className="text-textColorSecondary">
                        {surah.location} • {surah.num_ayah} Ayat{" "}
                      </p>
                      <p className="text-textColorSecondary">
                        {surah.translation}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold">{surah.arabic}</p>
                  </div>
                </div>
              ))}
            </TabPanel>
            <TabPanel key={"juz"}>
              <p className="text-md text-textColorSecondary">Berdasarkan Juz</p>
              {JuzList.map((juz) => (
                <div
                  key={juz.juz}
                  className="flex justify-between my-3 py-2 pr-4 rounded-md bg-violet-500/40"
                  onClick={() => router.push(`/quran/${juz.start.page}`)}
                >
                  <div className="flex">
                    <div className="flex mx-4 px-2 items-center">
                      <p className="text-textColorPrimary font-bold text-2xl">
                        {juz.juz}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg text-textColorPrimary">
                        Juz {juz.juz}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold">{juz.firstWord}</p>
                  </div>
                </div>
              ))}
            </TabPanel>
          </TabPanels>
        </TabGroup> */}
      </div>
    </div>
  );
}
