import AddInfoForm from '@/features/add-info/components/AddInfoForm';
import FloatingBundle from '@/features/add-info/components/FloatingBundle';

export default function AddInfoPage() {
  return (
    <main aria-label="add-info-page" className="bg-gradient-to-tr from-pink-400 to-blue-400">
      <FloatingBundle />
      <AddInfoForm />
    </main>
  );
}
