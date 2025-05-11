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
    const timerDisplay = document.getElementById('timer');
    const nextMoveButton = document.getElementById('next-move');
    const startButton = document.getElementById('start-button');
    const sound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Sound for timer end
    
    // Function to update exercise and timer
    function startTimer(duration) {
      let timeRemaining = duration;
      timerDisplay.innerText = timeRemaining;
      
      timerInterval = setInterval(function() {
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
      
      // Log the exercise to debug it
      console.log('Current Exercise:', currentExercise);

      // Extract the exercise name and duration using regex
      const exerciseParts = currentExercise.match(/^(.+?)\s\((\d+)\sseconds\)$/);
      
      if (exerciseParts) {
        const exerciseName = exerciseParts[1]; // Extract exercise name
        const exerciseDuration = parseInt(exerciseParts[2]); // Extract and parse duration (e.g., 10 seconds)
        
        // Log the parsed data for debugging
        console.log('Exercise Name:', exerciseName);
        console.log('Exercise Duration (in seconds):', exerciseDuration);
        
        // If we have valid data, update the display and start the timer
        if (!isNaN(exerciseDuration)) {
          moveDisplay.innerText = exerciseName; // Show the exercise name
          startTimer(exerciseDuration); // Start the timer for this exercise
        } else {
          console.error('Invalid exercise duration:', exerciseDuration);
        }
      } else {
        console.error('Invalid exercise format:', currentExercise);
      }

      exerciseIndex++;
    }

    // Start the workout by clicking "Go" button
    startButton.addEventListener('click', function() {
      moveToNextExercise(); // Start with the first exercise
      startButton.disabled = true; // Disable the button after clicking
    });

    // Manual "Next Move" button
    nextMoveButton.addEventListener('click', function() {
      clearInterval(timerInterval); // Stop the current timer if "Next Move" is clicked
      moveToNextExercise(); // Move to the next exercise
    });
  })
  .catch(error => {
    console.error('Error loading moves.json:', error);
    document.getElementById('move-display').innerText = 'Error loading moves.';
  });
