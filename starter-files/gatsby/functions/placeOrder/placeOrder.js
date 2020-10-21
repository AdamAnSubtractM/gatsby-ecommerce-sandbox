const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function generateOrderEmail({ order, total }) {
  return `
        <div>
            <h2>Your recent order totaling ${total}</h2>
            <p>Hang tight. Your order is expected to be ready for pickup in 25 minutes.</p>
            <ul>
                ${order
                  .map(
                    (orderItem) =>
                      `
                    <li>
                        <img src="${orderItem.thumbnail}" alt="${orderItem.name}"/>
                        ${orderItem.size} ${orderItem.name} - ${orderItem.price}
                    </li>
                    `
                  )
                  .join('')}
            </ul>
            <p>Your order total due at pick up: <strong>${total}</strong></p>
        </div>
    `;
}

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  //   await wait(3000);
  const body = JSON.parse(event.body);
  const blankRequiredFields = [];
  const requiredFields = ['email', 'name', 'order'];

  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Nice try you dumb robot!!! - Error: 307',
      }),
    };
  }

  for (const field of requiredFields) {
    if (!body[field]) {
      blankRequiredFields.push(field);
    }
  }

  if (blankRequiredFields.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `The following fields are required: ${blankRequiredFields.join(
          ', '
        )}`,
      }),
    };
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Woah woah woah there pal. You need to purchase atleast 1 pizza...`,
      }),
    };
  }

  const info = transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'Test Email for New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  console.log(`info`, info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
