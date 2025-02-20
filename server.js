<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SRT Übersetzer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(to bottom, #f5f5f5, #e5e5e5);
        }
        .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 20px;
        }
        .text-area {
            width: 100%;
            height: 400px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            resize: none;
        }
        .button {
            display: block;
            width: 300px;
            margin: 20px auto;
            padding: 15px 30px;
            background-color: #000;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .button:hover {
            background-color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .error {
            color: red;
            text-align: center;
            margin: 10px 0;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>SRT Übersetzer</h1>
        <p>Übersetzen Sie Ihre Untertitel einfach ins Griechische</p>
    </div>

    <div class="container">
        <textarea id="inputText" class="text-area" placeholder="Fügen Sie hier Ihren SRT-Dateiinhalt ein..."></textarea>
        <textarea id="outputText" class="text-area" placeholder="Die Übersetzung erscheint hier..." readonly></textarea>
    </div>

    <div id="error" class="error"></div>
    <button onclick="translate()" class="button">Ins Griechische übersetzen</button>

    <script>
        async function translate() {
            const inputText = document.getElementById('inputText').value;
            const outputTextArea = document.getElementById('outputText');
            const errorDiv = document.getElementById('error');

            if (!inputText.trim()) {
                errorDiv.textContent = 'Bitte geben Sie einen Text zur Übersetzung ein.';
                return;
            }

            errorDiv.textContent = '';

            try {
                const response = await fetch('https://dein-server.com/translate', { // Ersetze mit deiner Server-URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: "gpt-4",
                        messages: [
                            {
                                role: "system",
                                content: "You are a professional translator specializing in German to Greek translations. Translate the following SRT subtitles from German to Greek, maintaining the exact same timing and numbering format. Only translate the text content, keep numbers and timestamps unchanged."
                            },
                            {
                                role: "user",
                                content: inputText
                            }
                        ]
                    })
                });

                if (!response.ok) {
                    throw new Error('Übersetzung fehlgeschlagen');
                }

                const data = await response.json();
                outputTextArea.value = data.choices[0].message.content;
            } catch (error) {
                errorDiv.textContent = 'Bei der Übersetzung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
                console.error('Translation failed:', error);
            }
        }
    </script>

</body>
</html>
