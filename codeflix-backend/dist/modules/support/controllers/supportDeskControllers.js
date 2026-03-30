import { SupportService } from '../services/supportDeskservice.js';
const service = new SupportService();
export const createTicket = async (req, res) => {
    try {
        // pharmacy_id and user_id come from the JWT via validateUser middleware
        const { pharmacy_id, user_id } = req.user;
        const { query_text } = req.body;
        const ticket = await service.createTicket({ pharmacy_id, user_id, query_text });
        res.status(201).json({ success: true, data: ticket });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const getMyPharmacyTickets = async (req, res) => {
    const { pharmacy_id } = req.user;
    const tickets = await service.getPharmacyTickets(pharmacy_id);
    res.json({ success: true, data: tickets });
};
export const adminGetAllTickets = async (req, res) => {
    const tickets = await service.getAllTickets();
    res.json({ success: true, data: tickets });
};
//# sourceMappingURL=supportDeskControllers.js.map