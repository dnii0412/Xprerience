import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
   try{
    const { fullname, email, password, role } = req.body;
    if(!fullname || !email || !password || !role){
        return res.status(400).json({
            message: 'All fields are required.', 
            success: false 
        });
    }
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            message: 'Email already exists.',
            success: false
        });
    };
        return res.status(201).json({
            message: 'Account registered successfully',
            success: true
        });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        fullname,
        email,
        password: hashedPassword,
        role
    })
   }catch(error){
        console.log(error)
   }

}
// login middleware
export const Login = async (req, res) => {
    try{
        const {  email, password, role } = req.body;
        if( !email || !password || !role  ){
            return res.response(400).json({
                message: 'All fields are required.',
                success: false
            })
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                message: 'User not found.',
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(200).json({
                message: 'Password mismatch',
                success: false
            })
        };
        // check role is correct or not
        if(role !== user.role ){
            return res.status(400).json({
                message: 'Account does not exists with current role',
                success: false
            })
        };
        const tokenData = {
            userId: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});l
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000 , httpsOnly: true, sameSite: 'strict'}).json({
            message: `Welcome back ${user.fullname}`,
            success: true
        });

    }catch(error){
        console.log(error);
    }
}
export const logOut = async () => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
} 
export const updteProfile = async () => {
    const file = req.file;
    try {
    const {fullname, email, phoneNumber, bio, skills, } = req.body;
    if(!fullname|| !email|| !phoneNumber|| !bio || !skills){
        return res.status(400).json({
            message: 'All fields are required.',
            success: false
        })
        const skillsArray = skills.split(",");
        const userId = user.id;
        let user = await User.findById(userId);
    };
    if(!user){
        return res.status(400).json({
            message: 'User not found.',
            success: false
        })
    }
    // updating profile 
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;
 
    // resume comes later 
    await user.save();
    
    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile 
    }
    return res.status(200).json({
        message: 'Profile saved successfully',
        user,
        success: true
    });
    
    } catch (error) {
        console.log(error);
    }
}