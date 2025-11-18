pipeline {
   agent any

   environment {
     
     DOCKER_IMAGE = "morehub/todo-list-app"
   }

   stages {

      stage('Clone repo') {
        steps {
          git url: 'https://github.com/moreajay/cicd-pipeline.git'
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
           sh 'docker build -t $DOCKER_IMAGE:latest .'
             }
       }
     stage('Push docker image') {
        steps {
           echo "Pushing image into docker hub...."
           sh 'docker push $'
             }
       }
     stage('Deploy to kubernets') {
        steps {
           echo "Deploying to kubernets...."
           sh '''
             
              kubectl --kubeconfig=$KUBECONFIG apply -f k8s/config-map.yaml
              kubectl --kubeconfig=$KUBECONFIG apply -f k8s/secret.yaml || true
              kubectl --kubeconfig=$KUBECONFIG apply -f k8s/mysql-pv.yaml
              kubectl --kubeconfig=$KUBECONFIG apply -f k8s/mysql-pvc.yaml
              kubectl --kubeconfig=$KUBECONFIG apply -f k8s/mysql.yaml
              kubectl --kubeconfig=$KUBECONFIG apply -f k8s/todo-list.yaml
          '''
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
