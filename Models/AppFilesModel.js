const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appfiles = Schema({
    AppFile_Type:{
        type: String,
        enum: ['Fitness', 'Service', 'Nutrition', 'User', 'Excercise', 'Certificate'],
        required: true
    },
    file:{ //image /video file
        type:String, required:true
    },
    //this is the id of file/image related to Fitness, Excercise, nutrition etc Collection
    //array of sub document 
    //how to identify here the objectid refers/belong to which table/collection
    AppFile_Ref:{
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    //this image/file will points to one of the entity/collection/
    onModel:{
        type:String,
        required:true,
        enum: ['FitnessModel', 'ServiceModel', 'NutritionModel', 'ExcerciseModel']
    }
   /*  const childSchema = new Schema({ name: 'string' });

        const parentSchema = new Schema({
        // Array of subdocuments
        children: [childSchema],
        // Single nested subdocuments. Caveat: single nested subdocs only work
        // in mongoose >= 4.2.0
        child: childSchema
    }); 
    ///////////////////////////////////////////////
    const commentSchema = new Schema({
  body: { type: String, required: true },
  on: {
    type: Schema.Types.ObjectId,
    required: true,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['BlogPost', 'Product']
  }
});

const Product = mongoose.model('Product', new Schema({ name: String }));
const BlogPost = mongoose.model('BlogPost', new Schema({ title: String }));
const Comment = mongoose.model('Comment', commentSchema);
    */
})
module.exports = mongoose.model("AppFiles", appfiles);