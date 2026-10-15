/**
 * ============================================================================
 * PROYECTO: Sitio Web Cafetería "Baristas"
 * ARCHIVO: script.js
 * DESCRIPCIÓN: Lógica interactiva en JavaScript (Nivel Técnico Intermedio)
 * ============================================================================
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  
  /* --------------------------------------------------------------------------
     1. GESTIÓN DEL MODAL DE POLÍTICA DE PRIVACIDAD (CONSENT MODAL)
     -------------------------------------------------------------------------- */
  const privacyModalElement = document.getElementById('privacyModal');
  const btnAcceptPrivacy = document.getElementById('btnAcceptPrivacy');
  const btnRejectPrivacy = document.getElementById('btnRejectPrivacy');

  if (privacyModalElement) {
    // Inicializar el modal con Bootstrap 5 impidiendo cierre accidental
    const privacyModal = new bootstrap.Modal(privacyModalElement, {
      backdrop: 'static', // Impide cerrar haciendo clic fuera
      keyboard: false     // Impide cerrar con la tecla Escape
    });

    // Mostrar el aviso en cada carga de la página
    setTimeout(() => {
      privacyModal.show();
    }, 500);

    // Evento al presionar "Aceptar" / "Autorizo"
    if (btnAcceptPrivacy) {
      btnAcceptPrivacy.addEventListener('click', () => {
        privacyModal.hide();
        mostrarNotificacion('¡Gracias! Has aceptado nuestra Política de Privacidad.', 'success');
      });
    }

    // Evento al presionar "Rechazar"
    if (btnRejectPrivacy) {
      btnRejectPrivacy.addEventListener('click', () => {
        alert('Para navegar con todas las funcionalidades activas se requiere aceptar las políticas. Puedes consultar el documento completo en la sección Legal.');
        privacyModal.hide();
      });
    }
  }

  /* --------------------------------------------------------------------------
     2. GESTIÓN DEL CARRITO DE COMPRAS BÁSICO (MICRO-INTERACCIÓN)
     -------------------------------------------------------------------------- */
  let cartCount = 0;
  const cartBadges = document.querySelectorAll('.badge-cart');
  const addToCartButtons = document.querySelectorAll('.btn-add-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      cartBadges.forEach(badge => {
        badge.textContent = cartCount;
        badge.classList.add('animate__animated', 'animate__rubberBand');
        setTimeout(() => badge.classList.remove('animate__animated', 'animate__rubberBand'), 1000);
      });

      const productName = button.getAttribute('data-name') || 'Producto';
      mostrarNotificacion(`"${productName}" agregado a tu pedido.`, 'info');
    });
  });

  /* --------------------------------------------------------------------------
     3. MANEJO DE FORMULARIOS CON VALIDACIÓN INTERMEDIA
     -------------------------------------------------------------------------- */

  // Formulario de Reservas (reservas.html)
  const formReserva = document.getElementById('formReserva');
  if (formReserva) {
    formReserva.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('resNombre')?.value || 'Cliente';
      const fecha = document.getElementById('resFecha')?.value;
      const hora = document.getElementById('resHora')?.value;
      const personas = document.getElementById('resPersonas')?.value;

      mostrarNotificacion(`¡Excelente, ${nombre}! Tu reserva para ${personas} personas el ${fecha} a las ${hora} ha sido registrada con éxito. Te esperamos.`, 'success');
      formReserva.reset();
    });
  }

  // Formulario de Contacto (contacto.html)
  const formContacto = document.getElementById('formContacto');
  if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
      e.preventDefault();
      mostrarNotificacion('Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo a la brevedad.', 'success');
      formContacto.reset();
    });
  }

  // Formulario de Empleo (trabaja-con-nosotros.html)
  const formEmpleo = document.getElementById('formEmpleo');
  if (formEmpleo) {
    formEmpleo.addEventListener('submit', (e) => {
      e.preventDefault();
      mostrarNotificacion('¡Postulación recibida! Revisaremos tu CV y perfil para nuestro equipo.', 'success');
      formEmpleo.reset();
    });
  }

  // Formulario de Boletín Informativo (Newsletter en el Footer)
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      mostrarNotificacion('¡Te has suscrito exitosamente a nuestras novedades y promociones!', 'success');
      form.reset();
    });
  });

  // Formulario de Opiniones (opiniones.html)
  const formOpinion = document.getElementById('formOpinion');
  if (formOpinion) {
    formOpinion.addEventListener('submit', (e) => {
      e.preventDefault();
      mostrarNotificacion('¡Muchas gracias por dejarnos tu reseña! Será publicada tras una breve moderación.', 'success');
      formOpinion.reset();
    });
  }

});

/**
 * Función auxiliar para mostrar notificaciones flotantes sencillas (Toasts / Alertas)
 * @param {string} mensaje - Texto a mostrar
 * @param {string} tipo - 'success', 'info', 'warning'
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
  // Crear contenedor de alerta dinámico
  const alertContainer = document.createElement('div');
  alertContainer.className = `alert alert-${tipo === 'info' ? 'warning' : 'success'} alert-dismissible fade show shadow-lg position-fixed bottom-0 end-0 m-3`;
  alertContainer.style.zIndex = '9999';
  alertContainer.style.maxWidth = '360px';
  alertContainer.role = 'alert';
  alertContainer.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="bi bi-${tipo === 'success' ? 'check-circle-fill' : 'info-circle-fill'} fs-4 me-2"></i>
      <div>${mensaje}</div>
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  document.body.appendChild(alertContainer);

  // Auto-eliminar después de 4.5 segundos
  setTimeout(() => {
    alertContainer.classList.remove('show');
    setTimeout(() => alertContainer.remove(), 300);
  }, 4500);
}
