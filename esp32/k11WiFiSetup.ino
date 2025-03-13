#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>

// WiFi credentials
const char* WIFI_SSID = "yanal";
const char* SERVER_DATA_URL = "http://10.9.1.10:3004/esp";

WiFiClient client;

/**
 * Initializes the WiFi connection and waits until connected.
 */
void setupWiFi() {
  WiFi.begin(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected successfully");
}

/**
 * Sends sensor data to the server.
 * @param temp - Temperature value
 * @param light - Light intensity value
 * @param moisture - Soil moisture value
 */
void sendData(float temp, int light, int moisture) {
  HTTPClient http;
  String requestData = "?temp=" + String(temp) + "&light=" + String(light) + "&moisture=" + String(moisture);
  http.begin(client, SERVER_DATA_URL + requestData);
  Serial.println(requestData);

  int httpResponseCode = http.GET();
  if (httpResponseCode == HTTP_CODE_OK) {
    Serial.print("HTTP response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("HTTP Error: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
