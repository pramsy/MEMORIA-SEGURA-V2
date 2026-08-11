function getCurrentPage() {
    return (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
}

function markActiveLink(container) {
    const links = container.querySelectorAll('a');
    const currentPage = getCurrentPage();

    links.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function loadSharedLayout() {
    const menuPlaceholder = document.getElementById('menu-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (!menuPlaceholder && !footerPlaceholder) return;

    const menuMarkup = `
        <aside class="sidebar">
            <div class="logo-container">
                <img class="logo" src="./img/logotipo.png" alt="Logotipo do Sistema">
                <div class="logo-text">
                    <h2>Sistema de Apoio</h2>
                    <span>Cuidado que conecta</span>
                </div>
            </div>
            <nav>
                <a href="index.html"><i class="fa-solid fa-house"></i>Dashboard</a>
                <a href="#"><i class="fa-solid fa-users"></i>Usuários</a>
                <a href="#"><i class="fa-solid fa-pills"></i>Medicamentos</a>
                <a href="#"><i class="fa-solid fa-calendar-days"></i>Rotina</a>
                <a href="ocorrencias.html"><i class="fa-solid fa-triangle-exclamation"></i>Ocorrências</a>
                <a href="alertas.html"><i class="fa-solid fa-bell"></i>Alertas</a>
                <a href="comunicacao.html"><i class="fa-solid fa-comment"></i>Comunicação</a>
            </nav>
        </aside>`;

    const footerMarkup = `
        <footer class="page-footer">
            <p>© 2026 Sistema de Apoio | Cuidado que conecta</p>
        </footer>`;

    if (menuPlaceholder) {
        menuPlaceholder.innerHTML = menuMarkup;
        markActiveLink(menuPlaceholder);
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerMarkup;
    }
}

const ocorrenciasData = [
    { title: 'Queda durante transferência', description: 'Paciente precisou de acompanhamento imediato.', meta: 'Há 18 min', badge: 'Alta', badgeClass: 'warning' },
    { title: 'Medicamento não administrado', description: 'Dose da manhã foi registrada como atrasada.', meta: 'Há 1h', badge: 'Média', badgeClass: 'info' },
    { title: 'Solicitação de visita', description: 'Familiar solicitou acompanhamento adicional.', meta: 'Hoje', badge: 'Baixa', badgeClass: 'positive' }
];

const alertasData = [
    { title: 'Medicamento atrasado', description: 'A dose de 10:00h ainda não foi confirmada.', meta: '10 min atrás', badge: 'Urgente', badgeClass: 'warning' },
    { title: 'Pressão alterada', description: 'Leitura registrada fora da faixa esperada.', meta: '45 min atrás', badge: 'Atenção', badgeClass: 'info' },
    { title: 'Check-in não confirmado', description: 'A rotina da tarde ainda não foi finalizada.', meta: '1h atrás', badge: 'Pendente', badgeClass: 'positive' }
];

const comunicacaoData = [
    { title: 'Mensagem da cuidadora', description: 'Atualização sobre a rotina da tarde enviada.', meta: '08:30', badge: 'Nova', badgeClass: 'positive' },
    { title: 'Solicitação de familiar', description: 'Pedido para reforçar a medicação noturna.', meta: '07:40', badge: 'Lida', badgeClass: 'info' },
    { title: 'Aviso da equipe', description: 'Próxima visita agendada para às 14:00h.', meta: 'Ontem', badge: 'Resumo', badgeClass: 'warning' }
];

function renderModuleList(id, items) {
    const list = document.getElementById(id);
    if (!list) return;

    if (!items || !items.length) {
        list.innerHTML = '<li class="module-empty">Nenhum item para exibir.</li>';
        return;
    }

    list.innerHTML = items.map(item => `
        <li class="module-item">
            <strong>${item.title}</strong>
            <span>${item.description}</span>
            <div class="meta">
                <span>${item.meta}</span>
                <span class="pill ${item.badgeClass || ''}">${item.badge}</span>
            </div>
        </li>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    loadSharedLayout();
    renderModuleList('ocorrencias-list', ocorrenciasData);
    renderModuleList('alertas-list', alertasData);
    renderModuleList('comunicacao-list', comunicacaoData);
});

fetch("http://localhost:8080/api/dashboard")
.then(res => res.json())
.then(data => {
    const medicamentos = document.getElementById("medicamentos");
    const rotina = document.getElementById("rotina");
    const ocorrencias = document.getElementById("ocorrencias-count");
    const alertas = document.getElementById("alertas-count");
    const mensagens = document.getElementById("mensagens");
    const relatorio = document.getElementById("relatorio");

    if (medicamentos) medicamentos.innerText = data.medicamentos;
    if (rotina) rotina.innerText = data.rotina;
    if (ocorrencias) ocorrencias.innerText = data.ocorrencias;
    if (alertas) alertas.innerText = data.alertas;
    if (mensagens) mensagens.innerText = data.mensagens;
    if (relatorio) relatorio.innerText = data.relatorio;
})
.catch(() => {});
document.getElementById("current-date").innerText = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });