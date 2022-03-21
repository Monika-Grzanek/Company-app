const express = require('express');
const router = express.Router();
//const ObjectId = require('mongodb').ObjectId;
const EmployeeController = require('./../controllers/employees.controller.js');


router.get('/employees', EmployeeController.getAll);

router.get('/employees/random', EmployeeController.getRandom);

router.get('/employees/:id', EmployeeController.getById);

router.post('/employees', EmployeeController.postItem);

router.put('/employees/:id', EmployeeController.putItem);

router.delete('/employees/:id', EmployeeController.deleteItem);

module.exports = router;
