module.exports = (sequelize,dataTypes)=>{
    const alias = "Cart"

    const cols = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },
        idUser: {
            type : dataTypes.INTEGER,
            allowNull: true
        },
        idProduct: {
            type : dataTypes.INTEGER,
            allowNull: true
        },
        cantidad : {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        idFormaDePago:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        tableName: "carts",
        underscored : false,
        timestamps : false,
    }

    const Cart = sequelize.define(alias,cols,config)

    return Cart

}