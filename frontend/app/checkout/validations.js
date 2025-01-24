
export const validateFullName = (fullName) => {
    if (!fullName) return 'Nombre completo es requerido';
    return '';
  };
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Correo electrónico inválido';
    return '';
  };
  
  export const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) return 'Entre 10 y 15 dígitos';
    return '';
  };
  
  export const validateID = (id) => {
    const idRegex = /^[0-9]{7,8}$/;
    if (!idRegex.test(id)) return 'Debe contener 7 u 8 dígitos';
    return '';
  };
  
  export const validateAddress = (address) => {
    if (!address) return 'Dirección es requerida';
    return '';
  };
  
  export const validatePostalCode = (postalCode) => {
    const postalCodeRegex = /^[a-zA-Z0-9]{4,8}$/;
    if (!postalCodeRegex.test(postalCode)) return 'Entre 4 y 8 dígitos';
    return '';
  };
  
  export const validateCity = (city) => {
    if (!city) return 'Localidad es requerida';
    return '';
  };
  