/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { formatDuration } from '../utils/formatters.js';
import { CumulativeStats } from '../contexts/SessionContext.js';
import { FormattedStats, StatRow, StatsColumn } from './Stats.js';
import { useI18n } from '../hooks/useI18n.js';

// --- Constants ---

const COLUMN_WIDTH = '48%';

// --- Prop and Data Structures ---

interface StatsDisplayProps {
  stats: CumulativeStats;
  lastTurnStats: CumulativeStats;
  duration: string;
}

// --- Main Component ---

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  lastTurnStats,
  duration,
}) => {
  const { t } = useI18n();
  const lastTurnFormatted: FormattedStats = {
    inputTokens: lastTurnStats.promptTokenCount,
    outputTokens: lastTurnStats.candidatesTokenCount,
    toolUseTokens: lastTurnStats.toolUsePromptTokenCount,
    thoughtsTokens: lastTurnStats.thoughtsTokenCount,
    cachedTokens: lastTurnStats.cachedContentTokenCount,
    totalTokens: lastTurnStats.totalTokenCount,
  };

  const cumulativeFormatted: FormattedStats = {
    inputTokens: stats.promptTokenCount,
    outputTokens: stats.candidatesTokenCount,
    toolUseTokens: stats.toolUsePromptTokenCount,
    thoughtsTokens: stats.thoughtsTokenCount,
    cachedTokens: stats.cachedContentTokenCount,
    totalTokens: stats.totalTokenCount,
  };

  return (
    <Box
      borderStyle="round"
      borderColor="gray"
      flexDirection="column"
      paddingY={1}
      paddingX={2}
    >
      <Text bold color={Colors.AccentPurple}>
        {t('stats.title')}
      </Text>

      <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
        <StatsColumn
          title={t('stats.lastTurn')}
          stats={lastTurnFormatted}
          width={COLUMN_WIDTH}
        />
        <StatsColumn
          title={t(
            'stats.cumulative',
            stats.turnCount > 0
              ? t('stats.turns', stats.turnCount)
              : t('stats.turns', 0),
          )}
          stats={cumulativeFormatted}
          isCumulative={true}
          width={COLUMN_WIDTH}
        />
      </Box>

      <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
        {/* Left column for "Last Turn" duration */}
        <Box width={COLUMN_WIDTH} flexDirection="column">
          <StatRow
            label={t('stats.turnDurationApi')}
            value={formatDuration(lastTurnStats.apiTimeMs)}
          />
        </Box>

        {/* Right column for "Cumulative" durations */}
        <Box width={COLUMN_WIDTH} flexDirection="column">
          <StatRow
            label={t('stats.totalDurationApi')}
            value={formatDuration(stats.apiTimeMs)}
          />
          <StatRow label={t('stats.totalDurationWall')} value={duration} />
        </Box>
      </Box>
    </Box>
  );
};
