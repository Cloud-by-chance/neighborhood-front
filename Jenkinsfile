pipeline {
  agent any

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
  }
  
}

