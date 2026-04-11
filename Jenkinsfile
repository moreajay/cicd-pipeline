pipeline {
   agent any

   tools {

        nodejs "NodeJS"
      }

   environment {
     
     DOCKER_IMAGE = "morehub/todo-list-app"
     IMAGE_TAG    = "${DOCKER_IMAGE}:${BUILD_NUMBER}"
   }

   stages {

      stage('Clone repo') {
        steps {
          git branch: 'main',
             url: 'https://github.com/moreajay/cicd-pipeline.git'
           }
       }

      stage('Docker login') {
        steps {
          withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
             sh 'echo $PASS | docker login -u $USER --password-stdin'
              
               }
           }
       }
     
     stage('Install dependencies') {
        steps {
           echo "Installing Node.js dependencies...."
           sh 'npm install'
             }
       }

     stage('Build docker image') {
        steps {
           echo "Building docker image...."
           sh "docker build -t ${env.IMAGE_TAG} ."
               
             }
       }
     stage('Push docker image') {
        steps {
           echo "Pushing image into docker hub...."
           sh "docker push ${env.IMAGE_TAG}"
             }
       }
     stage('Deploy to kubernets') {
        steps {
           echo "Deploying to kubernets...."
           withCredentials([file(credentialsId: 'test-kind', variable: 'KUBECONFIG')]) {
           sh """
                
              kubectl apply -f k8s/config-map.yaml
              kubectl apply -f k8s/secret.yaml || true
              kubectl apply -f k8s/mysql-pv.yaml
              kubectl apply -f k8s/mysql-pvc.yaml
              kubectl apply -f k8s/mysql.yaml
              kubectl apply -f k8s/todo-list.yaml
              kubectl set image deployment/todo-list-app todo-list-app=${env.IMAGE_TAG}
          """
             }
         }
       }
     } 
      
      post {
          success {
              echo "CI/CD pipeline completed"
              }
          failure {
              echo "piepline failed"
             }
       }
  }
