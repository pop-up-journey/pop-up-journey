import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface EventLocationProps {
  zonecode: string;
  address: string;
  extraAddress: string;
  setExtraAddress: (value: string) => void;
  onOpenPostcode: () => void;
}

export default function EventLocation({
  zonecode,
  address,
  extraAddress,
  setExtraAddress,
  onOpenPostcode,
}: EventLocationProps) {
  return (
    <>
      <label className="mb-2 block font-medium">
        <span className="flex items-center space-x-2">
          <MapPinIcon className="h-5 w-5" />
          팝업 위치
        </span>
      </label>
      {address && zonecode ? (
        <>
          <div className="flex items-center space-x-2">
            <Input value={zonecode} type="text" isReadOnly className="w-sm" />
            <Input value={address} type="text" isReadOnly />
          </div>
        </>
      ) : (
        <div className="w-sm">
          <Button onClick={onOpenPostcode} type="button">
            주소 검색
          </Button>
        </div>
      )}

      <Input
        type="text"
        placeholder="상세 주소"
        value={extraAddress}
        onChange={(e) => setExtraAddress(e.target.value)}
      />
    </>
  );
}
