/**
 * 큰 수를 축약해 문자열로 표시하는 유틸 함수. ex) 12345 => 12.3k
 * @param count 표시 형식을 변환하려는 수
 * @returns 변환된 문자열
 */
export default function formatCount(count: number) {
  if (count < 10000) {
    return count.toString();
  } else {
    const front = Math.floor(count / 1000);
    const back = Math.floor((count - front * 1000) / 100);

    return front.toString() + "." + back.toString() + "k";
  }
}
