const Joi = require('joi');

class requestComment{

    static validateInput(req,res){
        
        const schema = Joi.object({

            content: Joi.string().required(),
            
        }).options({ allowUnknown: true });

        console.log(req);
        const validationResult = schema.validate(req.body, { abortEarly: false })
        
        return validationResult;

    }
}

module.exports = requestComment;