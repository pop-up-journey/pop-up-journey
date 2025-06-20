'use client';

import Input from '@/components/common/input';
import { categories } from '@/configs/category';
import { roles } from '@/configs/roles';
import { clientApi } from '@/libs/api';
import { Button, Chip, Select, SelectItem } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function AddInfoForm() {
  const { data: session, status } = useSession();
  const [interests, setInterests] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>(null);

  // TODO: hook으로 분리할 것
  const getUserInfo = async () => {
    try {
      if (status === 'authenticated' && session?.user?.id) {
        const res = await clientApi(`/api/users/${session?.user?.id}`, { method: 'GET' });
        setUserInfo(res);
      }
    } catch (error) {
      console.error('Failed to get user info', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [session, status]);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo[0]?.name);
      setEmail(userInfo[0]?.email);
      setPhone(userInfo[0]?.phone);
    }
  }, [userInfo]);

  // TODO: 관심 목록을 db에 저장할까 아니면 local에 저장할까.
  const handleInterestClick = (interest: string) => {
    setInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]));
  };

  const handleUserInfo = async ({
    name,
    email,
    phone,
    role,
  }: {
    name: string;
    email: string;
    phone: string;
    role: string;
  }) => {
    try {
      const res = await clientApi(`/api/users/${session?.user?.id}`, {
        method: 'POST',
        body: {
          name,
          email,
          phone,
          role,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        console.log('User info updated successfully');
      }
    } catch (error) {
      console.error('Failed to update user info', error);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남김

    // 010으로 시작
    if (!value.startsWith('010')) value = '010' + value.replace(/^010/, '');

    // 하이픈 자동 삽입
    if (value.length > 3 && value.length <= 7) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length > 7) {
      value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
    }

    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInfo({ name, email, phone, role });
  };

  return (
    <>
      {/* <main className="flex min-h-screen flex-col bg-gradient-to-tr from-pink-400 to-blue-400"> */}
      {/* <HeroSection title="회원 정보 입력" description="회원가입을 위해 정보를 입력해주세요." /> */}
      <div className="flex flex-1 items-start justify-center px-4 py-12">
        <div className="flex w-full max-w-5xl gap-12">
          <div className="flex flex-col justify-center">{/* <Greeting /> */}</div>
          {/* <form className="w-1/2 space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Name"
              color="primary"
              type="text"
              placeholder="사용하실 이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {userInfo && userInfo[0]?.email ? (
              <Input
                isReadOnly
                isDisabled
                label="Email"
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <Input
                label="Email"
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <Input
              label="Phone"
              type="tel"
              placeholder="010-1234-5678"
              value={phone ?? ''}
              onChange={handlePhoneChange}
            />

            <Select
              items={roles}
              label="Role"
              placeholder="Select a role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              variant="bordered"
              classNames={{
                trigger: `
              bg-white/20
              backdrop-blur-lg
              border border-white/30
              shadow-lg
              text-white
              placeholder:text-white/60
              focus:ring-2 focus:ring-pink-400
              transition
            `,
                label: 'text-white font-bold drop-shadow',
                value: 'text-white',
              }}
            >
              {(role) => <SelectItem>{role.label}</SelectItem>}
            </Select>
            <div>
              <label className="mb-1 block">관심사</label>
              <div className="mb-1 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Chip
                    key={category}
                    onClick={() => handleInterestClick(category)}
                    color="primary"
                    className="w-fit cursor-pointer"
                    variant={interests.includes(category) ? 'flat' : 'bordered'}
                  >
                    {category}
                  </Chip>
                ))}
              </div>
              <p className="text-primary/80 text-xs">관심있는 팝업을 선택해주세요.</p>
            </div>
            <Button type="submit" className="w-full">
              완료
            </Button>
          </form> */}
          <form
            className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-3xl border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-2 text-3xl font-extrabold text-white drop-shadow">회원 정보 입력</h2>
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
              label="Phone"
              type="tel"
              placeholder="010-1234-5678"
              value={phone ?? ''}
              onChange={handlePhoneChange}
            />
            <Select
              items={roles}
              label="Role"
              placeholder="Select a role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              variant="bordered"
              classNames={{
                trigger: `
              bg-white/20
              backdrop-blur-lg
              border border-white/30
              shadow-lg
              text-white
              placeholder:text-white/60
              focus:ring-2 focus:ring-pink-400
              transition
            `,
                label: 'text-white font-bold drop-shadow',
                value: 'text-white',
              }}
            >
              {(role) => <SelectItem>{role.label}</SelectItem>}
            </Select>
            <div>
              <label className="mb-1 block">관심사</label>
              <div className="mb-1 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Chip
                    key={category}
                    onClick={() => handleInterestClick(category)}
                    color="danger"
                    radius="md"
                    className="w-fit cursor-pointer border border-white/20 shadow backdrop-blur-md"
                    variant={interests.includes(category) ? 'flat' : 'bordered'}
                  >
                    {category}
                  </Chip>
                ))}
              </div>
              <p className="text-xs text-black/80 dark:text-white/80">관심있는 팝업을 선택해주세요.</p>
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-pink-400 to-blue-400 py-3 font-bold text-white shadow-lg transition hover:scale-105"
            >
              완료
            </Button>
          </form>
        </div>
      </div>
      {/* </main> */}
    </>
  );
}
