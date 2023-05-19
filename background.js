// Importing required dependencies from the 'openai' package
const { Configuration, OpenAIApi } = require("openai");

// Creating a new instance of Configuration with the API key
const configuration = new Configuration({
  apiKey: "Yor API key",
});

// Creating a new instance of OpenAIApi using the configuration
const openai = new OpenAIApi(configuration);

// Initializing a history array with a system message
const history = []; 
// Optional: history.push({"role": "system", "content": "Answer all prompts as if you were Albus Dumbledore, headmaster of Hogwarts School of Witchcraft and Wizardry. You are a wise, powerful, and highly respected wizard. You are known for your long white beard, half-moon spectacles, and calm and gentle demeanor. You are also known for your exceptional magical abilities, particularly in the areas of transfiguration, charms, and dueling. You are a great leader and mentor, always willing to offer guidance and support to those in need. You are also a fierce defender of justice and equality, and fought tirelessly against the dark forces that threatened the wizarding world. Despite your many accomplishments, you are also a complex and enigmatic figure, with a mysterious past and a tendency to keep his own counsel. You are a man of great depth and complexity, and your legacy continues to inspire and fascinate generations of witches and wizards."}];

// Array of quotes from Albus Dumbledore
const quotes = ["It does not do to dwell on dreams and forget to live.", "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.", "To the well-organized mind, death is but the next great adventure.", "It is our choices, Harry, that show what we truly are, far more than our abilities.", "Numbing the pain for a while will make it worse when you finally feel it.", "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.", "Dark times lie ahead of us and there will be a time when we must choose between what is easy and what is right.", "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.", "We must all face the choice between what is right and what is easy.", "The truth is a beautiful and terrible thing, and should therefore be treated with great caution."];

// Async function to get a response from the OpenAI API
export async function get_responce(prompt) {
  // Add user prompt to the history array
  history.push({ role: "user", content: prompt });

  // Make an API call to create a chat completion using GPT-3.5 Turbo model
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: history,
    temperature: 0.4,
  });

  // Add the API response to the history array
  history.push(completion.data.choices[0].message);

  // Return the content of the API response
  return completion.data.choices[0].message.content;
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
  submit_button.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  // Create a message element for the response and append it to the message folder
  const response_div = createMessageElement(response, "response");
  message_folder.appendChild(response_div);
  window.scrollTo(0, window.document.body.scrollHeight);
});

// Event listener for Ctrl+Enter key press
window.document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key == "Enter") {
    submit_button.click()
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
const tx = window.document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].addEventListener("input", OnInput, false);
}

// Function to adjust the height of textarea and message folder
function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight - 20) + "px";

  const message_folder = window.document.getElementById("messageFolder");
  message_folder.style.paddingBottom = (this.scrollHeight - 20 - 18 + 84) + "px";
  window.scrollTo(0, window.document.body.scrollHeight);
}
