require('dotenv').config()
const development = {
    name: 'development',
    asset_path: 'assets',
    db: 'ninja_users_development',
    db_host:'hisham',
    db_pass:process.env.DB_PASSWORD,
    mail_user:process.env.MAIL_USER,
    mail_pass:process.env.MAIL_PASS,
    strategyClientId:process.env.GOOGLE_CLIENT_ID,
    strategyClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    strategyCallbackUrl:"http://localhost:8000/users/auth/google/callback",
  }
  
const production = {
    name: 'production',
    asset_path: process.env.ASSET_PATH,
    db: 'ninja_users_production',
    db_host:'hisham',
    db_pass:process.env.DB_PASSWORD,
    mail_user:process.env.MAIL_USER,
    mail_pass:process.env.MAIL_PASS,
    strategyClientId:process.env.GOOGLE_CLIENT_ID,
    strategyClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    strategyCallbackUrl:process.env.GOOGLE_CALLBACK_URL,
  }

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);