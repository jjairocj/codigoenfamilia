# Fix unescaped quotes in InventoresGames.tsx
with open('src/components/minigames/InventoresGames.tsx', 'r') as f:
    text = f.read()

text = text.replace(
    '{i14Slice ? "Resultado del slice: [\\"🍌\\", \\"🍇\\"] ⭐" : "[\\"🍎\\", \\"🍌\\", \\"🍇\\", \\"🍊\\"]"}',
    "{i14Slice ? 'Resultado del slice: [🍌, 🍇] ⭐' : '[🍎, 🍌, 🍇, 🍊]'}"
)

# Also check for other quotes inside JSX text:
text = text.replace(
    'evalúa la condición: <code>if temp &gt; 25: \\"Calor\\" else: \\"Fresco\\"</code>',
    'evalúa la condición: <code>if temp &gt; 25: \'Calor\' else: \'Fresco\'</code>'
)

with open('src/components/minigames/InventoresGames.tsx', 'w') as f:
    f.write(text)

# Check ExploradoresGames.tsx
with open('src/components/minigames/ExploradoresGames.tsx', 'r') as f:
    exp_text = f.read()

exp_text = exp_text.replace(
    '⚠️ \\"¡Ganaste un millón de monedas! Haz clic aquí y escribe tu contraseña\\".',
    '⚠️ ¡Ganaste un millón de monedas! Haz clic aquí y escribe tu contraseña.'
)
exp_text = exp_text.replace(
    '✅ \\"Recuerda la tarea de matemáticas para mañana\\".',
    '✅ Recuerda la tarea de matemáticas para mañana.'
)
exp_text = exp_text.replace(
    'Haz un \\"Remix\\" del juego ajustando la velocidad a 2x o 3x:',
    'Haz un Remix del juego ajustando la velocidad a 2x o 3x:'
)

with open('src/components/minigames/ExploradoresGames.tsx', 'w') as f:
    f.write(exp_text)

# Check CreadoresGames.tsx
with open('src/components/minigames/CreadoresGames.tsx', 'r') as f:
    cre_text = f.read()

cre_text = cre_text.replace(
    '&gt;&gt;&gt; print(\\"¡Hola, familia programadora!\\")',
    '&gt;&gt;&gt; print(\'¡Hola, familia programadora!\')'
)
cre_text = cre_text.replace(
    '\\"{c02Text}\\" → Longitud: {c02Text.length} caracteres',
    "'{c02Text}' → Longitud: {c02Text.length} caracteres"
)
cre_text = cre_text.replace(
    'with open(\\"diario.txt\\", \\"w\\") as f: f.write(\\"Día 1\\")',
    "with open('diario.txt', 'w') as f: f.write('Día 1')"
)
cre_text = cre_text.replace(
    'git commit -m \\"feat: minijuego\\"',
    "git commit -m 'feat: minijuego'"
)
cre_text = cre_text.replace(
    'PR #12: \\"Agregar soporte para modo oscuro\\"',
    "PR #12: 'Agregar soporte para modo oscuro'"
)
cre_text = cre_text.replace(
    '🎯 \\"Explícame cómo funciona un bucle for en Python con una analogía para un niño de 8 años\\".',
    "🎯 Explícame cómo funciona un bucle for en Python con una analogía para un niño de 8 años."
)
cre_text = cre_text.replace(
    '\\"Haz un bucle\\".',
    "'Haz un bucle'."
)

with open('src/components/minigames/CreadoresGames.tsx', 'w') as f:
    f.write(cre_text)

# Check SemillasGames.tsx
with open('src/components/minigames/SemillasGames.tsx', 'r') as f:
    sem_text = f.read()

sem_text = sem_text.replace(
    '\\"{s15Questions[s15Index].text}\\"',
    "'{s15Questions[s15Index].text}'"
)

with open('src/components/minigames/SemillasGames.tsx', 'w') as f:
    f.write(sem_text)

print('All quote sanitization completed successfully!')
