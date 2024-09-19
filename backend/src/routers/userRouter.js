//creating user router

import express from 'express';

const router = express.Router();

import { loginuser } from '../controllers/user.controller.js';




router.route('/').get((req,res)=>res.send('hello there'))

router.route('/login').post(loginuser)







export default router

