const expect = require('chai').expect;
const mongoose = require('mongoose');
const Employee = require('./../employee.model.js');

describe('Employee', () => {
    before(async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.error(err);
        }
    });

    describe('Reading data', () => {
        before(async () => {
            const testEmpOne = new Employee({ firstName: 'Name1', lastName: 'Surname1', department: 'Dep1' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'Name2', lastName: 'Surname2', department: 'Dep2' });
            await testEmpTwo.save();
        });

        it('should return all the data with find method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });
    
        it('should return proper document by various params with findOne method', async () => {
            const employee = await Employee.findOne({ firstName: 'Name1', lastName: 'Surname1', department: 'Dep1' });
            expect(employee).to.not.be.null;
            /*const exceptedFirstName = 'Name1';
            const exceptedLastName = 'Surname1';
            const expectedDepartment = 'Dep1';
            expect(employee.firstName).to.be.equal(exceptedFirstName);
            expect(employee.lastName).to.be.equal(exceptedLastName);
            expect(employee.department).to.be.equal(expectedDepartment);*/
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Creating data', () => {
        it('should insert new document with insertOne method', async () => {
            const employee = await new Employee({ firstName: 'Name3', lastName: 'Surname3', department: 'Dep3' });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Updating data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Name1', lastName: 'Surname1', department: 'Dep1' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'Name2', lastName: 'Surname2', department: 'Dep2' });
            await testEmpTwo.save();
        });

        it('should properly update one document with updateOne method', async () => {
            await Employee.updateOne({ firstName: 'Name1', lastName: 'Surname1', department: 'Dep1' }, {$set: {firstName: 'Name3', lastName: 'Surname3', department: 'Dep3'}});
            const updatedEmployee = await Employee.findOne({ firstName: 'Name3', lastName: 'Surname3', department: 'Dep3'});
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with save method', async () => {
            const employee = await Employee.findOne({ firstName: 'Name1', lastName: 'Surname1', department: 'Dep1' });
            employee.firstName = 'Name3';
            employee.lastName = 'Surname3';
            employee.department = 'Dep3';
            await employee.save();
            const updatedEmployee = await Employee.findOne({ firstName: 'Name3', lastName: 'Surname3', department: 'Dep3' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update multiple documents with updateMany method', async () => {
            await Employee.updateMany({}, {$set: {firstName: 'Updated!', lastName:'Updated!', department: 'Updated!'}});
            const updatedEmployees = await Employee.find({ firstName: 'Updated!', lastName:'Updated!', department: 'Updated!' });
            expect(updatedEmployees.length).to.be.equal(2);
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });
    });
    describe('Removing data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Name1', lastName: 'Surname1', department: 'Dep1' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'Name2', lastName: 'Surname2', department: 'Dep2' });
            await testEmpTwo.save();
        });

        it('should properly remove one document with deleteOne method', async () => {
            await Employee.deleteOne({ firstName: 'Name1', lastName: 'Surname1', department: 'Dep1' });
            const deletedEmployee = await Employee.findOne({ firstName: 'Name1', lastName: 'Surname1', department: 'Dep1' });
            expect(deletedEmployee).to.be.null;
        });

        it('should properly remove one document with remove method', async () => {
            const employee = await Employee.findOne({ firstName: 'Name1', lastName: 'Surname1', department: 'Dep1' });
            await employee.remove();
            const removedEmployee = await Employee.findOne({ firstName: 'Name1', lastName: 'Surname1', department: 'Dep1' });
            expect(removedEmployee).to.be.null;
        });

        it('should properly remove multiple documents with deleteMany method', async () => {
            await Employee.deleteMany({});
            const deletedEmployees = await Employee.find({});
            expect(deletedEmployees.length).to.be.equal(0);
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });
    });
});