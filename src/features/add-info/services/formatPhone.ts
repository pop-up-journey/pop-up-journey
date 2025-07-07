export const formatPhone = (value: string) => {
  // 숫자만 추출
  const numericValue = value.replace(/[^0-9]/g, '');

  // 010 이후 부분만 추출 (최대 8자리)
  let after010 = '';
  if (numericValue.length >= 3) {
    after010 = numericValue.slice(3, 11); // 010 이후 8자리까지만
  } else {
    // 010 미만이면 빈 문자열로 설정
    after010 = '';
  }

  // 010- 고정 + 하이픈 자동 추가
  let formattedValue = '010';
  if (after010.length > 0) {
    formattedValue += '-';
    if (after010.length <= 4) {
      formattedValue += after010;
    } else {
      formattedValue += `${after010.slice(0, 4)}-${after010.slice(4)}`;
    }
  }
  return formattedValue;
};
