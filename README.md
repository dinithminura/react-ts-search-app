# React Search App

## Description
This React application provides a search bar with typeahead suggestions and displays search results.

## Installation
Clone the repository:

``git clone https://github.com/dinithminura/react-search-app.git``\
``cd react-search-app``

Create a ``.env`` file in the root of your project and add the following environment variables:
```
REACT_APP_ENV=mock
REACT_APP_SEARCH_API_ENDPOINT_MOCK=<mock_search_api_endpoint>
REACT_APP_SUGGESTIONS_API_ENDPOINT_MOCK=<mock_suggestions_api_endpoint>
REACT_APP_SEARCH_API_ENDPOINT=<production_search_api_endpoint>
REACT_APP_SUGGESTIONS_API_ENDPOINT=<production_suggestions_api_endpoint>
```

Sample ``.env`` file that created based on mack apis provided 

```
REACT_APP_ENV=mock
REACT_APP_SEARCH_API_ENDPOINT=https://production-api.example.com/search
REACT_APP_SUGGESTIONS_API_ENDPOINT=https://production-api.example.com/suggestions

# For mock environment
REACT_APP_SEARCH_API_ENDPOINT_MOCK=https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json
REACT_APP_SUGGESTIONS_API_ENDPOINT_MOCK=https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json

```

## Running the App

To run the application in development mode:

``npm start``

Open http://localhost:3000 to view it in the browser. The page will reload if you make edits. 

## Running Tests

To run unit tests 

``npm test``

To run test and code coverage 

``npm run test:coverage``

can view the coverage report by opening the ``coverage/lcov-report/index.html`` file in your browser or in terminal.

## Current Code Coverage

<img width="630" alt="Screenshot 2024-08-02 at 11 44 13 AM" src="https://github.com/user-attachments/assets/41c38b21-4def-4b88-93eb-904a33cf70be">

### Demo UI (Screenshots)
Typeahead suggestions:\
<img width="1500" alt="Screenshot 2024-08-02 at 12 05 40 PM" src="https://github.com/user-attachments/assets/ab2d7f52-60ce-43e5-9278-3ca6b29765a4">

Showing search resutls:\
<img width="1502" alt="Screenshot 2024-08-02 at 12 05 10 PM" src="https://github.com/user-attachments/assets/8aee47bf-494d-4b6e-a32b-8a282e61572a">

Responsive view (iPad pro screen):\
<img width="499" alt="Screenshot 2024-08-02 at 12 06 36 PM" src="https://github.com/user-attachments/assets/1d270761-a8e8-4b9a-b926-1d5d2d399ff5">
