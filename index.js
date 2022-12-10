// Your code here
const allEmployeeRecords = []

function createEmployeeRecord([string1, string2, string3, number]) {
    const employeeRecord = {
        firstName: string1,
        familyName: string2,
        title: string3,
        payPerHour: number,
        timeInEvents: [],
        timeOutEvents: []
    }
    allEmployeeRecords.push(employeeRecord)
    return employeeRecord
}

function createEmployeeRecords (arrays) {
    //console.log(arrays)
    const arrOfObjects = []
    arrays.forEach((array) => {
        const newObj = createEmployeeRecord(array)
        console.log(newObj)
        arrOfObjects.push(newObj)
        //allEmployeeRecords.push(newObj)
    })
    //return array of objects
    return arrOfObjects
}

function createTimeInEvent (empObj, dateStamp) {
    const hour = dateStamp.split(' ')[1]
    // const hourStamp = `${hour[0]}`+`${hour[1]}`
    const date = dateStamp.split(' ')[0]
    const timeInObj = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    }
    //return employee record
    const timeInEvents = empObj.timeInEvents
    timeInEvents.push(timeInObj)
    return empObj
}

function createTimeOutEvent (empObj, dateStamp) {
    const hour = dateStamp.split(' ')[1]
    // const hourStamp = `${hour[0]}`+`${hour[1]}`
    const date = dateStamp.split(' ')[0]
    const timeOutObj = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    }
    //return employee record
    const timeOutEvents = empObj.timeOutEvents
    timeOutEvents.push(timeOutObj)
    return empObj
}

function hoursWorkedOnDate (empObj, dateStamp) {
    let timeIn = ''
    let timeOut = ''
    //find timeIn events that match date stamp
    empObj.timeInEvents.forEach((x) => {
        if (x.date === dateStamp) {
            timeIn = x.hour
        }
    })
    //find timeOut events that match date stamp
    empObj.timeOutEvents.forEach((x) => {
        if (x.date === dateStamp) {
            timeOut = x.hour
        }
    })
    //calculate hours worked 
    const hoursWorked = (timeOut - timeIn)/100
    //return hours worked as integer
    return hoursWorked
    
}

function wagesEarnedOnDate (empObj, dateStamp) {
    const hoursWorked = hoursWorkedOnDate(empObj, dateStamp)
    const wagesEarned = hoursWorked * empObj.payPerHour
    return wagesEarned
}

function allWagesFor (empObj) {
    //need to figure out how to get each date instance, then call wagesEarnedOnDate for each of those dates
    const arrOfDates = empObj.timeInEvents.map(x => x.date)
    let wagesEarned = 0; 
    arrOfDates.forEach(date => {
        const newWage = wagesEarnedOnDate(empObj, date)
        wagesEarned = wagesEarned + newWage
    })
    //debugger
    return wagesEarned

    //return pay owed for all dates
}

function calculatePayroll (array) {
    //const reducer = (previousValue, currentValue) => previousValue + currentValue
    let totalPayroll = 0
    array.forEach(employee => {
        totalPayroll = totalPayroll + allWagesFor(employee)
    })
    //return sum of pay owed to all employees
    return totalPayroll
}


//examples for practice
createEmployeeRecords([["moe", "sizlak", "barkeep", 2],
        ["bartholomew", "simpson", "scamp", 3]])

const example = createEmployeeRecord(["alex", "sizlak", "barkeep", 2])
createTimeInEvent(example, "2015-02-26 1100")
createTimeInEvent(example, "2015-02-27 1100")
createTimeInEvent(example, "2015-02-28 1100")

createTimeOutEvent(example, "2015-02-26 1700")
createTimeOutEvent(example, "2015-02-27 1700")
createTimeOutEvent(example, "2015-02-28 1700")