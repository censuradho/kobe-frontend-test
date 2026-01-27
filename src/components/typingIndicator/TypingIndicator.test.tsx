import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TypingIndicator } from ".";

describe("TypingIndicator", () => {
  it ("should render typing indicator correctly", () => {
    render(<TypingIndicator />)
    const indicator = screen.getByLabelText(/O agente está digitando/i)

    expect(indicator.textContent).toBe("•••")
    expect(indicator.querySelectorAll("span").length).toBe(3)
  })
})