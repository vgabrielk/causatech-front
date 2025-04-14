export const validateLogin = (user: {
    email?: string;
    password?: string;
  }) => {
    const errors: { [key: string]: string } = {};
  
    if (user.email?.trim()) {
      if (user.email.length > 255) {
        errors.email = "O e-mail não pode ter mais que 255 caracteres.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.email = "Formato de e-mail inválido.";
      }
    }
  
    if (user.password?.trim()) {
      if (user.password.length < 8) {
        errors.password = "A senha deve ter pelo menos 8 caracteres.";
      }
    }
  
    return errors;
  };
  