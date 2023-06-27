const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.get('/contacto',(req, res) => {
    res.render("contacto")
});

router.post('/enviar', async(req, res) =>{
    const { nombre, apellido, email, direccion, localidad, telefono, consulta, RecibeOfertas } = req.body;




// Validaciòn de campos
if (!nombre || !apellido || !email || !direccion || !localidad || !telefono || !consulta || !RecibeOfertas) {
    return res.render('contacto', { error: 'Todos los campos son obligatorios'});
}

//Configuraciòn de transportador SMTP

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mireille81@ethereal.email',// user: 'celestine.hagenes71@ethereal.email',
        pass: 'hHJ8aNXACYXYsY3yNb'// pass: 'tadpJFWDMZezVjKjj1'
    }
});

//Configuraciòn de correo electrònico
const mailOptions = {
    from: email,
    to: 'nan.crous@gmail.com', //'destinatario@ejemplo.com',
    subject: 'Formulario de contacto desde nodemailer',
    text: `Nombre:${nombre}\n Apellido:${apellido}\n Email:${email}\n Direccion:${direccion}\n Localidad:${localidad}\n Telefono:${telefono}\n Consulta:${consulta}\n RecibeOfertas:${RecibeOfertas}`
};

try{
    //para enviar correo electrònico
    await transporter.sendMail(mailOptions);
    res.render('contactoenvio',{
        nombre: req.body.nombre
    });
} catch (error) {
    console.log(error);
    res.render('contacto', { error: 'Error al enviar mensaje'});
}
});
module.exports = router;