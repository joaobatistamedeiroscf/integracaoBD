export function validatePassword(value: string): string {
  const trimmed = value;
  if (!trimmed) return "O campo é obrigatório.";
  if (trimmed.length < 8) return "A senha deve ter no mínimo 8 caracteres.";
  if (!/[A-Z]/.test(trimmed)) return "Inclua ao menos 1 letra maiúscula.";
  if (!/[a-z]/.test(trimmed)) return "Inclua ao menos 1 letra minúscula.";
  if (!/[0-9]/.test(trimmed)) return "Inclua ao menos 1 número.";
  return "";
}
