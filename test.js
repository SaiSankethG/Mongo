const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb+srv://sai:sai@cluster0.7cuwm0r.mongodb.net/?retryWrites=true&w=majority')
}

const student = new mongoose.Schema({
    firstname: {
      type: String
    },
    
    info:{
      school:{
        type:String
      }
    },

    school:{
      type:mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'school'
    }
})

const school = new mongoose.Schema({
  name: String,
  since: Number,
  students: Number,
  isGreat: Boolean ,
  staff:[{type:String}]
})

const School = mongoose.model('school', school)
const Student = mongoose.model('student', student)

connect()
.then(async connection=>{
    // const school = await School.create({name:'siddaganga school'})
    // const student = await Student.create({
    //   firstname:'sai',
    //   school:school._id
    // })

    // const match = await Student.findById(student.id)
    // .populate('school')
    // .exec()
    // console.log(match)
    const school = {
      name: 'siddaganga school',
      since: 1970,
      students: 5000,
      isGreat: false,
      staff:['a' , 'b','c']
    }
    const school2 = {
      name: 'bapuji school',
      since: 2004,
      students: 2000,
      isGreat: false,
      staff:['d' ,'e', 'f']
    }

    const schools = await School.create([school , school2])
    const match = await School.findOne({staff:{$in: ['a' , 'b','c']}}).exec()
    console.log(match)
})
.catch(err=>{
    console.log(err)
})