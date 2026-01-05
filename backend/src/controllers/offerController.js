import Offer from '../models/Offer.js';

// @route   GET /api/offers
// @desc    Get all offers
export const getAllOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find({ status: 'Active' });
    res.json({ success: true, offers, count: offers.length });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/offers (Admin only)
// @desc    Create offer
export const createOffer = async (req, res, next) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json({ success: true, offer });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/offers/:id (Admin only)
// @desc    Update offer
export const updateOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ success: true, offer });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/offers/:id (Admin only)
// @desc    Delete offer
export const deleteOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ success: true, message: 'Offer deleted' });
  } catch (error) {
    next(error);
  }
};