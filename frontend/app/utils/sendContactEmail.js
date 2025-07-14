"use client";
import emailjs from '@emailjs/browser';

const sendContactEmail = async (data,template_id) => {
  console.log(data);
  try {
    const emailParams = {
      to_email: process.env.NEXT_PUBLIC_EMAIL2_ADDRESS,
      from_email: process.env.NEXT_PUBLIC_EMAIL2_ADDRESS,
      name: data.name,  
      email: data.email,
      message: data.message,  
    };

    console.log(emailParams);

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL2_SERVICE_ID,   // Reemplázalo con tu Service ID de EmailJS2
      template_id,  // Reemplázalo con tu Template ID
      emailParams,
      process.env.NEXT_PUBLIC_EMAIL2_PUBLIC_KEY       // Reemplázalo con tu Public Key de EmailJS2
    );

    console.log('Correo de contacto enviado con éxito');
    return {status:'OK'}
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return {status:'ERROR'}
  }
};

module.exports = sendContactEmail