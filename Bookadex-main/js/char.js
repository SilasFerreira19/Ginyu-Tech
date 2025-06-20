    const tabs = document.querySelectorAll('.customopt');
    const contents = document.querySelectorAll('[data-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const type = tab.getAttribute('data-type');

            // Remove classe 'active' de todas as abas
            tabs.forEach(t => t.classList.remove('active'));

            // Adiciona classe 'active' na aba clicada
            tab.classList.add('active');

            // Oculta todos os conteúdos
            contents.forEach(content => {
                content.style.display = 'none';
            });

            // Mostra o conteúdo correspondente à aba clicada
            const selectedContent = document.querySelector(`[data-content="${type}"]`);
            if (selectedContent) {
                selectedContent.style.display = 'flex';
            }
        });
    });