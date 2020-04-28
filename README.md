..................Azure Form Recognition using Node JS and JWT.......................

The form recognition model implemented here uses prebuilt models of data provide the Microsoft Azure ie. images.

Five prebuilt model images given my Microsoft Azure:
1. https://azurecomcdn.azureedge.net/cvt-416a39e28b968151822725506b11a1de2478a8bd7207d521eb3256b1ef8cb427/images/page/services/cognitive-services/form-recognizer/demo-sample-thumbnails/form-recognizer-demo-sample1.png
2. https://azurecomcdn.azureedge.net/cvt-416a39e28b968151822725506b11a1de2478a8bd7207d521eb3256b1ef8cb427/images/page/services/cognitive-services/form-recognizer/demo-sample-thumbnails/form-recognizer-demo-sample2.png
3. https://azurecomcdn.azureedge.net/cvt-416a39e28b968151822725506b11a1de2478a8bd7207d521eb3256b1ef8cb427/images/page/services/cognitive-services/form-recognizer/demo-sample-thumbnails/form-recognizer-demo-sample3.png
4. https://azurecomcdn.azureedge.net/cvt-416a39e28b968151822725506b11a1de2478a8bd7207d521eb3256b1ef8cb427/images/page/services/cognitive-services/form-recognizer/demo-sample-thumbnails/form-recognizer-demo-sample4.png
5. https://azurecomcdn.azureedge.net/cvt-416a39e28b968151822725506b11a1de2478a8bd7207d521eb3256b1ef8cb427/images/page/services/cognitive-services/form-recognizer/demo-sample-thumbnails/form-recognizer-demo-sample5.png

Please use there urls to test the API.

Using without JWT:

ENDPOINT : http://68.183.144.13:5000/formRecognizer

BODY PARAMETERS
Name: imageUrl
Description: url of the image that needs to be analyzed through form recognizer.

Testing from POSTMAN:

Enter the above URL and in the request body, select type as raw and from the dropdown select JSON.
Pass the above required params in the body in JSON format.

example: {
    "imageUrl" = "https://azurecomcdn.azureedge.net/cvt-416a39e28b968151822725506b11a1de2478a8bd7207d521eb3256b1ef8cb427/images/page/services/cognitive-services/form-recognizer/demo-sample-thumbnails/form-recognizer-demo-sample3.png"
} 

RESPONSE: JSON response from the form recognizer API.

Using with JWT:

1).First, you have to comment out the commented code in analyzieReceipt.js file.
2).First is to authenticate and generate token

    ENDPOINT: http://68.183.144.13:5000/signIn/formRecognizer

    BODY PARAMETERS
    Name: username, Description : username of the user, Value: "akhil" (hardcoded for demo purpose)
    Name: password, Description : password of the user, Value : "enter"(hardcoded for demo purpose)

    Example: 
    {
        "username" = "akhil",
        "password" = "enter"
    }

    Response :  
    "accesstoken": "sampletoken.................."

3). Second is to verify the user and use the form recognizer

    ENDPOINT: http://68.183.144.13:5000/user/formRecognizer

    BODY PARAMETERS
    Name: imageUrl,Description: url of the image that needs to be analyzed through form recognizer.

    example: {
    "imageUrl" = "https://azurecomcdn.azureedge.net/cvt-416a39e28b968151822725506b11a1de2478a8bd7207d521eb3256b1ef8cb427/images/page/services/cognitive-services/form-recognizer/demo-sample-thumbnails/form-recognizer-demo-sample3.png"
    }

    HEADERS: 

    key: "Authorization", Value: access token from the first step appender after a keyword with space.(token "accesstoken")

    RESPONSE: JSON response from the form recognizer API.






