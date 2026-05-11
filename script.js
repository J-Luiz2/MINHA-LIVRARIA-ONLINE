const btnExplorar = document.getElementById('btnExplorar');

btnExplorar.addEventListener('click', () => {
    document.getElementById('livros').scrollIntoView({
        behavior: 'smooth'
    });
});