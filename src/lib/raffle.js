// Load tickets data - using dynamic import for large JSON file
let df_tickets = []
let ticketsLoaded = false
let ticketsLoading = false

// Function to load tickets data
async function loadTickets() {
  if (ticketsLoaded) return df_tickets
  if (ticketsLoading) {
    // Wait for ongoing load
    while (ticketsLoading) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    return df_tickets
  }
  
  ticketsLoading = true
  
  try {
    // Try importing as raw text first (Vite handles ?raw imports)
    const module = await import('./tickets.txt?raw')
    const text = module.default || module
    df_tickets = JSON.parse(text)
    ticketsLoaded = true
    ticketsLoading = false
    console.log(`Loaded ${df_tickets.length} tickets`)
    return df_tickets
  } catch (error) {
    console.error('Error loading tickets data:', error)
    // Try fetch as fallback
    try {
      const response = await fetch(new URL('./tickets.txt', import.meta.url))
      const text = await response.text()
      df_tickets = JSON.parse(text)
      ticketsLoaded = true
      ticketsLoading = false
      console.log(`Loaded ${df_tickets.length} tickets (via fetch)`)
      return df_tickets
    } catch (err) {
      console.error('Error with fetch fallback:', err)
      df_tickets = []
      ticketsLoading = false
      return []
    }
  }
}

async function generateRaffleNumberJS() {
    let raffleNumber = [];
    console.log('Starting raffle number generation...');

    // Helper to delay and log
    const drawDigit = (digit, msg) => new Promise(resolve => {
        setTimeout(() => {
            raffleNumber.push(String(digit));
            console.log(msg, digit);
            resolve();
        }, 500);
    });

    // First digit: 0 or 1
    const digit1 = Math.random() < 0.5 ? 0 : 1;
    await drawDigit(digit1, 'Drawing 1st digit:');

    // Second digit: 9 or 0
    const digit2 = Math.random() < 0.5 ? 9 : 0;
    await drawDigit(digit2, 'Drawing 2nd digit:');

    // Third digit: 0, 1 or 9
    const digit3Options = [0, 1, 9];
    const digit3 = digit3Options[Math.floor(Math.random() * digit3Options.length)];
    await drawDigit(digit3, 'Drawing 3rd digit:');

    // Remaining four digits: 0-9
    for (let i = 4; i <= 7; i++) {
        const digit = Math.floor(Math.random() * 10);
        await drawDigit(digit, `Drawing ${i}th digit:`);
    }

    const finalNumber = raffleNumber.join('');
    console.log(`\nGenerated Raffle Number: ${finalNumber}`);
    return finalNumber;
}

// Function to find a donor by a generated raffle number
async function findDonorByRaffleNumberJS() {
    while (true) {
        const generatedRaffle = await generateRaffleNumberJS();

        // Find if the generated raffle number exists in df_tickets
        const matchingDonor = df_tickets.find(ticket => ticket.raffle_ticket_7d === generatedRaffle);

        if (matchingDonor) {
            const donorName = matchingDonor.donor;
            console.log(`\nCongratulations! The winner is: ${donorName}`);
            return { winner: donorName, ticketNumber: generatedRaffle, ticketData: matchingDonor };
        } else {
            console.log(`\nNo donor found for the generated raffle number: ${generatedRaffle}. Retrying...`);
        }
    }
}

// Function to generate raffle number with callback for each digit (for UI animation)
async function generateRaffleNumberWithCallback(onDigitDrawn) {
    let raffleNumber = [];

    const drawDigit = async (digit, position) => {
        raffleNumber.push(String(digit));
        if (onDigitDrawn) {
            onDigitDrawn(raffleNumber.join('').padEnd(7, '0'), position);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    };

    // First digit: 0 or 1
    const digit1 = Math.random() < 0.5 ? 0 : 1;
    await drawDigit(digit1, 0);

    // Second digit: 9 or 0
    const digit2 = Math.random() < 0.5 ? 9 : 0;
    await drawDigit(digit2, 1);

    // Third digit: 0, 1 or 9
    const digit3Options = [0, 1, 9];
    const digit3 = digit3Options[Math.floor(Math.random() * digit3Options.length)];
    await drawDigit(digit3, 2);

    // Remaining four digits: 0-9
    for (let i = 3; i < 7; i++) {
        const digit = Math.floor(Math.random() * 10);
        await drawDigit(digit, i);
    }

    return raffleNumber.join('');
}

// Function to find winner with callback for UI updates
async function findWinnerWithCallback(onDigitDrawn, onWinnerFound) {
    // Ensure tickets are loaded
    await loadTickets();
    
    if (df_tickets.length === 0) {
        throw new Error('No tickets data available');
    }

    let attempts = 0;
    const maxAttempts = 100; // Safety limit to prevent infinite loops

    while (attempts < maxAttempts) {
        const generatedRaffle = await generateRaffleNumberWithCallback(onDigitDrawn);
        attempts++;

        const matchingDonor = df_tickets.find(ticket => ticket.raffle_ticket_7d === generatedRaffle);

        if (matchingDonor) {
            const result = {
                winner: matchingDonor.donor,
                ticketNumber: generatedRaffle,
                ticketData: matchingDonor
            };
            if (onWinnerFound) {
                onWinnerFound(result);
            }
            return result;
        }
    }

    throw new Error('Could not find a winner after maximum attempts');
}

export { generateRaffleNumberJS, findDonorByRaffleNumberJS, findWinnerWithCallback, generateRaffleNumberWithCallback, loadTickets }
