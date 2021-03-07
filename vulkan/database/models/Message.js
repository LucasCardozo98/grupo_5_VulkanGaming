module.exports = (sequelize,dataTypes)=>{
    const alias = "Message"

    const cols = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },
        idUserMessage: {
            type : dataTypes.INTEGER,
            allowNull: true
        },
        idOtherUSer: {
            type : dataTypes.INTEGER,
            allowNull: true
        },
        message : {
            type : dataTypes.STRING(5000),
            allowNull: false
        }
    }

    const config = {
        tableName: "messages",
        underscored : false,
        timestamps : false,
    }

    const Message = sequelize.define(alias,cols,config)

    Message.associate = function(models){
        
        Message.belongsTo(models.User,{
            as : "mensajes",
            foreignKey : "idUserMessage",           
            timestamps: false
        })
    }

    return Message

}