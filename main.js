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
    Milanesa: ['Papas fritas', 'Ensalada mixta', 'Salsa tártara', 'Limón', 'Mayonesa'],
    Hamburguesa: ['Papas fritas', 'Queso cheddar', 'Salsa BBQ', 'Cebolla caramelizada', 'Mayonesa', 'Ketchup'],
    Asado: ['Chimichurri', 'Salsa criolla', 'Provoleta', 'Papas al horno', 'Ensalada rusa', 'Pan con manteca'],
    Empanadas: ['Salsa picante', 'Ají molido', 'Salsa chimichurri', 'Ensalada', 'Limón'],
    Locro: ['Chorizo', 'Panceta', 'Ají molido', 'Cebolla de verdeo', 'Pan casero'],
    Chorizo: ['Chimichurri', 'Salsa criolla', 'Pan', 'Ensalada', 'Mostaza', 'Ketchup'],
    Humita: ['Crema', 'Queso rallado', 'Ensalada', 'Salsa de tomate', 'Ají molido'],
    Matambre: ['Ensalada mixta', 'Papas', 'Chimichurri', 'Mostaza', 'Aceite y vinagre']
};

const foodData = comidas.map((nombre, index) => ({
    nombre,
    provincia: provincias[index],
    personalizaciones: personalizaciones[nombre] || []
}));

const grid = document.getElementById('foodGrid');
const searchInput = document.getElementById('searchInput');
const provinceSelect = document.getElementById('provinceSelect');
const input = document.getElementById('newFoodInput');
const btn = document.getElementById('addBtn');

function populateProvinceFilter() {
    const provinciasUnicas = [...new Set(foodData.map((item) => item.provincia))];

    provinciasUnicas.forEach((provincia) => {
        const option = document.createElement('option');
        option.value = provincia;
        option.textContent = provincia;
        provinceSelect.appendChild(option);
    });
}

function crearTarjeta(nombre, provincia, opciones = []) {
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

    // Ensure we show only 5 or 6 options. If the source has more, slice; if fewer, show what's available.
    const items = opciones.slice(0, 6);

    // If there are less than 5, try to pad with generic condimentos until 5 (rare case)
    const genericCondiments = ['Salsa', 'Pan', 'Ensalada', 'Papas fritas', 'Limón'];
    while (items.length > 0 && items.length < 5) {
        items.push(genericCondiments[items.length % genericCondiments.length]);
    }

    items.forEach((opcion) => {
        const item = document.createElement('div');
        item.className = 'custom-item';
        item.textContent = opcion;
        customDiv.appendChild(item);
    });

    box.appendChild(nombreEl);
    box.appendChild(provinciaEl);
    box.appendChild(customDiv);
    grid.appendChild(box);
}

function renderFoodCards() {
    const query = searchInput.value.trim().toLowerCase();
    const provinciaSeleccionada = provinceSelect.value;

    grid.innerHTML = '';

    const comidaFiltrada = foodData.filter(({ nombre, provincia }) => {
        const coincideBusqueda = nombre.toLowerCase().includes(query);
        const coincideProvincia = !provinciaSeleccionada || provincia === provinciaSeleccionada;
        return coincideBusqueda && coincideProvincia;
    });

    comidaFiltrada.forEach(({ nombre, provincia, personalizaciones: opciones }) => {
        crearTarjeta(nombre, provincia, opciones);
    });
}

populateProvinceFilter();
renderFoodCards();

searchInput.addEventListener('input', renderFoodCards);
provinceSelect.addEventListener('change', renderFoodCards);

btn.addEventListener('click', () => {
    const nuevoNombre = input.value.trim();

    if (nuevoNombre.length > 0) {
        const provinciasDisponibles = provincias.filter((provincia) => {
            return !foodData.some((comida) => comida.provincia === provincia && comida.nombre === nuevoNombre);
        });

        const provinciaAleatoria = provinciasDisponibles[Math.floor(Math.random() * provinciasDisponibles.length)] || 'Buenos Aires';

        // Default new personalizations are common condimentos/acompañamientos
        const nuevasPersonalizaciones = ['Papas fritas', 'Ensalada', 'Salsa', 'Pan', 'Limón'];

        foodData.push({
            nombre: nuevoNombre,
            provincia: provinciaAleatoria,
            personalizaciones: nuevasPersonalizaciones
        });

        personalizaciones[nuevoNombre] = nuevasPersonalizaciones;

        input.value = '';
        input.focus();
        renderFoodCards();
    }
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btn.click();
    }
});
