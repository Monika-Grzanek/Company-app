const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);

router.get('/departments/random', DepartmentController.getRandom);

router.get('/departments/:id', DepartmentController.getById);

router.post('/departments', DepartmentController.postItem);

router.put('/departments/:id', DepartmentController.putItem);

router.delete('/departments/:id', DepartmentController.deleteItem);

module.exports = router;
