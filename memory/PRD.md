# Vargas y Zúñiga Abogados — Sitio Corporativo

## Problema original
Rediseño completo del sitio web del estudio jurídico www.vargasyzuniga.cl con un diseño elegante, fluido, serio, agradable y "moderno-clásico" usando los colores de marca #486c7c (primario, petróleo) y #5c5c5c (secundario, gris) para sorprender a los clientes.

## Decisiones del usuario
- **Bilingüe**: español e inglés (toggle ES/EN persistente)
- **Sin formulario de contacto ni agendamiento** (se embeberá un chat externo más adelante)
- **Paleta**: #486c7c primario, #5c5c5c secundario, con libertad de degradados y acentos. Acento dorado moderado (#B69A7A) y base marfil/papel (#FBFBF9 / #F4F1EA)
- **Contenido**: extraído del sitio actual

## Arquitectura

### Stack
- Frontend: React 19 + React Router + Tailwind 3 + Framer/CSS-only animations
- Tipografía: Cormorant Garamond (serif editorial) + Outfit (sans moderna) + JetBrains Mono (overlines)
- Backend: FastAPI + MongoDB (sin modificar – starter por defecto)
- i18n: Context propio con persistencia en `localStorage` (clave `vyz-lang`)

### Estructura de páginas (SPA)
1. **Hero** (#top) — fondo cordillera Andes, "Justicia y deber" / "Justice and Duty"
2. **Sobre el estudio** (#estudio) — filosofía, 3 pilares, 3 stats
3. **Áreas de práctica** (#areas) — acordeón con I/II/III (Personas y Empresas, Litigios, Solicitudes ante el Estado)
4. **Equipo** (#equipo) — bios completas de Alejandro G. Vargas Casas y Mónica P. Zúñiga Lillo
5. **Contacto** (#contacto) — dirección, teléfono, correos, horarios (sin formulario, integrado con footer)

### Componentes clave
- `Header` — sticky con glass-morphism al scrollear
- `LanguageToggle` — pill animada ES/EN
- `FloatingChat` — FAB inferior derecho con modal placeholder (espera chat embebido del cliente)

## Implementado (Jan 2026)
- ✅ Sitio completo bilingüe ES/EN
- ✅ Hero con tipografía editorial y palabras animadas
- ✅ Sección filosofía con pilares (Rigor, Confianza, Resultados) y estadísticas (20+ años, 7.000+ procesos, 3 áreas)
- ✅ Acordeón de áreas de práctica con 25 sub-áreas distribuidas en 3 categorías
- ✅ Tarjetas de equipo con portrait, tags de especialización y bio completa
- ✅ Sección de contacto oscura con dirección Torre Sinergia Temuco, teléfono +56 9 7987 3921 y emails
- ✅ Botón flotante de chat con modal placeholder bilingüe (listo para embeber el widget externo)
- ✅ Navegación sticky, smooth scroll, mobile menu responsive
- ✅ Toggle ES/EN con persistencia en localStorage
- ✅ 100% de test cases (16/16) aprobados por el testing agent

## Backlog / mejoras futuras
- P1: Embeber el widget real de chat externo cuando el cliente lo provea (placeholder ya listo en `FloatingChat.jsx`)
- P2: Página individual por miembro del equipo (deep-link a `/equipo/alejandro` y `/equipo/monica`) con casos destacados
- P2: Blog jurídico con publicaciones (sección presente en el sitio original)
- P3: Sección "Casos" o "Áreas destacadas" con casos públicos representativos
- P3: Integración con Google Maps para la ubicación Torre Sinergia
- P3: Microsite "Justicia y deber" — artículos cortos en estilo editorial firmado por cada socio
- P3: SEO técnico (sitemap, schema.org LegalService, OG tags)

## Personas
- **Cliente persona natural**: busca asesoría en familia, tributaria, tránsito, deuda fiscal
- **Cliente empresa regional**: requiere asesoría societaria, due diligence, recupero
- **Cliente corporativo / aseguradora**: representación en litigios masivos

## Archivos clave
- `/app/frontend/src/App.js` — entry point
- `/app/frontend/src/i18n/LanguageContext.jsx` + `translations.js` — i18n
- `/app/frontend/src/components/site/*` — secciones del sitio
- `/app/frontend/src/index.css` — sistema de diseño (fonts, tokens, animaciones)
- `/app/design_guidelines.json` — guía de diseño completa
