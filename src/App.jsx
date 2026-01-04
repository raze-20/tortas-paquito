import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, ShoppingBag, Plus, Minus, Trash2, X, Copy, CreditCard, Banknote } from 'lucide-react';

// --- CONFIGURACIÓN ---
const NUMERO_WHATSAPP = "5215667684677"; 
const DATOS_BANCARIOS = {
  banco: "SPIN by OXXO",
  cuenta: "4217 4701 6225 0100",
  clabe: "72 8969 0001 2896 5568",
  nombre: "Oscar Lucio Bautista"
};

// --- EXTRAS Y PREFERENCIAS ---
const EXTRA_PRICE = 15;
const TOP_EXTRAS = [
  "Quesillo", "Piña", "Huevo", "Salchicha", "Jamón", "Tocino", "Milanesa", "Pierna"
];

const COMMON_PREFERENCES = [
  "Sin Cebolla", "Sin Jitomate", "Sin Aguacate", 
  "Sin Mayonesa", "Sin Frijoles", "Bien Dorada", "Poco Dorada"
];

const SPICY_OPTIONS = [
  "Sin Chile", "Rajas", "Chipotle", 
  "Rajas Aparte", "Chipotle Aparte"
];

const BASE_INGREDIENTS = [
  "Milanesa", "Pierna", "Chuleta", "Chorizo", "Queso Blanco", 
  "Salchicha", "Huevo", "Queso Amarillo", "Jamón", "Quesillo"
];

// --- DATA DEL MENÚ ---
const menuData = [
  {
    category: "La Monstruosa",
    price: 180,
    items: [{ name: "CUBANA", ingredients: "Un poco de todo. ¡Para los valientes!" }]
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
      { name: "Popeye", ingredients: "Milanesa, pierna, quesillo, q.amarillo, q.blanco, piña" },
      { name: "Mamá-lucha", ingredients: "Milanesa, pierna, salchicha, q.amarillo, q.blanco" },
      { name: "Macarena", ingredients: "Chuleta, quesillo, q.amarillo, q.blanco, jamón, piña" },
      { name: "Rebelde", ingredients: "Pierna, jamón, quesillo, q.amarillo, piña" },
      { name: "Jenny", ingredients: "Milanesa, pierna, chuleta, q.amarillo, q.blanco" },
      { name: "Peligrosa", ingredients: "Pierna, chorizo, huevo, chuleta, quesillo" },
      { name: "Llanera", ingredients: "Pierna, salchicha, huevo, quesillo, q.amarillo" },
      { name: "Gabacha", ingredients: "Milanesa, pierna, huevo, q.blanco, q.amarillo" },
      { name: "Norteña", ingredients: "Salchicha, chorizo, pierna, manchego, piña" },
      { name: "Desnutrida", ingredients: "Milanesa, huevo, salchicha, q.blanco, quesillo" },
      { name: "Vikinga", ingredients: "Milanesa, huevo, chorizo, salchicha, q.blanco" }
    ]
  },
  {
    category: "Selección Paquito",
    price: 80,
    items: [
      { name: "Vaquera", ingredients: "Milanesa, pierna, quesillo, piña" },
      { name: "Mentirosa", ingredients: "Bistec, chuleta, q.manchego" },
      { name: "Thalia", ingredients: "Milanesa, chorizo, jamón, quesillo" },
      { name: "Poli", ingredients: "Milanesa, chuleta, jamón, quesillo" },
      { name: "Madona", ingredients: "Bistec, q.blanco, q.manchego" },
      { name: "Popular", ingredients: "Milanesa, pierna, jamón, q.blanco" },
      { name: "Coqueta", ingredients: "Milanesa, huevo, quesillo, piña" },
      { name: "Melissa", ingredients: "Bistec, piña, q.manchego" },
      { name: "Paqui-torta", ingredients: "Milanesa, chuleta, quesillo, piña" },
      { name: "Peri-torta", ingredients: "Milanesa, huevo, jamón, q.blanco" },
      { name: "Tampiqueña", ingredients: "Milanesa, salchicha, quesillo, piña" },
      { name: "Provinciana", ingredients: "Salchicha, pierna, chorizo, huevo" },
      { name: "Sabrina", ingredients: "Pollo, milanesa, quesillo" },
      { name: "Paulina", ingredients: "Pollo, pierna, quesillo" },
      { name: "Victoria", ingredients: "Bistec, chorizo, q.manchego" },
      { name: "Galilea", ingredients: "Pollo, jamón, quesillo" },
      { name: "Tesorito", ingredients: "Pollo, chorizo, quesillo" },
      { name: "Reina", ingredients: "Pollo, quesillo, q.manchego" },
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
    category: "Clásicas con Estilo (Con Quesillo)",
    price: 78,
    items: [
      { name: "Pollo con Quesillo", ingredients: "La clásica mejorada" },
      { name: "Bistec con Quesillo", ingredients: "La clásica mejorada" },
      { name: "Pastor con Quesillo", ingredients: "La clásica mejorada" },
      { name: "Abusadora", ingredients: "Milanesa, chorizo, quesillo" },
      { name: "Caricia", ingredients: "Milanesa, pierna, quesillo" },
      { name: "Costeña", ingredients: "Salchicha, huevo, q.manchego" },
      { name: "Bety", ingredients: "Milanesa, quesillo, piña" },
      { name: "Kuki", ingredients: "Milanesa, salchicha, quesillo" },
      { name: "Koty", ingredients: "Pierna, quesillo, piña" },
      { name: "Yury", ingredients: "Milanesa, chuleta, quesillo" },
      { name: "Lucero", ingredients: "Milanesa, pierna, salchicha" },
      { name: "Paloma", ingredients: "Chuleta, jamón, quesillo" },
      { name: "Divina", ingredients: "Milanesa, huevo, q.blanco" },
      { name: "Gaviota", ingredients: "Milanesa, chuleta, pierna" },
      { name: "Hawaiana", ingredients: "Jamón, quesillo, piña" },
      { name: "Suiza", ingredients: "Quesillo, q.amarillo, q.blanco" },
      { name: "Omelet", ingredients: "Huevo, quesillo, q.amarillo" },
      { name: "Rubi", ingredients: "Pierna, quesillo, q.amarillo" },
      { name: "Mistica", ingredients: "Salchicha, quesillo, piña" },
      { name: "Modelo", ingredients: "Milanesa, pierna, q.manchego" },
      { name: "Mimosa", ingredients: "Pierna, chorizo, quesillo" },
      { name: "Marisela", ingredients: "Milanesa, huevo, q.manchego" },
      { name: "Soñadora", ingredients: "Pierna, huevo, q.manchego" },
      { name: "Toluqueña", ingredients: "Chorizo, huevo, quesillo" },
      { name: "Tremenda", ingredients: "Milanesa, jamón, q.manchego" },
      { name: "Valentina", ingredients: "Chuleta, quesillo, q.manchego" },
      { name: "Tapatia", ingredients: "Salchicha, pierna, quesillo" },
      { name: "Traviesa", ingredients: "Pierna, huevo, salchicha" }
    ]
  },
  {
    category: "Especiales 3 Carnes",
    price: null,
    items: [
      { name: "Las Tres Carnes", ingredients: "Pollo, Bistec y Pastor", price: 90 },
      { name: "Las Tres Carnes con Quesillo", ingredients: "Pollo, Bistec, Pastor y Quesillo", price: 95 }
    ]
  },
  {
    category: "Tradicionales",
    price: 75,
    items: [
      { name: "Torta de Pollo", ingredients: "Sencilla pero deliciosa" },
      { name: "Torta de Bistec", ingredients: "Sencilla pero deliciosa" },
      { name: "Torta de Pastor", ingredients: "Sencilla pero deliciosa" }
    ]
  },
  {
    category: "Combinadas (2 Ingredientes)",
    price: 75,
    items: [
      { name: "Arma tu Combinada", ingredients: "Elige 2 ingredientes base a tu gusto.", isCombo: true }
    ]
  },
  {
    category: "Sencillas",
    price: 70,
    items: [
      { name: "Milanesa Sola", ingredients: "Solo ingrediente principal" },
      { name: "Pierna Sola", ingredients: "Solo ingrediente principal" },
      { name: "Chuleta Sola", ingredients: "Solo ingrediente principal" },
      { name: "Chorizo Solo", ingredients: "Solo ingrediente principal" },
      { name: "Queso Blanco", ingredients: "Solo ingrediente principal" },
      { name: "Salchicha Sola", ingredients: "Solo ingrediente principal" },
      { name: "Huevo Solo", ingredients: "Solo ingrediente principal" },
      { name: "Queso Amarillo", ingredients: "Solo ingrediente principal" },
      { name: "Jamón Solo", ingredients: "Solo ingrediente principal" }
    ]
  }
];

const DRINKS_MENU = [
  { name: "Coca Cola", price: 25 },
  { name: "Jarritos", price: 20 },
];

const MenuApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Estados para Personalización Standard
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]); 
  const [itemNotes, setItemNotes] = useState("");

  // Estados para Selección de Combinada (Paso 1)
  const [showComboModal, setShowComboModal] = useState(false);
  const [comboSelection, setComboSelection] = useState([]);
  const [tempComboItem, setTempComboItem] = useState(null);
  
  const [orderType, setOrderType] = useState('pickup');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Paso 1: Abrir selector de ingredientes base
  const handleOpenCombo = (item) => {
    setTempComboItem(item);
    setComboSelection([]);
    setShowComboModal(true);
  };

  const toggleComboSelection = (ing) => {
    setComboSelection(prev => {
      if (prev.includes(ing)) return prev.filter(i => i !== ing);
      if (prev.length < 2) return [...prev, ing];
      return prev; // Ya tiene 2, no hace nada
    });
  };

  const confirmComboSelection = () => {
    if (comboSelection.length !== 2) return;
    
    const newItemName = `Combinada: ${comboSelection[0]} + ${comboSelection[1]}`;
    // Cerramos modal de combo y abrimos el de personalización normal
    setShowComboModal(false);
    handleOpenCustomization({ ...tempComboItem, name: newItemName }, tempComboItem.price || 75);
  };

  // Paso 2: Personalización Standard (Extras/Notas)
  const handleOpenCustomization = (item, basePrice) => {
    setCustomizingItem({ ...item, basePrice });
    setSelectedExtras([]);
    setItemNotes("");
  };

  const toggleExtra = (extra) => {
    setSelectedExtras(prev => {
      if (prev.includes(extra)) {
        return prev.filter(e => e !== extra);
      } else {
        return [...prev, extra];
      }
    });
  };

  const togglePreference = (pref) => {
    const currentNotes = itemNotes.split(', ').filter(n => n.trim() !== '');
    if (currentNotes.includes(pref)) {
      setItemNotes(currentNotes.filter(n => n !== pref).join(', '));
    } else {
      setItemNotes([...currentNotes, pref].join(', '));
    }
  };

  const handleConfirmAddItem = () => {
    if (!customizingItem) return;

    // Calcular costo total de extras
    const extrasTotalCost = selectedExtras.length * EXTRA_PRICE;
    const finalPrice = customizingItem.basePrice + extrasTotalCost;
    
    // Crear lista de objetos para los extras seleccionados
    const extrasList = selectedExtras.map(extra => ({ name: extra, price: EXTRA_PRICE }));

    const newItem = {
      cartId: Date.now() + Math.random(),
      name: customizingItem.name,
      basePrice: customizingItem.basePrice,
      price: finalPrice,
      extras: extrasList,
      notes: itemNotes,
      qty: 1
    };

    setCart(prev => [...prev, newItem]);
    setCustomizingItem(null);
  };

  const addDrinkToCart = (drink) => {
    const newItem = {
      cartId: Date.now() + Math.random(),
      name: drink.name,
      basePrice: drink.price,
      price: drink.price,
      extras: [],
      notes: "",
      qty: 1
    };
    setCart(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  };

  const updateQty = (cartId, change) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.qty + change;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Dato copiado al portapapeles");
  };

  const handleGetLocation = () => {
    if (!("geolocation" in navigator)) {
      alert("La geolocalización no está soportada en este navegador.");
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setAddress((prev) => {
          // Si ya hay texto, agregamos el link al final separado por un espacio
          const separator = prev && prev.trim() !== "" ? " " : "";
          // Evitar duplicar el link si ya está
          if (prev.includes(mapsLink)) return prev;
          return `${prev}${separator}${mapsLink}`;
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("Error obtaining location", error);
        setIsLoadingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Permiso denegado. Por favor habilita la ubicación en tu navegador para usar esta función.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("La información de ubicación no está disponible.");
            break;
          case error.TIMEOUT:
            alert("Se agotó el tiempo de espera para obtener la ubicación.");
            break;
          default:
            alert("Ocurrió un error desconocido al obtener la ubicación.");
            break;
        }
      },
      {
        enableHighAccuracy: true, // Intenta usar GPS para mayor precisión
        timeout: 10000,           // 10 segundos de timeout
        maximumAge: 0             // No usar caché vieja
      }
    );
  };

  const handleSendOrder = () => {
    if (cart.length === 0) return;
    if (orderType === 'delivery' && !address) {
      alert("Por favor ingresa tu dirección.");
      return;
    }

    let message = `Hola *Super Tortas Paquito*! \nQuiero realizar el siguiente pedido:\n\n`;
    
    cart.forEach(item => {
      message += `• ${item.qty}x ${item.name} ($${item.price * item.qty})\n`;
      if (item.extras && item.extras.length > 0) {
        item.extras.forEach(ex => message += `   + ${ex.name} ($${ex.price})\n`);
      }
      if (item.notes) {
        message += `    Nota: ${item.notes}\n`;
      }
    });

    message += `\n *Total: $${cartTotal}*\n`;
    message += `----------------------------\n`;
    message += ` *Tipo de entrega:* ${orderType === 'pickup' ? 'Pasar a Recoger' : 'A Domicilio'}\n`;
    if (orderType === 'delivery') message += ` *Ubicación:* ${address}\n`;
    message += ` *Método de Pago:* ${paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia'}\n`;
    if (paymentMethod === 'transfer') message += `(Envío comprobante de pago)\n`;

    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredMenu = menuData.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-gray-800 relative">
      
      <header className="bg-orange-600 text-white p-6 shadow-lg rounded-b-3xl sticky top-0 z-10">
        <h1 className="text-3xl font-extrabold text-center tracking-tight">Super Tortas Paquito</h1>
        <div className="mt-4 relative">
          <input 
            type="text" 
            placeholder="¿De qué tienes antojo hoy?" 
            className="w-full p-3 pl-10 rounded-full text-gray-800 shadow-inner focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        </div>
      </header>

      <div className="flex justify-center gap-4 text-xs font-semibold text-gray-600 my-4 px-4">
        <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-orange-600"/> 9:00 AM - 10:30 PM</div>
      </div>

      <div className="px-4 max-w-2xl mx-auto space-y-6">
        {filteredMenu.map((category, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border-l-4 border-orange-500">
            <div className="bg-gray-100 p-3 flex justify-between items-center border-b border-gray-200">
              <h2 className="font-bold text-xl text-orange-700">{category.category}</h2>
              {category.price && <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">${category.price}</span>}
            </div>
            <div className="divide-y divide-gray-100">
              {category.items.map((item, i) => (
                <div key={i} className="p-4 flex justify-between items-center">
                  <div className="flex-1 pr-2">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.ingredients}</p>
                    {item.price && <span className="text-orange-600 font-bold text-sm block mt-1">${item.price}</span>}
                  </div>
                  <button 
                    onClick={() => item.isCombo ? handleOpenCombo(item) : handleOpenCustomization(item, item.price || category.price)} 
                    className="bg-yellow-400 p-2 rounded-full shadow-sm active:scale-95 transition-transform"
                  >
                    <Plus className="w-5 h-5 text-orange-900" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL PASO 1: SELECCIÓN DE COMBINADA */}
      {showComboModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
              <h3 className="text-lg font-bold">Elige 2 Ingredientes</h3>
              <button onClick={() => setShowComboModal(false)} className="hover:bg-orange-700 p-1 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="p-4 overflow-y-auto">
              <p className="text-sm text-gray-500 mb-4 text-center">Selecciona la base de tu torta ({comboSelection.length}/2)</p>
              <div className="grid grid-cols-2 gap-3">
                {BASE_INGREDIENTS.map((ing, idx) => {
                  const isSelected = comboSelection.includes(ing);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleComboSelection(ing)}
                      disabled={!isSelected && comboSelection.length >= 2}
                      className={`p-3 rounded-xl border text-sm font-bold transition-all ${isSelected 
                          ? 'border-orange-500 bg-orange-100 text-orange-800 ring-2 ring-orange-500' 
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40'}`}
                    >
                      {ing}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={confirmComboSelection}
                disabled={comboSelection.length !== 2}
                className={`w-full font-bold py-3 rounded-xl shadow-lg flex justify-center items-center text-lg transition-all ${comboSelection.length === 2 
                    ? 'bg-orange-600 text-white hover:bg-orange-700 active:scale-95' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Continuar a Extras
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE PERSONALIZACIÓN (PASO 2) */}
      {customizingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-orange-50 p-4 border-b border-orange-100 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-orange-800">{customizingItem.name}</h3>
                <p className="text-orange-600 font-bold text-lg">${customizingItem.basePrice}</p>
              </div>
              <button onClick={() => setCustomizingItem(null)} className="text-gray-400 p-1"><X className="w-6 h-6" /></button>
            </div>

            <div className="p-4 overflow-y-auto space-y-5 text-center">
              <div>
                <h4 className="font-bold text-gray-700 mb-2 text-sm">Agregar Extras (+$15 c/u)</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {TOP_EXTRAS.map((extra, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => toggleExtra(extra)} 
                      className={`px-3 py-1 rounded-full text-xs border transition-all ${selectedExtras.includes(extra) ? 'bg-green-50 border-green-500 text-green-700 font-bold' : 'border-gray-200 text-gray-600'}`}
                    >
                      {extra}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-700 mb-2 text-sm">Picante</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {SPICY_OPTIONS.map((opt, idx) => (
                    <button key={idx} onClick={() => togglePreference(opt)} className={`px-3 py-1 rounded-full text-xs border transition-all ${itemNotes.includes(opt) ? 'bg-red-50 border-red-400 text-red-700 font-bold' : 'border-gray-200 text-gray-600'}`}>{opt}</button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-700 mb-2 text-sm">Preferencias</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {COMMON_PREFERENCES.map((pref, idx) => (
                    <button key={idx} onClick={() => togglePreference(pref)} className={`px-3 py-1 rounded-full text-xs border transition-all ${itemNotes.includes(pref) ? 'bg-red-50 border-red-400 text-red-700 font-bold' : 'border-gray-200 text-gray-600'}`}>{pref}</button>
                  ))}
                </div>
              </div>

              <div>
                <textarea value={itemNotes} onChange={(e) => setItemNotes(e.target.value)} placeholder="Ej. Sin catsup, partir a la mitad..." className="w-full border border-gray-300 rounded-lg p-3 text-sm h-20 resize-none" />
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button onClick={handleConfirmAddItem} className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg flex justify-between px-6 items-center active:scale-95 transition-transform">
                <span>Agregar al Pedido</span>
                <span className="text-xl">${customizingItem.basePrice + (selectedExtras.length * EXTRA_PRICE)}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-6 w-full px-4 z-20 flex justify-center">
          <button onClick={() => setIsCartOpen(true)} className="bg-orange-700 text-white flex items-center justify-between w-full max-w-md p-4 rounded-full shadow-2xl animate-bounce-slow">
            <div className="flex items-center gap-2">
              <div className="bg-white text-orange-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">{cart.reduce((acc, i) => acc + i.qty, 0)}</div>
              <span className="font-bold">Ver Pedido</span>
            </div>
            <span className="font-bold text-lg">${cartTotal}</span>
          </button>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md max-h-[90vh] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingBag /> Tu Pedido</h2>
              <button onClick={() => setIsCartOpen(false)}><X className="w-6 h-6" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                      {item.extras.map((ex, i) => <span key={i} className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold mr-1">+ {ex.name}</span>)}
                      {item.notes && <p className="text-[10px] text-red-500 mt-1 italic leading-tight">"{item.notes}"</p>}
                      <p className="text-orange-600 font-bold text-sm mt-1">${item.price * item.qty}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg shadow-sm">
                        <button onClick={() => updateQty(item.cartId, -1)} className="text-orange-600"><Minus className="w-4 h-4"/></button>
                        <span className="font-bold text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.cartId, 1)} className="text-green-600"><Plus className="w-4 h-4"/></button>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-red-400 p-1"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <>
                  <hr className="border-gray-200" />
                  
                  {/* Sección de Bebidas */}
                  <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                    <h3 className="font-bold text-orange-800 text-sm mb-2 flex items-center gap-2">
                      🥤 ¿Agregar Bebida?
                    </h3>
                    <div className="flex gap-2">
                      {DRINKS_MENU.map((drink, idx) => (
                        <button 
                          key={idx}
                          onClick={() => addDrinkToCart(drink)}
                          className="flex-1 bg-white border border-orange-200 p-2 rounded-lg text-sm font-bold text-gray-700 shadow-sm hover:bg-orange-100 active:scale-95 transition-all flex justify-between items-center"
                        >
                          <span>{drink.name}</span>
                          <span className="text-orange-600">${drink.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-700 mb-2">¿Cómo deseas tu pedido?</h3>
                    <div className="flex gap-2">
                      <button onClick={() => setOrderType('pickup')} className={`flex-1 p-3 rounded-xl border-2 font-bold text-sm ${orderType === 'pickup' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'text-gray-500 border-gray-200'}`}>🛍️ Recoger</button>
                      <button onClick={() => setOrderType('delivery')} className={`flex-1 p-3 rounded-xl border-2 font-bold text-sm ${orderType === 'delivery' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'text-gray-500 border-gray-200'}`}>🛵 Domicilio</button>
                    </div>
                    {orderType === 'delivery' && (
                      <div className="mt-3">
                        <input 
                          type="text" 
                          value={address} 
                          onChange={(e) => setAddress(e.target.value)} 
                          placeholder="Calle, número, colonia, referencia..." 
                          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-orange-500" 
                        />
                        <button 
                          onClick={handleGetLocation}
                          disabled={isLoadingLocation}
                          className={`mt-2 w-full border p-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                            isLoadingLocation 
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-wait' 
                              : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                          }`}
                        >
                          {isLoadingLocation ? (
                            <span>Obteniendo ubicación...</span>
                          ) : (
                            <>
                              <MapPin className="w-4 h-4" />
                              Agregar mi ubicación actual (Google Maps)
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-700 mb-2">Método de Pago</h3>
                    <div className="flex gap-2 mb-3">
                      <button onClick={() => setPaymentMethod('cash')} className={`flex-1 p-2 rounded-lg border flex items-center justify-center gap-2 text-sm ${paymentMethod === 'cash' ? 'bg-green-50 border-green-500 text-green-700 font-bold' : 'border-gray-200'}`}><Banknote className="w-4 h-4" /> Efectivo</button>
                      <button onClick={() => setPaymentMethod('transfer')} className={`flex-1 p-2 rounded-lg border flex items-center justify-center gap-2 text-sm ${paymentMethod === 'transfer' ? 'bg-purple-50 border-purple-500 text-purple-700 font-bold' : 'border-gray-200'}`}><CreditCard className="w-4 h-4" /> Transferencia</button>
                    </div>
                    {paymentMethod === 'transfer' && (
                      <div className="bg-gray-100 p-3 rounded-lg text-sm border border-gray-200 space-y-2">
                        {[ 
                          { label: 'Banco', val: DATOS_BANCARIOS.banco },
                          { label: 'No. Cuenta', val: DATOS_BANCARIOS.cuenta, copy: true },
                          { label: 'Clabe', val: DATOS_BANCARIOS.clabe, copy: true },
                          { label: 'Beneficiario', val: DATOS_BANCARIOS.nombre, copy: true }
                        ].map((d, i) => (
                          <div key={i} className="bg-white p-2 rounded border border-gray-300 flex justify-between items-center">
                            <div><p className="text-[10px] text-gray-400 uppercase font-bold">{d.label}</p><p className="font-bold text-gray-800">{d.val}</p></div>
                            {d.copy && <button onClick={() => copyToClipboard(d.val)} className="bg-orange-100 text-orange-700 p-2 rounded-lg"><Copy className="w-4 h-4" /></button>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex justify-between items-end mb-4"><span className="text-gray-500">Total:</span><span className="text-3xl font-extrabold text-orange-600">${cartTotal}</span></div>
                <button onClick={handleSendOrder} className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg active:scale-95 transition-transform">Confirmar en WhatsApp</button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Footer / Créditos */}
      <footer className="mt-16 py-8 bg-white border-t border-orange-100 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <span>@ 2025</span>
          <span className="hidden sm:block opacity-30">/</span>
          <span className="text-gray-600">Armando Lucio</span>
          <span className="hidden sm:block opacity-30">/</span>
          <div className="flex gap-5">
            <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MenuApp;
