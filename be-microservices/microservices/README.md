HOW TO RUN ???
1. Redis Sentinel
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

2. Kafka
    - Start kafka:
      - Open cmd in root folder(microservices): "docker-compose -f docker/kafka/docker-compose-broker-kafka.yaml up"
    - Stop kafka:
      - Ctrl+C in cmd.
    - Kafka Apache UI: 
      - Open browser: "http://localhost:8080"
    - ADVANCED:
      - Increment partition topic:
        - "docker exec -it kafka1 kafka-topic.sh --alter --topic \{NAME\_TOPIC\} --bootstrap-server localhost:9092 --partitions \{NUMBER\_PARTITION\}"

