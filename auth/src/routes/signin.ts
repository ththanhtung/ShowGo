import express,{Request, Response} from 'express';
import {body} from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/api/users/signin', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').trim().notEmpty().withMessage('Invalid password')
], validateRequest,async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordMatch = await Password.compare(existingUser.password, password);

  if (!passwordMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!
  );
  // Strore it on session object
  req.session = { jwt: userJwt };

  res.status(200).send(existingUser);
});

export { router as signinRouter };
