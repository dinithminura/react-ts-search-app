import React from 'react';

interface Highlight {
    BeginOffset: number;
    EndOffset: number;
}

interface DocumentTitle {
    Text: string;
    Highlights: Highlight[];
}

interface DocumentExcerpt {
    Text: string;
    Highlights: Highlight[];
}

interface ResultItem {
    DocumentId: string;
    DocumentTitle: DocumentTitle;
    DocumentExcerpt: DocumentExcerpt;
    DocumentURI: string;
}

interface SearchResultsProps {
    results: ResultItem[];
    totalNumberOfResults: number;
    page: number;
    pageSize: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, totalNumberOfResults, page, pageSize }) => {
    const highlightText = (text: string, highlights: Highlight[]) => {
        let highlightedText = [];
        let lastIndex = 0;

        highlights.forEach((highlight, index) => {
            if (lastIndex < highlight.BeginOffset) {
                highlightedText.push(
                    text.substring(lastIndex, highlight.BeginOffset)
                );
            }
            highlightedText.push(
                <strong key={index}>
                    {text.substring(highlight.BeginOffset, highlight.EndOffset)}
                </strong>
            );
            lastIndex = highlight.EndOffset;
        });

        if (lastIndex < text.length) {
            highlightedText.push(text.substring(lastIndex));
        }

        return highlightedText;
    };

    const startResult = (page - 1) * pageSize + 1;
    const endResult = Math.min(page * pageSize, totalNumberOfResults);

    return (
        <div className="search-results">
            {results.length > 0 && <div className="results-summary">
                Showing {startResult} - {endResult} of {totalNumberOfResults} results
            </div>}

            {results.map((result) => (
                <div key={result.DocumentId} className="result-item">
                    <div className="result-title">
                        {result.DocumentTitle.Text}
                    </div>
                    <div className="result-excerpt">
                        {highlightText(result.DocumentExcerpt.Text, result.DocumentExcerpt.Highlights)}
                    </div>
                    <div className="result-uri">
                        <a href={result.DocumentURI} target="_blank" rel="noopener noreferrer">
                            {result.DocumentURI}
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
