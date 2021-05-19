const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        /*results: tours.length,
        data: {
            tours
        }
        */
    });
};

exports.getTour = (req, res) => {
    console.log(req.params);
    
    //convert id to a number
    const id = req.params.id * 1;
    /*
    const tour = tours.find(el => el.id === id);
    
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
    */
};

exports.createTour = async (req, res) => {
    try{
        const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'Invalid data sent'
        })
    }
    
};

exports.updateTour = (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Update tour here>'
        }
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
};