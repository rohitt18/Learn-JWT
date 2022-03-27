// next - because remember in order to move on to the next middleware which ofc in our case
// is going to be a dashboard route we'll have to call the next

// So now i know that all the requests that are going to the dashboard are actually hitting this auth middleware first
// so now ofc we just need to add the functionality & we'll be in good shape

const jwt = require("jsonwebtoken");
const  CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;   // checking for the header
    if(!authHeader || !authHeader.startsWith('Bearer ')) {  // checking if it starts with bearer
        throw new CustomAPIError("No token provided", 401); // if not we throw our customAPIError thats y we import it already
    }

    const token = authHeader.split(" ")[1] // after spliting we get the token 
    //verify method
    // now ofc we have try-catch where we're invoking the verify method by passing the token that we're getting 
    // as well as the JWT_SECRET & if successful, then instead of sending res since we're working in the middleware
    // the logic will be 
    try {  

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const { id, username } = decoded  // object destructuring
        req.user = { id,username } // if successful, it will have some kind of value & in that case ill just setup req.user = to the object in which id & username is there
        next(); // v.v important (once i setup the user property with this object value now ofc i want to call next )
        // Since we wanna pass it to the next middleware, essentially we create a new object and setting it as a prop of req
    } catch (error) { // & if we're unsuccessful in verifying the token, then we send back our customAPIError 
        throw new CustomAPIError("Not authorized to access this route", 401); // if the token is expired
    }
    
    
}

module.exports = authenticationMiddleware;