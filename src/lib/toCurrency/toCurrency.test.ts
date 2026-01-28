import { toCurrency } from ".";
import { it, describe, expect } from "vitest";

describe("toCurrency", () => {
  it("Should format number to Brazilian real", () => {
    expect(toCurrency(1234.56)).toBe("R$ 1.234,56");
  });

  it("Should accept other locales and currencies", () => {
    expect(toCurrency(1234.56, "en-US", "USD")).toBe("$1,234.56");
    expect(toCurrency(1234.56, "ja-JP", "JPY")).toBe("￥1,235");
  });

  it("Should handle zero and negative numbers", () => {
    expect(toCurrency(0)).toBe("R$ 0,00");
    expect(toCurrency(-10)).toBe("-R$ 10,00");
  });
});
