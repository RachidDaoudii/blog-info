const Joi = require('joi');
const articlesController = require('../controllers/articles.Controller');

class requestArticle{

    static validateInput(req,res){
        
        const schema = Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            image: Joi.string(),
        }).options({ allowUnknown: true });

        console.log(req);
        const validationResult = schema.validate(req.body, { abortEarly: false })
        
        return validationResult;

    }
}

module.exports = requestArticle;