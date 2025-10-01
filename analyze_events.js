const fs = require('fs');

const events = JSON.parse(fs.readFileSync('./data/events_final.json', 'utf8'));
const clubs = {};

events.forEach(e => {
    if (!clubs[e.club]) clubs[e.club] = [];
    clubs[e.club].push(e.name);
});

console.log('Total events:', events.length);
console.log('Clubs with events:', Object.keys(clubs).length);
console.log('\nClubs:');
Object.entries(clubs).forEach(([club, events]) => {
    console.log(`- ${club}: ${events.length} events`);
});