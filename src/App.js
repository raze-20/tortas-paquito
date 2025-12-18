import React, { useState } from 'react';
import { Search, Clock } from 'lucide-react';

// --- DATA DEL MENÚ (Extraída de las imágenes) ---
const menuData = [
  {
    category: "La Monstruosa",
    price: 180,
    items: [
      { name: "CUBANA", ingredients: "Un poco de todo. ¡Para los valientes!" }
    ]
  },
  {
    category: "Premium",
    price: 100,
    items: [
      { name: "Grillo-Torta", ingredients: "Pollo, bistec, pierna, quesillo, piña, jamón" },
      { name: "Mamona", ingredients: "Milanesa, chuleta, tocino, quesillo, manchego" }
    ]
  },
  {
    category: "Especiales del Chef",
    price: 85,
    items: [
      { name: "Pepi-torta", ingredients: "Milanesa, pierna, salchicha, quesillo, piña" },
      { name: "Popeye", ingredients: "Milanesa, pierna, quesillo, queso amarillo, queso blanco, piña" },
      { name: "Mamá-lucha", ingredients: "Milanesa, pierna, salchicha, queso amarillo, queso blanco" },
      { name: "Macarena", ingredients: "Chuleta, quesillo, queso amarillo, queso blanco, jamón, piña" },
      { name: "Rebelde", ingredients: "Pierna, jamón, quesillo, queso amarillo, piña" },
      { name: "Jenny", ingredients: "Milanesa, pierna, chuleta, queso amarillo, queso blanco" },
      { name: "Peligrosa", ingredients: "Pierna, chorizo, huevo, chuleta, quesillo" },
      { name: "Llanera", ingredients: "Pierna, salchicha, huevo, quesillo, queso amarillo" },
      { name: "Gabacha", ingredients: "Milanesa, pierna, huevo, queso blanco, queso amarillo" },
      { name: "Norteña", ingredients: "Salchicha, chorizo, pierna, manchego, piña" },
      { name: "Desnutrida", ingredients: "Milanesa, huevo, salchicha, queso blanco, quesillo" },
      { name: "Vikinga", ingredients: "Milanesa, huevo, chorizo, salchicha, queso blanco" }
    ]
  },
  {
    category: "Selección Paquito",
    price: 80,
    items: [
      { name: "Vaquera", ingredients: "Milanesa, pierna, quesillo, piña" },
      { name: "Mentirosa", ingredients: "Bistec, chuleta, queso manchego" },
      { name: "Thalia", ingredients: "Milanesa, chorizo, jamón, quesillo" },
      { name: "Poli", ingredients: "Milanesa, chuleta, jamón, quesillo" },
      { name: "Madona", ingredients: "Bistec, queso blanco, queso manchego" },
      { name: "Popular", ingredients: "Milanesa, pierna, jamón, queso blanco" },
      { name: "Coqueta", ingredients: "Milanesa, huevo, quesillo, piña" },
      { name: "Melissa", ingredients: "Bistec, piña, queso manchego" },
      { name: "Paqui-torta", ingredients: "Milanesa, chuleta, quesillo, piña" },
      { name: "Peri-torta", ingredients: "Milanesa, huevo, jamón, queso blanco" },
      { name: "Tampiqueña", ingredients: "Milanesa, salchicha, quesillo, piña" },
      { name: "Provinciana", ingredients: "Salchicha, pierna, chorizo, huevo" },
      { name: "Sabrina", ingredients: "Pollo, milanesa, quesillo" },
      { name: "Paulina", ingredients: "Pollo, pierna, quesillo" },
      { name: "Victoria", ingredients: "Bistec, chorizo, queso manchego" },
      { name: "Galilea", ingredients: "Pollo, jamón, quesillo" },
      { name: "Tesorito", ingredients: "Pollo, chorizo, quesillo" },
      { name: "Reina", ingredients: "Pollo, quesillo, queso manchego" },
      { name: "Chicharito", ingredients: "Pollo, piña, quesillo" },
      { name: "Bodoquito", ingredients: "Pollo, huevo, quesillo" },
      { name: "Farsante", ingredients: "Milanesa, tocino, quesillo" },
      { name: "Trepadora", ingredients: "Salchicha, tocino, quesillo" },
      { name: "Pandemia", ingredients: "Huevo, tocino, quesillo" },
      { name: "Inolvidable", ingredients: "Pierna, tocino, quesillo" },
      { name: "Cuarentena", ingredients: "Jamón, tocino, quesillo" }
    ]
  },
  {
    category: "Clásicas con Estilo",
    price: 78,
    items: [
      { name: "Pollo/Bistec/Pastor con Quesillo", ingredients: "La clásica mejorada" },
      { name: "Abusadora", ingredients: "Milanesa, chorizo, quesillo" },
      { name: "Caricia", ingredients: "Milanesa, pierna, quesillo" },
      { name: "Costeña", ingredients: "Salchicha, huevo, queso manchego" },
      { name: "Bety", ingredients: "Milanesa, quesillo, piña" },
      { name: "Kuki", ingredients: "Milanesa, salchicha, quesillo" },
      { name: "Koty", ingredients: "Pierna, quesillo, piña" },
      { name: "Yury", ingredients: "Milanesa, chuleta, quesillo" },
      { name: "Lucero", ingredients: "Milanesa, pierna, salchicha" },
      { name: "Paloma", ingredients: "Chuleta, jamón, quesillo" },
      { name: "Divina", ingredients: "Milanesa, huevo, queso blanco" },
      { name: "Gaviota", ingredients: "Milanesa, chuleta, pierna" },
      { name: "Hawaiana", ingredients: "Jamón, quesillo, piña" },
      { name: "Suiza", ingredients: "Quesillo, queso amarillo, queso blanco" },
      { name: "Omelet", ingredients: "Huevo, quesillo, queso amarillo" },
      { name: "Rubi", ingredients: "Pierna, quesillo, queso amarillo" },
      { name: "Mistica", ingredients: "Salchicha, quesillo, piña" },
      { name: "Modelo", ingredients: "Milanesa, pierna, queso manchego" },
      { name: "Mimosa", ingredients: "Pierna, chorizo, quesillo" },
      { name: "Marisela", ingredients: "Milanesa, huevo, queso manchego" },
      { name: "Soñadora", ingredients: "Pierna, huevo, queso manchego" },
      { name: "Toluqueña", ingredients: "Chorizo, huevo, quesillo" },
      { name: "Tremenda", ingredients: "Milanesa, jamón, queso manchego" },
      { name: "Valentina", ingredients: "Chuleta, quesillo, queso manchego" },
      { name: "Tapatia", ingredients: "Salchicha, pierna, quesillo" },
      { name: "Traviesa", ingredients: "Pierna, huevo, salchicha" }
    ]
  },
  {
    category: "Tradicionales",
    price: 75,
    items: [
      { name: "Pollo / Bistec / Pastor", ingredients: "Sencilla pero deliciosa" },
      { name: "Combinada", ingredients: "2 Ingredientes al gusto" }
    ]
  },
  {
    category: "Sencillas",
    price: 70,
    items: [
      { name: "Ingrediente Único", ingredients: "Milanesa, Pierna, Chuleta, Chorizo, queso blanco, Salchicha, Huevo, queso amarillo o Jamón" }
    ]
  },
  {
    category: "Bebidas y Extras",
    price: null,
    items: [
      { name: "Coca Cola", ingredients: "", price: 25 },
      { name: "Jarritos", ingredients: "", price: 20 },
      { name: "Ingrediente Extra", ingredients: "", price: 15 }
    ]
  }
];

const MenuApp = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenu = menuData.map(category => {
    const filteredItems = category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...category, items: filteredItems };
  }).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-gray-800 pb-10">
      {/* Header */}
      <header className="bg-orange-600 text-white p-6 shadow-lg rounded-b-3xl sticky top-0 z-10">
        <h1 className="text-3xl font-extrabold text-center tracking-tight">Super Tortas Paquito</h1>
        <p className="text-center text-orange-100 text-sm mt-1">¡Gracias por su preferencia!</p>
        
        {/* Search Bar */}
        <div className="mt-4 relative">
          <input 
            type="text" 
            placeholder="¿De qué tienes antojo hoy?" 
            className="w-full p-3 pl-10 rounded-full text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        </div>
      </header>

      {/* Info Banner */}
      <div className="flex justify-center gap-4 text-xs font-semibold text-gray-600 my-4 px-4">
        <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-orange-600"/> 9:00 AM - 10:30 PM</div>
      </div>

      {/* Menu List */}
      <div className="px-4 max-w-2xl mx-auto space-y-6">
        {filteredMenu.map((category, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border-l-4 border-orange-500">
            <div className="bg-gray-100 p-3 flex justify-between items-center border-b border-gray-200">
              <h2 className="font-bold text-xl text-orange-700">{category.category}</h2>
              {category.price && <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">${category.price}</span>}
            </div>
            
            <div className="divide-y divide-gray-100">
              {category.items.map((item, i) => (
                <div key={i} className="p-4 hover:bg-orange-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.ingredients}</p>
                    </div>
                    {item.price && <span className="text-orange-600 font-bold ml-2">${item.price}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredMenu.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <p>No encontramos esa torta :(</p>
            <p className="text-sm">Intenta buscar por ingrediente (ej. "piña")</p>
          </div>
        )}
      </div>

       {/* Footer */}
       <footer className="mt-10 text-center text-gray-400 text-xs">
         <p>Diseño Digital para Super Tortas Paquito</p>
       </footer>
    </div>
  );
};

export default MenuApp;