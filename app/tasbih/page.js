"use client";
import HeadComponent from "@/components/HeadComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TasbihPage() {
  const router = useRouter();

  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(0);
  const [input, setInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const reset = () => {
    setCount(0);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleCount = () => {
    if (count < target) {
      setCount(count + 1);
    }
  };

  return (
    <div className="h-screen py-2 flex flex-col">
      <div className="flex-none">
        <HeadComponent title="Tasbih" className="flex-none" />
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col justify-start">
            <div className="flex items-center">
              <span className="text-md mr-1">Target</span>
              <span className="text-lg font-bold">{target}</span>
              {/* <Pencil size={16} /> */}
            </div>
          </div>
          <div className="flex">
            <div className="underline mr-4" onClick={handleEdit}>
              Edit
            </div>
            <div className="underline" onClick={reset}>
              Reset
            </div>
          </div>
        </div>
        {isEdit && (
          <div className="w-full flex justify-start items-center mb-2">
            <Input
              placeholder="Masukkan Target"
              type="number"
              onChange={(e) => setInput(e.target.value)}
              className=""
            />
            <Button
              onClick={() => {
                setTarget(input);
                setCount(0);
                setIsEdit(false);
                setInput("");
              }}
              variant="reverse"
              className="ml-2"
            >
              Set Target
            </Button>
          </div>
        )}
        {count == 0 && (
          <div className="flex justify-between items-center bg-yellow-200 p-1 rounded-base my-2 border-2">
            <span className="text-sm my-2 flex items-center">
              {" "}
              Tap kotak angka ini untuk mulai menghitung
            </span>
            <Info size={18} />
          </div>
        )}
      </div>
      <div
        className={`flex-1 flex justify-center ${
          count == target && count != 0 ? "bg-red-400" : "bg-white"
        } border-2 rounded-base items-center`}
        onClick={handleCount}
      >
        <span className="text-9xl font-bold">{count}</span>
      </div>
    </div>
  );
}
