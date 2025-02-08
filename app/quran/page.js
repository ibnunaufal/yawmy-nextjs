"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import SurahList from "../SurahList";
import JuzList from "../JuzList";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import HeadComponent from "@/components/HeadComponent";

export default function Quran() {
  const router = useRouter();

  const [lastOpenedPage, setLastOpenedPage] = useState(0);
  const [lastSuratOpened, setLastSuratOpened] = useState(0);
  const [lastJuzOpened, setLastJuzOpened] = useState(0);

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
    SurahList.map((surah) => {
      if (surah.page <= num && surah.page_end >= num) {
        setLastSuratOpened(surah.latin);
      }
    });
  }, []);

  return (
    <div className="h-screen py-2">
      <title>Quran Reader | Yawmy</title>
        <HeadComponent title="Quran" />
      <div className="">
        <div>
          <h1>Quran</h1>
          <p>Welcome to the Quran page</p>
        </div>
        {lastOpenedPage && lastOpenedPage !== 0 && (
          <div className=" flex justify-between rounded-md bg-card-gradient p-4 my-5 shadow-md shadow-foreground/20">
            <div>
              <div className="flex mt-1 mb-3">
                <div className="flex items-center mr-2">
                  <svg
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_20_93)">
                      <path
                        d="M24.4934 4.21758L21.5161 5.40539L20.9341 4.07812L19.6132 4.22086C18.2878 4.36354 17.1335 4.84118 16.0298 5.71044C14.9258 4.83905 13.7797 4.36184 12.4724 4.2208L11.151 4.07812L10.5695 5.40539L7.59156 4.21758L2.00537 17.2173L5.34102 18.486V27.9215L16.0291 22.5918L26.7172 27.9215V18.4947L30.0802 17.2177L24.4934 4.21758ZM6.98537 25.2681V19.1119L13.988 21.7762L6.98537 25.2681ZM15.207 20.4844L4.19121 16.2933L8.47081 6.33415L9.90998 6.90864L6.23398 15.2935L15.207 18.7352L15.207 20.4844ZM15.207 16.9778L9.01444 14.6027C10.0723 14.0635 11.3286 13.9936 12.4752 14.4589L15.207 15.6516L15.207 16.9778ZM15.207 13.8614L13.1066 12.9446C11.8054 12.4133 10.4018 12.3767 9.128 12.7856L12.1742 5.83835C12.3434 5.88134 13.6483 5.83988 15.207 7.159V13.8614ZM16.8512 7.16004C18.3807 5.87215 19.8246 5.86039 19.9114 5.83841L22.945 12.7587C21.7447 12.3772 20.4396 12.4286 19.1752 12.9446L16.8512 13.8937V7.16004ZM16.8512 15.6659L19.7978 14.4626C20.912 14.0073 22.0747 14.0669 23.0838 14.5961L16.8512 16.9795V15.6659ZM25.0728 25.2681L18.0719 21.7768L25.0728 19.1188V25.2681ZM16.8512 20.4855V18.7356L25.8516 15.2941L22.175 6.90864L23.6144 6.3342L27.894 16.2929L16.8512 20.4855Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_20_93">
                        <rect
                          width="28.0749"
                          height="28"
                          fill="white"
                          transform="translate(2.00537 2)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Terakhir dibaca</h3>
              </div>
              <h3 className="text-lg font-bold"> {lastSuratOpened} </h3>
              <span className="text-sm">
                Juz {lastJuzOpened}, Hal {lastOpenedPage}{" "}
              </span>

              <div>
                <button
                  className="bg-background shadow-md rounded-md py-1 px-2 mt-2 text-xs flex items-center"
                  onClick={continueReading}
                >
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
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <Image
                className=""
                src="/ic_quran.svg"
                alt="icon quran"
                width={150}
                height={150}
              />
            </div>
          </div>
        )}
      </div>
      <div className="my-2">
        <TabGroup>
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
        </TabGroup>
      </div>
    </div>
  );
}
