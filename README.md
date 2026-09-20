# Days Delight

Dias Delectable

Esto es un iniciativa estamos construyendo para un establecimiento de reposteria que lleva por nombre 'Days Delight'. La propuesta es elaborar un sitio simple, los compradores observaran los manjares expuestos; desde un sitio distinto, me sera viable manejar el almacén.

Lo que hemos echo:

Una pagina de aterrizaje formada, para los dulces ofrecidos.
Cartas de añadido, con nombres, descripciones, costo y retrato de cada manjar.
Un stock inicial compuesto, sumando la cantidad disponible de postres. 
Una sitio de Gestión, para subir o quitar mercancias.
Un formato que agregamos, creando porciones con direccion web de retrato.
Las modificaciones del stock ellas se aprecian en el expendio si se refresca el contenido.
El sitio lo he acomodado yo, para que parezca elegante en ordenador y telefono.
Un ingreso se agrego, el usuario es `luis`(mientras), las contraseñas generadas solas.
Una parte posterior en Python está diseñada, las contraseñas valida antes del acceso.
Las contraseñas no son almacenadas de forma directa, pero si con claves encriptadas.

Maneras de correr el proyecto

Primero: se ubica en el directorio de la parte posterior:

cd backend
python3 server. Seguido abre esta direccion en el navegador:

```text
http://localhost:3000
```

Abrir los HTMLs directamente con doble click esta mal, el login necesita que el servor este en marcha.

## Paginas importantes

Pagina de clientes:

```text
http://localhost:3000/frontend/html/index.html
```

Pagina de administracion:

```text
http://localhost:3000/frontend/html/admin.html
```

## Usuario de prueba

El usuario de prueba es:

```text
luis
```

Las claves estan en `backend/generated-keys.txt`. Cada ves que ejecuto `generate_credentials.py`, se genera una lista nueva de claves.

## Estructura del proyecto

- `backend/`: tiene el servidor, las credenciales y el generador de claves.
- `frontend/html/`: contiene las paginas HTML.
- `frontend/css/`: tiene los estilos de la tienda, el login y la administracion.
- `frontend/javascript/`: contiene la logica del login, la tienda y el inventario.
- `frontend/img/`: contiene las imagenes locales del proyecto.

Por ahora el inventario se guarda en el navegador usando `localStorage`. Me ayuda para probar, pero despues quiero conectarlo a una base de datos para guardar los productos para siempre.

Fecha: 19 de septiembre de 2026.

Atte: Luis.
