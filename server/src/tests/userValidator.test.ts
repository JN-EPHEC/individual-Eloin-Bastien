import { validateUserRegistration } from "../utils/userValidator";

type Expected = boolean | "AGE_ERROR" | "ROLE_ERROR";

const testCases: [string, number, string, string, Expected][] = [
  // Cas valides
  ["Majeur user, email OK -> true", 25, "user", "john.doe@test.com", true],
  ["Majeur admin, email OK -> true", 30, "admin", "john.doe@test.com", true],

  // Cas mineurs
  ["17 ans user -> false", 17, "user", "john.doe@test.com", false],
  ["17 ans stagiaire -> true", 17, "stagiaire", "john.doe@test.com", true],

  // Limites d'âge
  ["18 ans user -> true", 18, "user", "john.doe@test.com", true],
  ["> 120 ans -> erreur âge", 121, "user", "john.doe@test.com", "AGE_ERROR"],

  // Rôle invalide
  [
    "Rôle invalide -> erreur rôle",
    25,
    "toto",
    "john.doe@test.com",
    "ROLE_ERROR",
  ],

  // Emails invalides
  ["Email sans @ -> false", 25, "user", "john.doetest.com", false],
  ["Email sans . -> false", 25, "user", "johndoe@testcom", false],

  // Limites d'âge (valeurs bizarre)
  ["Âge négatif -> erreur âge", -5, "user", "john.doe@test.com", "AGE_ERROR"],
];

describe("validateUserRegistration - tests fonctionnels", () => {
  test.each(testCases)("%s", (_desc, age, role, email, expected) => {
    if (expected === "AGE_ERROR") {
      expect(() => validateUserRegistration(age, role, email)).toThrow(
        "Âge invalide",
      );
    } else if (expected === "ROLE_ERROR") {
      expect(() => validateUserRegistration(age, role, email)).toThrow(
        "Rôle invalide",
      );
    } else {
      const result = validateUserRegistration(age, role, email);
      expect(result).toBe(expected);
    }
  });
});
