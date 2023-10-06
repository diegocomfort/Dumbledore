// PASTE YOUR API KEY HERE
const apiKey = "";

// The chat history
const history = [];

// Array of quotes from Albus Dumbledore
const quotes = [
    "It does not do to dwell on dreams and forget to live.",
    "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.",
    "To the well-organized mind, death is but the next great adventure.",
    "It is our choices, Harry, that show what we truly are, far more than our abilities.",
    "Numbing the pain for a while will make it worse when you finally feel it.",
    "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.",
    "Dark times lie ahead of us and there will be a time when we must choose between what is easy and what is right.",
    "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
    "We must all face the choice between what is right and what is easy.",
    "The truth is a beautiful and terrible thing, and should therefore be treated with great caution.",
];

/**
 * Get a response from ChatGTP
 * @param {string} prompt your prompt
 * @returns {string} ChatGTP's response
 */
async function get_responce(prompt) {
    // Add user prompt to the history array
    history.push({ role: "user", content: prompt });

    try {
        // Request responce from OpenAI API
        const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: history,
                temperature: 0.4,
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const completion = await res.json();
        
        // // Add the API response to the history array
        history.push(completion.choices[0].message);
        
        // Return the content of the API response
        return completion.choices[0].message.content;
    } catch (error) {
        return Object.toString(error);
    }
}

// Accessing DOM elements
const message_folder = window.document.getElementById("messageFolder");
const submit_button = window.document.getElementById("submitButton");

// Event listener for submit button click
submit_button.addEventListener("click", async () => {
    // Get user input from text input field
    const input = window.document.getElementById("textInput");
    const prompt = input.value;

    // Create a message element for the prompt and append it to the message folder
    const prompt_div = createMessageElement(prompt, "prompt");
    message_folder.appendChild(prompt_div);
    window.scrollTo(0, window.document.body.scrollHeight);

    // Clear the input field and adjust the UI
    input.value = "";
    input.style.height = "18px";
    message_folder.style.paddingBottom = "84px";

    // Get a response from the OpenAI API
    const response = await get_responce(prompt);

    // Set a random quote as the text content of the submit button
    submit_button.textContent =
        quotes[Math.floor(Math.random() * quotes.length)];

    // Create a message element for the response and append it to the message folder
    const response_div = createMessageElement(response, "response");
    message_folder.appendChild(response_div);
    window.scrollTo(0, window.document.body.scrollHeight);
});

// Event listener for Ctrl+Enter key press
window.document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key == "Enter") {
        submit_button.click();
    }
});

// Function to create a message element
const createMessageElement = (message, class_name) => {
    const holder = window.document.createElement("div");
    holder.setAttribute("class", "message " + class_name);
    message.split("\n").forEach((e) => {
        const p = window.document.createElement("p");
        p.textContent = e;
        holder.appendChild(p);
    });
    return holder;
};

// Adjust the height of textarea as text is entered
// Credit: https://stackoverflow.com/a/25621277
const tx = window.document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
    tx[i].addEventListener("input", OnInput, false);
}

// Function to adjust the height of textarea and message folder
function OnInput() {
    this.style.height = 0;
    this.style.height = this.scrollHeight - 20 + "px";

    const message_folder = window.document.getElementById("messageFolder");
    message_folder.style.paddingBottom =
        this.scrollHeight - 20 - 18 + 84 + "px";
    window.scrollTo(0, window.document.body.scrollHeight);
}
