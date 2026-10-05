export interface ToolInfo {
  id: string;
  name: string;
  category: string;
  targetLevel: string;
  recommendedAges: string;
  cost: string;
  tagline: string;
  description: string;
  whyWeUseIt: string;
  requirements: string[];
  platforms: {
    platform: string;
    url: string;
    label: string;
  }[];
  internalSimulator?: {
    path: string;
    label: string;
  };
  sampleMissions: {
    code: string;
    title: string;
    path: string;
  }[];
}

export const TOOLS_DATA: ToolInfo[] = [
  {
    id: "scratchjr",
    name: "ScratchJr",
    category: "Programación Visual Pre-lectores",
    targetLevel: "Semillas",
    recommendedAges: "4 a 6 años",
    cost: "100% Gratuito y de Código Abierto",
    tagline: "El lenguaje de bloques visuales para niños pequeños creado por el MIT y Tufts University.",
    description:
      "ScratchJr es una aplicación diseñada para que niños pequeños (incluso antes de aprender a leer) puedan crear sus propias historias interactivas y juegos. Al encajar bloques gráficos de colores (flechas, saltos, voz, giros), los niños aprenden a resolver problemas, diseñar proyectos y expresarse con tecnología.",
    whyWeUseIt:
      "En el Nivel Semillas (misiones S06 a S16) usamos ScratchJr porque los bloques no tienen texto escrito; usan iconos visuales grandes que los niños pueden arrastrar y tocar en una pantalla táctil.",
    requirements: [
      "Tableta Android (versión 4.4 o superior) o iPad (iOS 9.3 o superior)",
      "También funciona en Chromebooks y computadores (Windows/Mac) con el instalador de escritorio",
      "No requiere internet una vez descargada la aplicación",
    ],
    platforms: [
      {
        platform: "Android (Tabletas y Celulares)",
        url: "https://play.google.com/store/apps/details?id=org.scratchjr.android",
        label: "Descargar en Google Play",
      },
      {
        platform: "iPad / iOS",
        url: "https://apps.apple.com/app/scratchjr/id895485086",
        label: "Descargar en App Store",
      },
      {
        platform: "Computador (Windows / Mac)",
        url: "https://scratchjr.org",
        label: "Sitio Oficial ScratchJr.org",
      },
    ],
    internalSimulator: {
      path: "/scratch",
      label: "Probar Simulador de Bloques en la Web",
    },
    sampleMissions: [
      { code: "S06", title: "Mi primer personaje", path: "/misiones/s06-mi-primer-personaje" },
      { code: "S07", title: "Camina, salta y gira", path: "/misiones/s07-camina-salta-gira" },
      { code: "S08", title: "Cuando toco al gato", path: "/misiones/s08-cuando-toco-al-gato" },
      { code: "S10", title: "Dos amigos conversan", path: "/misiones/s10-dos-amigos-conversan" },
    ],
  },
  {
    id: "scratch",
    name: "Scratch 3.0",
    category: "Programación por Bloques",
    targetLevel: "Exploradores",
    recommendedAges: "7 a 9 años",
    cost: "100% Gratuito y Libre (MIT Media Lab)",
    tagline: "El entorno de programación creativa más popular del mundo.",
    description:
      "Desarrollado por el Lifelong Kindergarten Group del MIT Media Lab, Scratch permite crear videojuegos, animaciones musicales, cuentos y arte interactivo encajando bloques como piezas de LEGO.",
    whyWeUseIt:
      "En el Nivel Exploradores (misiones E01 a E20) es la herramienta principal: enseña bucles, condicionales («si... entonces»), variables de puntaje, coordenadas cartesianas X/Y y clonación de personajes sin frustraciones de sintaxis.",
    requirements: [
      "Cualquier computador, tableta o Chromebook con navegador web moderno",
      "Existe versión offline para instalar sin internet (Scratch Desktop)",
    ],
    platforms: [
      {
        platform: "Navegador Web (Online)",
        url: "https://scratch.mit.edu/projects/editor/",
        label: "Abrir Editor Oficial de Scratch",
      },
      {
        platform: "Instalador Offline (PC/Mac)",
        url: "https://scratch.mit.edu/download",
        label: "Descargar Scratch Desktop",
      },
    ],
    internalSimulator: {
      path: "/scratch",
      label: "Abrir Simulador de Bloques Integrado",
    },
    sampleMissions: [
      { code: "E01", title: "Hola, Scratch", path: "/misiones/e01-hola-scratch" },
      { code: "E04", title: "Muévete con flechas", path: "/misiones/e04-muevete-con-flechas" },
      { code: "E08", title: "Puntaje y variables", path: "/misiones/e08-puntaje" },
    ],
  },
  {
    id: "microbit",
    name: "BBC micro:bit & MakeCode",
    category: "Hardware & Robótica Educativa",
    targetLevel: "Inventores",
    recommendedAges: "10 a 12 años",
    cost: "Editor 100% Gratis en Línea (Placa física opcional)",
    tagline: "Un microcomputador de bolsillo con 25 LEDs, botones, brújula y sensores.",
    description:
      "La placa micro:bit fue creada por la BBC británica para enseñar robótica e internet de las cosas. Cuenta con una matriz de 25 bombillos LED rojos, dos botones táctiles A y B, acelerómetro para detectar movimientos o sacudidas, sensor de luz, temperatura y radio.",
    whyWeUseIt:
      "En el Nivel Inventores (misiones I17 a I20) conecta el código con el mundo físico: crear un podómetro, una brújula digital, un dado electrónico o un telégrafo por radio entre dos habitaciones.",
    requirements: [
      "Para programar: cualquier navegador web entrando a makecode.microbit.org",
      "Para usar en físico: placa BBC micro:bit v1 o v2 con cable Micro-USB (opcional pero muy recomendada)",
    ],
    platforms: [
      {
        platform: "Editor Oficial Microsoft MakeCode",
        url: "https://makecode.microbit.org",
        label: "Abrir MakeCode para micro:bit",
      },
      {
        platform: "Fundación Educativa Micro:bit",
        url: "https://microbit.org/es/",
        label: "Guías Oficiales en Español",
      },
    ],
    internalSimulator: {
      path: "/microbit",
      label: "Abrir Simulador Virtual 5×5 LED",
    },
    sampleMissions: [
      { code: "I17", title: "Mi primera placa", path: "/misiones/i17-mi-primera-placa" },
      { code: "I18", title: "Botones y luces", path: "/misiones/i18-botones-y-luces" },
      { code: "I19", title: "Sensores del entorno", path: "/misiones/i19-sensores" },
    ],
  },
  {
    id: "python",
    name: "Python 3",
    category: "Programación en Texto Real",
    targetLevel: "Creadores",
    recommendedAges: "13 a 17 años",
    cost: "100% Gratuito y de Código Abierto (PSF)",
    tagline: "El lenguaje profesional más usado en ciencia de datos, inteligencia artificial y desarrollo web.",
    description:
      "Python es el lenguaje que usan científicos de la NASA, ingenieros de Google y desarrolladores de todo el planeta. Su sintaxis es limpia, legible y casi idéntica a escribir en inglés estructurado.",
    whyWeUseIt:
      "En el Nivel Creadores (misiones C01 a C10) los jóvenes dan el salto de los bloques al código profesional escrito con teclado, creando juegos de consola, simuladores matemáticos y análisis de datos.",
    requirements: [
      "Computador con Windows, Mac o Linux",
      "Opcional: editor de código como Visual Studio Code o Thonny IDE",
    ],
    platforms: [
      {
        platform: "Sitio Oficial de Descarga",
        url: "https://www.python.org/downloads/",
        label: "Descargar Python Oficial",
      },
      {
        platform: "Editor Educativo Thonny",
        url: "https://thonny.org",
        label: "Descargar Thonny IDE (Recomendado)",
      },
    ],
    internalSimulator: {
      path: "/python",
      label: "Abrir Laboratorio Python en el Navegador",
    },
    sampleMissions: [
      { code: "C01", title: "Repaso rápido de Python", path: "/misiones/c01-repaso-rapido-de-python" },
      { code: "C04", title: "Funciones y módulos", path: "/misiones/c04-funciones-y-modulos" },
      { code: "C09", title: "Juego 2D", path: "/misiones/c09-juego-2d" },
    ],
  },
  {
    id: "code-org",
    name: "Code.org",
    category: "Cursos Guiados de Computación",
    targetLevel: "Pre-lectores y Familias",
    recommendedAges: "4 a 14 años",
    cost: "100% Gratuito (Fundación sin fines de lucro)",
    tagline: "Plataforma interactiva internacional con lecciones paso a paso para aprender lógica.",
    description:
      "Code.org es una iniciativa educativa global respaldada por educadores y científicos para democratizar las ciencias de la computación. Ofrece cursos estructurados con laberintos de personajes conocidos (Angry Birds, Minecraft, Frozen).",
    whyWeUseIt:
      "Es una alternativa excelente cuando una familia no puede instalar ScratchJr en su dispositivo móvil, pues el «Curso A para pre-lectores» funciona 100% dentro del navegador web.",
    requirements: [
      "Cualquier celular, tableta o computador con navegador web y conexión a internet",
    ],
    platforms: [
      {
        platform: "Curso para Pre-lectores (4-7 años)",
        url: "https://studio.code.org/s/coursea-2023",
        label: "Abrir Curso A de Code.org",
      },
      {
        platform: "Catálogo de Cursos",
        url: "https://code.org/student/elementary",
        label: "Explorar Cursos Primaria",
      },
    ],
    internalSimulator: {
      path: "/robot",
      label: "Probar Simulador de Boty en Nuestra Web",
    },
    sampleMissions: [
      { code: "S08", title: "Cuando toco al gato", path: "/misiones/s08-cuando-toco-al-gato" },
    ],
  },
  {
    id: "cs-unplugged",
    name: "CS Unplugged",
    category: "Ciencia de la Computación Sin Pantallas",
    targetLevel: "Familia y Escuelas",
    recommendedAges: "Todas las edades (5 a 99 años)",
    cost: "100% Libre y Gratuito (Creative Commons)",
    tagline: "Aprende algoritmos, redes y compresión usando lana, cartas, vasos y juegos corporales.",
    description:
      "CS Unplugged es un proyecto pedagógico pionero de la Universidad de Canterbury (Nueva Zelanda) que demuestra que las ideas más profundas de la informática se aprenden mejor manipulando objetos tangibles y moviendo el cuerpo en la sala o el patio.",
    whyWeUseIt:
      "Nuestra sección de Actividades Sin Pantalla se inspira en su metodología para que las familias compartan tiempo de calidad lejos del brillo de los celulares.",
    requirements: [
      "Objetos caseros: ovillos de lana, cartas, vasos, balanza, papel y lápiz",
      "¡Cero computadores o pantallas!",
    ],
    platforms: [
      {
        platform: "Portal Oficial en Español",
        url: "https://www.csunplugged.org/es/",
        label: "Visitar CSUnplugged.org",
      },
    ],
    internalSimulator: {
      path: "/desenchufado",
      label: "Ver Nuestras Actividades Sin Pantalla",
    },
    sampleMissions: [
      { code: "RED", title: "La red de hilo", path: "/desenchufado/red-de-hilo" },
      { code: "BAL", title: "Ordenar con la balanza", path: "/desenchufado/ordenar-con-la-balanza" },
    ],
  },
  {
    id: "trinket",
    name: "Trinket (Python & Web en el Navegador)",
    category: "Entorno de Ejecución Online Inmediato",
    targetLevel: "Creadores e Inventores",
    recommendedAges: "10 a 17 años",
    cost: "100% Gratuito (sin instalación obligatoria)",
    tagline: "Ejecuta Python 3, Turtle y páginas HTML/CSS/JS directamente en tu navegador sin instalar nada.",
    description:
      "Trinket es una plataforma educativa en la nube que permite escribir, ejecutar y compartir programas en Python y páginas web desde cualquier dispositivo (computador, Chromebook, tableta). Incluye soporte nativo para gráficos interactivos de Turtle, animaciones y consola de entrada/salida.",
    whyWeUseIt:
      "En las misiones de Creadores (C01 a C24) y en Inventores (I08 de Turtle), Trinket elimina la barrera técnica de instalar software: cualquier estudiante abre el enlace y su código corre al instante sin configuraciones complejas.",
    requirements: [
      "Cualquier computador, tableta o Chromebook con navegador web moderno",
      "Conexión a internet para cargar el entorno",
      "No requiere instalar nada ni permisos de administrador",
    ],
    platforms: [
      {
        platform: "Trinket Python 3 Online",
        url: "https://trinket.io/python3",
        label: "Abrir Trinket Python 3",
      },
      {
        platform: "Trinket HTML & Web",
        url: "https://trinket.io/html",
        label: "Abrir Trinket HTML5 / CSS / JS",
      },
      {
        platform: "Sitio Oficial Trinket",
        url: "https://trinket.io",
        label: "Visitar trinket.io",
      },
    ],
    internalSimulator: {
      path: "/python",
      label: "Abrir Laboratorio Python Integrado",
    },
    sampleMissions: [
      { code: "C01", title: "Repaso rápido de Python", path: "/misiones/c01-repaso-rapido-de-python" },
      { code: "I08", title: "La tortuga gráfica", path: "/misiones/inventores/i08-la-tortuga" },
      { code: "C11", title: "HTML: la estructura", path: "/misiones/c11-html-estructura" },
    ],
  },
  {
    id: "pydroid",
    name: "Pydroid 3 (Python en Celular Android)",
    category: "IDE Móvil Offline para Android",
    targetLevel: "Creadores e Inventores en Celular",
    recommendedAges: "11 a 17 años",
    cost: "Descarga Gratuita en Google Play Store",
    tagline: "El entorno educativo de Python 3 más completo y potente para smartphones y tabletas Android.",
    description:
      "Pydroid 3 es un entorno de desarrollo integrado (IDE) que ejecuta un intérprete real de Python 3.x de forma nativa en dispositivos Android, completamente offline y sin necesidad de internet constante. Incluye consola interactiva, depurador, soporte para gráficos, terminal y gestor de paquetes pip.",
    whyWeUseIt:
      "Permite que cualquier familia que no disponga de un computador de escritorio o laptop pueda completar al 100% las misiones de Python (I07-I16 y C01-C10) usando solo un teléfono celular o tableta Android.",
    requirements: [
      "Teléfono celular o tableta con sistema operativo Android 6.0 o superior",
      "Aproximadamente 250 MB de almacenamiento libre en el teléfono",
      "Recomendado (opcional): Teclado físico Bluetooth o USB-OTG para escribir cómodamente",
    ],
    platforms: [
      {
        platform: "Google Play Store (Android)",
        url: "https://play.google.com/store/apps/details?id=ru.iiec.pydroid3",
        label: "Descargar Pydroid 3 en Google Play",
      },
      {
        platform: "Manual y Comunidad Educativa",
        url: "https://pydroid.info",
        label: "Ver Guías de Pydroid",
      },
    ],
    internalSimulator: {
      path: "/python",
      label: "Abrir Laboratorio Python en el Navegador",
    },
    sampleMissions: [
      { code: "C01", title: "Repaso rápido de Python", path: "/misiones/c01-repaso-rapido-de-python" },
      { code: "I10", title: "Variables e inputs", path: "/misiones/inventores/i10-variables-y-entradas" },
      { code: "C08", title: "Gestor de tareas CLI", path: "/misiones/c08-gestor-de-tareas" },
    ],
  },
  {
    id: "vscode-web",
    name: "Visual Studio Code para la Web (vscode.dev)",
    category: "Editor Profesional en la Nube",
    targetLevel: "Creadores",
    recommendedAges: "12 a 17 años",
    cost: "100% Gratuito y de Código Abierto (Microsoft)",
    tagline: "El editor de código estándar de la industria mundial, funcionando 100% dentro de tu navegador.",
    description:
      "Visual Studio Code para la Web (vscode.dev) lleva la experiencia completa del editor más usado en el mundo directamente al navegador, sin instalar ningún ejecutable local. Ofrece coloreado de sintaxis, explorador de archivos locales, autocompletado y soporte para HTML, CSS, JavaScript y Markdown.",
    whyWeUseIt:
      "En las misiones de desarrollo web y frontend de Creadores (C11 a C24), permite trabajar con archivos reales en el disco de tu computador o tableta con la misma interfaz que usan los ingenieros en empresas de tecnología.",
    requirements: [
      "Navegador web moderno (Chrome, Edge, Firefox, Safari)",
      "Computador, Chromebook o tableta",
    ],
    platforms: [
      {
        platform: "VS Code Web Directo",
        url: "https://vscode.dev",
        label: "Abrir vscode.dev en el Navegador",
      },
      {
        platform: "Descarga de Escritorio (Opcional)",
        url: "https://code.visualstudio.com",
        label: "Descargar VS Code de Escritorio",
      },
    ],
    internalSimulator: {
      path: "/python",
      label: "Probar Laboratorio Integrado",
    },
    sampleMissions: [
      { code: "C11", title: "HTML: estructura semántica", path: "/misiones/c11-html-estructura" },
      { code: "C12", title: "CSS: estilos visuales", path: "/misiones/c12-css-estilo" },
      { code: "C18", title: "Proyecto: Mi propio sitio web", path: "/misiones/c18-proyecto-mi-sitio" },
    ],
  },
  {
    id: "python-tutor",
    name: "Python Tutor (Visualizador de Memoria y Variables)",
    category: "Visualizador Paso a Paso de Código",
    targetLevel: "Inventores y Creadores",
    recommendedAges: "10 a 17 años",
    cost: "100% Gratuito (Proyecto Abierto de Philip Guo / UC San Diego)",
    tagline: "Mira el interior de la computadora: ve cómo nacen las variables, punteros y listas paso a paso.",
    description:
      "Python Tutor es una herramienta pedagógica universitaria mundialmente reconocida creada por el profesor Philip Guo. Permite escribir un fragmento de código y avanzar paso a paso, viendo diagramas visuales exactos de la memoria RAM, los marcos de funciones y las referencias.",
    whyWeUseIt:
      "Ayuda a eliminar la confusión mental con listas mutables, ámbitos de variables locales/globales y bucles en misiones como C03 (listas y diccionarios) e I14 (listas en Python).",
    requirements: [
      "Cualquier navegador web en computador, tableta o celular con acceso a internet",
    ],
    platforms: [
      {
        platform: "Visualizador Online de Python",
        url: "https://pythontutor.com/visualize.html#mode=edit",
        label: "Abrir Python Tutor Online",
      },
      {
        platform: "Sitio Web Principal",
        url: "https://pythontutor.com",
        label: "Visitar pythontutor.com",
      },
    ],
    internalSimulator: {
      path: "/python",
      label: "Abrir Laboratorio Python Integrado",
    },
    sampleMissions: [
      { code: "C03", title: "Listas y diccionarios", path: "/misiones/c03-listas-y-diccionarios" },
      { code: "I14", title: "Listas en Python", path: "/misiones/inventores/i14-listas-en-python" },
      { code: "C07", title: "Buscar y ordenar", path: "/misiones/c07-buscar-y-ordenar" },
    ],
  },
  {
    id: "pocket-code",
    name: "Pocket Code (Catrobat)",
    category: "Programación Visual en Teléfonos Móviles",
    targetLevel: "Semillas e Inventores en Celular",
    recommendedAges: "8 a 14 años",
    cost: "100% Gratuito y de Código Abierto (Universidad de Graz)",
    tagline: "Crea tus propios videojuegos interactivos tipo Scratch directamente en la pantalla de tu celular.",
    description:
      "Pocket Code es una aplicación móvil desarrollada por el proyecto de investigación Catrobat en la Universidad Tecnológica de Graz (Austria). Permite programar juegos, animaciones y experimentos usando bloques inspirados en Scratch directamente desde la interfaz táctil del teléfono.",
    whyWeUseIt:
      "Ideal para familias que desean crear videojuegos táctiles interactivos de bloques cuando no tienen acceso a una computadora de escritorio para Scratch.",
    requirements: [
      "Teléfono inteligente Android o tableta",
      "Descarga libre desde Google Play Store o F-Droid",
    ],
    platforms: [
      {
        platform: "Google Play Store (Android)",
        url: "https://play.google.com/store/apps/details?id=org.catrobat.pocketcode",
        label: "Descargar Pocket Code en Google Play",
      },
      {
        platform: "Proyecto Oficial Catrobat",
        url: "https://www.catrobat.org",
        label: "Visitar catrobat.org",
      },
    ],
    internalSimulator: {
      path: "/scratch",
      label: "Abrir Laboratorio Scratch 3.0 en Línea",
    },
    sampleMissions: [
      { code: "E01", title: "Hola, Scratch", path: "/misiones/e01-hola-scratch" },
      { code: "I06", title: "Juego de plataformas", path: "/misiones/inventores/i06-juego-de-plataformas" },
    ],
  },
  {
    id: "freecodecamp",
    name: "freeCodeCamp en Español",
    category: "Currículo Interactivo Abierto y Certificaciones",
    targetLevel: "Creadores",
    recommendedAges: "13 años en adelante y Familias",
    cost: "100% Gratuito para siempre (Fundación sin fines de lucro 501(c)(3))",
    tagline: "Aprende desarrollo web, algoritmos y Python con miles de ejercicios interactivos en tu navegador.",
    description:
      "freeCodeCamp es una de las organizaciones educativas sin fines de lucro más grandes del mundo. Su plataforma ofrece miles de horas de ejercicios prácticos guiados de diseño web adaptable (HTML/CSS), algoritmos de JavaScript, Python científico y computación relacional.",
    whyWeUseIt:
      "En las etapas avanzadas de Creadores (misiones C11 a C24), sirve como banco complementario de ejercicios prácticos para reforzar conocimientos de maquetación web y programación estructurada sin costo alguno.",
    requirements: [
      "Navegador web moderno en cualquier dispositivo con conexión a internet",
      "Registro gratuito para guardar el avance de lecciones",
    ],
    platforms: [
      {
        platform: "Currículo en Español",
        url: "https://www.freecodecamp.org/espanol/learn",
        label: "Abrir freeCodeCamp en Español",
      },
      {
        platform: "Canal de YouTube en Español",
        url: "https://www.youtube.com/@freecodecampespanol",
        label: "Ver Cursos en Video de freeCodeCamp",
      },
    ],
    internalSimulator: {
      path: "/python",
      label: "Practicar en Nuestro Laboratorio Python",
    },
    sampleMissions: [
      { code: "C11", title: "HTML: estructura semántica", path: "/misiones/c11-html-estructura" },
      { code: "C13", title: "Diseño adaptable móvil", path: "/misiones/c13-disenar-para-celular" },
      { code: "C14", title: "JavaScript básico", path: "/misiones/c14-javascript-basico" },
    ],
  },
];
