import Button from '@/components/common/button';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
import { addToast } from '@heroui/react';
import Script from 'next/script';

declare global {
  interface Window {
    daum: any;
  }
}

export default function PostCode() {
  const { setValue } = usePopupRegisterFormStore.getState();
  const handleOpenPostcode = () => {
    if (typeof window.daum === 'undefined' || typeof window.daum.Postcode === 'undefined') {
      addToast({
        title: '주소 검색 서비스가 로드되지 않았습니다.',
        color: 'danger',
      });
      return;
    }
    new window.daum.Postcode({
      onComplete: function (data: any) {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setValue('zonecode', data.zonecode);
        setValue('address', fullAddress);
        setValue('extraAddress', extraAddress);
      },
    }).open();
  };

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="lazyOnload" />
      <div className="w-sm">
        <Button onClick={handleOpenPostcode} type="button">
          주소 검색
        </Button>
      </div>
    </>
  );
}
