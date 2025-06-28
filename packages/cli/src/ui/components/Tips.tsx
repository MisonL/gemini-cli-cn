/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { type Config } from '@google/gemini-cli-core';

import { useI18n } from '../hooks/useI18n.js';

interface TipsProps {
  config: Config;
}

export const Tips: React.FC<TipsProps> = ({ config }) => {
  const { t } = useI18n();
  const geminiMdFileCount = config.getGeminiMdFileCount();
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text color={Colors.Foreground}>{t('tips.gettingStarted')}</Text>
      <Text color={Colors.Foreground}>{t('tips.askQuestions')}</Text>
      <Text color={Colors.Foreground}>{t('tips.beSpecific')}</Text>
      {geminiMdFileCount === 0 && (
        <Text color={Colors.Foreground}>
          {t('tips.createGeminiMd', 'GEMINI.md')}
        </Text>
      )}
      <Text color={Colors.Foreground}>
        {t('tips.helpCommand', geminiMdFileCount === 0 ? '4.' : '3.', '/help')}
      </Text>
    </Box>
  );
};
