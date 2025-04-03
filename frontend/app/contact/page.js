'use client';

import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name', { required: true })} placeholder="Nombre" />
        {errors.name && <p>El nombre es obligatorio</p>}
        <input type="email" {...register('email', { required: true })} placeholder="Correo" />
        {errors.email && <p>El correo es obligatorio</p>}
        <textarea {...register('message', { required: true })} placeholder="Mensaje"></textarea>
        {errors.message && <p>El mensaje es obligatorio</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
