import { Pool } from 'pg';
// Assuming a shared pool instance exists
const pool = new Pool();
export class SupportService {
    async createTicket(data) {
        let category = 'General';
        let priority = 'Low';
        const text = data.query_text.toLowerCase();
        // Logic: Internal Triage Replacement
        if (text.includes('camera') || text.includes('scanner') || text.includes('hardware')) {
            category = 'Hardware';
            priority = 'High';
        }
        else if (text.includes('login') || text.includes('password') || text.includes('software')) {
            category = 'Software';
            priority = 'Medium';
        }
        const query = `
      INSERT INTO support_tickets (pharmacy_id, user_id, query_text, category, priority)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
        const values = [data.pharmacy_id, data.user_id, data.query_text, category, priority];
        const res = await pool.query(query, values);
        return res.rows[0];
    }
    async getPharmacyTickets(pharmacyId) {
        const res = await pool.query('SELECT * FROM support_tickets WHERE pharmacy_id = $1 ORDER BY created_at DESC', [pharmacyId]);
        return res.rows;
    }
    async getAllTickets() {
        const res = await pool.query('SELECT * FROM support_tickets ORDER BY created_at DESC');
        return res.rows;
    }
}
//# sourceMappingURL=supportDeskservice.js.map