const fs = require('fs');
const path = require('path');

class EventProcessor {
    constructor() {
        this.events = [];
        this.clubs = [];
        this.clubNameMapping = {};
    }

    // Load data files
    loadData() {
        try {
            console.log('📊 Loading data files...');
            this.events = JSON.parse(fs.readFileSync('./data/events_final.json', 'utf8'));
            this.clubs = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
            console.log('✅ Data files loaded successfully');
        } catch (error) {
            console.error('❌ Error loading data files:', error.message);
            process.exit(1);
        }
    }

    // Analyze events (from analyze_events.js)
    analyzeEvents() {
        console.log('\n🔍 Analyzing events...');
        console.log('='.repeat(50));

        const clubEvents = {};
        this.events.forEach(event => {
            if (!clubEvents[event.club]) {
                clubEvents[event.club] = [];
            }
            clubEvents[event.club].push(event.name);
        });

        console.log(`📈 Total events: ${this.events.length}`);
        console.log(`🏛️  Clubs with events: ${Object.keys(clubEvents).length}`);
        console.log('\n📋 Events per club:');

        Object.entries(clubEvents)
            .sort(([, a], [, b]) => b.length - a.length)
            .forEach(([club, events]) => {
                console.log(`  • ${club}: ${events.length} events`);
            });

        return clubEvents;
    }

    // Match events with clubs (from match_events.js)
    matchEventsWithClubs() {
        console.log('\n🔗 Matching events with clubs...');
        console.log('='.repeat(50));

        const unmatchedEvents = [];

        this.events.forEach(event => {
            const eventClubName = event.club;

            // Try to find a matching club in data.json
            const matchingClub = this.clubs.find(club => {
                const clubName = club.name.toUpperCase();
                const eventName = eventClubName.toUpperCase();

                // Direct match
                if (clubName === eventName) return true;

                // Partial matches and common variations
                if (clubName.includes(eventName) || eventName.includes(clubName)) return true;

                // Handle common abbreviations and variations
                const commonMappings = {
                    'CODECHEF - VIT': ['CODECHEF', 'CODE CHEF'],
                    'COMPUTER SOCIETY OF INDIA (CSI)': ['CSI', 'COMPUTER SOCIETY'],
                    'ASSOCIATION FOR COMPUTING MACHINERY (ACM)': ['ACM'],
                    'IEEE COMPUTER SOCIETY (IEEE-CS)': ['IEEE-CS', 'IEEE CS'],
                    'SOCIETY FOR BIOLOGICAL ENGINEERING (SBE)': ['SBE'],
                    'SOCIETY OF AUTOMOTIVE ENGINEERS (SAE)': ['SAE'],
                    'AMERICAN SOCIETY OF CIVIL ENGINEERS (ASCE)': ['ASCE'],
                    'IEEE-VIT': ['IEEE VIT', 'IEEE'],
                    'INDIAN SOCIETY FOR TECHNICAL EDUCATION (ISTE)': ['ISTE'],
                    'THE INSTITUTION OF ENGINEERING AND TECHNOLOGY (IET)': ['IET'],
                    'STUDENTS ASSOCIATION OF BIO-ENGINEERING SCIENCE AND TECHNOLOGY (SABEST)': ['SABEST'],
                    'TECHNOLOGY AND GAMING CLUB (TAG)': ['TAG'],
                    'NATIONAL SERVICE SCHEME (NSS)': ['NSS'],
                    'SOCIETY FOR INDUSTRIAL AND APPLIED MATHEMATICS (SIAM)': ['SIAM'],
                    'THE BIOTECH RESEARCH SOCIETY INDIA (BRSI)': ['BRSI'],
                    'ADDITIVE MANUFACTURING SOCIETY OF INDIA (AMSI)': ['AMSI'],
                    'INDIAN INSTITUTE OF CHEMICAL ENGINEERS (IICHE)': ['IICHE', 'IIChE'],
                    'SOCIETY OF MANUFACTURING ENGINEERS (SME)': ['SME'],
                    'THE AI & ML CLUB - TAM': ['TAM', 'AI ML CLUB'],
                    'IEEE -COMMUNICATIONS SOCIETY (IEEE-COMSOC)': ['IEEE-COMSOC', 'IEEE COMSOC'],
                    'GOOGLE DEVELOPERS STUDENT CLUB (GDSC)': ['GDSC'],
                    'SOFT COMPUTING RESEARCH SOCIETY (SCRS)': ['SCRS'],
                    'INTERNET OF THINGS COMMUNITY (IOTHINC)': ['IOTHINC'],
                    'SOLAR ENERGY SOCIETY OF INDIA (SESI)': ['SESI'],
                    'VIT FILM SOCIETY (VFS)': ['VFS', 'FILM SOCIETY']
                };

                // Check if eventName matches any mapping
                for (const [fullName, variations] of Object.entries(commonMappings)) {
                    if (clubName.includes(fullName) && variations.some(v => eventName.includes(v))) {
                        return true;
                    }
                }

                return false;
            });

            if (matchingClub) {
                if (!this.clubNameMapping[matchingClub.name]) {
                    this.clubNameMapping[matchingClub.name] = [];
                }
                this.clubNameMapping[matchingClub.name].push(event);
            } else {
                unmatchedEvents.push(eventClubName);
            }
        });

        console.log(`✅ Found matches for ${Object.keys(this.clubNameMapping).length} clubs`);
        console.log('\n📊 Matched clubs with events:');

        Object.entries(this.clubNameMapping)
            .sort(([, a], [, b]) => b.length - a.length)
            .forEach(([clubName, events]) => {
                console.log(`  • ${clubName}: ${events.length} events`);
            });

        if (unmatchedEvents.length > 0) {
            console.log(`\n⚠️  Unmatched events (${unmatchedEvents.length}):`);
            [...new Set(unmatchedEvents)].forEach(eventClub => {
                console.log(`  • "${eventClub}"`);
            });
        }

        return this.clubNameMapping;
    }

    // Save results to file
    saveResults() {
        console.log('\n💾 Saving results...');

        try {
            fs.writeFileSync('./matched_events.json', JSON.stringify(this.clubNameMapping, null, 2));
            console.log('✅ Results saved to matched_events.json');
        } catch (error) {
            console.error('❌ Error saving results:', error.message);
        }
    }

    // Generate summary report
    generateSummary() {
        console.log('\n📈 SUMMARY REPORT');
        console.log('='.repeat(50));

        const totalEvents = this.events.length;
        const totalClubs = this.clubs.length;
        const matchedClubs = Object.keys(this.clubNameMapping).length;
        const matchedEvents = Object.values(this.clubNameMapping).reduce((sum, events) => sum + events.length, 0);

        console.log(`📊 Total events in database: ${totalEvents}`);
        console.log(`🏛️  Total clubs in database: ${totalClubs}`);
        console.log(`🔗 Clubs with matched events: ${matchedClubs}`);
        console.log(`✅ Successfully matched events: ${matchedEvents}`);
        console.log(`⚠️  Unmatched events: ${totalEvents - matchedEvents}`);
        console.log(`📈 Match rate: ${((matchedEvents / totalEvents) * 100).toFixed(1)}%`);
    }

    // Main processing method
    process() {
        console.log('🚀 Starting Event Processor...\n');

        this.loadData();
        this.analyzeEvents();
        this.matchEventsWithClubs();
        this.saveResults();
        this.generateSummary();

        console.log('\n🎉 Event processing completed successfully!');
    }
}

// CLI handling
function main() {
    const args = process.argv.slice(2);
    const processor = new EventProcessor();

    if (args.length === 0) {
        // Run full process by default
        processor.process();
    } else {
        processor.loadData();

        switch (args[0]) {
            case 'analyze':
                processor.analyzeEvents();
                break;
            case 'match':
                processor.matchEventsWithClubs();
                processor.saveResults();
                break;
            case 'summary':
                processor.matchEventsWithClubs();
                processor.generateSummary();
                break;
            default:
                console.log('❌ Unknown command. Available commands:');
                console.log('  • node event-processor.js          - Run full process');
                console.log('  • node event-processor.js analyze  - Only analyze events');
                console.log('  • node event-processor.js match    - Only match events with clubs');
                console.log('  • node event-processor.js summary  - Show summary report');
        }
    }
}

if (require.main === module) {
    main();
}

module.exports = EventProcessor;