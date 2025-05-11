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
          moveToNextExercise();
        }
      }, 1000); // Update every second
    }
    
    // Function to display the next exercise
    function moveToNextExercise() {
      if (exerciseIndex >= exercises.length) {
        exerciseIndex = 0; // Reset to the first exercise
      }
      
      const currentExercise = exercises[exerciseIndex];
      const exerciseParts = currentExercise.split(" ");
      const exerciseName = exerciseParts.slice(0, -1).join(" ");
      const exerciseDuration = parseInt(exerciseParts[exerciseParts.length - 2]);
      
      moveDisplay.innerText = exerciseName; // Show the exercise name
      startTimer(exerciseDuration); // Start the timer for this exercise
      exerciseIndex++;
    }

    // Start the workout by clicking "Go" button
    startButton.addEventListener('click', function() {
      moveToNextExercise(); // Start with the first exercise
      startButton.disabled = true; // Disable the button after clicking
    });

    // (Optional) Button to manually go to the next exercise
    nextMoveButton.addEventListener('click', moveToNextExercise);
  })
  .catch(error => {
    console.error('Error loading moves.json:', error);
    document.getElementById('move-display').innerText = 'Error loading moves.';
  });
