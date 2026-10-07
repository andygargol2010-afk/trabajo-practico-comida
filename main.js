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
const input = document.getElementById('newFoodInput');
const btn = document.getElementById('addBtn');

function crearTarjeta(nombre, provincia) {
    const box = document.createElement('div');
    box.className = 'food-box';

    const nombreEl = document.createElement('div');
    nombreEl.className = 'food-name';
    nombreEl.textContent = nombre;

    const provinciaEl = document.createElement('div');
    provinciaEl.className = 'province';
    provinciaEl.textContent = provincia;

    const customDiv = document.createElement('div');
    customDiv.className = 'customization';

    if (personalizaciones[nombre]) {
        personalizaciones[nombre].forEach((opcion) => {
            const item = document.createElement('div');
            item.className = 'custom-item';
            item.textContent = opcion;
            customDiv.appendChild(item);
        });
    }

    box.appendChild(nombreEl);
    box.appendChild(provinciaEl);
    box.appendChild(customDiv);
    grid.appendChild(box);
}

comidas.forEach((comida, index) => {
    crearTarjeta(comida, provincias[index]);
});

btn.addEventListener('click', () => {
    const nuevoNombre = input.value.trim();
    
    if (nuevoNombre.length > 0) {
        const provinciasDisponibles = provincias.filter(p => {
            return !Array.from(grid.children).some(box => {
                const prov = box.querySelector('.province');
                return prov && prov.textContent === p;
            });
        });
        
        const provinciaAleatoria = provinciasDisponibles[Math.floor(Math.random() * provinciasDisponibles.length)] || 'Buenos Aires';
        
        crearTarjeta(nuevoNombre, provinciaAleatoria);
        input.value = '';
        input.focus();
    }
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btn.click();
    }
});