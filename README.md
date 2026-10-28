# Expense Tracker

A web-based application for tracking income and expenses through a dashboard.

## Features

- Dashboard displaying total balance, income, expenses, and savings
- Add income and expense transactions
- View recent transactions
- Edit and delete transactions
- Visualize financial activity using a chart
- Login interface

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js

## Project Structure

text
TRACKER/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── user.js
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── login.js
│   ├── dashboard.html
│   ├── dashboard.css
│   ├── dashboard.js
│   ├── script.js
│   └── style.css
├── .gitignore
└── README.md


## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone this repository:

   bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   

2. Open the project folder:

   bash
   cd TRACKER
   

3. Install backend dependencies:

   bash
   cd backend
   npm install
   

4. Start the backend using the command configured in package.json.

5. Open frontend/index.html using VS Code Live Server or your configured frontend server.

## Future Improvements

- Database integration for persistent storage
- Monthly expense reports
- Budget planning and alerts
- Enhanced financial analytics