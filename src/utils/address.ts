/**
 * 쉼표로 구분된 주소 문자열을 배열로 반환
 * //TODO: address 대신 Location Formatter 사용
 */
export function getAddressParts(address: string): string[] {
  return address
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * 주소 배열을 인덱스로 꺼내줌
 * @param address 전체 주소 문자열
 * @param partIndex 꺼내고 싶은 파트 인덱스 (0부터 시작).
 *                  out-of-range면 fallbackIndex, 그마저도 없으면 빈 문자열 반환
 * @param fallbackIndex 기본값으로 사용할 파트 인덱스 (default: 0)
 */
export function getAddressPart(address: string, partIndex: number, fallbackIndex = 0): string {
  const parts = getAddressParts(address);
  if (parts[partIndex] != null) return parts[partIndex]!;
  if (parts[fallbackIndex] != null) return parts[fallbackIndex]!;
  return '';
}
//
