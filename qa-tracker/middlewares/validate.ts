import { ZodSchema } from "zod";

export const validateBody = async (req: Request, schema: ZodSchema) => {
  try {
    const body = await req.json();
    return schema.parse(body);
  } catch (err: any) {
    throw new Response(JSON.stringify({ message: err.message }), {
      status: 400,
    });
  }
};
