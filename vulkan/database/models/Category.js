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

    Category.associate = function(models){
        Category.hasMany(models.Product,{
            as : "categorias",
            foreignKey : "idBrand"
        })
        
        Category.belongsToMany(models.Brand,{
            as : "MarcasCategorias",
            through : "relationsbrandcategory", //tabla pibot o intermedia
            foreignKey : "idCategorysFromBrand",
            otherKey : "idBrandsFromCategory",
            timestamps: false
        })
        
    }

    return Category

}