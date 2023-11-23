//Set constants for each element
const darkModeButton = document.getElementById("dark-mode-toggle");
const body = document.body;
const paragraphs = document.querySelectorAll("p");
const header1 = document.querySelectorAll("h1");
const links = document.querySelectorAll("a");
const footer = document.querySelector("footer");
const boxes = document.querySelectorAll(".box");

// Creates a cookie function, need to pass through a name, a value, and amount of days
function setCookie(name, value, days) {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to get the value of a cookie by name
function getCookie(name) {
	const cookieName = `${name}=`;
	const cookieArray = document.cookie.split(";");

	for (let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];
		while (cookie.charAt(0) === " ") {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(cookieName) === 0) {
			return cookie.substring(cookieName.length, cookie.length);
		}
	}
	return "";
}

// Function to toggle dark mode based on the cookie
function toggleDarkMode() {
	const isDarkMode = body.classList.toggle("dark-mode");
	setCookie("darkMode", isDarkMode, 365);
	updateDarkModeStyles(isDarkMode);
	updateDarkModeToggleButton(isDarkMode);
}

// Dark mode/light mode button
function updateDarkModeToggleButton(isDarkMode) {
	// Dark mode -> Light mode
	if (isDarkMode) {
		darkModeButton.textContent = "Light Mode";
		darkModeButton.style.backgroundColor = "#fff"; 
		darkModeButton.style.color = "#333";
	} else {
		darkModeButton.textContent = "Dark Mode";
		darkModeButton.style.backgroundColor = "#333"; 
		darkModeButton.style.color = "#fff"; 
	}
}

// Updates CSS styles, might be better to create a darkmode for each element in the css file but I'm not sure
function updateDarkModeStyles(isDarkMode) {
	/*
	#fff - White
	#666 - Dark Gray
	#333 - Slightly Darker Gray
	#222 - Very Dark Gray
	#f4f4f4 - Light Gray
	*/
	paragraphs.forEach((paragraph) => {
		paragraph.style.color = isDarkMode ? "#fff" : "#666";
	});
	header1.forEach((header) => {
		header.style.color = isDarkMode ? "#fff" : "#333";
	});
	links.forEach((link) => {
	  link.style.color = isDarkMode ? "#fff" : "#333";
  });
	boxes.forEach((box) => {
		const boxBackgroundColor = isDarkMode ? "#222" : "#fff";
		box.style.backgroundColor = boxBackgroundColor;
		box.style.color = isDarkMode ? "#fff" : "#333";
	});
	body.style.backgroundColor = isDarkMode ? "#333" : "#f4f4f4";
	footer.style.backgroundColor = isDarkMode ? "#222" : "#fff";
}

// Check the cookie to initialize dark mode
const darkModeCookie = getCookie("darkMode");
if (darkModeCookie === "true") {
	body.classList.add("dark-mode");
	updateDarkModeStyles(true);
	updateDarkModeToggleButton(true);
}

// Button click
darkModeButton.addEventListener("click", () => {
	toggleDarkMode();
});
