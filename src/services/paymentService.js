import axios from "axios";
import { ACCESS_TOKEN } from "../config.js";

// En items, debe ir un array de objetos con todos los items que se
// compran en el carrito, por lo que eso debe viajar en el body del
// request
// En cada producto debe ir el unit_price y el quantity

/* 
 Estructura de cómo deberían ir los datos del user, quizás no deban ser todos obligtorios
{
        "name": "Juan",
        "surname": "Lopez",
        "email": "user@email.com",
        "phone": {
            "area_code": "11",
            "number": "4444-4444"
        },
        "identification": {
            "type": "DNI",
            "number": "12345678"
        },
        "address": {
            "street_name": "Street",
            "street_number": 123,
            "zip_code": "5700"
        }

    Producto
        "id": "item-ID-1234",
        "title": "Mi producto",
        "currency_id": "CLP",
        "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
        "description": "Descripción del Item",
        "category_id": "art",
        "quantity": 1,
        "unit_price": 75.76
*/

export const createPayment = async (req, res) => {
  const url = "https://api.mercadopago.com/checkout/preferences";

  const { productos, user } = req.body;

  const body = {
    payer: user,
    items: productos,
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "/success",
    },
    installments: 6
  };

  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  return payment.data;
};
