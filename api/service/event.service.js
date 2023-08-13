const eventRepository  = require('../repository/event.repository');

class EventService {

    constructor() {}

    async getEvents() {
        return await eventRepository.getEvents();
    }

    async createEvent(event) {
        return await eventRepository.createEvent(event);
    }

    async updateEvent(event) {
        return await eventRepository.updateEvent(event);
    }

    async deleteEvent(event) {
        return await eventRepository.deleteEvent(event);
    }

}

module.exports = new EventService();