export type ValidateDateOptions = {
  isBirthdate?: boolean; // se for data de nascimento, minAge poderá ser usada
  minAge?: number; // idade mínima em anos (ex: 18)
  minDate?: string; // data mínima aceita (DD/MM/YYYY ou YYYY-MM-DD)
  maxDate?: string; // data máxima aceita
};

function isLeapYear(y: number): boolean {
  return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
}

function parseDateParts(
  value: string
): { day: number; month: number; year: number } | null {
  // aceita DD/MM/YYYY ou YYYY-MM-DD
  const dmy = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/;
  const ymd = /^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/;
  let m = dmy.exec(value);
  if (m) {
    const day = Number(m[1]);
    const month = Number(m[2]);
    const year = Number(m[3]);
    return { day, month, year };
  }
  m = ymd.exec(value);
  if (m) {
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    return { day, month, year };
  }
  return null;
}

function partsToUtcMs(p: { day: number; month: number; year: number }): number {
  return Date.UTC(p.year, p.month - 1, p.day);
}

export function validateDate(
  value: string,
  options?: ValidateDateOptions
): string {
  const trimmed = (value || "").trim();
  if (!trimmed) return "O campo é obrigatório.";

  // caracteres inválidos: permite apenas dígitos, espaço, / e -
  if (!/^[0-9\s\/\-]+$/.test(trimmed))
    return "Caracteres inválidos na data. Use somente dígitos e separadores '/' ou '-'.";

  const parts = parseDateParts(trimmed);
  if (!parts) return "Formato inválido. Use DD/MM/YYYY ou YYYY-MM-DD.";

  const { day, month, year } = parts;
  const currentYear = new Date().getFullYear();

  if (year < 1900 || year > currentYear)
    return `Ano deve estar entre 1900 e ${currentYear}.`;
  if (month < 1 || month > 12) return "Mês inválido (1-12).";
  if (day < 1 || day > 31) return "Dia inválido (1-31).";

  // valida dias por mês
  const monthDays = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  const maxDay = monthDays[month - 1];
  if (day > maxDay)
    return `Dia inválido para o mês e ano fornecidos. ${month}/${year} tem no máximo ${maxDay} dias.`;

  // converter para ms UTC para comparações (evitar timezone issues)
  const dateMs = partsToUtcMs(parts);
  const today = new Date();
  const todayUtc = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  if (dateMs > todayUtc) return "A data não pode ser no futuro.";

  // validar idade mínima se aplicado
  if (options?.minAge && options.minAge > 0) {
    const birthYear = year;
    const birthMonth = month;
    const birthDay = day;
    let age = today.getFullYear() - birthYear;
    // ajustar se ainda não fez aniversário este ano
    if (
      today.getMonth() + 1 < birthMonth ||
      (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)
    ) {
      age -= 1;
    }
    if (age < options.minAge)
      return `Idade mínima de ${options.minAge} anos não atingida.`;
  }

  // validar range de datas se fornecido
  if (options?.minDate) {
    const minParts = parseDateParts(options.minDate);
    if (!minParts) return "Formato inválido para a data mínima configurada.";
    const minMs = partsToUtcMs(minParts);
    if (dateMs < minMs)
      return `A data precisa ser igual ou posterior a ${options.minDate}.`;
  }
  if (options?.maxDate) {
    const maxParts = parseDateParts(options.maxDate);
    if (!maxParts) return "Formato inválido para a data máxima configurada.";
    const maxMs = partsToUtcMs(maxParts);
    if (dateMs > maxMs)
      return `A data precisa ser igual ou anterior a ${options.maxDate}.`;
  }

  return "";
}
