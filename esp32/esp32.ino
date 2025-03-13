#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>

#define dhtPin 16
#define DHTTYPE DHT11
DHT dht(dhtPin, DHTTYPE);

#define lightSensor 36
#define MoistureSensor 39
#define pumpPin 15

#define TEMP_CONTROL 1
#define MOISTURE_CONTROL 2
#define SHABBAT 3
#define MANUAL 4

int currentState = MANUAL;
unsigned long lastUpdate = 0;
extern WiFiClient client;

const char* serverStateURL = "http://10.9.1.10:3004/state";

bool manualPumpOn = false;
bool isPumpRunning = false;

void controlPump(bool turnOn) {
  if (turnOn && !isPumpRunning) {
    Serial.println("Pump ON");
    isPumpRunning = true;
  } else if (!turnOn && isPumpRunning) {
    Serial.println("Pump OFF");
    isPumpRunning = false;
  }
}

void fetchStateFromServer() {
  if (millis() - lastUpdate >= 600000) {
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

void handleState(float temp, int moisture) {
  switch (currentState) {
    case TEMP_CONTROL:
      controlPump(temp > 25.0);
      break;
    case MOISTURE_CONTROL:
      controlPump(moisture < 500);
      break;
    case SHABBAT: {
      struct tm timeinfo;
      if (getLocalTime(&timeinfo)) {
        controlPump(timeinfo.tm_hour >= 18 && timeinfo.tm_hour < 22);
      }
      break;
    }
    case MANUAL:
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
  int moisture = analogRead(MoistureSensor);
  sendData(temp, analogRead(lightSensor), moisture);
  handleState(temp, moisture);
  delay(500);
}
