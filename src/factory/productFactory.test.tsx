import { render, screen, waitFor } from "@testing-library/react";
import { ProductFactory } from "./productFactory";
import type { ProductSuggestion } from "@/models/chat";
import { describe, expect, it } from "vitest";

describe("ProductFactory", () => {
  const products: ProductSuggestion = {
    id: "products-1",
    type: "products",
    timestamp: 1,
    products: [
      {
        id: "p1",
        title: "Produto 1",
        price: 100,
        image: { src: "/img/1.png", alt: "Produto 1" },
      },
      {
        id: "p2",
        title: "Produto 2",
        price: 200,
        image: { src: "/img/2.png", alt: "Produto 2" },
      },
    ],
  };

  it("deve renderizar todos os produtos", () => {
    render(<ProductFactory {...products} />);
    expect(screen.getByText("Produto 1")).toBeInTheDocument();
    expect(screen.getByText("Produto 2")).toBeInTheDocument();
  });

  it("deve aplicar classes de opacidade corretamente", async () => {
    render(<ProductFactory {...products} />);

    await waitFor(() => {
      const articles = screen.getAllByRole('article');
      
      expect(articles[0]).toHaveClass('opacity-100');
    })
  });
});
