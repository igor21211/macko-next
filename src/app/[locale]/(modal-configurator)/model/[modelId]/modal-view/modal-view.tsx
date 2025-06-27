import { DoorPreview } from "./components/door-preview";

export default function ModalView() {
    return (
            <div className="flex flex-col  h-full z-10  order-1 lg:order-2 min-h-[50vh] lg:min-h-0  w-full">
            <DoorPreview />
        </div>
    );
}
