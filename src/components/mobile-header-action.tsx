import { Menu } from "lucide-react";
import HeaderAction from "./header-action"; 
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";

export default function MobileHeaderAction() {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0">
          <SheetHeader className="mb-17">
            <SheetTitle className="text-2xl font-medium text-textDark text-center">Меню</SheetTitle>
          </SheetHeader>
            <HeaderAction />
        </SheetContent>
      </Sheet>
    );
}