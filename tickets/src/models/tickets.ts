import mongoose from "mongoose";

interface TicketAttrs {
    title: string
    price: number
    userId: string
}

interface TicketDoc extends mongoose.Document{
    title: number
    price: number
    userId: string
}

interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs: TicketAttrs):TicketDoc
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        requrire: true
    },
    price: {
        type: String,
        requrire: true
    },
    userId: {
        type: String,
        requrire: true
    },
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
        }
    }
})

ticketSchema.statics.build = (attrs: TicketAttrs)=>{
    return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export {
    Ticket
}