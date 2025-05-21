// Highlight text in documents with red or green

/**
 * Creates a highlight record for storage
 * @param {string} text - Text to highlight
 * @param {string} color - Color to highlight with ('red' or 'green')
 * @param {number} page - PDF page number
 * @param {Object} position - Position coordinates
 * @returns {Object} - Highlight data object
 */
export const createHighlight = (text, color, page, position) => {
    return {
        text,
        color,
        page,
        position,
        timestamp: new Date().toISOString(),
    };
};

/**
 * Apply highlights to document text
 * @param {string} text - Original document text
 * @param {Array} highlights - Array of highlight objects
 * @returns {string} - HTML with highlighted text
 */
export const applyHighlights = (text, highlights) => {
    if (!highlights || highlights.length === 0) return text;

    // Sort highlights by their position
    const sortedHighlights = [...highlights].sort((a, b) => {
        if (a.position.startIndex === b.position.startIndex) {
            return 0;
        }
        return a.position.startIndex < b.position.startIndex ? -1 : 1;
    });

    let result = '';
    let lastIndex = 0;

    sortedHighlights.forEach(highlight => {
        const { startIndex, endIndex } = highlight.position;

        // Add text before the highlight
        result += text.substring(lastIndex, startIndex);

        // Add the highlighted text
        const highlightedText = text.substring(startIndex, endIndex);
        result += `<span class="highlight highlight-${highlight.color}">${highlightedText}</span>`;

        lastIndex = endIndex;
    });

    // Add any remaining text
    result += text.substring(lastIndex);

    return result;
};

/**
 * Extract text segments for a given color
 * @param {string} text - Original document text
 * @param {Array} highlights - Array of highlight objects
 * @param {string} color - Color to filter by ('red' or 'green')
 * @returns {Array} - Array of text segments
 */
export const extractHighlightedText = (text, highlights, color) => {
    if (!highlights || highlights.length === 0) return [];

    return highlights
        .filter(h => h.color === color)
        .map(h => {
            const { startIndex, endIndex } = h.position;
            return text.substring(startIndex, endIndex);
        });
};