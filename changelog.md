# Changelog

## Version actual: v0.0.1

Fecha de corte: 22 de febrero de 2026

## v0.0.1 - 2026-02-22

### Base del MVP

- Sitio estatico listo para ejecutar en local y publicar en GitHub Pages.
- Rula interactiva en canvas con giro por click/tap.
- Persistencia de configuracion por cookie (`tocaTocaConfig`) con fallback en `localStorage`.

### Ajustes de giro

- Duracion aleatoria configurable por rango minimo/maximo (`1..60` segundos).
- Curva de desaceleracion suave para finalizar sin salto abrupto.
- Posibilidad de cortar el giro con click mientras esta girando.

### Personalizacion de rula

- Disposicion de nombres configurable (radial, tangencial, horizontal).
- Posicion del texto en la seccion configurable.
- Tamano de fuente configurable.
- Selector de familia tipografica estilo casino.
- Modo de emoji en nombre configurable (inicio/final/ambos/ninguno).

### Participantes

- Edicion por fila: emoji, nombre, color, porcentaje, animacion, borrar.
- Limite de nombre por participante: `10` caracteres.
- Selector de color en modal: grilla por paletas, RGB y codigo hex.
- Selector de emoji en modal con secciones, busqueda y random.
- Catalogo completo de emojis basado en Unicode/CLDR, con nombres reales en espanol e ingles.
- Busqueda de emojis por texto parcial y tokens en ES/EN (incluye aliases oficiales).
- Dataset local `emoji-catalog.js` para uso offline y script de regeneracion oficial.
- Selector de animacion por participante:
  - puede heredar la animacion general
  - o usar una animacion particular
- Nuevo toggle de visibilidad por participante (`👁` / `🙈`):
  - permite ocultarlo de la rula sin borrarlo
  - si esta oculto, no participa del sorteo ni puede ganar
  - su porcentaje queda bloqueado
  - se exige minimo de 2 participantes visibles

### Animaciones y efectos al ganar

- Selector general de animaciones con emoji + nombre.
- Efectos disponibles: aleatorio, lluvia clasica, lluvia extrema, manguera, fuegos artificiales, carta blanca, rebote emoji, confeti, estrellas y pulso neon.
- Sonido de pulso del puntero durante el giro.
- Sonido de aplausos/ovacion al finalizar.

### UI/UX

- Panel lateral de configuracion y modal de informacion.
- Ajustes visuales para tema casino/madera y mejoras de contraste.
- Ensanche del panel de configuracion para acomodar controles extra por participante.
