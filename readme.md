
# Demoblaze Cypress

Esse projeto é uma implementação de testes automatizados para o site [Demoblaze](https://www.demoblaze.com/). O objetivo principal deste projeto é garantir que as principais funcionalidades do site, como autenticação de usuários e filtragem de produtos por categoria, estejam funcionando corretamente e sem problemas.

## Execução

Antes de executar os testes, certifique-se de ter o Node.js instalado em seu ambiente. Em seguida, siga os passos abaixo:

1. Clone o repositório para o seu computador.
2. Navegue até o diretório raiz do projeto.
3. Instale as dependências executando o comando `npm install`.
4. Execute os testes com o comando `npx cypress run` para executar os testes com a interface do Cypress, ou então utilize os Scripts que estão abaixo para executar o teste headless.

# Scripts
Os scripts são responsáveis por fazer a execução dos testes sem necessidade da interface gráfica do Cypress.

- **cy:authentication_filter**: Executa os testes de autenticação do usuário.
```bash
npm run cy:authentication_filter
```

Este script executa um conjunto de testes automatizados relacionados à autenticação de usuários no site Demoblaze. Cada teste realiza ações específicas, como abrir o site, preencher campos de registro, enviar formulários e verificar as respostas do servidor.

- **cy:products_filter** Executa os testes de filtros de produtos.
```
npm run cy:products_filter
```
Este script executa um conjunto de testes automatizados relacionados à filtragem de produtos no site Demoblaze. Cada teste realiza ações específicas, como clicar em uma categoria de produto, verificar se os produtos exibidos fazem parte dessa categoria.

# Informações adicionais
1. O projeto por padrão desativa a captura de screenshots quando algum teste falha e também está com a feature de gravar vídeo das ações feitas pelo Cypress, você pode ativiar tudo isso dentro do arquivo `cypress.config.js`
2. Para gerar dados aleatórios para garantir a eficiências dos testes foi usado a biblioteca [Faker](https://fakerjs.dev/).