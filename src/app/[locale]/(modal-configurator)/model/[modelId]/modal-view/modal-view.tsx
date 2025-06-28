"use client";
import { DoorPreview } from "./components/door-preview";
import { useMedia } from "react-use";
import { cn } from "@/lib/utils";

export default function ModalView() {
      const isDoorReduced = useMedia('(max-width: 510px) and (min-width: 320px)', false); 
    return (
            <div className={cn("flex flex-col  h-full z-10  order-1 lg:order-2  lg:min-h-0  w-full", isDoorReduced ? "min-h-[40vh] w-full mx-auto" : "min-h-[50vh]")}>
            <DoorPreview isDoorReduced={isDoorReduced} />
        </div>
    );
}
