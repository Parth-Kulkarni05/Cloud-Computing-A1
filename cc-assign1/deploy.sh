# Used the following script to understand how to send the react build app to nginx server hosted on the ec2 instance, and script was referenced from here

#S. Saliba, “Deploy your react application to AWS using a single command,” Medium, 13-Apr-2021. [
#Online]. Available: https://levelup.gitconnected.com/deploy-your-react-application-to-aws-in-a-single-command-9b8d960f83df. [Accessed: 30-Mar-2023]. 


#!/bin/sh 
echo “Building React Project …” 
yarn run build 
echo “Copying html file …” 
cp -r build html 
echo “Connecting to AWS VM and copying file to /var/www/html/ …” 
scp -i C:/Users/parth/Downloads/labsuser.pem -r html ubuntu@ec2-44-201-20-255.compute-1.amazonaws.com:/var/www
echo “Removing html file from local directory …” 
rm -r html
/bin/bash