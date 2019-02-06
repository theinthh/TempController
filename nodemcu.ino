#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <SoftwareSerial.h>
#include <string.h>

const char* ssid = "x";                   // wifi ssid
const char* password =  "theintgg";         // wifi password
const char* mqttServer = "172.20.10.3";    // IP adress Raspberry Pi
const char* mqttUser = "";      // if you don't have MQTT Username, no need input
const char* mqttPassword = "";  // if you don't have MQTT Password, no need input

WiFiClient espClient;
PubSubClient client(espClient);
SoftwareSerial s(D6, D5);

void setup() {
  s.begin(9600);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");


  client.setServer(mqttServer, 1883);
  client.setCallback(callback);

  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");

    if (client.connect("ESP8266Client", mqttUser, mqttPassword )) {

      Serial.println("connected");

    } else {

      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);

    }
  }
  //  client.publish("esp8266", "Hello Raspberry Pi");
  //  client.subscribe("esp8266");

}

void callback(char* topic, byte* payload, unsigned int length) {

  for (int i = 0; i < length; i++) {
    s.write(payload[i]);

    Serial.println(payload[i]);
  }

  Serial.println("-----------------------");
}


void loop() {

  client.subscribe("LED");
  sendData();
  client.loop();
}

void sendData() {
  if (s.available () > 0) {
    int temp = s.read();
    String stringTemp = String(temp);
    char value[10];
    stringTemp.toCharArray(value, 10);
    client.publish("SENSOR", value);
    Serial.println(value);
  }
}
