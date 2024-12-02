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
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            message: 'Email already exists.',
            success: false
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        fullname,
        email,
        password: hashedPassword,
        role
    })
   }catch(error){
    
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
        }
    }catch(error){

    }
}