import clientPromise, { connectMongoDb } from "../../../backend/lib/mongodb";
import { createToken } from "../../../backend/services";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongoDb();

      const { password } = req.body;

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/;
      if (!passwordRegex.test(password)) {
        return res
          .status(400)
          .json({
            error: "La contraseña debe contener las características indicadas",
          });
      }

      const user = await User.create(req.body);

      res.status(200).send({ token: createToken(user) });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error" });
    }
  }
}
