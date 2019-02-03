var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var ec2 = new AWS.EC2();


var params = {
    
    ImageId: "ami-035be7bafff33b6b6", 
    InstanceType: "t2.micro",  
    MaxCount: 1, 
    MinCount: 1,
    KeyName: "devops-test-hw",
     SecurityGroupIds: [
        "sg-7d52bc0a"
     ],  
    TagSpecifications: [
       {
      ResourceType: "instance", 
      Tags: [
         {
        Key: "devops", 
        Value: "test"
       }
      ]
     }
    ]
   };
   ec2.runInstances(params, function(err, data) {
     if (err) console.log(err, err.stack); 
        console.log("Instance created with Instance ID: ",data.Instances[0].InstanceId);   
        var paramsPassed = {
            InstanceIds: [
                data.Instances[0].InstanceId
            ]
        };
        setTimeout(function() {
        ec2.describeInstances(paramsPassed, function(err, data) {
            if (err) console.log(err, err.stack);
            else     console.log("Use the following command to test connectivity \nping ",data.Reservations[0].Instances[0].PublicIpAddress);
          });
        }, 20000);
     
   });

