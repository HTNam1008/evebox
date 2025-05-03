HOW TO RUN ???

Step 1. Redis Sentinel
   - Replace my local ip v4 to variable "HOST_IP" in docker/redis/.env
   - Start redis sentinel:
     - Open cmd in root folder(microservices): "docker-compose -f docker/redis/docker-compose-redis.yaml up"
   - Stop redis sentinel:
     - Ctrl+C in cmd.
   - Redis insight UI:
       - Open browser "http://localhost:5540"
       - Select "Use recommended settings"
       - Click "Add redis database"
       - Click "Redis Sentinel" and type host = "sentinel-1", port "26379"
       - Select "mymaster" and click "Add database"
  

Step 2. Kafka
 - Start kafka:
   - Replace my local ip v4 to variable `KAFKA_CFG_ADVERTISED_LISTENERS=EXTERNAL://${local_ip}:9193`
   - Open cmd in root folder(microservices): "docker-compose -f docker/kafka/docker-compose-broker-kafka.yaml up"
 - Stop kafka:
   - Ctrl+C in cmd.
 - Kafka Apache UI: 
   - Open browser: "http://localhost:8080"
 - ADVANCED:
   - Increment partition topic:
     - "docker exec -it kafka1 kafka-topic.sh --alter --topic \{NAME\_TOPIC\} --bootstrap-server localhost:9092 --partitions \{NUMBER\_PARTITION\}"


*Note: Kafka and Redis must run successfully before running other services.*

*Note: Each service and frontend needs "npm install"*


Step 3. Redis module
  - Open cmd in folder "microservices/libs/redis" and run command: "nest build"

Step 4. Gateway-Service
   - Port: 8000
   - Open folder apps/api-gateway-svc  -> npm run start:dev


Step 5. Auth-Service
   - Port 8001, using database <> event-svc
   - Open folder "/apps/auth-svc": 
     - If first time run: access folder "/src/infrastructure/database/prisma" -> open CMD -> "npx prisma generate"
     - Else: npm run start:dev

       
Step 6: Admin-Service
   - Port 8007
   - Same with step 4.

     
Step 7. Noti-Service
   - Don't use public port.
   - Only communicate with other services through Kafka's Message Queue.


*Note: Currently not connect Event and Ticket service via gateway !!!!.*
*Note: The first time you connect to kafka, you may encounter an error `KafkaJSProtocolError: This server does not host this topic-partition`. Please restart the service in microservices.*

Flow Admin:
- Account management:
   - Get data from admin database.
   - When user register successfully, auth-service publish event `${user_created}` to admin-service through Kafka and admin-service save data to admin database.
   - When admin active/deactive user, admin-service update data in admin database and publish event `${change_status}` to auth-service. When the event is received, auth-service updates data in auth database.
   
