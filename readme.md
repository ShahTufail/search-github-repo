# 🔍 GitHub Repository Search Application

A responsive and user-friendly web app to search GitHub repositories using keywords, filters, and pagination. Built with **Next.js**, **React**, and **Sass**.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🛠 Technical Specifications](#-technical-specifications)
- [🎯 User Experience](#-user-experience)
- [🚀 Getting Started](#-getting-started)
  - [📦 Prerequisites](#-prerequisites)
  - [🔧 Installation](#-installation)
  - [▶️ Running the Application](#️-running-the-application)
- [🔌 API Reference](#-api-reference)
- [⚠️ Error Handling & Loading States](#️-error-handling--loading-states)
- [🎨 Styling](#-styling)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- 🔍 **Repository Search**: Search for GitHub repositories by keywords.
- 📄 **Paginated Results**: Browse results with intuitive pagination controls.
- 🎛 **Filter Options**: Filter by:
  - Programming language
  - Star count (e.g., `>500`)
  - Created date (calendar input)
- ⏱ **Search Debouncing**: Optimizes API requests while typing.
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop.
- 🔗 **URL State Management**: Filter and search states are preserved in URL parameters.

---

## 🛠 Technical Specifications

- **Framework**: [Next.js](https://nextjs.org/) with React.js
- **Routing**: Uses Next.js built-in routing system
- **Styling**: [Tailwind]()
- **API**: GitHub Search REST API (no authentication required)
- **Base API URL**:  
  `https://api.github.com/search/repositories`

---

## 🎯 User Experience

- 📦 Displays essential details:
  - Repository name
  - Description
  - Star count
  - Language
- 🚫 Graceful empty states when no results are found
- ⏳ Loading spinners while fetching data
- 🔄 Clear pagination with page indicators
- 🧹 Reset button to clear all filters and reset pagination

---

## 🚀 Getting Started

### 📦 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm or [Yarn](https://yarnpkg.com/)

### 🔧 Installation

```bash
git clone https://github.com/ShahTufail/search-github-repo.git
cd search-github-repo
npm install
# or
yarn install

▶️ Running the Application

npm run dev
# or
yarn dev

Visit http://localhost:3000 in your browser.
🔌 API Reference

This app integrates with:

    GitHub Search Repositories API
    🔗 GitHub REST Docs

Example Request:

GET https://api.github.com/search/repositories?q=react+language:javascript&sort=stars&order=desc&page=1&per_page=10

Query Parameters:

    q: search query with filters (e.g., react stars:>1000)

    sort: stars, updated, etc.

    order: desc or asc

    page: pagination number

    per_page: results per page (max 100)

⚠️ Error Handling & Loading States

    API failures (e.g., rate limits, network errors) show user-friendly messages

    Loading states are visually indicated with spinners or placeholders

    Empty states show when no results match the filters

🎨 Styling

This project uses Tailwind CSS for fast and easy styling

📁 Key Style Files:

    styles/globals.scss: global base styles

    styles/Filters.module.scss: filter form card styles

    styles/Pagination.module.scss: pagination button styles

✨ Features:

    Shadowed cards

    Responsive layout using Flexbox

    Styled input elements and buttons

    Custom pagination styling with active state

🤝 Contributing

Contributions are welcome!
Steps

# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "Add some feature"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request on GitHub

📄 License

This project is open-source under the MIT License.


---

Would you like this saved and included in the zipped folder as a `README.md` file?  