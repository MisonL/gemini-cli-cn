/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import {
  t as i18n_t,
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

  const t = useMemo(() => i18n_t, []);

  return { t, locale };
}
