(function () {
    const imageEl = document.getElementById("headshot");
    if (!imageEl) return;

    const jq = window.jQuery || window.$;
    const fadeDuration = 400;
    const intervalMs = 3600;

    const fadeWrapper = (nextSrc) => {
        if (!jq) {
            imageEl.src = nextSrc;
            return;
        }

        jq(imageEl).fadeOut(fadeDuration, function () {
            imageEl.src = nextSrc;
            jq(imageEl).fadeIn(fadeDuration);
        });
    };

    fetch("./data/imagelist.json")
        .then((response) => response.json())
        .then((data) => {
            if (!Array.isArray(data) || data.length === 0) return;

            const images = data
                .map((src) => {
                    try {
                        return new URL(src, window.location.href).href;
                    } catch {
                        return null;
                    }
                })
                .filter(Boolean);

            if (images.length === 0) return;

            let index = 0;
            setInterval(() => {
                index = (index + 1) % images.length;
                fadeWrapper(images[index]);
            }, intervalMs);
        })
        .catch((error) => console.error("Failed to load imagelist.json:", error));
})();
