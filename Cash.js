var mongoose = require('mongoose');
var Schema =mongoose.Schema;
mongoose.connect('mongodb://admin:admin1@kahana.mongohq.com:10035/TrialDB');
var cashSchema = Schema({
  	date    		: { type : Date },
  	amount  		: { type : Number},
  	details			: { type : String},
  	billNumber		: { type : Number},
  	remainingAmount : { type : Number}, 
  	//users		  	: [{type: Schema.Types.ObjectId, ref: 'user' }],
	});
var Cash = mongoose.model('Cash', cashSchema);
module.exports = Cash;