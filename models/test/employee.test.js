const expect = require('chai').expect;
const mongoose = require('mongoose');
const Employee = require('./../employee.model.js');

describe('Employee', () => {
    /*after(() => {
        mongoose.models = {};
    });*/

    it('should throw an error if no "firstName",  "lastName", "department" args', () => {
        const emp = new Employee({});
        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        })
    });

    it('should throw an error if "firstName", "lastName", "deparment" is not a string', () => {
        const cases = [[], {}];
        for(let item of cases) {
            const emp = new Employee({ item });
            emp.validate(err => {
                expect(err.errors.firstName).to.exist;
                expect(err.errors.lastName).to.exist;
                expect(err.errors.department).to.exist;
            })
        }
    });

    it('should not throw an error if "name" is properly', () => { 
        const emp = new Employee({ firstName: "John", lastName: "Doe", department: "IT" });
        emp.validate(err => {
            expect(err).to.not.exist;
        })
    })
})