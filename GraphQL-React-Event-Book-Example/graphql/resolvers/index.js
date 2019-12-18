const authResolver = require('./auth')
const eventsResolver = require('./events')
const bookingResolver = require('./bookings')


const rootResolver = {
    ...authResolver,
    ...bookingResolver,
    ...eventsResolver,
}

module.exports = rootResolver