Roadmap for Ikure Dashboards (ID Studio) 'Single tenant'

Phase 1:
Establish connection from ID Studio to
1. DW house (bigquery) for stale data
2. streaming service (kafka.js) for realtime data

Phase 2:
Create Dashboards & Insights
1. dashboards can be public or private 
2. dashboards is a collection of many insights
3. insights can be visualised via
 	- tables
 	- pie chart
 	- bar chart
4. dashboards can be downloaded as a PDF
5. Insights can be downloaded as a SVG

Phase 3:
Define reusable calculations/SQL statements
1.Create a metrics 
	- name
	- description
	- definations
2.actions which can be taken save/cancel

Phase 4:
Consume it as a Microfrontends in a host app (360 portal)
1. Make ID Studio as a container app & connect it to host app

----
Frontend TechStack 

Phase 1
1. For frontend a custom webpack react workflow would
2. For faster development we would go with CHAKRA UI
3. It would be a typescript project 
4. We will stick with only one CHART library ... ? ( Need to figure out )
5. Dynamic route creations 
6. Focus on fail safe/ fallback UI systems

TL;DR
 Typescript = Yes
 Routing = RRDv6
 Component Lib = Chakra UI

---
Backend TechStack

TL;DR
 Typescript = No
 Library for routes = Express.js
 DB = MongoDB
 Runtime = Node.js

Additional Info:
1. Every phase includes development at both frontend/backend
