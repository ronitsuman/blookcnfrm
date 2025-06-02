import Availability from '../model/availablitymodel.js';
import Space from '../../space/model/Space.js';
import { BadRequestError, UnauthorizedError, ForbiddenError } from '../../../common/error/index.js';

const createAvailability = async (req, res) => {
  try {
    const { spaceId, startDate, endDate, price } = req.body;
    const userId = req.user?.id;

    if (!userId) throw new UnauthorizedError('User not authenticated');
    if (!spaceId || !startDate || !endDate) {
      throw new BadRequestError('Space ID, start date, and end date are required');
    }

    const space = await Space.findById(spaceId);
    if (!space) throw new BadRequestError('Space not found');
    if (space.owner.toString() !== userId) {
      throw new ForbiddenError('Only space owner can set availability');
    }

    const existingAvailability = await Availability.findOne({
      spaceId,
      $or: [
        { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        { endDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(endDate) } },
      ],
    });

    if (existingAvailability) {
      throw new BadRequestError('Availability slot overlaps with existing slot');
    }

    const availability = await Availability.create({
      spaceId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      price,
    });

    space.availability.push(availability._id);
    await space.save();

    res.status(201).json({
      status: 'success',
      message: 'Availability created',
      data: availability,
    });
  } catch (err) {
    console.error(`Error in createAvailability: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const getAvailabilities = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const { startDate, endDate } = req.query;

    if (!spaceId) throw new BadRequestError('Space ID is required');

    const query = { spaceId, status: 'available' };
    if (startDate) query.startDate = { $gte: new Date(startDate) };
    if (endDate) query.endDate = { $lte: new Date(endDate) };

    const availabilities = await Availability.find(query)
      .populate('spaceId', 'name city')
      .lean();

    res.status(200).json({
      status: 'success',
      data: availabilities,
    });
  } catch (err) {
    console.error(`Error in getAvailabilities: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, price, status } = req.body;
    const userId = req.user?.id;

    if (!userId) throw new UnauthorizedError('User not authenticated');
    if (!id) throw new BadRequestError('Availability ID is required');

    const availability = await Availability.findById(id);
    if (!availability) throw new BadRequestError('Availability not found');

    const space = await Space.findById(availability.spaceId);
    if (!space || space.owner.toString() !== userId) {
      throw new ForbiddenError('Only space owner can update availability');
    }

    if (startDate || endDate) {
      const existingAvailability = await Availability.findOne({
        spaceId: availability.spaceId,
        _id: { $ne: id },
        $or: [
          { startDate: { $lte: new Date(endDate || availability.endDate), $gte: new Date(startDate || availability.startDate) } },
          { endDate: { $lte: new Date(endDate || availability.endDate), $gte: new Date(startDate || availability.startDate) } },
          { startDate: { $lte: new Date(startDate || availability.startDate) }, endDate: { $gte: new Date(endDate || availability.endDate) } },
        ],
      });

      if (existingAvailability) {
        throw new BadRequestError('Updated slot overlaps with existing slot');
      }
    }

    if (startDate) availability.startDate = new Date(startDate);
    if (endDate) availability.endDate = new Date(endDate);
    if (price !== undefined) availability.price = price;
    if (status) availability.status = status;

    await availability.save();

    res.status(200).json({
      status: 'success',
      message: 'Availability updated',
      data: availability,
    });
  } catch (err) {
    console.error(`Error in updateAvailability: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) throw new UnauthorizedError('User not authenticated');
    if (!id) throw new BadRequestError('Availability ID is required');

    const availability = await Availability.findById(id);
    if (!availability) throw new BadRequestError('Availability not found');

    const space = await Space.findById(availability.spaceId);
    if (!space || space.owner.toString() !== userId) {
      throw new ForbiddenError('Only space owner can delete availability');
    }

    await Availability.deleteOne({ _id: id });
    space.availability = space.availability.filter(availId => availId.toString() !== id);
    await space.save();

    res.status(200).json({
      status: 'success',
      message: 'Availability deleted',
    });
  } catch (err) {
    console.error(`Error in deleteAvailability: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

export { createAvailability, getAvailabilities, updateAvailability, deleteAvailability };