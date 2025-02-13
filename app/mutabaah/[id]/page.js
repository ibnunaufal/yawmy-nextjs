"use client";
import HeadComponent from "@/components/HeadComponent";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import db, { saveMutabaah } from "@/utils/firestore";
import { auth } from "@/utils/auth";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { getKeyName } from "@/utils/getKeyName";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { doc, getDoc, setDoc } from "@firebase/firestore";

let mutabaahData = {
  qiyaamul_lail: false,

  subuh: false,
  subuh_rawatib: false,
  subuh_jamaah: false,

  dhuha: false,

  dhuhur: false,
  dhuhur_rawatib: false,
  dhuhur_jamaah: false,

  ashar: false,
  ashar_rawatib: false,
  ashar_jamaah: false,

  magrib: false,
  magrib_rawatib: false,
  magrib_jamaah: false,

  isya: false,
  isya_rawatib: false,
  isya_jamaah: false,

  tarawih: false,
  infaq: false,
  tilawah: false,
  puasa: false,
  dzikir_pagi: false,
  dzikir_petang: false,
  finish_mutabaah: false,
};

export default function EvaluatePage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [mutabaah, setMutabaah] = useState(mutabaahData);
  const [currentEmail, setCurrentEmail] = useState("");

  const [lastFewDays, setLastFewDays] = useState([]);
  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in:", user.email);
        setCurrentEmail(user.email);
        getCurrentData(user.email);
      } else {
        router.push("/login");
      }
    });

    generateLastFewDays();
  }, []);

  function getCurrentData(email) {
    // check in firestore if there is a record for today and for the current user
    const docRef = doc(db, `mutabaah/${email}/records/${id}`);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setMutabaah(docSnap.data().mutabaahData);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }

  const generateLastFewDays = () => {
    let currentDate = moment(Date.now());
    let lastFewDays = [];

    lastFewDays.push(currentDate.format("YYYY-MM-DD"));
    for (let i = 0; i < 30; i++) {
      lastFewDays.push(currentDate.subtract(1, "days").format("YYYY-MM-DD"));
    }
    console.log(lastFewDays);
    setLastFewDays(lastFewDays);
  };
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setMutabaah({
  //     ...mutabaah,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };
  const handleChange = (key, checked) => {
    setMutabaah({
      ...mutabaah,
      [key]: checked,
    });
  };

  const checkAllWajib = () => {
    setMutabaah({
      ...mutabaah,
      subuh: true,
      subuh_rawatib: true,
      subuh_jamaah: true,
      dhuhur: true,
      dhuhur_rawatib: true,
      dhuhur_jamaah: true,
      ashar: true,
      ashar_rawatib: true,
      ashar_jamaah: true,
      magrib: true,
      magrib_rawatib: true,
      magrib_jamaah: true,
      isya: true,
      isya_rawatib: true,
      isya_jamaah: true,
    });
  };

  const checkAllSunnah = () => {
    setMutabaah({
      ...mutabaah,
      qiyaamul_lail: true,
      dhuha: true,
      tarawih: true,
    });
  };

  const checkAllLainnya = () => {
    setMutabaah({
      ...mutabaah,
      infaq: true,
      tilawah: true,
      puasa: true,
      dzikir_pagi: true,
      dzikir_petang: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mutabaah);
    saveMutabaah(currentEmail, id, mutabaah).then((res) => {
      if (res.success) {
        router.push("/mutabaah");
      }
    });
  };

  async function saveMutabaah(email, date, mutabaahData) {
    try {
      const docRef = doc(db, `mutabaah/${email}/records/${date}`);
      await setDoc(docRef, { mutabaahData }, { merge: true });
      console.log("Mutabaah data saved successfully!");
      return { success: true, message: "Mutabaah data saved successfully!" };
    } catch (error) {
      console.error("Error saving data:", error);
      return { success: false, message: "Error saving data", error };
    }
  }
  return (
    <div className="flex flex-col min-h-screen py-2">
      <title>Isi Mutabaah | Yawmy</title>
      <HeadComponent title="Mutabaah" />

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex justify-between items-center mt-1">
          <span className="text-lg font-bold">
            {moment(id).format("ddd, DD MMM YYYY")}
          </span>
        </div>

        <p className="text-gray-600">Lengkapi mutabaah kamu hari ini ya! </p>

        {/* ibadah wajib */}
        <Card className="w-full my-2">
          <CardHeader>
            <CardTitle>Ibadah Wajib</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"subuh"}>{getKeyName("subuh")}</Label>
                    <Switch
                      id={"subuh"}
                      name={"subuh"}
                      onCheckedChange={(checked) =>
                        handleChange("subuh", checked)
                      }
                      checked={mutabaah["subuh"]}
                    />
                  </div>
                </div>
                {mutabaah["subuh"] && (
                  <div className="bg-secondary bg-opacity-20 p-2 border-2 border-black rounded-base mx-2 mt-1">
                    <div className="flex justify-between space-x-2 items-center my-1">
                      <Label htmlFor={"subuh_rawatib"}>
                        {getKeyName("subuh_rawatib")}
                      </Label>
                      <Switch
                        id={"subuh_rawatib"}
                        name={"subuh_rawatib"}
                        onCheckedChange={(checked) =>
                          handleChange("subuh_rawatib", checked)
                        }
                        checked={mutabaah["subuh_rawatib"]}
                      />
                    </div>
                    <div className="flex justify-between space-x-2 items-center my-1">
                      <Label htmlFor={"subuh_jamaah"}>Berjamaah?</Label>
                      <Switch
                        id={"subuh_jamaah"}
                        name={"subuh_jamaah"}
                        onCheckedChange={(checked) =>
                          handleChange("subuh_jamaah", checked)
                        }
                        checked={mutabaah["subuh_jamaah"]}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"dhuhur"}>{getKeyName("dhuhur")}</Label>
                    <Switch
                      id={"dhuhur"}
                      name={"dhuhur"}
                      onCheckedChange={(checked) =>
                        handleChange("dhuhur", checked)
                      }
                      checked={mutabaah["dhuhur"]}
                    />
                  </div>
                </div>
                {mutabaah["dhuhur"] && (
                  <div className="bg-secondary bg-opacity-20 p-2 border-2 border-black rounded-base mx-2 mt-1">
                    <div className="flex justify-between space-x-2 items-center my-1">
                      <Label htmlFor={"dhuhur_rawatib"}>
                        {getKeyName("dhuhur_rawatib")}
                      </Label>
                      <Switch
                        id={"dhuhur_rawatib"}
                        name={"dhuhur_rawatib"}
                        onCheckedChange={(checked) =>
                          handleChange("dhuhur_rawatib", checked)
                        }
                        checked={mutabaah["dhuhur_rawatib"]}
                      />
                    </div>
                    <div className="flex justify-between space-x-2 items-center my-1">
                      <Label htmlFor={"dhuhur_jamaah"}>Berjamaah?</Label>
                      <Switch
                        id={"dhuhur_jamaah"}
                        name={"dhuhur_jamaah"}
                        onCheckedChange={(checked) =>
                          handleChange("dhuhur_jamaah", checked)
                        }
                        checked={mutabaah["dhuhur_jamaah"]}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"ashar"}>{getKeyName("ashar")}</Label>
                    <Switch
                      id={"ashar"}
                      name={"ashar"}
                      onCheckedChange={(checked) =>
                        handleChange("ashar", checked)
                      }
                      checked={mutabaah["ashar"]}
                    />
                  </div>
                </div>
                {mutabaah["ashar"] && (
                  <div className="bg-secondary bg-opacity-20 p-2 border-2 border-black rounded-base mx-2 mt-1">
                    <div className="flex justify-between space-x-2 items-center my-1">
                      <Label htmlFor={"ashar_rawatib"}>
                        {getKeyName("ashar_rawatib")}
                      </Label>
                      <Switch
                        id={"ashar_rawatib"}
                        name={"ashar_rawatib"}
                        onCheckedChange={(checked) =>
                          handleChange("ashar_rawatib", checked)
                        }
                        checked={mutabaah["ashar_rawatib"]}
                      />
                    </div>
                    <div className="flex justify-between space-x-2 items-center my-1">
                      <Label htmlFor={"ashar_jamaah"}>Berjamaah?</Label>
                      <Switch
                        id={"ashar_jamaah"}
                        name={"ashar_jamaah"}
                        onCheckedChange={(checked) =>
                          handleChange("ashar_jamaah", checked)
                        }
                        checked={mutabaah["ashar_jamaah"]}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"magrib"}>{getKeyName("magrib")}</Label>
                    <Switch
                      id={"magrib"}
                      name={"magrib"}
                      onCheckedChange={(checked) =>
                        handleChange("magrib", checked)
                      }
                      checked={mutabaah["magrib"]}
                    />
                  </div>
                </div>
                {mutabaah["magrib"] && (
                  <div className="bg-secondary bg-opacity-20 p-2 border-2 border-black rounded-base mx-2 mt-1">
                    <div className="flex justify-between space-x-2 items-center my-1">
                      <Label htmlFor={"magrib_rawatib"}>
                        {getKeyName("magrib_rawatib")}
                      </Label>
                      <Switch
                        id={"magrib_rawatib"}
                        name={"magrib_rawatib"}
                        onCheckedChange={(checked) =>
                          handleChange("magrib_rawatib", checked)
                        }
                        checked={mutabaah["magrib_rawatib"]}
                      />
                    </div>
                    <div className="flex justify-between space-x-2 items-center my-1">
                      <Label htmlFor={"magrib_jamaah"}>Berjamaah?</Label>
                      <Switch
                        id={"magrib_jamaah"}
                        name={"magrib_jamaah"}
                        onCheckedChange={(checked) =>
                          handleChange("magrib_jamaah", checked)
                        }
                        checked={mutabaah["magrib_jamaah"]}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"isya"}>{getKeyName("isya")}</Label>
                    <Switch
                      id={"isya"}
                      name={"isya"}
                      onCheckedChange={(checked) =>
                        handleChange("isya", checked)
                      }
                      checked={mutabaah["isya"]}
                    />
                  </div>
                </div>
                {mutabaah["isya"] && (
                  <div className="bg-secondary bg-opacity-20 p-2 border-2 border-black rounded-base mx-2 mt-1">
                    <div className="flex justify-between space-x-2 items-center my-1">
                      <Label htmlFor={"isya_rawatib"}>
                        {getKeyName("isya_rawatib")}
                      </Label>
                      <Switch
                        id={"isya_rawatib"}
                        name={"isya_rawatib"}
                        onCheckedChange={(checked) =>
                          handleChange("isya_rawatib", checked)
                        }
                        checked={mutabaah["isya_rawatib"]}
                      />
                    </div>
                    <div className="flex justify-between space-x-2 items-center my-1">
                      <Label htmlFor={"isya_jamaah"}>Berjamaah?</Label>
                      <Switch
                        id={"isya_jamaah"}
                        name={"isya_jamaah"}
                        onCheckedChange={(checked) =>
                          handleChange("isya_jamaah", checked)
                        }
                        checked={mutabaah["isya_jamaah"]}
                      />
                    </div>
                  </div>
                )}
              </div>
              {mutabaah["subuh"] &&
              mutabaah["dhuhur"] &&
              mutabaah["ashar"] &&
              mutabaah["magrib"] &&
              mutabaah["isya"] ? null : (
                <div
                  className="flex justify-end"
                  onClick={() => {
                    checkAllWajib();
                  }}
                >
                  <span className="underline text-xs">Pilih Semua</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* solat sunnah */}
        <Card className="w-full my-2">
          <CardHeader>
            <CardTitle>Solat Sunnah</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"qiyaamul_lail"}>
                      {getKeyName("qiyaamul_lail")}
                    </Label>
                    <Switch
                      id={"qiyaamul_lail"}
                      name={"qiyaamul_lail"}
                      onCheckedChange={(checked) =>
                        handleChange("qiyaamul_lail", checked)
                      }
                      checked={mutabaah["qiyaamul_lail"]}
                    />
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"dhuha"}>{getKeyName("dhuha")}</Label>
                    <Switch
                      id={"dhuha"}
                      name={"dhuha"}
                      onCheckedChange={(checked) =>
                        handleChange("dhuha", checked)
                      }
                      checked={mutabaah["dhuha"]}
                    />
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"tarawih"}>{getKeyName("tarawih")}</Label>
                    <Switch
                      id={"tarawih"}
                      name={"tarawih"}
                      onCheckedChange={(checked) =>
                        handleChange("tarawih", checked)
                      }
                      checked={mutabaah["tarawih"]}
                    />
                  </div>
                </div>
              </div>
              {mutabaah["qiyaamul_lail"] &&
              mutabaah["dhuha"] &&
              mutabaah["dzikir_pagi"] &&
              mutabaah["dzikir_petang"] ? null : (
                <div
                  className="flex justify-end"
                  onClick={() => {
                    checkAllSunnah();
                  }}
                >
                  <span className="underline text-xs">Pilih Semua</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ibadah lainnya */}
        <Card className="w-full my-2">
          <CardHeader>
            <CardTitle>Ibadah Lainnya</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"infaq"}>{getKeyName("infaq")}</Label>
                    <Switch
                      id={"infaq"}
                      name={"infaq"}
                      onCheckedChange={(checked) =>
                        handleChange("infaq", checked)
                      }
                      checked={mutabaah["infaq"]}
                    />
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"tilawah"}>{getKeyName("tilawah")}</Label>
                    <Switch
                      id={"tilawah"}
                      name={"tilawah"}
                      onCheckedChange={(checked) =>
                        handleChange("tilawah", checked)
                      }
                      checked={mutabaah["tilawah"]}
                    />
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"puasa"}>{getKeyName("puasa")}</Label>
                    <Switch
                      id={"puasa"}
                      name={"puasa"}
                      onCheckedChange={(checked) =>
                        handleChange("puasa", checked)
                      }
                      checked={mutabaah["puasa"]}
                    />
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"dzikir_pagi"}>
                      {getKeyName("dzikir_pagi")}
                    </Label>
                    <Switch
                      id={"dzikir_pagi"}
                      name={"dzikir_pagi"}
                      onCheckedChange={(checked) =>
                        handleChange("dzikir_pagi", checked)
                      }
                      checked={mutabaah["dzikir_pagi"]}
                    />
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="bg-bg p-2 border-2 border-black rounded-base z-10">
                  <div className="flex justify-between space-x-2 items-center">
                    <Label htmlFor={"dzikir_petang"}>
                      {getKeyName("dzikir_petang")}
                    </Label>
                    <Switch
                      id={"dzikir_petang"}
                      name={"dzikir_petang"}
                      onCheckedChange={(checked) =>
                        handleChange("dzikir_petang", checked)
                      }
                      checked={mutabaah["dzikir_petang"]}
                    />
                  </div>
                </div>
              </div>
              {mutabaah["infaq"] &&
              mutabaah["tilawah"] &&
              mutabaah["puasa"] &&
              mutabaah["dzikir"] ? null : (
                <div
                  className="flex justify-end"
                  onClick={() => {
                    checkAllLainnya();
                  }}
                >
                  <span className="underline text-xs">Pilih Semua</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="bg-bg p-2 border-2 border-black rounded-base flex justify-between items-center">
          <span>Kalau sudah klik simpan ya!</span>
          <Button type="submit">Simpan</Button>
          <Drawer>
            <DrawerTrigger asChild>
              <Button>Open</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-[300px]">
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="grid grid-cols-2">
                  <Button variant="noShadow">Submit</Button>
                  <DrawerClose asChild>
                    <Button className="bg-bw text-text" variant="noShadow">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </form>
    </div>
  );
}
