const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Role = require("../utils/RoleEnum");
const validator = require('validator');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: value => {
      if(!validator.isEmail(value)){
        throw new Error({error: 'Invalid Email address'});
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  full_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.USER,
  },
  is_locked:{
    type:Boolean,
    default:false
  },
  is_active:{
    type:Boolean,
    default:false
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
}, {
  timestamps: true
});

//Hash password before saving
UserSchema.pre("save", async function (next) {
  // Cập nhật updated_at
  this.updated_at = Date.now();

  // Kiểm tra nếu mật khẩu đã thay đổi thì mới băm
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


//Method to compare password
UserSchema.methods = {
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
  generateAuthToken: async function () {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
  }
}

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email});
  if(!user){
    throw new Error({error: 'Sai thông tin đăng nhập'});  
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if(!isPasswordMatch){
    throw new Error({error: 'Sai thông tin đăng nhập'});
  }
  return user;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
