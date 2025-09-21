// Quote of the Day
document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    "Take a deep breath, you are doing your best.",
    "Self-care is how you take your power back.",
    "One step at a time is still progress.",
    "Healing is not linear—be kind to yourself.",
    "Your feelings are valid, your journey matters."
  ];

  const quoteElement = document.getElementById("quote-of-the-day");
  if (quoteElement) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = randomQuote;
  }
});
