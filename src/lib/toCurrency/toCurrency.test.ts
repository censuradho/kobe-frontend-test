import { toCurrency } from ".";
import { it, describe, expect } from "vitest";

describe("toCurrency", () => {
  it("deve formatar número para real brasileiro", () => {
    expect(toCurrency(1234.56)).toBe("R$ 1.234,56");
  });

  it("deve aceitar outros locais e moedas", () => {
    expect(toCurrency(1234.56, "en-US", "USD")).toBe("$1,234.56");
    expect(toCurrency(1234.56, "ja-JP", "JPY")).toBe("￥1,235");
  });

  it("deve lidar com zero e negativos", () => {
    expect(toCurrency(0)).toBe("R$ 0,00");
    expect(toCurrency(-10)).toBe("-R$ 10,00");
  });
});
