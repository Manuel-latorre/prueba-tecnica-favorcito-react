export const weatherCodes: Record<number, { description: string; icon: string }> = {
    0: { description: 'Despejado', icon: '☀️' },
    1: { description: 'Mayormente despejado', icon: '🌤️' },
    2: { description: 'Parcialmente nublado', icon: '⛅' },
    3: { description: 'Nublado', icon: '☁️' },
    45: { description: 'Niebla', icon: '🌫️' },
    48: { description: 'Niebla con escarcha', icon: '🌫️' },
    51: { description: 'Llovizna ligera', icon: '🌦️' },
    53: { description: 'Llovizna moderada', icon: '🌧️' },
    55: { description: 'Llovizna intensa', icon: '🌧️' },
    61: { description: 'Lluvia ligera', icon: '🌧️' },
    63: { description: 'Lluvia moderada', icon: '🌧️' },
    65: { description: 'Lluvia intensa', icon: '🌧️' },
    71: { description: 'Nieve ligera', icon: '🌨️' },
    73: { description: 'Nieve moderada', icon: '🌨️' },
    75: { description: 'Nieve intensa', icon: '🌨️' },
    95: { description: 'Tormenta', icon: '⛈️' },
  };
  
export function getWeatherInfo(code: number) {
  return weatherCodes[code] || { description: 'Desconocido', icon: '❓' };
}