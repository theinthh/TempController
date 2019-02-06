#include <SoftwareSerial.h>
#include <DHT.h>;
SoftwareSerial s(10, 11);
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
int LEDpin = 8;
int temp;

#define relay 7
void setup() {
  s.begin(9600);
  Serial.begin(115200);
  pinMode(LEDpin, OUTPUT);
  pinMode(relay,OUTPUT);
  dht.begin();
}
int userStatus = 1 ; //auto
byte data ;
int value = 0;

void loop() {
  // ***** Control Fan On OFF  *****
 
  if (s.available() > 0 )
  { userStatus = 0 ;
    data = s.read();
    Serial.println(data);
    if (data == 97) {
      Serial.println(data);
      digitalWrite(relay, HIGH);
    }
    else{
      digitalWrite(relay, LOW);
    }
  }
  //userStatus = 1 ;
  sensorRead();
  sendData();
}
void sensorRead () {
  temp = dht.readTemperature();
}

void sendData() {
  if (value != temp ) {
    s.write(temp);
    Serial.println(temp);
  }
  value = temp;

}
