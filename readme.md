# 🔍 GitHub Repository Search Application

A responsive and user-friendly web app to search GitHub repositories using keywords, filters, and pagination. Built with **Next.js**, **React**, **Tailwind CSS**, and **Zustand**.

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
- [🗃️ State Management](#️-state-management)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- 🔍 **Repository Search**: Search for GitHub repositories by keywords.
- 📄 **Paginated Results**: Browse results with intuitive pagination controls.
- 🎛 **Filter Options**: Filter by:
  - Programming language
  - Star count (e.g., `>500`)
  - Created date (date input)
- ⏱ **Search Debouncing**: Optimizes API requests while typing.
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop.
- 🔗 **URL State Management**: Filter and search states are preserved in URL parameters.
- 🎨 **Tailwind CSS Styling**: All UI is styled using Tailwind utility classes.
- ⚡ **State Management with Zustand**: All search, filter, and pagination state is managed globally with Zustand.

---

## 🛠 Technical Specifications

- **Framework**: [Next.js](https://nextjs.org/) with React.js
- **Routing**: Uses Next.js built-in routing system
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (all custom and responsive styles)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (global state for filters, search, pagination, cache)
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
```

### ▶️ Running the Application

```bash
npm run dev
# or
yarn dev
```

Visit http://localhost:3000 in your browser.

---

## 🔌 API Reference

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

---

## ⚠️ Error Handling & Loading States

- API failures (e.g., rate limits, network errors) show user-friendly messages in a styled card with a close button.
- Loading states are visually indicated with a spinner overlay, keeping the list and pagination in place.
- Empty states and "no repositories found" are shown as styled cards for clarity.

---

## 🎨 Styling

This project uses **Tailwind CSS** for all styling.

**Key points:**
- No SCSS or CSS modules are used for UI; all components use Tailwind utility classes.
- Responsive layouts, interactive states (hover, focus), and accessibility are handled with Tailwind.
- Error, empty, and loading states are visually consistent and styled with Tailwind.

---

## 🗃️ State Management

- All search, filter, pagination, and cache state is managed globally using **Zustand**.
- Components read and update state via the Zustand store for a consistent and reactive UI.

---

## 🤝 Contributing

Contributions are welcome!
Steps

1. Fork the repository
2. Create a feature branch
git checkout -b feature/your-feature-name

3. Commit your changes
git commit -m "Add some feature"

4. Push to your branch
git push origin feature/your-feature-name

5. Open a Pull Request on GitHub

📄 License

This project is open-source under the MIT License.


---
