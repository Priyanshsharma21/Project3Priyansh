import Collage from '../models/collageModel.js'
import Intern from '../models/internModel.js'
import {
    isValid,
    isValidReqBody,
    validString
} from '../utils/index.js'



export const postCollage = async (req, res) => {
    try {
        const {
            name,
            fullName,
            logoLink
        } = req.body

        if (!isValidReqBody(req.body)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid Request Parameters.',
            });
        }

        if (!name || !fullName || !logoLink) {
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

        if (!isValid(fullName)) {
            return res.status(400).json({
                status: false,
                message: 'Please enter a correct fullName isValid error',
            });
        }

        if (!validString(fullName)) {
            return res.status(400).json({
                status: false,
                message: 'Please enter a correct fullName validString error',
            });
        }

        const collage = await Collage.create(req.body)

        res.status(201).json({
            status: true,
            data: collage
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}





export const getCollage = async (req, res) => {
    try {
        const {
            collegeName
        } = req.query

        
        if (!collegeName) return res.status(400).json({
            status: false,
            message: "Please send collage name"
        })

        if (!isValid(collegeName)) {
            return res.status(400).json({
                status: false,
                message: 'Please enter a correct name isValid error',
            });
        }

        if (!validString(collegeName)) {
            return res.status(400).json({
                status: false,
                message: 'Please enter a correct name validString error',
            });
        }

        const query = {
            isDeleted: false
        }


        if (collegeName) {
            query.name = collegeName
        }


        const collage = await Collage.findOne(query)

        if (!collage) return res.status(404).json({
            status: false,
            message: "No Collage Found"
        })


        const internsFromCollage = await Intern.find({collegeId : collage._id})


        res.status(200).json({status : true, data : {
            name : collage.name,
            fullName : collage.fullName,
            logoLink : collage.logoLink,
            interns : internsFromCollage
        }})


    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}