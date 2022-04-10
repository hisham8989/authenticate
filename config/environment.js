
const development = {
    name: 'development',
    db: 'ninja_users_development',
    db_host:'hisham',
    db_pass:process.env.DB_PASSWORD,
    mail_user:process.env.MAIL_USER,
    mail_pass:process.env.MAIL_PASS,
    strategyClientId:process.env.GOOLGLE_CLIENT_ID,
    strategyClientSecret:process.env.GOOLGLE_CLIENT_SECRET,
    strategyCallbackUrl:process.env.GOOLGLE_CALLBACK_URL,
  }


module.exports = development;