const { Sequelize, Model, DataTypes, UUIDV4 } = require("sequelize");

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize("places_test", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    port: 3310
});

class Product extends Model { }

// Definición del modelo Product
Product.init(
    {
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        place_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaVisita: {
            type: DataTypes.DATE,
            allowNull: false
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Product",
    }
);

module.exports = Product;

// Función para probar la conexión a la base de datos
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("All good!");  // Conexión exitosa
    } catch (err) {
        console.error("All bad!!", err);  // Mostrando el error de conexión
    }
}

// Llamar a la función para probar la conexión
testConnection();
