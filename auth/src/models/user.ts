import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface to describe the properties that are require to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describe the properties that a userModel has
interface userModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describe the properties that a User Document has
interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
toJSON:{
    transform(doc, ret){
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
    }
}

});

userSchema.pre('save', async function(done){
    const user = this
    if (user.isModified('password')){
        const hashed = await Password.toHash(user.get('password'))
        user.set('password', hashed);
    }
    done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, userModel>('User', userSchema);

const user = User.build({
    email: '',
    password: ''
})

export {User};
