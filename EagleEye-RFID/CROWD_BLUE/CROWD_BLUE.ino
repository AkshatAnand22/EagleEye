#include <SPI.h>
#include <MFRC522.h>
#include <SoftwareSerial.h>

#define RST_PIN         9          // Configurable, see typical pin layout above
#define SS_PIN          10         // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance

SoftwareSerial bluetooth(2, 3);     // RX, TX pins for Bluetooth module

void setup() {
  Serial.begin(9600);       // Initialize serial communications for debugging
  bluetooth.begin(9600);    // Initialize Bluetooth serial communication
  SPI.begin();              // Init SPI bus
  mfrc522.PCD_Init();       // Init MFRC522

  Serial.println("Scan RFID Tag...");
}

void loop() {
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    return;
  }

  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  // Get the UID of the card
  String rfidData = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    rfidData += String(mfrc522.uid.uidByte[i], HEX);
  }
  rfidData.toUpperCase();

  Serial.println("RFID Tag Detected: " + rfidData);

  // Send RFID data via Bluetooth
  bluetooth.println(rfidData);

  delay(1000);  // Delay a little bit to avoid sending too quickly
}
