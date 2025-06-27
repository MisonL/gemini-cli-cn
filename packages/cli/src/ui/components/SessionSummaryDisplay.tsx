/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import { Colors } from '../colors.js';
import { formatDuration } from '../utils/formatters.js';
import { CumulativeStats } from '../contexts/SessionContext.js';
import { FormattedStats, StatRow, StatsColumn } from './Stats.js';
import { useI18n } from '../hooks/useI18n.js';

// --- Prop and Data Structures ---

interface SessionSummaryDisplayProps {
  stats: CumulativeStats;
  duration: string;
}

// --- Main Component ---

export const SessionSummaryDisplay: React.FC<SessionSummaryDisplayProps> = ({
  stats,
  duration,
}) => {
  const { t } = useI18n();
  const cumulativeFormatted: FormattedStats = {
    inputTokens: stats.promptTokenCount,
    outputTokens: stats.candidatesTokenCount,
    toolUseTokens: stats.toolUsePromptTokenCount,
    thoughtsTokens: stats.thoughtsTokenCount,
    cachedTokens: stats.cachedContentTokenCount,
    totalTokens: stats.totalTokenCount,
  };

  const title = t('quit.agentPoweringDown');

  return (
    <Box
      borderStyle="round"
      borderColor="gray"
      flexDirection="column"
      paddingY={1}
      paddingX={2}
      alignSelf="flex-start"
    >
      <Box marginBottom={1} flexDirection="column">
        {Colors.GradientColors ? (
          <Gradient colors={Colors.GradientColors}>
            <Text bold>{title}</Text>
          </Gradient>
        ) : (
          <Text bold>{title}</Text>
        )}
      </Box>

      <Box marginTop={1}>
        <StatsColumn
          title={t('quit.cumulativeStats', stats.turnCount)}
          stats={cumulativeFormatted}
          isCumulative={true}
        >
          <Box marginTop={1} flexDirection="column">
            <StatRow
              label={t('quit.totalDurationApi')}
              value={formatDuration(stats.apiTimeMs)}
            />
            <StatRow label={t('quit.totalDurationWall')} value={duration} />
          </Box>
        </StatsColumn>
      </Box>
    </Box>
  );
};
