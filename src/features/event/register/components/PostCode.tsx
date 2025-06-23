'use client';
// TODO: 이거 기반으로 이제 만들면된다.
import Button from '@/components/common/button';
import Script from 'next/script';

declare global {
  interface Window {
    daum: any;
  }
}

export default function PostCode() {
  const handleOpenPostcode = () => {
    if (typeof window.daum === 'undefined' || typeof window.daum.Postcode === 'undefined') {
      alert('Daum Postcode 서비스가 로드되지 않았습니다.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data: any) {
        let fullAddress = data.address;
        console.log(data);
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

        // 선택된 주소를 alert으로 표시
        alert(`우편번호: ${data.zonecode}\n주소: ${fullAddress}`);
      },
    }).open();
  };

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="lazyOnload" />
      <Button onClick={handleOpenPostcode} type="button">
        주소 검색
      </Button>
    </>
  );
}
