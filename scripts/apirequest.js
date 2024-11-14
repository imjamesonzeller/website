async function sendApiRequest() {
    const text = document.getElementById('textInput').value;
    const delimiter = document.getElementById('delimiterInput').value || '\\s+';
    const words = text.split(new RegExp(delimiter)).filter(word => word.length > 0);

    if (words.length === 0) {
        document.getElementById('response').textContent = "Please enter some text.";
        return;
    }

    try {
        const payload = { words: words };

        const apiUrl = 'http://wordsearch.jamesonzeller.com/generate_word_search';

        console.log('Sending request to:', apiUrl);
        console.log('Payload:', payload);

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

        document.getElementById('response').innerHTML = '';
        document.getElementById('wordList').innerHTML = '';

        if (data.search) {
            data.search.forEach(row => {
                document.getElementById('response').innerHTML += row.join(' ') + '<br>';
            });
        }

        const wordListHtml = '<strong>Words: </strong>' + data.words.join(', ') + '<br>';
        document.getElementById('wordList').innerHTML = wordListHtml;

        const csvContent = generateCSV(data.search, data.words);
        const downloadLink = document.createElement('a');
        downloadLink.classList.add("link")
        downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
        downloadLink.target = '_blank';
        downloadLink.download = 'word_search.csv';
        downloadLink.textContent = 'Download Word Search as CSV';

        document.getElementById('downloadLink').innerHTML = '';
        document.getElementById('downloadLink').appendChild(downloadLink);

    } catch (error) {
        console.error('Request failed:', error);
        document.getElementById('response').textContent = `Error: ${error.message}`;
    }
}

function generateCSV(grid, words) {
    let csv = '';

    grid.forEach(row => {
        csv += row.join(',') + '\n';
    });

    csv += 'Words:,' + words.join(',') + '\n';

    return csv;
}