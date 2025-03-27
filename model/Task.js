const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
  taskTitle: { type: String, required: true },
  description: { type: String },
  priority: { type: String, required:true },
  dueDate: { type: Date, required: true },
  status:{type:String,required:true},
  completed:{type:Boolean,default:false},
  userId:{type:String,required:true}
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
