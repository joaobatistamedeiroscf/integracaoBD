export function validateName(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "O campo é obrigatório.";
  // exige pelo menos 3 caracteres para nome
  if (trimmed.length <= 3) return "Digite seu nome completo.";
  return "";
}
