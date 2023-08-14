const eventService  = require('../service/event.service');
const logger = require('../logger/api.logger');

class TodoController {

    async getEvents() {
        logger.info('Controller: getEvents');
        return await eventService.getEvents();
    }

    async getEvent(dayStr) {
        logger.info('Controller: getEvent', dayStr);
        return await eventService.getEvent(dayStr);
    }

    async createEvent(event) {
        logger.info('Controller: createEvent', event);
        return await eventService.createEvent(event);
    }

    async updateEvent(event) {
        logger.info('Controller: updateEvent', event);
        return await eventService.updateEvent(event);
    }

    async deleteEvent(event) {
        logger.info('Controller: deleteEvent', event);
        return await eventService.deleteEvent(event);
    }
}
module.exports = new TodoController();