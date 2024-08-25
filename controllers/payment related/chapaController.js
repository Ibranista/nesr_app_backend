import expressAsyncHandler from "express-async-handler";
import { generate_random_unique_id } from "../../utils/utils.js";
const transaction_url = process.env.CHAPA_INITIALIZE_TRANSACTION_URL;
const chapa_secret_key = process.env.CHAPA_SECRET_KEY;

export const initialize_transaction_and_get_payment_link = expressAsyncHandler(async (req, res) => {

    const {
        amount,
        email,
        first_name,
        last_name,
        phone_number,
    } = req.body;

    if (!amount || !email || !first_name || !last_name || !phone_number) {
        res.status(400).send({
            error: "All fields are required"
        });
        return;
    }

    var options = {
        'method': 'POST',
        'url': transaction_url,
        'headers': {
            'Authorization': `Bearer ${chapa_secret_key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "amount": amount,
            "currency": "ETB",
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "phone_number": phone_number,
            "tx_ref": `fund-the-poort-${new Date() + generate_random_unique_id()}`,
            // "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
            "return_url": "https://www.google.com/",
            "customization[title]": "Payment for mr. X",
            "customization[description]": "additional information"
        })

    };

    try {
        fetch(transaction_url, options)
            .then(response => response.json())
            .then(data => {
                res.status(201).send({
                    message: "Payment link created",
                    data: data
                });
            })
            .catch(error => {
                res.status(500).send({
                    error: error.message
                });
            });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }

});