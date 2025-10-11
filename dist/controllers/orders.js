import Order from "../models/orders";
export const getOrders = async (req, res) => {
    console.log(req.body.usuarioConfirmado);
    const usuarioId = req.body.usuarioConfirmado._id;
    const consulta = { user: usuarioId };
    const orders = await Order.find(consulta);
    res.status(200).json({
        data: [...orders],
    });
};
export const createOrder = async (req, res) => {
    const usuarioId = req.body.usuarioConfirmado._id;
    const orderData = req.body;
    const data = {
        ...orderData,
        user: usuarioId,
        createdAt: new Date(),
        status: "Pendiente",
    };
    const order = new Order(data);
    await order.save();
    res.status(201).json({
        data: order,
    });
};
