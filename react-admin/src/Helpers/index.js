import React from 'react'

export const index = () => {
  return <div>Membership</div>
}

export const ClassChecker = (classes) => {
  let check = true
  classes.forEach((c) => {
    if (c.checked) {
      check = false
    }
  })
  return check
}

export const classDay = (days) => {
  let data = {}

  if (days.day === 'Sunday') {
    data = {
      _id: days._id,
      day: days.day,
      fromTime: new Date(days.fromTime),
      toTime: new Date(days.toTime),
      checked: true,
    }
  } else {
    data = {
      _id: '',
      day: 'Sunday',
      fromTime: null,
      toTime: null,
      checked: false,
    }
  }

  if (days.day === 'Monday') {
    data = {
      _id: days._id,
      day: days.day,
      fromTime: new Date(days.fromTime),
      toTime: new Date(days.toTime),
      checked: true,
    }
  } else {
    data = {
      _id: '',
      day: 'Monday',
      fromTime: null,
      toTime: null,
      checked: false,
    }
  }
  if (days.day === 'Tuesday') {
    data = {
      _id: days._id,
      day: days.day,
      fromTime: new Date(days.fromTime),
      toTime: new Date(days.toTime),
      checked: true,
    }
  } else {
    data = {
      _id: '',
      day: 'Tuesday',
      fromTime: null,
      toTime: null,
      checked: false,
    }
  }
  if (days.day === 'Wednesday') {
    data = {
      _id: days._id,
      day: days.day,
      fromTime: new Date(days.fromTime),
      toTime: new Date(days.toTime),
      checked: true,
    }
  } else {
    data = {
      _id: '',
      day: 'Wednesday',
      fromTime: null,
      toTime: null,
      checked: false,
    }
  }
  if (days.day === 'Thursday') {
    data = {
      _id: days._id,
      day: days.day,
      fromTime: new Date(days.fromTime),
      toTime: new Date(days.toTime),
      checked: true,
    }
  } else {
    data = {
      _id: '',
      day: 'Thursday',
      fromTime: null,
      toTime: null,
      checked: false,
    }
  }
  if (days.day === 'Friday') {
    data = {
      _id: days._id,
      day: days.day,
      fromTime: new Date(days.fromTime),
      toTime: new Date(days.toTime),
      checked: true,
    }
  } else {
    data = {
      _id: '',
      day: 'Friday',
      fromTime: null,
      toTime: null,
      checked: false,
    }
  }
  if (days.day === 'Saturday') {
    data = {
      _id: days._id,
      day: days.day,
      fromTime: new Date(days.fromTime),
      toTime: new Date(days.toTime),
      checked: true,
    }
  } else {
    data = {
      _id: '',
      day: 'Saturday',
      fromTime: null,
      toTime: null,
      checked: false,
    }
  }
  return data
}

export const calculateSalary = (data) => {
  console.log('file: index.js -> line 144 -> data', data)
  let amount = []

  data.forEach((a) => {
    amount.push(a.salary)
  })

  let salary = amount.reduce((a, b) => a + b, 0)
  return salary
}
