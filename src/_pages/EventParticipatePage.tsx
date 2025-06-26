'use client';

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { upcomingPopupList } from '@/mock/mockdata';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import { useState } from 'react';
import CardComponent from '../components/common/card';
import { LABELS } from '../components/common/input/labels';

export default function EventParticipationPage() {
  const { data: session } = useSession();
  console.log(session);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 신청 로직 추가
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (!value.startsWith('010')) value = '010' + value.replace(/^010/, '');
    if (value.length > 3 && value.length <= 7) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length > 7) {
      value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
    }
    setPhone(value);
  };

  const popup = upcomingPopupList[1];

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="lazyOnload" />+{' '}
      <main className="mx-auto min-h-screen max-w-4xl p-8 px-12">
        <form
          id="defaultSt"
          className="grid grid-cols-1 gap-y-8 px-6 sm:px-8 md:grid-cols-2 md:gap-x-6 md:px-10 lg:px-16"
          onSubmit={handleSubmit}
        >
          {/* 왼쪽 블록 */}
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-3xl font-bold">{popup.title}</h1>
            <CardComponent title="" thumbnail={popup.thumbnail} tags={[]} date="" />
            <div className="text-gray-600">{popup.date}</div>
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="mr-1 h-5 w-5" />
              <span>{popup.region}</span>
            </div>
          </div>
          {/* 오른쪽 블록 */}
          <div className="flex flex-col space-y-6">
            <label className="mb-2 block font-medium">이름</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름(실명)을 입력해주세요."
            />

            <label className="mb-2 block font-medium">연락처</label>
            <Input type="tel" placeholder="010-1234-5678" value={phone} onChange={handlePhoneChange} />

            <label className="mb-2 block font-medium">이메일</label>
            <Input
              type="email"
              placeholder="문의 및 연락받을 이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label={LABELS.TICKETS}
              type="number"
              placeholder="수용 가능한 인원을 입력해주세요."
              value={tickets.toString()}
              onChange={(e) => setTickets(Number(e.target.value))}
            />

            <Button type="submit">신청하기</Button>
          </div>
        </form>
      </main>
    </>
  );
}
