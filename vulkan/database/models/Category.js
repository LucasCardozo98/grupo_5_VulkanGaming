module.exports = (sequelize,dataTypes)=>{
    const alias = "Category"

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
        tableName: "categorys",
        underscored : false,
        timestamps : false,
    }

    const Category = sequelize.define(alias,cols,config)

    return Category

}