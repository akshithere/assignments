const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin,Course} = require("../db/index")
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const response = await Admin.findOne({username:username,password:password});
   
    if(response!=null){
        res.status(403).send("admin already exists")
    }else{
        const r = await Admin.create({username: username, password: password})
    
        if(r){
            res.json({
                msg:"admin created successfully"
            })
        }
    }
    
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
   
    const courseID = req.body.courseID;
    const courseName = req.body.username;
    const courseDescription = req.body.courseDescription
    const coursePrice = req.body.coursePrice
    const courseImage = req.body.courseImage;
    const resp = await Course.findOne({courseID,courseName,courseDescription,coursePrice,courseImage})
    
    if(resp!=null){
        res.json({
            msg:"course already exists"
        })
    }else{
    const response = await Course.create({courseID: courseID,courseName: courseName, courseDescription: courseDescription,
    coursePrice: coursePrice, courseImage: courseImage})
    
    if(response){
        res.json({
            msg:"course created successfully"
        })
    }
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
  const resp = await Course.find({});
  res.status(200).json(resp)
  
});

module.exports = router;