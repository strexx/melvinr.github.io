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


//Pins and leds with values
int pinPir = D0;
int pinLdr = A0;
int pirState = LOW;
int val = 0;
int light = 0;


//Define client, use your wifi or hotspot's SSID and password
const char* ssid = "";
const char* password = "";
WiFiClient client;

//Keys for EIoTCloudRestApi
EIoTCloudRestApi eiotcloud;
#define AP_SSID ""
#define AP_PASSWORD ""
#define PIR_ID "57039c74c943a0661cf3149d/dLCRbLuCtg3NBJMP"
#define LDR_ID "57039c74c943a0661cf3149d/je3efB3WsdCBwJEu"

//ThingSpeak API
unsigned long CHANNEL_ID = 106699;
const char * API_KEY = "2QITX0H6ZFQ7RS3R";

//Setup for use
void setup() {
 pinMode(pinPir, INPUT);
 Serial.begin(9600);
 eiotcloud.begin();
 ThingSpeak.begin(client);
}

void loop() {
  delay(1000);

  //Get LDR value and send to cloud
  light = analogRead(pinLdr);
  Serial.println(light);
  eiotcloud.sendParameter(LDR_ID, light);
  ThingSpeak.writeField(CHANNEL_ID, 2, light, API_KEY);


//Send pir sensor's values to cloud.
 val = digitalRead(pinPir);
     //If the returned value is high and pirState is low, motion has been detected, this will be sent to the cloud
     //and state will be set to high
    if (val == HIGH) {
        if (pirState == LOW) {
          Serial.println("Motion detected!");
          ThingSpeak.writeField(CHANNEL_ID, 1, 1, API_KEY);
           eiotcloud.sendParameter(PIR_ID, 1);
          pirState = HIGH;
        }
    } else {
      //If the value is low and the pirState is high, there is no motion, this will be sent to the cloud
      //and state will be set to low.
        if (pirState == HIGH) {
          Serial.println("Motion ended");
          ThingSpeak.writeField(CHANNEL_ID, 1, 0, API_KEY);
           eiotcloud.sendParameter(PIR_ID, 0);
          pirState = LOW;
        }
    }
}
