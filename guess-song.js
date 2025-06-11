// Game data
const songs = [
	{
		title: 'Lacrimosa',
		composer: 'human',
		audio: './audio/lacrimosa.mp3',
		description:
			'Listen carefully and try to guess if this was composed by a human or AI',
	},
	{
		title: 'A Dueling Elegy',
		composer: 'ai',
		audio: './audio/a-dueling-elegy.mp3',
		description:
			'Listen carefully and try to guess if this was composed by a human or AI',
	},
	{
		title: 'Moonlight Sonata',
		composer: 'human',
		audio: './audio/Beethoven-MoonlightSonata.mp3',
		description:
			'Listen carefully and try to guess if this was composed by a human or AI',
	},
	{
		title: 'The Duel of Shadows',
		composer: 'ai',
		audio: './audio/the-duel-of-shadows.mp3',
		description:
			'Listen carefully and try to guess if this was composed by a human or AI',
	},
	{
		title: 'Canon in D',
		composer: 'human',
		audio: './audio/Canon_in_D_Piano.mp3',
		description:
			'Listen carefully and try to guess if this was composed by a human or AI',
	},
]

// Game state
let currentSongIndex = 0
let score = 0
let gameStarted = false

// DOM elements
let audioPlayer,
	songTitle,
	songDescription,
	progressText,
	scoreText,
	progressBar,
	humanButton,
	aiButton

// Initialize game
function initGame() {
	try {
		// Get DOM elements
		audioPlayer = document.getElementById('audio-player')
		songTitle = document.querySelector('.song-title')
		songDescription = document.querySelector('.song-description')
		progressText = document.querySelector('.progress-text')
		scoreText = document.querySelector('.score-text')
		progressBar = document.querySelector('.progress-bar__fill')
		humanButton = document.querySelector('.guess-button--human')
		aiButton = document.querySelector('.guess-button--ai')

		// Check if all elements were found
		if (
			!audioPlayer ||
			!songTitle ||
			!songDescription ||
			!progressText ||
			!scoreText ||
			!progressBar ||
			!humanButton ||
			!aiButton
		) {
			throw new Error('Some DOM elements were not found')
		}

		// Add error handling for audio loading
		audioPlayer.addEventListener('error', e => {
			console.error('Error loading audio:', e)
			songDescription.textContent = 'Error loading audio. Please try again.'
		})

		// Add loaded event handler
		audioPlayer.addEventListener('loadeddata', () => {
			console.log('Audio loaded successfully')
			songDescription.textContent = songs[currentSongIndex].description
		})

		console.log('All DOM elements found successfully')

		updateUI()
		addEventListeners()
		console.log('Game initialized successfully')
	} catch (error) {
		console.error('Error initializing game:', error)
	}
}

// Update UI elements
function updateUI() {
	try {
		const currentSong = songs[currentSongIndex]
		songTitle.textContent = `Song #${currentSongIndex + 1}`
		songDescription.textContent = 'Loading audio...'

		// Reset audio player
		audioPlayer.pause()
		audioPlayer.currentTime = 0

		// Update audio source
		audioPlayer.src = currentSong.audio
		audioPlayer.load() // Force reload of audio

		progressText.textContent = `Progress: ${currentSongIndex + 1}/${
			songs.length
		}`
		scoreText.textContent = `Score: ${score}`
		progressBar.style.width = `${
			((currentSongIndex + 1) / songs.length) * 100
		}%`
		console.log('UI updated successfully')
	} catch (error) {
		console.error('Error updating UI:', error)
	}
}

// Add event listeners
function addEventListeners() {
	try {
		humanButton.addEventListener('click', () => makeGuess('human'))
		aiButton.addEventListener('click', () => makeGuess('ai'))

		audioPlayer.addEventListener('play', () => {
			if (!gameStarted) {
				gameStarted = true
				console.log('Game started')
			}
		})

		audioPlayer.addEventListener('error', e => {
			console.error('Error loading audio:', e)
		})

		console.log('Event listeners added successfully')
	} catch (error) {
		console.error('Error adding event listeners:', error)
	}
}

// Handle guess
function makeGuess(guess) {
	try {
		if (!gameStarted) {
			console.log('Game not started yet')
			return
		}

		const currentSong = songs[currentSongIndex]
		const isCorrect = guess === currentSong.composer

		console.log(
			`Guess made: ${guess}, Correct answer: ${currentSong.composer}, Is correct: ${isCorrect}`
		)

		// Show result
		const resultMessage = isCorrect
			? `Correct! This was composed by a ${
					currentSong.composer === 'human' ? 'human' : 'AI'
			  }`
			: `Wrong! This was actually composed by a ${
					currentSong.composer === 'human' ? 'human' : 'AI'
			  }`

		songDescription.textContent = resultMessage

		// Add visual feedback
		const clickedButton = guess === 'human' ? humanButton : aiButton
		const correctButton =
			currentSong.composer === 'human' ? humanButton : aiButton

		clickedButton.classList.add(isCorrect ? 'correct' : 'incorrect')
		if (!isCorrect) {
			correctButton.classList.add('correct')
		}

		// Update score
		if (isCorrect) {
			score++
			scoreText.textContent = `Score: ${score}`
		}

		// Disable buttons temporarily
		humanButton.disabled = true
		aiButton.disabled = true

		// Move to next song after delay
		setTimeout(() => {
			// Remove visual feedback classes
			humanButton.classList.remove('correct', 'incorrect')
			aiButton.classList.remove('correct', 'incorrect')

			currentSongIndex++

			if (currentSongIndex < songs.length) {
				updateUI()
				humanButton.disabled = false
				aiButton.disabled = false
			} else {
				showGameOver()
			}
		}, 2000)
	} catch (error) {
		console.error('Error handling guess:', error)
	}
}

// Show game over screen
function showGameOver() {
	try {
		const accuracy = (score / songs.length) * 100
		songTitle.textContent = 'Game Over!'
		songDescription.textContent = `Your final score: ${score}/${songs.length} (${accuracy}% accuracy)`
		humanButton.style.display = 'none'
		aiButton.style.display = 'none'

		// Add restart button
		const restartButton = document.createElement('button')
		restartButton.className = 'guess-button'
		restartButton.innerHTML =
			'<span class="guess-button__icon">🔄</span><span class="guess-button__text">Play Again</span>'
		restartButton.addEventListener('click', restartGame)
		document.querySelector('.guess-buttons').appendChild(restartButton)
		console.log('Game over screen shown')
	} catch (error) {
		console.error('Error showing game over screen:', error)
	}
}

// Restart game
function restartGame() {
	try {
		currentSongIndex = 0
		score = 0
		gameStarted = false
		updateUI()
		humanButton.style.display = 'flex'
		aiButton.style.display = 'flex'
		humanButton.disabled = false
		aiButton.disabled = false
		document.querySelector('.guess-buttons').lastChild.remove()
		console.log('Game restarted')
	} catch (error) {
		console.error('Error restarting game:', error)
	}
}

// Start game when page loads
document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM loaded, initializing game...')
	initGame()
})
