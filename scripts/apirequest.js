async function sendApiRequest() {
    const textInput = document.getElementById('textInput');
    const delimiterInput = document.getElementById('delimiterInput');
    const responseEl = document.getElementById('response');
    const wordListEl = document.getElementById('wordList');
    const downloadLinkEl = document.getElementById('downloadLink');
    const submitButton = document.getElementById('submit-button');

    if (!textInput || !delimiterInput || !responseEl || !wordListEl || !downloadLinkEl) {
        console.error('Word search generator elements are missing from the page.');
        return;
    }

    const originalButtonText = submitButton ? submitButton.textContent : '';

    const rawText = textInput.value.trim();
    const rawDelimiter = delimiterInput.value.trim() || '\\s+';

    let delimiterRegex;
    try {
        delimiterRegex = new RegExp(rawDelimiter);
    } catch (regexError) {
        responseEl.textContent = 'Please provide a valid delimiter. Example: "," or "\\n".';
        wordListEl.textContent = '';
        downloadLinkEl.innerHTML = '';
        return;
    }

    const words = rawText
        .split(delimiterRegex)
        .map(word => word.trim())
        .filter(word => word.length > 0);

    if (words.length === 0) {
        responseEl.textContent = 'Please enter at least one word.';
        wordListEl.textContent = '';
        downloadLinkEl.innerHTML = '';
        return;
    }

    try {
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Generating...';
        }

        responseEl.textContent = 'Building your puzzle...';
        wordListEl.textContent = '';
        downloadLinkEl.innerHTML = '';

        const payload = { words: words };

        const apiUrl = 'https://api.jamesonzeller.com/generate_word_search';

        console.log('Sending request to:', apiUrl, payload);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (data.search) {
            const gridText = data.search.map(row => row.join(' ')).join('\n');
            responseEl.textContent = gridText;
        } else {
            responseEl.textContent = 'No grid returned.';
        }

        if (Array.isArray(data.words) && data.words.length > 0) {
            const wordListHtml = `<strong>Words (${data.words.length}):</strong> ${data.words.join(', ')}`;
            wordListEl.innerHTML = wordListHtml;
        } else {
            wordListEl.textContent = 'No words returned.';
        }

        const csvContent = generateCSV(data.search, data.words);
        const downloadLink = document.createElement('a');
        downloadLink.className = 'btn secondary small';
        downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
        downloadLink.target = '_blank';
        downloadLink.download = 'word_search.csv';
        downloadLink.textContent = 'Download CSV';

        downloadLinkEl.innerHTML = '';
        downloadLinkEl.appendChild(downloadLink);

    } catch (error) {
        console.error('Request failed:', error);
        responseEl.textContent = `Error: ${error.message}`;
        wordListEl.textContent = '';
        downloadLinkEl.innerHTML = '';
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }
}

function generateCSV(grid, words) {
    let csv = '';

    if (Array.isArray(grid)) {
        grid.forEach(row => {
            csv += row.join(',') + '\n';
        });
    }

    if (Array.isArray(words)) {
        csv += 'Words:,' + words.join(',') + '\n';
    }

    return csv;
}
