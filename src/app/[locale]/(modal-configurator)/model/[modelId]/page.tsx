import Sidebar from './sidebar/sidebar';
import ModalView from './modal-view/modal-view';

export default async function ModelPage() {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col lg:flex-row">
      <ModalView />
      <Sidebar />
    </div>
  );
}
