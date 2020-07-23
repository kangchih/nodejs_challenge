# Nodejs Challenge
A Practice of Registration System (Only Sign-up for now)

## Service Usage
```
Change your Email service api_keys, and database connection in config.json file.
User can signup with email, google sign-in token, or facebook sign-in token.
Signed-up user will receive an email and a coupon(just a record in DB)
```

## Setup
```
npm install
```

### API Usage
```
1. Email Sign-up:
Request body fields:

{
    "email": "xx@xx.com",
    "password": "AtLeast8Words",
    "name": "xxxx",
	"confirmPassword":"AtLeast8Words"
}

Example curl command:

curl -X POST \
  http://localhost:8080/auth/signup \
  -H 'content-type: application/json' \
  -d '{
    "email":"test@test.com",
    "password":"12345678",
    "name": "test",
	"confirmPassword":"12345678"
    }'

Response: 
{
    "userId": "5f1718401fe9c739557b5447"
}   

NOTE: userId is user's mongodb document id! 

2. Third-party Sign-up:

Request body fields:

{
    "provider": "google" | "facebook",
    "token": "xxxxxxxxx" 
}

Example curl command:

curl -X POST \
  http://localhost:8080/auth/thirdparty/signup \
  -H 'content-type: application/json' \
  -d '{
	"provider":"facebook",
    "token": "EAAHePzlyNVcBAO2okjevZAPTgBHj742AieH9GG4Wh0oQUhdgl70FMzbpWPXJq3yMxMUdeVGECCwQhN6VjF8xFsYBAlwl4ThNUeFIH9CBTmLNwgsaeG1Tg54jI29cFkRnrqZACS3pyVwlMVpaMcuRpntKMjMtBFXR269fojbyzZARuMeMXBTGQSH1IydgUpeJHGREuR4XQZDZD"
    }'

Response: 
{
    "userId": "5f1718401fe9c739557b5447"
}   

NOTE: userId is user's mongodb document id! 

3. Create Coupon
curl -X POST \
  http://localhost:8080/coupon \
  -H 'content-type: application/json' \
  -d '{
	"title": "SIGNUP_COUPON",
	"code": "SIGNUP_DISCOUNT"
}'

```

### Config.json File
```
{
    "sendgrid_key" : "Sendgrid api key",
    "email_from": "Email sender address",
    "mongo_connect": "mongodb+srv://<name>:<password>@xxxx.xxx.mongodb.net/<db>?retryWrites=true&w=majority"
}
```

### Run
```shell
npm start
```