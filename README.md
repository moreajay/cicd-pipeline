# TODO-LIST APPLICATION 
## Project Overview 
This project demonstrates a real-world DevOps implementation of a Todo List application built using Node.js and MySQL, deployed through a fully automated CI/CD pipeline.
The application follows containerized deployment and Kubernetes-based orchestration practices.
## Key Implementations
- Backend development using Node.js
- Database integration using MYSQL
- Containerization using Docker
- Orchestration using Kubernets
- CICD using Jenkins
- Automatic build trigger using Github Webhooks
- Persistent storage using Kubernetes PV & PVC
## Tech Stack
### Frontend & Backend 
- Node.js
- MYSQL
### DevOps Tools
- Docker
- DockerHub (Image Registry)
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
## Jenkins Pipeline Execution
<p align="center">
   <img width="800"  text-align: center alt="cicd output" src="https://github.com/user-attachments/assets/7aa697f1-058a-4d90-97f8-95b68f9a06cb" />
</p>

## Kubernets Resource Status Overview
<p align="center">
   <img width="800" alt="kubernets output" src="https://github.com/user-attachments/assets/08d76962-67f3-4743-a161-0c2ac1b9e59d" />
</p>  

## Application After CI/CD Deployment
<p align="center">
   <img width="800" alt="application output" src="https://github.com/user-attachments/assets/86be2c47-5c13-4e74-9ba9-caff5d965d9c" />
</p>

