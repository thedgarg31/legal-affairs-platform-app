const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required'],
    },
    experience: {
        type: Number,
        required: [true, 'Years of experience is required'],
    },
    location: {
        address: String,
        city: String,
        state: String,
        country: String,
        coordinates: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
    },
    contact: {
        phone: String,
        email: String,
        website: String,
    },
    availability: {
        days: [String],
        hours: String,
    },
    languages: [String],
    education: [{
        degree: String,
        institution: String,
        year: Number,
    }],
    barMembership: {
        barCouncil: String,
        registrationNumber: String,
        registrationYear: Number,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    profileImage: String,
    bio: String,
    isVerified: {
        type: Boolean,
        default: false,
    },
});

// Index for geospatial queries
lawyerSchema.index({ 'location.coordinates': '2dsphere' });

const Lawyer = mongoose.model('Lawyer', lawyerSchema);
module.exports = Lawyer;