document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and script is running.");

    const parent = document.querySelector(".section3-right");
    const wrappers = Array.from(parent.querySelectorAll(".wrapper"));
    console.log("Selected wrappers:", wrappers);

    if (!wrappers || wrappers.length === 0) {
        console.error("No elements found with the class '.wrapper'.");
        return;
    }

    const interval = 3000;
    const fadeDuration = -500; // Match CSS transition duration (0.5s)

    function updateHighlight() {
        wrappers.forEach((wrapper, index) => {
            const textElement = wrapper.querySelector(".section3-text-right");
            textElement.classList.toggle("highlighted", index === 2); // Highlight the 3rd visible item
        });
    }

    function rotateItems() {
        console.log("Rotating items...");

        const lastItem = wrappers.pop(); // Remove the last item from the array
        lastItem.classList.add("hidden"); // Fade out the last item

        // Move the last item to the top after the fade-out completes
        setTimeout(() => {
            lastItem.classList.remove("hidden"); // Fade it back in
            wrappers.unshift(lastItem); // Add it to the beginning of the array
            parent.insertBefore(lastItem, parent.firstChild); // Update the DOM order

            // Fade in the first item as it becomes visible
            const firstItem = wrappers[0];
            firstItem.classList.add("hidden"); // Temporarily hide
            setTimeout(() => {
                firstItem.classList.remove("hidden"); // Fade in
                updateHighlight(); // Update the highlight
            }, fadeDuration / 2); // Ensure it fades in slightly after fade-out starts
        }, fadeDuration);
    }

    // Initial setup
    updateHighlight();

    // Set the interval for rotation
    setInterval(rotateItems, interval);
});
