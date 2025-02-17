"use client";
import React from "react";

interface ButtonLostAndFoundProps {
  filter: string; // Filtro actual
  setFilter: (filter: string) => void; // Función para actualizar el filtro
}

const ButtonLostAndFound: React.FC<ButtonLostAndFoundProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className="flex justify-center gap-4 mb-6 mt-8">
      <button
        className={`px-4 py-2 rounded ${
          filter === "perdido"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => setFilter("perdido")}
      >
        Perdidos
      </button>

      <button
        className={`px-4 py-2 rounded ${
          filter === "encontrado"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => setFilter("encontrado")}
      >
        Encontrados
      </button>

      <button
        className={`px-4 py-2 rounded ${
          filter === "todos"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => setFilter("todos")}
      >
        Todos
      </button>
    </div>
  );
};

export default ButtonLostAndFound;

{
  /*'use client';

import React from 'react';

const ButtonLostAndFound: React.FC = () => {
  return (
    <button className="px-6 py-3 rounded-lg text-white text-sm  bg-green500 hover:bg-teal-950 shadow-md">
      Mascotas Perdidas y Encontradas
    </button>
  );
};

export default ButtonLostAndFound;*/
}

{
  /*  
    'use client'
import React, { useState } from 'react'

const ButtonLostAndFound = () => {
    const [filter, setFilter] = useState("all"); // Estado para manejar el filtro
    return (
        <div>
            {/* Botones de filtro */
}
{
  /*
            <div className="flex justify-center gap-4 mb-6 mt-8">

                <button className={`px-4 py-2 rounded ${filter === "lost" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
                    }`} onClick={() => setFilter("lost")}>Perdidos </button>

                <button
                    className={`px-4 py-2 rounded ${filter === "found" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => setFilter("found")} > Encontrados </button>

                <button
                    className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => setFilter("all")}>Todos</button>
            </div>
        </div>
   )
}

                export default ButtonLostAndFound  */
}
