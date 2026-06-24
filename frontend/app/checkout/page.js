'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaUser, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import FormSelect from '../components/FormSelect';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateID,
  validateAddress,
  validatePostalCode,
  validateCity,
  validateProvince,
} from './validations';

const TEXT_FIELDS = [
  { label: 'Nombre completo', name: 'fullName', type: 'text', autoComplete: 'name' },
  { label: 'Correo electrónico', name: 'email', type: 'email', autoComplete: 'email' },
  { label: 'Teléfono', name: 'phone', type: 'tel', autoComplete: 'tel' },
  { label: 'DNI', name: 'idNumber', type: 'text', autoComplete: 'off' },
  { label: 'Dirección', name: 'address', type: 'text', autoComplete: 'street-address' },
  { label: 'Código postal', name: 'postalCode', type: 'text', autoComplete: 'postal-code' },
];

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  idNumber: '',
  address: '',
  province: '',
  city: '',
  postalCode: '',
};

const INITIAL_TOUCHED = Object.keys(INITIAL_FORM).reduce(
  (acc, key) => ({ ...acc, [key]: false }),
  {}
);

export default function Checkout() {
  const router = useRouter();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const response = await axios.get(
          'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&max=30'
        );
        const data = response.data.provincias
          .map((prov) => prov.nombre)
          .sort((a, b) => a.localeCompare(b, 'es'));
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setLoadingProvinces(false);
      }
    };

    loadProvinces();
  }, []);

  const loadCities = async (selectedProvince) => {
    setLoadingCities(true);
    setCities([]);

    try {
      const response = await axios.get(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${encodeURIComponent(selectedProvince)}&campos=id,nombre&max=500`
      );
      const data = response.data.municipios
        .map((municipio) => municipio.nombre)
        .sort((a, b) => a.localeCompare(b, 'es'));
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoadingCities(false);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return validateFullName(value);
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'idNumber':
        return validateID(value);
      case 'address':
        return validateAddress(value);
      case 'postalCode':
        return validatePostalCode(value);
      case 'city':
        return validateCity(value);
      case 'province':
        return validateProvince(value);
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleProvinceChange = (option) => {
    const selectedProvince = option?.value || '';
    setFormData((prev) => ({ ...prev, province: selectedProvince, city: '' }));
    setErrors((prev) => ({
      ...prev,
      province: validateProvince(selectedProvince),
      city: validateCity(''),
    }));
    setTouched((prev) => ({ ...prev, province: true, city: false }));

    if (selectedProvince) {
      loadCities(selectedProvince);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (option) => {
    const selectedCity = option?.value || '';
    setFormData((prev) => ({ ...prev, city: selectedCity }));
    setErrors((prev) => ({ ...prev, city: validateCity(selectedCity) }));
    setTouched((prev) => ({ ...prev, city: true }));
  };

  const validateForm = () => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      localStorage.setItem('userData', JSON.stringify(formData));
      router.push('/paymentMethod');
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  const provinceOptions = provinces.map((province) => ({
    value: province,
    label: province,
  }));

  const cityOptions = cities.map((city) => ({
    value: city,
    label: city,
  }));

  const inputClass = (name) =>
    `peer block w-full rounded-lg bg-custom-gray border-2 ${
      touched[name] && errors[name] ? 'border-red-500' : 'border-custom-green3'
    } text-custom-green5 px-4 pt-8 pb-2 focus:outline-none focus:ring-2 focus:ring-custom-green4 transition`;

  return (
    <main className="flex justify-center px-4">
      <div className="w-full max-w-2xl mx-auto mt-32 md:mt-48 mb-16">
        <div className="flex items-center justify-center gap-2 mb-8 text-xs md:text-sm text-gray-400">
          <span className="inline-flex items-center gap-1.5 text-custom-green4 font-medium">
            <FaUser className="text-custom-green3" />
            Carrito
          </span>
          <span>→</span>
          <span className="inline-flex items-center gap-1.5 text-custom-green5 font-semibold">
            <FaMapMarkerAlt className="text-custom-green3" />
            Datos
          </span>
          <span>→</span>
          <span className="inline-flex items-center gap-1.5">
            <FaCreditCard />
            Pago
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-br from-green-50 to-green-100 px-6 md:px-8 py-6 border-b border-green-200">
            <h1 className="text-2xl md:text-3xl font-bold text-custom-green5">
              Datos de envío
            </h1>
            <p className="text-custom-green4 mt-2 text-sm md:text-base">
              Completá tus datos para continuar con el pago
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              {TEXT_FIELDS.map((field) => (
                <div key={field.name} className="relative">
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    autoComplete={field.autoComplete}
                    placeholder=" "
                    className={inputClass(field.name)}
                    required
                  />
                  <label
                    htmlFor={field.name}
                    className="absolute left-4 top-2 text-custom-green4 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-custom-green3 peer-focus:top-2 peer-focus:text-custom-green5 peer-focus:text-sm select-none"
                  >
                    {field.label}
                  </label>
                  <div className="min-h-[20px] mt-1">
                    {touched[field.name] && errors[field.name] && (
                      <span className="text-red-500 text-sm">
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <FormSelect
                label="Provincia"
                options={provinceOptions}
                value={formData.province}
                onChange={handleProvinceChange}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, province: true }));
                  setErrors((prev) => ({
                    ...prev,
                    province: validateProvince(formData.province),
                  }));
                }}
                placeholder="Seleccioná una provincia"
                isLoading={loadingProvinces}
                error={errors.province}
                touched={touched.province}
                noOptionsMessage="No se pudieron cargar las provincias"
              />

              <FormSelect
                label="Localidad"
                options={cityOptions}
                value={formData.city}
                onChange={handleCityChange}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, city: true }));
                  setErrors((prev) => ({
                    ...prev,
                    city: validateCity(formData.city),
                  }));
                }}
                placeholder={
                  formData.province
                    ? 'Seleccioná una localidad'
                    : 'Primero elegí una provincia'
                }
                isDisabled={!formData.province}
                isLoading={loadingCities}
                error={errors.city}
                touched={touched.city}
                noOptionsMessage={
                  formData.province
                    ? 'No hay localidades para esta provincia'
                    : 'Elegí una provincia primero'
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-custom-green3 hover:bg-custom-green4 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-custom-green4"
            >
              Confirmar y pagar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
