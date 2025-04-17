````
docker build -t dailysale-frontend:latest -f /dailysale/Dockerfile.frontend /dailysale
docker stop dailysale-frontend-container
docker rm dailysale-frontend-container
docker run -d --name dailysale-frontend-container \
  --network dailysale-network \
  -p 80:80 \
  --restart unless-stopped \
  dailysale-frontend:latest
````
