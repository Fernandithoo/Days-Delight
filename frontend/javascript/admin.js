// Elementos del resumen y del inventario.
const inventario = document.getElementById('inventario');
const totalProductos = document.getElementById('total-productos');
const publicadosProductos = document.getElementById('publicados-productos');
const agotadosProductos = document.getElementById('agotados-productos');
const formularioProducto = document.getElementById('formulario-producto');

// Muestra los productos dentro del panel de administración.
function renderInventory() {
  const products = getProducts();
  let publishedCount = 0;

  // Contamos cuántos productos están visibles en la tienda.
  for (let index = 0; index < products.length; index += 1) {
    if (products[index].publicado) {
      publishedCount += 1;
    }
  }

  totalProductos.textContent = products.length;
  publicadosProductos.textContent = publishedCount;
  agotadosProductos.textContent = products.length - publishedCount;
  inventario.innerHTML = '';

  // Creamos una fila sencilla para cada producto.
  for (let index = 0; index < products.length; index += 1) {
    const product = products[index];
    const publishedClass = product.publicado ? 'esta-publicado' : '';
    const publishedText = product.publicado ? 'Publicado' : 'Retirado';

    inventario.innerHTML += `
      <article class="item-inventario ${publishedClass}">
        <img src="${product.imagen}" alt="${product.nombre}" loading="lazy">
        <div class="detalle-inventario">
          <h3>${product.nombre}</h3>
          <span>$${product.precio.toFixed(2)}</span>
        </div>
        <button class="boton-estado" type="button" data-product-id="${product.id}">${publishedText}</button>
      </article>`;
  }
}

// Escuchamos los botones de publicar y retirar.
inventario.addEventListener('click', (event) => {
  const button = event.target.closest('[data-product-id]');
  if (!button) return;

  const products = getProducts();
  const product = products.find((item) => item.id === button.dataset.productId);
  product.publicado = !product.publicado;
  saveProducts(products);
  renderInventory();
});

// Cuando se envía el formulario, creamos un nuevo producto.
formularioProducto.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formularioProducto);
  const products = getProducts();

  const newProduct = {
    id: `producto-${Date.now()}`,
    nombre: data.get('nombre').trim(),
    descripcion: data.get('descripcion').trim(),
    precio: Number(data.get('precio')),
    imagen: data.get('imagen').trim(),
    publicado: true
  };

  products.push(newProduct);
  saveProducts(products);
  formularioProducto.reset();
  renderInventory();
});

// Este botón retira todos los productos de la tienda.
document.getElementById('retirar-todos').addEventListener('click', () => {
  const products = getProducts();

  for (let index = 0; index < products.length; index += 1) {
    products[index].publicado = false;
  }

  saveProducts(products);
  renderInventory();
});

// Dibujamos el inventario al abrir la página.
renderInventory();
