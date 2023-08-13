const { connect } = require('../config/db.config');
const logger = require('../logger/api.logger');


class EventRepository {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
    }

    async getEvents() {
        try {
            const events = await this.db.events.findAll();
            console.log('events:::', events);
            return events;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createEvent(event) {
        let data = {};
        try {
            data = await this.db.events.create(event);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateTask(task) {
        let data = {};
        try {
            task.updateddate = new Date().toISOString();
            data = await this.db.tasks.update({...task}, {
                where: {
                    id: task.id
                }
            });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteTask(taskId) {
        let data = {};
        try {
            data = await this.db.tasks.destroy({
                where: {
                    id: taskId
                }
            });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new EventRepository();