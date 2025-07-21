const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API - Sistema de Doações e Impacto",
    version: "1.0.0",
    description:
      "Documentação da API para gestão de alimentos doados, beneficiários, doadores e relatórios de impacto ambiental/social.",
  },
  tags: [
    {
      name: "Alimentos",
      description: "Gestão de alimentos disponíveis para doação",
    },
    {
      name: "Beneficiários",
      description: "Cadastro e consulta de pessoas que recebem doações",
    },
    {
      name: "Pontos de Coleta",
      description: "Locais de entrega e retirada dos alimentos",
    },
    {
      name: "Relatórios de Impacto",
      description: "Relatórios de impacto e métricas ambientais",
    },
    {
      name: "Notificações",
      description: "Alertas e mensagens para engajamento dos usuários",
    },
    {
      name: "Doadores",
      description: "Empresas e entidades que doam alimentos",
    },
  ],
  paths: {
    // === Alimentos ===
    "/foods": {
      get: {
        summary: "Listar alimentos disponíveis para doação",
        tags: ["Alimentos"],
        responses: {
          200: {
            description: "Lista de alimentos retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Food" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Criar um novo alimento",
        tags: ["Alimentos"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/FoodInput" },
            },
          },
        },
        responses: {
          201: {
            description: "Alimento criado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Food" },
              },
            },
          },
          500: {
            description: "Erro interno ao criar o alimento",
          },
        },
      },
    },
    "/foods/byid/{id}": {
      get: {
        summary: "Buscar um alimento por ID",
        tags: ["Alimentos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Alimento encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Food" },
              },
            },
          },
          404: {
            description: "Alimento não encontrado",
          },
        },
      },
    },
    "/foods/update/{id}": {
      put: {
        summary: "Atualizar um alimento existente",
        tags: ["Alimentos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/FoodInput" },
            },
          },
        },
        responses: {
          200: {
            description: "Alimento atualizado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Food" },
              },
            },
          },
          500: {
            description: "Erro ao atualizar o alimento",
          },
        },
      },
    },
    "/foods/delete/{id}": {
      delete: {
        summary: "Remover um alimento por ID",
        tags: ["Alimentos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: {
            description: "Alimento deletado com sucesso",
          },
          500: {
            description: "Erro ao deletar o alimento",
          },
        },
      },
    },
    "/foods/category/{id}": {
      get: {
        summary: "Buscar alimentos por categoria",
        tags: ["Alimentos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Alimentos encontrados na categoria",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Food" },
                },
              },
            },
          },
          404: {
            description: "Nenhum alimento encontrado na categoria",
          },
        },
      },
    },

    // === Beneficiários ===
    "/beneficiary": {
      get: {
        summary: "Listar beneficiários cadastrados",
        tags: ["Beneficiários"],
        responses: {
          200: {
            description: "Lista de beneficiários retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Beneficiary" },
                },
              },
            },
          },
          500: {
            description: "Erro interno ao listar beneficiários",
          },
        },
      },
      post: {
        summary: "Cadastrar um novo beneficiário",
        tags: ["Beneficiários"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BeneficiaryInput" },
            },
          },
        },
        responses: {
          201: {
            description: "Beneficiário criado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Beneficiary" },
              },
            },
          },
          500: {
            description: "Erro interno ao criar o beneficiário",
          },
        },
      },
    },
    "/beneficiary/{id}": {
      get: {
        summary: "Buscar beneficiário por ID",
        tags: ["Beneficiários"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Beneficiário encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Beneficiary" },
              },
            },
          },
          404: {
            description: "Beneficiário não encontrado",
          },
        },
      },
      put: {
        summary: "Atualizar beneficiário por ID",
        tags: ["Beneficiários"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BeneficiaryInput" },
            },
          },
        },
        responses: {
          200: {
            description: "Beneficiário atualizado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Beneficiary" },
              },
            },
          },
          500: {
            description: "Erro ao atualizar o beneficiário",
          },
        },
      },
      delete: {
        summary: "Remover beneficiário por ID",
        tags: ["Beneficiários"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: {
            description: "Beneficiário removido com sucesso",
          },
          500: {
            description: "Erro ao remover o beneficiário",
          },
        },
      },
    },

    // === Pontos de Coleta ===
    "/collection-points": {
      get: {
        summary: "Listar pontos de coleta/distribuição",
        tags: ["Pontos de Coleta"],
        responses: {
          200: {
            description: "Lista de pontos de coleta retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/CollectionPoint" },
                },
              },
            },
          },
          500: { description: "Erro ao listar pontos de coleta" },
        },
      },
      post: {
        summary: "Criar novo ponto de coleta",
        tags: ["Pontos de Coleta"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CollectionPointInput" },
            },
          },
        },
        responses: {
          200: { description: "Ponto de coleta criado com sucesso" },
          500: { description: "Erro ao criar ponto de coleta" },
        },
      },
    },
    "/collection-points/{id}": {
      patch: {
        summary: "Atualizar informações de um ponto de coleta",
        tags: ["Pontos de Coleta"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CollectionPointInput" },
            },
          },
        },
        responses: {
          200: { description: "Ponto de coleta atualizado com sucesso" },
          500: { description: "Erro ao atualizar ponto de coleta" },
        },
      },
      delete: {
        summary: "Remover um ponto de coleta",
        tags: ["Pontos de Coleta"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Ponto de coleta removido com sucesso" },
          500: { description: "Erro ao remover ponto de coleta" },
        },
      },
    },

    // === Relatórios de Impacto ===
    "/impact/reports": {
      post: {
        summary: "Criar um novo relatório de impacto",
        tags: ["Relatórios de Impacto"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ImpactReportInput" },
            },
          },
        },
        responses: {
          201: { description: "Relatório criado com sucesso" },
          500: { description: "Erro ao criar o relatório" },
        },
      },
    },
    "/impact/reports/{id}": {
      get: {
        summary: "Buscar um relatório por ID",
        tags: ["Relatórios de Impacto"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Relatório encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ImpactReport" },
              },
            },
          },
          500: { description: "Erro ao buscar o relatório" },
        },
      },
      put: {
        summary: "Atualizar um relatório existente",
        tags: ["Relatórios de Impacto"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ImpactReportInput" },
            },
          },
        },
        responses: {
          200: { description: "Relatório atualizado com sucesso" },
          500: { description: "Erro ao atualizar o relatório" },
        },
      },
      delete: {
        summary: "Remover um relatório por ID",
        tags: ["Relatórios de Impacto"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: { description: "Relatório deletado com sucesso" },
          500: { description: "Erro ao deletar o relatório" },
        },
      },
    },
    "/impact/global": {
      get: {
        summary: "Obter o total de alimentos salvos (kg)",
        tags: ["Relatórios de Impacto"],
        responses: {
          200: {
            description: "Total calculado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Impacto global calculado com sucesso",
                    },
                    totalSavedFoodKg: { type: "number", example: 3120.5 },
                  },
                },
              },
            },
          },
          500: { description: "Erro ao buscar o impacto global" },
        },
      },
    },
    "/impact/calculate": {
      post: {
        summary:
          "Calcular equivalência ambiental com base nos kg de alimentos salvos",
        tags: ["Relatórios de Impacto"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  savedFoodKg: { type: "number", example: 100 },
                },
                required: ["savedFoodKg"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Equivalência calculada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    savedFoodKg: { type: "number", example: 100 },
                    waterLiters: { type: "number", example: 100000 },
                    co2Kg: { type: "number", example: 100 },
                  },
                },
              },
            },
          },
          500: { description: "Erro ao calcular a equivalência" },
        },
      },
    },

    // === Notificações ===
    '/notification/getall': {
      get: {
        summary: 'Listar notificações e mensagens',
        tags: ['Notificações'],
        responses: {
          '200': {
            description: 'Notificações retornadas com sucesso',
          },
        },
      },
    },
    'notification/create': {
      post:{
        summary: 'Criar uma nova notificação',
        tags: ['Notificações'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NotificationEngagementInput' }
            },
          },
        },
        responses: {
          '201': { description: 'Busca por todas as notificações concluidada!' },
          '500': { description: 'Erro ao criar a notificação' },
        },
      },
    },
    '/notification/update/{id}': {
      put: {
        summary: 'Atualizar uma notificação existente',
        tags: ['Notificações'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: {
            type: 'integer'} },
        ],
        requestBody: {
          required: true,
          content: {
            'aplication/json': {
              schema: { $ref: '#/components/schemas/NotificationEngagementInput' }
            },
          },
        },
        responses: {
          '200': { description: 'Notificação atualizada com sucesso!' },
          '500': { description: 'Erro ao atualizar a notificação' },
        },
      },
    },
    '/notification/delete/{id}': {
      delete: {
        summary: 'Remove uma notificação por ID',
        tags: ['Notificações'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: {type: 'integer'} },
        ],
        responses: {
          '204': { description: 'Notificação deletada com sucesso' },
          '500': { description: 'Erro ao deletar notificação ' }
        },
      },
    },

    // === Doadores ===
    "/donors": {
      get: {
        summary: "Listar doadores cadastrados",
        tags: ["Doadores"],
        responses: {
          200: {
            description: "Lista de doadores retornada com sucesso",
          },
        },
      },
    },
    "/donors/register": {
      post: {
        summary: "Cadastrar novo doador",
        tags: ["Doadores"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/DonorInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Doador criado com sucesso",
          },
          500: {
            description: "Erro ao criar o doador",
          },
        },
      },
    },
    "/donors/{id}": {
      get: {
        summary: "Buscar doador por ID",
        tags: ["Doadores"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Doador encontrado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Donor" },
              },
            },
          },
          404: { description: "Doador não encontrado" },
        },
      },
      put: {
        summary: "Atualizar doador por ID",
        tags: ["Doadores"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DonorInput" },
            },
          },
        },
        responses: {
          200: { description: "Doador atualizado com sucesso" },
          500: { description: "Erro ao atualizar o doador" },
        },
      },
      delete: {
        summary: "Deletar doador por ID",
        tags: ["Doadores"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: { description: "Doador deletado com sucesso" },
          500: { description: "Erro ao deletar o doador" },
        },
      },
    },
  }, //essa é a chave de todas, do paths:

  components: {
    schemas: {
      Food: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          donorId: { type: "integer", example: 5 },
          collectionPointsId: { type: "integer", example: 2 },
          name: { type: "string", example: "Arroz Integral" },
          validity: {
            type: "string",
            format: "date-time",
            example: "2025-06-30T00:00:00Z",
          },
          quantity: { type: "integer", example: 10 },
          category: { type: "string", example: "Grãos" },
          description: {
            type: "string",
            example: "Pacotes de arroz integral 1kg",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T12:00:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T12:30:00Z",
          },
        },
      },
      FoodInput: {
        type: "object",
        required: [
          "donorId",
          "collectionPointsId",
          "name",
          "validity",
          "quantity",
          "category",
          "description",
        ],
        properties: {
          donorId: { type: "integer", example: 5 },
          collectionPointsId: { type: "integer", example: 2 },
          name: { type: "string", example: "Arroz Integral" },
          validity: {
            type: "string",
            format: "date-time",
            example: "2025-06-30T00:00:00Z",
          },
          quantity: { type: "integer", example: 10 },
          category: { type: "string", example: "Grãos" },
          description: {
            type: "string",
            example: "Pacotes de arroz integral 1kg",
          },
        },
      },

      Beneficiary: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "João da Silva" },
          email: { type: "string", example: "joao@email.com" },
          phone: { type: "string", example: "+244911223344" },
          address: { type: "string", example: "Rua das Flores, 123 - Luanda" },
          cpf: { type: "string", example: "123.456.789-00" },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T14:00:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T15:30:00Z",
          },
        },
      },
      BeneficiaryInput: {
        type: "object",
        required: ["name", "email", "phone", "address", "cpf"],
        properties: {
          name: { type: "string", example: "João da Silva" },
          email: { type: "string", example: "joao@email.com" },
          phone: { type: "string", example: "+244911223344" },
          address: { type: "string", example: "Rua das Flores, 123 - Luanda" },
          cpf: { type: "string", example: "123.456.789-00" },
        },
      },

      //collectionPoints:{
      //},

      ImpactReport: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          donorId: { type: "integer", example: 42 },
          title: { type: "string", example: "Campanha contra o desperdício" },
          description: { type: "string", example: "Doações do supermercado X" },
          savedFoodKg: { type: "number", example: 150.75 },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T14:22:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T14:30:00Z",
          },
        },
      },
      ImpactReportInput: {
        type: "object",
        properties: {
          donorId: { type: "integer", example: 42 },
          title: { type: "string", example: "Campanha contra o desperdício" },
          description: { type: "string", example: "Doações do supermercado X" },
          savedFoodKg: { type: "number", example: 150.75 },
        },
        required: ["donorId", "title", "description", "savedFoodKg"],
      },

      CollectionPoint: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          beneficiaryId: { type: "integer", example: 10 },
          campaigsAwarenessId: { type: "integer", example: 5 },
          name: { type: "string", example: "Ponto Central" },
          address: { type: "string", example: "Rua das Flores, 123" },
          phone: { type: "string", example: "(11) 98765-4321" },
          hoursOfOperetion: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T08:00:00Z",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T10:00:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T12:00:00Z",
          },
        },
      },
      CollectionPointInput: {
        type: "object",
        properties: {
          beneficiaryId: { type: "integer", example: 10 },
          campaigsAwarenessId: { type: "integer", example: 5 },
          name: { type: "string", example: "Ponto Central" },
          address: { type: "string", example: "Rua das Flores, 123" },
          phone: { type: "string", example: "(11) 98765-4321" },
          hoursOfOperetion: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T08:00:00Z",
          },
        },
        required: [
          "beneficiaryId",
          "campaigsAwarenessId",
          "name",
          "address",
          "phone",
          "hoursOfOperetion",
        ],
      },

      //pode adicionar mais schemas aqui em ordem da rotas
      // == Doadores ==
      Donor: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Supermercado Bom Preço" },
          email: { type: "string", example: "contato@bompreco.com" },
          phone: { type: "string", example: "+55 11 91234-5678" },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T14:22:00Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2025-05-21T14:30:00Z",
          },
        },
      },
      DonorInput: {
        type: "object",
        properties: {
          name: { type: "string", example: "Supermercado Bom Preço" },
          email: { type: "string", example: "contato@bompreco.com" },
          phone: { type: "string", example: "+55 11 91234-5678" },
        },
        required: ["name", "email", "phone"],
      },
    },
  },
};

export default swaggerDocument;
