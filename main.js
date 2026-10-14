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

// Categorías reales: crear el mapa comida -> categoría
const tiposPorComida = {
    Milanesa: 'Carne',
    Hamburguesa: 'Carne',
    Asado: 'Carne',
    Empanadas: 'Masa',
    Locro: 'Guiso',
    Chorizo: 'Carne',
    Humita: 'Masa',
    Matambre: 'Carne'
};

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

// dataset unificado incluyendo tipo
const foodData = comidas.map((nombre, index) => ({
    nombre,
    provincia: provincias[index],
    tipo: tiposPorComida[nombre] || 'Otras',
    personalizaciones: personalizaciones[nombre] || []
}));

const grid = document.getElementById('foodGrid');
const searchInput = document.getElementById('searchInput');
const typeSelect = document.getElementById('typeSelect');
const provinceSelect = document.getElementById('provinceSelect');
const input = document.getElementById('newFoodInput');
const btn = document.getElementById('addBtn');

function populateProvinceFilter() {
    // vaciar antes
    provinceSelect.innerHTML = '<option value="">Todas las provincias</option>';
    const provinciasUnicas = [...new Set(foodData.map((item) => item.provincia))];

    provinciasUnicas.forEach((provincia) => {
        const option = document.createElement('option');
        option.value = provincia;
        option.textContent = provincia;
        provinceSelect.appendChild(option);
    });
}

function populateTypeFilter() {
    // vaciar antes
    typeSelect.innerHTML = '<option value="">Todas las categorías</option>';
    const tiposUnicos = [...new Set(foodData.map((item) => item.tipo))];

    tiposUnicos.forEach((tipo) => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        typeSelect.appendChild(option);
    });
}

function crearTarjeta(nombre, provincia, tipo, opciones = []) {
    const box = document.createElement('div');
    box.className = 'food-box';

    const nombreEl = document.createElement('div');
    nombreEl.className = 'food-name';
    nombreEl.textContent = nombre;

    const tipoEl = document.createElement('div');
    tipoEl.className = 'tipo';
    tipoEl.textContent = tipo;

    const provinciaEl = document.createElement('div');
    provinciaEl.className = 'province';
    provinciaEl.textContent = provincia;

    const customDiv = document.createElement('div');
    customDiv.className = 'customization';

    // Mostrar entre 5 y 6 opciones: cortar a 6 y rellenar hasta 5 si hiciera falta
    const items = opciones.slice(0, 6);
    const genericCondiments = ['Salsa', 'Pan', 'Ensalada', 'Papas fritas', 'Limón'];
    while (items.length < 5) items.push(genericCondiments[items.length % genericCondiments.length]);

    items.forEach((opcion) => {
        const item = document.createElement('div');
        item.className = 'custom-item';
        item.textContent = opcion;
        customDiv.appendChild(item);
    });

    box.appendChild(nombreEl);
    box.appendChild(tipoEl);
    box.appendChild(provinciaEl);
    box.appendChild(customDiv);
    grid.appendChild(box);
}

function renderFoodCards() {
    const query = searchInput.value.trim().toLowerCase();
    const tipoSeleccionado = typeSelect ? typeSelect.value : '';
    const provinciaSeleccionada = provinceSelect ? provinceSelect.value : '';

    grid.innerHTML = '';

    const comidaFiltrada = foodData.filter(({ nombre, tipo, provincia }) => {
        const coincideBusqueda = nombre.toLowerCase().includes(query);
        const coincideTipo = !tipoSeleccionado || tipo === tipoSeleccionado;
        const coincideProvincia = !provinciaSeleccionada || provincia === provinciaSeleccionada;
        return coincideBusqueda && coincideTipo && coincideProvincia;
    });

    comidaFiltrada.forEach(({ nombre, provincia, tipo, personalizaciones: opciones }) => {
        crearTarjeta(nombre, provincia, tipo, opciones);
    });
}

// Inicializar selects y grilla
populateTypeFilter();
populateProvinceFilter();
renderFoodCards();

searchInput.addEventListener('input', renderFoodCards);
if (typeSelect) typeSelect.addEventListener('change', renderFoodCards);
provinceSelect.addEventListener('change', renderFoodCards);

btn.addEventListener('click', () => {
    const nuevoNombre = input.value.trim();
    if (!nuevoNombre) return;

    const provinciaAleatoria = provincias[Math.floor(Math.random() * provincias.length)] || 'Buenos Aires';
    const tipoDefecto = 'Otras';
    const nuevasPersonalizaciones = ['Papas fritas', 'Ensalada', 'Salsa', 'Pan', 'Limón'];

    const nueva = {
        nombre: nuevoNombre,
        provincia: provinciaAleatoria,
        tipo: tipoDefecto,
        personalizaciones: nuevasPersonalizaciones
    };

    foodData.push(nueva);

    // actualizar selects
    populateProvinceFilter();
    populateTypeFilter();

    input.value = '';
    input.focus();
    renderFoodCards();
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btn.click();
});
