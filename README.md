## Azure Form Recognition API
The Azure Form Recognition API uses machine learning technology to identify and extract text, key/value pairs and table data from form documents. Form Recognizer is comprised of custom models, the prebuilt receipt model, and the layout API.

## 1. Using without JWT:

## 1.a) Receipt Analyzer
Extract field text and semantic values from a given receipt document. The input document must be of one of the supported content types - 'application/pdf', 'image/jpeg', 'image/png' or 'image/tiff'. 
Use 'application/json' type to specify the Url location of the document to be analyzed.

The following image documents can be used to test the analyze receipt API:

Five model images stored on my Microsoft Azure Storage:
1. https://vedija.blob.core.windows.net/form-container/contoso-receipt.png?sp=r&st=2020-04-28T05:32:08Z&se=2020-05-15T13:32:08Z&spr=https&sv=2019-10-10&sr=b&sig=0dfXALkgpqhCHedJaCkqg1ytXITPLS816DMaWjV%2F%2F68%3D

2. https://vedija.blob.core.windows.net/form-container/Receipt2.jpg?sp=r&st=2020-04-28T05:34:53Z&se=2020-05-15T13:34:53Z&spr=https&sv=2019-10-10&sr=b&sig=ZXiJFUUpyaFXqqQs6EdQYOv%2FQ2r9sGMNMRLJCq6jPrQ%3D

3. https://vedija.blob.core.windows.net/form-container/Receipt3.jpg?sp=r&st=2020-04-28T05:35:19Z&se=2020-05-15T13:35:19Z&spr=https&sv=2019-10-10&sr=b&sig=%2Be8wOY6ykwqYJYMwLgFABCNQtJGnZ8d1aq4YNtOGTAo%3D

4. https://vedija.blob.core.windows.net/form-container/Receipt4.jpg?sp=r&st=2020-04-28T05:35:41Z&se=2020-05-15T13:35:41Z&spr=https&sv=2019-10-10&sr=b&sig=8UjmmL3g0Ub4TwvoMqA%2BPLfnooJU2qcRDDUZZ1iqU1I%3D

5. https://vedija.blob.core.windows.net/form-container/Receipt5.jpg?sp=r&st=2020-04-28T05:36:00Z&se=2020-05-15T13:36:00Z&spr=https&sv=2019-10-10&sr=b&sig=jp8%2Bbq6QvSG71M4q55GAtUYFJbgcye94M747CdwM3EA%3D

Please use any of the 5 above urls to test the API.

 # API
 ENDPOINT : `http://142.93.55.15:5000/analyzeReceipt`

 METHOD: `POST`

 BODY PARAMETERS:
 * Name: `imageUrl`
   Description: URL of the image that needs to be analyzed through form recognizer.

 Testing API using POSTMAN:
    Enter the above endpoint URL and select method as POST. Then, in the request body tab, select type as raw and from the dropdown select JSON.
    Pass the above mentioned params in the body in JSON format.

  * Example: 
  {
    "imageUrl" : "https://vedija.blob.core.windows.net/form-container/contoso-receipt.png?sp=r&st=2020-04-28T05:32:08Z&se=2020-05-15T13:32:08Z&spr=https&sv=2019-10-10&sr=b&sig=0dfXALkgpqhCHedJaCkqg1ytXITPLS816DMaWjV%2F%2F68%3D"
  } 

 RESPONSE: JSON response from the form recognizer API.
 # Status Code: 200 (success)
    Sample response:
   {
    "content-length": "0",
    "operation-location": "https://siformrecognizer.cognitiveservices.azure.com/formrecognizer/v2.0-preview/prebuilt/receipt/analyzeResults/1b897659-5e1a-4167-96c7-56d8e5ad1d01",
    "x-envoy-upstream-service-time": "497",
    "apim-request-id": "1b897659-5e1a-4167-96c7-56d8e5ad1d01",
    "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
    "x-content-type-options": "nosniff",
    "date": "Tue, 28 Apr 2020 01:15:17 GMT",
    "connection": "close"
   }

 # Error Response: 
   * Status: 400,
     Description: Bad request error, Invalid input

   * Status: 415,
     Description: Unsupported media type

   * Status: 500,
     Description: Internal server error


## 1.b) Get Analyzed Receipt Result
  Query the status and retrieve the result of an Analyze Receipt operation. The URL to this interface can be obtained from the 'Operation-Location' header in the Analyze Receipt response. 

 # API
 ENDPOINT : `http://142.93.55.15:5000/receiptResults`

 METHOD: `GET`

 Testing API using POSTMAN:
    Enter the above endpoint URL and select method as GET. You will need to run the 'Analyze Receipt' API with 'status code:200' to proceed with this Get Analyzed Results API. 
    (** It requires a query param called 'resultId' which is appended to the Form Recognizer API internally, so a successful response from previous Analyze receipt API is mandatory. You don't need to manually append anything in above mentioned URL. Just simply select GET method and hit the URL:`http://142.93.55.15:5000/receiptResults` **)

 RESPONSE: JSON response from the form recognizer API.
 # Status Code: 200 (success)
    Sample response:
{
    "status": "succeeded",
    "createdDateTime": "2020-04-28T01:15:18Z",
    "lastUpdatedDateTime": "2020-04-28T01:15:21Z",
    "analyzeResult": {
        "version": "2.0.0",
        "readResults": [
            {
                "page": 1,
                "angle": 0.4248,
                "width": 5.9967,
                "height": 11.705,
                "unit": "inch",
                "language": "en"
            }
        ],
        "documentResults": [
            {
                "docType": "prebuilt:receipt",
                "pageRange": [
                    1,
                    1
                ],
                "fields": {
                    "ReceiptType": {
                        "type": "string",
                        "valueString": "Itemized",
                        "confidence": 0.702
                    },
                    "MerchantName": {
                        "type": "string",
                        "valueString": "Contoso Contoso",
                        "text": "Contoso Contoso",
                        "boundingBox": [
                            1.4619,
                            0.9949,
                            4.5042,
                            1.1485,
                            4.416,
                            2.8967,
                            1.3736,
                            2.7432
                        ],
                        "page": 1,
                        "confidence": 0.517
                    },
                    ....
            }
        ]
    }
}

 # Error Response: 
   * Status: 404,
     Description: Invalid or expired operationId

   * Status: 500,
     Description: Internal server error



## 2. Using with JWT:
# 2.a) You have to authenticate the user(using username & password) and generate token for authorization.

 ENDPOINT: `http://142.93.55.15:5000/signIn`

 METHOD: `POST`

 BODY PARAMETERS:
  * Name: `username`
    Description : Enter the username of the user to signIn
    Value: `vedija` (hardcoded for demo purpose)

  * Name: `password`
    Description : Enter password of the user
    Value : `aijdev`(hardcoded for demo purpose)

 Testing API using POSTMAN:
    Enter the above endpoint URL and select method as POST. Then, in the request body tab, select type as raw and from the dropdown select JSON.
    Pass the above mentioned params in the body in JSON format.
    
   * Example: 
    {
        "username" : "vedija",
        "password" : "aijdev"
    }

 RESPONSE: A JSON response will be returned.
 # Status Code: 200 (success)
    Example Response:
   {
    "token": "somesampletokentextkeyhere"
   }

 # Error Response: 
   * Status: 400,
     Description: SignIn unsuccessful because of invalid credentials

# 2.b) Once the user is verified, they can now use the form recognizer to analyze the receipt

 ENDPOINT: `http://142.93.55.15:5000/user/analyzeReceipt`

 METHOD: `POST`

 HEADERS: 
   * Key: `Authorization`,
     Value: Access token returned from the first step(2.a) appended after the keyword 'token' with space
     Example: token `accesstokenvalue`

 BODY PARAMETERS:
   * Name: `imageUrl`
     Description: URL of the image that needs to be analyzed through form recognizer.

 Testing API using POSTMAN:
    Enter the above endpoint URL and select method as POST. Then, in the 'Body' tab, select type as raw and from the dropdown select JSON. Pass the above mentioned params in the body in JSON format.

  * Example: 
  {
    "imageUrl" : "https://vedija.blob.core.windows.net/form-container/contoso-receipt.png?sp=r&st=2020-04-28T05:32:08Z&se=2020-05-15T13:32:08Z&spr=https&sv=2019-10-10&sr=b&sig=0dfXALkgpqhCHedJaCkqg1ytXITPLS816DMaWjV%2F%2F68%3D"
  } 

    Then, in the 'Headers' tab, add key as 'Authorization' and value as 'token accesstokenvalue' as described above. 

 RESPONSE: JSON response from the form recognizer API.
 # Status Code: 200 (success)
    Sample response:
   {
    "content-length": "0",
    "operation-location": "https://siformrecognizer.cognitiveservices.azure.com/formrecognizer/v2.0-preview/prebuilt/receipt/analyzeResults/1b897659-5e1a-4167-96c7-56d8e5ad1d01",
    "x-envoy-upstream-service-time": "497",
    "apim-request-id": "1b897659-5e1a-4167-96c7-56d8e5ad1d01",
    "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
    "x-content-type-options": "nosniff",
    "date": "Tue, 28 Apr 2020 01:15:17 GMT",
    "connection": "close"
   }

 # Error Response: 
   * Status: 400,
     Description: Bad request error, Invalid input

   * Status: 415,
     Description: Unsupported media type

   * Status: 500,
     Description: Internal server error







