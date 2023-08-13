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

    async updateEvent(event) {
        let data = {};
        try {
            data = await this.db.events.update({...event}, {
                where: {
                    currdaystr: event.currdaystr
                }
            });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteEvent(event) {
        let data = {};
        try {
            data = await this.db.events.destroy({
                where: {
                    currdaystr: event.currdaystr
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