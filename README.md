# Toca Toca

App web estilo casino para decidir a quien le toca, con una rula totalmente configurable y lista para GitHub Pages.

## Version

- Version actual: `v0.0.1`

## Funcionalidades principales

- Giro realista de la rula con desaceleracion suave.
- Giro al click/tap sobre la rula y opcion de frenarla con otro click.
- Duracion aleatoria configurable por rango (`1` a `60` segundos).
- Personalizacion de texto en la rula:
  - disposicion (`radial`, `tangencial`, `horizontal`)
  - posicion del texto en la seccion
  - tamano de fuente
  - familia tipografica estilo casino
  - modo de emoji en nombre (`inicio`, `final`, `ambos`, `ninguno`)
- Configuracion por participante:
  - nombre (maximo `10` caracteres)
  - emoji (selector modal + busqueda + random)
  - color (modal con paletas, RGB, hex y random)
  - porcentaje de la seccion
  - animacion de ganador por participante (o usar animacion general)
  - visibilidad en rula (`👁`/`🙈`) sin borrar de la lista
- Reglas de visibilidad:
  - participantes ocultos no entran en el giro ni pueden ganar
  - si estan ocultos, su porcentaje queda bloqueado
  - se mantiene minimo de `2` participantes visibles
- Efectos visuales y sonoros:
  - luces neon en el borde de la rula (standby/spin/winner)
  - audio de pulso en puntero y aplausos al ganar
  - multiples animaciones de victoria (incluye modo aleatorio)
- Persistencia local por navegador:
  - cookie principal `tocaTocaConfig`
  - fallback en `localStorage`

## Estructura

- `index.html`: estructura principal y modales
- `styles.css`: tema visual, layout responsive y estilos de componentes
- `app.js`: logica de giro, configuracion, persistencia y animaciones
- `emoji-catalog.js`: catalogo oficial local (Unicode/CLDR) con nombres ES/EN y aliases de busqueda
- `scripts/generate-emoji-catalog.mjs`: generador del catalogo a partir de fuentes oficiales
- `favicon.svg`: icono de pestaña
- `changelog.md`: historial de cambios

## Regenerar catalogo de emojis

Para actualizar el catalogo local:

```bash
node scripts/generate-emoji-catalog.mjs
```

## Ejecucion local

No requiere build ni dependencias.

1. Abrir `index.html` directamente en el navegador.
2. O levantar un servidor estatico:

```bash
python3 -m http.server 8080
```

Luego abrir `http://localhost:8080`.

## Despliegue en GitHub Pages

1. Asegurar que exista el workflow `.github/workflows/deploy-pages.yml`.
2. Hacer push de tus cambios a la rama `main`.
3. Ir a `Settings > Pages` en GitHub.
4. En `Build and deployment`, seleccionar:
   - `Source: GitHub Actions`
5. Guardar.

En cada push a `main`, GitHub Actions publicara automaticamente el sitio.
