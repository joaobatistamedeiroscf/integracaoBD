export function validateEmail(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "O campo é obrigatório.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(trimmed)) return "Digite um email válido";
  return "";
}
