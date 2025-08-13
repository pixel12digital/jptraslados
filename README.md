# JP Traslados - Website

Website moderno para a JP Traslados, empresa de transporte executivo em São Paulo.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Intersection Observer

## Pré-requisitos

- Node.js 18.17 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/jp-traslados.git
cd jp-traslados
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa a verificação de linting

## Modo Manutenção

### Ativar Modo Manutenção
Para ativar o modo manutenção (site fica inacessível):
1. **Abrir arquivo**: `src/components/MaintenanceMode.tsx`
2. **Mudar linha 4**: `const isMaintenanceMode = true;`
3. **Salvar arquivo**
4. **Recarregar página** (F5)

### Desativar Modo Manutenção
Para desativar o modo manutenção:
1. **Abrir arquivo**: `src/components/MaintenanceMode.tsx`
2. **Mudar linha 4**: `const isMaintenanceMode = false;`
3. **Salvar arquivo**
4. **Recarregar página** (F5)

**Nota:** É só alterar `true` para `false` (ou vice-versa) na linha 4 do arquivo!

## Deploy na Vercel

A maneira mais fácil de fazer o deploy do seu aplicativo Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Estrutura do Projeto

```
jp-traslados/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MaintenanceMode.tsx
│   └── styles/
│       └── globals.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── README.md
└── MANUTENCAO.md
```

## Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. 