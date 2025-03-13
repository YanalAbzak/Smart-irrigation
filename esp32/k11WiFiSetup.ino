#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>

const char* ssid = "Kinneret College";
const char* serverDataURL = "http://10.9.1.10:3004/esp";

WiFiClient client;

void WiFi_SETUP() {
  WiFi.begin(ssid);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
}

void sendData(float temp, int light, int moisture) {
  HTTPClient http;
  String dataUrl = "?temp=" + String(temp) + "&light=" + String(light) + "&moisture=" + String(moisture);
  http.begin(client, serverDataURL + dataUrl);
  Serial.println(dataUrl);
  int httpCode = http.GET();
  if (httpCode == HTTP_CODE_OK) {
    Serial.print("HTTP response code: ");
    Serial.println(httpCode);
  } else {
    Serial.print("HTTP Error: ");
    Serial.println(httpCode);
  }
  http.end();
}
