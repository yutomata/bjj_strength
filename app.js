// Ensure all the necessary DOM elements are loaded before starting the timer
window.onload = function () {
  // Fetch exercises from moves.json
  fetch('moves.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load moves.json');
      }
      return response.json();
    })
    .then(data => {
      let exercises = data; // Array of exercises
      let exerciseIndex = 0; // Track current exercise
      let timerInterval;

      // DOM elements
      const moveDisplay = document.getElementById('move-display');
      const descriptionDisplay = document.getElementById('description-display');
      const timerDisplay = document.getElementById('timer');
      const nextMoveButton = document.getElementById('next-move');
      const startButton = document.getElementById('start-button');
      const sound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Sound for timer end

      // Function to update exercise and timer
      function startTimer(duration) {
        let timeRemaining = duration;
        timerDisplay.innerText = timeRemaining;

        timerInterval = setInterval(function () {
          timeRemaining--;
          timerDisplay.innerText = timeRemaining;

          // When timer ends
          if (timeRemaining <= 0) {
            clearInterval(timerInterval); // Stop the timer
            sound.play(); // Play beep sound
            moveToNextExercise(); // Move to the next exercise automatically
          }
        }, 1000); // Update every second
      }

      // Function to display the next exercise
      function moveToNextExercise() {
        if (exerciseIndex >= exercises.length) {
          exerciseIndex = 0; // Reset to the first exercise
        }

        const currentExercise = exercises[exerciseIndex];
        console.log('Current Exercise:', currentExercise); // Debug log

        // Update the exercise name and description
        moveDisplay.innerText = currentExercise.name;
        descriptionDisplay.innerText = currentExercise.description;

        // Start the timer for the exercise duration
        startTimer(currentExercise.duration);

        exerciseIndex++;
      }

      // Start the workout by clicking "Go" button
      startButton.addEventListener('click', function () {
        moveToNextExercise(); // Start with the first exercise
        startButton.disabled = true; // Disable the button after clicking
      });

      // Manual "Next Move" button
      nextMoveButton.addEventListener('click', function () {
        clearInterval(timerInterval); // Stop the current timer if "Next Move" is clicked
        moveToNextExercise(); // Move to the next exercise
      });
    })
    .catch(error => {
      console.error('Error loading moves.json:', error);
      document.getElementById('move-display').innerText = 'Error loading moves.';
    });
};
