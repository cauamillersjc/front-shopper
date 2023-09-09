# Como Rodar o Projeto Front-end em React

Este guia explicará como configurar e rodar o projeto front-end em React em seu ambiente usando a versão Node.js 18.17.0.

## Pré-requisitos

Antes de começar, você precisará ter o Node.js e o npm instalados em seu sistema. Certifique-se de que você está usando a versão Node.js 18.17.0 ou superior. Você pode verificar a versão do Node.js com o seguinte comando:

```bash
node -v
```

Certifique-se de que o npm também esteja instalado:

```bash
npm -v
```

## Configuração do Projeto

Clone o repositório do projeto para o seu computador:
```bash
git clone https://github.com/cauamillersjc/front-shopper.git
```

Navegue para o diretório do projeto:
```bash
cd nome-do-seu-projeto
```

Instale as dependências do projeto usando o npm:
```bash
npm install
```

## Rodando o Projeto
Após a configuração inicial, você pode iniciar o servidor de desenvolvimento para rodar o projeto:

```bash
npm start
```
Isso iniciará o servidor de desenvolvimento e abrirá o aplicativo em seu navegador padrão. O aplicativo será recarregado automaticamente sempre que você fizer alterações nos arquivos.

## Construindo para Produção
Para criar uma versão otimizada do seu aplicativo para produção, você pode usar o seguinte comando:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta build. Você pode implantar esses arquivos em um servidor da web para disponibilizar seu aplicativo ao público.
