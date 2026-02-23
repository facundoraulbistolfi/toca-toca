# Toca Toca

App web estilo casino para decidir a quien le toca, con una ruleta totalmente configurable, estadisticas persistentes y lista para GitHub Pages.

[![Version](https://img.shields.io/badge/version-v1.0.0-0a7f5a.svg)](./changelog.md)
[![Estado](https://img.shields.io/badge/estado-productiva-1f8f5f.svg)](./changelog.md)
[![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-informational.svg)](#tecnologias-usadas)

## Version actual

`v1.0.0` - primera version productiva.

## Autor y creditos

- Creado por [Facundo Bistolfi](https://github.com/facundoraulbistolfi).
- Desarrollado en colaboracion con [Codex (OpenAI)](https://openai.com/codex).

## Contacto

Canal oficial de contacto: **GitHub Issues publicos**.

- Reportar bug: [abrir issue de bug](https://github.com/facundoraulbistolfi/toca-toca/issues/new?template=bug-report.yml)
- Proponer idea: [abrir issue de mejora](https://github.com/facundoraulbistolfi/toca-toca/issues/new?template=idea.yml)

No compartas datos personales o sensibles en los issues.

## Tecnologias usadas

| Area | Tecnologia |
| --- | --- |
| Frontend | HTML5 + CSS3 + JavaScript (Vanilla) |
| Render ruleta | Canvas 2D API |
| Audio | Web Audio API |
| Persistencia config | Cookie (`tocaTocaConfig`) + `localStorage` fallback (`tocaTocaConfigFallback`) |
| Persistencia stats | `localStorage` (`tocaTocaSpinStats`) |
| Emojis | Unicode/CLDR catalog local (`emoji-catalog.js`) |
| Deploy | GitHub Pages + GitHub Actions |

## Lo que incluye v1.0.0

- Giro realista con desaceleracion y opcion de frenado por click.
- Duracion aleatoria configurable (`1` a `60` segundos).
- Personalizacion completa de ruleta:
  - disposicion de texto (`radial`, `tangencial`, `horizontal`)
  - posicion de texto, tamano y familia tipografica
  - modo de emoji en nombre (`inicio`, `final`, `ambos`, `ninguno`)
- Gestion avanzada de participantes:
  - nombre, emoji, color, porcentaje y animacion por participante
  - ocultar/mostrar sin borrar (`👁` / `🙈`)
  - se mantiene minimo de `2` participantes visibles
- Seccion de estadisticas (modal independiente):
  - ultimo en salir + estado de racha
  - racha mas larga
  - tabla acumulada por jugador
  - historial persistente entre sesiones
- Reset selectivo con scopes combinables:
  - configuracion
  - usuarios
  - historial
  - el reset de configuracion no modifica volumen
- Efectos visuales y sonoros:
  - luces en aro (standby/spin/winner)
  - audio de puntero y celebracion
  - multiples animaciones de victoria

## Estructura del repo

- `index.html`: estructura principal, panel lateral y modales
- `styles.css`: tema visual, layout responsive y componentes
- `app.js`: logica de ruleta, estado, persistencia, estadisticas y animaciones
- `emoji-catalog.js`: catalogo local de emojis (Unicode/CLDR)
- `scripts/generate-emoji-catalog.mjs`: script de regeneracion del catalogo
- `favicon.svg`: icono del sitio
- `changelog.md`: historial de versiones

## Ejecutar en local

No requiere build ni dependencias.

1. Abrir `index.html` directamente en el navegador.
2. O levantar servidor estatico:

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`.

## Regenerar catalogo de emojis

```bash
node scripts/generate-emoji-catalog.mjs
```

## Despliegue en GitHub Pages

1. Verificar workflow `.github/workflows/deploy-pages.yml`.
2. Hacer push de cambios a la rama de despliegue.
3. En GitHub: `Settings > Pages`.
4. En `Build and deployment`, seleccionar `Source: GitHub Actions`.

Con cada push, GitHub Actions publica automaticamente el sitio.
