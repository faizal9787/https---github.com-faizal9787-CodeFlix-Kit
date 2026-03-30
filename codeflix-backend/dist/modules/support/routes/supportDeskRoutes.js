import { Router } from 'express';
import { createTicket, getMyPharmacyTickets, adminGetAllTickets } from '../controllers/supportDeskControllers.js';
import { requireRole } from '../../../shared/middleware/requireRole.js';
import { validateUser, } from '../../../shared/middleware/validateUser.js';
const router = Router();
// A. Create Ticket (Manager/Agent)
router.post('/tickets', validateUser, requireRole(['manager', 'agent']), createTicket);
// B. Get Pharmacy Tickets (Manager only)
router.get('/tickets', validateUser, requireRole(['manager']), getMyPharmacyTickets);
// C. Global Support Dashboard (Superadmin only)
router.get('/admin/all', validateUser, requireRole(['superadmin']), adminGetAllTickets);
export default router;
//# sourceMappingURL=supportDeskRoutes.js.map