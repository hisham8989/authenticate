
const development = {
    name: 'development',
    db: 'ninja_users_development',
    db_host:'hisham',
    db_pass:process.env.DB_PASSWORD,
    mail_user:process.env.MAIL_USER,
    mail_pass:process.env.MAIL_PASS,
    strategyClientId:process.env.GOOLGLE_CLIENT_ID,
    strategyClientSecret:process.env.GOOLGLE_CLIENT_SECRET,
    strategyCallbackUrl:"localhost:8000/users/auth/google/callback",
  }
const production = {
    name: 'production',
    db: 'ninja_users_production',
    db_host:'hisham',
    db_pass:process.env.DB_PASSWORD,
    mail_user:process.env.MAIL_USER,
    mail_pass:process.env.MAIL_PASS,
    strategyClientId:process.env.GOOLGLE_CLIENT_ID,
    strategyClientSecret:process.env.GOOLGLE_CLIENT_SECRET,
    strategyCallbackUrl:process.env.GOOLGLE_CALLBACK_URL,
  }


module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);