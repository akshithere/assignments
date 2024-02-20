const mongoose = require('mongoose');
var validator = require('validator');

// Connect to MongoDB
mongoose.connect('mongodb+srv://narbhakshit:MJvuaJRCcNdVv3B3@akshit.a0ptcb0.mongodb.net/course_selling_app');
console.log("connected to the db")

// Define schemas
const AdminSchema = new mongoose.Schema({
    username:
    { type: String,
    required: true
    },
    password:
    { type: String,
    required: true
    }
    
});

const UserSchema = new mongoose.Schema({
    username:
    { type: String,
    required: true
    },
    password:
    { type: String,
    required: true
    },
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
}]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    courseID: Number,
    courseName: String,
    courseDescription: String,
    coursePrice: Number,
    courseImage: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}