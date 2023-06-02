import { RouteHandler } from "../../lib/routeHandler";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await RouteHandler(req, res, {
    POST: async (req, res) => {
      // https://docs.snipcart.com/v3/webhooks/introduction
      // spell-checker:disable-next-line
      const token = req.headers[`x-snipcart-requesttoken`];
      const url = `https://app.snipcart.com/api/requestvalidation/${token}`;
      console.log("token", token);

      if (!token) {
        res.send(401);
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${process.env.SNIPCART_PUBLIC_KEY}`,
          Accept: "application/json",
        },
      });
      console.log("status", response.status);
      console.log("data", response.body);

      if (response.status === 200) {
        console.log("VALID TOKEN");
      }
      res.status(200);
    },
  });
}
