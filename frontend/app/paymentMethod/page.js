'use client';
import { useState } from 'react';

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  return (
    <main
      className="w-[95%] md:w-[800px] mx-auto mt-24 md:mt-44 py-6 rounded-lg"
      style={{ backgroundColor: 'rgba(45, 46, 50, 0.75)' }}
    >
      <h1 className="text-white text-2xl mx-4 md:mx-7 mb-6 font-bold">
        Método de pago
      </h1>
      <form className="space-y-4 mx-4 md:mx-6">
        <div className="flex flex-col gap-4">
          {/* Opción 1: Transferencia bancaria */}
          <label
            className={`block text-white font-bold p-4 rounded-md ${
              selectedMethod === 'transfer' ? 'bg-gray-700' : 'bg-gray-800'
            } cursor-pointer`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="transfer"
              checked={selectedMethod === 'transfer'}
              onChange={() => handleMethodChange('transfer')}
              className="mr-2"
            />
            Pago por transferencia bancaria
          </label>
          {selectedMethod === 'transfer' && (
            <div className="text-white p-4 rounded-md bg-gray-700">
              <p>
                Siga los pasos a continuación para completar el pago:
              </p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Realice una transferencia bancaria al siguiente CBU: <strong>1234567890123456789012</strong></li>
                <li>
                  Envíe el comprobante al siguiente número de WhatsApp:{' '}
                  <a
                    href="https://wa.me/1234567890"
                    className="text-yellow-400 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    1234567890
                  </a>
                </li>
              </ol>
            </div>
          )}

          {/* Opción 2: Pago en cuotas */}
          <label
            className={`block text-white font-bold p-4 rounded-md ${
              selectedMethod === 'installments' ? 'bg-gray-700' : 'bg-gray-800'
            } cursor-pointer`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="installments"
              checked={selectedMethod === 'installments'}
              onChange={() => handleMethodChange('installments')}
              className="mr-2"
            />
            Pago en 6 cuotas de $10,000
          </label>
          {selectedMethod === 'installments' && (
            <div className="text-white p-4 rounded-md bg-gray-700">
              <p>
                Puede proceder al pago en cuotas seleccionando el botón a
                continuación.
              </p>
              <button
                className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg mt-4"
                onClick={() => alert('Redirigiendo al pago en cuotas...')}
              >
                Proceder al pago en cuotas
              </button>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
