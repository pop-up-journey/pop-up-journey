'use client';

import { useCallback } from 'react';

// TODO: 이거 기반으로 이제 만들면된다.

declare global {
  interface Window {
    daum: any;
  }
}

interface PostcodeData {
  zonecode: string;
  address: string;
  extraAddress: string;
}

export default function usePostcode(onComplete: (data: PostcodeData) => void) {
  const openPostcode = useCallback(() => {
    if (typeof window.daum === 'undefined' || typeof window.daum.Postcode === 'undefined') {
      alert('Daum Postcode 서비스가 로드되지 않았습니다.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data: any) {
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

        onComplete({
          zonecode: data.zonecode,
          address: fullAddress,
          extraAddress,
        });
      },
    }).open();
  }, [onComplete]);

  return openPostcode;
}
