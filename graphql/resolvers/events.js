
const Event = require('./../../models/event');
const User = require('./../../models/user');
const { transformEvent, user } = require('./general');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map((event) => {
                //event.id is mongoose equal to event._doc._id.toString()
                return transformEvent(event)
            })
        }
        catch (error) {
            throw error
        }
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: args.eventInput.date,
            creator: '5daabb4e965e5c7d088aba93'
        });
        try {
            const result = await event.save();
            let createdEvent = transformEvent(result)
            const userFound = await User.findById(result._doc.creator)
            if (!userFound) {
                console.log({ userFound });
                throw "userFound not found"
            }
            userFound.createdEvents.push(event)
            const updatedUser = await userFound.save();
            if (updatedUser)
                return createdEvent
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
}