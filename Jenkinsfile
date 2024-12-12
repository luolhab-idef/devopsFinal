pipeline {
    agent any
    stages {
        stage('Checkout Code') {
    steps {
        echo 'Checking out code from public GitHub repository...'
        checkout([
            $class: 'GitSCM',
            branches: [[name: '*/master']], // Adjust branch name to "main" or as per your repository
            doGenerateSubmoduleConfigurations: false,
            extensions: [],
            userRemoteConfigs: [[
                url: 'https://github.com/luolhab-idef/Devops.git'
            ]]
        ])
    }
}
        stage('Build Frontend') {
            steps {
                script {
                    dir('frontend') {
                        bat 'docker build -t front .'
                    }
                }
            }
        }
        stage('Build SVM') {
            steps {
                script {
                    dir('Backend/SVM') {
                        bat 'docker build -t svm .'
                    }
                }
            }
        }
        
        stage('Build VGG19') {
            steps {
                script {
                    dir('Backend/VGG19') {
                        bat 'docker build -t vgg19 .'
                    }
                }
            }
        }

        stage('Deploy'){
            steps{
                 script {
                    
                        bat 'docker-compose up -d'
                    
                }
            }
        }
        

        
        
        
      
    }
    

}
