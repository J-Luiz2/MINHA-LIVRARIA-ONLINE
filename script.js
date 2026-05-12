/* ============================================================
   script.js — Minha Livraria Online
   Funcionalidades:
     1. Scroll suave ao clicar em "Explorar Livros"
     2. Header com fundo sólido ao rolar a página
     3. Carrinho funcional (adicionar, remover, total)
     4. Feedback visual no botão ao adicionar ao carrinho
   ============================================================ */


// ── 1. SCROLL SUAVE ───────────────────────────────────────────

const btnExplorar = document.getElementById('btnExplorar');

btnExplorar.addEventListener('click', () => {
  document.getElementById('livros').scrollIntoView({ behavior: 'smooth' });
});


// ── 2. HEADER SCROLL ──────────────────────────────────────────
// Adiciona uma classe ao header quando o usuário rola a página,
// deixando o fundo mais sólido para melhor leitura.

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.style.background = 'rgba(20, 12, 5, 0.98)';
  } else {
    header.style.background = 'rgba(20, 12, 5, 0.92)';
  }
});


// ── 3. CARRINHO ───────────────────────────────────────────────

const carrinhoOverlay = document.getElementById('carrinhoOverlay');
const btnCarrinho     = document.getElementById('btnCarrinho');
const fecharCarrinho  = document.getElementById('fecharCarrinho');
const carrinhoLista   = document.getElementById('carrinhoLista');
const carrinhoCount   = document.getElementById('carrinhoCount');
const carrinhoTotal   = document.getElementById('carrinhoTotal');
const btnFinalizar    = document.getElementById('btnFinalizar');

// Array que guarda os itens do carrinho
let itens = [];

// Abre o carrinho
btnCarrinho.addEventListener('click', () => {
  carrinhoOverlay.classList.add('aberto');
});

// Fecha ao clicar no X
fecharCarrinho.addEventListener('click', fechar);

// Fecha ao clicar fora do modal
carrinhoOverlay.addEventListener('click', (e) => {
  if (e.target === carrinhoOverlay) fechar();
});

function fechar() {
  carrinhoOverlay.classList.remove('aberto');
}

// Adiciona item ao carrinho
function adicionarItem(nome, preco) {
  itens.push({ nome, preco: parseFloat(preco) });
  renderizarCarrinho();
}

// Remove item do carrinho pelo índice
function removerItem(index) {
  itens.splice(index, 1);
  renderizarCarrinho();
}

// Renderiza a lista e atualiza o total e contador
function renderizarCarrinho() {
  // Atualiza o contador do botão
  carrinhoCount.textContent = itens.length;

  // Anima o contador
  carrinhoCount.style.transform = 'scale(1.4)';
  setTimeout(() => { carrinhoCount.style.transform = 'scale(1)'; }, 200);

  // Limpa a lista
  carrinhoLista.innerHTML = '';

  if (itens.length === 0) {
    carrinhoLista.innerHTML = '<li class="carrinho-vazio">Nenhum livro adicionado ainda.</li>';
    carrinhoTotal.textContent = 'R$ 0,00';
    return;
  }

  // Renderiza cada item
  itens.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('carrinho-item');
    li.innerHTML = `
      <div>
        <p class="item-nome">${item.nome}</p>
        <p class="item-preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
      </div>
      <button class="item-remover" data-index="${index}" title="Remover">✕</button>
    `;
    carrinhoLista.appendChild(li);
  });

  // Eventos de remover
  document.querySelectorAll('.item-remover').forEach(btn => {
    btn.addEventListener('click', () => {
      removerItem(parseInt(btn.dataset.index));
    });
  });

  // Calcula e exibe o total
  const total = itens.reduce((acc, item) => acc + item.preco, 0);
  carrinhoTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Captura todos os botões "Comprar" e adiciona o evento
document.querySelectorAll('.btn-comprar').forEach(btn => {
  btn.addEventListener('click', () => {
    const nome  = btn.dataset.nome;
    const preco = btn.dataset.preco;

    adicionarItem(nome, preco);

    // Feedback visual temporário no botão
    btn.textContent = '✓ Adicionado';
    btn.classList.add('adicionado');
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '+ Carrinho';
      btn.classList.remove('adicionado');
      btn.disabled = false;
    }, 1500);
  });
});


// ── 4. FINALIZAR COMPRA ───────────────────────────────────────

btnFinalizar.addEventListener('click', () => {
  if (itens.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const total = itens.reduce((acc, item) => acc + item.preco, 0);
  alert(`✅ Compra finalizada!\nTotal: R$ ${total.toFixed(2).replace('.', ',')}\n\nObrigado pela preferência! 📚`);

  // Limpa o carrinho após finalizar
  itens = [];
  renderizarCarrinho();
  fechar();
});