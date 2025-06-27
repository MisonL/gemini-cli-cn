/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { EventEmitter } from 'events';

const __dirname = dirname(fileURLToPath(import.meta.url));

let translations: Record<string, string> = {};
let _currentLocale = 'en'; // Default to English

const localeChangeEmitter = new EventEmitter();

export function setLocale(locale: string) {
  _currentLocale = locale;
  loadTranslations(locale);
  localeChangeEmitter.emit('localeChange', locale);
}

export function getCurrentLocale(): string {
  return _currentLocale;
}

export function onLocaleChange(listener: (locale: string) => void) {
  localeChangeEmitter.on('localeChange', listener);
}

export function offLocaleChange(listener: (locale: string) => void) {
  localeChangeEmitter.off('localeChange', listener);
}

function loadTranslations(locale: string) {
  try {
    const filePath = join(__dirname, 'locales', `${locale}.json`);
    const fileContent = readFileSync(filePath, 'utf8');
    translations = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Failed to load translations for locale ${locale}:`, error);
    translations = {}; // Fallback to empty if loading fails
  }
}

export function t(key: string, ...args: unknown[]): string {
  const translated = translations[key] || key; // Fallback to key if not found
  // Simple string interpolation for now, can be expanded
  return translated.replace(/{(\d+)}/g, (match, index) =>
    typeof args[index] !== 'undefined' ? String(args[index]) : match,
  );
}

// Load default English translations on startup
loadTranslations('en');
