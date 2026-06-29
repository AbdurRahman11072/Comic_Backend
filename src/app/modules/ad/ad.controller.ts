import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import sendResponse from '../../utils/sendResponse';
import { AdService } from './ad.service';

const earnAdPoints = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  
  // Basic IP detection (trust proxy must be enabled in express if behind proxy)
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : (forwarded || req.socket.remoteAddress || '127.0.0.1')) as string;
  
  const result = await AdService.earnAdPoints(userId as string, ip);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ad points earned successfully',
    data: result,
  });
});

export const AdController = {
  earnAdPoints,
};
