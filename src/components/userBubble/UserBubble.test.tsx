import { render, screen } from "@testing-library/react";
import { UserBubble } from ".";
import { describe, expect, it } from "vitest";

describe("UserBubble", () => {
  it("Should render user message", () => {
    render(<UserBubble message="Mensagem de teste" />);
    expect(screen.getByText("Mensagem de teste")).toBeInTheDocument();
  });
});
