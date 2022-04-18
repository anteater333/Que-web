import { validateEmail } from "./validator";

describe("function validateEmail", () => {
  it("문자열을 입력받아 참/거짓을 반환한다.", () => {
    const inputStr = "anteater";
    const result = validateEmail(inputStr);

    expect(typeof result).toBe("boolean");
  });

  it("제대로 된 메일 주소를 입력받으면 참을 반환한다.", () => {
    const inputStr = "anteater1056@gmail.com";
    const result = validateEmail(inputStr);

    expect(result).toBeTruthy();
  });

  it("잘못된 메일 주소를 입력받으면 거짓을 반환한다.", () => {
    const inputStr = "1ㅏ얼askfjq@";
    const result = validateEmail(inputStr);

    expect(result).not.toBeTruthy();
  });
});
