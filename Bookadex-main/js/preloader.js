document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.querySelector('.preloader');

    // Desabilita a rolagem da página enquanto o preloader está ativo
    document.body.style.overflow = 'hidden';

    setTimeout(function () {
        // Esconde o preloader suavemente
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';

        // Espera a transição terminar antes de remover
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'auto'; // Reabilita a rolagem
        }, 500);
    }, 2500);
});

//=================== Dropdown ===============================================

    function toggleDropdown(event) {
        event.stopPropagation(); // Impede que o clique se propague para o window
        const dropdown = document.getElementById("profileDropdown");
        dropdown.classList.toggle("show");
    }

    document.getElementById("profileDropdown").addEventListener("click", function(event) {
        event.stopPropagation(); // Evita que clique em links do dropdown feche ele
    });


    // Fecha o dropdown ao clicar fora
    window.addEventListener('click', function(e) {
        const profile = document.querySelector('.imgprofile');
        const dropdown = document.getElementById("profileDropdown");

        if (!profile.contains(e.target)) {
            dropdown.classList.remove("show");
        }
    });

