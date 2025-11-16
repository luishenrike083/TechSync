// Caminho: js/services/api.js
const BASE_URL = 'http://localhost:3000';

export async function create(resource, data) {
    const url = `${BASE_URL}/${resource}`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
}