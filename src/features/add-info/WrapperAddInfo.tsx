import FloatingBundle from '@/components/common/floating/FloatingBundle';
import AddInfoForm from '@/features/add-info/components/AddInfoForm';

export default function WrapperAddInfo() {
  return (
    <main aria-label="add-info-page" className="relative overflow-hidden bg-gradient-to-tr from-pink-400 to-blue-400">
      <FloatingBundle />
      <AddInfoForm />
    </main>
  );
}
