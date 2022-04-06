pipeline {
  agent any

  stages {
	stage('test') {
              steps {
                  script {
                      sh 'echo test'
                  }
              }
          }

	stage('Checkout Application Git Branch') {
        
	steps {
                url: 'https://github.com/Cloud-by-chance/neighborhood-front.git',
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
  }
  
}

