const fs = require('fs');

const events = JSON.parse(fs.readFileSync('./data/events_final.json', 'utf8'));
const clubs = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

// Create mapping between event club names and actual club names
const clubNameMapping = {};

events.forEach(event => {
    const eventClubName = event.club;

    // Try to find a matching club in data.json
    const matchingClub = clubs.find(club => {
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
        if (!clubNameMapping[matchingClub.name]) {
            clubNameMapping[matchingClub.name] = [];
        }
        clubNameMapping[matchingClub.name].push(event);
    } else {
        console.log(`No match found for: "${eventClubName}"`);
    }
});

console.log(`Found matches for ${Object.keys(clubNameMapping).length} clubs`);
console.log('\nMatched clubs with events:');
Object.entries(clubNameMapping).forEach(([clubName, events]) => {
    console.log(`- ${clubName}: ${events.length} events`);
});

// Save the mapping for later use
fs.writeFileSync('./matched_events.json', JSON.stringify(clubNameMapping, null, 2));
console.log('\nSaved mapping to matched_events.json');