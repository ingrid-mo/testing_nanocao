const request = require("supertest");
const server = require("../index");

describe('Probando entrada de dato', () => {
    it("Obteniendo un 200 y un arreglo con al menos un objeto", async () => {
        const response = await request(server).get("/cafes1"); // Corregir aquí
        const status = response.statusCode;
        const cafes = response.body;
        expect(status).toBe(200);
        expect(cafes).toBeInstanceOf(Object)
    });
});

describe('Probando eliminación de café con ID inexistente', () => {
    it("Obteniendo un 404", async () => {
        const idInexistente = 5; 
        const response = await request(server).delete(`/cafes${idInexistente}`); // Corregir aquí
        const status = response.statusCode;
        expect(status).toBe(404);
    });
});

describe('Probando la creación de un nuevo café', () => {
    it("Obteniendo un 201 y el café agregado", async () => {
        const nuevoCafe = {
            id: "nuevo_id", 
            nombre: "Café Nuevo",
        };
        const response = await request(server)
            .post("/cafes") // Corregir aquí
            .send(nuevoCafe);

        const status = response.statusCode;
        expect(status).toBe(201);

        const cafeAgregado = response.body.find(cafe => cafe.id === nuevoCafe.id);
        expect(cafeAgregado).toEqual(expect.objectContaining(nuevoCafe));
    });
});

describe("Operaciones CRUD de cafés", () => {
    it("Actualizando un café con ID diferente en los parámetros", async () => {
        const cafe = { id: "2", nombre: "Café Actualizado" }

        const response = await request(server)
            .put(`/cafes${cafe.id}`) // Corregir aquí
            .send(cafe);

        const status = response.statusCode;
        expect(status).toBe(400); 

        expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
    });
});
