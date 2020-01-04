
const DataLoader = require('dataloader')
const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const eventLoader = new DataLoader((eventIds) => events(eventIds))
const userLoader = new DataLoader((userIds) => User.find({ _id: { $in: userIds } }))

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return await events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                date: dateToString(event._doc.date),
                creator: user.bind(this, event.creator)
            }
        })
    } catch (error) {
        throw error
    }
}
const singleEvent = async eventId => {
    try {
        const event = await eventLoader.load(eventId.toString())
        return event
    } catch (error) {
        throw error
    }
}

const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString())
        return transformUser(user)
    } catch (error) {
        throw error
    }
}

const transformBooking = (booking) => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt),
    }
}

const transformEvent = (event) => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event._doc.creator)
    }
}

const transformUser = (user) => {
    return {
        ...user._doc,
        _id: user.id,
        // createdEvents: eventLoader.loadMany.bind(this, user._doc.createdEvents)
        // OR
        createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
    }
}


exports.events = events
exports.singleEvent = singleEvent
exports.transformBooking = transformBooking
exports.transformEvent = transformEvent
exports.transformUser = transformUser
exports.user = user
