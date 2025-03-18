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
│── /models               # Sequelize Data Models
│   ├── index.js          # Loads all models and defines relationships
│   ├── plant.js          # Defines the plant model
│   ├── tree.js           # Defines the tree planting model
│   ├── sensorData.js     # Defines the sensor data model
│── /routes               # API Routes
│   ├── plants.js         # Handles plant-related operations
│   ├── trees.js          # Handles tree planting operations
│   ├── sensors.js        # Handles sensor data operations
│   ├── esp.js            # Handles sensor data from ESP devices
│   ├── state.js          # Manages system state (settings & irrigation modes)
│── /config               # Configuration Files
│   ├── config.js         # Database connection setup
│── Inside_information.json  # Stores system state and irrigation settings
│── server.js             # Main Express server file
│── .env                  # Environment variables (DB credentials & API settings)
│── package.json          # Node.js dependencies
│── README.md             # Project documentation
```

## 🛠️ Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/smart-irrigation.git
   cd smart-irrigation
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables** (`.env`)
   ```env
   DB_HOST=localhost
   DB_NAME=smart_irrigation
   DB_USER=root
   DB_PASS=
   PORT=3010
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
   or using `nodemon`:
   ```bash
   npx nodemon server.js
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

## 🧪 Testing the API
### **Test with `curl` or Postman**
- **Check system state:**
  ```bash
  curl -X GET http://localhost:3010/state
  ```
- **Update temperature mode:**
  ```bash
  curl -X PUT http://localhost:3010/state/update-mode/tempMode -H "Content-Type: application/json" -d '{"temp": 30, "minTime": 7}'
  ```
- **Send sensor data from ESP:**
  ```bash
  curl -X POST http://localhost:3010/esp -H "Content-Type: application/json" -d '{"treeId": 1, "temperature": 26, "lightIntensity": 600, "soilMoisture": 450, "isRunning": true}'
  ```

## 🎯 Future Enhancements
- **Add authentication and user roles** for managing irrigation settings.
- **Create a frontend dashboard** to visualize sensor data and system state.
- **Implement AI-based irrigation optimization** using machine learning.

## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📜 License
This project is licensed under the MIT License.

🚀 **Developed by [Your Name]** - Making smart irrigation easier! 🌿💧
