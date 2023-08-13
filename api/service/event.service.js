const eventRepository  = require('../repository/event.repository');

class EventService {

    constructor() {}

    async getEvents() {
        return await eventRepository.getEvents();
    }

    async createEvent(event) {
        return await eventRepository.createEvent(event);
    }

    async updateTask(task) {
        return await eventRepository.updateTask(task);
    }

    async deleteTask(taskId) {
        return await eventRepository.deleteTask(taskId);
    }

}

module.exports = new EventService();