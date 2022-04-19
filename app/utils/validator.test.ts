import { validateEmail, validatePassword } from "./validator";

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

describe("function validatePassword", () => {
  it("문자열을 입력받아 참/거짓과 실패이유를 포함한 배열을 반환한다.", () => {
    const inputStr = "15%jdb24A!!20&";
    const result = validatePassword(inputStr);

    expect(typeof result[0]).toBe("boolean");
    expect(typeof result[1]).toBe("string");
  });

  it("길이가 8보다 작은 문자열을 입력받으면 거짓을 반환한다.", () => {
    const inputStr = "29ab";
    const result = validatePassword(inputStr);

    expect(result[0]).not.toBeTruthy();
    expect(result[1]).toBe("short");
  });

  it("숫자만으로 이루어진 문자열을 입력받으면 거짓을 반환한다.", () => {
    const inputStr = "12345678";
    const result = validatePassword(inputStr);

    expect(result[0]).not.toBeTruthy();
    expect(result[1]).toBe("number");
  });

  it("영문자만으로 이루어진 문자열을 입력받으면 거짓을 반환한다.", () => {
    const inputStr = "iamanteater";
    const result = validatePassword(inputStr);

    expect(result[0]).not.toBeTruthy();
    expect(result[1]).toBe("letter");
  });

  it("시작 혹은 끝이 공백으로 이루어진 문자열을 입력받으면 거짓을 반환한다.", () => {
    const inputStr = " 123401asdf ";
    const result = validatePassword(inputStr);

    expect(result[0]).not.toBeTruthy();
    expect(result[1]).toBe("space");
  });

  it("허가받지 못한 특수문자가 포함된 문자열을 입력받으면 거짓을 반환한다.", () => {
    const inputStr = "※】★41bjs히히";
    const result = validatePassword(inputStr);

    expect(result[0]).not.toBeTruthy();
    expect(result[1]).toBe("special");
  });

  it("허가받은 특수문자가 포함된 문자열을 입력받으면 참을 반환한다.", () => {
    // ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ ＼ ] ^ _ ` { | } ~ \
    const inputStr = "!``#$???!!?";
    const result = validatePassword(inputStr);

    expect(result[0]).toBeTruthy();
    expect(result[1]).toBe("pass");
  });
});
