//creating user router

import express from 'express';
import { createroomid, findroom,destroyroom } from '../controllers/room.controller.js';

const router = express.Router();





router.route('/create').post(createroomid)

router.route('/destroy').post(destroyroom)

router.route('/findroom').post(findroom)




export default router

