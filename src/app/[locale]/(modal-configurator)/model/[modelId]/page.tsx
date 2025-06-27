import Sidebar from './sidebar/sidebar';
import ModalView from './modal-view/modal-view';

export default async function ModelPage() {
  return (
    <div className="flex flex-1 lg:flex-row flex-col min-h-0 w-full h-full">
        <ModalView  />
        <Sidebar  />
    </div>
  );
} 
