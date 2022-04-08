pipeline {
  agent any
  environment {
    dockerHubRegistry = 'bluetic321/cicd-test'
    dockerHubRegistryCredential = '{docker-hub-credential}'
  }

  stages {

    stage('Checkout Application Git Branch') {
        steps {
                git url: 'https://github.com/Cloud-by-chance/neighborhood-front.git',
                branch: 'main'
        }
        post {
                failure {
                  echo 'Repository clone failure !'
                }
                success {
                  echo 'Repository clone success !'
                }
        }
    }
    stage('Docker Image Build') {
        steps {
            sh "sudo docker build . -t ${dockerHubRegistry}:${currentBuild.number}"
            sh "sudo docker build . -t ${dockerHubRegistry}:latest"
        }
        post {
                failure {
                  echo 'Docker image build failure !'
                }
                success {
                  echo 'Docker image build success !'
                }
        }
    }
    stage('Docker Image Push') {
        steps {
            withDockerRegistry([ credentialsId: dockerHubRegistryCredential, url: "" ]) {
                                sh "sudo docker push ${dockerHubRegistry}:${currentBuild.number}"
                                sh "sudo docker push ${dockerHubRegistry}:latest"

                                sleep 10 /* Wait uploading */ 
                            }
        }
        post {
                failure {
                  echo 'Docker Image Push failure !'
                  sh "sudo docker rmi ${dockerHubRegistry}:${currentBuild.number}"
                  sh "sudo docker rmi ${dockerHubRegistry}:latest"
                }
                success {
                  echo 'Docker image push success !'
                  sh "sudo docker rmi ${dockerHubRegistry}:${currentBuild.number}"
                  sh "sudo docker rmi ${dockerHubRegistry}:latest"
                }
        }
    }  


  }  
}

