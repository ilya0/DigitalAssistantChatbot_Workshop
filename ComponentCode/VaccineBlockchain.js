var request = require('request');
'use strict';
module.exports = {
  metadata: () => ({
    name: 'VaccineBlockchain',
    properties: {
      vaccineType: {required: true,type: 'string'},
      QuantityOfVaccine: {required: true, type: 'string'},
      NameOfHospital: {required: true, type: 'string'},
      RecalledStatus: {required: true, type: 'string'}
    },
    supportedActions: ['success', 'failure']
  }),
  invoke: (conversation, done) => {
      const {vaccineType} = conversation.properties();
      const {QuantityOfVaccine} = conversation.properties();
      const {NameOfHospital} = conversation.properties();
      const {RecalledStatus} = conversation.properties();

      console.log('inputString: ', inputString);
// not sure if below is what need instead of above
// conversation.logger().info("Input parameter values: vaccineType: " + vaccineType + ", NameOfHospital: "+NameOfHospital+", RecalledStatus: "+RecalledStatus);

var args = "["+vaccineType+","+QuantityOfVaccine+","+NameOfHOspital+","+RecalledStatus+"]"
        
      request('https://28aff79ced104f77b12adc70669d8efa.blockchain.ocp.oraclecloud.com/restproxy1',
        {method: 'POST',
        body: {
"channel":  "default",
"chaincode":  "obcs-marbles",
"method":  "initMarble",
"args":  ["marblename","red", 123456,"size"]
        }
        },
        headers: {
          Authorization: "Basic YXBpLnVzZXI6QXNkZmdoMTIzNDU2QA==",
          "Content-Type": "application/json",
         //"cache-control": "no-cache"
        },
        json: true,
        gzip: true
        }, (error, response, body) => {
          console.log('response: ', response.statusCode);
          console.log('body: ', body);

        //reply
        if (response.statusCode == 200 || response.statusCode == 201) {
          conversation.reply(returnString);
          conversation.keepTurn(true);
          conversation.transition('success');
          done();
        } else if (response.statusCode == 400) {
          //returnString below might need to be the inputString
          conversation.reply(returnString);
          conversation.keepTurn(true);
          conversation.transition('failure');
          done();
        } else if (response.statusCode == 401) {
          conversation.reply("Failed to process due to authorization");
          conversation.keepTurn(true);
          conversation.transition('failure');
          done();
        } else {
          conversation.reply("Failed to process due to unknown error");
          conversation.keepTurn(true);
          conversation.transition('failure');
          done();
        }
    });

  }
};


