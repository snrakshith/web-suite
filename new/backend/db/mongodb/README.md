Install Mongodb from https://www.mongodb.com/download-center


Add this to the Environmental Variables:
C:\Program Files\MongoDB\Server\4.0\bin


Starting the Server
1) Create a folder in your system for enabling mongodb put all data files for example "C:/data"
2) mongod --dbpath "C:/data"


Connecting to the Server:
mongo

Adter this command you will be connected to mongo Shell

For killing the mongod server in windows
1) Start the command prompt as Administrator
2) run the command
net stop MongoDB



References for operators:
https://docs.mongodb.com/manual/reference/operator/query-comparison/