# Codex Context - Toca Toca

Estado: activo  
Ultima actualizacion: 2026-02-24  
Version de referencia: `v1.2.0`

Este documento es la fuente de contexto para Codex en tareas de producto y mantenimiento.  
Objetivo: evitar releer todo el repo en cada sesion y preservar decisiones ya tomadas.

## 1) Producto (definicion actual)

### Objetivo
- App web tipo ruleta/casino para decidir "a quien le toca" con experiencia visual fuerte.
- Debe funcionar sin backend y sin build: HTML/CSS/JS vanilla.
- Debe poder usarse localmente y en GitHub Pages.

### Publico objetivo
- Uso casual en grupos/equipos (dinamicas, turnos, decisiones rapidas).

### No objetivos actuales
- Sin sistema de cuentas ni backend.
- Sin perfiles (feature removida en `v1.2.0`).
- Sin "modo ronda" activo (se dejo temporalmente fuera para repensar UX).

## 2) Decisiones cerradas (no reabrir sin pedirlo)

- Seccion separada de `Participantes` y acciones generales en `Configuracion`.
- Carga masiva de participantes via modal con dos modos: agregar o reemplazar.
- Importar/exportar con alcance seleccionable: `configuracion` y/o `estadisticas`.
- En estadisticas:
- `Ultimas salidas`: mostrar 10 y colapsado por defecto.
- Tabla acumulada: mostrar 5 filas por defecto con "Ver mas".
- Changelog en modal de informacion: colapsado por defecto.
- Boton `Igualar porcentajes` como accion principal de participantes.

## 3) Invariantes de negocio (criticos)

- Minimo `2` participantes visibles para poder girar.
- Maximo `20` participantes (`MAX_PARTICIPANTS`).
- Nombre de participante truncado a `10` caracteres (`MAX_PARTICIPANT_NAME_LENGTH`).
- Participante oculto (`hidden=true`) no entra en sorteo y no puede ganar.
- Si se oculta/rehabilita un participante, se normalizan porcentajes sin romper minimos.
- Precision de porcentaje en unidades de `0.01%`:
- `TOTAL_UNITS = 10000` representa `100.00%`.
- `MIN_ITEM_UNITS = 1` representa `0.01%` minimo por participante visible.
- Duracion de giro:
- rango permitido `1..60` segundos.
- default `20..40` segundos.
- Historial de giros capado a `500` entradas.
- "Tira otra vez" (retry slice), si esta activo, consume parte del 100% de la rueda.

## 4) Contrato de persistencia

### Claves
- Config principal por cookie: `tocaTocaConfig`
- Fallback config en localStorage: `tocaTocaConfigFallback`
- Estadisticas: `tocaTocaSpinStats`
- Historial de giros: `tocaTocaSpinHistory`

### Versiones
- Config: `version = 1`
- Stats store: `version = 3`
- Spin history: `version = 1`

### Prioridad de carga
1. Cookie (`tocaTocaConfig`)
2. localStorage fallback (`tocaTocaConfigFallback`)
3. `defaultState()`

### Compatibilidad/migraciones activas
- Config legacy con `spinDurationSec` migra a `spinDurationMinSec`/`spinDurationMaxSec`.
- Imports legacy con `profiles` / `profilesStore` se leen y migran a estado unico.
- Stats legacy con `byProfile` se migran priorizando bucket `default` (si existe).
- `roundMode` se sanea pero operativamente se fuerza a comportamiento normal.

## 5) Contrato de import/export

### Formato de export actual
- JSON con:
- `version: 2`
- `kind: "custom_backup"`
- `exportedAt` (timestamp)
- `options.includeConfig` / `options.includeStats`
- `config` (si corresponde)
- `statsStore` y `spinHistory` (si corresponde)

### Politica de import
- Si se marca `config`, intenta leer:
- `parsed.config`
- o payload legacy de perfiles
- o payload que "parece config" por campos conocidos.
- Si se marca `stats`, intenta leer:
- `statsStore` o `stats`
- `spinHistory` o `history`
- Si no hay datos importables en el alcance elegido, se rechaza.

## 6) UX y estilo (lineamientos para cambios futuros)

- Mantener estetica casino/madera y coherencia visual de botones de accion.
- Usar emoji en botones cuando aporte claridad.
- Mantener responsive para mobile y desktop.
- Corregir siempre tooltips/overflow antes de cerrar UI work.
- Respetar toggle de reducir animaciones (`reduceMotion`) en efectos.

## 7) Checklist minimo de regresion antes de merge

1. Girar con >=2 visibles y validar ganador.
2. Ocultar/mostrar participantes y validar redistribucion de porcentajes.
3. `Igualar porcentajes` con distintos conteos de visibles.
4. Exportar e importar:
5. solo configuracion,
6. solo estadisticas,
7. ambos.
8. Reset por scope:
9. configuracion,
10. usuarios,
11. historial,
12. combinados.
13. Stats: ultimo ganador, racha, mejor racha, acumulado, ultimas salidas.
14. Con `reduceMotion=true`, validar degradacion de animaciones.

## 8) Backlog y preguntas abiertas

- Reintroducir o redisenar "modo ronda" (si vuelve, definir reglas exactas).
- Definir si "retry slice" queda como feature estable o experimental.
- Evaluar si mantener cookie + localStorage o migrar solo a localStorage.
- Definir limite/product policy para crecimiento de animaciones y complejidad visual.

## 9) Regla operativa para Codex

- Cuando una tarea implique decision de producto no explicitada:
1. respetar este documento primero,
2. luego `README.md` y `changelog.md`,
3. y por ultimo el comportamiento actual del codigo.
- Si hay conflicto entre docs, pedir confirmacion del usuario antes de cambiar comportamiento.
