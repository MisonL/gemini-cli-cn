/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi } from 'vitest';

export const useI18n = vi.fn(() => ({
  t: vi.fn(
    (key, ...args) => `${key}${args.length > 0 ? ': ' + args.join(', ') : ''}`,
  ),
  locale: 'en',
}));
