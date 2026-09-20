// Buscamos los elementos de la tienda que vamos a actualizar.
const catalogo = document.getElementById('catalogo');
const contadorProductos = document.getElementById('contador-productos');
const catalogoVacio = document.getElementById('catalogo-vacio');

// Dibuja en pantalla solamente los productos que están publicados.
function renderStore() {
  const allProducts = getProducts();
  const publishedProducts = [];

  // Separamos los productos publicados de los retirados.
  for (let index = 0; index < allProducts.length; index += 1) {
    if (allProducts[index].publicado) {
      publishedProducts.push(allProducts[index]);
    }
  }

  catalogo.innerHTML = '';

  // Creamos una tarjeta para cada producto publicado.
  for (let index = 0; index < publishedProducts.length; index += 1) {
    const product = publishedProducts[index];
    catalogo.innerHTML += `
      <article class="producto-tienda">
        <div class="imagen-producto">
          <img src="${product.imagen}" alt="${product.nombre}" loading="lazy">
        </div>
        <div class="datos-producto">
          <h3>${product.nombre}</h3>
          <p>${product.descripcion}</p>
          <strong>$${product.precio.toFixed(2)}</strong>
        </div>
      </article>`;
  }

  contadorProductos.textContent = `${publishedProducts.length} ${publishedProducts.length === 1 ? 'producto' : 'productos'}`;
  catalogoVacio.hidden = publishedProducts.length > 0;
}

// Cargamos los productos cuando se abre la tienda.
renderStore();

// Si la administradora cambia algo en otra pestaña, actualizamos la tienda.
window.addEventListener('storage', (event) => {
  if (event.key === PRODUCT_STORAGE_KEY) {
    renderStore();
  }
});
