import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCostConfiguration } from "@/hooks/modal/use-cost-configuration";
import { Separator } from "@/components/ui/separator";

export const CostSheets = () => {
    const { openCostConfiguration, onClose } = useCostConfiguration();
    
    const systemProfile = [
        {
            name: 'Ширина х Висота',
            size: '1100 x 2150 мм',
            price: '€20',
        },
        {
            name: 'Колір зовнішньої частини',
            size: 'AG 2 RAL 9006 Алюмінієво-сірий FS',
            price: '€20',
        },
        {
            name: 'Колір внутрішньої частини',  
            size: 'AG 2 RAL 9006 Алюмінієво-сірий FS',
            price: '€20',
        },
        {
            name: 'Колір всередині',  
            size: 'AS 1 RAL 9016 Білий FS',
            price: '€0',
        },
        {
            name: 'Поріг',  
            size: 'С 20',
            price: '€0',
        },       
    ]

    const model = [
         {
            name: 'Серія',
            size: 'БАЧЕННЯ',
            price: '€0',
        },
        {
            name: 'Теплоізоляція',
            size: 'ЗЕЛЕНА ЛІНІЯ',
            price: '€0',
        },
        {
            name: 'Колір зовнішньої частини',
            size: 'AG 2 RAL 9006 Алюмінієво-сірий FS',
            price: '€20',
        },
        {
            name: 'Колір всередині',
            size: 'AS 1 RAL 9016 Білий FS',
            price: '€0',
        },
        {
            name: 'Зовнішня панель',
            size: 'WFS (низькоемісійний) 6 мм',
            price: '€2030',
        },
        {
            name: 'Середній диск',
            size: 'Поплавок 6 мм',
            price: '€0',
        },
        {
            name: 'Внутрішня панель',
            size: 'WFS (низькоемісійний) 6 мм',
            price: '€2120',
        },
        {
            name: 'Колір інкрустації 1',
            size: 'нержавіюча сталь з сатинованим покриттям',
            price: '€0',
        },
        {
            name: 'Блокування',
            size: 'SV3',
            price: '€0',
        },
        {
            name: 'Ручка всередині',
            size: 'HA 010',
            price: '€20',
        },
    ]



  return( <Sheet open={openCostConfiguration} onOpenChange={onClose}>
    <SheetContent  className="w-full sm:w-[600px] md:w-[700px] lg:w-[900px] max-w-full">
      <SheetHeader className="pt-7">
        <SheetTitle className="text-font-size-heading font-sans text-dark font-bold uppercase justify-start">Вартість Конфігурації</SheetTitle>
          </SheetHeader>
          <Separator orientation="horizontal" className="border-[#D4E0EB] my-4"/>
          <div className="flex flex-col gap-y-1 pl-5 pr-5">
              <div className="flex justify-between">
              <span className="text-[14px] font-sans text-dark font-bold uppercase">Система профілів</span>
              <span className="text-[14px] font-sans text-textLight ">АТС 100</span>
              <span className="text-[14px] font-sans text-dark ">€0</span>  
              </div>
               <Separator orientation="horizontal" className="border-[#E4EBF3] my-4 w-full"/>

              <div className="flex flex-col gap-2 pl-10 pr-10">
                  {systemProfile.map((item) => (
                    <>
                    <div key={item.name} className="flex justify-between">
                        <span className="text-[14px] font-sans text-dark">{item.name}</span>
                        <span className="text-[14px] font-sans text-textLight">{item.size}</span>
                        <span className="text-[14px] font-sans text-dark">{item.price}</span>
                    </div>
                    <Separator punktir orientation="horizontal" className="border-[#D4E0EB] my-4 w-full"/>
                    </>
                ))}
              </div>
               <div className="flex justify-between">
              <span className="text-[14px] font-sans text-dark font-bold uppercase">Модель</span>
              <span className="text-[14px] font-sans text-textLight ">Line 200</span>
              <span className="text-[14px] font-sans text-dark ">€0</span> 
              </div>
              <Separator orientation="horizontal" className="border-[#E4EBF3] my-4 w-full"/>
              <div className="flex flex-col gap-2 pl-10 pr-10">
                  {model.map((item, index) => (
                    <>
                    <div key={item.name} className="flex justify-between">
                        <span className="text-[14px] font-sans text-dark">{item.name}</span>
                          <span className="text-[14px] font-sans text-textLight">{item.size}</span>
                          <span className="text-[14px] font-sans text-dark">{item.price}</span>
                          </div>
                          {index !== model.length - 1 && (
                            <Separator punktir orientation="horizontal" className="border-[#D4E0EB] my-4 w-full"/>
                          )}
                    </>
                  ))}
              </div>
          </div>
    </SheetContent>
  </Sheet>
  );
};