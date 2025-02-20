"use client";
import HeadComponent from "@/components/HeadComponent";
import { useRouter } from "next/navigation";
import ImageCard from "@/components/ui/image-card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Lightbulb } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import db from "@/utils/firestore";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { auth } from "@/utils/auth";
import { useToast } from "@/hooks/use-toast";

export default function Qris() {
  const router = useRouter();
  const { toast } = useToast();

  const [qrisList, setQrisList] = useState([]);
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [value, setValue] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];
  const items = [
    "Ikut berkontribusi dengan mengunggah kode QRIS untuk bersedekah.",
    "Dapatkan pahal jariyah dengan ikut turut serta membagikan kode QRIS pada platform ini.",
    "Ikutlah berkontribusi dengan mengunggah kode QRIS untuk bersedekah.",
    "Dapatkan pahala jariyah dengan ikut turut serta membagikan kode QRIS pada platform ini.",
  ];

  const setProvince = (value) => {
    setProvinceOpen(value);
  };

  useEffect(() => {
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log("User is logged in:", user.email);
    //     getQrisList();
    //   } else {
    //     router.push("/login");
    //   }
    // });
    getQrisList();
  }, []);

  async function getQrisList() {
    const querySnapshot = await getDocs(collection(db, "infaqris"));
    const list = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Get the document ID
      ...doc.data(), // Get the fields (infaqId, name)
    }));
    setQrisList(list);
  }

  const handleSearch = () => {
    toast({
      title: "Mohon maaf",
      description: "Fitur pencarian belum tersedia saat ini😅",
    });
  };

  return (
    <div className="h-screen py-2">
      <HeadComponent title="InfaQRIS" />

      <h1 className="text-2xl font-bold">Daftar Kode QRIS</h1>
      <p className="text-sm text-gray-500">
        Silahkan pilih kode QRIS yang ingin digunakan untuk pembayaran infaq.
      </p>
      <div className="my-2">
        <Popover>
          <PopoverTrigger asChild>
            {/* <Button variant="noShadow">Hover</Button> */}
            <div className="rounded w-fit bg-bg flex items-center p-1 border-black border-2">
              <Lightbulb className="h-4 w-4" />
              <span className="text-sm">Berkontribusi!</span>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="">
              <span className="text-sm">
                Anda juga dapat berkontribusi dengan mengunggah kode QRIS Infaq
                atau sedekah yang Anda miliki atau temui.
              </span>
              <Button
                variant="reverse"
                onClick={() => {
                  router.push("/contribute");
                }}
              >
                Kontribusi
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="my-4">
        <div className="flex justify-between my-2">
          <Input placeholder="Cari QRIS" className="mr-2" />
          <Button variant="reverse" onClick={handleSearch}>
            Search
          </Button>
        </div>
        {/* <div className="flex justify-between my-2">
          <Popover open={provinceOpen} onOpenChange={setProvince}>
            <PopoverTrigger asChild>
              <Button
                variant="noShadow"
                role="combobox"
                aria-expanded={provinceOpen}
                className="w-[200px] justify-between"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Pilih Provinsi..."}
                <ChevronsUpDown
                  color="black"
                  className="ml-2 h-4 w-4 shrink-0"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] !border-0 p-0 font-bold">
              <Command>
                <CommandList>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setProvince(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div> */}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {qrisList.map((qris) => (
          <div
            onClick={() => {
              router.push(`/qris/${qris.id}`);
            }}
            key={qris.id}
          >
            <ImageCard
              caption={qris.name}
              imageUrl={"./qrcode.png"}
              location={qris.city_name}
            ></ImageCard>
          </div>
        ))}
      </div>

    </div>
  );
}
