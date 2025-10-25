````
docker build -t salehero-frontend:latest -f /dailysale/Dockerfile.frontend /dailysale
docker stop salehero-frontend-container
docker rm salehero-frontend-container
docker run -d --name salehero-frontend-container \
  --network dailysale-network \
  -p 80:80 \
  --restart unless-stopped \
  salehero-frontend:latest
````
