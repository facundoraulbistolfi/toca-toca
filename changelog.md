# Changelog

## Versión actual: v1.3.0

Fecha de corte: 24 de febrero de 2026

## v1.3.0 - 2026-02-24

### Internacionalización (i18n)

- Nuevo selector de idioma en `Configuración` con soporte para `es`, `en` y `pt-BR`.
- Primera visita: detección automática por idioma del navegador con fallback a `es`.
- Preferencia de idioma persistida en cookie + `localStorage` e incluida en backups de configuración.
- Compatibilidad retroactiva para backups legacy sin campo de idioma.

### Experiencia y personalización

- Header de la ruleta configurable por el usuario.
- Ajustes de textos y etiquetas para mantener consistencia entre idiomas.

## v1.2.0 - 2026-02-24

### Producto y UX

- Se eliminó la feature de perfiles para simplificar el flujo y evitar solapamiento con importar/exportar.
- Se eliminó el modo de ronda temporalmente para repensar la experiencia.
- Nueva sección dedicada de `Participantes` y mejor distribución de acciones generales en `Configuración`.
- La lista de participantes ahora usa scroll interno y conserva su posición al editar/ocultar.

### Participantes y sorteo

- Carga masiva mediante botón y modal con dos modos:
  - agregar a la lista actual
  - reemplazar toda la lista
- Ajustes en porcentajes para evitar inconsistencias al ocultar/mostrar participantes.
- Se agregó opción `🎲 Aleatorio` en animación particular por participante.

### Configuración y respaldo

- Importar/exportar con opciones de alcance:
  - incluir configuración
  - incluir estadísticas
- Acciones de respaldo movidas al final de configuraciones.
- Duración por defecto del giro actualizada a `20..40` segundos.

### Estadísticas e información

- Se eliminó la sección `Frecuencia vs esperado`.
- `Últimas salidas` pasa a mostrar 10 y queda colapsado por defecto.
- La tabla acumulada muestra 5 por defecto con opción de expandir.
- El changelog dentro del modal de información ahora abre colapsado por defecto.

### UI visual y accesibilidad

- Tooltips corregidos para evitar recortes en botones de acciones.
- Botones de acciones de participantes unificados como iconos con tooltip.
- Control de reducir animaciones con toggle `🐇 vs 🐢` y correcciones de layout para evitar desplazamientos del modal.
- Ajustes tipográficos y ortográficos generales (tildes y textos visibles).

## v1.1.0 - 2026-02-23

### UI y experiencia

- Botones flotantes superiores unificados visualmente con iconos emoji consistentes.
- Tooltips visuales al pasar cursor por botones flotantes (configuración, sonido, estadísticas, información).
- Botones principales de participantes alineados en color/estilo (agregar, igualar porcentajes, restablecer).

### Contacto e información

- Sección `Contacto` integrada en el modal de `Información`.
- Flujo público de contacto vía GitHub Issues:
  - `Reportar bug` (template)
  - `Proponer idea` (template)
  - `Ver issues abiertos`
- Aviso de privacidad visible para evitar compartir datos sensibles en issues públicos.

### Changelog y contenido

- El modal de información ahora carga el changelog directamente desde `changelog.md`.
- El bloque de changelog en el modal es scrolleable para evitar crecimiento infinito.
- Changelog movido al final del modal de información.

### Configuración de participantes

- Nuevo botón `⚖️ Igualar porcentajes` para distribuir en forma pareja los porcentajes de participantes visibles.
- Se agregaron validaciones de habilitación/estado según cantidad mínima visible y giro en curso.

### Animaciones

- Nueva variante de animación de cartas `Carta blanca (Classic)` con física tipo FreeCell:
  - menos cartas, más grandes
  - rebotes contra bordes/fondo
  - rastro de movimiento
- Ajustes de nomenclatura e iconos:
  - `🃏 Carta blanca`
  - `🤴 Carta blanca (Classic)`
- Mejora de cara de carta con rango/palo en esquinas superior e inferior.

## v1.0.0 - 2026-02-23

### Lanzamiento productivo

- Primera versión productiva publicada.

## v0.0.1 - 2026-02-22

### Base del MVP

- Sitio estático listo para ejecutar en local y publicar en GitHub Pages.
- Rula interactiva en canvas con giro por click/tap.
- Persistencia de configuración por cookie (`tocaTocaConfig`) con fallback en `localStorage`.

### Ajustes de giro

- Duración aleatoria configurable por rango mínimo/máximo (`1..60` segundos).
- Curva de desaceleración suave para finalizar sin salto abrupto.
- Posibilidad de cortar el giro con click mientras está girando.

### Personalización de rula

- Disposición de nombres configurable (radial, tangencial, horizontal).
- Posición del texto en la sección configurable.
- Tamaño de fuente configurable.
- Selector de familia tipográfica estilo casino.
- Modo de emoji en nombre configurable (inicio/final/ambos/ninguno).

### Participantes

- Edición por fila: emoji, nombre, color, porcentaje, animación, borrar.
- Límite de nombre por participante: `10` caracteres.
- Selector de color en modal: grilla por paletas, RGB y código hex.
- Selector de emoji en modal con secciones, búsqueda y random.
- Catálogo completo de emojis basado en Unicode/CLDR, con nombres reales en español e inglés.
- Búsqueda de emojis por texto parcial y tokens en ES/EN (incluye aliases oficiales).
- Dataset local `emoji-catalog.js` para uso offline y script de regeneración oficial.
- Selector de animación por participante:
  - puede heredar la animación general
  - o usar una animación particular
- Nuevo toggle de visibilidad por participante (`👁` / `🙈`):
  - permite ocultarlo de la rula sin borrarlo
  - si está oculto, no participa del sorteo ni puede ganar
  - su porcentaje queda bloqueado
  - se exige mínimo de 2 participantes visibles

### Animaciones y efectos al ganar

- Selector general de animaciones con emoji + nombre.
- Efectos disponibles: aleatorio, lluvia clásica, lluvia extrema, manguera, fuegos artificiales, carta blanca, rebote emoji, confeti, estrellas y pulso neón.
- Sonido de pulso del puntero durante el giro.
- Sonido de aplausos/ovación al finalizar.

### UI/UX

- Panel lateral de configuración y modal de información.
- Ajustes visuales para tema casino/madera y mejoras de contraste.
- Ensanche del panel de configuración para acomodar controles extra por participante.
