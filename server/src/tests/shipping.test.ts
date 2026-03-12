import { calculateShipping } from "../utils/shipping.js";

const testCases = [
  // [Description, Distance, Poids, Type, Expected Price]
  ["Distance 0 km -> Prix 10€", 0, 5, "standard", 10],
  ["Distance 50 km -> Prix 10€", 50, 5, "standard", 10],
  ["Distance 51 km -> Prix 25€", 51, 5, "standard", 25],
  ["Distance 500 km -> Prix 25€", 500, 5, "standard", 25],
  ["Distance 501 km -> Prix 50€", 501, 5, "standard", 50],

  // Cas avec majoration poids
  ["Poids 9 kg -> Pas de majoration", 10, 9, "standard", 10],
  ["Poids 10 kg -> Majoré de 50%", 10, 10, "standard", 15],
  ["Poids 50 kg -> Majoré de 50%", 10, 50, "standard", 15],

  // 3. Cas d'Erreurs Attendues
  ["Entrée invalide (-1, 5)", -1, 5, "standard", "Invalid distance"], // [cite: 111, 134]
  ["Entrée invalide (10, 0)", 10, 0, "standard", "Invalid weight"], // [cite: 122, 135]
  ["Entrée invalide (10, -5)", 10, -5, "standard", "Invalid weight"], // [cite: 122]
  ["Entrée invalide (10, 51)", 10, 51, "standard", "Invalid weight"], // [cite: 121, 135]
];

describe("Shipping Calculator - Tests Fonctionnels", () => {
  test.each(testCases)(
    "%s",
    (description, distance, weight, type, expected) => {
      // Si la réponse attendue est un texte, c'est qu'on teste une erreur (throw)
      if (typeof expected === "string") {
        expect(() => {
          calculateShipping(distance as number, weight as number, type as any);
        }).toThrow(expected);
      }
      // Sinon, on teste un calcul de prix classique
      else {
        const result = calculateShipping(
          distance as number,
          weight as number,
          type as any,
        );
        expect(result).toBe(expected);
      }
    },
  );
});

const nWiseCases = [
  [5, 5, "standard", 10],
  [5, 20, "express", 30],
  [100, 5, "express", 50],
  [100, 20, "standard", 37.5],
  [600, 5, "standard", 50],
  [600, 20, "express", 150],
];

describe("Shipping Calculator - N-Wise Testing (Exercice 5.2.1)", () => {
  test.each(nWiseCases)(
    "Pour dist: %i km, poids: %i kg, type: %s -> attendu: %f €",
    (distance, weight, type, expected) => {
      const result = calculateShipping(
        distance as number,
        weight as number,
        type as any,
      );
      expect(result).toBe(expected);
    },
  );
});
