import React from "react";

export function Characters ({ item, handleCharacter }: any){
  function reduzirString(texto: string, tamanhoMaximo: number): string {
    if (texto.length > tamanhoMaximo) {
      texto = texto.substring(0, tamanhoMaximo);
  
      texto += "...";
    }
  
    return texto;
  }
  return (
    <div className="w-100 h-56 overflow-hidden bg-slate-700 border-transparent border-1 rounded-lg flex flex-row" onClick={handleCharacter}>
      <img src={item.image} alt="" className="w-2/4 md:w-1/4rounded-tl-md rounded-bl-lg" />
      <div className="p-5 flex flex-col w-2/4">
        <p className="font-bold sm:text-md xl:text-lg">{reduzirString(item.name, 16)}</p>
        <div className="flex items-center">
          <span className="status-indicator bg-red-500 rounded-full h-2 w-2 mr-2 mt-2"></span>
          <p className="text-md">{item.status} - {item.species}</p>
        </div>
        <p className="font-bold sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-500 pt-4">Last known location:</p>
        <p className="font-bold sm:text-xs md:text-sm lg:text-base xl:text-lg">{reduzirString(item.location.name,16)}</p>
        <p className="font-bold sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-500 pt-4">Firt seen in:</p>
        <p className="font-bold sm:text-xs md:text-sm lg:text-base xl:text-lg">{reduzirString(item.origin.name,16)}</p>
      </div>
    </div>
  )

}