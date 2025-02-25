"use client";
import HeadComponent from "@/components/HeadComponent";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlMatsuratPage() {
  const router = useRouter();

  const [zikir, setZikir] = useState("sughro");
  const [isVisible, setIsVisible] = useState(false);

  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-screen py-2">
      <title>Matsurat | Yawmy</title>
      <HeadComponent title="Matsurat" />
      <div className="bg-bg rounded-base p-4 mb-4 border-2 border-black">
        <div className="">
          <h1 className="text-2xl font-bold">Al Matsurat</h1>
          <p className="text-sm">
            Al-Matsurat adalah kumpulan dzikir yang disusun oleh Imam Hasan
            Al-Banna, terdiri dari ayat-ayat Al-Qur’an dan hadits Nabi Muhammad
            shallallahu 'alaihi wasallam. Dzikir ini dianjurkan untuk diamalkan
            setiap pagi dan petang sebagai bentuk mengingat Allah dan memohon
            perlindungan serta keberkahan dalam menjalani hari. Al-Matsurat
            terbagi menjadi dua jenis, yaitu Kubra yang lebih panjang dan Sugra
            yang lebih ringkas, sehingga dapat disesuaikan dengan kebutuhan
            pembacanya. Dengan kemudahan dalam bentuknya yang praktis,
            Al-Matsurat menjadi pedoman dzikir harian bagi banyak kaum Muslimin.{" "}
          </p>
        </div>
      </div>
      <div className="flex justify-between bg-bg border-2 border-black rounded-base p-2 mb-4">
        <div
          className={
            zikir === "sughro"
              ? "bg-main font-bold rounded-base p-2 border-black border-2 w-full text-center"
              : "w-full text-center text-black rounded-base p-2"
          }
          onClick={() => setZikir("sughro")}
        >
          Sughro
        </div>
        <div
          className={
            zikir === "kubro"
              ? "bg-main font-bold rounded-base p-2 border-black border-2 w-full text-center"
              : "w-full text-center text-black rounded-base p-2"
          }
          onClick={() => setZikir("kubro")}
        >
          Kubro
        </div>
      </div>
      <div className="pb-8">
        {zikir === "sughro" ? (
          <div>
            <h2 className="text-xl font-bold">Al-Matsurat Sughro</h2>
            <div className="zikir-block">
              <div align="center">
                <p lang="ar" className="text-quran taawudz">
                  أَعُوذُ بِاللَّهِ السَّمِيعِ الْعَلِيمِ مِنَ الشَّيْطَانِ
                  الرَّجِيمِ
                </p>
                <p className="taawudz-translate">
                  {" "}
                  Aku berlindung kepada Allah yang Maha Mendengar lagi Maha
                  Mengetahui dari godaan syetan yang terkutuk.
                </p>
              </div>

              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Fatihah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ
                  </div>
                  <div className="text-justify text-translate">
                    Segala puji bagi Allah, Tuhan semesta alam
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-justify text-translate">
                    Maha Pemurah lagi Maha Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    مَٰلِكِ يَوۡمِ ٱلدِّينِ
                  </div>
                  <div className="text-justify text-translate">
                    Yang menguasai hari pembalasan
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 5</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ
                  </div>
                  <div className="text-justify text-translate">
                    Hanya kepada Engkaulah kami menyembah dan hanya kepada
                    Engkaulah kami mohon pertolongan
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 6</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ
                  </div>
                  <div className="text-justify text-translate">
                    Tunjukilah kami jalan yang lurus
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 7</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ
                    عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ
                  </div>
                  <div className="text-justify text-translate">
                    (yaitu) jalan orang-orang yang telah Engkau anugerahkan
                    nikmat kepada mereka, bukan (jalan) mereka yang dimurkai dan
                    bukan (pula jalan) mereka yang sesat
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Baqarah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    الٓمٓ
                  </div>
                  <div className="text-justify text-translate">
                    Alif Laam Miim
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ
                  </div>
                  <div className="text-justify text-translate">
                    Kitab (Al Qur&#039;an) ini tidak ada keraguan padanya;
                    petunjuk bagi mereka yang bertakwa
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ
                    وَمِمَّا رَزَقۡنَٰهُمۡ يُنفِقُونَ
                  </div>
                  <div className="text-justify text-translate">
                    (yaitu) mereka yang beriman kepada yang gaib, yang
                    mendirikan shalat dan menafkahkan sebahagian rezki yang Kami
                    anugerahkan kepada mereka
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَٱلَّذِينَ يُؤۡمِنُونَ بِمَآ أُنزِلَ إِلَيۡكَ وَمَآ
                    أُنزِلَ مِن قَبۡلِكَ وَبِٱلۡأٓخِرَةِ هُمۡ يُوقِنُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan mereka yang beriman kepada Kitab (AlQur&#039;an) yang
                    telah diturunkan kepadamu dan Kitab-kitab yang telah
                    diturunkan sebelummu, serta mereka yakin akan adanya
                    (kehidupan) akhirat
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 5</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    أُوْلَٰٓئِكَ عَلَىٰ هُدٗى مِّن رَّبِّهِمۡۖ وَأُوْلَٰٓئِكَ
                    هُمُ ٱلۡمُفۡلِحُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Mereka itulah yang tetap mendapat petunjuk dari Tuhan
                    mereka, dan merekalah orang-orang yang beruntung
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Baqarah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 255</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلۡحَيُّ ٱلۡقَيُّومُۚ لَا
                    تَأۡخُذُهُۥ سِنَةٞ وَلَا نَوۡمٞۚ لَّهُۥ مَا فِي
                    ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلۡأَرۡضِۗ مَن ذَا ٱلَّذِي يَشۡفَعُ
                    عِندَهُۥٓ إِلَّا بِإِذۡنِهِۦۚ يَعۡلَمُ مَا بَيۡنَ
                    أَيۡدِيهِمۡ وَمَا خَلۡفَهُمۡۖ وَلَا يُحِيطُونَ بِشَيۡءٖ
                    مِّنۡ عِلۡمِهِۦٓ إِلَّا بِمَا شَآءَۚ وَسِعَ كُرۡسِيُّهُ
                    ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضَۖ وَلَايَئُودُهُۥ حِفۡظُهُمَاۚ
                    وَهُوَ ٱلۡعَلِيُّ ٱلۡعَظِيمُ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia
                    Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya);
                    tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di
                    langit dan di bumi. Tiada yang dapat memberi syafaat di sisi
                    Allah tanpa izin-Nya. Allah mengetahui apa-apa yang di
                    hadapan mereka dan di belakang mereka, dan mereka tidak
                    mengetahui apa-apa dari ilmu Allah melainkan apa yang
                    dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan
                    Allah tidak merasa berat memelihara keduanya, dan Allah Maha
                    Tinggi lagi Maha Besar
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Baqarah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 256</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    لَآ إِكۡرَاهَ فِي ٱلدِّينِۖ قَد تَّبَيَّنَ ٱلرُّشۡدُ مِنَ
                    ٱلۡغَيِّۚ فَمَن يَكۡفُرۡ بِٱلطَّٰغُوتِ وَيُؤۡمِنۢ بِٱللَّهِ
                    فَقَدِ ٱسۡتَمۡسَكَ بِٱلۡعُرۡوَةِ ٱلۡوُثۡقَىٰ لَا ٱنفِصَامَ
                    لَهَاۗ وَٱللَّهُ سَمِيعٌ عَلِيمٌ
                  </div>
                  <div className="text-justify text-translate">
                    Tidak ada paksaan untuk (memasuki) agama (Islam);
                    sesungguhnya telah jelas jalan yang benar daripada jalan
                    yang sesat. Karena itu barang siapa yang ingkar kepada
                    Thaghut dan beriman kepada Allah, maka sesungguhnya ia telah
                    berpegang kepada buhu tali yang amat kuat yang tidak akan
                    putus. Dan Allah Maha Mendengar lagi Maha Mengetahui.
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 257</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱللَّهُ وَلِيُّ ٱلَّذِينَ ءَامَنُواْ يُخۡرِجُهُم مِّنَ
                    ٱلظُّلُمَٰتِ إِلَى ٱلنُّورِۖ وَٱلَّذِينَ كَفَرُوٓاْ
                    أَوۡلِيَآؤُهُمُ ٱلطَّٰغُوتُ يُخۡرِجُونَهُم مِّنَ ٱلنُّورِ
                    إِلَى ٱلظُّلُمَٰتِۗ أُوْلَٰٓئِكَ أَصۡحَٰبُ ٱلنَّارِۖ هُمۡ
                    فِيهَا خَٰلِدُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Allah Pelindung orang-orang yang beriman; Dia mengeluarkan
                    mereka dari kegelapan (kekafiran) kepada cahaya (iman). Dan
                    orang-orang yang kafir, pelindung-pelindungnya ialah setan,
                    yang mengeluarkan mereka dari cahaya kepada kegelapan
                    (kekafiran). Mereka itu adalah penghuni neraka; mereka kekal
                    di dalamnya
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Baqarah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 284</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    لِّلَّهِ مَا فِي ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلۡأَرۡضِۗ وَإِن
                    تُبۡدُواْ مَا فِيٓ أَنفُسِكُمۡ أَوۡ تُخۡفُوهُ يُحَاسِبۡكُم
                    بِهِ ٱللَّهُۖ فَيَغۡفِرُ لِمَن يَشَآءُ وَيُعَذِّبُ مَن
                    يَشَآءُۗ وَٱللَّهُ عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٌ
                  </div>
                  <div className="text-justify text-translate">
                    Kepunyaan Allah-lah segala apa yang ada di langit dan apa
                    yang ada di bumi. Dan jika kamu melahirkan apa yang ada di
                    dalam hatimu atau kamu menyembunyikannya, niscaya Allah akan
                    membuat perhitungan dengan kamu tentang perbuatanmu itu.
                    Maka Allah mengampuni siapa yang dikehendaki-Nya dan
                    menyiksa siapa yang dikehendaki-Nya; dan Allah Maha Kuasa
                    atas segala sesuatu
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 285</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيۡهِ مِن رَّبِّهِۦ
                    وَٱلۡمُؤۡمِنُونَۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَٰٓئِكَتِهِۦ
                    وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيۡنَ أَحَدٖ مِّن
                    رُّسُلِهِۦۚ وَقَالُواْ سَمِعۡنَا وَأَطَعۡنَاۖ غُفۡرَانَكَ
                    رَبَّنَا وَإِلَيۡكَ ٱلۡمَصِيرُ
                  </div>
                  <div className="text-justify text-translate">
                    Rasul telah beriman kepada Al Qur&#039;an yang diturunkan
                    kepadanya dari Tuhannya, demikian pula orang-orang yang
                    beriman. Semuanya beriman kepada Allah,
                    malaikat-malaikat-Nya, kitab-kitab-Nya dan rasul-rasul-Nya.
                    (Mereka mengatakan): &quot;Kami tidak membeda-bedakan antara
                    seseorang pun (dengan yang lain) dari rasul rasul-Nya&quot;,
                    dan mereka mengatakan: &quot;Kami dengar dan kami
                    taat&quot;. (Mereka berdoa):&quot;Ampunilah kami ya Tuhan
                    kami dan kepada Engkaulah tempat kembali&quot;
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 286</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    لَا يُكَلِّفُ ٱللَّهُ نَفۡسًا إِلَّا وُسۡعَهَاۚ لَهَا مَا
                    كَسَبَتۡ وَعَلَيۡهَا مَا ٱكۡتَسَبَتۡۗ رَبَّنَا لَا
                    تُؤَاخِذۡنَآ إِن نَّسِينَآ أَوۡ أَخۡطَأۡنَاۚ رَبَّنَا
                    وَلَا تَحۡمِلۡ عَلَيۡنَآ إِصۡرٗا كَمَا حَمَلۡتَهُۥ عَلَى
                    ٱلَّذِينَ مِن قَبۡلِنَاۚ رَبَّنَا وَلَا تُحَمِّلۡنَا مَا لَا
                    طَاقَةَ لَنَا بِهِۦۖ وَٱعۡفُ عَنَّا وَٱغۡفِرۡ لَنَا
                    وَٱرۡحَمۡنَآۚ أَنتَ مَوۡلَىٰنَا فَٱنصُرۡنَا عَلَى ٱلۡقَوۡمِ
                    ٱلۡكَٰفِرِينَ
                  </div>
                  <div className="text-justify text-translate">
                    Allah tidak membebani seseorang melainkan sesuai dengan
                    kesanggupannya. Ia mendapat pahala (dari kebajikan) yang
                    diusahakannya dan ia mendapat siksa (dari kejahatan) yang
                    dikerjakannya. (Mereka berdo`a): &quot;Ya Tuhan kami,
                    janganlah Engkau hukum kami jika kami lupa atau kami
                    tersalah. Ya Tuhan kami, janganlah Engkau bebankan kepada
                    kami beban yang berat sebagaimana Engkau bebankan kepada
                    orang-orang yang sebelum kami. Ya Tuhan kami, janganlah
                    Engkau pikulkan kepada kami apa yang tak sanggup kami
                    memikulnya. Beri maaflah kami; ampunilah kami; dan
                    rahmatilah kami. Engkaulah Penolong kami, maka tolonglah
                    kami terhadap kaum yang kafir&quot;
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Ikhlas - (3x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    قُلۡ هُوَ ٱللَّهُ أَحَدٌ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    Katakanlah: &quot;Dialah Allah, Yang Maha Esa
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱللَّهُ ٱلصَّمَدُ
                  </div>
                  <div className="text-justify text-translate">
                    Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ
                  </div>
                  <div className="text-justify text-translate">
                    Dia tiada beranak dan tidak pula diperanakkan
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    Dan tidak ada seorangpun yang setara dengan Dia
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Falaq - (3x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    1. Katakanlah: &quot;Aku berlindung kepada Tuhan Yang
                    Menguasai subuh,
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    مِن شَرِّ مَا خَلَقَ
                  </div>
                  <div className="text-justify text-translate">
                    Dari kejahatan makhluk-Nya
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan dari kejahatan malam apabila telah gelap gulita
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلۡعُقَدِ
                  </div>
                  <div className="text-justify text-translate">
                    Dan dari kejahatan wanita-wanita tukang sihir yang
                    menghembus pada buhul-buhul
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 5</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan dari kejahatan pendengki bila ia dengki
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">An-Naas - (3x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Katakanlah: Aku berlindung kepada Tuhan(yang memelihara dan
                    menguasai) manusia
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    مَلِكِ ٱلنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Raja manusia
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    إِلَٰهِ ٱلنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Sembahan manusia
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    مِن شَرِّ ٱلۡوَسۡوَاسِ ٱلۡخَنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Dari kejahatan (bisikan) setan yang biasa bersembunyi
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 5</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱلَّذِي يُوَسۡوِسُ فِي صُدُورِ ٱلنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Yang membisikkan (kejahatan) ke dalam dada manusia
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 6</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    مِنَ ٱلۡجِنَّةِ وَٱلنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Dari (golongan) jin dan manusia
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  أَصْبَحْنَا وَأَصْبَحَ (أَمْسَيْنَا وَأَمْسَى) الْمُلْكُ
                  لِلّهَِ وَالْحَمْدُ لِلّهَِ لاَ شَرِيكَ لَهُ، لاَ إِلهَ إِلَّا
                  هُوَ وَإِلَيْهِ النُّشُوْرُ (الْمَصِيْرُ)
                </p>
                <p className="text-justify">
                  {" "}
                  Kami berpagi hari (bersore hari) dan berpagi hari (bersore
                  hari) pula kerjaan milik Allah. Segala puji bagi Allah, tiada
                  sekutu bagi-Nya, tiada Tuhan melainkan Dia dan kepada-Nya
                  tempat kembali.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  أَصْبَحْنَا (أَمْسَيْنَا) عَلَى فِطْرَةِ اْلإِسْلاَمِ وَعَلَى
                  كَلِمَةِ اْلإِخْلاَصِ وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ
                  صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَعَلَى مِلَّةِ أَبِيْنَا
                  إِبْرَاهِيْمَ حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ
                  الْمُشْرِكِيْنَ
                </p>
                <p className="text-justify">
                  {" "}
                  Di waktu pagi (sore) kami memegang agama Islam, kalimat
                  ikhlas, agama Nabi kita Muhammad shallallahu ‘alaihi wa
                  sallam, dan agama ayah kami Ibrahim, yang berdiri di atas
                  jalan yang lurus, muslim dan tidak tergolong orang-orang
                  musyrik.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اللَّهُمَّ إِنِّي أَصْبَحْتُ (أَمْسَيتُ) مِنْكَ فِي نِعْمَةٍ
                  وَعَافِيَةٍ وَسِتْر فَأَتِمَّ عَلَيَّ نِعْمَتَكَ وَعَافِيَتَكَ
                  وَسِتْرَكَ فِي الدُّنْيَا وَالآخِرَة
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, sesungguhnya aku berpagi hari (bersore hari) dari-Mu
                  dalam kenikmatan, kesehatan dan perlindungan. Maka
                  sempurnakannlah untukku kenikmatan, kesehatan dan
                  perlindungan-Mu itu di dunia dan akhirat.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اللَّهُمَّ مَا أَصْبَحَ (أَمْسَ) بِيْ مِنْ نِعْمَةٍ أَوْ
                  بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيْكَ لَكَ
                  فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, kenikmatan yang aku atau salah seorang dari
                  makhluk-Mu berpagi hari (bersore hari) dengannya adalah
                  dari-Mu semata; tiada sekutu bagi-Mu. Maka bagi-Mu segala puji
                  dan rasa syukur.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  يَا رَبِّي لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ
                  وَلِعَظِيمِ سُلْطَانِكَ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Tuhanku, Segala puji bagiMu sebagaimana seyogyanya
                  kemuliaan wajahMu dan keagungan kekuasaanMu.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ
                  نَبِيًّا وَرَسُولًا
                </p>
                <p className="text-justify">
                  {" "}
                  Aku ridha Allah sebagai Rabb, Islam sebagai agama, dan
                  Muhammad sebagai Rasul.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا
                  نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ
                </p>
                <p className="text-justify">
                  {" "}
                  Maha Suci Allah dan Segala Puji bagiNya, sebanyak bilangan
                  makhlukNya, seridha diriNya, setimbangan ‘arsy-Nya, dan
                  sebanyak tinta dari kata-kataNya.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي
                  الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ
                </p>
                <p className="text-justify">
                  {" "}
                  Dengan nama Allah Yang bersama NamaNya sesuatu apa pun tidak
                  akan celaka baik di bumi dan di langit. Dialah Maha Medengar
                  lagi maha Mengetahui.
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا
                  نَعْلَمُهُ وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُه
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah sesungguhnya kami berlindung kepadaMu dari
                  menyekutukanMu dengan sesuatu yang kami ketahui, dan kami
                  memohon ampunanMu dari apa-apa yang tidak kami ketahui.
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ
                </p>
                <p className="text-justify">
                  {" "}
                  Aku berlindung dengan kalimat Allah yang sempurna dari
                  keburukan apa-apa yang Dia ciptakan.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الهَمِّ وَالْحَزَنِ
                  وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوْذُ بِكَ
                  مِنَ الْجُبْنِ وَالبُخْلِ وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ
                  الدَّيْنِ وَقَهْرِ الرِّجَالِ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, aku berlindung kepada-Mu dari rasa gelisah dan
                  sedih, dari kelemahan dan kemalasan, dari sifat pengecut dan
                  bakhil, dan dari lilitan hutang dan kesewenang-wenangan orang.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللَّهُمَّ عَافِنِي فِي بَدَنِي اَللَّهُمَّ عَافِنِي فِي
                  سَمْعِي اَللَّهُمَّ عَافِنِي فِي بَصَرِي
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah berikanlah kesehatan bagi badanku, bagi
                  pendengaranku, bagi penglihatanku.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الْكُفْرِ
                  وَالْفَقْرِوَأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِلاَ إِلهَ
                  إِلاَّ أَنْتَ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah sungguh aku berlindung kepadaMu dari kekufuran dan
                  kefaqiran, Ya Allah sungguh aku berlindung kepadaMu dari azab
                  kubur, tidak ada Ilah kecuali Engkau.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللّهُمَّ أَنْتَ رَبِّي لَا إلهَ إِلاَّ أَنْتَ خَلَقْتَنِي
                  وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا
                  اسْتَطَعْتُ أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوْءُ
                  لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ بِذَنْبِي فَاغْفِرْ لِي
                  فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, Engkau Tuhanku, tiada Tuhan kecuali Engkau. Engkau
                  ciptakan aku dan aku adalah hamba-Mu. Aku berada di atas
                  janjiMu, semampuku. Aku berlindung kepadaMu dari keburukan
                  perbuatanku. Aku mengakui banyaknya nikmat (yang Engkau
                  anugerahkan) kepadaku dan aku mengakui dosa-dosaku, maka
                  ampunilah aku. Karena sesungguhnya tiada yang mengampuni
                  dosa-dosa melainkan Engkau{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إلهَ إِلَّا هُوَ
                  الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ
                </p>
                <p className="text-justify">
                  {" "}
                  Aku memohon ampunan Allah Yang Tiada Tuhan melainkan Dia, Yang
                  Maha Hidup dan Maha Mengurus (makhluk-Nya).{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 10 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ
                  سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّــيْتَ عَـلَى سَيِّدِنَا
                  إِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا إِبْـرَاهِيْمَ وبَارِكْ
                  عَـلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ
                  كَمَا بَارَكْتَ عَـلَى سَيِّدِنَا إِبْرَاهِيْمَ وَعَــلَى آلِ
                  سَيـِّدِنَا إِبْـرَاهِيْمَ فِي الْعَالَمِيْنَ إِنَّكَ حَمِيْدٌ
                  مَجِيْدٌ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah berikanlah shalawat kepada Nabi Muhammad dan keluarga
                  Nabi Muhammad, sebagaimana telah Engkau berikan kepada Nabi
                  Ibrahim dan keluarga Nabi Ibrahim. Berikanlah barakah kepada
                  Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana telah
                  Engkau berikan kepada Nabi Ibrahim dan keluarga Nabi Ibrahim.
                  Di alam Engkaulah Yang Maha Terpuji lagi Maha Mulia.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 100 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا
                  اللَّهُ وَاللَّهُ أَكْبَرُ
                </p>
                <p className="text-justify">
                  {" "}
                  Maha Suci Allah, segala puji bagi Allah, tiada Tuhan melainkan
                  Allah dan Allah Maha Besar.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 10 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  لاَ إلهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ
                  الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ
                </p>
                <p className="text-justify">
                  {" "}
                  Tiada Tuhan melainkan Allah semata, yang tiada sekutu
                  bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia
                  berkuasa ata segala sesuatu.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَّا إلهَ
                  إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ
                </p>
                <p className="text-justify">
                  {" "}
                  Maha suci Engkau ya Allah, dan segala puji bagi-Mu. Aku
                  bersaksi bahwa tiada Tuhan melainkan Engkau, aku memohon
                  ampunan dan bertaubat kepada-Mu{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ عَبْدِكَ
                  وَرَسُوْلِكَ النَّبِيِّ الأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ
                  وَسَلِّمْ تَسْلِيْمًا عَدَدَ مَا أَحَاطَ بِهِ عِلْمُكَ وَخَطَّ
                  بِهِ قَلَمُكَ وَأَحْصَاهُ كِتَابُكَ، وَارْضَ اللَّهُمَّ عَنْ
                  سَادَاتِنَا أَبِيْ بَكْرٍ وَعُمَرَ وَعُثْمَانَ وَعَلِيْ،
                  وَعَنِ الصَّحَابَةِ أَجْمَعِيْنَ، وَعَنِ التَّابِعِيْنَ
                  وَتَابِعِيْهِمْ بِإِحْسَانٍ إِلَى يَوْمِ الدِّيْن سُبْحَانَ
                  رَبِّك رَبِّ العِزَّةِ عَمَّا يَصِفُوْنَ، وَسَلَامٌ عَلَى
                  المُرْسَلِيْنَ، وَالحَمْدُ لِلَّهِ رَبِّ العَالَمِيْنَ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah berikanlah shalawat kepada Nabi Muhammad; hamba-Mu,
                  nabi-Mu, dan Rasul-Mu; Nabi yang ummi. Juga kepada keluarga
                  dan para sahabatnya serta berilah keselamatan sebanyak yang
                  terjangkau oleh ilmu-Mu yang tergores oleh pena-Mu, dan yang
                  terangkum oleh kitab-Mu. Ridhailah ya Allah para pemimpin
                  kami, Abu Bakar, Umar, Utsman, dan Ali, semua sahabat, semua
                  tabi’in dan orang-orang yang mengikuti mereka sampai hari
                  pembalasan. Maha suci Tuhanmu; Tuhan kemuliaan, dari apa-apa
                  yang mereka sifatkan. Keselamatan semoga tercurah kepada para
                  utusan dan segala puji bagi Allah, Tuhan semesta alam.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Ali Imran - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 26</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    قُلِ ٱللَّهُمَّ مَٰلِكَ ٱلۡمُلۡكِ تُؤۡتِي ٱلۡمُلۡكَ مَن
                    تَشَآءُ وَتَنزِعُ ٱلۡمُلۡكَ مِمَّن تَشَآءُ وَتُعِزُّ مَن
                    تَشَآءُ وَتُذِلُّ مَن تَشَآءُۖ بِيَدِكَ ٱلۡخَيۡرُۖ إِنَّكَ
                    عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٞ
                  </div>
                  <div className="text-justify text-translate">
                    Katakanlah: &quot;Wahai Tuhan Yang mempunyai kerajaan,
                    Engkau berikan kerajaan kepada orang yang Engkau kehendaki
                    dan Engkau cabut kerajaan dari orang yang Engkau kehendaki.
                    Engkau muliakan orang yang Engkau kehendaki dan Engkau
                    hinakan orang yang Engkau kehendaki. Di tangan Engkaulah
                    segala kebajikan.Sesungguhnya Engkau Maha Kuasa atas segala
                    sesuatu.
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 27</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    تُولِجُ ٱلَّيۡلَ فِي ٱلنَّهَارِ وَتُولِجُ ٱلنَّهَارَ فِي
                    ٱلَّيۡلِۖ وَتُخۡرِجُ ٱلۡحَيَّ مِنَ ٱلۡمَيِّتِ وَتُخۡرِجُ
                    ٱلۡمَيِّتَ مِنَ ٱلۡحَيِّۖ وَتَرۡزُقُ مَن تَشَآءُ بِغَيۡرِ
                    حِسَابٖ
                  </div>
                  <div className="text-justify text-translate">
                    Engkau masukkan malam ke dalam siang dan Engkau masukkan
                    siang ke dalam malam. Engkau keluarkan yang hidup dari yang
                    mati, dan Engkau keluarkan yang mati dari yang hidup. Dan
                    Engkau beri rezeki siapa yang Engkau kehendaki tanpa hisab
                    (batas)
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Robithoh </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللَّهُمَّ إِنَّ هَذَا إِقْبَالُ نَهَارِكَ (لَيْلِكَ)
                  وَإِدْبَارُ لَيْلِكَ (نَهَارِكَ) وَأَصْوَاتُ دُعَاتِكَ
                  فَاغْفِرْلِي
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, sesungguhnya ini adalah siang-Mu (malam-Mu) yang
                  telah menjelang dan (malam-Mu) siang-Mu yang tengah berlalu
                  serta suara-suara penyeru-Mu, maka ampunilah aku.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Robithoh </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللّهُمَّ إِنَّكَ تَعْلَمُ أَنَّ هَذِهِ الْقُلُوْبَ، قَدِ
                  اجْتَمَعَتْ عَلَى مَحَبَّتِكَ وَالْتَقَتْ عَلَى طَاعَتِكَ،
                  وَتَوَحَّدَتْ عَلَى دَعْوَتِكَ وَتَعَاهَدَتْ عَلَى نُصْرَةِ
                  شَرِيْعَتِكَ فَوَثِّقِ اللَّهُمَّ رَابِطَتَهَا، وَأَدِمْ
                  وُدَّهَا، وَاهْدِهَا سُبُلَهَا وَامْلَأَهَا بِنُوْرِكَ
                  الَّذِيْ لاَ يَخْبُوْا وَاشْرَحْ صُدُوْرَهَا بِفَيْضِ
                  الْإِيْمَانِ بِكَ، وَجَمِيْلِ التَّوَكُّلِ عَلَيْكَ
                  وَاَحْيِهَا بِمَعْرِفَتِكَ، وَأَمِتْهَا عَلَى الشَّهَادَةِ فِي
                  سَبِيْلِكَ إِنَّكَ نِعْمَ الْمَوْلَى وَنِعْمَ النَّصِيْرِ.
                  اَللَّهُمَّ أَمِيْنَ. وَصَلِّ اللَّهُمَّ عَلَى سَيِّدَنَا
                  مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمَ.
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, sesungguhnya Engkau Maha Mengetahui bahawa hati-hati
                  ini, telah berhimpun di atas dasar kecintaan terhadapmu,
                  bertemu di atas ketaatan kepada-Mu dan bersatu bagi memikul
                  beban dakwah-Mu, hati-hati ini telah mengikat persetiaan untuk
                  menolong meninggikan syariat-Mu. Oleh itu, Ya Allah, Engkau
                  perkukuhkan ikatannya dan Engkau kekalkan kemesraan hati-hati
                  ini, tunjukilah hati-hati ini akan jalan yang sebenar, serta
                  penuhkanlah (piala) hati-hati ini dengan cahaya Rabbani-Mu
                  yang tidak kunjung redup, lapangkanlah hati-hati dengan
                  limpahan keimanan serta keindahan tawakkal kepada-Mu, hidup
                  suburkanlah hati-hati ini dengan makrifat (pengenalan yang
                  sebenarnya) tentang-Mu. (Jika Engkau takdirkan kami mati) maka
                  matikanlah hati-hati ini sebagai para syuhada dalam perjuangan
                  agama-Mu. Sesungguhnya Engkau sebaik-baik pelindung dan
                  sebaik-baik penolong. Ya Allah perkenankanlah doa kami. Dan
                  semoga shalawat serta salam selalu tercurah kepada Nabi
                  Muhammad, keluarganya dan kepada semua sahabatnya.{" "}
                </p>
                <hr />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">Al-Matsurat Kubro</h2>
            <div className="zikir-block">
              <div align="center">
                <p lang="ar" className="text-quran taawudz">
                  أَعُوذُ بِاللَّهِ السَّمِيعِ الْعَلِيمِ مِنَ الشَّيْطَانِ
                  الرَّجِيمِ
                </p>
                <p className="taawudz-translate">
                  {" "}
                  Aku berlindung kepada Allah yang Maha Mendengar lagi Maha
                  Mengetahui dari godaan syetan yang terkutuk.
                </p>
              </div>

              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Fatihah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ
                  </div>
                  <div className="text-justify text-translate">
                    Segala puji bagi Allah, Tuhan semesta alam
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-justify text-translate">
                    Maha Pemurah lagi Maha Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    مَٰلِكِ يَوۡمِ ٱلدِّينِ
                  </div>
                  <div className="text-justify text-translate">
                    Yang menguasai hari pembalasan
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 5</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ
                  </div>
                  <div className="text-justify text-translate">
                    Hanya kepada Engkaulah kami menyembah dan hanya kepada
                    Engkaulah kami mohon pertolongan
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 6</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ
                  </div>
                  <div className="text-justify text-translate">
                    Tunjukilah kami jalan yang lurus
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 7</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ
                    عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ
                  </div>
                  <div className="text-justify text-translate">
                    (yaitu) jalan orang-orang yang telah Engkau anugerahkan
                    nikmat kepada mereka, bukan (jalan) mereka yang dimurkai dan
                    bukan (pula jalan) mereka yang sesat
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Baqarah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    الٓمٓ
                  </div>
                  <div className="text-justify text-translate">
                    Alif Laam Miim
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ
                  </div>
                  <div className="text-justify text-translate">
                    Kitab (Al Qur&#039;an) ini tidak ada keraguan padanya;
                    petunjuk bagi mereka yang bertakwa
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ
                    وَمِمَّا رَزَقۡنَٰهُمۡ يُنفِقُونَ
                  </div>
                  <div className="text-justify text-translate">
                    (yaitu) mereka yang beriman kepada yang gaib, yang
                    mendirikan shalat dan menafkahkan sebahagian rezki yang Kami
                    anugerahkan kepada mereka
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَٱلَّذِينَ يُؤۡمِنُونَ بِمَآ أُنزِلَ إِلَيۡكَ وَمَآ
                    أُنزِلَ مِن قَبۡلِكَ وَبِٱلۡأٓخِرَةِ هُمۡ يُوقِنُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan mereka yang beriman kepada Kitab (AlQur&#039;an) yang
                    telah diturunkan kepadamu dan Kitab-kitab yang telah
                    diturunkan sebelummu, serta mereka yakin akan adanya
                    (kehidupan) akhirat
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 5</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    أُوْلَٰٓئِكَ عَلَىٰ هُدٗى مِّن رَّبِّهِمۡۖ وَأُوْلَٰٓئِكَ
                    هُمُ ٱلۡمُفۡلِحُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Mereka itulah yang tetap mendapat petunjuk dari Tuhan
                    mereka, dan merekalah orang-orang yang beruntung
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Baqarah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 255</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلۡحَيُّ ٱلۡقَيُّومُۚ لَا
                    تَأۡخُذُهُۥ سِنَةٞ وَلَا نَوۡمٞۚ لَّهُۥ مَا فِي
                    ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلۡأَرۡضِۗ مَن ذَا ٱلَّذِي يَشۡفَعُ
                    عِندَهُۥٓ إِلَّا بِإِذۡنِهِۦۚ يَعۡلَمُ مَا بَيۡنَ
                    أَيۡدِيهِمۡ وَمَا خَلۡفَهُمۡۖ وَلَا يُحِيطُونَ بِشَيۡءٖ
                    مِّنۡ عِلۡمِهِۦٓ إِلَّا بِمَا شَآءَۚ وَسِعَ كُرۡسِيُّهُ
                    ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضَۖ وَلَايَئُودُهُۥ حِفۡظُهُمَاۚ
                    وَهُوَ ٱلۡعَلِيُّ ٱلۡعَظِيمُ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia
                    Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya);
                    tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di
                    langit dan di bumi. Tiada yang dapat memberi syafaat di sisi
                    Allah tanpa izin-Nya. Allah mengetahui apa-apa yang di
                    hadapan mereka dan di belakang mereka, dan mereka tidak
                    mengetahui apa-apa dari ilmu Allah melainkan apa yang
                    dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan
                    Allah tidak merasa berat memelihara keduanya, dan Allah Maha
                    Tinggi lagi Maha Besar
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Baqarah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 256</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    لَآ إِكۡرَاهَ فِي ٱلدِّينِۖ قَد تَّبَيَّنَ ٱلرُّشۡدُ مِنَ
                    ٱلۡغَيِّۚ فَمَن يَكۡفُرۡ بِٱلطَّٰغُوتِ وَيُؤۡمِنۢ بِٱللَّهِ
                    فَقَدِ ٱسۡتَمۡسَكَ بِٱلۡعُرۡوَةِ ٱلۡوُثۡقَىٰ لَا ٱنفِصَامَ
                    لَهَاۗ وَٱللَّهُ سَمِيعٌ عَلِيمٌ
                  </div>
                  <div className="text-justify text-translate">
                    Tidak ada paksaan untuk (memasuki) agama (Islam);
                    sesungguhnya telah jelas jalan yang benar daripada jalan
                    yang sesat. Karena itu barang siapa yang ingkar kepada
                    Thaghut dan beriman kepada Allah, maka sesungguhnya ia telah
                    berpegang kepada buhu tali yang amat kuat yang tidak akan
                    putus. Dan Allah Maha Mendengar lagi Maha Mengetahui.
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 257</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱللَّهُ وَلِيُّ ٱلَّذِينَ ءَامَنُواْ يُخۡرِجُهُم مِّنَ
                    ٱلظُّلُمَٰتِ إِلَى ٱلنُّورِۖ وَٱلَّذِينَ كَفَرُوٓاْ
                    أَوۡلِيَآؤُهُمُ ٱلطَّٰغُوتُ يُخۡرِجُونَهُم مِّنَ ٱلنُّورِ
                    إِلَى ٱلظُّلُمَٰتِۗ أُوْلَٰٓئِكَ أَصۡحَٰبُ ٱلنَّارِۖ هُمۡ
                    فِيهَا خَٰلِدُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Allah Pelindung orang-orang yang beriman; Dia mengeluarkan
                    mereka dari kegelapan (kekafiran) kepada cahaya (iman). Dan
                    orang-orang yang kafir, pelindung-pelindungnya ialah setan,
                    yang mengeluarkan mereka dari cahaya kepada kegelapan
                    (kekafiran). Mereka itu adalah penghuni neraka; mereka kekal
                    di dalamnya
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Baqarah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 284</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    لِّلَّهِ مَا فِي ٱلسَّمَٰوَٰتِ وَمَا فِي ٱلۡأَرۡضِۗ وَإِن
                    تُبۡدُواْ مَا فِيٓ أَنفُسِكُمۡ أَوۡ تُخۡفُوهُ يُحَاسِبۡكُم
                    بِهِ ٱللَّهُۖ فَيَغۡفِرُ لِمَن يَشَآءُ وَيُعَذِّبُ مَن
                    يَشَآءُۗ وَٱللَّهُ عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٌ
                  </div>
                  <div className="text-justify text-translate">
                    Kepunyaan Allah-lah segala apa yang ada di langit dan apa
                    yang ada di bumi. Dan jika kamu melahirkan apa yang ada di
                    dalam hatimu atau kamu menyembunyikannya, niscaya Allah akan
                    membuat perhitungan dengan kamu tentang perbuatanmu itu.
                    Maka Allah mengampuni siapa yang dikehendaki-Nya dan
                    menyiksa siapa yang dikehendaki-Nya; dan Allah Maha Kuasa
                    atas segala sesuatu
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 285</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيۡهِ مِن رَّبِّهِۦ
                    وَٱلۡمُؤۡمِنُونَۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَٰٓئِكَتِهِۦ
                    وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيۡنَ أَحَدٖ مِّن
                    رُّسُلِهِۦۚ وَقَالُواْ سَمِعۡنَا وَأَطَعۡنَاۖ غُفۡرَانَكَ
                    رَبَّنَا وَإِلَيۡكَ ٱلۡمَصِيرُ
                  </div>
                  <div className="text-justify text-translate">
                    Rasul telah beriman kepada Al Qur&#039;an yang diturunkan
                    kepadanya dari Tuhannya, demikian pula orang-orang yang
                    beriman. Semuanya beriman kepada Allah,
                    malaikat-malaikat-Nya, kitab-kitab-Nya dan rasul-rasul-Nya.
                    (Mereka mengatakan): &quot;Kami tidak membeda-bedakan antara
                    seseorang pun (dengan yang lain) dari rasul rasul-Nya&quot;,
                    dan mereka mengatakan: &quot;Kami dengar dan kami
                    taat&quot;. (Mereka berdoa):&quot;Ampunilah kami ya Tuhan
                    kami dan kepada Engkaulah tempat kembali&quot;
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 286</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    لَا يُكَلِّفُ ٱللَّهُ نَفۡسًا إِلَّا وُسۡعَهَاۚ لَهَا مَا
                    كَسَبَتۡ وَعَلَيۡهَا مَا ٱكۡتَسَبَتۡۗ رَبَّنَا لَا
                    تُؤَاخِذۡنَآ إِن نَّسِينَآ أَوۡ أَخۡطَأۡنَاۚ رَبَّنَا
                    وَلَا تَحۡمِلۡ عَلَيۡنَآ إِصۡرٗا كَمَا حَمَلۡتَهُۥ عَلَى
                    ٱلَّذِينَ مِن قَبۡلِنَاۚ رَبَّنَا وَلَا تُحَمِّلۡنَا مَا لَا
                    طَاقَةَ لَنَا بِهِۦۖ وَٱعۡفُ عَنَّا وَٱغۡفِرۡ لَنَا
                    وَٱرۡحَمۡنَآۚ أَنتَ مَوۡلَىٰنَا فَٱنصُرۡنَا عَلَى ٱلۡقَوۡمِ
                    ٱلۡكَٰفِرِينَ
                  </div>
                  <div className="text-justify text-translate">
                    Allah tidak membebani seseorang melainkan sesuai dengan
                    kesanggupannya. Ia mendapat pahala (dari kebajikan) yang
                    diusahakannya dan ia mendapat siksa (dari kejahatan) yang
                    dikerjakannya. (Mereka berdo`a): &quot;Ya Tuhan kami,
                    janganlah Engkau hukum kami jika kami lupa atau kami
                    tersalah. Ya Tuhan kami, janganlah Engkau bebankan kepada
                    kami beban yang berat sebagaimana Engkau bebankan kepada
                    orang-orang yang sebelum kami. Ya Tuhan kami, janganlah
                    Engkau pikulkan kepada kami apa yang tak sanggup kami
                    memikulnya. Beri maaflah kami; ampunilah kami; dan
                    rahmatilah kami. Engkaulah Penolong kami, maka tolonglah
                    kami terhadap kaum yang kafir&quot;
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Ali Imran - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    الٓمٓ
                  </div>
                  <div className="text-justify text-translate">
                    Alif Lam Mim
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلۡحَيُّ ٱلۡقَيُّومُ
                  </div>
                  <div className="text-justify text-translate">
                    Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia.
                    Yang Hidup kekal lagi terus menerus mengurus makhluk-Nya
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Thoha - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 111</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَعَنَتِ ٱلۡوُجُوهُ لِلۡحَيِّ ٱلۡقَيُّومِۖ وَقَدۡ خَابَ مَنۡ
                    حَمَلَ ظُلۡمٗا
                  </div>
                  <div className="text-justify text-translate">
                    Dan tunduklah semua muka (dengan berendah diri) kepada Tuhan
                    Yang Hidup Kekal lagi senantiasa mengurus (makhluk-Nya). Dan
                    sesungguhnya telah merugilah orang yang melakukan kelaliman
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 112</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمَن يَعۡمَلۡ مِنَ ٱلصَّٰلِحَٰتِ وَهُوَ مُؤۡمِنٞ فَلَا
                    يَخَافُ ظُلۡمٗا وَلَا هَضۡمٗا
                  </div>
                  <div className="text-justify text-translate">
                    Dan barang siapa mengerjakan amal-amal yang saleh dan ia
                    dalam keadaan beriman, maka ia tidak khawatir akan perlakuan
                    yang tidak adil (terhadapnya) dan tidak (pula) akan
                    pengurangan haknya
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">At-Taubah - (7x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 129</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    حَسۡبِيَ ٱللَّهُ لَآإِلَٰهَ إِلَّاهُوَۖ عَلَيۡهِ
                    تَوَكَّلۡتُۖ وَهُوَ رَبُّ ٱلۡعَرۡشِ ٱلۡعَظِيمِ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    &quot;Cukuplah Allah bagiku; tidak ada Tuhanselain Dia.
                    Hanya kepada-Nya aku bertawakal dan Dia adalah Tuhan yang
                    memiliki Arasy yang agung&quot;
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Isra - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 110</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    قُلِ ٱدۡعُواْ ٱللَّهَ أَوِ ٱدۡعُواْ ٱلرَّحۡمَٰنَۖ أَيّٗا
                    مَّا تَدۡعُواْ فَلَهُ ٱلۡأَسۡمَآءُ ٱلۡحُسۡنَىٰۚ
                    وَلَاتَجۡهَرۡ بِصَلَاتِكَ وَلَا تُخَافِتۡ بِهَا وَٱبۡتَغِ
                    بَيۡنَ ذَٰلِكَ سَبِيلٗا
                  </div>
                  <div className="text-justify text-translate">
                    Katakanlah: &quot;Serulah Allah atau serulahAr-Rahman.
                    Dengan nama yang mana saja kamu seru, Diamempunyai al
                    asmaaulhusna (nama-nama yang terbaik)dan janganlah kamu
                    mengeraskan suaramu dalam salatmudan janganlah pula
                    merendahkannya dan carilah jalantengah di antara kedua
                    itu&quot;
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 111</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَقُلِ ٱلۡحَمۡدُ لِلَّهِ ٱلَّذِي لَمۡ يَتَّخِذۡ وَلَدٗا
                    وَلَمۡ يَكُن لَّهُۥ شَرِيكٞ فِي ٱلۡمُلۡكِ وَلَمۡ يَكُن
                    لَّهُۥ وَلِيّٞ مِّنَ ٱلذُّلِّۖ وَكَبِّرۡهُ تَكۡبِيرَۢا
                  </div>
                  <div className="text-justify text-translate">
                    Dan katakanlah: &quot;Segala puji bagi AllahYang tidak
                    mempunyai anak dan tidak mempunyai sekutudalam kerajaan-Nya
                    dan Dia bukan pula hina yangmemerlukan penolong dan
                    agungkanlah Dia denganpengagungan yang sebesar-besarnya
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Mu&#039;minun - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 115</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    أَفَحَسِبۡتُمۡ أَنَّمَا خَلَقۡنَٰكُمۡ عَبَثٗا وَأَنَّكُمۡ
                    إِلَيۡنَا لَا تُرۡجَعُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Maka apakah kamu mengira, bahwa sesungguhnya Kami
                    menciptakan kamu secara main-main (saja), dan bahwa kamu
                    tidak akan dikembalikan kepada Kami ?
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 116</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    فَتَعَٰلَى ٱللَّهُ ٱلۡمَلِكُ ٱلۡحَقُّۖ لَآ إِلَٰهَ إِلَّا
                    هُوَ رَبُّ ٱلۡعَرۡشِ ٱلۡكَرِيمِ
                  </div>
                  <div className="text-justify text-translate">
                    Maka Maha Tinggi Allah, Raja Yang Sebenarnya; tidak ada
                    Tuhan (yang berhak disembah) selain Dia, Tuhan (Yang
                    mempunyai) Arasy yang mulia
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 117</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمَن يَدۡعُ مَعَ ٱللَّهِ إِلَٰهًا ءَاخَرَلَابُرۡهَٰنَ لَهُۥ
                    بِهِۦ فَإِنَّمَا حِسَابُهُۥ عِندَ رَبِّهِۦٓۚ
                    إِنَّهُۥلَايُفۡلِحُ ٱلۡكَٰفِرُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan barang siapa menyembah tuhan yang lain di samping Allah,
                    padahal tidak ada suatu dalil pun baginya tentang itu, maka
                    sesungguhnya perhitungannya di sisi Tuhannya. Sesungguhnya
                    orang-orang yang kafir itu tiada beruntung
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 118</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَقُل رَّبِّ ٱغۡفِرۡ وَٱرۡحَمۡ وَأَنتَ خَيۡرُ ٱلرَّٰحِمِينَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan katakanlah: &quot;Ya Tuhanku berilah ampun dan berilah
                    rahmat, dan Engkau adalah Pemberi rahmat Yang Paling baik
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Ar-Rum - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 17</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    فَسُبۡحَٰنَ ٱللَّهِ حِينَ تُمۡسُونَ وَحِينَ تُصۡبِحُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Maka bertasbihlah kepada Allah di waktu kamu berada di
                    petang hari dan waktu kamu berada di waktu subuh
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 18</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَلَهُ ٱلۡحَمۡدُ فِي ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِ وَعَشِيّٗا
                    وَحِينَ تُظۡهِرُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan bagi-Nya-lah segala puji di langit dan di bumi dan di
                    waktu kamu berada pada petang hari dan di waktu kamu berada
                    di waktu Zuhur
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 19</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    يُخۡرِجُ ٱلۡحَيَّ مِنَ ٱلۡمَيِّتِ وَيُخۡرِجُ ٱلۡمَيِّتَ مِنَ
                    ٱلۡحَيِّ وَيُحۡيِ ٱلۡأَرۡضَ بَعۡدَ مَوۡتِهَاۚ وَكَذَٰلِكَ
                    تُخۡرَجُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dia mengeluarkan yang hidup dari yang mati dan mengeluarkan
                    yang mati dari yang hidup dan menghidupkan bumi sesudah
                    matinya. Dan seperti itulah kamu akan dikeluarkan dari kubur
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 20</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِنۡءَايَٰتِهِۦٓ أَنۡ خَلَقَكُم مِّن تُرَابٖ ثُمَّ إِذَآ
                    أَنتُم بَشَرٞ تَنتَشِرُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan di antara tanda-tanda kekuasaan-Nya ialah Dia
                    menciptakan kamu dari tanah, kemudian tiba-tiba kamu menjadi
                    manusia yang berkembang biak
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 21</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِنۡ ءَايَٰتِهِۦٓ أَنۡ خَلَقَ لَكُم مِّنۡ أَنفُسِكُمۡ
                    أَزۡوَٰجٗا لِّتَسۡكُنُوٓاْ إِلَيۡهَا وَجَعَلَ بَيۡنَكُم
                    مَّوَدَّةٗ وَرَحۡمَةًۚ إِنَّ فِي ذَٰلِكَ لَأٓيَٰتٖ لِّقَوۡمٖ
                    يَتَفَكَّرُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan di antara tanda-tanda kekuasaan-Nya ialah Dia
                    menciptakan untukmu isteri-isteri dari jenismu sendiri,
                    supaya kamu cenderung dan merasa tenteram kepadanya, dan
                    dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya
                    pada yang demikian itu benar-benar terdapat tanda-tanda bagi
                    kaum yang berfikir
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 22</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِنۡ ءَايَٰتِهِۦ خَلۡقُ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِ
                    وَٱخۡتِلَٰفُ أَلۡسِنَتِكُمۡ وَأَلۡوَٰنِكُمۡۚ إِنَّ فِي
                    ذَٰلِكَ لَأٓيَٰتٖ لِّلۡعَٰلِمِينَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan di antara tanda-tanda kekuasaan-Nya ialah menciptakan
                    langit dan bumi dan berlain-lainan bahasamu dan warna
                    kulitmu. Sesungguhnya pada yang demikan itu benar-benar
                    terdapat tanda-tanda bagi orang-orang yang mengetahui
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 23</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِنۡ ءَايَٰتِهِۦ مَنَامُكُم بِٱلَّيۡلِ وَٱلنَّهَارِ
                    وَٱبۡتِغَآؤُكُم مِّن فَضۡلِهِۦٓۚإِنَّ فِي ذَٰلِكَ لَأٓيَٰتٖ
                    لِّقَوۡمٖ يَسۡمَعُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan di antara tanda-tanda kekuasaan-Nya ialah tidurmu di
                    waktu malam dan siang hari dan usahamu mencari sebagian dari
                    karunia-Nya. Sesungguhnya pada yang demikian itu benar-benar
                    terdapat tanda-tanda bagi kaum yang mendengarkan
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 24</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِنۡءَايَٰتِهِۦ يُرِيكُمُ ٱلۡبَرۡقَ خَوۡفٗا وَطَمَعٗا
                    وَيُنَزِّلُ مِنَ ٱلسَّمَآءِمَآءٗ فَيُحۡيِۦبِهِ ٱلۡأَرۡضَ
                    بَعۡدَ مَوۡتِهَآۚ إِنَّ فِي ذَٰلِكَ لَأٓيَٰتٖ لِّقَوۡمٖ
                    يَعۡقِلُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan di antara tanda-tanda kekuasaan-Nya, Dia memperlihatkan
                    kepadamu kilat untuk menimbulkan ketakutan dan harapan, dan
                    Dia menurunkan hujan dari langit, lalu menghidupkan bumi
                    dengan air itu sesudah matinya. Sesungguhnya pada yang
                    demikian itu benar-benar terdapat tanda-tanda bagi kaum yang
                    mempergunakan akalnya
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 25</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِنۡ ءَايَٰتِهِۦٓأَن تَقُومَ ٱلسَّمَآءُ وَٱلۡأَرۡضُ
                    بِأَمۡرِهِۦۚ ثُمَّ إِذَا دَعَاكُمۡ دَعۡوَةٗ مِّنَ ٱلۡأَرۡضِ
                    إِذَآ أَنتُمۡ تَخۡرُجُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan di antara tanda-tanda kekuasaan-Nya ialah berdirinya
                    langit dan bumi dengan iradat-Nya. Kemudian apabila Dia
                    memanggil kamu sekali panggil dari bumi, seketika itu juga
                    kamu keluar dari kubur
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 26</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَلَهُۥ مَن فِي ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِۖ كُلّٞ لَّهُۥ
                    قَٰنِتُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan kepunyaan-Nya-lah siapa saja yang ada di langit dan di
                    bumi. Semuanya hanya kepada-Nya tunduk
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Ghafir - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    حمٓ
                  </div>
                  <div className="text-justify text-translate">Haa Miim</div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    تَنزِيلُ ٱلۡكِتَٰبِ مِنَ ٱللَّهِ ٱلۡعَزِيزِ ٱلۡعَلِيمِ
                  </div>
                  <div className="text-justify text-translate">
                    Diturunkan Kitab ini (Al Quran) dari Allah Yang Maha Perkasa
                    lagi Maha Mengetahui
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    غَافِرِ ٱلذَّنۢبِ وَقَابِلِ ٱلتَّوۡبِ شَدِيدِ ٱلۡعِقَابِ ذِي
                    ٱلطَّوۡلِۖ لَآ إِلَٰهَ إِلَّاهُوَۖ إِلَيۡهِ ٱلۡمَصِيرُ
                  </div>
                  <div className="text-justify text-translate">
                    Yang Mengampuni dosa dan Menerima taubat lagi keras
                    hukuman-Nya. Yang mempunyai karunia. Tiada Tuhan (yang
                    berhak disembah) selain Dia. Hanya kepada-Nya-lah kembali
                    (semua makhluk)
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Hasyr - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 22</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    هُوَ ٱللَّهُ ٱلَّذِي لَآ إِلَٰهَ إِلَّا هُوَۖ عَٰلِمُ
                    ٱلۡغَيۡبِ وَٱلشَّهَٰدَةِۖ هُوَ ٱلرَّحۡمَٰنُ ٱلرَّحِيمُ
                  </div>
                  <div className="text-justify text-translate">
                    Dialah Allah Yang tiada Tuhan selain Dia, Yang Mengetahui
                    yang ghaib dan yang nyata, Dialah Yang Maha Pemurah lagi
                    Maha Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 23</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    هُوَ ٱللَّهُ ٱلَّذِي لَآ إِلَٰهَ إِلَّا هُوَ ٱلۡمَلِكُ
                    ٱلۡقُدُّوسُ ٱلسَّلَٰمُ ٱلۡمُؤۡمِنُ ٱلۡمُهَيۡمِنُ ٱلۡعَزِيزُ
                    ٱلۡجَبَّارُ ٱلۡمُتَكَبِّرُۚ سُبۡحَٰنَ ٱللَّهِ عَمَّا
                    يُشۡرِكُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Dialah Allah Yang tiada Tuhan selain Dia, Raja, Yang Maha
                    Suci, Yang Maha Sejahtera, Yang Mengaruniakan Keamanan, Yang
                    Maha Memelihara, Yang Maha Perkasa, Yang Maha Kuasa, Yang
                    Memiliki segala Keagungan, Maha Suci Allah dari apa yang
                    mereka persekutukan
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 24</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    هُوَ ٱللَّهُ ٱلۡخَٰلِقُ ٱلۡبَارِئُ ٱلۡمُصَوِّرُۖ لَهُ
                    ٱلۡأَسۡمَآءُ ٱلۡحُسۡنَىٰۚ يُسَبِّحُ لَهُۥ مَا فِي
                    ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِۖ وَهُوَ ٱلۡعَزِيزُ ٱلۡحَكِيمُ
                  </div>
                  <div className="text-justify text-translate">
                    Dialah Allah Yang Menciptakan, Yang Mengadakan, Yang
                    Membentuk Rupa, Yang Mempunyai Asmaaul Husna. Bertasbih
                    kepada-Nya apa yang di langit dan bumi. Dan Dialah Yang Maha
                    Perkasa lagi Maha Bijaksana
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Az-Zalzalah - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    إِذَا زُلۡزِلَتِ ٱلۡأَرۡضُ زِلۡزَالَهَا
                  </div>
                  <div className="text-justify text-translate">
                    Apabila bumi digoncangkan dengan goncangan (yang dahsyat)
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَأَخۡرَجَتِ ٱلۡأَرۡضُ أَثۡقَالَهَا
                  </div>
                  <div className="text-justify text-translate">
                    dan bumi telah mengeluarkan beban-beban berat (yang
                    dikandung)nya
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَقَالَ ٱلۡإِنسَٰنُ مَا لَهَا
                  </div>
                  <div className="text-justify text-translate">
                    dan manusia bertanya: &quot;Mengapa bumi (menjadi
                    begini)?&quot;
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    يَوۡمَئِذٖ تُحَدِّثُ أَخۡبَارَهَا
                  </div>
                  <div className="text-justify text-translate">
                    Pada hari itu bumi menceritakan beritanya
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 5</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    بِأَنَّ رَبَّكَ أَوۡحَىٰ لَهَا
                  </div>
                  <div className="text-justify text-translate">
                    karena sesungguhnya Tuhanmu telah memerintahkan (yang
                    sedemikian itu) kepadanya
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 6</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    يَوۡمَئِذٖ يَصۡدُرُ ٱلنَّاسُ أَشۡتَاتٗا لِّيُرَوۡاْ
                    أَعۡمَٰلَهُمۡ
                  </div>
                  <div className="text-justify text-translate">
                    Pada hari itu manusia ke luar dari kuburnya dalam keadaan
                    bermacam-macam, supaya diperlihatkan kepada mereka (balasan)
                    pekerjaan mereka
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 7</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    فَمَن يَعۡمَلۡ مِثۡقَالَ ذَرَّةٍ خَيۡرٗا يَرَهُۥ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    Barangsiapa yang mengerjakan kebaikan seberat dzarrahpun,
                    niscaya dia akan melihat (balasan)nya
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 8</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمَن يَعۡمَلۡ مِثۡقَالَ ذَرَّةٖ شَرّٗا يَرَهُۥ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    Dan barangsiapa yang mengerjakan kejahatan sebesar
                    dzarrahpun, niscaya dia akan melihat (balasan)nya pula
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Kafirun - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    قُلۡ يَٰٓأَيُّهَا ٱلۡكَٰفِرُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Katakanlah: &quot;Hai orang-orang kafir
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    لَآ أَعۡبُدُ مَا تَعۡبُدُونَ
                  </div>
                  <div className="text-justify text-translate">
                    Aku tidak akan menyembah apa yang kamu sembah
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَلَآ أَنتُمۡ عَٰبِدُونَ مَآ أَعۡبُدُ
                  </div>
                  <div className="text-justify text-translate">
                    Dan kamu bukan penyembah Tuhan yang aku sembah
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَلَآ أَنَا۠ عَابِدٞ مَّا عَبَدتُّمۡ
                  </div>
                  <div className="text-justify text-translate">
                    Dan aku tidak pernah menjadi penyembah apa yang kamu sembah
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 5</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَلَآ أَنتُمۡ عَٰبِدُونَ مَآ أَعۡبُدُ
                  </div>
                  <div className="text-justify text-translate">
                    Dan kamu tidak pernah (pula) menjadi penyembah Tuhan yang
                    aku sembah
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 6</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    لَكُمۡ دِينُكُمۡ وَلِيَ دِينِ
                  </div>
                  <div className="text-justify text-translate">
                    Untukmu agamamu, dan untukkulah, agamaku&quot;
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">An-Nashr - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    إِذَا جَآءَ نَصۡرُ ٱللَّهِ وَٱلۡفَتۡحُ
                  </div>
                  <div className="text-justify text-translate">
                    Apabila telah datang pertolongan Allah dan kemenangan
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَرَأَيۡتَ ٱلنَّاسَ يَدۡخُلُونَ فِي دِينِ ٱللَّهِ أَفۡوَاجٗا
                  </div>
                  <div className="text-justify text-translate">
                    Dan kamu lihat manusia masuk agama Allah dengan
                    berbondong-bondong
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    فَسَبِّحۡ بِحَمۡدِ رَبِّكَ وَٱسۡتَغۡفِرۡهُۚ إِنَّهُۥكَانَ
                    تَوَّابَۢا
                  </div>
                  <div className="text-justify text-translate">
                    Maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampun
                    kepada-Nya. Sesungguhnya Dia adalah Maha Penerima taubat
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Ikhlas - (3x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    قُلۡ هُوَ ٱللَّهُ أَحَدٌ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    Katakanlah: &quot;Dialah Allah, Yang Maha Esa
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱللَّهُ ٱلصَّمَدُ
                  </div>
                  <div className="text-justify text-translate">
                    Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ
                  </div>
                  <div className="text-justify text-translate">
                    Dia tiada beranak dan tidak pula diperanakkan
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    Dan tidak ada seorangpun yang setara dengan Dia
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Al-Falaq - (3x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ{" "}
                  </div>
                  <div className="text-justify text-translate">
                    1. Katakanlah: &quot;Aku berlindung kepada Tuhan Yang
                    Menguasai subuh,
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    مِن شَرِّ مَا خَلَقَ
                  </div>
                  <div className="text-justify text-translate">
                    Dari kejahatan makhluk-Nya
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan dari kejahatan malam apabila telah gelap gulita
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلۡعُقَدِ
                  </div>
                  <div className="text-justify text-translate">
                    Dan dari kejahatan wanita-wanita tukang sihir yang
                    menghembus pada buhul-buhul
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 5</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ
                  </div>
                  <div className="text-justify text-translate">
                    Dan dari kejahatan pendengki bila ia dengki
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">An-Naas - (3x)</span> <br />
                </div>

                <div className="py-3">
                  <div lang="ar" className="text-quran text-center" dir="rtl">
                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-center text-translate">
                    Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha
                    Penyayang
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 1</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Katakanlah: Aku berlindung kepada Tuhan(yang memelihara dan
                    menguasai) manusia
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 2</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    مَلِكِ ٱلنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Raja manusia
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 3</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    إِلَٰهِ ٱلنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Sembahan manusia
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 4</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    مِن شَرِّ ٱلۡوَسۡوَاسِ ٱلۡخَنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Dari kejahatan (bisikan) setan yang biasa bersembunyi
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 5</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    ٱلَّذِي يُوَسۡوِسُ فِي صُدُورِ ٱلنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Yang membisikkan (kejahatan) ke dalam dada manusia
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 6</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    مِنَ ٱلۡجِنَّةِ وَٱلنَّاسِ
                  </div>
                  <div className="text-justify text-translate">
                    Dari (golongan) jin dan manusia
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  أَصْبَحْنَا وَأَصْبَحَ (أَمْسَيْنَا وَأَمْسَى) الْمُلْكُ
                  لِلّهَِ وَالْحَمْدُ لِلّهَِ لاَ شَرِيكَ لَهُ، لاَ إِلهَ إِلَّا
                  هُوَ وَإِلَيْهِ النُّشُوْرُ (الْمَصِيْرُ)
                </p>
                <p className="text-justify">
                  {" "}
                  Kami berpagi hari (bersore hari) dan berpagi hari (bersore
                  hari) pula kerjaan milik Allah. Segala puji bagi Allah, tiada
                  sekutu bagi-Nya, tiada Tuhan melainkan Dia dan kepada-Nya
                  tempat kembali.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  أَصْبَحْنَا (أَمْسَيْنَا) عَلَى فِطْرَةِ اْلإِسْلاَمِ وَعَلَى
                  كَلِمَةِ اْلإِخْلاَصِ وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ
                  صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَعَلَى مِلَّةِ أَبِيْنَا
                  إِبْرَاهِيْمَ حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ
                  الْمُشْرِكِيْنَ
                </p>
                <p className="text-justify">
                  {" "}
                  Di waktu pagi (sore) kami memegang agama Islam, kalimat
                  ikhlas, agama Nabi kita Muhammad shallallahu ‘alaihi wa
                  sallam, dan agama ayah kami Ibrahim, yang berdiri di atas
                  jalan yang lurus, muslim dan tidak tergolong orang-orang
                  musyrik.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اللَّهُمَّ إِنِّي أَصْبَحْتُ (أَمْسَيتُ) مِنْكَ فِي نِعْمَةٍ
                  وَعَافِيَةٍ وَسِتْر فَأَتِمَّ عَلَيَّ نِعْمَتَكَ وَعَافِيَتَكَ
                  وَسِتْرَكَ فِي الدُّنْيَا وَالآخِرَة
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, sesungguhnya aku berpagi hari (bersore hari) dari-Mu
                  dalam kenikmatan, kesehatan dan perlindungan. Maka
                  sempurnakannlah untukku kenikmatan, kesehatan dan
                  perlindungan-Mu itu di dunia dan akhirat.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اللَّهُمَّ مَا أَصْبَحَ (أَمْسَ) بِيْ مِنْ نِعْمَةٍ أَوْ
                  بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيْكَ لَكَ
                  فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, kenikmatan yang aku atau salah seorang dari
                  makhluk-Mu berpagi hari (bersore hari) dengannya adalah
                  dari-Mu semata; tiada sekutu bagi-Mu. Maka bagi-Mu segala puji
                  dan rasa syukur.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  يَا رَبِّي لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ
                  وَلِعَظِيمِ سُلْطَانِكَ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Tuhanku, Segala puji bagiMu sebagaimana seyogyanya
                  kemuliaan wajahMu dan keagungan kekuasaanMu.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ
                  نَبِيًّا وَرَسُولًا
                </p>
                <p className="text-justify">
                  {" "}
                  Aku ridha Allah sebagai Rabb, Islam sebagai agama, dan
                  Muhammad sebagai Rasul.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا
                  نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ
                </p>
                <p className="text-justify">
                  {" "}
                  Maha Suci Allah dan Segala Puji bagiNya, sebanyak bilangan
                  makhlukNya, seridha diriNya, setimbangan ‘arsy-Nya, dan
                  sebanyak tinta dari kata-kataNya.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي
                  الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ
                </p>
                <p className="text-justify">
                  {" "}
                  Dengan nama Allah Yang bersama NamaNya sesuatu apa pun tidak
                  akan celaka baik di bumi dan di langit. Dialah Maha Medengar
                  lagi maha Mengetahui.
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا
                  نَعْلَمُهُ وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُه
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah sesungguhnya kami berlindung kepadaMu dari
                  menyekutukanMu dengan sesuatu yang kami ketahui, dan kami
                  memohon ampunanMu dari apa-apa yang tidak kami ketahui.
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ
                </p>
                <p className="text-justify">
                  {" "}
                  Aku berlindung dengan kalimat Allah yang sempurna dari
                  keburukan apa-apa yang Dia ciptakan.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الهَمِّ وَالْحَزَنِ
                  وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوْذُ بِكَ
                  مِنَ الْجُبْنِ وَالبُخْلِ وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ
                  الدَّيْنِ وَقَهْرِ الرِّجَالِ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, aku berlindung kepada-Mu dari rasa gelisah dan
                  sedih, dari kelemahan dan kemalasan, dari sifat pengecut dan
                  bakhil, dan dari lilitan hutang dan kesewenang-wenangan orang.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللَّهُمَّ عَافِنِي فِي بَدَنِي اَللَّهُمَّ عَافِنِي فِي
                  سَمْعِي اَللَّهُمَّ عَافِنِي فِي بَصَرِي
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah berikanlah kesehatan bagi badanku, bagi
                  pendengaranku, bagi penglihatanku.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الْكُفْرِ
                  وَالْفَقْرِوَأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِلاَ إِلهَ
                  إِلاَّ أَنْتَ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah sungguh aku berlindung kepadaMu dari kekufuran dan
                  kefaqiran, Ya Allah sungguh aku berlindung kepadaMu dari azab
                  kubur, tidak ada Ilah kecuali Engkau.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللّهُمَّ أَنْتَ رَبِّي لَا إلهَ إِلاَّ أَنْتَ خَلَقْتَنِي
                  وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا
                  اسْتَطَعْتُ أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوْءُ
                  لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ بِذَنْبِي فَاغْفِرْ لِي
                  فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, Engkau Tuhanku, tiada Tuhan kecuali Engkau. Engkau
                  ciptakan aku dan aku adalah hamba-Mu. Aku berada di atas
                  janjiMu, semampuku. Aku berlindung kepadaMu dari keburukan
                  perbuatanku. Aku mengakui banyaknya nikmat (yang Engkau
                  anugerahkan) kepadaku dan aku mengakui dosa-dosaku, maka
                  ampunilah aku. Karena sesungguhnya tiada yang mengampuni
                  dosa-dosa melainkan Engkau{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إلهَ إِلَّا هُوَ
                  الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ
                </p>
                <p className="text-justify">
                  {" "}
                  Aku memohon ampunan Allah Yang Tiada Tuhan melainkan Dia, Yang
                  Maha Hidup dan Maha Mengurus (makhluk-Nya).{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 10 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ
                  سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّــيْتَ عَـلَى سَيِّدِنَا
                  إِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا إِبْـرَاهِيْمَ وبَارِكْ
                  عَـلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ
                  كَمَا بَارَكْتَ عَـلَى سَيِّدِنَا إِبْرَاهِيْمَ وَعَــلَى آلِ
                  سَيـِّدِنَا إِبْـرَاهِيْمَ فِي الْعَالَمِيْنَ إِنَّكَ حَمِيْدٌ
                  مَجِيْدٌ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah berikanlah shalawat kepada Nabi Muhammad dan keluarga
                  Nabi Muhammad, sebagaimana telah Engkau berikan kepada Nabi
                  Ibrahim dan keluarga Nabi Ibrahim. Berikanlah barakah kepada
                  Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana telah
                  Engkau berikan kepada Nabi Ibrahim dan keluarga Nabi Ibrahim.
                  Di alam Engkaulah Yang Maha Terpuji lagi Maha Mulia.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 100 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا
                  اللَّهُ وَاللَّهُ أَكْبَرُ
                </p>
                <p className="text-justify">
                  {" "}
                  Maha Suci Allah, segala puji bagi Allah, tiada Tuhan melainkan
                  Allah dan Allah Maha Besar.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 10 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  لاَ إلهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ
                  الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ
                </p>
                <p className="text-justify">
                  {" "}
                  Tiada Tuhan melainkan Allah semata, yang tiada sekutu
                  bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia
                  berkuasa ata segala sesuatu.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَّا إلهَ
                  إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ
                </p>
                <p className="text-justify">
                  {" "}
                  Maha suci Engkau ya Allah, dan segala puji bagi-Mu. Aku
                  bersaksi bahwa tiada Tuhan melainkan Engkau, aku memohon
                  ampunan dan bertaubat kepada-Mu{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Al-Matsurat </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ عَبْدِكَ
                  وَرَسُوْلِكَ النَّبِيِّ الأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ
                  وَسَلِّمْ تَسْلِيْمًا عَدَدَ مَا أَحَاطَ بِهِ عِلْمُكَ وَخَطَّ
                  بِهِ قَلَمُكَ وَأَحْصَاهُ كِتَابُكَ، وَارْضَ اللَّهُمَّ عَنْ
                  سَادَاتِنَا أَبِيْ بَكْرٍ وَعُمَرَ وَعُثْمَانَ وَعَلِيْ،
                  وَعَنِ الصَّحَابَةِ أَجْمَعِيْنَ، وَعَنِ التَّابِعِيْنَ
                  وَتَابِعِيْهِمْ بِإِحْسَانٍ إِلَى يَوْمِ الدِّيْن سُبْحَانَ
                  رَبِّك رَبِّ العِزَّةِ عَمَّا يَصِفُوْنَ، وَسَلَامٌ عَلَى
                  المُرْسَلِيْنَ، وَالحَمْدُ لِلَّهِ رَبِّ العَالَمِيْنَ
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah berikanlah shalawat kepada Nabi Muhammad; hamba-Mu,
                  nabi-Mu, dan Rasul-Mu; Nabi yang ummi. Juga kepada keluarga
                  dan para sahabatnya serta berilah keselamatan sebanyak yang
                  terjangkau oleh ilmu-Mu yang tergores oleh pena-Mu, dan yang
                  terangkum oleh kitab-Mu. Ridhailah ya Allah para pemimpin
                  kami, Abu Bakar, Umar, Utsman, dan Ali, semua sahabat, semua
                  tabi’in dan orang-orang yang mengikuti mereka sampai hari
                  pembalasan. Maha suci Tuhanmu; Tuhan kemuliaan, dari apa-apa
                  yang mereka sifatkan. Keselamatan semoga tercurah kepada para
                  utusan dan segala puji bagi Allah, Tuhan semesta alam.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title">Ali Imran - (1x)</span> <br />
                </div>

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 26</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    قُلِ ٱللَّهُمَّ مَٰلِكَ ٱلۡمُلۡكِ تُؤۡتِي ٱلۡمُلۡكَ مَن
                    تَشَآءُ وَتَنزِعُ ٱلۡمُلۡكَ مِمَّن تَشَآءُ وَتُعِزُّ مَن
                    تَشَآءُ وَتُذِلُّ مَن تَشَآءُۖ بِيَدِكَ ٱلۡخَيۡرُۖ إِنَّكَ
                    عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٞ
                  </div>
                  <div className="text-justify text-translate">
                    Katakanlah: &quot;Wahai Tuhan Yang mempunyai kerajaan,
                    Engkau berikan kerajaan kepada orang yang Engkau kehendaki
                    dan Engkau cabut kerajaan dari orang yang Engkau kehendaki.
                    Engkau muliakan orang yang Engkau kehendaki dan Engkau
                    hinakan orang yang Engkau kehendaki. Di tangan Engkaulah
                    segala kebajikan.Sesungguhnya Engkau Maha Kuasa atas segala
                    sesuatu.
                  </div>
                </div>
                <hr />

                <div className="py-3">
                  <div className="ayat-block">
                    <span className="ayat"> Ayat 27</span>
                  </div>
                  <div lang="ar" className="text-quran text-justify" dir="rtl">
                    تُولِجُ ٱلَّيۡلَ فِي ٱلنَّهَارِ وَتُولِجُ ٱلنَّهَارَ فِي
                    ٱلَّيۡلِۖ وَتُخۡرِجُ ٱلۡحَيَّ مِنَ ٱلۡمَيِّتِ وَتُخۡرِجُ
                    ٱلۡمَيِّتَ مِنَ ٱلۡحَيِّۖ وَتَرۡزُقُ مَن تَشَآءُ بِغَيۡرِ
                    حِسَابٖ
                  </div>
                  <div className="text-justify text-translate">
                    Engkau masukkan malam ke dalam siang dan Engkau masukkan
                    siang ke dalam malam. Engkau keluarkan yang hidup dari yang
                    mati, dan Engkau keluarkan yang mati dari yang hidup. Dan
                    Engkau beri rezeki siapa yang Engkau kehendaki tanpa hisab
                    (batas)
                  </div>
                </div>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Robithoh </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللَّهُمَّ إِنَّ هَذَا إِقْبَالُ نَهَارِكَ (لَيْلِكَ)
                  وَإِدْبَارُ لَيْلِكَ (نَهَارِكَ) وَأَصْوَاتُ دُعَاتِكَ
                  فَاغْفِرْلِي
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, sesungguhnya ini adalah siang-Mu (malam-Mu) yang
                  telah menjelang dan (malam-Mu) siang-Mu yang tengah berlalu
                  serta suara-suara penyeru-Mu, maka ampunilah aku.{" "}
                </p>
                <hr />
              </div>
              <div className="zikir-child">
                <div className="title-block">
                  <span className="title"> Do'a Robithoh </span>
                </div>
                <div className="ayat-block">
                  <span className="ayat"> Dibaca 3 Kali</span>
                </div>
                <p lang="ar" className="text-quran text-justify" dir="rtl">
                  اَللّهُمَّ إِنَّكَ تَعْلَمُ أَنَّ هَذِهِ الْقُلُوْبَ، قَدِ
                  اجْتَمَعَتْ عَلَى مَحَبَّتِكَ وَالْتَقَتْ عَلَى طَاعَتِكَ،
                  وَتَوَحَّدَتْ عَلَى دَعْوَتِكَ وَتَعَاهَدَتْ عَلَى نُصْرَةِ
                  شَرِيْعَتِكَ فَوَثِّقِ اللَّهُمَّ رَابِطَتَهَا، وَأَدِمْ
                  وُدَّهَا، وَاهْدِهَا سُبُلَهَا وَامْلَأَهَا بِنُوْرِكَ
                  الَّذِيْ لاَ يَخْبُوْا وَاشْرَحْ صُدُوْرَهَا بِفَيْضِ
                  الْإِيْمَانِ بِكَ، وَجَمِيْلِ التَّوَكُّلِ عَلَيْكَ
                  وَاَحْيِهَا بِمَعْرِفَتِكَ، وَأَمِتْهَا عَلَى الشَّهَادَةِ فِي
                  سَبِيْلِكَ إِنَّكَ نِعْمَ الْمَوْلَى وَنِعْمَ النَّصِيْرِ.
                  اَللَّهُمَّ أَمِيْنَ. وَصَلِّ اللَّهُمَّ عَلَى سَيِّدَنَا
                  مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمَ.
                </p>
                <p className="text-justify">
                  {" "}
                  Ya Allah, sesungguhnya Engkau Maha Mengetahui bahawa hati-hati
                  ini, telah berhimpun di atas dasar kecintaan terhadapmu,
                  bertemu di atas ketaatan kepada-Mu dan bersatu bagi memikul
                  beban dakwah-Mu, hati-hati ini telah mengikat persetiaan untuk
                  menolong meninggikan syariat-Mu. Oleh itu, Ya Allah, Engkau
                  perkukuhkan ikatannya dan Engkau kekalkan kemesraan hati-hati
                  ini, tunjukilah hati-hati ini akan jalan yang sebenar, serta
                  penuhkanlah (piala) hati-hati ini dengan cahaya Rabbani-Mu
                  yang tidak kunjung redup, lapangkanlah hati-hati dengan
                  limpahan keimanan serta keindahan tawakkal kepada-Mu, hidup
                  suburkanlah hati-hati ini dengan makrifat (pengenalan yang
                  sebenarnya) tentang-Mu. (Jika Engkau takdirkan kami mati) maka
                  matikanlah hati-hati ini sebagai para syuhada dalam perjuangan
                  agama-Mu. Sesungguhnya Engkau sebaik-baik pelindung dan
                  sebaik-baik penolong. Ya Allah perkenankanlah doa kami. Dan
                  semoga shalawat serta salam selalu tercurah kepada Nabi
                  Muhammad, keluarganya dan kepada semua sahabatnya.{" "}
                </p>
                <hr />
              </div>
            </div>
          </div>
        )}
      </div>
      {isVisible && (
        <div className="fixed inset-x-1/2 bottom-4 z-50">
          <Button
            onClick={() => scrollToTop()}
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            <ChevronUp className="h-6 w-6" />
            Scroll ke Atas
          </Button>
        </div>
      )}
    </div>
  );
}
