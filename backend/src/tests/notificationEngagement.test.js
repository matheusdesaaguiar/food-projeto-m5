// Importa o supertest para simular requisições HTTP às rotas da aplicação
import request from 'supertest';
// Importa o servidor Express (o app principal da sua aplicação)
import app from '../server.js';

/**
 * 🔒 MOCK DO SERVICE
 * Aqui simulamos o arquivo `NotificationEngagement.service.js`
 * para não usar o banco de dados real durante os testes.
 * Em vez disso, usamos funções assíncronas falsas (mockadas).
 */
jest.mock('../services/NotificationEngagement.service.js', () => ({
  /**
   * Simula a criação de uma notificação. 
   * Retorna os mesmos dados recebidos, com um id fake.
   */
  createNotification: jest.fn().mockImplementation(async (data) => {
    return {
      id: 'fake-id',
      ...data,
    };
  }),

  /**
   * Simula a busca de todas as notificações.
   * Retorna um array com um item de exemplo.
   */
  getAllNotifications: jest.fn().mockImplementation(async () => {
    return [
      {
        id: '1',
        foodId: '123',
        beneficiaryId: '456',
        notificationType: 'ALERT',
        updateAt: new Date().toISOString()
      }
    ];
  }),

  /**
   * Simula a atualização de uma notificação.
   * Retorna os novos dados com o id fornecido.
   */
  updateNotification: jest.fn().mockImplementation(async (id, data) => {
    return {
      id,
      ...data
    };
  }),

  /**
   * Simula a exclusão de uma notificação.
   * Retorna "true" indicando que a exclusão foi bem-sucedida.
   */
  deleteNotification: jest.fn().mockImplementation(async () => {
    return true;
  })
}));

/**
 * 🧪 SUITE DE TESTES DAS ROTAS DE NOTIFICAÇÃO
 * Aqui testamos todas as rotas do controller de notificação.
 */
describe('Rotas de Notification', () => {

  /**
   * Testa a criação de uma notificação (POST)
   */
  it('POST /notification/create - deve criar uma notificação com sucesso', async () => {
    const payload = {
      foodId: '123',
      beneficiaryId: '456',
      notificationType: 'ALERT'
    };

    const response = await request(app)
      .post('/notification/create')
      .send(payload);

    expect(response.statusCode).toBe(201); // Deve retornar status 201 Created
    expect(response.body).toHaveProperty('notification'); // Deve ter campo "notification"
    expect(response.body.notification).toMatchObject(payload); // Dados devem bater com os enviados
  });

  /**
   * Testa a listagem de todas as notificações (GET)
   */
  it('GET /notification/getall - deve retornar lista de notificações', async () => {
    const response = await request(app).get('/notification/getall');

    expect(response.statusCode).toBe(200); // Status OK
    expect(response.body).toHaveProperty('notifications'); // Deve conter campo "notifications"
    expect(Array.isArray(response.body.notifications)).toBe(true); // Deve ser um array
  });

  /**
   * Testa a atualização de uma notificação (PUT)
   */
  it('PUT /notification/update/:id - deve atualizar uma notificação', async () => {
    const payload = {
      foodId: '789',
      beneficiaryId: '999',
      notificationType: 'REMINDER',
      updateAt: new Date().toISOString()
    };

    const response = await request(app)
      .put('/notification/update/fake-id') // ID fake usado no mock
      .send(payload);

    expect(response.statusCode).toBe(200); // Status OK
    expect(response.body).toHaveProperty('update'); // Deve conter campo "update"
    expect(response.body.update).toMatchObject(payload); // Dados atualizados devem bater
  });

  /**
   * Testa a exclusão de uma notificação (DELETE)
   */
  it('DELETE /notification/delete/:id - deve deletar uma notificação', async () => {
    const response = await request(app).delete('/notification/delete/fake-id');

    expect(response.statusCode).toBe(200); // Status OK
    expect(response.body.message).toBe('Notificação deletada com sucesso!'); // Mensagem esperada
  });
});
