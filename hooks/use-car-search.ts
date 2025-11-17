"use client";

import { useState, useMemo } from "react";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
  doors: number;
  engine: string;
  image: string;
  images?: string[];
  featured?: boolean;
  features?: string[];
}

export interface SearchFilters {
  searchTerm: string;
  brands: string[];
  priceRange: [number, number];
  yearRange: [number, number];
  fuelTypes: string[];
  transmission: string;
  sortBy: string;
}

/** Exportar mockCars para ser reutilizado por outras páginas (ex: detalhes) */
export const mockCars: Car[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Corolla 1.8 Hybrid Altis Premium",
    year: 2025,
    price: 202010,
    mileage: 0,
    fuel: "Gasolina e Elétrico",
    transmission: "CVT",
    color: "Preto",
    doors: 4,
    engine: "1.8 Hybrid",
    image: "corolla/toyota-corolla-1.png",
    images: [
      "/corolla/toyota-corolla-1.png",
      "/corolla/toyota-corolla-2.png",
      "/corolla/toyota-corolla-3.png",
    ],
    featured: true,
    features: [
      "Ar-condicionado digital",
      "Direção elétrica",
      "Central multimídia touchscreen",
      "Espelhamento Android Auto e Apple CarPlay",
      "Câmera de ré",
      "Piloto automático",
      "Sensor de estacionamento",
      "Bancos em couro",
      "Faróis em LED",
      "Airbags frontais, laterais e de cortina",
    ],
  },
  {
    id: "2",
    brand: "Hyundai",
    model: "HB20 1.0 TGDI Comfort Automático",
    year: 2023,
    price: 82500,
    mileage: 20000,
    fuel: "Gasolina e Álcool",
    transmission: "Automática",
    color: "Branco",
    doors: 4,
    engine: "1.0 TGDI",
    image: "hyundai/hyundai-hb20-1.png",
    images: [
      "/hyundai/hyundai-hb20-1.png",
      "/hyundai/hyundai-hb20-2.png",
      "/hyundai/hyundai-hb20-3.png",
    ],
    featured: true,
    features: [
      "Ar-condicionado digital",
      "Direção elétrica",
      "Central multimídia touchscreen",
      "Espelhamento Android Auto e Apple CarPlay",
      "Câmera de ré",
      "Piloto automático",
      "Sensor de estacionamento",
      "Bancos em couro",
      "Faróis em LED",
      "Airbags frontais, laterais e de cortina",
    ],
  },
  {
    id: "3",
    brand: "Fiat",
    model: "Palio 1.0 Attractive Manual",
    year: 2012,
    price: 29399,
    mileage: 75252,
    fuel: "Gasolina e Álcool",
    transmission: "Manual",
    color: "Vermelho",
    doors: 4,
    engine: "1.0 8v",
    image: "palio/fiat-palio-1.jpg",
    images: [
      "/palio/fiat-palio-1.jpg",
      "/palio/fiat-palio-2.jpg",
      "/palio/fiat-palio-3.jpg",
    ],
    featured: true,
    features: [
      "Ar-condicionado digital",
      "Direção elétrica",
      "Central multimídia touchscreen",
      "Espelhamento Android Auto e Apple CarPlay",
      "Câmera de ré",
      "Piloto automático",
      "Sensor de estacionamento",
      "Bancos em couro",
      "Faróis em LED",
      "Airbags frontais, laterais e de cortina",
    ],
  },
  {
    id: "4",
    brand: "Chevrolet",
    model: "Onix 1.0 Turbo LT Manual",
    year: 2024,
    price: 76590,
    mileage: 36125,
    fuel: "Gasolina e Álcool",
    transmission: "Manual",
    color: "Branco",
    doors: 4,
    engine: "1.0 Turbo",
    image: "onix/chevrolet-onix-1.jpg",
    images: [
      "/onix/chevrolet-onix-1.jpg",
      "/onix/chevrolet-onix-2.jpg",
      "/onix/chevrolet-onix-3.jpg",
    ],
    featured: true,
    features: [
      "Ar-condicionado digital",
      "Direção elétrica",
      "Central multimídia touchscreen",
      "Espelhamento Android Auto e Apple CarPlay",
      "Câmera de ré",
      "Piloto automático",
      "Sensor de estacionamento",
      "Bancos em couro",
      "Faróis em LED",
      "Airbags frontais, laterais e de cortina",
    ],
  },
  {
    id: "5",
    brand: "Volkswagen",
    model: "Amarok 3.0 V6 Extreme 4Motion Automática",
    year: 2024,
    price: 299990,
    mileage: 29682,
    fuel: "Diesel",
    transmission: "Automática",
    color: "Prata",
    doors: 4,
    engine: "3.0 V6 TDI",
    image: "amarok/AMAROK-1.png",
    images: [
      "/amarok/AMAROK-1.png",
      "/amarok/AMAROK-2.png",
      "/amarok/AMAROK-3.png",
    ],
    featured: true,
    features: [
      "Ar-condicionado digital",
      "Direção elétrica",
      "Central multimídia touchscreen",
      "Espelhamento Android Auto e Apple CarPlay",
      "Câmera de ré",
      "Piloto automático",
      "Sensor de estacionamento",
      "Bancos em couro",
      "Faróis em LED",
      "Airbags frontais, laterais e de cortina",
    ],
  },
];

export function useCarSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    brands: [],
    priceRange: [0, 300000],
    yearRange: [2000, 2025],
    fuelTypes: [],
    transmission: "",
    sortBy: "price-asc",
  });

  const filteredCars = useMemo(() => {
    let result = [...mockCars];

    // Text search
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower) ||
          `${car.brand} ${car.model}`.toLowerCase().includes(searchLower)
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((car) => filters.brands.includes(car.brand));
    }

    // Price range filter
    result = result.filter(
      (car) =>
        car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    );

    // Year range filter
    result = result.filter(
      (car) =>
        car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1]
    );

    // Fuel type filter
    if (filters.fuelTypes.length > 0) {
      result = result.filter((car) => filters.fuelTypes.includes(car.fuel));
    }

    // Transmission filter
    if (filters.transmission) {
      result = result.filter(
        (car) => car.transmission === filters.transmission
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        result.sort((a, b) => b.year - a.year);
        break;
      case "year-asc":
        result.sort((a, b) => a.year - b.year);
        break;
      case "mileage-asc":
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      brands: [],
      priceRange: [0, 200000],
      yearRange: [2000, 2024],
      fuelTypes: [],
      transmission: "",
      sortBy: "price-asc",
    });
  };

  return {
    cars: filteredCars,
    filters,
    updateFilters,
    clearFilters,
    totalCars: mockCars.length,
    filteredCount: filteredCars.length,
  };
}
