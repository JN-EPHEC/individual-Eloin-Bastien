import { validatePassword } from "../utils/password";
describe("Password Validator - White Box Testing", () => {
  // Test initial pour initialiser le rapport de couverture
  // Ce test ne couvre que la première ligne de la fonction (Branch 1)
  it("devrait rejeter un mot de passe vide", () => {
    const result = validatePassword("", 25);
    expect(result).toBe(false);
  });
  // Branche 2 : L'âge
  it("devrait rejeter si l'utilisateur a moins de 18 ans", () => {
    const result = validatePassword("Password123", 16);
    expect(result).toBe(false);
  });

  // Branche 3 : Longueur
  it("devrait rejeter si le mot de passe est trop court", () => {
    const result = validatePassword("Ab1", 20);
    expect(result).toBe(false);
  });

  it("devrait rejeter un mot de passe de plus de 20 caractères", () => {
    const result = validatePassword(
      "CeMotDePasseEstBeaucoupTropLongPourLeSysteme",
      25,
    );
    expect(result).toBe(false);
  });

  // Branche 4 : Majuscule
  it("devrait rejeter s'il n'y a pas de majuscule", () => {
    const result = validatePassword("password123", 20);
    expect(result).toBe(false);
  });

  // Branche 5 : Chiffre
  it("devrait rejeter s'il n'y a pas de chiffre", () => {
    const result = validatePassword("Password", 20);
    expect(result).toBe(false);
  });

  it("Adulte : devrait rejeter si manque une majuscule", () => {
    const result = validatePassword("password123!", 25);
    expect(result).toBe(false);
  });

  it("Enfant : devrait rejeter si pas de minuscule", () => {
    // Âge < 12, mot de passe sans minuscule
    const result = validatePassword("PASSWORD123!", 10);
    expect(result).toBe(false);
  });

  it("Enfant : devrait accepter avec juste des minuscules", () => {
    const result = validatePassword("password", 10);
    expect(result).toBe(true);
  });

  it("Senior : devrait rejeter si pas de chiffre ET pas de majuscule", () => {
    // Âge >= 65, mot de passe uniquement en minuscules
    const result = validatePassword("password!", 70);
    expect(result).toBe(false);
  });

  it("Senior : devrait accepter avec une majuscule (même sans chiffre)", () => {
    const result = validatePassword("Password!", 70);
    expect(result).toBe(true);
  });
  // Ajoute un caractère spécial (ex: !) pour que ce test passe enfin
  it("devrait accepter un mot de passe valide et un âge correct", () => {
    const result = validatePassword("SuperVelo2025!", 20);
    expect(result).toBe(true);
  });
});
