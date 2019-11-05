const Event = require('./../../models/event');
const Booking = require('./../../models/booking');
const { transformBooking, transformEvent } = require('./general');

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map((booking) => {
                return transformBooking(booking)
            })

        } catch (error) {
            throw error
        }
    },
    bookEvent: async (args) => {
        try {
            const fetchedEvent = await Event.findOne({ _id: args.eventId })
            const booking = new Booking({
                user: "5daabb4e965e5c7d088aba93",
                event: fetchedEvent.id
            })
            const result = await booking.save();
            return transformBooking(result)
        } catch (error) {
            throw error;
        }
    },
    cancelBooking: async (args) => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event')
            const event = transformEvent(booking.event)
            await Booking.deleteOne({ _id: args.bookingId })
            return event

        } catch (error) {
            throw error;
        }
    }
}