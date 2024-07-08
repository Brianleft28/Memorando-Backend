import request from 'supertest';
import app from '../src/server.js';

const nuevaSecretaria = {
    nombre: 'Secretaria de Salud TEST',
};

/*
 * Test the index route
 */
describe('/secretarias routes', () => {
    describe('GET /secretarias', () => {
        // Deberia responder con un codigo de estado 200
        test('should respond with a 200 status code', async () => {
            const response = await request(app).get('/api/v1/secretarias');
            expect(response.statusCode).toBe(200);
        }),
            // Deberia responder con un objeto
            test('response should be an object', async () => {
                const response = await request(app).get('/api/v1/secretarias');
                expect(typeof response.body).toBe('object');
            });
    });

    /**
     * testeando la post routa
     */

    describe('POST /secretarias', () => {
        test('should respond with a 200 status code', async () => {
            const response = await await request(app)
                .post('/api/v1/secretarias')
                .send(nuevaSecretaria);
            expect(response.statusCode).toBe(200);
        });
        test('response should be an object', async () => {
            const response = await request(app)
                .post('/api/v1/secretarias')
                .send(nuevaSecretaria);
            expect(typeof response.body).toBe('object');
        });
        // Deberia responder con un mensaje de error
        test('response should be an sql msg', async () => {
            const response = await await request(app)
                .post('/api/v1/secretarias')
                .send({ name: 'Secretaria de Salud TEST' });

            expect(response.body.code.sqlMessage).toBe(
                "Unknown column 'name' in 'field list'"
            );
        });

        test('Error response must be an object if i have error', async () => {
            const response = await await request(app)
                .post('/api/v1/secretarias')
                .send({ name: 'Secretaria de Salud TEST' });
            expect(typeof response.body).toBe('object');
        });
        // Accede al mensaje de error del primer objeto de errores
        test('Error response must be an Array', async () => {
            const response = await await request(app)
                .post('/api/v1/secretarias')
                .send({ name: 'Secretaria de Salud TEST' });

            if (response.body.errors && response.body.errors.length > 0) {
                expect(response.body.errors[0].msg).toBe(
                    'Error en la base de datos.'
                );
            } else {
                // Fail the test if errors array does not exist or is empty
                throw new Error(
                    'Expected errors array not found in response body'
                );
            }
        });
    });
});
