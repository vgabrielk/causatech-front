export const validateForm = (cliente: any) => {
  const errors: { [key: string]: string } = {};

  if (cliente.cpf?.trim()) {
    const cpfLimpo = cliente.cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      errors.cpf = "O CPF deve conter exatamente 11 dígitos numéricos, sem caracteres.";
    }
  }

  if (cliente.telefone?.trim() && !/^\d{10,11}$/.test(cliente.telefone)) {
    errors.telefone = "O telefone deve ter entre 10 e 11 dígitos.";
  }

  if (cliente.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)) {
    errors.email = "Formato de e-mail inválido.";
  }

  return errors;
};
