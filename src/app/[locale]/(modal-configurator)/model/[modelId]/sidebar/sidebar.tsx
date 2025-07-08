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
import DoorDecor from './components/door-decor';
import MobileNameModel from './components/mobail-name-model';

export default function Sidebar() {
  const { open } = useFullScreen();
  if (open) return null;
  return (
    <aside className="order-2 h-full w-full shrink-0 overflow-x-hidden overflow-y-auto lg:order-1 lg:max-w-[600px] lg:min-w-[260px] lg:basis-[600px]">
      <MobileNameModel />
      <OpenWaySection />
      <DoorFormSection />
      <DoorSize />
      <DoorEquipment />
      <DoorColor />
      <DoorDecor />
      <DoorGlass />
      <DoorFurniture />
      <DoorLock />
      <DoorProfiles />
      {/* ... existing sidebar content ... */}
    </aside>
  );
}
