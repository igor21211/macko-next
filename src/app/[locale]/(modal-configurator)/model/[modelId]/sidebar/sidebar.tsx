'use client';
import OpenWaySection from './components/open-way-section';
import DoorFormSection from './components/door-form-section';
import DoorSize from './components/door-size';  
import DoorEquipment from './components/door-equipment';
import DoorColor from './components/door-color';
import DoorGlass from './components/door-glass';
import DoorFurniture from './components/door-furniture';
import DoorLock from './components/door-lock';
import DoorProfiles from './components/door-profiles';
import { useFullScreen } from '@/hooks/modal/use-full-screen';

export default function Sidebar() {
  const { open } = useFullScreen();
  if(open) return null;
  return (
    <aside className="order-2 lg:order-1 w-full h-full overflow-y-auto overflow-x-hidden lg:basis-[600px] lg:min-w-[260px] lg:max-w-[600px] shrink-0">
      <OpenWaySection />
      <DoorFormSection />
      <DoorSize />
      <DoorEquipment />
      <DoorColor />
      <DoorGlass />
      <DoorFurniture />
      <DoorLock />
      <DoorProfiles />
      {/* ... existing sidebar content ... */}
    </aside>
  );
}