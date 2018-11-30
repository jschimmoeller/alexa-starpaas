rm alexa-starpaas.zip 
zip alexa-starpaas.zip ./index.js -r ./node_modules 
aws lambda update-function-code --function-name alexa-starpaas --zip-file fileb://alexa-starpaas.zip