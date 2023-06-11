import Intern from '../models/internModel.js'
import Collage from '../models/collageModel.js'
import {
    isValid,
    isValidReqBody,
    validString,
    isValidPhoneNumber,
    validateEmail
} from '../utils/index.js'


export const postIntern = async(req,res)=>{
    try {
        const  { name, mobile, email, collegeId} = req.body

        if (!isValidReqBody(req.body)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid Request Parameters.',
            });
        }


        if (!name || !mobile || !email ) {
            return res.status(400).json({
                status: false,
                message: 'Please enter mandatory fields.',
            });
        }

        if (!isValid(name)) {
            return res.status(400).json({
                status: false,
                message: 'Please enter a correct name isValid error',
            });
        }

        if (!validString(name)) {
            return res.status(400).json({
                status: false,
                message: 'Please enter a correct name validString error',
            });
        }

        if (!isValidPhoneNumber(mobile)) {
            return res.status(400).json({
                status: false,
                message: 'Please enter a correct Mobile Number isValidPhone Number error',
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                status: false,
                message: 'Please enter a correct email validEmail error',
            });
        }


        const isCollage = await Collage.findById(collegeId)


        if(!isCollage) return res.status(404).json({status : false, message : "Collage Not Found"})


        const intern = await Intern.create(req.body)

        res.status(201).json({status : true, data : intern})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: false, message: error.message })
    }
}