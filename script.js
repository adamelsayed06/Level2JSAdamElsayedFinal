function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize game variables
let images = [
  'Images/image1.jpg',
  'Images/image2.jpeg',
  'Images/image3.jpeg',
  'Images/image4.jpeg',
  'Images/image5.jpg',
  'Images/image6.jpeg',
  'Images/image7.jpeg',
  'Images/image8.jpeg'
];
images = images.concat(images); // Duplicate images to create pairs
shuffleArray(images);

let revealedImages = [];
let clicks = 0;

// Function to handle image click
function revealImage(index) {
  if (revealedImages.length < 2) {
    document.getElementById(`img${index}`).src = `Images/${images[index]}`;
    revealedImages.push({ index, image: images[index] });

    if (revealedImages.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

// Function to check if the revealed images match
function checkMatch() {
  const [img1, img2] = revealedImages;

  if (img1.image === img2.image) {
    // Match found
    revealedImages = [];
  } else {
    // No match, hide the images
    document.getElementById(`img${img1.index}`).src = 'Images/hidden.jpg';
    document.getElementById(`img${img2.index}`).src = 'Images/hidden.jpg';
    revealedImages = [];
  }

  clicks++;
  updateScore();

  // Check if all pairs are found
  if (revealedImages.length === 0 && clicks === images.length / 2) {
    alert(`Congratulations! You completed the game in ${clicks} clicks.`);
    resetGame();
  }
}

// Function to update the score
function updateScore() {
  document.getElementById('scoreValue').textContent = clicks;
}

// Function to reset the game
function resetGame() {
  revealedImages = [];
  clicks = 0;
  updateScore();

  // Reset grid to hidden images
  for (let i = 0; i < images.length; i++) {
    document.getElementById(`img${i}`).src = 'Images/hidden.jpg';
  }

  // Reshuffle images
  shuffleArray(images);
}

// Dynamically create the grid of images
const grid = document.getElementById('grid');
for (let i = 0; i < images.length; i++) {
  const gridItem = document.createElement('div');
  gridItem.className = 'grid-item';
  gridItem.innerHTML = `<img id="img${i}" src="Images/hidden.jpg" alt="Hidden Image" onclick="revealImage(${i})">`;
  grid.appendChild(gridItem);
}