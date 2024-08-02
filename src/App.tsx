import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

const App: React.FC = () => {
    const [results, setResults] = useState<any>({
        ResultItems: [],
        TotalNumberOfResults: 0,
        Page: 0,
        PageSize: 0,
    });

    return (
        <div className="App">
            <div className="gov-banner-container">
                <div className="gov-banner">
                    <img src='merlion_logo.png' alt="Singapore government logo" className="gov-logo" />
                    <span className="gov-text">
                        An Official Website of the <strong>Singapore Government</strong>
                    </span>
                </div>
            </div>
            <SearchBar setResults={setResults} />
            <SearchResults
                results={results.ResultItems}
                totalNumberOfResults={results.TotalNumberOfResults}
                page={results.Page}
                pageSize={results.PageSize}
            />
        </div>
    );
};

export default App;
