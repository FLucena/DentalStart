import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import ConsultorioGallery from "./ConsultorioGallery";

const expectedPhotos = [
  {
    src: "/consultorio-1.jpeg",
    alt: "Sala de tratamiento con sillón dental moderno, luz natural y vista a la ciudad.",
  },
  {
    src: "/consultorio-2.jpeg",
    alt: "Área de gabinete con mesada, grifería y mobiliario blanco junto al equipamiento clínico.",
  },
  {
    src: "/consultorio-3.jpeg",
    alt: "Consultorio luminoso con sillón crema, plantas y ventanales de piso a techo.",
  },
  {
    src: "/consultorio-4.jpeg",
    alt: "Perspectiva del sillón dental y unidad frente a la vista urbana y el cielo despejado.",
  },
] as const;

describe("ConsultorioGallery", () => {
  beforeEach(() => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renderiza el título, la descripción y la región semántica", () => {
    render(<ConsultorioGallery />);

    const section = screen.getByRole("region", { name: /^nuestro consultorio$/i });
    expect(section).toBeInTheDocument();
    expect(
      within(section).getByRole("heading", { level: 2, name: /nuestro consultorio/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /espacios pensados para tu comodidad, con tecnología actual y mucha luz natural/i
      )
    ).toBeInTheDocument();
  });

  it("muestra las cuatro fotos con rutas y textos alt esperados tras entrar en vista", async () => {
    render(<ConsultorioGallery />);

    const section = screen.getByRole("region", { name: /^nuestro consultorio$/i });

    await waitFor(() => {
      expect(within(section).getAllByRole("img")).toHaveLength(4);
    });

    for (const photo of expectedPhotos) {
      const img = within(section).getByRole("img", { name: photo.alt });
      expect(img).toHaveAttribute("src", photo.src);
    }
  });

  it("con prefers-reduced-motion las imágenes quedan visibles sin depender del scroll", async () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<ConsultorioGallery />);

    const section = screen.getByRole("region", { name: /^nuestro consultorio$/i });

    await waitFor(() => {
      const img = within(section).getByRole("img", {
        name: /sala de tratamiento con sillón dental moderno/i,
      });
      expect(img).toBeVisible();
    });
  });
});
