import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { body} from 'express-validator';
import { BadRequestError, validateRequest } from '@vigacorp/common';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({
        min: 4,
        max: 20,
      })
      .withMessage('Invalid password'),
  ],validateRequest,
  async (req: Request, res: Response) => {
    console.log('Creating a user');

    const { email, password } = req.body;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({
      email,
      password,
    });

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    // Strore it on session object
    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
