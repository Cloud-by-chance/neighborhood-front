pipeline {
  agent any
  environment {
    dockerHubRegistry = 'bluetic321/cicd-web'
    dockerHubRegistryCredential = 'docker-hub-credential'
    githubCredential = 'git-ssh'
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
            sh "docker build . -t ${dockerHubRegistry}:${currentBuild.number}"
            sh "docker build . -t ${dockerHubRegistry}:latest"
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
            withDockerRegistry([ credentialsId: 'docker-hub-credential' , url: "" ]) {
                                sh "docker push ${dockerHubRegistry}:${currentBuild.number}"
                                sh "docker push ${dockerHubRegistry}:latest"

                                sleep 10 /* Wait uploading */ 
                            }
        }
        post {
                failure {
                  echo 'Docker Image Push failure !'
                  sh "docker rmi ${dockerHubRegistry}:${currentBuild.number}"
                  sh "docker rmi ${dockerHubRegistry}:latest"
                }
                success {
                  echo 'Docker image push success !'
                  sh "docker rmi ${dockerHubRegistry}:${currentBuild.number}"
                  sh "docker rmi ${dockerHubRegistry}:latest"
                }
        }
    }  
    stage('K8S Manifest Update') {
        steps {
            git url: 'https://github.com/Cloud-by-chance/neighborhood-manifest.git',
                branch: 'main'

            sh "sed -i 's/cicd-web:.*\$/cicd-web:${currentBuild.number}/g' deployment.yaml"
            sh "git add deployment.yaml"
            sh "git commit -m '[UPDATE] cicd-web ${currentBuild.number} image versioning'"
            sshagent(credentials: ['git-ssh']) {
                sh "git remote set-url origin git@github.com:Cloud-by-chance/neighborhood-manifest.git"
                sh "git push -u origin main"
             }/*
	    withCredentials([sshUserPrivateKey(credentialsId: 'git-ssh', keyFileVariable: "/var/jenkins_home/.ssh/id_rsa")]) {
		
                sh "git remote set-url origin git@github.com:Cloud-by-chance/neighborhood-manifest.git"
                sh "git push -u origin main"
             }*/
        }
        post {
                failure {
                  echo 'K8S Manifest Update failure !'
                }
                success {
                  echo 'K8S Manifest Update success !'
                }
        }
    }

  }  
}

