
# NewsAggregator

OpenSource news aggregator inspired by YCombinator's [HackerNews](https://news.ycombinator.com)
***This project is purely a sandbox for playing around.*** 


Licence: MIT

![Layout](https://images2.imgbox.com/6c/26/M2ZJ9ZQ3_o.jpg)


## Back-end

Server is a REST api based on NodeJS using express.
MongoDB as a datastore for experimenting with. 
Websockets are invoved too however have not been plmbed in yet. 


## Front-end

The provided UI is an Angular based project, with extremely basic layout. 
Angular was chosen to discover the best methods of optimizing the release packaging. 

# Getting Started
Note: Currently there is only support for MongoDB so you will need to have this installed/server available. 

To get up and running, in the root folder there is a 'config.json' you can fill in the details there. 
Then you can start the nodeJS Server 
`node main.js`

## Front-end
There is a file located in : 
`public\gamersofanews\src\app\config.json`

Using the port you specified in the config.json add this to the file and the `api_base_url`

for example : 
`"api_base_url": "http://localhost:5000/api/",`

Also the suffix `api` is required unless you update the server api routes. 

Once updated you can run the standard angular commands. 
Example : `ng serve`

Which will serve the angular site on port 4200 by default. 

# TODO:
A lot. 

 - Custom aggregator to balance listings based on the `aggregate_score`
 - Add Database connector for other DB types.  
 - User Registration & Role  system  
 - Admin system for deleting & moderating 
 - Cron/Scheduled jobs for aggregation  
 - Optimisation of angular packaging.

