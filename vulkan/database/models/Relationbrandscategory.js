module.exports = (sequelize,dataTypes)=>{
    const alias = "Relation"

    const cols = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },
        idBrandsFromCategory: {
            type : dataTypes.INTEGER,
            allowNull: true
        },
        idCategorysFromBrand: {
            type : dataTypes.INTEGER,
            allowNull: true
        }
    }

    const config = {
        tableName: "relationsbrandcategory",
        underscored : false,
        timestamps : false,
    }

    const Relation = sequelize.define(alias,cols,config)

    return Relation

}