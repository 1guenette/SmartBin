import datetime
#Server Connection to MySQL:
import MySQLdb

conn = MySQLdb.connect(host= "trashnet.ece.iastate.edu",user="logan",passwd="ROFLdb!789",db="trashnet_db")
x = conn.cursor()
time = datetime.datetime.now()
id = 1
status = "full"
try:
   x.execute("INSERT INTO eventsLog (UnitId, EventType, EventTime) VALUES (%s, %s, %s)", (id, status, time))
   conn.commit()
   x.execute("UPDATE binStatus SET Status ='Full' WHERE UnitId = " + id)
   conn.commit()
except:
   conn.rollback()

conn.close()
print("done");