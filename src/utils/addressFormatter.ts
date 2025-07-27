/**
 * 주소에서 특정 인덱스의 부분을 추출하는 함수
 * @param address - 전체 주소 문자열
 * @param index - 추출할 부분의 인덱스 (0부터 시작)
 * @returns 추출된 주소 부분 또는 빈 문자열
 */
export const extractAddressPart = (address: string | null | undefined, index: number): string => {
  if (!address) return '';

  const parts = address.split(',').map((s: string) => s.trim());
  const result = parts[index] || '';
  return result.replace(/[()]/g, '');
};

/**
 * 주소에서 세 번째 부분을 추출하는 함수 (구/군 단위)
 * @param address - 전체 주소 문자열
 * @returns 구/군 단위 주소 또는 빈 문자열
 */
export const extractDistrict = (address: string | null | undefined): string => {
  return extractAddressPart(address, 2);
};

/**
 * 주소에서 첫 번째 부분을 추출하는 함수 (시/도 단위)
 * @param address - 전체 주소 문자열
 * @returns 시/도 단위 주소 또는 빈 문자열
 */
export const extractProvince = (address: string | null | undefined): string => {
  return extractAddressPart(address, 0);
};

/**
 * 주소에서 두 번째 부분을 추출하는 함수 (시 단위)
 * @param address - 전체 주소 문자열
 * @returns 시 단위 주소 또는 빈 문자열
 */
export const extractCity = (address: string | null | undefined): string => {
  return extractAddressPart(address, 1);
};
