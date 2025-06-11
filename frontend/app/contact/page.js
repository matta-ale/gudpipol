'use client';

import { useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className='flex justify-center'>
      <div className='min-h-screen flex flex-col items-center justify-center px-6 py-6 mt-32 lg:mt-48 w-[700px]'>
        <div className='flex flex-col items-start pl-12 py-12 text-custom-green5 w-full text-lg bg-gray-100 rounded-2xl shadow-2xl '>
          <h1 className='text-4xl font-extrabold tracking-wide text-custom-green5 text-left'>
            Contacto
          </h1>
          <br />
          <div className='flex flex-col md:flex-row'>
            <div className='mr-8'>
              <a
                href='https://wa.me/5493415924709?text=Hola%2C%20quiero%20hacer%20una%20consulta%20sobre%20sus%20muebles'
                target='_blank'
                rel='noopener noreferrer'
              >
                <p className='flex items-center py-1'>
                  <FaWhatsapp />
                  <span className='pl-2'>+5493415924709</span>
                </p>
              </a>

              <a
                href='mailto:gudpipolecomuebles@gmail.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <p className='flex items-center py-1'>
                  <MdEmail />
                  <span className='pl-2'>gudpipolecomuebles@gmail.com</span>
                </p>
              </a>
            </div>
            <div>
              <a
                href='https://www.instagram.com/gudpipolok/#'
                target='_blank'
                rel='noopener noreferrer'
              >
                <p className='flex items-center py-1'>
                  <FaInstagram />
                  <span className='pl-2'>@gudpipolok</span>
                </p>
              </a>
              <a
                href='https://web.facebook.com/gudpipolok/?_rdc=1&_rdr#'
                target='_blank'
                rel='noopener noreferrer'
              >
                <p className='flex items-center py-1'>
                  <FaFacebook />
                  <span className='pl-2'>Gudpipol</span>
                </p>
              </a>
            </div>
          </div>
        </div>
        <div className='max-w-3xl w-full bg-gray-100 rounded-2xl shadow-2xl p-12 mt-8'>
          <h1 className='text-4xl font-extrabold tracking-wide text-custom-green5 mb-4 text-left'>
            Escribinos
          </h1>
          <h2 className='text-lg tracking-wide text-custom-green5 mb-4 text-left'>
            Envianos un mensaje y responderemos a la brevedad
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            {/* Nombre */}
            <div className='relative'>
              <input
                id='name'
                type='text'
                {...register('name', { required: true })}
                placeholder=' '
                className={`peer block w-full rounded-lg bg-gray-100 border ${
                  errors.name ? 'border-red-500' : 'border-custom-green3'
                } text-custom-green5 px-4 pt-8 pb-2 focus:outline-none focus:ring-2 focus:ring-custom-green4 transition`}
              />
              <label
                htmlFor='name'
                className='absolute left-4 top-2 text-custom-green4 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-custom-green3 peer-focus:top-2 peer-focus:text-custom-green5 peer-focus:text-sm select-none mb-2'
              >
                Nombre
              </label>
              {errors.name && (
                <p className='mt-4 text-red-500 text-sm'>
                  El nombre es obligatorio
                </p>
              )}
            </div>

            {/* Correo */}
            <div className='relative'>
              <input
                id='email'
                type='email'
                {...register('email', { required: true })}
                placeholder=' '
                className={`peer block w-full rounded-lg bg-gray-100 border ${
                  errors.email ? 'border-red-500' : 'border-custom-green3'
                } text-custom-green5 px-4 pt-8 pb-2 focus:outline-none focus:ring-2 focus:ring-custom-green4 transition`}
              />
              <label
                htmlFor='email'
                className='absolute left-4 top-2 text-custom-green4 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-custom-green3 peer-focus:top-2 peer-focus:text-custom-green5 peer-focus:text-sm select-none mb-2'
              >
                Correo
              </label>
              {errors.email && (
                <p className='mt-4 text-red-500 text-sm'>
                  El correo es obligatorio
                </p>
              )}
            </div>

            {/* Mensaje */}
            <div className='relative'>
              <textarea
                id='message'
                rows='5'
                {...register('message', { required: true })}
                placeholder=' '
                className={`peer block w-full rounded-lg bg-gray-100 border ${
                  errors.message ? 'border-red-500' : 'border-custom-green3'
                } text-custom-green5 px-4 pt-8 pb-2 resize-none focus:outline-none focus:ring-2 focus:ring-custom-green4 transition`}
              />
              <label
                htmlFor='message'
                className='absolute left-4 top-2 text-custom-green4 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-custom-green3 peer-focus:top-2 peer-focus:text-custom-green5 peer-focus:text-sm select-none mb-2'
              >
                Mensaje
              </label>
              {errors.message && (
                <p className='mt-4 text-red-500 text-sm'>
                  El mensaje es obligatorio
                </p>
              )}
            </div>

            <button
              type='submit'
              className='w-full py-4 bg-custom-green3 hover:bg-custom-green4 focus:ring-4 focus:ring-custom-green4 rounded-lg text-white font-semibold text-lg transition shadow-lg'
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
