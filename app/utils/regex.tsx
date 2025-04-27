export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const phoneRegex = /^(?:\+48\s?)?(?:\d{3}[-.\s]?){2}\d{3}$/;

export const zipCodeRegex = {
  standard: /^\d{2}-\d{3}$/, // np. 12-345
  withoutDash: /^\d{5}$/, // np. 12345
};

export const eMoneyRegex = /^\d*$/; //Tylko cyfry
