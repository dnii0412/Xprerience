import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    // employees: {
    //     type: Number,
    //     required: true
    // },
    // location: {
    //     type: String,
    //     required: true
    // },

    industry: {
        type: String,
        required: true
    },
    website: {
        type: String,
    },
    logo: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

export const Company = mongoose.model('Company', companySchema);