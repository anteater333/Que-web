import formatCount from "./formatCount";

describe("function formatCount", () => {
  it("숫자를 입력받아 문자를 반환한다.", () => {
    const numCount = 1000;
    const strCount = formatCount(numCount);

    expect(typeof strCount).toBe("string");
  });

  it("10000이 넘어가는 숫자가 입력되면 k 단위로 축약한 문자열을 반환한다.", () => {
    const numCount = 12345;
    const strCount = formatCount(numCount);

    expect(strCount).toBe("12.3k");
  });
});
