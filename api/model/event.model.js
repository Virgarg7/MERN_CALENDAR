module.exports = (sequelize, DataTypes, Model) => {

    class Events extends Model {}

    Events.init({
        // Model attributes are defined here
        currdaystr: {
          type: DataTypes.STRING,
          allowNull: false
        },
        schedules: {
          type: DataTypes.TEXT
          // allowNull defaults to true
        },
        exams: {
            type: DataTypes.TEXT,
        },
        assignments: {
            type: DataTypes.TEXT
            // allowNull defaults to true
        },
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'events' // We need to choose the model name
      });
      
      return Events;
}