"use client";


export default function ContatoPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-4">Contato</h1>
        <p className="text-lg mb-8">Entre em contato conosco para mais informações.</p>
        <form className="w-full max-w-md">
            <input
            type="text"
            placeholder="Seu nome"
            className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded"
            />
            <input
            type="email"
            placeholder="Seu email"
            className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded"
            />
            <textarea
            placeholder="Sua mensagem"
            className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded"
            ></textarea>
            <button
            type="submit"
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
            Enviar
            </button>
        </form>
        </div>
    );
    }
