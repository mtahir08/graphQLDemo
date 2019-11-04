const bcrypt = require('bcrypt');

const Event = require('./../../models/event');
const User = require('./../../models/user');
const Booking = require('./../../models/booking');

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            }
        })
    } catch (error) {
        throw error
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: events.bind(this, user._doc.createdEvents)
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map((event) => {
                //event.id is mongoose equal to event._doc._id.toString()
                return {
                    ...event._doc,
                    _id: event.id,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)
                }
            })
        }
        catch (error) {
            throw error
        }
    },
    booking: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map((booking) => {
                return {
                    ...booking._doc,
                    _id: booking.id,
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString(),
                }
            })

        } catch (error) {
            throw error
        }
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: args.eventInput.date,
            creator: '5c4dfc8f7936bc17c50cc052'
        });
        try {
            const result = await event.save();
            console.log(result._doc.creator);
            let createdEvent = {
                ...result._doc,
                _id: result._doc._id.toString(),
                date: new Date(result._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            }
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
    createUser: async (args) => {
        try {
            const userFound = await User.findOne({ email: args.userInput.email })
            if (userFound) {
                throw "User exists already"
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const newUser = new User({
                email: args.userInput.email,
                password: hashedPassword,
            });

            const result = await newUser.save();
            if (result) {
                return { _id: result._doc._id.toString(), email: result._doc.email };
            }
        } catch (error) {
            throw error;
        }
    },
    createBooking: async (args) => {
        try {
            const fetchedEvent = Event.findOne({ _id: args.eventId })
            const booking = new Booking({
                user: "5c4dfc8f7936bc17c50cc052",
                event: fetchedEvent
            })
            const result = await booking.save();
            return {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(result._doc.createdAt).toISOString(),
                updatedAt: new Date(result._doc.updatedAt).toISOString(),
            }
        } catch (error) {
            throw error;
        }
    },
    user: async userId => {
        try {
            const user = await User.findById(userId)
            return {
                ...user._doc,
                _id: user.id,
                createdEvents: events.bind(this, user._doc.createdEvents)
            }
        } catch (error) {
            throw error
        }
    }
}