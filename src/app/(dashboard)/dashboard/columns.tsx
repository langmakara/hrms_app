"use client";
import { Column } from './page';

// --- Data & Constants ---
export const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'appiledOn', label: 'Applied On', minWidth: 150 },
  { id: 'date', label: 'Date', minWidth: 150 },
  { id: 'type', label: 'Type', minWidth: 100 },
];
