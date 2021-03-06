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
                    Crop.findOne({$or:[{number:req.body.number},{email:req.body.email}]})
                    .then((result) => {
                        if(result){
                            return res.json({msg:'Please use different email or number'});
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
                    })
                    
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


exports.getApiTest = (req,res,next) => {
    return res.json({msg:'Its working if you get this on your browser'});
}

exports.getRecentFarmer = (req,res,next) => {
    Crop.find({status:2}).sort({irrigationTime:1})
    .then((result) => {
        if(result.length === 0){
            return res.json({msg:'Sorry no farmers as of now'});
        }
        else{
            return res.json({msg:'Recent one',farmerObject:result[0]})
        }
    })
    .catch((err) => {
        console.log(err);
    });
}


exports.updateRecentFarmer = (req,res,next) => {
    console.log('updating farmer');
    Crop.findOne({_id:req.params.id},{$set:{
        moistureContent:req.body.moisture,
        updatedAt:Date.now(),
        status:1,
        updatedBy:'API'
    }})
    .then((result) => {
        console.log(result);
        return res.json({msg:'Farmer moisture content updated'});
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.getAllfarmers = (req,res,next) => {
    Crop.find({})
    .then((result) => {
        return res.json({farmers:result});
    })
    .catch((err) => {
        console.log(err);
    });
}