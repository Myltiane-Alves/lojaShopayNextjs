import nc from 'next-connect';
import bcrypt from "bcrypt";
import db from "@/utils/db";
import User from "@/models/User";
import { validateEmail } from '@/utils/validation';
import { createActivationToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmails';
import { activateEmailTemplate } from '@/emails/activateEmailTemplate';

const handler = nc()

handler.post(async (req, res) => {
    try {
        await db.connectDb()
        const {name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({msg: "Please fill in all fields"})
        }
        if(!validateEmail(email)) {
            return res.status(400).json({msg: "Invalid email"})
        }
        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({msg: "This email already exists"})
        }
        if(password.length < 6) {
            return res
                .status(400)
                .json({msg: "Password must be at least 6 characters"})
        }
        const cryptedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({ name, email, password: cryptedPassword });

        const addedUser = await newUser.save();
        const activitaion_token = createActivationToken({
            id: addedUser._id.toString(),
        });
        console.log(activitaion_token)
        const url = `${process.env.BASE_URL}/activate/${activitaion_token}`;
        sendEmail(email, url, "", "Ative sua conta.", activateEmailTemplate);
        await db.disconnectDb();
        res.json({
            message: "Registre o sucesso! Por favor, ative seu e-mail para começar."
        });
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
});

export default handler;