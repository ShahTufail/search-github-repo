Table of Contents

    Features

    Technical Specifications

    User Experience

    Getting Started

        Prerequisites

        Installation

        Running the Application

    API Reference

    Error Handling & Loading States

    Styling

    Contributing

    License

Features

    Repository Search: Search for GitHub repositories by keywords.

    Paginated Results: Browse through results with clear pagination controls.

    Filter Options: Refine search results using a minimum of three filter options (e.g., language, stars, created date).

    Search Debouncing: Optimized API calls to prevent excessive requests while typing.

    Responsive Design: Seamless experience across various devices, from mobile to desktop.

    URL State Management: Search queries and filter selections are reflected in URL parameters for shareability and persistence.

Technical Specifications

    Framework: React.js with Next.js for routing and server-side rendering/static site generation capabilities.

    Styling: Direct Sass (Syntactically Awesome Style Sheets) for a maintainable and scalable styling solution.

    API Integration: Integrates with the GitHub Search REST API.

    Authentication: No authentication required as the GitHub API allows unauthenticated search requests.

    Base API URL: https://api.github.com/search/repositories

User Experience

    Meaningful Information: Displays essential repository details such as name, description, stars, and language.

    Empty States: Provides clear messages when no search results are found.

    Loading Indicators: Shows appropriate loading states during API calls to inform the user.

    Intuitive Pagination: Easy-to-use controls for navigating through search result pages.

Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your system.

    Node.js (LTS version recommended)

    npm or yarn

Installation

    Clone the repository:
    Bash

git clone git@github.com:ShahTufail/search-github-repo.git
cd search-github-repo


Install dependencies:
Bash

    npm install
    # or
    yarn install

Running the Application

To start the development server:
Bash

npm run dev
# or
yarn dev

Open http://localhost:3000 in your browser to see the application.

API Reference

This application uses the GitHub Search Repositories API.

The base URL for API requests is: https://api.github.com/search/repositories

Error Handling & Loading States

The application is designed to:

    Display user-friendly error messages if API requests fail (e.g., network issues, rate limiting).

    Show clear loading indicators to inform the user when data is being fetched from the API.

Styling

This project uses Sass for styling. All .scss files are organized and compiled to provide a clean and modular CSS structure. You can find the styles within the appropriate directories (e.g., styles/).

Contributing

Contributions are always welcome! If you have suggestions for improvements or find a bug, please feel free to:

    Fork the repository.

    Create a new branch (git checkout -b feature/your-feature-name).

    Make your changes.

    Commit your changes (git commit -m 'Add some feature').

    Push to the branch (git push origin feature/your-feature-name).

    Open a Pull Request.

License

This project is open-source and available under the MIT License.