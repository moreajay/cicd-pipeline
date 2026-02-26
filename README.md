# TODO-LIST APPLICATION 
## Project Overview 
This project demonstrates a real-world DevOps implementation of a Todo List application built using Node.js and MySQL, deployed through a fully automated CI/CD pipeline.
- Backend development using Node.js
- Database integration using MYSQL
- Containerization using Docker
- Orchestration using Kubernets
- CICD using Jenkins
- Automatic build trigger using Github Webhooks
## Tech Stack
### Frontend & Backend 
- Node.js
- MYSQL
### DevOps Tools
- Docker
- Kubernets
- Jenkins
- Github
- Linux
## Jenkins CI/CD Pipeline 
1. Code pushed to GitHub
2. GitHub webhook triggers job
3. Jenkins:
   - Pulls latest code
   - Builds Docker image
   - Pushes image to DockerHub
   - Deploys to Kubernets cluster
## Access Application 
   Using NodePort:
   `http://<NodeIP>:<NodePort>`
