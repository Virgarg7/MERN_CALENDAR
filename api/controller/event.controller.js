const eventService  = require('../service/event.service');
const logger = require('../logger/api.logger');

class TodoController {

    async getEvents() {
        logger.info('Controller: getEvents')
        return await eventService.getEvents();
    }

    async createEvent(event) {
        logger.info('Controller: createTask', event);
        return await eventService.createEvent(event);
    }

    async updateTask(task) {
        logger.info('Controller: updateTask', task);
        return await eventService.updateTask(task);
    }

    async deleteTask(taskId) {
        logger.info('Controller: deleteTask', taskId);
        return await eventService.deleteTask(taskId);
    }
}
module.exports = new TodoController();