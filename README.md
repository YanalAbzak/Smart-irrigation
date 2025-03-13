# Smart Irrigation System

## Overview
The **Smart Irrigation System** is an ESP32-based project that monitors environmental conditions and controls water irrigation based on temperature, moisture levels, and predefined modes. The system communicates with a backend server for real-time state updates.

## Features
- **WiFi Connectivity:** Connects to a local WiFi network for remote monitoring and control.
- **Sensor Integration:** Measures temperature, light intensity, and soil moisture.
- **Automated Pump Control:** Adjusts irrigation based on different operational modes.
- **Remote Configuration:** Fetches state updates from the server.

## Components Used
### Hardware
- **ESP32**
- **DHT11 Temperature & Humidity Sensor**
- **Soil Moisture Sensor**
- **Light Sensor (LDR)**
- **Relay Module (to control water pump)**

### Software & Libraries
- **Arduino IDE**
- **WiFi.h** (for network communication)
- **HTTPClient.h** (for HTTP requests)
- **ArduinoJson.h** (for JSON parsing)
- **DHT.h** (for temperature & humidity readings)

## Installation & Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repository.git
   ```
2. **Open the project in Arduino IDE.**
3. **Install the required libraries:**
    - Open Arduino IDE → Sketch → Include Library → Manage Libraries
    - Search for and install:
        - `WiFi` (built-in)
        - `HTTPClient`
        - `ArduinoJson`
        - `DHT` (for temperature & humidity sensor)
4. **Configure WiFi Credentials:**
    - Modify `WIFI_SSID` in `WiFi_SETUP()` with your network SSID.
5. **Upload the Code to ESP32.**

## How It Works
1. **ESP32 Reads Sensor Data**
    - Retrieves temperature from the DHT11 sensor.
    - Reads light intensity and soil moisture values.
2. **Data Transmission to Server**
    - Sends sensor readings to the backend via HTTP requests.
3. **Server Determines System State**
    - Modes:
        - **Temperature-Controlled:** Turns on the pump if temperature exceeds 25°C.
        - **Moisture-Controlled:** Activates the pump if soil moisture is too low.
        - **Shabbat Mode:** Operates the pump between 18:00 - 22:00.
        - **Manual Mode:** The pump can be controlled manually.
4. **Pump Control**
    - Based on the current mode, the ESP32 activates or deactivates the pump accordingly.

## API Endpoints
| Method | Endpoint           | Description               |
|--------|-------------------|---------------------------|
| GET    | `/state`          | Retrieves system state    |
| GET    | `/esp`            | Receives sensor data      |
| PUT    | `/mode`           | Updates system state      |

## Future Enhancements
- Add **mobile app integration** for real-time monitoring.
- Implement **machine learning algorithms** for predictive irrigation.
- Introduce **solar-powered irrigation system** for sustainability.


