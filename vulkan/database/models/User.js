module.exports = (sequelize, dataTypes)=>{
    const alias = "User"
    
    const columns = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },
        firsName : {
            type : dataTypes.STRING(100),
            allowNull : true
        },
        lastname : {
            type : dataTypes.STRING(200),
            allowNull: true
        },
        username : {
            type : dataTypes.STRING(200),
            allowNull: true
        },
        password : {
            type : dataTypes.STRING(100),
            allowNull: false,

        },
        email : {
            type : dataTypes.STRING(200),
            allowNull: false
        },
        address : {
            type: dataTypes.STRING(200),
            allowNull: true,

        },
        avatar : {
            type: dataTypes.STRING(200),
            allowNull : true
        },
        rol : {
            type : dataTypes.STRING(100),
            allowNull: true
        }
    }

    const config = {
        tableName: "users",
        underscored :false,
        timestamps : false,
    }

    const User = sequelize.define(alias,columns,config);

    
    User.associate = function(models){
        
        User.belongsToMany(models.Product,{
            as : "carrito",
            through : "carts", //tabla pibot o intermedia
            foreignKey : "idUser",
            otherKey : "idProduct",
            timestamps: false
        })
    }

    return User;


}