const { Router } = require("express");
const router = Router();
const {User} = require('../db/index')
const {Course} = require('../db/index')
const userMiddleware = require("../middleware/user");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    const verify = await User.findOne({username,password})
    if(verify!=null){
        res.send("user already exists");
   }else{
    const resp = await User.create({username: username,password: password});
    res.status(200).json(resp)
   }
});

router.get('/courses', userMiddleware, async(req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({})
    res.status(200).json({
        courses
    })
});

router.post('/courses/:courseID', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username= req.headers.username;
    const password= req.headers.password;
    const courseID= req.params.courseID
   const updation = await User.updateOne({username,password},{
        $push: {
            purchasedCourses : new mongoose.Types.ObjectId(courseID)
        }
    })
    console.log(updation)
    res.status(200).send("Purchased Successfully")


    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username= req.headers.username;
    const password= req.headers.password;
    const user = await User.findOne({username,password})
    console.log(user.purchasedCourses)
    const courses = await Course.findOne({
        _id:{
            "$in":user.purchasedCourses
        }
    })
    res.status(200).json({
        purchasedCourses: courses
    })
});

module.exports = router