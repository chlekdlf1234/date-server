import { Request, Response } from 'express';
import { Controller } from '../types/common';

export default (controller: Controller) => async (req: Request, res: Response) => {
  try {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
    };

    const response = await controller(httpRequest);

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
