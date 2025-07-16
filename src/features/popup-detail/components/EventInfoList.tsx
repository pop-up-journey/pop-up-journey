'use client';
import Chip from '@/components/common/chip';
import { EXTRA_INFO_MAP } from '@/configs/extraInfoLabelHelper';
import EventInfoItem from '@/features/popup-detail/components/EventInfoItem';
import { getAddressPart } from '@/utils/adress';
import { formatDate } from '@/utils/dateformatter';
import { BanknotesIcon, InformationCircleIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface EventInfoListProps {
  eventStart: string | Date;
  eventEnd: string | Date;
  address?: string | null;
  extraInfo?: string[] | string | null;
}

export default function EventInfoList({ eventStart, eventEnd, address, extraInfo }: EventInfoListProps) {
  // 날짜 파싱
  const start = new Date(eventStart);
  const month = format(start, 'M', { locale: ko });
  const day = format(start, 'd', { locale: ko });

  // 장소
  const place = getAddressPart(address!, 1);

  // 기타 정보
  const extraInfos =
    typeof extraInfo === 'string'
      ? extraInfo
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : Array.isArray(extraInfo)
        ? extraInfo
        : [];

  return (
    <section className="space-y-2">
      {/* 일시 */}
      <EventInfoItem
        icon={
          <div className="flex h-8 w-8 flex-col overflow-hidden rounded border text-center shadow-sm">
            <div className="bg-gray-600/30 py-[2px] text-[8px] leading-none text-gray-500">{month}월</div>
            <div className="bg-transparent py-[1px] text-xs font-semibold">{day}</div>
          </div>
        }
        label={`${formatDate(eventStart)} ~ ${formatDate(eventEnd)}`}
      />

      {/* 장소 */}
      <EventInfoItem
        icon={<MapPinIcon className="h-5 w-5 text-gray-500" />}
        label={place}
        href={`http://map.kakao.com/link/search/${place}`}
        external
      />

      {/* 비용 */}
      <EventInfoItem icon={<BanknotesIcon className="h-5 w-5 text-gray-500" />} label="무료" />

      {/* 기타 안내 */}
      <EventInfoItem
        icon={<InformationCircleIcon className="h-5 w-5 text-gray-500" />}
        label={
          <>
            {extraInfos.map((infoId, idx) => {
              const label = EXTRA_INFO_MAP[infoId] ?? infoId;
              return (
                <Chip key={idx} className="mr-2">
                  {label}{' '}
                </Chip>
              );
            })}
          </>
        }
      />
    </section>
  );
}
