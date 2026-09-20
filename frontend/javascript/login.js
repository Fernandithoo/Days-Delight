const formularioLogin = document.getElementById('formulario-login');
const mensajeLogin = document.getElementById('mensaje-login');

formularioLogin.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const boton = formularioLogin.querySelector('button[type="submit"]');
  const usuario = document.getElementById('usuario').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  boton.disabled = true;
  mensajeLogin.textContent = '';

  try {
    const respuesta = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena })
    });
    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      mensajeLogin.textContent = resultado.error || 'Usuario o clave inválida.';
      return;
    }

    window.location.href = resultado.redirect;
  } catch (error) {
    mensajeLogin.textContent = 'No se pudo conectar con el servidor.';
  } finally {
    boton.disabled = false;
  }
});