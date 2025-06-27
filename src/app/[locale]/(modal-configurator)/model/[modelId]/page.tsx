import Sidebar from './sidebar/sidebar';
import ModalView from './modal-view/modal-view';
import { Providers } from '@/providers/providers';

export default async function ModelPage() {
  return (
    <Providers>
    <div className="flex flex-1 lg:flex-row flex-col min-h-0 w-full h-full">
        <ModalView  />
        <Sidebar  />
    </div>
    </Providers>
  );
} 
