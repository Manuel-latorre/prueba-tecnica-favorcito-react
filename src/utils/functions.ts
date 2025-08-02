export function formatDate(dateString: string): string {
    // Parse the date string correctly to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
    }).replace(',', '').trim();
  }

export function formatDateTime(dateTimeString: string): string {
    // Parse the date time string correctly to avoid timezone issues
    const datePart = dateTimeString.split('T')[0]; // Get just the date part "2025-08-02"
    const [year, month, day] = datePart.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
    }).replace(',', '').trim();
  }