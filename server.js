var azure = require("azure");
var app = require('express').createServer();
app.enable("jsonp callback");

var azureAccount = "two10ra";
var azureKey = "dmIMUY1mg/qPeOgGmCkO333L26cNcnUA1uMcSSOFMB3cB8LkdDkh02RaYTPLBL8qMqnqazqd6uMxI2bJJEnj0g==";


var blobService = azure.createBlobService(azureAccount, azureKey);

app.get('/login/:username', function(req, res){
	var url = blobService.generateSharedAccessSignature("foo", req.params.username, {
	AccessPolicy : {
		Permissions : "rwdl",
		Expiry : getDate()
	}});
	res.json({url: url.url()});

});

app.listen(process.env.port || 210);	

function getDate(){
	var date = new Date();
	date.setHours(date.getHours()+1);
	return date;
}
