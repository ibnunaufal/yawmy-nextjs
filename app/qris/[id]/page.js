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
import { ArrowLeft, Download, Info, MessageCircleWarning } from "lucide-react";
import html2canvas from "html2canvas";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function QrisPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

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

  return (
    <div className="h-screen py-2">
      <HeadComponent title="Detail QRIS" />
      <Card className="w-full bg-bg" id="print">
        <CardHeader>
          <CardTitle>Masjid</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-center my-4">
              <QRCode value={id} bgColor="transparent" />
            </div>
            <span className="block">Nama Masjid</span>
            <span className="block">Alamat Masjid</span>
            <span className="block text-center mt-4">
            </span>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center mt-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Langkah Selanjutnya</AlertTitle>
          <AlertDescription>
            Silahkan unduh atau screenshot QR Code ini lalu lakukan pembayaran
            melalui aplikasi e-wallet atau M-Banking yang mendukung QRIS.
          </AlertDescription>
        </Alert>
        <Button onClick={handleDownloadImage} className="my-2">
          <Download size={24} />
          Download
        </Button>
        <Button onClick={handleGoToQrisList} variant="neutral">
          <ArrowLeft size={24} />
          Kembali ke Daftar QRIS
        </Button>
      </div>
    </div>
  );
}
