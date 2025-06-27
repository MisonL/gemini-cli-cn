/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  t,
  getCurrentLocale,
  onLocaleChange,
  offLocaleChange,
} from '../../i18n.js';

export function useI18n() {
  const [locale, setLocale] = useState(getCurrentLocale());

  useEffect(() => {
    const handleLocaleChange = (newLocale: string) => {
      setLocale(newLocale);
    };

    onLocaleChange(handleLocaleChange);

    return () => {
      offLocaleChange(handleLocaleChange);
    };
  }, []);

  return { t, locale };
}
