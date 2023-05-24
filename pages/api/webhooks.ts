import { RouteHandler } from "../../lib/routeHandler";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await RouteHandler(req, res, {
    GET: async (req, res) => {
      const token = req.headers[`X-Snipcart-RequestToken`];
      console.log("GET", token);
      if (!token) {
        res.send(401);
      }
      const response = await fetch(
        `https://app.snipcart.com/api/requestvalidation/${token}}`
      );
      const data = await response.json();
      console.log(data);
      res.status(200).json({ name: "John Doe" });
    },
  });
}
