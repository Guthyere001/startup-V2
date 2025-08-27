// Global state
let currentUser = null
let chatMessages = [{ type: "bot", message: "Olá! Sou seu assistente de fitness. Como posso te ajudar hoje?" }]

// DOM elements
const navButtons = document.querySelectorAll(".nav-btn")
const sections = document.querySelectorAll(".section")
const heroButtons = document.querySelectorAll("[data-section]")
const loginBtn = document.getElementById("login-btn")
const logoutBtn = document.getElementById("logout-btn")
const authModal = document.getElementById("auth-modal")
const modalClose = document.getElementById("modal-close")
const authTabs = document.querySelectorAll(".auth-tab")
const authForms = document.querySelectorAll(".auth-form")
const loginForm = document.getElementById("login-form-element")
const signupForm = document.getElementById("signup-form-element")
const chatInput = document.getElementById("chat-input")
const sendBtn = document.getElementById("send-btn")
const chatMessages_el = document.getElementById("chat-messages")
const authLoggedOut = document.getElementById("auth-logged-out")
const authLoggedIn = document.getElementById("auth-logged-in")
const userNameSpan = document.getElementById("user-name")

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  // Check for saved user
  const savedUser = localStorage.getItem("nutrein_user")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    updateAuthUI()
  }

  // Load saved chat messages
  const savedMessages = localStorage.getItem("nutrein_chat")
  if (savedMessages) {
    chatMessages = JSON.parse(savedMessages)
    renderChatMessages()
  }

  setupEventListeners()
})

// Event listeners
function setupEventListeners() {
  // Navigation
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section
      showSection(section)
      updateActiveNavButton(btn)
    })
  })

  // Hero buttons
  heroButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section
      if (section) {
        showSection(section)
        updateActiveNavButton(document.querySelector(`[data-section="${section}"]`))
      }
    })
  })

  // Auth modal
  loginBtn.addEventListener("click", () => {
    authModal.classList.add("active")
  })

  modalClose.addEventListener("click", () => {
    authModal.classList.remove("active")
  })

  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) {
      authModal.classList.remove("active")
    }
  })

  // Auth tabs
  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabType = tab.dataset.tab
      switchAuthTab(tabType)
    })
  })

  // Auth forms
  loginForm.addEventListener("submit", handleLogin)
  signupForm.addEventListener("submit", handleSignup)

  // Logout
  logoutBtn.addEventListener("click", handleLogout)

  // Chat
  sendBtn.addEventListener("click", sendMessage)
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })
}

// Navigation functions
function showSection(sectionName) {
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  const targetSection = document.getElementById(`${sectionName}-section`)
  if (targetSection) {
    targetSection.classList.add("active")
  }
}

function updateActiveNavButton(activeBtn) {
  navButtons.forEach((btn) => {
    btn.classList.remove("active")
  })

  if (activeBtn && activeBtn.classList.contains("nav-btn")) {
    activeBtn.classList.add("active")
  }
}

// Auth functions
function switchAuthTab(tabType) {
  authTabs.forEach((tab) => {
    tab.classList.remove("active")
  })

  authForms.forEach((form) => {
    form.classList.remove("active")
  })

  document.querySelector(`[data-tab="${tabType}"]`).classList.add("active")
  document.getElementById(`${tabType}-form`).classList.add("active")
}

function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  if (email && password) {
    // Simple demo login - in real app would validate against backend
    currentUser = {
      email: email,
      name: email.split("@")[0],
    }

    localStorage.setItem("nutrein_user", JSON.stringify(currentUser))
    updateAuthUI()
    authModal.classList.remove("active")

    // Reset form
    loginForm.reset()
  }
}

function handleSignup(e) {
  e.preventDefault()

  const name = document.getElementById("signup-name").value
  const email = document.getElementById("signup-email").value
  const password = document.getElementById("signup-password").value

  if (name && email && password) {
    // Simple demo signup - in real app would create user in backend
    currentUser = {
      email: email,
      name: name,
    }

    localStorage.setItem("nutrein_user", JSON.stringify(currentUser))
    updateAuthUI()
    authModal.classList.remove("active")

    // Reset form
    signupForm.reset()
  }
}

function handleLogout() {
  currentUser = null
  localStorage.removeItem("nutrein_user")
  updateAuthUI()
}

function updateAuthUI() {
  if (currentUser) {
    authLoggedOut.classList.add("hidden")
    authLoggedIn.classList.remove("hidden")
    userNameSpan.textContent = `Olá, ${currentUser.name}`
  } else {
    authLoggedOut.classList.remove("hidden")
    authLoggedIn.classList.add("hidden")
  }
}

// Chat functions
function sendMessage() {
  const message = chatInput.value.trim()

  if (message) {
    // Add user message
    chatMessages.push({
      type: "user",
      message: message,
    })

    // Add bot response
    chatMessages.push({
      type: "bot",
      message: "Obrigado pela sua pergunta! Estou processando sua solicitação sobre fitness e nutrição.",
    })

    // Save to localStorage
    localStorage.setItem("nutrein_chat", JSON.stringify(chatMessages))

    // Render messages
    renderChatMessages()

    // Clear input
    chatInput.value = ""
  }
}

function renderChatMessages() {
  chatMessages_el.innerHTML = ""

  chatMessages.forEach((msg) => {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${msg.type}-message`

    const avatarDiv = document.createElement("div")
    avatarDiv.className = `message-avatar ${msg.type}-avatar`

    if (msg.type === "bot") {
      avatarDiv.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/>
                </svg>
            `
    } else {
      avatarDiv.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            `
    }

    const contentDiv = document.createElement("div")
    contentDiv.className = "message-content"
    contentDiv.innerHTML = `<p>${msg.message}</p>`

    messageDiv.appendChild(avatarDiv)
    messageDiv.appendChild(contentDiv)

    chatMessages_el.appendChild(messageDiv)
  })

  // Scroll to bottom
  chatMessages_el.scrollTop = chatMessages_el.scrollHeight
}

// Professional consultation booking (demo)
document.addEventListener("click", (e) => {
  if (e.target.textContent === "Agendar Consulta") {
    if (currentUser) {
      alert("Consulta agendada com sucesso! Você receberá um email de confirmação.")
    } else {
      alert("Por favor, faça login para agendar uma consulta.")
      authModal.classList.add("active")
    }
  }
})

// Initialize chat messages on load
renderChatMessages()
