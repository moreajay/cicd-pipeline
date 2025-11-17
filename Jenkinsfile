pipeline {
   agent any

   environmnet {
     
     DOCKER_IMAGE = "morehub/todo-list-app"
   }

   stages {

      stage('Checkout Code) {
        steps {
          echo "pulling todo list project from github...."
          checkout scm
           }
       }
     
     stage('Install dependencies')
        steps {
           echo "Installing Node.js dependencies...."
           sh 'npm install'
             }
       }

     stage('Build docker image')
        steps {
           echo "Building docker image...."
           sh 'docker build -t $DOCKER_IMAGE:latest .'
             }
       }
     stage('Push docker image')
        steps {
           echo "Pushing image into docker hub...."
           sh 'docker push $'
             }
       }
     stage('Deploy to kubernets')
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
