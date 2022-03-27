// * A big picture of what we're about to do in JWT *
// check username, password in post(login) request [its going to be available in req.body]
// if both of them exist, create a new JWT
// send back to front-end since front-end needs to access it in-order to send another req (get req)
// where essentially we display the secret info
const jwt = require("jsonwebtoken");
const  CustomAPIError = require("../errors/custom-error");

// And on our end we want to setup authentication so only the request with JWT can access the dashboard
// 

const login = async (req, res) => {
    const { username, password } = req.body;
    // if these 2 values are not provided we have these 3 options - 
    // mongoose validation
    // Joi package
    // Check in controller
    if(!username || !password){
        ;
        throw new CustomAPIError("Please provide email and password", 400);
    }

    // just for demo, normally provided by DB!!
    const id = new Date().getDate()    // to create a dummy id from scratch
    // JWT
    // sign method
    // try to keep payload small, better experiance for user 
    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg: 'user created', token}, );
}; 

const dashboard = async (req, res) => {
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
        res
        .status(200) 
        .json({
         msg: `Hello ${req.user.username}`,
         secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
    

    // So all the following requests are going to be successful as long as we provide a token & since token
    // is in the local storage we can always access it when we make it & then we're good to go  
    // in a more realistic application there are going to be multiple routes that use this functionality & 
    // what are we going to do? Are we really going to copy & paste for every route that needs it or
    // it just makes more sense to take all of this code stick it in the middleware & then just choose which routes
    // need to be authenticated (by setting up our own middleware)
  
};

module.exports = { login, dashboard };
