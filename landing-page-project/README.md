# Landing Page Project

This project is a simple landing page built using HTML, CSS, and JavaScript, with a local SQL database connection. 

## Project Structure

```
landing-page-project
├── src
│   ├── database
│   │   └── schema.sql
│   ├── public
│   │   ├── css
│   │   │   └── styles.css
│   │   ├── js
│   │   │   └── main.js
│   │   └── index.html
│   ├── server
│   │   ├── config
│   │   │   └── db.js
│   │   └── server.js
│   └── utils
│       └── database.js
├── package.json
└── README.md
```

## Features

- Responsive design
- Interactive elements using JavaScript
- Local SQL database connection for data storage

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd landing-page-project
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run:
```
node src/server/server.js
```

Open your browser and navigate to `http://localhost:3000` to view the landing page.

## License

This project is licensed under the MIT License.