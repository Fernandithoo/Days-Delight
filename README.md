# Days Delight

Este es un proyecto que estoy desarrollando para una tienda de postres llamada **Days Delight**. La idea es crear una página sencilla donde los clientes puedan ver los productos disponibles y, desde otra página, yo pueda administrar el inventario.

## Lo que he hecho

- Creé una página de inicio para mostrar los postres disponibles.
- Añadí tarjetas con nombre, descripción, precio e imagen de cada producto.
- Preparé un inventario inicial con 20 postres.
- Hice una página de administración para publicar o retirar productos.
- Añadí un formulario para crear nuevos postres usando una URL para la imagen.
- Los cambios del inventario se reflejan en la tienda cuando se actualiza el contenido.
- Diseñé la página para que se vea bien en computadora y celular.
- Añadí un login con el usuario `luis` y claves generadas automáticamente.
- Creé un backend en Python para validar las claves antes de entrar.
- Las claves no se guardan directamente en el backend, sino como contraseñas cifradas.

## Cómo ejecutar el proyecto

Primero entro a la carpeta del backend:

```bash
cd backend
python3 server.py
```

Después abro esta dirección en el navegador:

```text
http://localhost:3000
```

No debo abrir los archivos HTML directamente con doble clic, porque el login necesita que el servidor esté funcionando.

## Páginas principales

Página de los clientes:

```text
http://localhost:3000/frontend/html/index.html
```

Página de administración:

```text
http://localhost:3000/frontend/html/admin.html
```

## Usuario de prueba

El usuario de prueba es:

```text
luis
```

Las claves se encuentran en `backend/generated-keys.txt`. Cada vez que ejecuto `generate_credentials.py`, se genera una lista nueva de claves.

## Organización del proyecto

- `backend/`: contiene el servidor, las credenciales y el generador de claves.
- `frontend/html/`: contiene las páginas HTML.
- `frontend/css/`: contiene los estilos de la tienda, el login y la administración.
- `frontend/javascript/`: contiene la lógica del login, la tienda y el inventario.
- `frontend/img/`: contiene las imágenes locales del proyecto.

Por ahora el inventario se guarda en el navegador usando `localStorage`. Esto me sirve para probar el funcionamiento, aunque más adelante quiero conectarlo a una base de datos para que los productos se guarden de forma permanente.

Fecha: 19 de septiembre de 2026.

Att: Luis.