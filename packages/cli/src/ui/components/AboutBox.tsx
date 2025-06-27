/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { GIT_COMMIT_INFO } from '../../generated/git-commit.js';
import { useI18n } from '../hooks/useI18n.js';

interface AboutBoxProps {
  cliVersion: string;
  osVersion: string;
  sandboxEnv: string;
  modelVersion: string;
}

export const AboutBox: React.FC<AboutBoxProps> = ({
  cliVersion,
  osVersion,
  sandboxEnv,
  modelVersion,
}) => {
  const { t } = useI18n();
  return (
    <Box
      borderStyle="round"
      borderColor={Colors.Gray}
      flexDirection="column"
      padding={1}
      marginY={1}
      width="100%"
    >
      <Box marginBottom={1}>
        <Text bold color={Colors.AccentPurple}>
          {t('about.title')}
        </Text>
      </Box>
      <Box flexDirection="row">
        <Box width="35%">
          <Text bold color={Colors.LightBlue}>
            {t('about.cliVersion')}
          </Text>
        </Box>
        <Box>
          <Text>{cliVersion}</Text>
        </Box>
      </Box>
      {GIT_COMMIT_INFO && !['N/A'].includes(GIT_COMMIT_INFO) && (
        <Box flexDirection="row">
          <Box width="35%">
            <Text bold color={Colors.LightBlue}>
              {t('about.gitCommit')}
            </Text>
          </Box>
          <Box>
            <Text>{GIT_COMMIT_INFO}</Text>
          </Box>
        </Box>
      )}
      <Box flexDirection="row">
        <Box width="35%">
          <Text bold color={Colors.LightBlue}>
            {t('about.model')}
          </Text>
        </Box>
        <Box>
          <Text>{modelVersion}</Text>
        </Box>
      </Box>
      <Box flexDirection="row">
        <Box width="35%">
          <Text bold color={Colors.LightBlue}>
            {t('about.sandbox')}
          </Text>
        </Box>
        <Box>
          <Text>{sandboxEnv}</Text>
        </Box>
      </Box>
      <Box flexDirection="row">
        <Box width="35%">
          <Text bold color={Colors.LightBlue}>
            {t('about.os')}
          </Text>
        </Box>
        <Box>
          <Text>{osVersion}</Text>
        </Box>
      </Box>
    </Box>
  );
};
