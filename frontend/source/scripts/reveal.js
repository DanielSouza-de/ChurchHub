document.addEventListener('DOMContentLoaded', function () {
    window.revelar = ScrollReveal({ reset: false });

  // Seção início - Topo do site
    revelar.reveal('.h1-topo', {
    duration: 2000,
    distance: '90px'
    });

    revelar.reveal('.span-topo', {
    duration: 2000,
    distance: '90px',
    delay: 500
    });

    revelar.reveal('.botao-inicio', {
    duration: 2000,
    distance: '90px',
    delay: 1000,
    viewFactor: 0.1
    });

  // Título
    revelar.reveal('.titulo-pag1', {
    duration: 2000,
    distance: '90px',
    delay: 500,
    origin: 'right'
    });

  // Parágrafos
    revelar.reveal('.foto-pastor', {
    duration: 2000,
    distance: '90px',
    origin: 'left'
    });

    revelar.reveal('.paragrafo1', {
    duration: 2000,
    distance: '90px',
    delay: 500
    });

    revelar.reveal('.paragrafo2', {
    duration: 2000,
    distance: '90px',
    delay: 1000
    });

    revelar.reveal('.paragrafo3', {
    duration: 2000,
    distance: '90px',
    delay: 1500
    });

    revelar.reveal('.paragrafo4', {
    duration: 2000,
    distance: '90px',
    delay: 2000
    });

  // Seção identidade
    revelar.reveal('.titulo-identify', {
    duration: 2000,
    distance: '90px',
    origin: 'left'
    });

    revelar.reveal('.subtitulo-identify', {
    duration: 2000,
    distance: '90px',
    delay: 500
    });

    revelar.reveal('.paragrafo-identify', {
    duration: 2000,
    distance: '90px',
    delay: 1000,
    origin: 'right'
    });

    revelar.reveal('.img-identify', {
    duration: 2000,
    distance: '90px',
    delay: 1000,
    origin: 'right'
    });

  // Seção encontros
    revelar.reveal('.titulo-encontros', {
    duration: 2000,
    distance: '90px',
    origin: 'left'
    });

    revelar.reveal('.subtitulo-encontros', {
    duration: 2000,
    distance: '90px',
    delay: 500
    });

    revelar.reveal('.paragrafo-encontros', {
    duration: 2000,
    distance: '90px',
    origin: 'left'
    });

    revelar.reveal('.img-encontros', {
    duration: 2000,
    distance: '90px',
    origin: 'right',
    delay: 1000
    });
});