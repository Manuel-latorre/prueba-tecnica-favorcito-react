# 🌤️ Weather App - React + TypeScript + Vite

Una aplicación de clima moderna y responsive construida con React, TypeScript y Vite. Permite buscar el clima actual y pronóstico de cualquier ciudad del mundo, con soporte para geolocalización automática.

## ✨ Características

- 🔍 **Búsqueda de ciudades** con autocompletado y sugerencias
- 📍 **Geolocalización automática** para obtener el clima de tu ubicación actual
- 🌡️ **Clima actual** con temperatura, humedad, velocidad del viento y condiciones
- 📅 **Pronóstico de 7 días** con temperaturas máximas y mínimas
- 💾 **Historial de búsquedas** persistente con Zustand
- 📱 **Diseño responsive** optimizado para móviles y desktop
- ⚡ **Carga rápida** con Vite y optimizaciones de rendimiento
- 🎨 **UI moderna** con Tailwind CSS y componentes Radix UI / Shadcn
- 🧪 **Tests completos** con Vitest y React Testing Library

## 🚀 Tecnologías Utilizadas

- **React 19** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Zustand** - Gestión de estado
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos
- **Vitest** - Framework de testing
- **React Testing Library** - Testing de componentes

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd prueba-tecnica-favorcito-react

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run preview      # Previsualiza build de producción

# Build
npm run build        # Construye para producción

# Testing
npm test             # Ejecuta tests en modo watch
npm run test:ui      # Ejecuta tests con UI
npm run test:coverage # Ejecuta tests con coverage

# Linting
npm run lint         # Ejecuta ESLint
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (Button, Input, etc.)
│   ├── weather/        # Componentes específicos del clima
│   ├── search/         # Componentes de búsqueda
│   └── errors/         # Componentes de manejo de errores
├── hooks/              # Custom hooks
├── services/           # Servicios de API
├── store/              # Estado global (Zustand)
├── types/              # Definiciones de tipos TypeScript
├── utils/              # Utilidades y helpers
├── config/             # Configuraciones
└── __tests__/          # Tests unitarios e integración
```

## 🔧 Configuración de APIs

La aplicación utiliza las siguientes APIs gratuitas:

- **Open-Meteo Weather API**: Para datos de clima actual y pronóstico
- **Open-Meteo Geocoding API**: Para búsqueda y geocodificación de ciudades

### Variables de Entorno

```env
# Las APIs son gratuitas y no requieren API keys
# Configuración en src/config/api.config.ts
```

## 🎯 Funcionalidades Principales

### 1. Búsqueda de Ciudades
- Autocompletado con sugerencias en tiempo real
- Historial de búsquedas recientes
- Búsqueda por nombre de ciudad o coordenadas

### 2. Geolocalización
- Detección automática de ubicación
- Permisos de geolocalización del navegador
- Fallback a búsqueda manual si falla la geolocalización

### 3. Datos de Clima
- **Clima Actual**:
  - Temperatura (actual, máxima, mínima)
  - Humedad relativa
  - Velocidad del viento
  - Condiciones climáticas (lluvia, nieve, etc.)

- **Pronóstico de 7 días**:
  - Temperaturas máximas y mínimas

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ver coverage
npm run test:coverage

# Tests con UI
npm run test:ui
```

### Cobertura de Tests
- ✅ **Utils**: Funciones de formateo y mapeo de códigos de clima
- ✅ **Services**: Servicios de API con mocks
- ✅ **Store**: Estado global con Zustand
- ✅ **Hooks**: Custom hooks de React
- ✅ **Components**: Componentes principales

Ver [TESTING.md](./TESTING.md) para más detalles sobre la estrategia de testing.

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Móviles** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)

## 🎨 UI/UX Features

- **Diseño moderno** con Tailwind CSS
- **Componentes accesibles** con Radix UI
- **Iconos consistentes** con Lucide React
- **Animaciones suaves** y transiciones
- **Estados de carga** con skeletons
- **Manejo de errores** con mensajes claros

## 🔄 Estado de la Aplicación

La aplicación utiliza Zustand para el manejo de estado:

```typescript
interface WeatherStore {
  // Datos de ubicación
  location: Location | null
  
  // Datos de clima
  currentWeather: CurrentWeather | null
  forecast: Forecast | null
  
  // Estado de la aplicación
  loading: boolean
  error: string | null
  
  // Historial de búsquedas
  searchHistory: string[]
}
```

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Servidor de Desarrollo
```bash
npm run dev
```


**Desarrollado con ❤️ usando React, TypeScript y Vite**
