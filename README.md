
# MyExpensesTracker

App created in React for tracking user expenses. The application allows to add, edit, and delete transactions. Additionally, the application generates a monthly balance for user, helping them stay on top of their finances. This project was developed as part of learning the React framework.




## Tech used

- React
- Vite
- Chart Js
- Tailwind CSS
- Heroicons
## Requirements
- npm (10.8.2+)

## Installation

- Copy repo from github

    ```bash
    git clone https://github.com/WiktorSchab/myexpensetracker.git
    ```
- Install dependencies
    ```bash
    npm install
    ```
- Run upp
    ```bash
    npm run dev
    ```
### Features

- **Sorting and Filtering Transactions**:
  - Quickly sort transactions by date or amount.
  - Use filters to view transactions by type (expense/income) or value range.

- **Charts and Visualizations**:
  - View a chart that displays your transactions and monthly balances. The chart also updates according to the applied filters.

- **JSON File Operations**:
  - **Delete Transactions**: Remove all transactions to start with a clean slate.
  - **Upload Transactions**: Overwrite existing transactions by uploading a JSON file with new records.
  - **Download Transactions**: Export your transaction data to a JSON file for backup or external use.

- **User-Friendly Interface**:
  - Intuitive one-page design that ensures a seamless user experience.
  - Responsive layout that works on most desktop screens (mobile version is not implemented yet).

- **Real-Time Updates**:
  - Changes to transactions are reflected immediately, without re-rendering the whole page, thanks to React.

## Demo

https://wiktorschab.github.io/MyExpenseTracker/

## Updates in Future

- Day/Night mode styles
- Deployment tutorial in README
- Generating balance reports
- Application testing
