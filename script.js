document.addEventListener("DOMContentLoaded", () => {
  const elementForm = document.getElementById("element-form")
  elementForm.addEventListener("submit", (e) => {
    e.preventDefault()
    createAndInsertElement()
  })

  const navLinks = document.querySelectorAll("nav a")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const pageId = this.getAttribute("data-page")
      changePage(pageId)

      navLinks.forEach((l) => l.classList.remove("active"))
      this.classList.add("active")
    })
  })

  function createAndInsertElement() {
    const tagName = document.getElementById("tag-select").value
    const attributesText = document.getElementById("attributes").value
    const stylesText = document.getElementById("styles").value
    const content = document.getElementById("content").value
    const targetSelector = document.getElementById("target-selector").value

    let attributes = {}
    let styles = {}

    try {
      if (attributesText.trim()) {
        attributes = JSON.parse(attributesText)
      }
    } catch (error) {
      alert("Invalid JSON format for attributes. Please check your input.")
      return
    }

    try {
      if (stylesText.trim()) {
        styles = JSON.parse(stylesText)
      }
    } catch (error) {
      alert("Invalid JSON format for styles. Please check your input.")
      return
    }

    const element = document.createElement(tagName)

    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value)
    }

    for (const [property, value] of Object.entries(styles)) {
      element.style[property] = value
    }

    if (tagName !== "img" && tagName !== "input") {
      element.innerHTML = content
    }

    if (tagName === "img") {
      element.setAttribute("alt", attributes.alt || "Image")
      if (!attributes.src) {
        element.setAttribute("src", "https://via.placeholder.com/150")
      }
    }

    if (tagName === "a" && !attributes.href) {
      element.setAttribute("href", "#")
    }

    let targetElement
    try {
      targetElement = document.querySelector(targetSelector)
      if (!targetElement) {
        throw new Error(`Target element "${targetSelector}" not found`)
      }
    } catch (error) {
      alert(`Error finding target element: ${error.message}`)
      return
    }

    targetElement.appendChild(element)

    
  }

  function changePage(pageId) {
    const pages = document.querySelectorAll(".page")
    pages.forEach((page) => {
      page.style.display = "none"
    })

    const selectedPage = document.getElementById(pageId)
    if (selectedPage) {
      selectedPage.style.display = "block"
    }
  }
})

