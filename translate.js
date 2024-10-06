const api_url = "https://translation.googleapis.com/language/translate/v2";
let languages = [];
let language_codes = [];
const common_language_codes = [
    "zh",
    "es",
    "en",
    "hi",
    "bn",
    "pt",
    "ru",
    "ja",
    "de",
    "fr",
    "ar",
    "it",
    "ur",
    "tr",
    "ko",
    "vi",
    "pl",
    "uk",
    "nl",
    "fa",
    "ms",
    "sw",
    "ta",
    "te",
    "mr",
    "tl",
    "th",
    "ha",
    "id",
    "gu",
    "kn",
    "ml",
    "or",
    "pa",
    "ro",
    "my",
    "cs",
    "hu",
    "sr",
    "bg",
    "az",
    "el",
    "he",
    "fi",
    "da",
    "no",
    "sv",
    "lt",
    "lv",
    "si",
];

let languages_for_translations = [];
let languages_for_translations_codes = [];
let languages_for_translations_names = [];

async function getLanguages(api_key) {
    // get all the languages that can be possibly used
    try {
        const response = await fetch(
            `${api_url}/languages?key=${api_key}&target=en`
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error fetching languages: ${data.error.message}`);
        }

        languages = data.data.languages;
        language_codes = languages
            .map((lang) => lang.language)
            .filter((code) => !common_language_codes.includes(code));
    } catch (error) {
        console.error(error.message);
    }
}

async function translateText(api_key, input_text, target_lang, source_lang) {
    // get translated text based on input, target, source
    try {
        const response = await fetch(
            `${api_url}?q=${input_text}&target=${target_lang}&source=${source_lang}&key=${api_key}`,
            {
                method: "POST",
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Translation Error: ${data.error.message}`);
        }
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error(error.message);
        return input_text;
    }
}

function sleep(ms) {
    // delay function to control timing
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearTranslations() {
    // clear all stored translations
    languages_for_translations = [];
    languages_for_translations_codes = [];
    languages_for_translations_names = [];
}

async function generateTranslations(api_key, translation_amount_target) {
    clearTranslations();

    let input_text = document.getElementById("input_text").value;

    // generate random languages for translation
    for (let i = 0; i < translation_amount_target; i++) {
        let randomIndex = Math.floor(Math.random() * language_codes.length);
        languages_for_translations_codes.push(language_codes[randomIndex]);
        languages_for_translations_names.push(languages[randomIndex].name);
    }

    // add English to the start and end
    languages_for_translations_codes.unshift("en");
    languages_for_translations_codes.push("en");
    languages_for_translations_names.unshift("English");
    languages_for_translations_names.push("English");

    // go through each language and translate
    for (let i = 0; i <= translation_amount_target; i++) {
        input_text = await translateText(
            api_key,
            input_text,
            languages_for_translations_codes[i + 1],
            languages_for_translations_codes[i]
        );
    }

    document.getElementById("output_text").value = input_text;
}

async function visualizePath(translation_amount_target) {
    let nodes_container = document.getElementById("node-container");
    nodes_container.innerHTML = ""; // clear previous nodes

    // create nodes for each translation step
    for (let i = 0; i <= translation_amount_target + 1; i++) {
        await sleep(1000); // delay for node creation
        let node = document.createElement("button");
        node.textContent = languages_for_translations_codes[i];
        node.className = "nodes";
        nodes_container.appendChild(node);

        // toggle between collapsed and expanded view on click
        node.addEventListener("click", function () {
            if (this.classList.contains("expanded")) {
                this.classList.remove("expanded");
                this.textContent = languages_for_translations_codes[i];
            } else {
                this.classList.add("expanded");
                this.innerHTML = `
                    <div>${languages_for_translations_codes[i]}</div>
                    <div>${languages_for_translations_names[i]}</div>`;
            }
        });

        // fade in the node
        node.style.opacity = 0;
        setTimeout(() => {
            node.style.opacity = 1;
        }, 10);
    }
}

async function run() {
    // main function to start the process
    const api_key = document.getElementById("api_key").value;
    if (languages.length === 0) {
        await getLanguages(api_key);
    }
    const translation_amount_target =
        parseInt(document.getElementById("translation_amount").value) - 1;
    await generateTranslations(api_key, translation_amount_target);
    await visualizePath(translation_amount_target);
}
