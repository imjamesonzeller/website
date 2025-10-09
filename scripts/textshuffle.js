(function () {
    const wordsEl = document.getElementById("words");
    if (!wordsEl) return;

    const jq = window.jQuery || window.$;
    const fadeDuration = 400;
    const intervalMs = 3600;

    const swapText = (value) => {
        if (!jq) {
            wordsEl.textContent = value;
            return;
        }

        jq(wordsEl).fadeOut(fadeDuration, function () {
            wordsEl.textContent = value;
            jq(wordsEl).fadeIn(fadeDuration);
        });
    };

    fetch("./data/words.json")
        .then((response) => response.json())
        .then((data) => {
            if (!Array.isArray(data) || data.length === 0) return;

            let index = 0;
            setInterval(() => {
                index = (index + 1) % data.length;
                swapText(data[index]);
            }, intervalMs);
        })
        .catch((error) => console.error("Failed to load words.json:", error));
})();
