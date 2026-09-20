alert("Gracias por usar nuestra web")

// Carrusel automático simple
const slider = document.getElementById('slider');
if (slider) {
  const slides = slider.querySelectorAll('.slide');
  let current = 0;
  const total = slides.length;
  const intervalMs = 8000; // ajustar velocidad (ms)

  function goTo(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(() => {
    current = (current + 1) % total;
    goTo(current);
  }, intervalMs);
}

// Mostrar/ocultar descripción al tocar la imagen (funciona por producto)
// ahora colapsa otros items en móvil y hace que el contenedor crezca mostrando la descripción
document.querySelectorAll('.imagen-del-producto').forEach(imgCont => {
  imgCont.addEventListener('click', (e) => {
    const padre = imgCont.closest('.contenedor-padre');
    if (!padre) return;
    // en móvil colapsar otros abiertos
    if (window.innerWidth <= 700) {
      document.querySelectorAll('.contenedor-padre.show').forEach(p => {
        if (p !== padre) p.classList.remove('show');
      });
    }
    padre.classList.toggle('show');
  });
});