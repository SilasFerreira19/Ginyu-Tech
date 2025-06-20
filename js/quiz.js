let acertos = 0;

function inicializarQuiz() {
    const quizzes = document.querySelectorAll('.quiz');
    acertos = 0;

    quizzes.forEach((quiz, index) => {
        quiz.style.display = index === 0 ? 'flex' : 'none';
        quiz.classList.remove('fade-in', 'fade-out');

        const alternativas = quiz.querySelectorAll('.altborder');
        const botaoResponder = quiz.querySelector('.conf h2');
        let selecionada = null;
        let respondeu = false;

        // Limpa seleção e classes das alternativas
        alternativas.forEach(a => {
            a.classList.remove('selected', 'correct', 'incorrect');
            a.onclick = null;  // Remove event listeners anteriores
        });

        // Remove feedback se existir
        const feedbackAntigo = quiz.querySelector('.feedback');
        if (feedbackAntigo) feedbackAntigo.remove();

        botaoResponder.onclick = null;

        alternativas.forEach(alt => {
            alt.addEventListener('click', () => {
                if (respondeu) return;

                // Permitir desmarcar alternativa ao clicar novamente nela
                if (alt.classList.contains('selected')) {
                    alt.classList.remove('selected');
                    selecionada = null;
                } else {
                    alternativas.forEach(a => a.classList.remove('selected'));
                    alt.classList.add('selected');
                    selecionada = alt;
                }
            });
        });

        botaoResponder.addEventListener('click', () => {
            if (respondeu || !selecionada) return;

            respondeu = true;

            alternativas.forEach(a => a.classList.remove('correct', 'incorrect'));

            const feedback = document.createElement('span');
            feedback.classList.add('feedback');

            const polvoImg = document.querySelector('.octopart img');

            if (selecionada.dataset.correct === "true") {
                selecionada.classList.add('correct');
                feedback.textContent = 'Resposta correta!';
                feedback.style.color = '#4CAF50';
                if (polvoImg) polvoImg.src = 'img/img_pergunta/aepora.png';
                acertos++;
            } else {
                selecionada.classList.add('incorrect');
                const correta = quiz.querySelector('.altborder[data-correct="true"]');
                if (correta) correta.classList.add('correct');
                feedback.textContent = 'Resposta incorreta!';
                feedback.style.color = '#f44336';
                if (polvoImg) polvoImg.src = 'img/img_pergunta/tristoso.png';
            }

            botaoResponder.parentElement.insertBefore(feedback, botaoResponder);

            setTimeout(() => {
                if (polvoImg) polvoImg.src = 'img/img_pergunta/normal.png';
                quiz.classList.add('fade-out');

                setTimeout(() => {
                    quiz.style.display = 'none';

                    const proxima = quizzes[index + 1];
                    if (proxima) {
                        proxima.style.display = 'flex';
                        proxima.classList.remove('fade-out');
                        proxima.classList.add('fade-in');
                    } else {
                        // Fim das perguntas - mostra o resultado final
                        const resultadoDiv = document.getElementById('resultadoFinal');
                        resultadoDiv.querySelector('.pontuacao').textContent = `Você acertou ${acertos} de ${quizzes.length} perguntas!`;
                        resultadoDiv.style.display = 'flex';
                        resultadoDiv.classList.add('fade-in');

                        const btnRetry = document.getElementById('btnRetry');
                        btnRetry.onclick = () => {
                            resultadoDiv.style.display = 'none';
                            inicializarQuiz();
                        };
                    }

                }, 500);

            }, 3000);
        });
    });
}

inicializarQuiz();
