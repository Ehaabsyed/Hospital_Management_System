import express from 'express'
import ConnectDB from './src/config/database.js'
import cors from 'cors'
import userRoute from './src/routes/userRoute.js'
import messageRoute from './src/routes/messageRoute.js'
import infoRoute from './src/routes/infoRoute.js'
import doctorRoute from './src/routes/doctorRoute.js'
import adminRoute from './src/routes/adminRoute.js'
import appointmentRoute from './src/routes/appointmentRoute.js'
import { isAdminauthenticated } from './src/middlewares/auth.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
const app = express()
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174','https://hospital-management-system-nine-kohl.vercel.app'];

app.use(cors({
  origin: 'https://hospital-management-system-nine-kohl.vercel.app',
  credentials: true,
}));

app.use(fileUpload({
  useTempFiles:true
}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.send('Hello World! Ready for vercel')
})

//is token for dashboard
app.get('/api/isAdmin', (req, res) => {
  const isToken = req.cookies.adminToken
  if (isToken) {
    res.json({ status: true, message: "Admin authorized" })
  } else {
    res.json({ status: false, message: "Admin not authorized" })
  }

})
app.use('/api/user', userRoute)
app.use('/api/doctor', doctorRoute)
app.use('/api/admin', isAdminauthenticated, adminRoute)
app.use('/api/message', messageRoute)
app.use('/api/appointment', appointmentRoute)
app.use('/api/getinfo', infoRoute)
ConnectDB()
app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
