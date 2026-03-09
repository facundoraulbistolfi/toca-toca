# Toca Toca

App web estilo casino para decidir a quién le toca, con una ruleta totalmente configurable, estadísticas persistentes y lista para GitHub Pages.

## Probar la ruleta online

URL pública: [https://facundoraulbistolfi.github.io/toca-toca/](https://facundoraulbistolfi.github.io/toca-toca/)

[![Versión](https://img.shields.io/badge/version-v1.3.1-0a7f5a.svg)](./changelog.md)
[![Estado](https://img.shields.io/badge/estado-productiva-1f8f5f.svg)](./changelog.md)
[![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-informational.svg)](#tecnologías-usadas)

## Versión actual

`v1.3.1`

## Idiomas

- La app incluye selector de idioma en Configuración: `es`, `en` y `pt-BR`.
- Primera visita: detecta idioma del navegador (fallback `es`).
- Persistencia: guarda idioma en cookie + `localStorage`, y tambien en backups de configuracion.
- Backups legacy sin `language`: mantienen fallback de compatibilidad en `es`.

## Autor y créditos

- Creado por [Facundo Bistolfi](https://github.com/facundoraulbistolfi).
- Desarrollado en colaboración con [Codex (OpenAI)](https://openai.com/codex).

## Contacto

Canal oficial de contacto: **GitHub Issues públicos**.

- Reportar bug: [abrir issue de bug](https://github.com/facundoraulbistolfi/toca-toca/issues/new?template=bug-report.yml)
- Proponer idea: [abrir issue de mejora](https://github.com/facundoraulbistolfi/toca-toca/issues/new?template=idea.yml)

No compartas datos personales o sensibles en los issues.

## Tecnologías usadas

| Área | Tecnología |
| --- | --- |
| Frontend | HTML5 + CSS3 + JavaScript (Vanilla) |
| Render ruleta | Canvas 2D API |
| Audio | Web Audio API |
| Persistencia config | Cookie (`tocaTocaConfig`) + `localStorage` fallback (`tocaTocaConfigFallback`) |
| Persistencia stats | `localStorage` (`tocaTocaSpinStats`) |
| Emojis | Unicode/CLDR catálogo local (`emoji-catalog.js`) |
| Deploy | GitHub Pages + GitHub Actions |

## Lineamientos de UI

- Los botones de acción deben mantener estilo visual unificado en paleta madera.
- Cada botón debe incluir un emoji descriptivo cuando sea posible, sin sacrificar claridad del texto.

## Lo que incluye la app

- Giro realista con desaceleración y opción de frenado por click.
- Duración aleatoria configurable (`1` a `60` segundos).
- Personalización completa de ruleta:
  - disposición de texto (`radial`, `tangencial`, `horizontal`)
  - posición de texto, tamaño y familia tipográfica
  - modo de emoji en nombre (`inicio`, `final`, `ambos`, `ninguno`)
- Gestión avanzada de participantes:
  - nombre, emoji, color, porcentaje y animación por participante
  - ocultar/mostrar sin borrar (`👁` / `🙈`)
  - se mantiene mínimo de `2` participantes visibles
- Sección de estadísticas (modal independiente):
  - último en salir + estado de racha
  - racha más larga
  - tabla acumulada por jugador
  - historial persistente entre sesiones
- Reset selectivo con scopes combinables:
  - configuración
  - usuarios
  - historial
  - el reset de configuración no modifica volumen
- Efectos visuales y sonoros:
  - luces en aro (standby/spin/winner)
  - audio de puntero y celebración
  - múltiples animaciones de victoria

## Estructura del repo

- `index.html`: estructura principal, panel lateral y modales
- `styles.css`: tema visual, layout responsive y componentes
- `app.js`: lógica de ruleta, estado, persistencia, estadísticas y animaciones
- `emoji-catalog.js`: catálogo local de emojis (Unicode/CLDR)
- `scripts/generate-emoji-catalog.mjs`: script de regeneración del catálogo
- `favicon.svg`: ícono del sitio
- `docs/codex-context.md`: contexto persistente para decisiones de producto y técnica
- `changelog.md`: historial de versiones

## Ejecutar en local

No requiere build ni dependencias.

1. Abrir `index.html` directamente en el navegador.
2. O levantar servidor estático:

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`.

## Regenerar catálogo de emojis

```bash
node scripts/generate-emoji-catalog.mjs
```

## Despliegue en GitHub Pages

1. Verificar workflow `.github/workflows/deploy-pages.yml`.
2. Hacer push de cambios a la rama de despliegue.
3. En GitHub: `Settings > Pages`.
4. En `Build and deployment`, seleccionar `Source: GitHub Actions`.

Con cada push, GitHub Actions publica automáticamente el sitio.
