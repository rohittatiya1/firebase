var express = require('express');
var every = require('every-moment');
var router = express.Router();
//var connection  = require('express-myconnection');

var  mysql = require('mysql');

   var  connectionObj=mysql.createConnection({
       host     : 'devbms.cnwx0gkwkd5w.ap-southeast-1.rds.amazonaws.com',
        user     : 'devbms_userInst',
        password : 'U8X#pAwWR!M8',
        port     : '3306',
        database : 'g2gmobile_db',
        multipleStatements: true,
        debug    : false //set true if you wanna see debug logger
   });
 
   connectionObj.connect();     
   

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

var timer = every(60, 'second', function() {
    console.log(this.duration);
});



/*------------------------------------CRUD OPERATION ON Sport TABLE---------------------------------------------------------------------------*/

/*RESTful API Router*/
var sport = router.route('/sport');

//middleware api 
sport.all(function(req,res,next){
    
    //Enable cros on express
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
   // Do stuffs here when a call to api route invoked
    console.log(req.method,req.url);
    next();
});

sport.get(function(req,res,next){
 //http://localhost:3030/api/user
req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('CALL GetSportDetails()',function(err,sport_D){

                
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(sport_D);
            res.send(sport_D);
           /* res.send(data);
            res.render('user',{title:"RESTful Crud Example",data:rows});*/

         });

    });
});

/*------------------------------------CRUD OPERATION ON EVENT TABLE---------------------------------------------------------------------------*/

var event = router.route('/event');
//middleware api 
event.all(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
   // Do stuffs here when a call to api route invoked
    console.log(req.method,req.url);
    next();
});


event.get(function(req,res,next){
 //http://localhost:3030/api/user
req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('CALL GetEventDetails()',function(err,event_D){

                
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(event_D);
            res.send(event_D);
           /* res.send(data);
            res.render('user',{title:"RESTful Crud Example",data:rows});*/

         });

    });
});

/*------------------------------------CRUD OPERATION ON STAND TABLE---------------------------------------------------------------------------*/

var stand = router.route('/stand/:eventId');

//middleware api 
stand.all(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
   // Do stuffs here when a call to api route invoked
    console.log(req.method,req.url);
    next();
});


stand.get(function(req,res,next){
 //http://localhost:3030/api/user
    
     var eventid=req.params.eventId;
req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('CALL GetStandDetails(?)',[eventid],function(err,stand_D){

                
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(stand_D);
            res.send(stand_D);
           /* res.send(data);
            res.render('user',{title:"RESTful Crud Example",data:rows});*/

         });

    });
});

/*------------------------------------Get Future Event-------------------------------------------------------------------------------*/
// 2014-11-30 10:20:00
//var EventTime = new Date().getDate;
var futureEvent = router.route('/futureEvent');
//middleware api 

futureEvent.all(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
   // Do stuffs here when a call to api route invoked
    console.log(req.method,req.url);
    next();
});





futureEvent.get(function(req,res,next){
 //http://localhost:3030/api/user
    //var EventTime=req.body.EventTime;
    
    
    
req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");
       
        var query = conn.query('CALL GetFutureEventDetails()',function(err,Fevent_D){

                
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(Fevent_D);
           //  console.log(timeInMss);
            res.send(Fevent_D);
            
           /* res.send(data);
            res.render('user',{title:"RESTful Crud Example",data:rows});*/

         });

    });
});



/*------------------------------------Get Specific Sport-------------------------------------------------------------------------------*/

var SingleSport = router.route('/SingleSport/:sportId');

//middleware api 

SingleSport.all(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
   // Do stuffs here when a call to api route invoked
    console.log(req.params)
    console.log(req.method,req.url);
    next();
});

SingleSport.get(function(req,res,next){
 
   var sportId=req.params.sportId;
  
req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");
       
        var query = conn.query('CALL GetSpecificSport(?)',[sportId],function(err,sportSingle_D){

                
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(sportSingle_D);
           //  console.log(timeInMss);
            res.send(sportSingle_D);
            
           /* res.send(data);
            res.render('user',{title:"RESTful Crud Example",data:rows});*/

         });

    });
});

/*------------------------------------Get Future Event-------------------------------------------------------------------------------*/
// 2014-11-30 10:20:00
//var EventTime = new Date().getDate;
var futureEvent = router.route('/futureEvent');
//middleware api 

futureEvent.all(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
   // Do stuffs here when a call to api route invoked
    console.log(req.method,req.url);
    next();
});





futureEvent.get(function(req,res,next){
 //http://localhost:3030/api/user
    //var EventTime=req.body.EventTime;
req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");
       
        var query = conn.query('CALL GetFutureEventDetails()',function(err,Fevent_D){

                
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(Fevent_D);
           //  console.log(timeInMss);
            res.send(Fevent_D);
            
           /* res.send(data);
            res.render('user',{title:"RESTful Crud Example",data:rows});*/

         });

    });
});



/*------------------------------------Get SeatQuantity for Event-------------------------------------------------------------------------------*/

var SingleSport = router.route('/SeatQuantity/:eventId');

//middleware api 

SingleSport.all(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
   // Do stuffs here when a call to api route invoked
    console.log(req.params)
    console.log(req.method,req.url);
    next();
});

//var eventId=685;





SingleSport.get(function(req,res,next){
 
   eventId=req.params.eventId;
  
req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");
       
        var query = conn.query('CALL getCount(?)',[eventId],function(err,seatCountD){

                
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(seatCountD);
           //  console.log(timeInMss);
            res.send(seatCountD);
            
           

         });

    });
});

/*
function getData()
{
    console.log("Hello");
}

setInterval(getData,1000);
*/
var count;
function dataCount()
{
    connectionObj.query('CALL getCount(?)',[685], function(err, result) {
  if (!err)
      {count=result;
    console.log('The solution is: ', count); 
      }
    else
      {
          console.log('Error while performing Query.');
      }
    
});

}
//setInterval(dataCount,1000);

/*----------------------------------------------- Services for adding BuyNow data to the database ---------------------------------------------------- */

var BuyNow = router.route('/BuyNow');


//middleware api 

BuyNow.all(function(req,res,next){
       // Do stuffs here when a call to api route invoked
    console.log(req.body)
    console.log(req.method,req.url);
    next();
});

BuyNow.post(function(req,res,next){
 
    /*var data ={
        password:req.body.pass,
    }
    res.send(data.password);
    */
    var buyData=
        {
            eventID:req.body.eventID,
            tokend:req.body.tokend,
            quantity:req.body.quantity,
           // status:req.body.status,
            attributeId:req.body.attributeId
        }
    
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");
       //[buyData.eventID,buyData.tokend,buyData.quantity,buyData.status,buyData.attributeId]
        
        var query = conn.query('CALL addToCartDetails(?,?,?,?,@cartId,@stockstatusId); SELECT @cartId AS cartId, @stockstatusId AS stockstatusId',[buyData.eventID,buyData.tokend,buyData.quantity,buyData.attributeId],function(err,buynowD){

                
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(buynowD);
           //  console.log(timeInMss);
            res.send(buynowD);
            
           /* res.send(data);
            res.render('user',{title:"RESTful Crud Example",data:rows});*/

         });

    });


});


/*-------------------------------------------- Services for addcustomerDetails data to the database ------------------------------------------- */

var customerDetails = router.route('/customerDetails');


//middleware api 

customerDetails.all(function(req,res,next){
  
   // Do stuffs here when a call to api route invoked
    console.log(req.body)
    console.log(req.method,req.url);
    next();
});

customerDetails.post(function(req,res,next){
 

    
    var customer=
        {
            vFirstName:req.body.FirstName,
            vEmail:req.body.Email,
            vTelephone:req.body.Phone,
            vAddress:req.body.Address,
            vPostcode:req.body.Postcode,
          
        }
   // [customer.vFirstName,customer.vEmail,customer.vTelephone,customer.vAddress,customer.vPostcode]
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");
       
        var query = conn.query('CALL addCustomerDetail(?,?,?,?,?,@customerId,@addressId); SELECT @customerId AS customerId,@addressId AS addressId',[customer.vFirstName,customer.vEmail,customer.vTelephone,customer.vAddress,customer.vPostcode],function(err,customerD){

                
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(customerD);
         
          //  console.log(query);
           //  console.log(timeInMss);
            res.send(customerD);
            
          

         });

    });


});

/*-------------------------------------------- ended Services for addcustomerDetails data to the database ------------------------------------ */




/*-------------------------------------------- Services for addOrderBeforeDetails data to the database ------------------------------------------- */


var orderBefore = router.route('/orderBefore');


//middleware api 

orderBefore.all(function(req,res,next){
   
   // Do stuffs here when a call to api route invoked
    console.log(req.body)
    console.log(req.method,req.url);
    next();
});

orderBefore.post(function(req,res,next){


    var OrderBefore=
        {
            //paymentFirstname:req.body.paymentFirstname,
            //paymentLastname:req.body.paymentLastname,
            //paymentAddress:req.body.paymentAddress,
            //paymentCity:req.body.paymentCity,
            //paymentPostcode:req.body.paymentPostcode,
            paymentcode:req.body.paymentcode,
            vcomment:req.body.vcomment,
            vTotal:req.body.vTotal,
            servicecharge:req.body.servicecharge,
            taxlabel:req.body.taxlabel,
            taxvalue:req.body.taxvalue,
            vQuantity:req.body.vQuantity,
            vcommisssion:req.body.vcommisssion,
            deliveryCharge:req.body.deliveryCharge,
            paymentCharge:req.body.paymentCharge,
            paymentTransactionId:req.body.paymentTransactionId,
            vstatus:req.body.vstatus,
            payResponse:req.body.payResponse,
            customerId:req.body.customerId,
            cartId:req.body.cartId,
            eventName:req.body.eventName,
            vPrice:req.body.vPrice,
            vServicetax:req.body.vServicetax,
            attributeId:req.body.attributeId,
            eventId:req.body.eventId,
            addressId:req.body.addressId
        };
   
                                                                                                               /* OrderBefore.paymentFirstname,
                                                                                                                OrderBefore.paymentLastname,
                                                                                                                OrderBefore.paymentAddress,
                                                                                                                OrderBefore.paymentCity,
                                                                                                                OrderBefore.paymentPostcode,
    */
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");
       
       var query =  conn.query('CALL addOrderBeforePayment(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@orderId); SELECT @orderId as orderId',[
                                                                                                                OrderBefore.paymentcode,
                                                                                                                OrderBefore.vcomment,
                                                                                                                OrderBefore.vTotal,
                                                                                                                OrderBefore.servicecharge,
                                                                                                                OrderBefore.taxlabel,
                                                                                                                OrderBefore.taxvalue,
                                                                                                                OrderBefore.vQuantity,
                                                                                                                OrderBefore.vcommisssion,
                                                                                                                OrderBefore.deliveryCharge,
                                                                                                                OrderBefore.paymentCharge,
                                                                                                                OrderBefore.paymentTransactionId,
                                                                                                                OrderBefore.vstatus,
                                                                                                                OrderBefore.payResponse,
                                                                                                                OrderBefore.customerId,
                                                                                                                OrderBefore.cartId,
                                                                                                                OrderBefore.eventName,
                                                                                                                OrderBefore.vPrice,
                                                                                                                OrderBefore.vServicetax,
                                                                                                                OrderBefore.attributeId,
                                                                                                                OrderBefore.eventId,
       OrderBefore.addressId], function(err,OrderBeforeD){

                  
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(OrderBeforeD);
           //  console.log(timeInMss);
            res.send(OrderBeforeD);
          

         });

    });


});

/*-------------------------------------------- Services for addAfterOrderDetails data to the database ------------------------------------------- */


var orderAfter = router.route('/orderAfter');


//middleware api 

orderAfter.all(function(req,res,next){
   
   // Do stuffs here when a call to api route invoked
    console.log(req.body)
    console.log(req.method,req.url);
    next();
});

orderAfter.post(function(req,res,next){


    var OrderAfter=
        {
            cartId:req.body.cartId,
            orderId:req.body.orderId,
            eventId:req.body.eventId,
            stockstatusId:req.body.stockstatusId
          
        };
   
  
    
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");
       
       var query =  conn.query('CALL addOrderAfterPayment(?,?,?,?)',[OrderAfter.cartId,OrderAfter.orderId,OrderAfter.eventId,OrderAfter.stockstatusId], function(err,OrderAfterD){

                  
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(OrderAfterD);
           //  console.log(timeInMss);
            res.send(OrderAfterD);
          

         });

    });


});


 //console.log('The solution is: ', EmailTemplate); 


/*----------------------------------------------------Node Mailer----------------------------------------------------------------------------*/

var nodemailer = require("nodemailer");

//var smtpTransport = require('nodemailer-smtp-transport');

// create reusable transport method (opens pool of SMTP connections)

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "pujacompu@gmail.com",
        pass: "escort@91"
    }
});

/*--------------------------------------------------------GEt Email Template Data------------------------------------------------------------*/
var EmailTemplate = [];
var mailSubject;
var tempBody;
var mailOptions={};


var SendMailPost = router.route('/SendMailPost');


//middleware api 

SendMailPost.all(function(req,res,next){
   
   // Do stuffs here when a call to api route invoked
    console.log(req.body)
    console.log(req.method,req.url);
    next();
});

SendMailPost.post(function(req,res,next){
  
    var data=
        {
            To:req.body.To,
            customerName:req.body.customerName,
            orderId:req.body.orderId,
            orderDate:req.body.orderDate,
            orderStatus:req.body.orderStatus
        
        }

connectionObj.query('CALL getEmailTemplate()',function(err, result) {
    
  if (!err)
      {
         // EmailTemplate={result};
        
         EmailTemplate=JSON.stringify(result[0]);
          
        var jsonObjEmail=JSON.parse(EmailTemplate);
          
            console.log('The solution is: ',jsonObjEmail); 
            console.log('----------------------------- Template_name :',jsonObjEmail[0].template_name);
          
            //mailOptions["subject"]=jsonObjEmail[0].mail_subject;
            //mailOptions["text"]=jsonObjEmail[0].template_body;
          
            mailSubject=jsonObjEmail[0].mail_subject;
            //tempBody=jsonObjEmail[0].template_body;
          
            passBodyData(mailSubject,data.To,data.customerName,data.orderId,data.orderDate,data.orderStatus);
          
          
         // console.log('----------------------------- Template_sub :',mailSubject);
          console.log(data);
          
      }
    else
      {
          console.log('Error while performing Query.');
      }
    
});
    res.send("Your Mail is sent successfully");
    
});

// send mail with defined transport object
function passBodyData(sub,to,custname,orderId,orderDate,orderStatus)
{
    // setup e-mail data with unicode symbols
   
    
var mailOptions = 
    {
    to: to, // list of receivers
    subject:sub, // Subject line
    //text: name orderId orderDate , // plaintext body
    html:"<div style='border: 4px solid #B8646E;width:600px;padding:10px'>This is a Test Mail for Your Order(From BMS TEAM compu..)<div style='margin-top:5px;'>Dear "+custname+",</div><div style='margin-top:5px;'>Thank you for booking tickets with us. Please check the order details.&nbsp;</div><table><thead><tr><th colspan='3' style='text-align:left'><strong>Order Details</strong></th></tr></thead><tbody><tr><td>Order ID</td><td>&nbsp;:&nbsp;</td><td>"+orderId+"</td></tr><tr><td>Order Date</td><td>&nbsp;:&nbsp;</td><td>"+orderDate+"</td></tr><tr><td>Order Status</td><td>&nbsp;:&nbsp;</td><td>"+orderStatus+"</td></tr></tbody></table>&nbsp;</div>"
    }

smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});


    
}

/*--------------------------------------------------------End Email Template Data------------------------------------------------------------*/




var firebase=require('firebase');

function sportdetail()
{
	 connectionObj.query('CALL GetSportDetails()',function(error,result){
		if(!error)
		{
		     var sportdata=JSON.stringify(result);
			var spdata=JSON.parse(sportdata);
			
			//var res=spdata.filter(sportdetail);
			
			var ref=new firebase('https://syncnode.firebaseio.com/sport');
			//ref.set({db:"1"});
			ref.update(spdata[0]);	
			console.log('result is',spdata[0]);
		}
		 else
		{
			console.log('not running');
		}
	 });					 
}
setInterval(sportdetail,1000);  

sportdetail();












//this line is the Master
module.exports.router = router;
module.exports.route = sport;
module.exports.route = event;
module.exports.route =stand;
module.exports.route =futureEvent;
module.exports.route =SingleSport;
module.exports.route =BuyNow;
module.exports.route =customerDetails;
module.exports.route =orderBefore;
module.exports.route =orderAfter;