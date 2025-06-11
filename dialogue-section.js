// Dialogue data
const dialogueData = {
	backstory: {
		salieri:
			"While walking through his house, Salieri accidentally noticed a hidden passage. He was very surprised to find some very old and unusual doors that seemed to be calling to him. Curious, he thought it was worth opening them. As soon as he opened the doors, he was surrounded by a white light that slowly pulled him in. He could no longer feel his body and all he could see was some strange interface (just a regular chat screen). He didn't panic and soon realized that everything he said turned into words and was sent through this chat.",
		user: 'On that same day, you downloaded a strange "time-bridging chat" app just for fun. You were very skeptical about it, but still curious to see what the developers had created. The app said that it allowed people to talk to others from different time periods up to the year 2025. You waited a long time for it to find a match. Just as you were about to cancel, a message popped up: "Chat partner found: Salieri." In that moment, you were also pulled into a white light and found yourself in the same situation as Salieri.',
		ending:
			"The AI closes the chat. You and Salieri return to your respective times. The program deletes itself. And yet… you can't stop thinking about what just happened…",
	},
	messages: [
		{
			speaker: 'AI',
			text: 'Well then, both users have been successfully matched.',
			options: [{ text: 'Continue', nextMessage: 1 }],
		},
		{
			speaker: 'Salieri',
			text: "Ahhh! Tell me where I am and what's going on. What is this strange contraption in front of me?",
			options: [
				{
					text: 'Whoa dude, what the heck... Where even are we? And how do we get back?!',
					nextMessage: 2,
				},
			],
		},
		{
			speaker: 'AI',
			text: "Calm down, I understand your confusion. You're both safe. You can leave this place at any moment if you choose to, though I wouldn't recommend it — it's not every day you get the chance to speak with someone from a completely different time. Also, this app is still in beta, and you, ___, were actually the first user. The program will delete itself from your device after the chat ends.",
			options: [
				{
					text: "Got it. Well, let's at least introduce ourselves. My name is ___, I'm ___ years old, and I'm from the year 2025.",
					nextMessage: 3,
				},
			],
		},
		{
			speaker: 'Salieri',
			text: "Well, I am Salieri, court composer to the Emperor. I'm 73 years old, and it's the year 1823 for me.",
			options: [
				{
					text: "This all feels really strange and kind of sketchy... but after everything I've just seen, those doubts are starting to fade.",
					nextMessage: 4,
				},
			],
		},
		{
			speaker: 'Salieri',
			text: "___, can you tell me more about 2025? I'd like to start by asking about music. How are people make music right now?.",
			options: [
				{
					text: 'One of the most interesting things right noe that was developed in few years is AI, it is really powerful thing which people use on a daily basis now.',
					nextMessage: 5,
				},
			],
		},
		{
			speaker: 'AI',
			text: "That's right. I can do a lot — help people in their work or everyday life.Allow people to do things even without skill or experience, though not always well. But it's a powerful tool for work and learning. Though sometimes I still make mistakes or have glitches.",
			options: [
				{
					text: 'Continue',
					nextMessage: 6,
				},
			],
		},
		{
			speaker: 'Salieri',
			text: "So you're saying you can even write music?",
			options: [
				{
					text: 'Continue',
					nextMessage: 7,
				},
			],
		},
		{
			speaker: 'AI',
			text: "Yes, of course. Though more than anything, I act as a tool to help people write music faster and with less effort — I take care of the repetitive, routine parts. I can also generate melodies based on just a single prompt or description. I give advice, offer creative ideas. But again, I'm just a tool — I can't create anything truly grand or emotional on my own, since I don't feel emotions and don't have the deep, human understanding that professionals do.",
			options: [
				{
					text: 'Continue',
					nextMessage: 8,
				},
			],
		},
		{
			speaker: 'Salieri',
			text: "It's hard to believe such a thing could ever be invented, and that it would be capable of all this. Back in my time, to compose music, I would have to go through dozens, sometimes hundreds of drafts, writing day and night. And now, you're telling me you can just create it in minutes? And this tool even teaches and inspires people with ideas? Ah, my boy, if I had such a thing in my day, I can't even imagine how much time I would've saved. So don't waste your chance. Use it — but don't rely on it completely. As was said, and as you surely understand, it's just a tool. Without the master, it is nothing.",
			options: [
				{
					text: "Thank you for that advice. Honestly, I think I'm being expected back home soon, so I should head off. Hopefully, we'll meet again someday.",
					nextMessage: 9,
				},
			],
		},
		{
			speaker: 'Salieri',
			text: "And thank you as well — for telling me all about your time. It's hard to wrap my head around it, but truly fascinating. Until we meet again.",
			options: [
				{
					text: 'Continue',
					nextMessage: 10,
				},
			],
		},
		{
			speaker: 'AI',
			text: "Well, that was an interesting conversation. But it's time to say goodbye. Good luck to both of you!",
			options: [
				{
					text: 'End Chat',
					nextMessage: -1,
				},
			],
		},
	],
}

let currentMessageIndex = 0
let userName = ''
let userAge = ''
let isTyping = false

// DOM Elements
const modal = document.querySelector('.modal')
const userInfoForm = document.getElementById('userInfoForm')
const messagesContainer = document.querySelector('.dialogue__messages')
const optionsContainer = document.querySelector('.dialogue__options')

function showBackstory() {
	const backstoryContainer = document.createElement('div')
	backstoryContainer.className = 'dialogue__backstory'

	const salieriStory = document.createElement('p')
	salieriStory.textContent = dialogueData.backstory.salieri
	salieriStory.className = 'dialogue__backstory-text'

	const userStory = document.createElement('p')
	userStory.textContent = dialogueData.backstory.user
	userStory.className = 'dialogue__backstory-text'

	const continueButton = document.createElement('button')
	continueButton.textContent = 'Continue'
	continueButton.className = 'dialogue__option'
	continueButton.onclick = () => {
		backstoryContainer.remove()
		showMessage(0)
	}

	backstoryContainer.appendChild(salieriStory)
	backstoryContainer.appendChild(userStory)
	backstoryContainer.appendChild(continueButton)

	const dialogueContainer = document.querySelector('.dialogue__container')
	dialogueContainer.appendChild(backstoryContainer)
}

// Function to show ending
function showEnding() {
	const endingContainer = document.createElement('div')
	endingContainer.className = 'dialogue__ending'

	const endingText = document.createElement('p')
	endingText.textContent = dialogueData.backstory.ending
	endingText.className = 'dialogue__ending-text'

	endingContainer.appendChild(endingText)
	const dialogueContainer = document.querySelector('.dialogue__container')
	dialogueContainer.appendChild(endingContainer)
}

// Initialize dialogue
function initDialogue() {
	const form = document.getElementById('userInfoForm')
	const dialogueContainer = document.querySelector('.dialogue__container')

	// Show modal first
	modal.classList.remove('hidden')
	modal.classList.add('active')

	form.addEventListener('submit', e => {
		e.preventDefault()
		userName = document.getElementById('userName').value
		userAge = document.getElementById('userAge').value

		// Hide modal with animation
		modal.classList.remove('active')
		setTimeout(() => {
			modal.classList.add('hidden')

			// Show dialogue container with animation
			dialogueContainer.style.display = 'flex'
			dialogueContainer.style.opacity = '0'
			dialogueContainer.style.transform = 'translateY(20px)'

			// Force reflow
			dialogueContainer.offsetHeight

			// Add active class for animation
			dialogueContainer.classList.add('active')

			// Show backstory first
			showBackstory()
		}, 300)
	})
}

// Show message with delay
function showMessage(index) {
	if (isTyping) return
	isTyping = true

	const message = dialogueData.messages[index]
	const messageElement = document.createElement('div')
	messageElement.className = `dialogue__message dialogue__message--${message.speaker.toLowerCase()}`

	const speakerElement = document.createElement('div')
	speakerElement.className = 'dialogue__speaker'
	speakerElement.textContent = message.speaker

	const textElement = document.createElement('div')
	textElement.className = 'dialogue__text'
	textElement.textContent = '' // Start with empty text

	messageElement.appendChild(speakerElement)
	messageElement.appendChild(textElement)
	messagesContainer.appendChild(messageElement)

	// Scroll to bottom
	messagesContainer.scrollTop = messagesContainer.scrollHeight

	// Type out the message slowly
	let text = message.text

	// Replace placeholders with user data
	if (text.includes('___')) {
		if (text.includes("My name is ___, I'm ___ years old")) {
			text = text.replace('___', userName).replace('___', userAge)
		} else {
			text = text.replace('___', userName)
		}
	}

	let charIndex = 0

	const typeText = () => {
		if (charIndex < text.length) {
			textElement.textContent += text.charAt(charIndex)
			charIndex++
			messagesContainer.scrollTop = messagesContainer.scrollHeight
			setTimeout(typeText, 30) // Speed of typing
		} else {
			// Show options after typing is complete
			setTimeout(() => {
				showOptions(message.options)
				isTyping = false
			}, 500)
		}
	}

	// Start typing after a short delay
	setTimeout(typeText, 500)
}

// Show options
function showOptions(options) {
	optionsContainer.innerHTML = ''
	optionsContainer.classList.remove('hidden')

	options.forEach(option => {
		const button = document.createElement('button')
		button.className = 'dialogue__option'
		button.textContent = option.text
		button.addEventListener('click', () => {
			// Hide options with animation
			optionsContainer.classList.add('hidden')

			setTimeout(() => {
				if (option.nextMessage === -1) {
					// End chat
					const dialogueContainer = document.querySelector(
						'.dialogue__container'
					)
					dialogueContainer.innerHTML =
						'<div class="dialogue__end">The chat has ended. Thank you for participating!</div>'
				} else {
					showMessage(option.nextMessage)
				}
			}, 300) // Wait for fade out animation
		})
		optionsContainer.appendChild(button)
	})
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDialogue)
