const express = require('express');
const app = express();
// middelware: express.json()
app.use(express.json());

const fs = require('fs');
const port = 3000;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    console.log(req.params);
    
    //convert id to a number
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    //if(id >= tours.length)
    if(!tour){
        res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

const createTour = (req, res) => {
    // body is a property available in req request
    //console.log(req.body);
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newID}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    }); 
};

const updateTour = (req, res) => {
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Update tour here>'
        }
    });
};

const deleteTour = (req, res) => {
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
};

app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app
.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

app.listen(port, () => {
    console.log(`App running on port ${port}...`);  
});