export const validateForm = (advogado: any) => {
  const errors: { [key: string]: string } = {};

  if (advogado.oab?.trim()) {
    if (!/^\d{4,10}$/.test(advogado.oab)) {
      errors.oab = "A OAB deve conter entre 4 a 10 dígitos numéricos.";
    }
  }

  if (advogado.estado_oab?.trim()) {
    if (!/^[A-Z]{2}$/.test(advogado.estado_oab.toUpperCase())) {
      errors.estado_oab = "O estado da OAB deve conter exatamente duas letras maiúsculas (ex: SP, RJ).";
    }
  }

  return errors;
};
