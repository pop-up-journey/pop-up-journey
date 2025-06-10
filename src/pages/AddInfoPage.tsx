'use client';
import HeroSection from '@/components/common/hero-section/HeroSection';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { useState } from 'react';

const interestsList = [
  'Home',
  'Fashion',
  'Electronics',
  'Food',
  'Home&Garden',
  'Sports',
  'Books',
  'Health&Beauty',
  'Travel',
  'Automotive',
  'Other',
];

export const animals = [
  { key: 'participant', label: '참가자' },
  { key: 'host', label: '주최자' },
];

export default function AddInfoPage() {
  const [interests, setInterests] = useState<string[]>([]);

  const handleInterestClick = (interest: string) => {
    setInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]));
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <HeroSection title="회원 정보 입력" description="회원가입을 위해 정보를 입력해주세요." />
      <div className="flex flex-1 items-start justify-center bg-white px-4 py-12">
        <div className="flex w-full max-w-5xl gap-12">
          {/* HACK: 회원 정보 입력 페이지 타이틀 임시 이미지 넣을까..  */}
          <div className="flex w-1/2 flex-col justify-center">
            <h2 className="mb-2 text-3xl font-bold">회원 정보 입력</h2>
            <p className="text-base text-gray-700">회원가입을 위해 정보를 입력해주세요.</p>
          </div>
          {/* HACK: 오른쪽 폼 */}
          <form className="w-1/2 space-y-6">
            <Input label="Name" type="text" placeholder="사용하실 이름을 입력해주세요." />
            <Input label="Email" type="email" placeholder="이메일을 입력해주세요." />
            <Input label="Phone Number" type="tel" placeholder="전화번호를 입력해주세요." />
            <Input label="Job Department" type="text" placeholder="직무를 입력해주세요." />
            <Select items={animals} label="Favorite Animal" placeholder="Select an animal">
              {(animal) => <SelectItem>{animal.label}</SelectItem>}
            </Select>

            <div>
              <label className="mb-1 block font-semibold">관심사</label>
              <div className="mb-1 flex flex-wrap gap-2">
                {interestsList.map((interest) => (
                  <Chip
                    key={interest}
                    onClick={() => handleInterestClick(interest)}
                    color="primary"
                    className="w-fit cursor-pointer"
                    variant={interests.includes(interest) ? 'flat' : 'bordered'}
                  >
                    {interest}
                  </Chip>
                ))}
              </div>
              <p className="text-xs text-gray-500">관심있는 팝업을 선택해주세요.</p>
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
