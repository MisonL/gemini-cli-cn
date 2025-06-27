/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { useI18n } from '../hooks/useI18n.js';

// --- Prop and Data Structures ---

export interface FormattedStats {
  inputTokens: number;
  outputTokens: number;
  toolUseTokens: number;
  thoughtsTokens: number;
  cachedTokens: number;
  totalTokens: number;
}

// --- Helper Components ---

/**
 * Renders a single row with a colored label on the left and a value on the right.
 */
export const StatRow: React.FC<{
  label: string;
  value: string | number;
  valueColor?: string;
}> = ({ label, value, valueColor }) => (
  <Box justifyContent="space-between" gap={2}>
    <Text color={Colors.LightBlue}>{label}</Text>
    <Text color={valueColor}>{value}</Text>
  </Box>
);

/**
 * Renders a full column for either "Last Turn" or "Cumulative" stats.
 */
export const StatsColumn: React.FC<{
  title: string;
  stats: FormattedStats;
  isCumulative?: boolean;
  width?: string | number;
  children?: React.ReactNode;
}> = ({ title, stats, isCumulative = false, width, children }) => {
  const { t } = useI18n();
  const cachedDisplay =
    isCumulative && stats.totalTokens > 0
      ? `${stats.cachedTokens.toLocaleString()} (${((stats.cachedTokens / stats.totalTokens) * 100).toFixed(1)}%)`
      : stats.cachedTokens.toLocaleString();

  const cachedColor =
    isCumulative && stats.cachedTokens > 0 ? Colors.AccentGreen : undefined;

  return (
    <Box flexDirection="column" width={width}>
      <Text bold>{title}</Text>
      <Box marginTop={1} flexDirection="column">
        {/* All StatRows below will now inherit the gap */}
        <StatRow
          label={t('stats.inputTokens')}
          value={stats.inputTokens.toLocaleString()}
        />
        <StatRow
          label={t('stats.outputTokens')}
          value={stats.outputTokens.toLocaleString()}
        />
        {stats.toolUseTokens > 0 && (
          <StatRow
            label={t('stats.toolUseTokens')}
            value={stats.toolUseTokens.toLocaleString()}
          />
        )}
        {stats.thoughtsTokens > 0 && (
          <StatRow
            label={t('stats.thoughtsTokens')}
            value={stats.thoughtsTokens.toLocaleString()}
          />
        )}
        {stats.cachedTokens > 0 && (
          <StatRow
            label={t('stats.cachedTokens')}
            value={cachedDisplay}
            valueColor={cachedColor}
          />
        )}
        {/* Divider Line */}
        <Box
          borderTop={true}
          borderLeft={false}
          borderRight={false}
          borderBottom={false}
          borderStyle="single"
        />
        <StatRow
          label={t('stats.totalTokens')}
          value={stats.totalTokens.toLocaleString()}
        />
        {children}
      </Box>
    </Box>
  );
};

/**
 * Renders a column for displaying duration information.
 */
export const DurationColumn: React.FC<{
  apiTime: string;
  wallTime: string;
}> = ({ apiTime, wallTime }) => {
  const { t } = useI18n();
  return (
    <Box flexDirection="column" width={'48%'}>
      <Text bold>{t('stats.duration')}</Text>
      <Box marginTop={1} flexDirection="column">
        <StatRow label={t('stats.apiTime')} value={apiTime} />
        <StatRow label={t('stats.wallTime')} value={wallTime} />
      </Box>
    </Box>
  );
};
