import Chip from '@/components/common/chip';
import { categories } from '@/configs/category';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
import { TagIcon } from '@heroicons/react/24/outline';

export default function Tag() {
  const selectedTags = usePopupRegisterFormStore((state) => state.selectedTags);
  const setSelectedTags = usePopupRegisterFormStore((state) => state.setSelectedTags);

  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      // 이미 선택된 태그면 제거
      setSelectedTags(selectedTags.filter((tag: string) => tag !== tagName));
    } else {
      // 선택되지 않은 태그면 추가
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-[14px] font-semibold text-white">
        <TagIcon className="size-5" />
        카테고리 선택
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {categories.map((category) => (
          <Chip
            key={category}
            variant={selectedTags.includes(category) ? 'solid' : 'bordered'}
            color={selectedTags.includes(category) ? 'success' : 'default'}
            onClick={() => handleTagClick(category)}
            className="cursor-pointer text-[12px] sm:text-[14px]"
          >
            {category}
          </Chip>
        ))}
      </div>
    </div>
  );
}
