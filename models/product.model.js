const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {type: String,required: true,maxlength: 50},
      picture: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^https?:\/\/\S+$/.test(v);
          },
          message: props => `${props.value} is not a valid URL for picture!`
        }
      },
      description: {
        type: String,
        required: true
      },
      gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
      },
      category: {
        type: String,
        enum: ['makeup', 'skincare', 'haircare'],
        required: true
      },
      price: {type: Number,required: true},
      created_at: {type: Date,default: Date.now},
      updated_at: {type: Date,default: Date.now}
},{versionKey:false})

const ProductModel = mongoose.model("product",productSchema);

module.exports ={ProductModel};