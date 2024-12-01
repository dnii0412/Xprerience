import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['user', 'company' ,'admin'],
        default: 'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String},
        resumeOriginalName: {type: String},
        company: {type: mongoose.Schema.Types.ObjectId , ref: company},
        profilePhoto: {
            type: String,
            default: ''
        }
    }
}, {timeStamps: true});
export const User = mongoose.model('User', userSchema);