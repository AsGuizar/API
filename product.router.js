const router = require("express").Router();
const Products = require("../model/product.model");

// Obtener todos los productos
router.get("/products", async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: products
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener los productos",
            error: error.message,
        });
    }
});

// Obtener un producto específico por ID
router.get("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    try {
        const product = await Products.findOne({
            where: { product_id: id }
        });
        if (!product) {
            return res.status(404).json({
                ok: false,
                message: "Producto no encontrado",
            });
        }
        res.status(200).json({
            ok: true,
            status: 200,
            body: product,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener el producto",
            error: error.message,
        });
    }
});

// Crear un nuevo producto
router.post("/products", async (req, res) => {
    const { place_name, fechaVisita, imgUrl, description } = req.body;
    try {
        await Products.sync();  // Sincroniza la tabla en caso de que no exista
        const newProduct = await Products.create({
            place_name,
            fechaVisita,
            imgUrl,
            description,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Producto creado correctamente",
            body: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al crear el producto",
            error: error.message,
        });
    }
});

// Editar un producto existente
router.put("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const { place_name, fechaVisita, imgUrl, description } = req.body;
    try {
        const updatedProduct = await Products.update(
            {
                place_name,
                fechaVisita,
                imgUrl,
                description,
            },
            { where: { product_id: id } }
        );
        if (updatedProduct[0] === 0) {
            return res.status(404).json({
                ok: false,
                message: "Producto no encontrado o no se realizaron cambios",
            });
        }
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Producto actualizado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al actualizar el producto",
            error: error.message,
        });
    }
});

// Eliminar un producto
router.delete("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    try {
        const deletedProduct = await Products.destroy({
            where: { product_id: id }
        });
        if (!deletedProduct) {
            return res.status(404).json({
                ok: false,
                message: "Producto no encontrado",
            });
        }
        res.status(204).json({
            ok: true,
            status: 204,
            message: "Producto eliminado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al eliminar el producto",
            error: error.message,
        });
    }
});

module.exports = router;
