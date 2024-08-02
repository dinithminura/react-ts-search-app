import axios from 'axios';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { SEARCH_API_ENDPOINT } from '../../utils/api';

jest.mock('axios');

const mockSetResults = jest.fn();

describe('SearchBar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Renders search input and buttons', () => {
        render(<SearchBar setResults={mockSetResults} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    test('Fetch suggestions when input length > 2', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { suggestions: ['test1', 'test2', 'test3'] } });

        render(<SearchBar setResults={mockSetResults} />);
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'tes' } });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(screen.getByText('test1')).toBeInTheDocument();
            expect(screen.getByText('test2')).toBeInTheDocument();
            expect(screen.getByText('test3')).toBeInTheDocument();
        });
    });


    test('Clears input and suggestions on clear button click', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { suggestions: ['test1', 'test2', 'test3'] } });
        render(<SearchBar setResults={mockSetResults} />);

        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'test' } });
        await waitFor(() => expect(screen.getByText('test1')).toBeInTheDocument());

        await act(async () => {
            const clearButton = screen.getByRole('button', { name: 'clear' });
            fireEvent.click(clearButton);
        });

        expect(input).toHaveValue('');
        expect(screen.queryByText('test1')).not.toBeInTheDocument();
    });

    test('Call handleSearch with the correct input when a suggestion click', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { suggestions: ['test1', 'test2', 'test3'] } });
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { results: [] } });

        render(<SearchBar setResults={mockSetResults} />);
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'tes' } });

        await waitFor(() => {
            expect(screen.getByText('test1')).toBeInTheDocument();
        });

        const suggestion = screen.getByText('test1');
        fireEvent.click(suggestion);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(SEARCH_API_ENDPOINT, { params: { query: 'test1' } });
            expect(input).toHaveValue('test1');
            expect(mockSetResults).toHaveBeenCalledTimes(1);
        });
    });

    test('Handle key events for navigating suggestions up down', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { suggestions: ['test1', 'test2', 'test3'] } });

        render(<SearchBar setResults={mockSetResults} />);
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'tes' } });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(screen.getByText('test1')).toHaveClass('active');
        });

        fireEvent.keyDown(input, { key: 'ArrowDown' });
        expect(screen.getByText('test2')).toHaveClass('active');

        fireEvent.keyDown(input, { key: 'ArrowUp' });
        expect(screen.getByText('test1')).toHaveClass('active');

        fireEvent.keyDown(input, { key: 'Enter' });
        await waitFor(() => {
            expect(mockSetResults).toHaveBeenCalledTimes(1);
            expect(input).toHaveValue('test1');
        });

    });
});
