// Esta es la llave que usamos para guardar los productos en el navegador.
const PRODUCT_STORAGE_KEY = 'days-delight-products';

// Estos son los productos que aparecen la primera vez que se abre la página.
// El cuarto dato de cada producto es la URL de su imagen.
const defaultProducts = [
  ['Tarta de fresas', 'Fresas frescas, crema suave y una base crujiente.', 8.50, 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900&q=85'],
  ['Cheesecake de frutos rojos', 'Cremoso, delicado y cubierto con frutos rojos.', 9.90, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=900&q=85'],
  ['Pastel de chocolate', 'Chocolate intenso con una cobertura brillante.', 12.50, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=85'],
  ['Roll de canela', 'Masa esponjosa, canela y glaseado de vainilla.', 4.50, 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=900&q=85'],
  ['Macarons surtidos', 'Seis piezas de colores con rellenos suaves.', 7.80, 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=900&q=85'],
  ['Pavlova de limón', 'Merengue crujiente, crema y un toque cítrico.', 10.50, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=85'],
  ['Brownie con nueces', 'Brownie húmedo con nueces tostadas.', 5.90, 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=900&q=85'],
  ['Cupcake de vainilla', 'Bizcocho de vainilla con crema de mantequilla.', 3.80, 'https://images.unsplash.com/photo-1519869325930-281384150729?w=900&q=85'],
  ['Tiramisú clásico', 'Café, mascarpone y cacao en capas.', 8.90, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=85'],
  ['Donas glaseadas', 'Suaves, doradas y con glaseado de colores.', 4.20, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=900&q=85'],
  ['Tarta de manzana', 'Manzana especiada sobre una masa dorada.', 8.20, 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=900&q=85'],
  ['Mousse de chocolate', 'Textura ligera con chocolate semiamargo.', 7.50, 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=900&q=85'],
  ['Galletas de chispas', 'Galletas caseras recién horneadas.', 3.50, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900&q=85'],
  ['Milhojas de crema', 'Hojaldre crujiente con crema pastelera.', 8.70, 'https://images.unsplash.com/photo-1614707267537-2b1a00b6f0f7?w=900&q=85'],
  ['Tres leches', 'Bizcocho húmedo con crema y canela.', 8.90, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=900&q=85'],
  ['Tarta de maracuyá', 'Dulce y ácida, con una crema sedosa.', 9.40, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=900&q=85'],
  ['Profiteroles', 'Pequeños bocados rellenos de crema.', 7.90, 'https://images.unsplash.com/photo-1559622214-f8a9850965bb?w=900&q=85'],
  ['Flan de caramelo', 'Flan casero con caramelo dorado.', 6.50, 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=900&q=85'],
  ['Tarta de pistacho', 'Crema de pistacho sobre base de almendras.', 10.90, 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=900&q=85'],
  ['Caja dulce sorpresa', 'Una selección especial de la pastelería.', 18.00, 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=900&q=85']
];

// Agregamos los datos que necesita cada producto para funcionar.
// Los primeros seis productos comienzan publicados en la tienda.
for (let index = 0; index < defaultProducts.length; index += 1) {
  const product = defaultProducts[index];
  defaultProducts[index] = {
    id: `producto-${index + 1}`,
    nombre: product[0],
    descripcion: product[1],
    precio: product[2],
    imagen: product[3],
    publicado: index < 6
  };
}

// Lee los productos guardados en localStorage.
function getProducts() {
  const savedProducts = localStorage.getItem(PRODUCT_STORAGE_KEY);

  // Si es la primera visita, guardamos el inventario inicial.
  if (!savedProducts) {
    saveProducts(defaultProducts);
    return defaultProducts;
  }

  try {
    return JSON.parse(savedProducts);
  } catch (error) {
    // Si el contenido se dañó, volvemos a usar los productos iniciales.
    saveProducts(defaultProducts);
    return defaultProducts;
  }
}

// Guarda todo el inventario como texto JSON.
function saveProducts(products) {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));

  // Avisamos a las otras partes de la página que hubo un cambio.
  window.dispatchEvent(new StorageEvent('storage', { key: PRODUCT_STORAGE_KEY, newValue: JSON.stringify(products) }));
}
