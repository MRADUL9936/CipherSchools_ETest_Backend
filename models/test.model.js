import mongoose,{Schema} from 'mongoose'


const TestSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    questions:[{
             type:Schema.Types.ObjectId,
             ref:"Question"
              }],
    isDeleted:{type:Boolean,required:true},
    
},{
    timestamps:true
})


export const Test=mongoose.model("Test",TestSchema)