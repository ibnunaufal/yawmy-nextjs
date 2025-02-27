"use client";
import HeadComponent from "@/components/HeadComponent";
import { useParams, useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  BadgeCheck,
  BadgeX,
  CloudUpload,
  Download,
  Footprints,
  Info,
  Map,
  MapPin,
  MessageCircleQuestion,
  MessageCircleWarning,
  Share,
} from "lucide-react";
import html2canvas from "html2canvas";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { doc, getDoc } from "@firebase/firestore";
import db from "@/utils/firestore";
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

export default function QrisPage({id}) {
    const params = useParams();
    // const { id } = params;
    const router = useRouter();
    const [qris, setQris] = useState(null);
  
    const handleDownloadImage = async () => {
      const element = document.getElementById("print"),
        canvas = await html2canvas(element),
        data = canvas.toDataURL("image/jpg"),
        link = document.createElement("a");
  
      link.href = data;
      link.download = "downloaded-image.jpg";
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    const handleGoToQrisList = () => {
      router.push("/qris");
    };
  
    useEffect(() => {
      // fetch data from firestore
      getData();
      // getQrisData(id);
    }, []);
  
    const getData = async () => {
      console.log("id", id);
      const qrisRef = doc(db, "infaqris", id);
      await getDoc(qrisRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setQris(docSnap.data());
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    };
  
    return (
      <div className="h-screen py-2">
        <HeadComponent title="Detail QRIS" />
        {qris === null ? (
          <div className="flex justify-center items-center h-full">
            <MessageCircleWarning size={48} />
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          <div>
            <Card className="w-full bg-bg" id="print">
              <CardHeader>
                <CardTitle className="flex justify-center">{qris.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="flex justify-center mb-4">
                    <QRCode value={qris.qris} bgColor="transparent" />
                  </div>
                  <div className="flex flex-col justify-center items-center my-4 ">
                    <span className="block">{qris.city_name}</span>
                    <span className="block">{qris.province_name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col items-center mt-4">
              <Alert>
                <AlertTitle className="flex mb-4">{qris.name}</AlertTitle>
                <AlertDescription>
                  <div className="my-2">
                    <div className="flex my-2 items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>
                        {qris.city_name} {qris.province_name}
                      </span>
                    </div>
                    <div className="flex my-2 items-center">
                      {qris.verified == true ? (
                        <BadgeCheck className="h-4 w-4 mr-2" />
                      ) : (
                        <BadgeX className="h-4 w-4 mr-2" />
                      )}
                        <span>{qris.verified == true ? 'Sudah' : 'Belum'} Terverifikasi.</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <span className="flex  items-center text-blue-900 underline ml-2">
                              Apa maksud verifikasi?
                            </span>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 text-mtext">
                            <div className="">
                              <div className="flex my-2 items-center">
                                <MessageCircleQuestion className="h-4 w-4 mr-2" />
                                <span className="font-bold">Verifikasi</span>
                              </div>
                              <span className="">
                                Verifikasi adalah proses pengecekan keaslian QRIS
                                oleh admin dengan melakukan inquiri menggunakan aplikasi
                                e-wallet atau M-Banking yang mendukung QRIS.
                              </span>
                              <span className="mt-2">
                                Segala bentuk penyalahgunaan yang terjadi diluar tanggung jawab
                                kami.
                              </span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    <div className="flex my-2 items-center">
                      <CloudUpload className="h-4 w-4 mr-2" />
                      <span>Diunggah oleh {qris.uploader.split("|")[0]}</span>
                    </div>
                    {
                      qris.mapUrl && (
                        <div className="flex my-2 items-center">
                          <Map className="h-4 w-4 mr-2" />
                          <a href={qris.mapUrl} target="_blank">
                            <span className="text-blue-900 underline">
                              Buka di Google Maps
                            </span>
                          </a>
                        </div>
                      )
                    }
                    {/* <div className="flex my-2 items-center">
                      <Map className="h-4 w-4 mr-2" />
                      <a href={"https://naufall.com"} target="_blank">
                        <span className="text-blue-900 underline">
                          Buka di Google Maps
                        </span>
                      </a>
                    </div> */}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
            <div className="flex flex-col items-center mt-4">
              <Alert>
                <AlertTitle className="flex">
                  <Footprints className="h-4 w-4 mr-2" /> Langkah Selanjutnya
                </AlertTitle>
                <AlertDescription>
                  Silahkan unduh atau screenshot QR Code ini lalu lakukan
                  pembayaran melalui aplikasi e-wallet atau M-Banking yang
                  mendukung QRIS.
                  <Button onClick={handleDownloadImage} className="mr-2">
                    <Download size={24} />
                    Download
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="neutral" className="mt-2">
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
                          <WhatsappShareButton url={`https://yaw.my.id/qris/${id}`} title={`QRIS ${qris.name}`}>
                            <WhatsappIcon size={24} />
                          </WhatsappShareButton>
                          <TelegramShareButton url={`https://yaw.my.id/qris/${id}`} title={`QRIS ${qris.name}`}>
                            <TelegramIcon size={24} />
                          </TelegramShareButton>
                          <FacebookShareButton url={`https://yaw.my.id/qris/${id}`} quote={`QRIS ${qris.name}`}>
                            <FacebookIcon size={24} />
                          </FacebookShareButton>
                          <TwitterShareButton url={`https://yaw.my.id/qris/${id}`} title={`QRIS ${qris.name}`}>
                            <TwitterIcon size={24} />
                          </TwitterShareButton>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </AlertDescription>
              </Alert>
  
              <Button
                onClick={handleGoToQrisList}
                variant="neutral"
                className="my-2"
              >
                <ArrowLeft size={24} />
                Kembali ke Daftar QRIS
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }