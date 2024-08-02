import { render, screen, within } from '@testing-library/react';
import SearchResults from '../SearchResults';

// Mock data for testing
const mockResults = [
    {
        DocumentId: '1',
        DocumentTitle: {
            Text: 'Test Document Title 1',
            Highlights: [{ BeginOffset: 0, EndOffset: 4 }]
        },
        DocumentExcerpt: {
            Text: 'This is a test excerpt with some highlights.',
            Highlights: [{ BeginOffset: 10, EndOffset: 14 }]
        },
        DocumentURI: 'https://example.com/doc1'
    },
    {
        DocumentId: '2',
        DocumentTitle: {
            Text: 'Another Title',
            Highlights: []
        },
        DocumentExcerpt: {
            Text: 'Another excerpt for testing.',
            Highlights: [{ BeginOffset: 20, EndOffset: 24 }]
        },
        DocumentURI: 'https://example.com/doc2'
    }
];

test('Renders search results correctly, with highlighted text', () => {
    render(
        <SearchResults
            results={mockResults}
            totalNumberOfResults={100}
            page={1}
            pageSize={10}
        />
    );
    expect(screen.getByText('Showing 1 - 10 of 100 results')).toBeInTheDocument();
    expect(screen.getByText('Test Document Title 1')).toBeInTheDocument();
    expect(screen.getByText('https://example.com/doc1')).toBeInTheDocument();

    const resultExcerpt1 = screen.getByText('This is a', { exact: false });
    let { getByText } = within(resultExcerpt1);

    expect(getByText('This is a', { exact: false })).toBeInTheDocument();
    expect(getByText('test', { exact: false, selector: 'strong' })).toBeInTheDocument();
    expect(getByText('excerpt with some highlights.', { exact: false })).toBeInTheDocument();

    expect(screen.getByText('Another Title')).toBeInTheDocument();
    expect(screen.getByText('https://example.com/doc2')).toBeInTheDocument();

    const resultExcerpt2 = screen.getByText('Another excerpt for', { exact: false });
    ({ getByText } = within(resultExcerpt2));

    expect(getByText('Another excerpt for', { exact: false })).toBeInTheDocument();
    expect(getByText('test', { exact: false, selector: 'strong' })).toBeInTheDocument();
    expect(getByText('ing.', { exact: false })).toBeInTheDocument();
});

test('Handle empty results correctly', () => {
    render(
        <SearchResults
            results={[]}
            totalNumberOfResults={0}
            page={1}
            pageSize={10}
        />
    );

    expect(screen.queryByText('Showing 1 - 0 of 0 results')).toBeNull();
    expect(screen.queryByText('Test Document Title 1')).toBeNull();
});
