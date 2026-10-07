const comidas = [
    'Milanesa',
    'Hamburguesa',
    'Asado',
    'Empanadas',
    'Locro',
    'Chorizo',
    'Humita',
    'Matambre'
];

const provincias = [
    'Salta',
    'Santa Fe',
    'San Luis',
    'Mendoza',
    'Entre Ríos',
    'Córdoba',
    'Chubut',
    'Misiones'
];

const personalizaciones = {
    Milanesa: ['Con limón', 'A la napolitana', 'Con papas'],
    Hamburguesa: ['Con queso', 'Simple', 'Doble'],
    Asado: ['Con cuero', 'Sin grasa', 'Con chimichurri'],
    Empanadas: ['De carne', 'De queso', 'Verdura'],
    Locro: ['Tradicional', 'Picante', 'Con chorizo'],
    Chorizo: ['A la parrilla', 'Casero', 'Ahumado'],
    Humita: ['Salada', 'Dulce', 'En chala'],
    Matambre: ['Asado', 'Enrollado', 'Frío']
};

const grid = document.getElementById('foodGrid');

comidas.forEach((comida, index) => {
    const box = document.createElement('div');
    box.className = 'food-box';

    const nombre = document.createElement('div');
    nombre.className = 'food-name';
    nombre.textContent = comida;

    const provincia = document.createElement('div');
    provincia.className = 'province';
    provincia.textContent = provincias[index];

    const customDiv = document.createElement('div');
    customDiv.className = 'customization';

    personalizaciones[comida].forEach((opcion) => {
        const item = document.createElement('div');
        item.className = 'custom-item';
        item.textContent = opcion;
        customDiv.appendChild(item);
    });

    box.appendChild(nombre);
    box.appendChild(provincia);
    box.appendChild(customDiv);
    grid.appendChild(box);
});