# 👨‍👩‍👧‍👦 Código en Familia — Plataforma Educativa de Programación Familiar & Pensamiento Computacional

Plataforma web interactiva diseñada para que **niños, niñas, jóvenes y sus familias aprendan programación, robótica, pensamiento computacional y creatividad digital juntos**, desde las primeras etapas sin pantallas hasta código real en Python.

Combina pedagogías activas (Montessori computacional, construccionismo de Seymour Papert y aprendizaje basado en retos) con simuladores interactivos en el navegador, minijuegos cooperativos y materiales imprimibles.

---

## 🌟 Rutas de Aprendizaje por Etapas de Desarrollo

### 🌱 1. Semillas (4 a 6 años) — Pensamiento Lógico & Sin Pantallas
* **Fundamentos Computacionales:** Algoritmos secuenciales, patrones espaciales y causa-efecto.
* **Actividades Desenchufadas (*Unplugged*):** Juegos de mesa, tapetes de dirección y retos de motricidad sin dispositivos electrónicos.
* **Simulador del Robot Amigable:** Movimientos paso a paso en cuadrícula (adelante, atrás, giro 90°).

### 🔍 2. Exploradores (7 a 9 años) — Programación por Bloques & Scratch
* **Lógica Visual en Bloques:** Bucles (`for`/`while`), condicionales (`if`/`else`), eventos de teclado/ratón y variables.
* **Scratch Sandbox Integrado:** Entorno embebido para crear historias animadas interactivas y minijuegos cooperativos.
* **Traductor de Código Binario:** Desmitificación del 0 y el 1 mediante matrices de píxeles y decodificación de mensajes secretos.

### 🎨 3. Creadores (10 a 12 años) — Robótica & Hardware Virtual
* **Simulador de BBC micro:bit:** Matriz LED 5x5, acelerómetro simulado, brújula digital, botones A/B y sensores de temperatura y luz.
* **Proyectos de Automatización Doméstica:** Alarmas para la habitación, podómetros para caminatas familiares y dados digitales.
* **Minijuegos de Creadores:** Retos de lógica booleana y diseño de mecánicas de juego en tiempo real.

### 🚀 4. Inventores (13+ años y Adultos) — Python Real & Aplicaciones
* **Python Playground In-Browser:** Ejecución de código Python real sin configuraciones locales complejas.
* **Estructuras de Datos & Algoritmos:** Listas, diccionarios, funciones modulares, recursión y manipulación de texto.
* **Proyectos de Impacto Familiar:** Gestores de tareas del hogar, calculadoras de ahorro y bots conversacionales sencillos.

---

## 🛠️ Herramientas, Simuladores & Recursos Integrados

* 🎲 **Ruleta de Retos Familiares (`/ruleta`):** Generador de actividades cooperativas sorpresa de 15 minutos para desconectar y compartir tiempo de calidad.
* 🤖 **Simulador de micro:bit (`/microbit`):** Programación y testeo de código para microcontroladores directamente en pantalla.
* 🐱 **Scratch Sandbox (`/scratch`):** Lienzo de animación y lógica visual.
* 🐍 **Playground de Python (`/python`):** Consola interactiva con retroalimentación inmediata.
* 📄 **Pasaportes y Certificados en PDF:** Descargas listas para imprimir de pasaportes de progreso, tarjetas de desafío y diplomas de graduación.
* 🎓 **Portal para Educadores & Guías de Adultos:** Pautas pedagógicas para acompañar a los niños sin frustraciones técnicas.

---

## 🛠️ Stack Tecnológico

* **Framework Web:** Next.js (App Router con Turbopack).
* **Lenguaje:** TypeScript / JavaScript moderno.
* **Efectos & Movimiento:** Animaciones fluidas inspiradas en principios Montessori, Web Audio API para efectos de sonido táctiles.
* **Estilizado:** Tailwind CSS con diseño responsivo accesible y paleta cromática de alta calidez.
* **Base de Datos & ORM:** PostgreSQL / SQLite con Prisma ORM.
* **Despliegue & Contenedores:** Docker, Docker Compose y CasaOS.

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
* Node.js 20+ y npm.
* Git.

```bash
# 1. Clonar el repositorio
git clone https://github.com/jjairocj/codigoenfamilia.git
cd codigoenfamilia

# 2. Instalar dependencias
npm install

# 3. Inicializar base de datos Prisma
npx prisma generate

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para comenzar las misiones familiares.

---

## 🐳 Despliegue con Docker

El proyecto incluye configuración completa para despliegue productivo en servidores locales o domésticos (ej. CasaOS):

```bash
# Construir y levantar el contenedor
docker compose up -d --build
```

El servicio se expondrá en el puerto configurado (ej. `3200` en producción CasaOS).

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
