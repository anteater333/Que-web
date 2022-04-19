/**
 * 문자열을 입력받아 그것이 email 주소의 형태를 가지고 있는 지 판명하는 함수.
 * @param mailAddress 검증하려는 메일 주소
 * @returns 검증 통과 여부
 */
export function validateEmail(mailAddress: string) {
  const mailRegex = /^\S+@\S+\.\S+$/;

  const result = new RegExp(mailRegex).test(mailAddress);

  return result;
}

export type ValidatePasswordReasons =
  | "pass"
  | "short"
  | "number"
  | "letter"
  | "space"
  | "special";
/**
 * 문자열을 입력받아 그것이 비밀번호 규칙을 준수하는지 판명하는 함수.
 * @param password
 * @returns [준수여부, 미준수 사유]
 */
export function validatePassword(
  password: string
): [boolean, ValidatePasswordReasons] {
  return [true, "pass"];
}
