link_name = "this";
introJs()
    .setOptions({
        steps: [
            {
                title: "Welcome to Google Chain Translate!",
                intro: "This tool allows you to see how translating a phrase across multiple languages can lead to unexpected results. <br><br>Let's go through a quick tutorial to show you how it works!",
            },
            {
                element: document.querySelector("#api_key"),
                title: "Set Your API Key",
                intro:
                    "First, you'll need to enter an API Key to access Google's translation services. <br><br>" +
                    "If you already have an API key, simply enter it into the field provided. <br><br>" +
                    "If you don't have one yet, you can get one from Google's API console by following " +
                    link_name.link(
                        "https://console.cloud.google.com/apis/credentials?_ga=2.35939619.260387465.1728406952-1877345525.1724272990&_gac=1.52585050.1727994634.CjwKCAjwgfm3BhBeEiwAFfxrG-vdmT8iTBT3QTcCJ1WrhBOtpixNFniI0jZw0LdmtEL7VHhXGYFh-RoC1sEQAvD_BwE&project=curious-context-437513-a1"
                    ) +
                    " and pressing 'create credentials.'",
            },
            {
                element: document.querySelector("#input_text"),
                title: "Enter Your Text",
                intro: "Next, enter the text you want to translate. <br><br>This is the original text that will be translated through multiple languages and then back into English.<br><br>Example: 'John has a pet goldfish named goldy.'",
            },
            {
                element: document.querySelector("#translation_amount"),
                title: "Choose the Amount of Languages",
                intro: "Now, choose how many languages your text will go through before coming back to English. <br><br>The higher the number, the more the original meaning of your text can change during the translations.",
            },
            {
                title: "Go Explore!",
                intro: "That's it! You're all set to try out the Google Chain Translate tool. <br><br>Have fun exploring how translations evolve as they move between languages!",
            },
        ],
        dontShowAgain: false,
    })
    .start();
