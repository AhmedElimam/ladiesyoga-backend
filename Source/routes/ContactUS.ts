import express from 'express';
import controller from '../controllers/ContactUs';

const router = express.Router();

router.post('/create/contactus', controller.CreateContactUs);
router.get('/get/contactus', controller.getAllContactus);
router.delete('/delete/contactus/:id', controller.deleteContactUS);
router.patch('/update/contactus/:id', controller.updateContactUs);
export = router;
