# NewsBucket

NewsBucket is a React-based news aggregator app that fetches and displays the latest news articles from various categories using the GNews API. It allows users to search news, select news categories, and change the language for news content.

## Features

- Fetches latest news articles by category
- Search functionality with real-time results
- Language selection dropdown to read news in multiple languages
- Infinite scrolling for seamless browsing
- Loading progress bar on news fetch
- Displays current date and time

## Technologies Used

- React.js (Class Components)
- React Router DOM for routing
- GNews API for news data
- react-top-loading-bar for loading progress
- react-infinite-scroll-component for infinite scrolling

## Setup Instructions

1. Clone the repository  
   git clone https://github.com/yourusername/newsbucket.git

2. Navigate to the project folder
   cd newsbucket

3. Navigate to the project folder
   npm install

4. Create a .env file in the root directory and add your GNews API key
   REACT_APP_NEWS_API=your_gnews_api_key_here

5. Run the app
   npm start

## Usage

  - Use the search bar in the Navbar to search news by keywords.
  - Select news categories like Business, Sports, Technology from the menu.
  - Use the language dropdown on the news page to change news language.
  - Scroll down to load more news articles automatically.
