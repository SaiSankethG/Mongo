const mongoose = require('mongoose')

const connect = () => {
   return mongoose.connect('mongodb+srv://sai:sai@cluster0.7cuwm0r.mongodb.net/?retryWrites=true&w=majority')
}

const schoolSchema = new mongoose.Schema({
    district: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'district'
    },
    name: {
        type:String,
        unique:false
    },
    since: Number,
    students: Number,
    isGreat: Boolean ,
    staff:[{type:String}]
  })

schoolSchema.index({
    district:1,
    name:1
}, {unique:true})

schoolSchema.post('save' , function(doc ,next){
    // console.log('after save')
    setTimeout(()=>{
        console.log('post save' , doc)
        next()
    }, 300)
})

schoolSchema.virtual('staffCount')
.get(function(){
    console.log('virtual')
    return this.staff.length
})

const School = mongoose.model('school', schoolSchema)

connect()
.then(async connection=> {
    const school = await School.create({
        name:'my school',
        staff:['a', 'b' , 'c']
    })
    // console.log(school.staffCount)
})
.catch(err => console.log(err))
