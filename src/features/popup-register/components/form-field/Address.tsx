import Input from '@/components/common/input';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
import { MapPinIcon } from '@heroicons/react/24/outline';
import PostCode from './PostCode';

export default function Address() {
  const { zonecode, address, extraAddress } = usePopupRegisterFormStore();
  const { setValue } = usePopupRegisterFormStore.getState();
  return (
    <>
      <label className="mb-2 block">
        <div className="flex items-center space-x-1 text-white">
          <MapPinIcon className="size-5" />
          <span className="text-[14px]">팝업 위치</span>
        </div>
      </label>
      {address && zonecode ? (
        <>
          <div className="flex items-center gap-2">
            <Input
              value={zonecode}
              type="text"
              isReadOnly
              isDisabled
              className="w-[100px]"
              variant="flat"
              color="default"
              inputStyleProps="text-center"
            />
            <Input value={address} type="text" onChange={(e) => setValue('address', e.target.value)} />
          </div>

          <Input
            type="text"
            placeholder="상세 주소"
            value={extraAddress}
            onChange={(e) => setValue('extraAddress', e.target.value)}
          />
        </>
      ) : (
        <PostCode />
      )}
    </>
  );
}
