export const validators = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  isValidPhone: (phone: string): boolean => {
    // Basic phone validation matching international or US formats
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
  },

  isValidPlateNumber: (plate: string): boolean => {
    // Allow standard alphanumeric plates between 3 and 10 chars
    const plateRegex = /^[A-Z0-9-]{3,10}$/i;
    return plateRegex.test(plate);
  },

  isValidVIN: (vin: string): boolean => {
    // VIN numbers must be exactly 17 characters (alphanumeric, excluding I, O, Q)
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    return vinRegex.test(vin);
  },
};
