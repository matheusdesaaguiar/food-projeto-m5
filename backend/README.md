# Food Rescue - API RESTful voltada para evitar o desperdício de alimentos

## 🛠 Sobre o Projeto

Este projeto é uma API RESTful desenvolvida em equipe, onde cada membro ficou responsável por implementar um CRUD completo para um recurso específico. Utilizamos Node.js com Express para criar as rotas, Prisma para modelagem e acesso ao banco de dados PostgreSQL (Neon) e Jest para testes automatizados. A documentação da API foi feita com Swagger para facilitar o uso e entendimento da aplicação.

## 🎯 Objetivo do Projeto
Desenvolver uma API que facilite a conexão entre doadores — como supermercados, restaurantes e produtores — e pessoas em situação de vulnerabilidade social, como ONGs, abrigos e famílias. O objetivo é reduzir o desperdício de alimentos ainda próprios para o consumo, promovendo uma distribuição mais justa e eficiente dos recursos. Através dessa API, será possível cadastrar e localizar doações, organizar pontos de coleta, acompanhar o impacto das ações e tornar o processo de solidariedade mais acessível, ágil e transparente.

## 🛠 Tecnologias 

- Node.js
- Express
- Prisma ORM
- PostgreSQL (Neon)
- Jest (testes automatizados)
- Swagger (documentação)

## 🛠 Estrutura do Projeto

- **Controllers**: Responsáveis por receber as requisições e chamar os serviços.
- **Services**: Contêm a lógica de negócio e interação com o banco via Prisma.
- **Routes**: Definem os endpoints da API e ligam as rotas aos controllers.
- **Tests**: Testes unitários e de integração com Jest para garantir qualidade.
- **Docs**: Arquivos Swagger para documentação da API.

## 🛠 Rotas Disponíveis
### Foods
- `GET /foods` — Lista todos os alimentos.

- `GET /foods/:id` — Busca um alimento pelo ID.

- `POST /foods` — Cria um novo alimento.

- `PUT /foods/:id` — Atualiza um alimento pelo ID.

- `DELETE /foods/:id` — Remove um alimento pelo ID.

### Beneficiaries
- `GET /beneficiaries` — Lista todos os beneficiários.

- `GET /beneficiaries/:id` — Busca um beneficiário pelo ID.

- `POST /beneficiaries` — Cria um novo beneficiário.

- `PUT /beneficiaries/:id` — Atualiza um beneficiário pelo ID.

- `DELETE /beneficiaries/:id` — Remove um beneficiário pelo ID.

- `POST /beneficiaries/verify` — Verifica dados de beneficiário (exemplo de rota personalizada).                

### Points (Pontos de Coleta)
- `GET /collection-points` — Lista todos os pontos de coleta.

- `GET /collection-points/:id` — Busca um ponto de coleta pelo ID.

- `POST /collection-points` — Cria um novo ponto de coleta.

- `PUT /collection-points/:id` — Atualiza um ponto de coleta pelo ID.

- `DELETE /collection-points/:id` — Remove um ponto de coleta pelo ID.


### Impact Reports
- `GET /impact` — Lista todos os relatórios de impacto.

- `GET /impact/:id` — Busca um relatório pelo ID.

- `POST /impact` — Cria um novo relatório.

- `PUT /impact/:id` — Atualiza um relatório pelo ID.

- `DELETE /impact/:id` — Remove um relatório pelo ID.

### Notifications (Notificações)
- `GET /notifications` — Lista todas as notificações.

- `GET /notifications/:id` — Busca uma notificação pelo ID.

- `POST /notifications` — Cria uma nova notificação.

- `PUT /notifications/:id` — Atualiza uma notificação pelo ID.

- `DELETE /notifications/:id` — Remove uma notificação pelo ID.

### Donors (Doadores)
- `GET /donors` — Lista todos os doadores.

- `GET /donors/:id` — Busca um doador pelo ID.

- `POST /donors` — Cria um novo doador.

- `PUT /donors/:id` — Atualiza um doador pelo ID.

- `DELETE /donors/:id` — Remove um doador pelo ID.



*Para mais detalhes e parâmetros, consulte a [documentação Swagger local](http://localhost:3000/api-docs).*
* ou pela [documentação interativa](https://food-rescue-1-16nz.onrender.com/api-docs)*

## 🛠 Como Rodar

1. Clone o repositório:
   ```
   git clone https://github.com/hadiel7/Food-Rescue.git

   cd Food-Rescue
   ```
2. Instale as dependências:
```
npm install
```
3. Configure o banco de dados PostgreSQL (Neon) e atualize o arquivo .env com a string de conexão.

Execute as migrações do Prisma para criar as tabelas:
```
npm run prisma:generate

npm run prisma:migrate
```
4. Inicie o servidor:
```
npm run start
```
5. Acesse a documentação Swagger em:

http://localhost:3000/api-docs


## 🛠 Trabalho em Equipe

Trabalhamos colaborativamente, com reuniões para definir os modelos Prisma e integrar as partes desenvolvidas. Cada um focou em um CRUD e suas rotas, ajudando uns aos outros na resolução de conflitos e dúvidas para garantir que tudo funcionasse integrado e bem testado.

## 🛠 Contato
Para dúvidas ou sugestões, abra uma issue ou envie um pull request.

MIT License