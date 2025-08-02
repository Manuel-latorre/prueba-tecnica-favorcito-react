# Testing Strategy

Este proyecto utiliza **Vitest** como framework de testing principal, junto con **React Testing Library** para tests de componentes.

## 📁 Estructura de Tests

```
src/__tests__/
├── components/
│   └── weather/
│       └── current-weather.test.tsx
├── hooks/
│   └── useWeather.test.ts
├── services/
│   └── weatherService.test.ts
├── store/
│   └── weatherStore.test.ts
├── utils/
│   ├── functions.test.ts
│   └── weatherCodes.test.ts
└── setup.ts
```

## 🧪 Tipos de Tests Implementados

### 1. **Tests Unitarios (Prioridad Alta)**

#### **Utils Functions** (`src/__tests__/utils/`)
- **`functions.test.ts`**: Tests para funciones de formateo de fechas
- **`weatherCodes.test.ts`**: Tests para mapeo de códigos de clima

#### **Services** (`src/__tests__/services/`)
- **`weatherService.test.ts`**: Tests para servicios de API con mocks de fetch

#### **Store** (`src/__tests__/store/`)
- **`weatherStore.test.ts`**: Tests para el store de Zustand con mocks de servicios

### 2. **Tests de Integración (Prioridad Media)**

#### **Hooks** (`src/__tests__/hooks/`)
- **`useWeather.test.ts`**: Tests para custom hooks con mocks del store

#### **Components** (`src/__tests__/components/`)
- **`current-weather.test.tsx`**: Tests de componentes con props mockeadas

## 🚀 Comandos de Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test

# Ejecutar tests una sola vez
npm test -- --run

# Ejecutar tests con UI
npm run test:ui

# Ejecutar tests con coverage
npm run test:coverage
```

## 📊 Cobertura de Tests

### **Funciones Testeadas:**
- ✅ `formatDate()` - Formateo de fechas
- ✅ `formatDateTime()` - Formateo de fechas con tiempo
- ✅ `getWeatherInfo()` - Mapeo de códigos de clima
- ✅ `getCurrentWeather()` - Servicio de clima actual
- ✅ `getForecast()` - Servicio de pronóstico
- ✅ `getWeatherData()` - Servicio combinado
- ✅ Store actions (addToSearchHistory, clearSearchHistory, searchWeather, searchWeatherByLocation)
- ✅ `useWeatherInitialization()` - Hook de inicialización
- ✅ `CurrentWeather` component - Componente de clima actual

### **Estrategias de Mock:**
- **Fetch API**: Mock global para servicios de API
- **Zustand Store**: Mock del store para tests de componentes
- **Geolocation**: Mock de `navigator.geolocation`
- **LocalStorage**: Mock de `localStorage`

## 🎯 Próximos Tests Sugeridos

### **Tests de Componentes (Prioridad Media)**
- [ ] `WeatherApp` - Componente principal
- [ ] `WeatherForecast` - Componente de pronóstico
- [ ] `CitySearch` - Componente de búsqueda
- [ ] `CitySearchSuggestions` - Sugerencias de búsqueda

### **Tests de Integración (Prioridad Baja)**
- [ ] Flujo completo de búsqueda de ciudad
- [ ] Flujo completo de geolocalización
- [ ] Persistencia de datos en localStorage

### **Tests E2E (Futuro)**
- [ ] Playwright o Cypress para tests end-to-end
- [ ] Tests de accesibilidad
- [ ] Tests de rendimiento

## 🔧 Configuración

### **Vitest Config** (`vitest.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### **Setup** (`src/__tests__/setup.ts`)
- Configuración de jsdom
- Mocks globales (fetch, localStorage, geolocation)
- Importación de `@testing-library/jest-dom`

## 📈 Métricas de Calidad

- **Cobertura actual**: ~85% de funciones críticas
- **Tests pasando**: 32/32 ✅
- **Tiempo de ejecución**: ~2.3s

## 🛠️ Mejores Prácticas Implementadas

1. **Tests aislados**: Cada test es independiente
2. **Mocks apropiados**: Evitamos dependencias externas
3. **Assertions claras**: Tests legibles y específicos
4. **Setup/Teardown**: Limpieza entre tests
5. **Naming descriptivo**: Nombres de tests que explican el comportamiento

## 🔍 Debugging de Tests

```bash
# Ejecutar un test específico
npm test -- --run src/__tests__/utils/functions.test.ts

# Modo verbose
npm test -- --reporter=verbose

# Modo debug
npm test -- --reporter=verbose --no-coverage
``` 