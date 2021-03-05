module.exports = (sequelize,dataTypes)=>{
    const alias = "Product"

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
        },
        description : {
            type : dataTypes.STRING(5000)
        },
        price : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        idCategory : {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        idBrand : {
            type: dataTypes.INTEGER(11),
            allowNull: true
        }
    }

    const config = {
        tableName: "products",
        underscored : false,
        timestamps : false,
    }

    const Product = sequelize.define(alias,cols,config)

    Product.associate = function(models){
        Product.belongsTo(models.Category,{
            as : "categorias",
            foreignKey : "idCategory"
        })

        Product.belongsTo(models.Brand,{
            as : "marcas",
            foreignKey : "idBrand"
        })

        Product.belongsToMany(models.User,{
            as : "carrito",
            through : "carts", //tabla pibot o intermedia
            foreignKey : "idProduct",
            otherKey : "idUser",
            timestamps: false
        })
    }

    return Product

}