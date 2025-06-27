import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useInfoEquipmentDoor } from "@/hooks/modal/use-info-equipmet-door";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

export const InfoEquipmentSheet = () => {
    const { openInfoEquipmentDoor, onClose } = useInfoEquipmentDoor();
    // Данные для карточек
    const cards = [
        {
            title: "ЕКОНОМ — доступна якість",
            desc: "Комплектація «Економ» — це вибір для тих, хто шукає просте, надійне та бюджетне рішення. Ці двері мають базову звуко- та теплоізоляцію, мінімальний набір фурнітури та просту замкову систему. Вони ідеально підходять для підсобних приміщень, комор або тимчасового проживання.",
            advantages: ["Низька вартість", "Легка вага", "Проста установка"],
            bg: "/figma-images/modal-view/sheet/background.jpg",
            door: "/figma-images/modal-view/sheet/door.png",
        },
        {
            title: "СТАНДАРТ — найкраще співвідношення ціни та якості",
            desc: "Комплектація «Стандарт» — це оптимальний вибір для квартири або офісу. Двері мають посилену конструкцію, вдосконалену тепло- та шумоізоляцію, дві замкові системи (основна та додаткова), а також естетичне зовнішнє покриття. Це популярний вибір для щоденного використання.",
            advantages: ["Покращєна безпека", "Сучасний дизайн", "Висока зносостійкість"],
            bg: "/figma-images/modal-view/sheet/background.jpg",
            door: "/figma-images/modal-view/sheet/door.png",
        },
        {
            title: "СУПЕР — максимум захисту та комфорту",
            desc: "Комплектація «Супер» — це двері преміум-класу для тих, хто цінує безпеку, комфорт і стиль. Вони мають багатошарову шумо- та теплоізоляцію, антивандальне покриття, протизламні петлі, броньовану накладку та кілька рівнів замикання. Такі двері стануть надійним захистом для вашого будинку.",
            advantages: ["Високий рівень безпеки", "Преміум оздоблення", "Надійні замки"],
            bg: "/figma-images/modal-view/sheet/background.jpg",
            door: "/figma-images/modal-view/sheet/door.png",
        },
    ];

    // Данные для таблицы
    const table = {
        headers: ["Характеристика", "Економ", "Стандарт", "Супер"],
        rows: [
            ["Товщина полотна", "50 мм", "70 мм", "90 мм"],
            ["Кількість замків", "1", "2", "2+броньована"],
            ["Теплоізоляція", "Базова", "Посилена", "Максимальна"],
            ["Зовнішнє покриття", "Ламінат", "МДФ", "Антивандальне"],
            ["Петлі", "Стандартні", "Посилені", "Протизламні"],
        ],
    };

    return (
        <Sheet open={openInfoEquipmentDoor} onOpenChange={onClose}>
            <SheetContent className="w-full md:w-[900px] lg:w-[1350px] max-w-full overflow-y-auto">
                <SheetHeader className="pt-7 px-8">
                    <SheetTitle className="text-[32px] font-sans text-dark font-bold uppercase tracking-[0.06em] text-left">Види комплектації вхідних дверей</SheetTitle>
                </SheetHeader>
                <div className="px-8 mt-2 mb-2">
                    <p className="text-[16px] text-textLight font-sans ">
                        Пропонуємо три типи комплектації вхідних дверей, які відповідають різним потребам та бюджету. Всі двері виготовлені з якісних матеріалів та забезпечують базовий рівень безпеки. Кожна комплектація відрізняється фурнітурою, товщиною полотна, системою замикання та рівнем теплоізоляції.<br /><br />
                        Обираючи між «Економ», «Стандарт» і «Супер», ви зможете знайти оптимальне рішення: від бюджетного варіанту для тимчасових приміщень до надійного захисту для квартири чи приватного будинку.
                    </p>
                </div>
                {/* Карточки комплектаций */}
                <div className="flex flex-col  px-8 mb-12">
                    {cards.map((card, idx) => (
                        <div key={idx} className="flex  justify-between relative">
                            <div className="hidden lg:block md:block relative w-[400px] h-[270px] lg:flex  justify-center mb-4 lg:block">
                                <Image src={card.bg} alt="background" fill className="object-cover" />
                                <Image src={card.door} alt="door" width={90} height={160} className="object-cover absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <div className="flex flex-col gap-2 w-full lg:w-[800px] mx-auto ">
                                <h3 className="text-[22px] text-left font-semibold text-dark text-center mb-8 leading-tight"> <span className="text-[22px] font-semibold text-dark text-accent mb-2 leading-tight">{card.title.split(' ')[0]}</span> {card.title.split(' ').slice(1).join(' ')}</h3>
                                <p className="text-[16px] text-textLight text-center mb-7">{card.desc}</p>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="text-[16px] font-bold text-dark mb-6">Переваги:</div>
                                    <div className="flex flex-row justify-between gap-2 w-full">
                                    {card.advantages.map((adv, i) => (
                                        <div key={i} >
                                            <div className="flex flex-row items-center gap-2">
                                                 <CheckIcon className="text-accent" size={20} />
                                                <span className="text-[16px] text-textLight">{adv}</span>
                                            </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Таблица сравнения */}
                <div className="px-8">
                    <div className="overflow-x-auto rounded-2xl shadow-lg ">
                        <table className="min-w-[700px] w-full text-left border-separate border-spacing-y-2">
                            <thead className="bg-[#E1E8EE]">
                                <tr>
                                    {table.headers.map((h, i) => (
                                        <th key={i} className="py-3 px-4 text-[16px] font-bold text-[#2D3748] uppercase">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {table.rows.map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => (
                                            <td
                                                key={j}
                                                className={
                                                    (j === 0
                                                        ? "py-2 px-4 text-[16px] font-bold text-[#2D3748]"
                                                        : "py-2 px-4 text-[16px] text-textLight") +
                                                    " border-b border-[#E1E8EE]"
                                                }
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}