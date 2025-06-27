/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { SlashCommand } from '../hooks/slashCommandProcessor.js';
import { useI18n } from '../hooks/useI18n.js';

interface Help {
  commands: SlashCommand[];
}

export const Help: React.FC<Help> = ({ commands }) => {
  const { t } = useI18n();
  return (
    <Box
      flexDirection="column"
      marginBottom={1}
      borderColor={Colors.Gray}
      borderStyle="round"
      padding={1}
    >
      {/* Basics */}
      <Text bold color={Colors.Foreground}>
        {t('help.basics')}
      </Text>
      <Text color={Colors.Foreground}>
        <Text bold color={Colors.AccentPurple}>
          {t('help.addContext')}
        </Text>
        {t(
          'help.addContextDescription',
          <Text bold color={Colors.AccentPurple}>
            @
          </Text>,
          <Text bold color={Colors.AccentPurple}>
            @src/myFile.ts
          </Text>,
        )}
      </Text>
      <Text color={Colors.Foreground}>
        <Text bold color={Colors.AccentPurple}>
          {t('help.shellMode')}
        </Text>
        {t(
          'help.shellModeDescription',
          <Text bold color={Colors.AccentPurple}>
            !
          </Text>,
          <Text bold color={Colors.AccentPurple}>
            !npm run start
          </Text>,
          <Text bold color={Colors.AccentPurple}>
            start server
          </Text>,
        )}
      </Text>

      <Box height={1} />

      {/* Commands */}
      <Text bold color={Colors.Foreground}>
        {t('help.commands')}
      </Text>
      {commands
        .filter((command) => command.description)
        .map((command: SlashCommand) => (
          <Text key={command.name} color={Colors.Foreground}>
            <Text bold color={Colors.AccentPurple}>
              {' '}
              /{command.name}
            </Text>
            {command.description && ' - ' + command.description}
          </Text>
        ))}
      <Text color={Colors.Foreground}>
        <Text bold color={Colors.AccentPurple}>
          {' '}
          !{' '}
        </Text>
        {t('help.shellCommand')}
      </Text>

      <Box height={1} />

      {/* Shortcuts */}
      <Text bold color={Colors.Foreground}>
        {t('help.keyboardShortcuts')}
      </Text>
      <Text color={Colors.Foreground}>
        <Text bold color={Colors.AccentPurple}>
          {t('help.enter')}
        </Text>
        {t('help.sendMessage')}
      </Text>
      <Text color={Colors.Foreground}>
        <Text bold color={Colors.AccentPurple}>
          {t('help.shiftEnter')}
        </Text>
        {t('help.newLine')}
      </Text>
      <Text color={Colors.Foreground}>
        <Text bold color={Colors.AccentPurple}>
          {t('help.upDown')}
        </Text>
        {t('help.cyclePromptHistory')}
      </Text>
      <Text color={Colors.Foreground}>
        <Text bold color={Colors.AccentPurple}>
          {t('help.altLeftRight')}
        </Text>
        {t('help.jumpWords')}
      </Text>
      <Text color={Colors.Foreground}>
        <Text bold color={Colors.AccentPurple}>
          {t('help.esc')}
        </Text>
        {t('help.cancelOperation')}
      </Text>
      <Text color={Colors.Foreground}>
        <Text bold color={Colors.AccentPurple}>
          {t('help.ctrlC')}
        </Text>
        {t('help.quitApplication')}
      </Text>
    </Box>
  );
};
