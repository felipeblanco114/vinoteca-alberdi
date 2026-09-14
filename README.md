# Vinoteca Alberdi — demo

Demo de catálogo de vinos con buscador, filtros, carrito con lógica de retiro/envío,
y teaser del Club del Vino. Armado en React + Vite + Tailwind, siguiendo la misma
estructura que El Almacén.

## Instalación

```bash
npm install
npm run dev
```

Abre en `http://localhost:5173`.

## Estructura

```
src/
  data/wines.js        catálogo de vinos (reemplazar por datos reales del cliente)
  theme.js              paleta de colores y tipografía compartida
  utils/format.js       helpers (formato de precio)
  components/
    Header.jsx
    FilterBar.jsx
    WineCard.jsx
    WineGrid.jsx
    BottleIcon.jsx       ilustración de botella (placeholder hasta tener fotos reales)
    WineDetail.jsx
    CartDrawer.jsx
    ClubModal.jsx
  App.jsx                orquesta todo
```

## Build para producción

```bash
npm run build
```

Genera la carpeta `dist/`, lista para desplegar en Vercel igual que El Almacén.
