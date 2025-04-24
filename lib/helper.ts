const validateEmail = (text: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};

const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else if (hour >= 17 && hour < 21) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
};

const validatePassword = (pass: string) => {
  const hasMinLength = pass.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(pass);
  const hasNumber = /\d/.test(pass);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
  return hasMinLength && hasLetter && hasNumber && hasSymbol;
};

const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '$0.00';
  return `$${value.toFixed(2)}`;
};

export { formatCurrency, getGreeting, validateEmail, validatePassword };
