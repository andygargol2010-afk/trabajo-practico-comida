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
    'Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza',
    'La Pampa', 'Tucumán', 'Salta', 'Neuquén',
    'Chubut', 'Río Negro', 'San Juan', 'Entre Ríos',
    'Corrientes', 'Misiones', 'Catamarca', 'Santiago del Estero',
    'Jujuy', 'Formosa', 'La Rioja', 'San Luis'
];

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const provinciasMezcladas = shuffle(provincias).slice(0, comidas.length);
const grid = document.getElementById('foodGrid');

comidas.forEach((comida, idx) => {
    const box = document.createElement('div');
    box.className = 'food-box';
    box.innerHTML = `
        <div class="food-name">${comida}</div>
        <div class="province">${provinciasMezcladas[idx]}</div>
    `;
    grid.appendChild(box);
});