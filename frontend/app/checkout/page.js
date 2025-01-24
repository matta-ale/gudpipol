'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateID,
  validateAddress,
  validatePostalCode,
  validateCity,
} from './validations';

export default function Checkout() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    id: '',
    address: '',
    province: '',
    city: '',
    postalCode: '',
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    id: false,
    address: false,
    province: false,
    city: false,
    postalCode: false,
  });

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const response = await axios.get(
          'https://apis.datos.gob.ar/georef/api/provincias'
        );
        const data = response.data.provincias.map((prov) => prov.nombre);
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    loadProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const selectedProvince = e.target.value;
    setFormData((prev) => ({ ...prev, province: selectedProvince, city: '' }));
    try {
      const response = await axios.get(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${selectedProvince}&campos=id,nombre`
      );
      const data = response.data.municipios.map(
        (municipio) => municipio.nombre
      );
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let error = '';
    switch (name) {
      case 'fullName':
        error = validateFullName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'id':
        error = validateID(value);
        break;
      case 'address':
        error = validateAddress(value);
        break;
      case 'postalCode':
        error = validatePostalCode(value);
        break;
      case 'city':
        error = validateCity(value);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificamos si existen errores
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      console.log('Formulario con errores, no se puede enviar.');
      return; // No enviamos el formulario si hay errores
    }

    console.log('Formulario enviado:', formData); // Verificamos que los datos son correctos antes de enviar

    try {
      router.push('/paymentMethod');
      // const { order } = await axios.post(`${BACKEND_URL}/createOrder`, formData);
      // const { data } = await axios.post(`${BACKEND_URL}/createPayment`, formData);
      // window.location.href = data;
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <main
      className="w-[95%] md:w-[800px] mx-auto mt-24 md:mt-44 py-6 rounded-lg"
      style={{ backgroundColor: 'rgba(45, 46, 50, 0.75)' }}
    >
      <h1 className="text-white text-2xl mx-4 md:mx-7 mb-6 font-bold">
        Ingrese sus datos
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 mx-4 md:mx-6">
        <div className="md:grid md:grid-cols-2 md:gap-4 md:gap-x-8">
          {[{ label: 'Nombre completo', name: 'fullName', type: 'text' },
            { label: 'Correo electrónico', name: 'email', type: 'email' },
            { label: 'Teléfono', name: 'phone', type: 'text' },
            { label: 'DNI', name: 'id', type: 'text' },
            { label: 'Dirección', name: 'address', type: 'text' },
            { label: 'Código Postal', name: 'postalCode', type: 'text' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-white font-bold mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full h-10 p-2 rounded-md ${touched[field.name] && errors[field.name] ? 'border-2 border-red-500' : ''}`}
                required
              />
              {touched[field.name] && errors[field.name] && (
                <div className="text-red-500 h-5 text-sm mt-1 mb-3 md:mb-0 flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{errors[field.name]}</span>
                </div>
              )}
            </div>
          ))}
          <div>
            <label className="block text-white font-bold mb-2">Provincia</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleProvinceChange}
              onBlur={handleBlur}
              className={`w-full h-10 p-2 rounded-md mb-8 ${touched.province && errors.province ? 'border-2 border-red-500' : ''}`}
              required
            >
              <option value="">Seleccione una provincia</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {touched.province && errors.province && (
              <div className="text-red-500 h-5 text-sm flex items-center space-x-2">
                <span>⚠️</span>
                <span>{errors.province}</span>
              </div>
            )}
          </div>
          <div>
            <label className="block text-white font-bold mb-2">Localidad</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full h-10 p-2 rounded-md ${touched.city && errors.city ? 'border-2 border-red-500' : ''}`}
              required
            />
            {touched.city && errors.city && (
              <div className="text-red-500 h-5 text-sm">
                <span>⚠️</span>
                {errors.city}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg mt-4"
        >
          Confirmar y Pagar
        </button>
      </form>
    </main>
  );
}
