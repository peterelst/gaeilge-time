# Gaeilge Time

Get idiomatic Irish (Gaeilge) time phrases programmatically.

## Installation

```bash
npm install gaeilge-time
```

## Usage

```typescript
import { getIrishTimePhrase } from 'gaeilge-time';

// Get current time in Irish
const currentTimeInIrish = getIrishTimePhrase();
console.log(currentTimeInIrish);
// Example output: "Tá sé a haon a chlog" (It is one o'clock)

// Get specific time in Irish
const specificDate = new Date('2024-03-15T14:45:00');
const specificTimeInIrish = getIrishTimePhrase(specificDate);
console.log(specificTimeInIrish);
// Output: "Tá sé cúig déag chun a trí" (It is quarter to three)
```

## Time Format Patterns

The package follows traditional Irish time-telling patterns:

1. On the hour:
   - `Tá sé a [hour] a chlog`
   - Example: "Tá sé a haon a chlog" (It's one o'clock)

2. Past the hour (1-29 minutes):
   - `Tá sé [minutes] tar éis a [hour]`
   - Example: "Tá sé cúig nóiméad tar éis a dó" (It's five past two)

3. Half past:
   - `Tá sé leathuair tar éis a [hour]`
   - Example: "Tá sé leathuair tar éis a trí" (It's half past three)

4. To the hour (31-59 minutes):
   - `Tá sé [minutes] chun a [hour]`
   - Example: "Tá sé deich nóiméad chun a ceathair" (It's ten to four)

## Features

- Supports 12-hour and 24-hour time formats
- Handles minutes in idiomatic Irish
- Uses traditional Irish number forms
- Returns grammatically correct Irish phrases
- Zero dependencies
- TypeScript support included

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT - see LICENSE file for details.

## Support

If you found this package helpful, you can:
- [Buy me a coffee](https://www.buymeacoffee.com/peterelst)
- Star the project on GitHub
- Report any issues you find
