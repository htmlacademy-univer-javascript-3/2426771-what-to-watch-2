export const validatePassword = (email: string) => String(email)
  .toLowerCase()
  .match(
    /^\w+$/
  );
