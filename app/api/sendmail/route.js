import { sendMail } from "../../../lib/mailservice";
import { NextResponse, NextRequest } from "next/server";
export async function POST(request) {
  try {

    const { method } = request
    const { mail } = await request.json()
    console.log(mail)
    console.log(method)

    switch (method) {
      case "POST": {
        //Do some thing
        await sendMail(
          "confirmation mail",
          mail,
          `Hey thanks for subscribing to our Newsletter, stay tuned for the updates!!`
        );
        return NextResponse.json({ message: "successs" }, { status: 200 })

      }
      case "GET": {
        //Do some thing
        // res.status(200).send(req.auth_data);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.log(err)
  }
};
