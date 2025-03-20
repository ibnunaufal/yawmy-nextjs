import JuzList from "@/app/JuzList";
import SurahList from "@/app/SurahList";
import QuranPage from './QuranPage';

export async function generateMetadata({ params }) {
  const id = params?.id;
  if (!id) {
    return {
      title: "Quran Page",
      description: "Quran page",
    };
  }

  let juz = JuzList.find(juz => id >= juz.start.page && id <= juz.end.page)?.juz || "";

  let surrahArray = [];
  SurahList.forEach(surah => {
    if (id >= surah.page && id <= (surah.page_end || surah.page)) {
      surrahArray.push(surah.latin);
    }
  });

  let surah = surrahArray.join(", ");
  let desc = `Halaman ${id} | Juz ${juz} | Surah ${surah}`
  return {
    title: "Quran Page | Yawmy",
    description: desc,
  };
}

export default function Page({ params }) {
  return <QuranPage id={params.id} />;
}