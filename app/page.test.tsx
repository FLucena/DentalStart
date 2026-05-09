import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";

vi.mock("./hooks/usePopupSession", () => ({
  usePopupSession: () => false,
}));

vi.mock("./components/ContactPopup", () => ({
  default: function MockContactPopup() {
    return null;
  },
}));

describe("HomePage", () => {
  it("incluye la sección Nuestro consultorio con las cuatro imágenes", async () => {
    render(<HomePage />);

    const region = await screen.findByRole("region", { name: /nuestro consultorio/i });
    expect(region).toBeInTheDocument();

    await waitFor(() => {
      expect(within(region).getAllByRole("img")).toHaveLength(4);
    });
  });
});
