import { render, screen, waitFor } from "@testing-library/react";
import { ChatFactory } from "./ChatFactory";
import type { UseChatReturn } from "@/hooks/useChat";
import { describe, expect, it, vi } from "vitest";

HTMLElement.prototype.scrollIntoView = vi.fn();
describe("ChatFactory", () => {
  const baseChat: UseChatReturn = {
    current: {
      id: "1",
      type: "agent",
      text: "Olá!",
      timestamp: 2,
    },
    next: {
      id: "2",
      type: "agent",
      text: "Olá!",
      timestamp: 2,
    },
    chat: [
      { id: "1", type: "user", text: "Oi", timestamp: 1 },
      { id: "2", type: "agent", text: "Olá!", timestamp: 2 },
      { id: "3", type: "products", products: [], timestamp: 3 },
      { id: "4", type: "typing", timestamp: 4 },
    ],
    onAgentNext: vi.fn(),
    onUserNext: vi.fn(),
  };

  it("Should render all types of events in the chat", async () => {
    render(<ChatFactory {...baseChat} />);

    await waitFor(() => {
      expect(screen.getByText("Oi")).toBeInTheDocument();
      expect(screen.getByText("Olá!")).toBeInTheDocument();
      expect(screen.getByLabelText(/digitando/i)).toBeInTheDocument();
    })
  });

  it("Should call onAgentNext when rendering AgentBubble", async () => {
    const onAgentNext = vi.fn();
    const chat: UseChatReturn = {
      ...baseChat,
      onAgentNext,
      chat: [
        { id: "2", type: "agent", text: "Olá!", timestamp: 2 },
      ],
    };

    render(<ChatFactory {...chat} />);
   
    await waitFor(() => {
      expect(onAgentNext).toHaveBeenCalled();
    })
  });
});
