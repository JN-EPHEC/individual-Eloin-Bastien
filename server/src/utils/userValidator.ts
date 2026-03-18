export function validateUserRegistration(
  age: number,
  role: string,
  email: string,
): boolean {
  // âge > 120
  if (age > 120) {
    throw new Error("Âge invalide");
  }

  // âge invalide (négatif, nul, ou pas un nombre)
  if (age <= 0 || isNaN(age)) {
    throw new Error("Âge invalide");
  }

  // rôle invalide
  if (role !== "admin" && role !== "user" && role !== "stagiaire") {
    throw new Error("Rôle invalide");
  }

  // email sans @ ou .
  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }

  // mineur
  if (age < 18) {
    if (role === "stagiaire") {
      return true;
    }
    return false;
  }
  return true;
}
