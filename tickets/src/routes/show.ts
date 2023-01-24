import express, { Request, Response } from 'express';
import { body } from 'express-validator';
const router = express.Router();
import { NotFoundError, RequireAuth, validateRequest } from '@vigacorp/common';
import { Ticket } from '../models/tickets';

router.get(
  '/api/tickets/:id',
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        throw new NotFoundError()
    }
    res.status(200).send(ticket);
  }
);

export { router as showTicketRouter };
