
const development = {
    name: 'development',
    db: 'ninja_users_development',
    db_host:'hisham',
    db_pass:process.env.DB_PASSWORD,
    mail_user:process.env.MAIL_USER,
    mail_pass:process.env.MAIL_PASS
  }


module.exports = development;