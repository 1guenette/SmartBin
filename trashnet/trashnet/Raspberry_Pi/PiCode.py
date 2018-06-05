##import RPi.GPIO as IO
import time
import sqlite3
import datetime
#Server Connection to MySQL:
import MySQLdb
import sonar.py

##SONAR
import RPi.GPIO as GPIO

##
##IO.setwarnings(False)
##IO.setmode(IO.BCM)
##IO.setup(14,IO.IN) #GPIO 14 -> IR sensor as input

## 0 = empty
## 1 = full
## 3 = trash thrown 

conn = MySQLdb.connect(host= "trashnet.ece.iastate.edu",user="logan",passwd="ROFLdb!789",db="trashnet_db")
cursor = conn.cursor()
status = "empty";
id = 1
##full = false


GPIO.setmode(GPIO.BOARD)  
  
  
def ReadDistance(pin):  
   GPIO.setup(pin, GPIO.OUT)  
   GPIO.output(pin, 0)  
  
   time.sleep(0.000002)  
  
  
   #send trigger signal  
   GPIO.output(pin, 1)  
  
  
   time.sleep(0.000005)  
  
  
   GPIO.output(pin, 0)  
  
  
   GPIO.setup(pin, GPIO.IN)  
  
  
   while GPIO.input(pin)==0:  
      starttime=time.time()  
  
  
   while GPIO.input(pin)==1:  
      endtime=time.time()  
        
   duration=endtime-starttime  
   # Distance is defined as time/2 (there and back) * speed of sound 34000 cm/s   
   distance=duration*34000/2  
   return distance


def monitor():
	if(IO.input(14)==False): #object is near
		db.execute("INSERT INTO eventsLog (UnitId, EventType, EventTime) VALUES (" + id + ", 3," + datetime.time() +")")
		print ("trash thrown in")
		time.sleep(0.5)
		
		if(IO.input(14) == False):
			print("trash is full")
			trash = "full"
			##sql update
			try:
   				cursor.execute("UPDATE binStatus SET Status ='Full' WHERE UnitId = " + id)
   				conn.commit()
			except:
   				conn.rollback()
	
while 1:
	monitor()
	time.sleep(0.5)
