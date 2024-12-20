// Definición de la clase CardGenerator que extiende de HTMLElement para crear un Web Component
class CardGenerator extends HTMLElement {
    // Constructor de la clase donde inicializamos el componente
    constructor() {
        // Llamamos al constructor de la clase padre (HTMLElement)
        super();
        // Creamos el Shadow DOM en modo 'open' para encapsular el contenido
        this.attachShadow({ mode: 'open' });
        
        // Definimos el HTML y CSS del componente usando template literals
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos generales para el componente */
                :host {
                    display: block;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                /* Estilos del contenedor principal */
                .container {
                    padding: 20px;
                    background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 25%, #fad0c4 50%, #a18cd1 75%, #fbc2eb 100%);
                    background-size: 400% 400%;
                    animation: gradientBG 15s ease infinite;
                    min-height: 100vh;
                    width: 100%;
                    box-sizing: border-box;
                    position: relative;
                    overflow: hidden;
                }

                /* Animación del fondo de gradiente */
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* Estilos del formulario de creación de tarjeta */
                .form-container {
                    background: rgba(255, 255, 255, 0.95);
                    padding: 30px 20px;
                    border-radius: 20px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                    margin-bottom: 20px;
                    animation: slideDown 0.5s ease-out;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                    border: 3px solid transparent;
                    background-image: linear-gradient(white, white), 
                                    linear-gradient(45deg, #ff6b6b, #ffd93d, #6c5ce7, #a8e6cf);
                    background-origin: border-box;
                    background-clip: content-box, border-box;
                    position: relative;
                    z-index: 2;
                }
    
                /* Estilos del título del formulario */
                .title {
                    text-align: center;
                    font-size: 2em;
                    margin-bottom: 30px;
                    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6c5ce7, #a8e6cf);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: titleGradient 3s infinite;
                    padding: 10px;
                    position: relative;
                    z-index: 2;
                }

                /* Animaciones del título */
                .title::after {
                    content: '✨';
                    position: absolute;
                    right: -30px;
                    animation: bounce 1s infinite;
                }


                .title::before {
                    content: '✨';
                    position: absolute;
                    left: -30px;
                    animation: bounce 1s infinite reverse;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                /* Animación del título con el gradiente */
                @keyframes titleGradient {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }

                /* Estilos de los grupos de campos del formulario */
                .form-group {
                    margin-bottom: 15px;
                    padding: 0 15px;
                    position: relative;
                }
                .form-group:first-child {
                    margin-top: 15px;
                }

                /* Estilos para los inputs y textareas */
                input, textarea {
                    width: calc(100% - 20px);
                    padding: 10px;
                    border: 2px solid #e0e0e0;
                    border-radius: 12px;
                    font-size: 15px;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.9);
                }

                /* Estilos para inputs y textareas al recibir foco */
                input:focus, textarea:focus {
                    border-color: #6c5ce7;
                    box-shadow: 0 0 15px rgba(108, 92, 231, 0.3);
                    outline: none;
                    transform: translateY(-2px);
                }

                textarea {
                    height: 80px;
                    resize: vertical;
                }

                /* Estilo del botón de agregar tarjeta */
                .add-btn {
                    background: linear-gradient(45deg, #ff6b6b, #ffd93d);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    display: block;
                    margin: 40px auto 20px auto;
                    position: relative;
                    overflow: hidden;
                }

                 /* Animación del botón de agregar tarjeta */
                .add-btn::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
                    transform: rotate(45deg);
                    animation: shine 3s infinite;
                }

                /* Animación para el brillo del botón */
                @keyframes shine {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) rotate(45deg); }
                }

                .add-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 20px rgba(255, 107, 107, 0.4);
                }

                /* Estilos de la caja donde se muestran las tarjetas */
                .cards-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 25px;
                    padding: 20px 0;
                    position: relative;
                    z-index: 1;
                }

                /* Estilos para las tarjetas */
                .card {
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    animation: fadeIn 0.5s ease-out;
                    border: 2px solid transparent;
                    background-image: linear-gradient(white, white), 
                    inear-gradient(45deg, #ff6b6b, #ffd93d, #6c5ce7, #a8e6cf);
                    background-origin: border-box;
                    background-clip: content-box, border-box;
                    position: relative;
                    z-index: 2;
                }

                /* Animación y efectos hover para las tarjetas */
                .card:hover {
                    transform: translateY(-10px) scale(1.02);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.2);
                }

                /* Estilos para la imagen de la tarjeta */
                .card-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-bottom: 3px solid #ffd93d;
                }

                /* Estilos para el contenido de la tarjeta */
                .card-content {
                    padding: 20px;
                    text-align: center;
                }

                /* Estilos para el título de la tarjeta */
                .card-title {
                    font-size: 1.5em;
                    color: #6c5ce7;
                    margin-bottom: 10px;
                    font-family: 'Georgia', serif;
                }

                /* Estilos para la descripción de la tarjeta */
                .card-description {
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 15px;
                    text-align: left;
                }

                /* Estilos del botón de eliminar tarjeta */
                .delete-btn {
                    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    display: block;
                    margin: 0 auto;
                }

                /* Animación para el botón de eliminar tarjeta */
                .delete-btn:hover {
                    background: linear-gradient(45deg, #ff8e8e, #ff6b6b);
                    transform: scale(1.05);
                    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
                }

                /* Estilos para la animación de confeti */
                .confetti-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    pointer-events: none;
                    z-index: 1;
                }

                /* Animación de caída de confeti */
                .confetti {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background-color: var(--color);
                    animation: confetti-fall var(--fall-duration) linear forwards;
                }

                @keyframes confetti-fall {
                    0% {
                        transform: translateY(-20px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(var(--fall-distance)) rotate(360deg);
                        opacity: 0;
                    }
                }

                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(20px) scale(0.9); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes slideDown {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            </style>

            <div class="container">
                 <!-- Formulario para generar la tarjeta -->
                <div class="confetti-container"></div>
                <h1 class="title">✨ Generador de Tarjetas ✨</h1>
                
                <div class="form-container">
                    <div class="form-group">
                        <input type="text" id="imageUrl" placeholder="URL de la imagen" required>
                    </div>
                    <div class="form-group">
                        <input type="text" id="title" placeholder="Título de la tarjeta" required>
                    </div>
                    <div class="form-group">
                        <textarea id="description" placeholder="Descripción" required></textarea>
                    </div>
                    <button class="add-btn">✨ Crear Tarjeta ✨</button>
                </div>

                <!-- Contenedor para las tarjetas generadas -->
                <div class="cards-container"></div>
            </div>
        `;

        // Acciones para crear y eliminar tarjetas
        // Aquí vinculamos los métodos a la instancia del componente para asegurarnos de que
        // las funciones mantengan el contexto de "this" cuando sean llamadas desde otros lugares.
        this.addCard = this.addCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.createConfetti = this.createConfetti.bind(this);
    }

    connectedCallback() {
    // Este método se ejecuta cuando el componente es insertado en el DOM.
    // Se usa para agregar el comportamiento de eventos, en este caso, al botón de añadir.
        this.shadowRoot.querySelector('.add-btn').addEventListener('click', async () => {
        // Cuando se hace clic en el botón, se llama al método addCard de manera asincrónica.
             const success = await this.addCard();
        // Si la tarjeta se agrega correctamente, generamos confeti.
        if (success) {
            this.createConfetti();
        }
    });
    }

    createConfetti() {
    // Array de colores para los fragmentos de confeti
            const colors = ['#ff6b6b', '#ffd93d', '#6c5ce7', '#a8e6cf', '#ff8e8e'];
    // Seleccionamos el contenedor de confeti y el contenedor de tarjetas desde el shadow DOM.
            const confettiContainer = this.shadowRoot.querySelector('.confetti-container');
            const cardsContainer = this.shadowRoot.querySelector('.cards-container');
    
    // Calculamos la altura del contenedor de tarjetas y establecemos la altura del contenedor de confeti.
            const cardsHeight = cardsContainer.getBoundingClientRect().height;
            const containerHeight = Math.max(cardsHeight, window.innerHeight / 2);
            confettiContainer.style.height = `${containerHeight}px`;

    // Creamos 50 fragmentos de confeti con diferentes colores y propiedades.
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
        
        // Asignamos una posición aleatoria en el eje X
            confetti.style.left = `${Math.random() * 100}%`;
            
        // Definimos la duración y distancia de caída de cada fragmento de confeti de manera aleatoria.
            const duration = Math.random() * 1.5 + 1;
            confetti.style.setProperty('--fall-duration', `${duration}s`);
            confetti.style.setProperty('--fall-distance', `${containerHeight}px`);
        // Asignamos un color aleatorio a cada fragmento de confeti.
            confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        
        // Agregamos el confeti al contenedor de confeti.
            confettiContainer.appendChild(confetti);

        // Después de que la animación de caída termine, eliminamos el confeti del DOM.
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }

    // Método para agregar tarjeta
    async addCard() {
        // Obtenemos los valores de los campos de entrada desde el shadow DOM.
        const imageUrl = this.shadowRoot.getElementById('imageUrl').value;
        const title = this.shadowRoot.getElementById('title').value;
        const description = this.shadowRoot.getElementById('description').value;

        // Si alguno de los campos está vacío, mostramos una alerta y retornamos false.
        if (!imageUrl || !title || !description) {
            alert('Por favor complete todos los campos');
            return false;
        }

        // Creamos un nuevo elemento 'div' que representa una tarjeta.
        const card = document.createElement('div');
        card.className = 'card';
        // Establecemos el contenido HTML de la tarjeta, incluyendo la imagen, el título y la descripción.
        card.innerHTML = `
            <img src="${imageUrl}" alt="${title}" class="card-image">
            <div class="card-content">
                <h2 class="card-title"> ${title} </h2>
                <p class="card-description">${description}</p>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;
    
        // Asociamos un evento para eliminar la tarjeta cuando se haga clic en el botón "Eliminar".
        card.querySelector('.delete-btn').addEventListener('click', () => this.deleteCard(card));
        // Añadimos la tarjeta al contenedor de tarjetas en el shadow DOM.
        this.shadowRoot.querySelector('.cards-container').appendChild(card);

        // Limpiamos los campos de entrada después de agregar la tarjeta.
        this.shadowRoot.getElementById('imageUrl').value = '';
        this.shadowRoot.getElementById('title').value = '';
        this.shadowRoot.getElementById('description').value = '';

        await new Promise(resolve => setTimeout(resolve, 50));
        return true;
    }

    // Método para eliminar tarjeta
    deleteCard(card) {
        // Aplicamos una animación para que la tarjeta se desvanezca antes de eliminarla.
        card.style.animation = 'fadeIn 0.5s ease-out reverse';
         // Después de 0.5 segundos (durante la animación), eliminamos la tarjeta del DOM.
        setTimeout(() => card.remove(), 500);
    }
}

// Registro del componente 
customElements.define('card-generator', CardGenerator);