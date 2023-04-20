import nc from 'next-connect';
import User from "@/models/User";
import db from "@/utils/db";
import { validateEmail } from '@/utils/validation';

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
        const url = `${process.env.BASE_URL}/activate/${activitaion_token}`;
        
        await db.disconnectDb();
        res.json({
            message: "Register success! Please activate your email to start."
        });
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
});

export default handler;