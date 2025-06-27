/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { shortenPath, tildeifyPath, tokenLimit } from '@google/gemini-cli-core';
import { ConsoleSummaryDisplay } from './ConsoleSummaryDisplay.js';
import process from 'node:process';
import { MemoryUsageDisplay } from './MemoryUsageDisplay.js';
import { useI18n } from '../hooks/useI18n.js';

interface FooterProps {
  model: string;
  targetDir: string;
  branchName?: string;
  debugMode: boolean;
  debugMessage: string;
  corgiMode: boolean;
  errorCount: number;
  showErrorDetails: boolean;
  showMemoryUsage?: boolean;
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  model,
  targetDir,
  branchName,
  debugMode,
  debugMessage,
  corgiMode,
  errorCount,
  showErrorDetails,
  showMemoryUsage,
  totalTokenCount,
}) => {
  const { t } = useI18n();
  const limit = tokenLimit(model);
  const percentage = totalTokenCount / limit;

  return (
    <Box marginTop={1} justifyContent="space-between" width="100%">
      <Box>
        <Text color={Colors.LightBlue}>
          {shortenPath(tildeifyPath(targetDir), 70)}
          {branchName && <Text color={Colors.Gray}> ({branchName}*)</Text>}
        </Text>
        {debugMode && (
          <Text color={Colors.AccentRed}>
            {' ' + (debugMessage || t('footer.debugMode'))}
          </Text>
        )}
      </Box>

      {/* Middle Section: Centered Sandbox Info */}
      <Box
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        {process.env.SANDBOX && process.env.SANDBOX !== 'sandbox-exec' ? (
          <Text color="green">
            {process.env.SANDBOX.replace(/^gemini-(?:cli-)?/, '')}
          </Text>
        ) : process.env.SANDBOX === 'sandbox-exec' ? (
          <Text color={Colors.AccentYellow}>
            {t('footer.macOSSeatbelt')}{' '}
            <Text color={Colors.Gray}>
              {t('footer.macOSSeatbeltProfile', process.env.SEATBELT_PROFILE)}
            </Text>
          </Text>
        ) : (
          <Text color={Colors.AccentRed}>
            {t('footer.noSandbox')}{' '}
            <Text color={Colors.Gray}>{t('footer.seeDocs')}</Text>
          </Text>
        )}
      </Box>

      {/* Right Section: Gemini Label and Console Summary */}
      <Box alignItems="center">
        <Text color={Colors.AccentBlue}>
          {' '}
          {model}{' '}
          <Text color={Colors.Gray}>
            {t('footer.contextLeft', ((1 - percentage) * 100).toFixed(0))}
          </Text>
        </Text>
        {corgiMode && (
          <Text>
            <Text color={Colors.Gray}>{t('footer.corgiSeparator')}</Text>
            <Text color={Colors.AccentRed}>{t('footer.corgiFacePart4')}</Text>
            <Text color={Colors.Foreground}>{t('footer.corgiFacePart1')}</Text>
            <Text color={Colors.AccentRed}>{t('footer.corgiFacePart2')}</Text>
            <Text color={Colors.Foreground}>{t('footer.corgiFacePart3')}</Text>
            <Text color={Colors.AccentRed}>{t('footer.corgiFacePart4')}</Text>
          </Text>
        )}
        {!showErrorDetails && errorCount > 0 && (
          <Box>
            <Text color={Colors.Gray}>
              {t('footer.consoleSummarySeparator')}
            </Text>
            <ConsoleSummaryDisplay errorCount={errorCount} />
          </Box>
        )}
        {showMemoryUsage && <MemoryUsageDisplay />}
      </Box>
    </Box>
  );
};
