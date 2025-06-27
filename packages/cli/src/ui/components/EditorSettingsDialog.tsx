/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { Colors } from '../colors.js';
import {
  EDITOR_DISPLAY_NAMES,
  editorSettingsManager,
  type EditorDisplay,
} from '../editors/editorSettingsManager.js';
import { RadioButtonSelect } from './shared/RadioButtonSelect.js';
import { LoadedSettings, SettingScope } from '../../config/settings.js';
import { EditorType, isEditorAvailable } from '@google/gemini-cli-core';
import { useI18n } from '../hooks/useI18n.js';

interface EditorDialogProps {
  onSelect: (editorType: EditorType | undefined, scope: SettingScope) => void;
  settings: LoadedSettings;
  onExit: () => void;
}

export function EditorSettingsDialog({
  onSelect,
  settings,
  onExit,
}: EditorDialogProps): React.JSX.Element {
  const { t } = useI18n();
  const [selectedScope, setSelectedScope] = useState<SettingScope>(
    SettingScope.User,
  );
  const [focusedSection, setFocusedSection] = useState<'editor' | 'scope'>(
    'editor',
  );
  useInput((_, key) => {
    if (key.tab) {
      setFocusedSection((prev) => (prev === 'editor' ? 'scope' : 'editor'));
    }
    if (key.escape) {
      onExit();
    }
  });

  const editorItems: EditorDisplay[] =
    editorSettingsManager.getAvailableEditorDisplays();

  const currentPreference =
    settings.forScope(selectedScope).settings.preferredEditor;
  let editorIndex = currentPreference
    ? editorItems.findIndex(
        (item: EditorDisplay) => item.type === currentPreference,
      )
    : 0;
  if (editorIndex === -1) {
    console.error(t('editorDialog.editorNotSupported', currentPreference));
    editorIndex = 0;
  }

  const scopeItems = [
    { label: t('editorDialog.userSettings'), value: SettingScope.User },
    {
      label: t('editorDialog.workspaceSettings'),
      value: SettingScope.Workspace,
    },
  ];

  const handleEditorSelect = (editorType: EditorType | 'not_set') => {
    if (editorType === 'not_set') {
      onSelect(undefined, selectedScope);
      return;
    }
    onSelect(editorType, selectedScope);
  };

  const handleScopeSelect = (scope: SettingScope) => {
    setSelectedScope(scope);
    setFocusedSection('editor');
  };

  let otherScopeModifiedMessage = '';
  const otherScope =
    selectedScope === SettingScope.User
      ? SettingScope.Workspace
      : SettingScope.User;
  if (settings.forScope(otherScope).settings.preferredEditor !== undefined) {
    otherScopeModifiedMessage =
      settings.forScope(selectedScope).settings.preferredEditor !== undefined
        ? t('editorDialog.alsoModifiedIn', otherScope)
        : t('editorDialog.modifiedIn', otherScope);
  }

  let mergedEditorName = t('editorDialog.none');
  if (
    settings.merged.preferredEditor &&
    isEditorAvailable(settings.merged.preferredEditor)
  ) {
    mergedEditorName =
      EDITOR_DISPLAY_NAMES[settings.merged.preferredEditor as EditorType];
  }

  return (
    <Box
      borderStyle="round"
      borderColor={Colors.Gray}
      flexDirection="row"
      padding={1}
      width="100%"
    >
      <Box flexDirection="column" width="45%" paddingRight={2}>
        <Text bold={focusedSection === 'editor'}>
          {focusedSection === 'editor' ? '> ' : '  '}
          {t('editorDialog.selectEditor')}{' '}
          <Text color={Colors.Gray}>{otherScopeModifiedMessage}</Text>
        </Text>
        <RadioButtonSelect
          items={editorItems.map((item) => ({
            label: item.name,
            value: item.type,
            disabled: item.disabled,
          }))}
          initialIndex={editorIndex}
          onSelect={handleEditorSelect}
          isFocused={focusedSection === 'editor'}
          key={selectedScope}
        />

        <Box marginTop={1} flexDirection="column">
          <Text bold={focusedSection === 'scope'}>
            {focusedSection === 'scope' ? '> ' : '  '}
            {t('editorDialog.applyTo')}
          </Text>
          <RadioButtonSelect
            items={scopeItems}
            initialIndex={0}
            onSelect={handleScopeSelect}
            isFocused={focusedSection === 'scope'}
          />
        </Box>

        <Box marginTop={1}>
          <Text color={Colors.Gray}>
            {t('editorDialog.useEnterToSelectTabToChangeFocus')}
          </Text>
        </Box>
      </Box>

      <Box flexDirection="column" width="55%" paddingLeft={2}>
        <Text bold>{t('editorDialog.editorPreference')}</Text>
        <Box flexDirection="column" gap={1} marginTop={1}>
          <Text color={Colors.Gray}>
            {t('editorDialog.supportedEditorsNote')}
          </Text>
          <Text color={Colors.Gray}>
            {t('editorDialog.preferredEditorIs', '')}
            <Text
              color={
                mergedEditorName === t('editorDialog.none')
                  ? Colors.AccentRed
                  : Colors.AccentCyan
              }
              bold
            >
              {mergedEditorName}
            </Text>
            .
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
