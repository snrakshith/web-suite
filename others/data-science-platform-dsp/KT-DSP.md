Technologies
- Kafka with Apache Zookeeper 
- Airbyte
- DBT
- Redis
- MongoDB
- Data lake , data warehouse , delta lake , data lakehouse , db 

Concepts
- MongoDB change streams
- stream vs batch processing
- kafka connect
- source vs sink
- ELT Extract Load transform  vs ( ETL Extract transform Load  earlier version)

Step 1 Apply mongo change streams to existing mongodb collections

Step 2 
(Stream)
- For Streaming the data or data in motion configure kafka with change stream
- We can stream the realtime data to send data from node service to redis in-memory db.

(Batch)
- For Batching the data by configure kafka we can setup a cron job to upload as a single mongodump
	
	
Step 3 
_ Now that the data is stored in S3 (data lake)

Step 4 
- We can start consuming it for the ELT Process

Step 5 
- After we are done with EL Phase using Airbyte

Step 6 
- We can send data to a data warehouse solution like Google BigQuery

Step 7 
- We can run queries for the data taht present in the Google BQ using a "DBT tool"
- The possibilities are endless from here, in terms of Connectors ( BI Client, ML models , Sales, OPs teams, etc)

