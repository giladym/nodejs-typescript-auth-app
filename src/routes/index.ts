import express from "express";
import role from "./role.routes";
import auth from "./auth.routes";
const router = express.Router();

router.use('/role', role);
router.use('/auth', auth);

router.get('/', (req,res) => {
    res.json({
        message: 'Hello World'
    })
});


export default router;