module.exports = (sequelize,dataTypes)=>{
    const alias = "Brand"

    const cols = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },
        name: {
            type : dataTypes.STRING(100),
            allowNull: false
        }
    }

    const config = {
        tableName: "brands",
        underscored : false,
        timestamps : false,
    }

    const Brand = sequelize.define(alias,cols,config)

    return Brand

}