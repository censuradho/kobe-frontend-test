import { render, screen, waitFor } from "@testing-library/react";
import { AgentBubble } from ".";
import { describe, expect, it, vi } from "vitest";

describe("AgentBubble", () => {
  const delayPerCharacter = 50; 

  it("Should display the message animating until the end and call onComplete", async () => {
    const onComplete = vi.fn();

    const message = "Olá, tudo bem?"

    render(<AgentBubble message={message} onComplete={onComplete} />);

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(onComplete).toHaveBeenCalled();
    }, {
      timeout: message.length * delayPerCharacter + 100
    })
  });

  it("Should display the partial message during the animation and not call onComplete", async () => {
    const onComplete = vi.fn();

    render(<AgentBubble message="Teste animado" onComplete={onComplete} />);

    const partialText = "Teste";
    
    await waitFor(() => {
      expect(screen.getByText(partialText)).toBeInTheDocument();
      expect(onComplete).not.toHaveBeenCalled();
    }, {
      timeout: partialText.length * delayPerCharacter + 100
    })
  });

  it ("Should not break with empty message", async () => {
    const onComplete = vi.fn();
    const message = "";
    
    render(<AgentBubble message={message} onComplete={onComplete} />);

    await waitFor(() => {
      expect(screen.getByLabelText(message)).toBeInTheDocument();
      expect(onComplete).toHaveBeenCalled();
    }, {
      timeout: message.length * delayPerCharacter + 100
    })
  })

  it ("Should handle large messages", async () => {
    const onComplete = vi.fn();
    // Limitei a 100 por performance da suite no geral
    const message = "A".repeat(100);
    
    render(<AgentBubble message={message} onComplete={onComplete} />);

    await waitFor(() => {
      expect(screen.getByLabelText(message)).toBeInTheDocument();
      expect(onComplete).toHaveBeenCalled();
    }, {
      timeout: message.length * delayPerCharacter + 100
    })
  })

  it ('Should not be broken if onComplete is not provided', async () => {
    render(<AgentBubble message="No callback" />);
    const message = "No callback";

    expect(await screen.findByText("No callback", {}, { timeout: message.length * delayPerCharacter + 100 })).toBeInTheDocument();
  })

  it ('Should stop animation if unmount before finishing', async () => {
    const onComplete = vi.fn();
    const { unmount } = render(<AgentBubble message="Unmounting" onComplete={onComplete} />);
   
    unmount();
    expect(onComplete).not.toHaveBeenCalled();
  })
});
