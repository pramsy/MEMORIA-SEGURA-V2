# Memória Segura

Este projeto é a parte frontend de um painel para apoio e acompanhamento do usuário, com foco em:

- Dashboard inicial
- Ocorrências
- Alertas
- Comunicação

## Estrutura do projeto

- `index.html` — painel principal
- `ocorrencias.html` — página de ocorrências
- `alertas.html` — página de alertas
- `comunicacao.html` — página de comunicação
- `style.css` — estilos gerais e responsividade
- `script.js` — renderização dos dados, menu e rodapé compartilhados
- `components/` — arquivos reutilizáveis de layout
- `img/` — assets visuais do projeto

## Como visualizar

Você pode abrir os arquivos HTML diretamente no navegador ou rodar um servidor local simples, por exemplo:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Fluxo do usuário

1. O usuário acessa o dashboard principal para visualizar um resumo geral do sistema.
2. A partir do menu lateral, ele pode navegar entre dashboard, ocorrências, alertas e comunicação.
3. Na página de ocorrências, é possível acompanhar registros recentes e pendências.
4. Na página de alertas, o sistema exibe avisos e prioridades do dia.
5. Na página de comunicação, o usuário visualiza mensagens e atualizações rápidas para a equipe.

## Observações

- Este projeto foi desenvolvido como base frontend para integração posterior com o backend.
- As seções de conteúdo estão prontas para receber dados reais da API.
- O menu lateral e o rodapé são reutilizados para manter consistência visual entre as páginas.
