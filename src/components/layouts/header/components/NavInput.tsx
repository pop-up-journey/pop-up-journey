import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '@heroui/react';
import { useState } from 'react';

export default function NavInput() {
  const [text, setText] = useState('');

  // NOTE: 필요할 경우 검색 기능을 ContextAPI or zustand 로 구현해야 함
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <section className="relative w-full">
      <MagnifyingGlassIcon className="absolute top-1/2 left-2 z-10 size-5 -translate-y-1/2" />
      <Input
        value={text}
        onChange={handleChange}
        classNames={{
          inputWrapper: 'pl-8',
        }}
        placeholder="관심있는 팝업을 찾아보세요!"
        type="search"
      />
    </section>
  );
}
