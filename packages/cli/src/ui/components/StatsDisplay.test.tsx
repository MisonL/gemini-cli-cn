/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { render } from 'ink-testing-library';
import { describe, it, expect, vi } from 'vitest';
import { StatsDisplay } from './StatsDisplay.js';
import { type CumulativeStats } from '../contexts/SessionContext.js';

vi.mock('../hooks/useI18n.js', () => ({
  useI18n: () => ({
    t: vi.fn((key, ...args) => {
      switch (key) {
        case 'stats.title':
          return 'Stats';
        case 'stats.lastTurn':
          return 'Last Turn';
        case 'stats.cumulative':
          return `Cumulative (${args[0]})`;
        case 'stats.turns':
          return `${args[0]} Turns`;
        case 'stats.inputTokens':
          return 'Input Tokens';
        case 'stats.outputTokens':
          return 'Output Tokens';
        case 'stats.toolUseTokens':
          return 'Tool Use Tokens';
        case 'stats.thoughtsTokens':
          return 'Thoughts Tokens';
        case 'stats.cachedTokens':
          return 'Cached Tokens';
        case 'stats.totalTokens':
          return 'Total Tokens';
        case 'stats.turnDurationApi':
          return 'Turn Duration (API)';
        case 'stats.totalDurationApi':
          return 'Total duration (API)';
        case 'stats.totalDurationWall':
          return 'Total duration (wall)';
        default:
          return key;
      }
    }),
  }),
}));

describe('<StatsDisplay />', () => {
  const mockStats: CumulativeStats = {
    turnCount: 10,
    promptTokenCount: 1000,
    candidatesTokenCount: 2000,
    totalTokenCount: 3500,
    cachedContentTokenCount: 500,
    toolUsePromptTokenCount: 200,
    thoughtsTokenCount: 300,
    apiTimeMs: 50234,
  };

  const mockLastTurnStats: CumulativeStats = {
    turnCount: 1,
    promptTokenCount: 100,
    candidatesTokenCount: 200,
    totalTokenCount: 350,
    cachedContentTokenCount: 50,
    toolUsePromptTokenCount: 20,
    thoughtsTokenCount: 30,
    apiTimeMs: 1234,
  };

  const mockDuration = '1h 23m 45s';

  it('renders correctly with given stats and duration', () => {
    const { lastFrame } = render(
      <StatsDisplay
        stats={mockStats}
        lastTurnStats={mockLastTurnStats}
        duration={mockDuration}
      />,
    );

    expect(lastFrame()).toMatchSnapshot();
  });

  it('renders zero state correctly', () => {
    const zeroStats: CumulativeStats = {
      turnCount: 0,
      promptTokenCount: 0,
      candidatesTokenCount: 0,
      totalTokenCount: 0,
      cachedContentTokenCount: 0,
      toolUsePromptTokenCount: 0,
      thoughtsTokenCount: 0,
      apiTimeMs: 0,
    };

    const { lastFrame } = render(
      <StatsDisplay
        stats={zeroStats}
        lastTurnStats={zeroStats}
        duration="0s"
      />,
    );

    expect(lastFrame()).toMatchSnapshot();
  });
});
