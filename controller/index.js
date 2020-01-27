const Crop = require('../model/crop');
const cropSchema = require('../validations/crop');

exports.landing = (req,res,next)  => {
    console.log('anything');
    return res.render('index', { title: 'Smart irrigation' });
}

exports.getForm = (req,res,next) => {
    console.log('sfsdfsdfsd');
    return res.render('form',{
        title:'Register'
    });
}

exports.postForm = (req,res,next) => {
    console.log(req.body);
    const {error} = cropSchema.validate({
        name:req.body.name,    
        number:req.body.number,
        email:req.body.email,
        cropType:req.body.crop,
        cropArea:req.body.area,
        irrigationTime:req.body.time
    })

    if(error){
        return res.json({responseCode:203,msg:error.toString().split(":")[1]});
    }
    else if(new Date(req.body.time).getTime() < Date.now() || new Date(req.body.time).getTime() -Date.now()  < 1800000){
        return res.json({msg:'Choose time in future(atleast 30 min ahead of current time)'});
    }

   else{
    Crop.findOne({irrigationTime: new Date(req.body.time).getTime()})
    .then((cropTime) => {
        if(cropTime){
            return res.json({msg:'Not at this time'});
        }
        else{
            Crop.findOne({$and:[{number:req.body.number},{name:req.body.name},{email:req.body.email}]})
            .then((cropResult) => {
                if(cropResult){
                    Crop.updateOne({_id:cropResult._id},{$set:{
                            irrigationTime:req.body.time
                        }})
                        .then((updated) => {
                            return res.json({msg:'Updated'});
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                else{
                    Crop.create({
                        name:req.body.name,
                        email:req.body.email,
                        number:req.body.number,
                        status:2,
                        cropType:req.body.crop,
                        cropArea:req.body.area,
                        irrigationTime:req.body.time,
                        createdAt:Date.now(),
                        updatedAt:Date.now(),
                        updatedBy:'Web App'
                    })
                    .then((result) => {
                        console.log(result);
                        res.send(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }


    })
    .catch((err) => {
        console.log(err);
    });
   }


}
