import dotenv from "dotenv"

dotenv.config()

const config  = {
 NODE_ENV: process.env.NODE_ENV || "development",
 PORT: process.env.PORT || 7027,
 OPEN_AI_SECRET_KEY: process.env.OPEN_AI_SECRET_KEY,
 OPEN_AI_BASE_URL: process.env.OPEN_AI_BASE_URL,
 OPEN_AI_MODEL: process.env.OPEN_AI_MODEL
}

export default config