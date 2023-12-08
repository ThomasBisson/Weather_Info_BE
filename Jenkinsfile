pipeline {
    agent {
		docker {
            image 'node:20.10.0-alpine3.18' 
            args '-p 3000:3000' 
        }
	}
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
				sh 'npm i'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
				sh 'npm run test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}