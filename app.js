// Load the moves from moves.json
fetch('moves.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load moves.json');
    }
    return response.json();
  })
  .then(data => {
    let moves = data; // This is the array of moves
    let moveIndex = 0; // Start from the first move

    // Function to update the move on the screen
    function updateMove() {
      const moveDisplay = document.getElementById('move-display');
      if (moveDisplay) {
        moveDisplay.innerText = moves[moveIndex];
      }
    }

    // Update the move on page load
    updateMove();

    // Button to go to the next move
    document.getElementById('next-move').addEventListener('click', function() {
      moveIndex++; // Move to the next move
      if (moveIndex >= moves.length) {
        moveIndex = 0; // Loop back to the first move
      }
      updateMove(); // Update the displayed move
    });

    // Timer logic (optional)
    let timer = 60; // Example timer in seconds
    let timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
      setInterval(function() {
        if (timer > 0) {
          timer--;
          timerDisplay.innerText = timer;
        }
      }, 1000);
    }

  })
  .catch(error => {
    console.error('Error loading moves.json:', error);
    document.getElementById('move-display').innerText = 'Error loading moves.';
  });
