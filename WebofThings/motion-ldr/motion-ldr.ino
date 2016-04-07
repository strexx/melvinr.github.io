#include <EIoTCloudRestApi.h>
#include <EIoTCloudRestApiConfig.h>
#include <ThingSpeak.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiServer.h>
#include <WiFiUdp.h>


//pins and leds
int pinPir = D0;
int pinLdr = A0;
int pinLed = LED_BUILTIN;
int pirState = LOW;
int val = 0;  
int light = 0;


//Define client
const char* ssid = "AllKindzzz";
const char* password = "Boelers159753!";
WiFiClient client;

//keys
EIoTCloudRestApi eiotcloud;
#define AP_SSID "AllKindzzz"
#define AP_PASSWORD "Boelers159753!"
#define PIR_ID "57039c74c943a0661cf3149d/dLCRbLuCtg3NBJMP"
#define LDR_ID "57039c74c943a0661cf3149d/je3efB3WsdCBwJEu"

//ThingSpeak API
unsigned long CHANNEL_ID = 106699;
const char * API_KEY = "2QITX0H6ZFQ7RS3R";


void setup() {
 pinMode(pinLed, OUTPUT);
 pinMode(pinPir, INPUT);
 Serial.begin(9600);
 eiotcloud.begin();
 ThingSpeak.begin(client);
}

void loop() {
  delay(1000);

  light = analogRead(pinLdr);
  Serial.println(light);
  eiotcloud.sendParameter(LDR_ID, light);
  ThingSpeak.writeField(CHANNEL_ID, 2, light, API_KEY);
  
  
 val = digitalRead(pinPir);
    if (val == HIGH) {
        if (pirState == LOW) {
          digitalWrite(pinLed, HIGH);
          Serial.println("Motion detected!");
          ThingSpeak.writeField(CHANNEL_ID, 1, val, API_KEY);
           eiotcloud.sendParameter(PIR_ID, 1);
          pirState = HIGH;
        }
    } else {
        if (pirState == HIGH) {
          digitalWrite(pinLed, LOW);
          Serial.println("Motion ended");
          ThingSpeak.writeField(CHANNEL_ID, 1, val, API_KEY);
           eiotcloud.sendParameter(PIR_ID, 0);
          pirState = LOW;
        }
    }
}
