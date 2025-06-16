'use client';
import HeroSection from '@/components/common/hero-section';
import Greeting from '@/features/add-info/components/Greeting';
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

export const roles = [
  { key: 'participant', label: '참가자' },
  { key: 'host', label: '주최자' },
];

export default function AddInfoPage() {
  const [interests, setInterests] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleInterestClick = (interest: string) => {
    setInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, email, phone, role, interests);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <HeroSection title="회원 정보 입력" description="회원가입을 위해 정보를 입력해주세요." />
      <div className="flex flex-1 items-start justify-center px-4 py-12">
        <div className="flex w-full max-w-5xl gap-12">
          <div className="flex w-1/2 flex-col justify-center">
            <Greeting />
          </div>
          <form className="w-1/2 space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Name"
              type="text"
              placeholder="사용하실 이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Select
              items={roles}
              label="Role"
              placeholder="Select an role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {(role) => <SelectItem>{role.label}</SelectItem>}
            </Select>
            <div>
              <label className="mb-1 block">관심사</label>
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
              <p className="text-primary/80 text-xs">관심있는 팝업을 선택해주세요.</p>
            </div>
            <Button type="submit" className="w-full">
              완료
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
