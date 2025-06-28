/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Text } from 'ink';
import { Colors } from '../colors.js';
import { MCPServerConfig } from '@google/gemini-cli-core';
import { useI18n } from '../hooks/useI18n.js';

interface ContextSummaryDisplayProps {
  geminiMdFileCount: number;
  contextFileNames: string[];
  mcpServers?: Record<string, MCPServerConfig>;
  showToolDescriptions?: boolean;
}

export const ContextSummaryDisplay: React.FC<ContextSummaryDisplayProps> = ({
  geminiMdFileCount,
  contextFileNames,
  mcpServers,
  showToolDescriptions,
}) => {
  const { t } = useI18n();
  const mcpServerCount = Object.keys(mcpServers || {}).length;

  if (geminiMdFileCount === 0 && mcpServerCount === 0) {
    return <Text> </Text>; // Render an empty space to reserve height
  }

  const geminiMdText = (() => {
    if (geminiMdFileCount === 0) {
      return '';
    }
    const allNamesTheSame = new Set(contextFileNames).size < 2;
    const name = allNamesTheSame ? contextFileNames[0] : 'context';
    return `${geminiMdFileCount} ${name}${t(
      geminiMdFileCount > 1 ? 'contextSummary.files' : 'contextSummary.file',
    )}`;
  })();

  const mcpText =
    mcpServerCount > 0
      ? `${mcpServerCount}${t(
          mcpServerCount > 1
            ? 'contextSummary.mcpServers'
            : 'contextSummary.mcpServer',
        )}`
      : '';

  let summaryText = t('contextSummary.using');
  if (geminiMdText) {
    summaryText += geminiMdText;
  }
  if (geminiMdText && mcpText) {
    summaryText += t('contextSummary.and');
  }
  if (mcpText) {
    summaryText += mcpText;
    // Add ctrl+t hint when MCP servers are available
    if (mcpServers && Object.keys(mcpServers).length > 0) {
      if (showToolDescriptions) {
        summaryText += t('contextSummary.ctrlTtoggle');
      } else {
        summaryText += t('contextSummary.ctrlTview');
      }
    }
  }

  return <Text color={Colors.Gray}>{summaryText}</Text>;
};
