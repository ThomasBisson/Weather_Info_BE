pipeline {
    agent {
		docker {
            image 'node:20.10.0-alpine3.18'
        }
    }
	environment {
		AWS_ACCESS_KEY_ID=credentials('aws-access-key')
		AWS_SECRET_ACCESS_KEY=credentials('aws-secret-key')
		AWS_DEFAULT_REGION=credentials('aws-region')
	}
	parameters {
		choice(name: 'DEPLOY_ENV', choices: ['dev', 'prod'], description: 'Choose the environment to deploy')
	}
    stages {
        stage('Setup') {
            steps {
                echo 'Setup..'
				sh 'npm i'
        	}
        }
        stage('Test') {
            steps {
                echo 'Testing..'
				sh 'npm run test'
            }
        }
		stage('Build') {
			steps {
				echo 'Building...'
				sh 'npm run build'
			}
		}
        stage('Deploy') {
            steps {
                echo 'Deploying....'
				sh 'zip dist/index.zip dist/index.js'
				sh "aws lambda update-function-code --function-name \"weather-info-api-${params.DEPLOY_ENV}\" --zip-file \"dist/index.zip\""
            }
        }
    }
}
