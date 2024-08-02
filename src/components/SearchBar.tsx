import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoSearch, IoCloseOutline } from 'react-icons/io5';
import { SUGGESTIONS_API_ENDPOINT, SEARCH_API_ENDPOINT } from '../utils/api';

interface SearchBarProps {
    setResults: (results: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isUserTyping, setIsUserTyping] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (input.length > 2 && isUserTyping) {
                try {
                    const response = await axios.get(SUGGESTIONS_API_ENDPOINT, { params: { query: input } });
                    setSuggestions(response.data.suggestions);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        fetchSuggestions();
    }, [input, isUserTyping]);

    const handleSearch = async (query: string = input) => {
        if (input.length > 0) {
            try {
                const response = await axios.get(SEARCH_API_ENDPOINT, { params: { query } });
                setResults(response.data);
                setShowSuggestions(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setActiveSuggestionIndex(0);
        setIsUserTyping(true);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setIsUserTyping(false);
        handleSearch(suggestion);
        setInput(suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSuggestionClick(suggestions[activeSuggestionIndex])
        } else if (e.key === 'ArrowDown') {
            if (activeSuggestionIndex < suggestions.length - 1) {
                setActiveSuggestionIndex(activeSuggestionIndex + 1);
            }
        } else if (e.key === 'ArrowUp') {
            if (activeSuggestionIndex > 0) {
                setActiveSuggestionIndex(activeSuggestionIndex - 1);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const handleClearInput = () => {
        setInput('');
        setSuggestions([]);
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    return (
        <div className="search-card">
            <div className="search-bar">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    className="search-input"
                />
                {input && (
                    <button onClick={handleClearInput} aria-label='clear' className="clear-button">
                        <IoCloseOutline className="clear-icon" />
                    </button>
                )}
                <button onClick={() => handleSearch()} className="search-button">
                    <IoSearch className="search-icon" />
                    Search
                </button>
                {showSuggestions && suggestions.length > 0 && (
                    <div className="suggestions">
                        {suggestions.slice(0, 6).map((suggestion, index) => (
                            <div
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                onMouseEnter={() => setActiveSuggestionIndex(index)}
                                className={`suggestion-item ${index === activeSuggestionIndex ? 'active' : ''}`}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
