pipeline {
    agent any
	environment {
		AWS_ACCESS_KEY_ID=credentials('aws-access-key')
		AWS_SECRET_ACCESS_KEY=credentials('aws-secret-key')
		AWS_DEFAULT_REGION=credentials('aws-region')
	}
	parameters {
		choice(name: 'DEPLOY_ENV', choices: ['dev', 'prod'], description: 'Choose the environment to deploy')
	}
    stages {
        stage ('Node') {
            agent {
                docker {
                    image 'node:20.10.0-alpine3.18'
                    args '--name node20'
                    reuseNode true
                }
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
                        sh 'pwd'
                        sh 'ls'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'docker cp node20:/var/jenkins_home/workspace/weather-info-be_main/dist/index.js index.js'
				sh 'zip index.zip index.js'
				sh "aws lambda update-function-code --function-name \"weather-info-api-${params.DEPLOY_ENV}\" --zip-file \"index.zip\""
            }
        }
    }
}
