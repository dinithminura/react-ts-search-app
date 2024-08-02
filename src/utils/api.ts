const isMockEnvironment: boolean = process.env.REACT_APP_ENV === 'mock';

export const SEARCH_API_ENDPOINT: string = isMockEnvironment
  ? process.env.REACT_APP_SEARCH_API_ENDPOINT_MOCK || 'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json'
  : process.env.REACT_APP_SEARCH_API_ENDPOINT || 'https://production-api.example.com/search';

export const SUGGESTIONS_API_ENDPOINT: string = isMockEnvironment
  ? process.env.REACT_APP_SUGGESTIONS_API_ENDPOINT_MOCK || 'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json'
  : process.env.REACT_APP_SUGGESTIONS_API_ENDPOINT || 'https://production-api.example.com/suggestions';
