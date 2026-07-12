export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

export function formatDistance(value: number): string {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value) + ' km';
}


export function formatOdometer(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'unit',
    unit: 'kilometer',
    unitDisplay: 'short',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatFuelQuantity(value: number): string {
  return `${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 }).format(value)} L`;
}

export function formatDate(dateString: string | Date | undefined | null): string {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return String(dateString);
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatWeight(value: number): string {
  const kg = value * 0.453592;
  return `${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(kg)} kg`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
