"use client";
import HeadComponent from "@/components/HeadComponent";
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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CommandList } from "cmdk";
import { BadgeCheck, Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import {
  getAllProvinces,
  getCitiesByProvince,
} from "@/components/WilayahComponent";
import Html5QrcodePlugin from "@/components/Html5QrcodePlugin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/utils/auth";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection } from "@firebase/firestore";
import db from "@/utils/firestore";


export default function ContributePage() {
  var sampleData = {
    city_id: "",
    city_name: "",
    created_at: "",
    donation_count: 0,
    inquiry_name: "",
    latitude: "",
    longitude: "",
    mapUrl: "",
    name: "",
    province_id: "",
    province_name: "",
    qris: "",
    type: "",
    type_name: "",
    updated_at: "",
    uploader: "",
    verified: "false",
    verified_at: "",
    viewed: 0,
  };
  var typeList = [
    { value: "masjid", name: "Masjid" },
    { value: "mushola", name: "Mushola" },
    { value: "yayasan", name: "Yayasan" },
    { value: "lembaga-pendidikan", name: "Lembaga Pendidikan" },
    { value: "rumah-sakit", name: "Rumah Sakit" },
    { value: "panti-asuhan", name: "Panti Asuhan" },
    { value: "pondok-pesantren", name: "Pondok Pesantren" },
  ];
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState(sampleData);
  const [openType, setOpenType] = useState(false);
  const [allProvince, setAllProvince] = useState(getAllProvinces);
  const [allCityByProvince, setAllCityByProvince] = useState(
    getCitiesByProvince(formData.province_id)
  );
  const [openProvince, setOpenProvince] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [tempQris, setTempQris] = useState(null);

  function onNewScanResult(qrCodeMessage) {
    setTempQris(qrCodeMessage);
    setFormData({ ...formData, qris: qrCodeMessage });
    console.log(`hasil ${qrCodeMessage}`);
    toast({
      description: "QRIS berhasil terdeteksi",
    });
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login?message=Silahkan login terlebih dahulu&redirect=contribute");
      } else {
        let uploader = user.displayName + "|" + user.email;
        setFormData({ ...formData, uploader: uploader });
      }
    });
  }, []);

  function submit() {
    // check all data are filled
    if (!formData.name) {
      toast({
        description: "Nama tempat tidak boleh kosong",
      });
      return;
    }
    if (!formData.city_id || !formData.province_id) {
      toast({
        description: "Provinsi dan Kota tidak boleh kosong",
      });
      return;
    }
    if (!formData.qris) {
      toast({
        description: "QRIS tidak boleh kosong",
      });
      return;
    }

    setFormData({ ...formData, created_at: moment().format(), updated_at: moment().format() });

    console.log("submit");
    console.log(formData);
    const docRef = addDoc(collection(db, "infaqris"), formData).then(() => {
      toast({
        description: "Data berhasil disimpan, anda akan dialihkan ke halaman QRIS",
      });
      setFormData(sampleData);
      // after 3 seconds, redirect to qris list
      setTimeout(() => {
        router.push("/qris");
      }, 3000);
    });
  }

  return (
    <div className="h-screen py-2">
      <HeadComponent title="Berkontribusi" />
      <div className="mb-8">
        <Card className="w-full my-1 bg-bg">
          <CardHeader>
            <CardTitle>Unggah QRIS</CardTitle>
          </CardHeader>
          <CardDescription></CardDescription>
          <CardContent>
            <div className=" my-1">
              <Label htmlFor="name" className="my-1">
                Nama Tempat
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className=" my-2 flex flex-col">
              <Label htmlFor="type" className="my-1">
                Tipe Tempat
              </Label>
              <div>
                <Popover
                  className="w-full"
                  id={"type"}
                  open={openType}
                  onOpenChange={setOpenType}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="noShadow"
                      role="combobox"
                      aria-expanded={openType}
                      className="w-full justify-between"
                    >
                      {formData.type
                        ? typeList.find(
                            (typeList) => typeList.value === formData.type
                          )?.name
                        : "Pilih tipe..."}
                      <ChevronsUpDown
                        color="black"
                        className="ml-2 h-4 w-4 shrink-0"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full !border-0 p-0 font-bold">
                    <Command>
                      <CommandList>
                        <CommandInput placeholder="Search framework..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {typeList.map((type) => (
                            <CommandItem
                              key={type.value}
                              value={type.value}
                              onSelect={(type) => {
                                console.log(type);
                                setFormData({
                                  ...formData,
                                  type: type,
                                  type_name: typeList.find(
                                    (typeList) => typeList.value === type
                                  )?.name,
                                });
                                setOpenType(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.type === type.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {type.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className=" my-2 flex flex-col">
              <Label htmlFor="location" className="my-1">
                Lokasi Tempat
              </Label>
              <div id="location" className="flex justify-between">
                <div className="w-full mr-2">
                  <Popover
                    className="w-full"
                    id={"province"}
                    open={openProvince}
                    onOpenChange={setOpenProvince}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="noShadow"
                        role="combobox"
                        aria-expanded={openProvince}
                        className="w-full justify-between"
                      >
                        {formData.province_id
                          ? allProvince.find(
                              (prov) => prov.id === formData.province_id
                            )?.name
                          : "Pilih Provinsi..."}
                        <ChevronsUpDown
                          color="black"
                          className="ml-2 h-4 w-4 shrink-0"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full !border-0 p-0 font-bold">
                      <Command>
                        <CommandList>
                          <CommandInput placeholder="Search Province..." />
                          <CommandEmpty>No Province found.</CommandEmpty>
                          <CommandGroup>
                            {allProvince.map((prov) => (
                              <CommandItem
                                key={prov.id}
                                value={prov.name}
                                onSelect={(provSelect) => {
                                  let tempProv = allProvince.find(
                                    (prov) => prov.name === provSelect
                                  );
                                  setFormData({
                                    ...formData,
                                    province_id: tempProv.id,
                                    province_name: provSelect,
                                    city_id: "",
                                    city_name: "",
                                  });
                                  setAllCityByProvince(
                                    getCitiesByProvince(tempProv.id)
                                  );
                                  setOpenProvince(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.province_id === prov.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {prov.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-full">
                  <Popover
                    className="w-full"
                    id={"city"}
                    open={openCity}
                    onOpenChange={setOpenCity}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="noShadow"
                        role="combobox"
                        aria-expanded={openCity}
                        className="w-full justify-between"
                      >
                        {formData.city_id
                          ? allCityByProvince.find(
                              (city) => city.id === formData.city_id
                            )?.name
                          : "Pilih Kota..."}
                        <ChevronsUpDown
                          color="black"
                          className="ml-2 h-4 w-4 shrink-0"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full !border-0 p-0 font-bold">
                      <Command>
                        <CommandList>
                          <CommandInput placeholder="Search City..." />
                          <CommandEmpty>No City found.</CommandEmpty>
                          <CommandGroup>
                            {allCityByProvince.map((city) => (
                              <CommandItem
                                key={city.id}
                                value={city.name}
                                onSelect={(citySelect) => {
                                  console.log(citySelect);
                                  setFormData({
                                    ...formData,
                                    city_id: allCityByProvince.find(
                                      (city) => city.name === citySelect
                                    ).id,
                                    city_name: citySelect,
                                  });
                                  setOpenCity(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.city_id === city.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {city.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <div className=" my-2 flex flex-col">
              <Label htmlFor="type" className="my-1">
                Link Lokasi pada Google Maps
              </Label>
              <div>
                <Input
                  type="text"
                  id="mapUrl"
                  name="mapUrl"
                  placeholder="Diisi link Google Maps, kosongin juga gapapa"
                  value={formData.mapUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, mapUrl: e.target.value })
                  }
                />
              </div>
            </div>
            <div className=" my-2 flex flex-col">
              <Label htmlFor="qris" className="my-1">
                Kode QRIS
              </Label>
              <div id="qris" className="flex ">
                <Input
                  type="text"
                  name="mapUrl"
                  disabled
                  value={formData.qris}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setTempQris(null);
                      }}
                      variant="reverse"
                    >
                      Unggah QRIS
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Unggah QRIS</DialogTitle>
                      <DialogDescription>
                        Pindai QRIS menggunakan kamera atau unggah gambar QRIS
                      </DialogDescription>
                    </DialogHeader>
                    {tempQris && (
                      <div className="my-1">
                        <div className="mb-1 flex items-center">
                          <BadgeCheck className="h-4 w-4 mr-2" />
                          <span>QRIS berhasil terdeteksi</span>
                        </div>
                        <Input type="text" value={tempQris} disabled />
                      </div>
                    )}
                    <Html5QrcodePlugin
                      fps={10}
                      qrbox={250}
                      disableFlip={false}
                      qrCodeSuccessCallback={onNewScanResult}
                    />
                    <DialogFooter className="w-full mt-2 flex justify-center items-center">
                      {tempQris && (
                        <span>Tutup dialog ini dengan menekan tombol "x"</span>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className=" my-2 flex flex-col">
              <Label htmlFor="uploader" className="my-1">
                Uploader
              </Label>
              <div>
                <Input
                  type="text"
                  id="uploader"
                  name="uploader"
                  value={formData.uploader}
                  onChange={(e) =>
                    setFormData({ ...formData, uploader: e.target.value })
                  }
                  disabled
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className=" my-4 flex items-center">
              <Checkbox id="agreement" name="agreement" />
              <Label htmlFor="agreement" className="ml-3 text-sm">
                Saya setuju dengan syarat dan ketentuan
              </Label>
            </div>
            <div className=" my-2 flex flex-col">
              <Button onClick={submit} className="w-full">
                Simpan
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </div>
  );
}
