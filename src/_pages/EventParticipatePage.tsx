'use client';

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { LABELS } from '@/components/common/input/labels';
import { CreateEventParticipant } from '@/db/schema';
import { clientApi } from '@/libs/api';
import type { EventData } from '@/types/event';
import { formatDate } from '@/utils/dateformatter';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Image } from '@heroui/react';
import { useSession } from 'next-auth/react';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

// TODO: 중복신청시 어떻게 할지.(가능/불가능), zod로 db에 넘어가는 건 막아놓긴 했는데 토스트를 띄워준다던가 하는 처리를 해줘야함.
interface Props {
  event: EventData;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export default function EventParticipationPage({ event }: Props) {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const imgSrc = Array.isArray(event.thumbnail) ? event.thumbnail[0] : event.thumbnail;
  const place = event.address.split(',').map((s: string) => s.trim())[1];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: Pick<CreateEventParticipant, 'participantStatus' | 'tickets'> = {
      participantStatus: 'pending',
      tickets,
    };

    try {
      const res = await clientApi<Pick<CreateEventParticipant, 'participantStatus' | 'tickets'>>(
        `/api/events/${event.id}/participate`,
        {
          method: 'POST',
          body,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (res.ok) {
        console.log('참가자 생성 결과:', res);
        alert('참여 신청이 완료되었습니다!');
      }
    } catch (err) {
      console.error('신청 중 오류:', err);
    }
  };

  useEffect(() => {
    // 세션 인증 상태일 때만 호출
    if (status !== 'authenticated' || !session?.user?.id) return;

    const fetchUser = async () => {
      try {
        const res = await clientApi<UserInfo[]>(`/api/users/${session?.user?.id}`, { method: 'GET' });
        console.log('Fetched user info:', res);
        if (res.length > 0) {
          setUserInfo(res[0]);
        }
      } catch (err) {
        console.error('Failed to get user info', err);
      }
    };

    fetchUser();
  }, [status, session?.user?.id]); // session 전체 대신 user.id만 의존

  useEffect(() => {
    if (!userInfo) return;
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone ?? '');
  }, [userInfo]);

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
  console.log(phone);
  return (
    <>
      <main className="mx-auto max-h-screen max-w-4xl">
        <form
          className="grid grid-cols-1 gap-y-8 px-6 sm:px-8 md:grid-cols-2 md:gap-x-6 md:px-10 lg:px-16"
          onSubmit={handleSubmit}
        >
          {/* 왼쪽 블록 */}
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <div className="relative col-span-6 flex md:col-span-4">
              <Image
                isZoomed
                as={NextImage}
                alt="Card background"
                className="z-0 aspect-[4/5] w-full object-cover"
                src={imgSrc}
                radius="none"
                width={240}
                height={300}
                loading="eager"
              />
            </div>
            {/* 일시 */}
            <div className="mb-0 flex flex-row items-center gap-2">
              <div className="flex h-8 w-8 items-center overflow-hidden rounded border-none">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-sm text-gray-500">
                {formatDate(event.eventStart)} ~ {formatDate(event.eventEnd)}
              </p>
            </div>
            {/* 장소 */}
            <div className="flex flex-row items-center gap-2">
              <div className="flex h-8 w-8 items-center overflow-hidden rounded border-none">
                <MapPinIcon className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-sm text-gray-500">{place}</p>
            </div>
          </div>
          {/* 오른쪽 블록 */}
          <div className="flex flex-col justify-evenly space-y-6">
            <label htmlFor="name" className="mb-2 block font-medium">
              이름
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름(실명)을 입력해주세요."
            />

            <label htmlFor="tel" className="mb-2 block font-medium">
              연락처
            </label>
            <Input type="tel" placeholder="010-1234-5678" value={phone} onChange={handlePhoneChange} />

            <label htmlFor="email" className="mb-2 block font-medium">
              이메일
            </label>
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
              onChange={(e) => {
                const val = Math.max(1, Number(e.target.value));
                setTickets(val);
              }}
            />

            <Button type="submit">신청하기</Button>
          </div>
        </form>
      </main>
    </>
  );
}
