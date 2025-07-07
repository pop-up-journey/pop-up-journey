import Chip from '@/components/common/chip';
import { categories } from '@/configs/category';
import { useAddInfoFormStore } from '@/store/add-info/useAddInfoFormStore';

export default function InterestChip() {
  const interests = useAddInfoFormStore((state) => state.interests);
  const setInterests = useAddInfoFormStore((state) => state.setInterests);

  const handleInterestClick = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };
  return (
    <div>
      <label className="mb-1 block">관심사</label>
      <div className="mb-1 flex flex-wrap gap-2">
        {categories.map((category) => (
          // NOTE: 임시 관심사 리스트임
          <Chip
            key={category}
            onClick={() => handleInterestClick(category)}
            className="w-fit cursor-pointer border border-white/20 shadow backdrop-blur-md"
            variant={interests.includes(category) ? 'flat' : 'bordered'}
          >
            {category}
          </Chip>
        ))}
      </div>
      <p className="text-xs text-black/80 dark:text-white/80">관심있는 팝업을 선택해주세요.</p>
    </div>
  );
}
