import mongoose from "mongoose";
import validator from "validator";



const {
    Schema,
    model
} = mongoose

const internSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [{
            validator: validator.isEmail,
            message: 'Please enter email in correct format',
            isAsync: true,
        }]
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
              const mobileNumber = value.toString();
              // Regular expression pattern for a valid mobile number
              const mobilePattern = /^\d{10}$/;
              return mobilePattern.test(mobileNumber);
            },
            message: 'Please enter a valid mobile number',
          },
    },
    collegeId: {
        type: Schema.Types.ObjectId,
        ref: 'Collage',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},{timestamps : true})



const Intern = model('Intern', internSchema)


export default Intern