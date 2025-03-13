#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>

// Define sensor and pump pins
#define DHT_PIN 16
#define DHT_TYPE DHT11
DHT dht(DHT_PIN, DHT_TYPE);

#define LIGHT_SENSOR_PIN 36
#define MOISTURE_SENSOR_PIN 39
#define PUMP_PIN 15

// Define system states
#define TEMP_CONTROL_MODE 1
#define MOISTURE_CONTROL_MODE 2
#define SHABBAT_MODE 3
#define MANUAL_MODE 4

int currentState = MANUAL_MODE;
unsigned long lastUpdate = 0;
extern WiFiClient client;

const char* serverStateURL = "http://10.9.1.10:3004/state";

bool manualPumpOn = false;
bool isPumpRunning = false;

/**
 * Controls the water pump based on the given state.
 * @param turnOn - Boolean flag to turn the pump on or off.
 */
void controlPump(bool turnOn) {
  if (turnOn && !isPumpRunning) {
    Serial.println("Pump ON");
    isPumpRunning = true;
  } else if (!turnOn && isPumpRunning) {
    Serial.println("Pump OFF");
    isPumpRunning = false;
  }
}

/**
 * Fetches the current state from the server and updates the system state.
 */
void fetchStateFromServer() {
  if (millis() - lastUpdate >= 600000) { // Update every 10 minutes
    lastUpdate = millis();
    HTTPClient http;
    http.begin(client, serverStateURL);
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0) {
      String payload = http.getString();
      StaticJsonDocument<200> doc;
      if (deserializeJson(doc, payload) == DeserializationError::Ok) {
        currentState = doc["state"];
      }
    }
    http.end();
  }
}

/**
 * Handles the system state and controls the pump accordingly.
 * @param temp - Current temperature reading.
 * @param moisture - Current soil moisture reading.
 */
void handleState(float temp, int moisture) {
  switch (currentState) {
    case TEMP_CONTROL_MODE:
      controlPump(temp > 25.0);
      break;
    case MOISTURE_CONTROL_MODE:
      controlPump(moisture < 500);
      break;
    case SHABBAT_MODE: {
      struct tm timeinfo;
      if (getLocalTime(&timeinfo)) {
        controlPump(timeinfo.tm_hour >= 18 && timeinfo.tm_hour < 22);
      }
      break;
    }
    case MANUAL_MODE:
      controlPump(manualPumpOn);
      break;
  }
}

void setup() {
  Serial.begin(115200);
  WiFi_SETUP();
  dht.begin();
}

void loop() {
  fetchStateFromServer();
  float temp = dht.readTemperature();
  int moisture = analogRead(MOISTURE_SENSOR_PIN);
  sendData(temp, analogRead(LIGHT_SENSOR_PIN), moisture);
  handleState(temp, moisture);
  delay(500);
}