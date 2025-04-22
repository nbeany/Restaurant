const heroHeading = document.getElementById("hero-heading");
const heroDescription = document.getElementById("hero-description");
const heroImage = document.getElementById("hero-image");

const texts = [
  {
    heading: "Big Flavors",
    description:
      "Delicious food delivered to your doorstep. Order now and enjoy the best meals in University!",
  },
  {
    heading: "Fresh Ingredients",
    description:
      "We use only the freshest, finest ingredients to prepare your meals. Taste the delicious difference!",
  },
  {
    heading: "Fast Delivery",
    description:
      "Get your food delivered in no time—fresh, hot, and on the way! We guarantee fast and reliable service!",
  },
];

const images = [
  "../Images/Home Page Hero/Sliding Image 2 (2).png",
  "../Images/Home Page Hero/Sliding Image 3 (2).png",
  "../Images/Home Page Hero/Sliding Image 4.png",
];

let currentIndex = 0;

function changeContent() {
  // Add "out" animation classes to text and image
  heroHeading.classList.add("animate-text");
  heroDescription.classList.add("animate-text");
  heroImage.classList.add("animate-image-out");

  // Wait for the "out" animation to complete before changing content
  setTimeout(() => {
    // Update content
    currentIndex = (currentIndex + 1) % texts.length;
    heroHeading.textContent = texts[currentIndex].heading;
    heroDescription.textContent = texts[currentIndex].description;
    heroImage.src = images[currentIndex];

    // Remove "out" animation  and add "in" animation
    heroHeading.classList.remove("animate-text");
    heroDescription.classList.remove("animate-text");
    heroImage.classList.remove("animate-image-out");

    heroHeading.classList.add("animate-text");
    heroDescription.classList.add("animate-text");
    heroImage.classList.add("animate-image-in");

    // Remove "in" animation classes after the content reappears
    setTimeout(() => {
      heroHeading.classList.remove("animate-text");
      heroDescription.classList.remove("animate-text");
      heroImage.classList.remove("animate-image-in");
    }, 750); // Half of the animation duration (1.5s)
  }, 750); // Half of the animation duration (1.5s)
}

setInterval(changeContent, 6000);

// audio elements
const welcomeAudio = document.getElementById("welcomeAudio");
const menuExitAudio = document.getElementById("menuExitAudio");
const menuListAudio = document.getElementById("menuListAudio");
const blockNumberAudio = document.getElementById("blockNumberAudio");
const roomNumberAudio = document.getElementById("roomNumberAudio");
const orderSuccessAudio = document.getElementById("orderSuccessAudio");

// Get the sound control div, X button, countdown text, and playing text
const soundControlDiv = document.getElementById("soundControl");
const stopSoundButton = document.getElementById("stopSoundButton");
const countdownText = document
  .getElementById("countdown")
  .querySelector("span");
const playingText = document.getElementById("playingText");

// Variable to store the countdown interval
let countdownInterval;

// Function to show the sound control div
function showSoundControl() {
  soundControlDiv.style.display = "block";
}

// Function to hide the sound control div
function hideSoundControl() {
  soundControlDiv.style.display = "none";
}

// Function to stop all sounds
function stopAllSounds() {
  welcomeAudio.pause();
  welcomeAudio.currentTime = 0;
  menuExitAudio.pause();
  menuExitAudio.currentTime = 0;
  menuListAudio.pause();
  menuListAudio.currentTime = 0;
  blockNumberAudio.pause();
  blockNumberAudio.currentTime = 0;
  roomNumberAudio.pause();
  roomNumberAudio.currentTime = 0;
  orderSuccessAudio.pause();
  orderSuccessAudio.currentTime = 0;

  // Clear the countdown interval
  clearInterval(countdownInterval);

  // Hide the sound control div
  hideSoundControl();
}

//  X button
stopSoundButton.addEventListener("click", stopAllSounds);

//  start the countdown
function startCountdown() {
  let countdown = 5;
  showSoundControl();

  // Update the countdown text every second
  countdownInterval = setInterval(() => {
    countdownText.textContent = countdown;
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval); // Stop the countdown
      document.getElementById("countdown").style.display = "none"; // Hide countdown text
      playingText.style.display = "block"; // Show "Playing..." text

      // Play the welcome audio
      welcomeAudio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        alert(
          "Audio playback failed. Please interact with the page to enable sound."
        );
      });
    }
  }, 1000);
}

// Start the countdown only after user interaction
document.addEventListener(
  "click",
  () => {
    // Start the countdown only if it hasn't already started
    if (!countdownInterval) {
      startCountdown();
    }
  },
  { once: true }
);

// Variables to store user input
let selectedPizza = null;
let blockNumber = "";
let roomNumber = "";

// Function to handle the menu list selection
function handleMenuList() {
  // Play the menu list
  menuListAudio.play();

  // Listen for menu selection (1-24)
  function onMenuSelect(event) {
    const key = parseInt(event.key);
    if (key >= 1 && key <= 24) {
      selectedPizza = key; // Store the selected pizza

      // Remove the menu selection listener
      document.removeEventListener("keydown", onMenuSelect);

      // Ask for block number
      blockNumberAudio.play();

      // Listen for block number input (2 digits)
      function onBlockNumberInput(event) {
        if (event.key >= "0" && event.key <= "9") {
          blockNumber += event.key; // Append the digit

          // Automatically proceed after 2 digits are entered
          if (blockNumber.length === 2) {
            // Remove the block number listener
            document.removeEventListener("keydown", onBlockNumberInput);

            // Ask for room number
            roomNumberAudio.play();

            // Listen for room number input (3 digits)
            function onRoomNumberInput(event) {
              if (event.key >= "0" && event.key <= "9") {
                roomNumber += event.key; // Append the digit

                // Automatically proceed after 3 digits are entered
                if (roomNumber.length === 3) {
                  // Remove the room number listener
                  document.removeEventListener("keydown", onRoomNumberInput);

                  // Confirm the order
                  orderSuccessAudio.play();

                  // Show success alert after the audio finishes
                  orderSuccessAudio.onended = function () {
                    alert(
                      `You ordered Pizza ${selectedPizza}. Block: ${blockNumber}, Room: ${roomNumber}. Order successful!`
                    );
                  };
                }
              }
            }

            // Add the room number listener
            document.addEventListener("keydown", onRoomNumberInput);
          }
        }
      }

      // Add the block number listener
      document.addEventListener("keydown", onBlockNumberInput);
    }
  }

  // Add the menu selection listener
  document.addEventListener("keydown", onMenuSelect);
}

// Step 2: Detect if the user presses '1'
function onWelcomeInput(event) {
  if (event.key === "1") {
    // Play the menu/exit options
    menuExitAudio.play();

    // Remove the welcome input listener
    document.removeEventListener("keydown", onWelcomeInput);

    // Step 3: Listen for the next key press
    function onMenuExitInput(event) {
      if (event.key === "1") {
        // Remove the menu/exit input listener
        document.removeEventListener("keydown", onMenuExitInput);

        // Proceed to the menu list
        handleMenuList();
      } else if (event.key === "2") {
        // Exit the website
        window.close(); // Close the website (may not work in all browsers)
      }
    }

    // Add the menu/exit input listener
    document.addEventListener("keydown", onMenuExitInput);
  }
}

// Add the welcome input listener
document.addEventListener("keydown", onWelcomeInput);
