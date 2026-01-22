import {ZodError} from 'zod';

export const validateUserEdit = (schema) => (req, res, next) => {
  try {

    schema.parse(req.body);

  } catch (error) {
    if (error instanceof ZodError){
      res.status(400).json(error.issues);
      console.log(error);
    }
    else {
      res.status(500).json({message: 'Error de otro tipo'});
      console.log(error);
    }
  }

  next();
}