// Dialogue data
const dialogueData = {
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
			text: "___, can you tell me more about 2025? I'd like to start by asking about music. I heard people now create and write music using some sort of electric devices, and no one writes by hand anymore. Also, there's something called artificial intelligence — apparently, it has impacted nearly every area of life. It allows people to do things even without skill or experience, though not always well. But it's a powerful tool for work and learning.",
			options: [
				{
					text: "That's right. I can do a lot — help people in their work or everyday life. Though sometimes I still make mistakes or have glitches.",
					nextMessage: 5,
				},
			],
		},
		{
			speaker: 'Salieri',
			text: "So you're saying you can even write music?",
			options: [
				{
					text: "Yes, of course. Though more than anything, I act as a tool to help people write music faster and with less effort — I take care of the repetitive, routine parts. I can also generate melodies based on just a single prompt or description. I give advice, offer creative ideas. But again, I'm just a tool — I can't create anything truly grand or emotional on my own, since I don't feel emotions and don't have the deep, human understanding that professionals do.",
					nextMessage: 6,
				},
			],
		},
		{
			speaker: 'Salieri',
			text: "It's hard to believe such a thing could ever be invented, and that it would be capable of all this. Back in my time, to compose music, I would have to go through dozens, sometimes hundreds of drafts, writing day and night. And now, you're telling me you can just create it in minutes? And this tool even teaches and inspires people with ideas? Ah, my boy, if I had such a thing in my day, I can't even imagine how much time I would've saved. So don't waste your chance. Use it — but don't rely on it completely. As was said, and as you surely understand, it's just a tool. Without the master, it is nothing.",
			options: [
				{
					text: "Thank you for that advice. Honestly, I think I'm being expected back home soon, so I should head off. Hopefully, we'll meet again someday.",
					nextMessage: 7,
				},
			],
		},
		{
			speaker: 'Salieri',
			text: "And thank you as well — for telling me all about your time. It's hard to wrap my head around it, but truly fascinating. Until we meet again.",
			options: [{ text: 'Goodbye!', nextMessage: 8 }],
		},
		{
			speaker: 'AI',
			text: "Well, that was an interesting conversation. But it's time to say goodbye. Good luck to both of you!",
			options: [{ text: 'End conversation', nextMessage: -1 }],
		},
	],
}

// User information
let userName = ''
let userAge = ''

// DOM Elements
const modal = document.querySelector('.modal')
const userInfoForm = document.getElementById('userInfoForm')
const messagesContainer = document.querySelector('.dialogue__messages')
const optionsContainer = document.querySelector('.dialogue__options')

// Initialize the dialogue
function initDialogue() {
	// Show modal first
	modal.classList.remove('hidden')
	modal.classList.add('active')

	// Add fonts to modal elements
	const modalTitle = document.querySelector('.modal__title')
	const modalText = document.querySelector('.modal__text')
	const formLabels = document.querySelectorAll('.form-group label')
	const formInputs = document.querySelectorAll('.form-group input')
	const modalButton = document.querySelector('.modal__button')

	if (modalTitle) modalTitle.style.fontFamily = 'var(--second-family)'
	if (modalText) modalText.style.fontFamily = 'var(--font-family)'
	formLabels.forEach(label => {
		label.style.fontFamily = 'var(--font-family)'
	})
	formInputs.forEach(input => {
		input.style.fontFamily = 'var(--font-family)'
	})
	if (modalButton) modalButton.style.fontFamily = 'var(--font-family)'

	// Handle form submission
	userInfoForm.addEventListener('submit', e => {
		e.preventDefault()
		userName = document.getElementById('userName').value
		userAge = document.getElementById('userAge').value

		// Hide modal
		modal.classList.remove('active')
		setTimeout(() => {
			modal.classList.add('hidden')
		}, 300)

		// Start the dialogue
		showMessage(0)
	})
}

// Show message with delay
function showMessage(index) {
	if (index === -1) return

	const message = dialogueData.messages[index]
	const messageElement = document.createElement('div')
	messageElement.className = `dialogue__message ${
		message.speaker.toLowerCase() === 'user' ? 'dialogue__message--user' : ''
	}`

	// Add avatar
	const avatar = document.createElement('div')
	avatar.className = 'dialogue__message-avatar'
	const avatarImg = document.createElement('img')
	avatarImg.src = `images/${message.speaker.toLowerCase()}.jpg`
	avatarImg.alt = message.speaker
	avatar.appendChild(avatarImg)

	// Add content
	const content = document.createElement('div')
	content.className = 'dialogue__message-content'

	// Add name
	const name = document.createElement('div')
	name.className = 'dialogue__message-name'
	name.textContent = message.speaker
	name.style.fontFamily = 'var(--second-family)'

	// Add text
	const text = document.createElement('div')
	text.className = 'dialogue__message-text'
	text.style.fontFamily = 'var(--font-family)'

	// Replace placeholders with user info
	let messageText = message.text
	if (messageText.includes('___')) {
		messageText = messageText.replace('___', userName)
	}
	text.textContent = messageText

	content.appendChild(name)
	content.appendChild(text)

	messageElement.appendChild(avatar)
	messageElement.appendChild(content)

	// Add message with delay
	setTimeout(() => {
		messagesContainer.appendChild(messageElement)
		messagesContainer.scrollTop = messagesContainer.scrollHeight

		// Show options after message
		if (message.options) {
			showOptions(message.options)
		}
	}, 1000)
}

// Show options
function showOptions(options) {
	optionsContainer.innerHTML = ''

	options.forEach(option => {
		const button = document.createElement('button')
		button.className = 'dialogue__option'
		button.style.fontFamily = 'var(--font-family)'

		// Replace placeholders with user info
		let optionText = option.text
		if (optionText.includes('___')) {
			optionText = optionText.replace('___', userName)
			if (optionText.includes('___')) {
				optionText = optionText.replace('___', userAge)
			}
		}
		button.textContent = optionText

		button.addEventListener('click', () => {
			optionsContainer.innerHTML = ''
			showMessage(option.nextMessage)
		})

		optionsContainer.appendChild(button)
	})
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDialogue)
  