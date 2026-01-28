import { act, renderHook } from "@testing-library/react";
import { useChat } from ".";

import { mockChat } from "@/mocks/products";
import { describe, expect, it, vi } from "vitest";

describe("useChat", () => {
  // Mock de delay imediato para todos os testes exceto o de delay customizado
  function immediateDelay(callback: () => void) {
    callback();
  }

  function fakeDelay(callback: () => void, ms: number) {
    setTimeout(callback, ms);
  }
  it("Should initialize an empty chat", () => {
    const { result } = renderHook(() => useChat({ useDelay: immediateDelay }));
    expect(result.current.chat).toHaveLength(0);
  });

  it("Should not advance beyond the last event", () => {
    
    const { result } = renderHook(() => useChat({ useDelay: immediateDelay }));
    act(() => {
      for (let i = 0; i < mockChat.length + 2; i++) {
        result.current.onAgentNext();
      }
    });
    expect(result.current.chat.length).toBeLessThanOrEqual(mockChat.length);
  });

  it("Should remove typing indicator if typing is not the last event in chat", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useChat({ useDelay: fakeDelay }));

    act(() => {
      result.current.onUserNext()
      result.current.onAgentNext() 
      vi.advanceTimersByTime(result.current?.current?.delay || 500);
    });
    
    act(() => {
      vi.runAllTimers();
    });

    const hasTypingEvent = result.current.chat.some(item => item.type === "typing")

    expect(hasTypingEvent).toBe(false);
    vi.useRealTimers();
  });

  it("Should not advance onUserNext if it's not the user's turn", () => {
    const { result } = renderHook(() => useChat({ useDelay: fakeDelay }));

    act(() => {
      result.current.onUserNext();
    });

    const prevStep = result.current.chat.length;

    act(() => {
      result.current.onUserNext();
      result.current.onUserNext();
      result.current.onUserNext();
    });

    expect(result.current.chat.length).toBe(prevStep);
  });

  it("Should advance onUserNext only when it's the user's turn", () => {

  });

  it("Should not break if mockChat is empty", () => {
    const { result } = renderHook(() => useChat({ useDelay: immediateDelay, data: [] }));
    expect(result.current.chat).toHaveLength(0);
  });
});
