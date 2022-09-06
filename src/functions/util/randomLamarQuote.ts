export default function randomLamarQuote(): string {
	const lamarQuotes = [
		"Sup, can a loc come up in your crib?",
		"What's happnin'?",
		"You ready to get schooled?",
		"Ayy, what it do??",
		"What's up, homie?",
		"What's up, bro?",
		"How's it goin'?",
		"What's the fizzness?",
		"Excuse me, amigo?",
		"Well ain't this fun, homie?",
		"Man, where the noise at?",
	];

	return lamarQuotes[Math.floor(Math.random() * lamarQuotes.length)];
}
