API de Receitas

Projeto de API REST para gerenciar usuários, receitas e ingredientes.  
Feito em Node.js + Express e utilizando PostgreSQL como banco de dados.

-----

Tecnologias
- Node.js
- Express
- PostgreSQL
- Sequelize (ORM)
- Nodemon (dev)

-----

Instalação

#Criar banco de dados com script
scriptBD.txt

# Clonar repositório
git clone https://github.com/Bryan-A-1998/api-receitas

# Entrar na pasta
cd api-receitas

# Instalar dependências
npm install

# Entrar na pasta
cd backend

# Rodar servidor
node servidor.js

# Aparecera que esta rodando se tudo estiver ok
Servidor rodando na porta 7000
Conexão com PostgreSQL

# Executar testes /testes
node texteConexao.js para saber se esta ok a conecção com o banco
textes.txt testes unitarios para insomnia ou modelo de testes para o frontend

Data de entrega: 10/09/2025

Problema:

Fui ao mercado e trouxe ovos, leite, farinha e carne. Gostaria de uma api onde eu soubesse de forma rápida e fácil o que posso fazer com os ingredientes que tenho.
 O usuário deve poder realizar cadastro, edição e listagem de:

Novos ingredientes, Novas receitas Funcionalidade para listar receitas que incluam os ingredientes informados, ou receitas que quase possuam todos os ingredientes(estes deverão ser marcados como 100% compatíveis).


Com o prazo que eu tenho, consigo fazer? Ou se não consigo:

· Quais funcionalidades são fundamentais e quais eu posso sacrificar?
fundamentais(CRUD usuarios, CRUD ingredientes, CRUD receitas, Funcionalidade buscar receitas compativeis com ingredientes informados)

sacrificadas(Autentificação de usuario, .env, /servicos com padronização de respostas ou funçoes de padronização para strings recebidas)

· Quais funcionalidades são imprescindíveis?
CRUDS

Capacidade de coleta de requisitos: Para realizar o desenvolvimento a informação que me foi passada está completa?
Não, mas depende de até que ponto vai a aplicação, basicamente esta ja funciona ok, mas e se o usuario for ter um estoque por exemplo, precisaria complementar e atualizar o código 

Preciso de mais alinhamentos para entender o problema?
Sim

Caso precise de alinhamento: Qual a forma mais efetiva de fazer isso? Email? Chamada telefônica? Chat? Alinhamento pessoal?
Email, chamada telefonica e alinhamento pessoal
