import { describe, it, expect } from "vitest";
import { validateDate } from "../validateDate";

describe("validateDate - anos bissextos e formatos", () => {
  it("aceita 29/02 em ano bissexto (29/02/2020)", () => {
    const res = validateDate("29/02/2020");
    expect(res).toBe("");
  });

  it("recusa 29/02 em ano não bissexto (29/02/2019)", () => {
    const res = validateDate("29/02/2019");
    expect(res).toContain("Dia inválido");
  });

  it("aceita formato ISO YYYY-MM-DD (2020-02-29)", () => {
    const res = validateDate("2020-02-29");
    expect(res).toBe("");
  });

  it("recusa caracteres inválidos", () => {
    const res = validateDate("01-jan-2020");
    expect(res).toContain("Caracteres inválidos");
  });

  it("valida idade mínima (18 anos) - menor que 18 retorna erro", () => {
    const today = new Date();
    const year = today.getFullYear() - 16; // 16 anos
    const dateStr = `01/01/${year}`;
    const res = validateDate(dateStr, { isBirthdate: true, minAge: 18 });
    expect(res).toContain("Idade mínima de 18 anos");
  });
});
