import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names using clsx and merges tailwind classes with tailwind-merge
 * This prevents class conflicts and ensures consistent styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date as a readable string
 */
export function formatDate(date: Date | number): string {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return date.toLocaleString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Truncate a string to a specified length
 */
export function truncateString(str: string, maxLength: number = 50): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Generate a random ID (useful for temporary IDs before backend provides real ones)
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
