import { getIrishTimePhrase } from '../../src/index';

interface TestCase {
  input: string;
  expected: string;
}

describe('Irish Time Phrase', () => {
  describe('with specific dates', () => {
    const testCases: TestCase[] = [
      // Exact hours
      { input: '2025-05-21T00:00:00', expected: 'Tá sé a dó dhéag a chlog' },
      { input: '2025-05-21T12:00:00', expected: 'Tá sé a dó dhéag a chlog' },

      // Just past the hour (1–9 minutes → no “a” prefix)
      { input: '2025-05-21T00:01:00', expected: 'Tá sé haon nóiméad tar éis a dó dhéag' },
      { input: '2025-05-21T12:01:00', expected: 'Tá sé haon nóiméad tar éis a dó dhéag' },
      { input: '2025-05-21T01:02:00', expected: 'Tá sé dó nóiméad tar éis a haon' },
      { input: '2025-05-21T01:03:00', expected: 'Tá sé trí nóiméad tar éis a haon' },
      { input: '2025-05-21T01:04:00', expected: 'Tá sé ceathair nóiméad tar éis a haon' },
      { input: '2025-05-21T01:05:00', expected: 'Tá sé cúig nóiméad tar éis a haon' },
      { input: '2025-05-21T01:06:00', expected: 'Tá sé sé nóiméad tar éis a haon' },

      // Quarter past & to
      { input: '2025-05-21T04:15:00', expected: 'Tá sé ceathrú tar éis a ceathair' },
      { input: '2025-05-21T05:45:00', expected: 'Tá sé ceathrú chun a sé' },
      { input: '2025-05-21T11:45:00', expected: 'Tá sé ceathrú chun a dó dhéag' },
      { input: '2025-05-21T23:45:00', expected: 'Tá sé ceathrú chun a dó dhéag' },

      // Half past
      { input: '2025-05-21T03:30:00', expected: 'Tá sé leathuair tar éis a trí' },

      // Before and after "to" switch
      { input: '2025-05-21T06:29:00', expected: 'Tá sé fiche is a naoi nóiméad tar éis a sé' },
      { input: '2025-05-21T06:31:00', expected: 'Tá sé fiche is a naoi nóiméad chun a seacht' },

      // Fused compound minute forms
      { input: '2025-05-21T07:26:00', expected: 'Tá sé fiche is a sé nóiméad tar éis a seacht' },
      { input: '2025-05-21T13:21:00', expected: 'Tá sé fiche is a haon nóiméad tar éis a haon' },

      // Correct "to" logic
      { input: '2025-05-21T22:38:00', expected: 'Tá sé fiche is a dó nóiméad chun a haon déag' },
      { input: '2025-05-21T23:59:00', expected: 'Tá sé haon nóiméad chun a dó dhéag' }
    ];

    test.each(testCases)('formats time correctly for $input', ({ input, expected }) => {
      const date = new Date(input);
      const result = getIrishTimePhrase(date);
      expect(result).toBe(expected);
    });
  });

  describe('with current time', () => {
    let originalDate: DateConstructor;

    beforeEach(() => {
      originalDate = global.Date;
      const mockDate = new Date('2025-05-21T15:30:00');
      global.Date = class extends Date {
        constructor() {
          super();
          return mockDate;
        }
      } as DateConstructor;
    });

    afterEach(() => {
      global.Date = originalDate;
    });

    test('returns correct phrase for current time when no date is provided', () => {
      const result = getIrishTimePhrase();
      expect(result).toBe('Tá sé leathuair tar éis a trí');
    });
  });
});
