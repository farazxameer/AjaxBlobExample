var azure = require("azure");
var app = require('express').createServer();
app.enable("jsonp callback");

var azureAccount = "two10ra";
var azureKey = "dmIMUY1mg/qPeOgGmCkO333L26cNcnUA1uMcSSOFMB3cB8LkdDkh02RaYTPLBL8qMqnqazqd6uMxI2bJJEnj0g==";
var containerName = "container"
var sessionLifetime = 1; // hours

var blobService = azure.createBlobService(azureAccount, azureKey);
blobService.createContainerIfNotExists(containerName, function(error){
	if (error){
		console.error(error);
	}
});

app.get('/login/:username', function(req, res){
	var url = blobService.generateSharedAccessSignature(containerName, req.params.username, {
	AccessPolicy : {
		Permissions : "rwdl",
		Expiry : getDate()
	}});
	res.json({url: url.url()});
});

app.listen(process.env.port || 210);	

function getDate(){
	var date = new Date();
	date.setHours((date).getHours() + sessionLifetime);
	return date;
}
