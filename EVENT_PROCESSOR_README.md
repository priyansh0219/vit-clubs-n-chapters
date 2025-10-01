# Event Processor

A unified script that combines the functionality of `analyze_events.js` and `match_events.js` into a single, easy-to-use tool.

## Features

- **Event Analysis**: Analyzes events from `events_final.json` and provides statistics about events per club
- **Club Matching**: Matches event club names with actual club data from `data.json`
- **Smart Mapping**: Uses intelligent matching algorithms including:
  - Direct name matching
  - Partial matching
  - Common abbreviations and variations
  - Case-insensitive comparison
- **Detailed Reporting**: Provides comprehensive statistics and unmatched event reports
- **JSON Output**: Saves results to `matched_events.json` for further use

## Usage

### Run the complete process (recommended)
```bash
# Using Node.js directly
node event-processor.js

# Using npm scripts
npm run process-events
```

### Run individual components
```bash
# Analyze events only
node event-processor.js analyze
npm run analyze-events

# Match events with clubs only
node event-processor.js match
npm run match-events

# Show summary report only
node event-processor.js summary
npm run events-summary
```

## Output

The script provides:

1. **Console Output**: Detailed, color-coded progress and results
2. **JSON File**: `matched_events.json` containing the mapping of clubs to their events

### Sample Output
```
🚀 Starting Event Processor...

📊 Loading data files...
✅ Data files loaded successfully

🔍 Analyzing events...
==================================================
📈 Total events: 215
🏛️  Clubs with events: 166

📋 Events per club:
  • VIT BUSINESS SCHOOL: 6 events
  • ROBOVITICS: 6 events
  ...

🔗 Matching events with clubs...
==================================================
✅ Found matches for 65 clubs

📊 Matched clubs with events:
  • THE INSTITUTION OF ENGINEERING AND TECHNOLOGY (IET): 15 events
  • SOCIETY OF AUTOMOTIVE ENGINEERS (SAE): 10 events
  ...

📈 SUMMARY REPORT
==================================================
📊 Total events in database: 215
🏛️  Total clubs in database: 161
🔗 Clubs with matched events: 65
✅ Successfully matched events: 147
⚠️  Unmatched events: 68
📈 Match rate: 68.4%

🎉 Event processing completed successfully!
```

## Files Required

- `data/events_final.json` - Events data
- `data/data.json` - Clubs data

## Output Files

- `matched_events.json` - Generated mapping of clubs to their events

## Error Handling

The script includes robust error handling for:
- Missing data files
- Invalid JSON format
- File system errors

## Matching Algorithm

The script uses a sophisticated matching system that handles:

### Direct Matches
- Exact name matches (case-insensitive)
- Partial name matches

### Smart Abbreviation Handling
Common abbreviations and variations are automatically recognized:
- `CODECHEF - VIT` ↔ `CODECHEF`
- `IEEE COMPUTER SOCIETY (IEEE-CS)` ↔ `IEEE-CS`
- `ASSOCIATION FOR COMPUTING MACHINERY (ACM)` ↔ `ACM`
- And many more...

## Previous Files

This script replaces the need for:
- `analyze_events.js`
- `match_events.js`

Both original files can be safely removed as their functionality is now integrated into this unified processor.