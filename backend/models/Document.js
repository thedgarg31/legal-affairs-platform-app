const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Document title is required'],
    },
    description: String,
    fileUrl: {
        type: String,
        required: [true, 'File URL is required'],
    },
    fileType: {
        type: String,
        required: [true, 'File type is required'],
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    analysis: {
        summary: String,
        keyTerms: [String],
        riskFactors: [String],
        parties: [String],
        dates: [Date],
        highlightedSections: [{
            text: String,
            color: String, // 'red' or 'green'
            page: Number,
            position: Object,
        }],
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    tags: [String],
    isPublic: {
        type: Boolean,
        default: false,
    },
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
