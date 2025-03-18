# Smart Irrigation System

## 📌 Overview
The **Smart Irrigation System** is a **Node.js-based backend** that manages plants, trees, sensor data, and irrigation settings using **Sequelize ORM** for MySQL and a JSON file for system configuration.

## 🚀 Features
- **Manage Plants & Trees** – Add, update, and retrieve plant and tree data.
- **Sensor Data Handling** – Collect and store **temperature, soil moisture, and light intensity** data.
- **ESP Communication** – Receive data from ESP-based sensors.
- **System State Management** – Store irrigation settings and modes in a JSON file.
- **MySQL & Sequelize ORM** – Efficient data management and relationships.

## 📂 Project Structure
```
/smart-irrigation
│── /backend
│   │── /config
│   │   ├── config.js      # Database connection
│   │── /models
│   │   ├── index.js       # Loads all models
│   │   ├── plant.js       # Plant model
│   │   ├── tree.js        # Tree model
│   │   ├── sensorData.js  # Sensor data model
│   │── /routes
│   │   ├── plants.js      # Manage plants
│   │   ├── trees.js       # Manage trees
│   │   ├── sensors.js     # Handle sensor data
│   │   ├── esp.js         # ESP data handling
│   │   ├── state.js       # Manage system state
│   │── .env               # Environment variables
│   │── server.js          # Main Express server
│   │── Inside_information.json  # Stores system settings
│   │── package.json       # Dependencies
│   │── package-lock.json  # Dependency lock file
│   │── README.md          # Documentation
│── /esp32                 # (If this is for ESP firmware, keep it separate)
```

## 🛠️ Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/smart-irrigation.git
   cd smart-irrigation
   ```

2. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set Up Environment Variables** (`.env` in `backend/`)
   ```env
   DB_HOST=your_database_host
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASS=your_database_password
   PORT=your_server_port
   ```

4. **Start MySQL Server**
   ```bash
   net start mysql  # Windows
   sudo systemctl start mysql  # Linux
   ```

5. **Run the Server**
   ```bash
   node server.js
   ```

## 📡 API Endpoints
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| **GET**  | `/plants`        | Fetch all plants |
| **POST** | `/plants`        | Add a new plant |
| **GET**  | `/trees`         | Fetch all trees |
| **POST** | `/trees`         | Add a new tree planting |
| **GET**  | `/sensors`       | Fetch all sensor data |
| **POST** | `/sensors`       | Add new sensor data |
| **POST** | `/esp`           | Receive sensor data from ESP |
| **GET**  | `/state`         | Fetch system state |
| **PUT**  | `/state`         | Update system state |
| **PUT**  | `/state/update-mode/:mode` | Update a specific mode (tempMode, soilMoistureMode, sabbathMode) |


