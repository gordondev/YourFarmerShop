const nodemailer = require("nodemailer");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to, username, code) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Свой фермер. Код активации",
            text: "",
            html: `
				<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html><head>
\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
\t<meta name="viewport" content="width=device-width, initial-scale=1">
\t<title>Код активации</title>
\t<style type="text/css">
@media only screen and (max-device-width:660px),only screen and (max-width:660px) {
    .em-narrow-table {
        width: 100%!important;
        max-width: 660px!important;
        min-width: 320px!important;
    }
    .em-mob-width-100perc {
        width: 100%!important;
        max-width: 100%!important;
    }
    .em-mob-wrap {
        display: block!important;
    }
    .em-mob-padding_right-20 {
        padding-right: 20px!important;
    }
    .em-mob-padding_left-20 {
        padding-left: 20px!important;
    }
}
</style>
\t<style em="styles">
@media only screen and (max-device-width:660px),only screen and (max-width:660px) {
    .em-narrow-table {
        width: 100%!important;
        max-width: 660px!important;
        min-width: 320px!important;
    }
    .em-mob-text_align-center {
        text-align: center!important;
    }
    .em-mob-padding_right-0 {
        padding-right: 0!important;
    }
    .em-mob-vertical_align-middle {
        vertical-align: middle!important;
    }
}
</style>
</head>
<body style="margin: 0; padding: 0;">
\t<span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: #F8F8F8; height: 0; width: 0; font-size: 1px;">${code} - Код активации&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;</span>
\t<!--[if !mso]><!-->
\t<div style="font-size:0px;color:transparent;opacity:0;">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</div>
\t<!--<![endif]-->
\t<table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 1px; line-height: normal;">
\t\t<tr em="group">
\t\t\t<td align="center" bgcolor="#F8F8F8">
\t\t\t\t<!--[if (gte mso 9)|(IE)]>
\t\t\t\t<table cellpadding="0" cellspacing="0" border="0" width="660"><tr><td>
\t\t\t\t<![endif]-->
\t\t\t\t<table cellpadding="0" cellspacing="0" width="100%" border="0" style="max-width: 660px; min-width: 660px; width: 660px;" class="em-narrow-table"><tr em="block" class="em-structure">
  <td align="center" style="padding: 30px 40px;" bgcolor="#FFFFFF" class="em-mob-padding_left-20 em-mob-padding_right-20">
    <table border="0" cellspacing="0" cellpadding="0" class="em-mob-width-100perc">
      <tr>
        <td width="580" align="center" valign="top" class="em-mob-wrap em-mob-width-100perc" style="border: 1px dashed #9299a2; border-radius: 10px; padding: 31px 0px 30px;">
\t\t\t\t\t<table cellpadding="0" cellspacing="0" border="0" width="100%">
\t\t\t\t\t\t<tr>
\t\t\t\t\t\t\t<td align="center" style="padding: 0 30px;" class="em-mob-padding_left-20 em-mob-padding_right-20">
\t\t\t\t\t\t\t\t<table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td align="center" style="padding-bottom: 5px;">
\t\t\t\t\t\t\t\t\t<div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 18px; line-height: 22px; color: #333333;"> <strong>${username},</strong></div>
\t\t\t\t\t\t\t\t</td></tr></table>
\t\t\t\t\t\t\t\t<table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td align="center" style="padding-bottom: 20px;">
\t\t\t\t\t\t\t\t\t<div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 16px; line-height: 21px; color: #5a5a5a;">Похоже, вы пытаетесь войти в аккаунт с нового устройства. Для входа вам понадобится код:<br></div>
\t\t\t\t\t\t\t\t</td></tr></table>
\t\t\t\t\t\t\t\t<table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td align="center" style="padding-bottom: 20px; border-width: 0px; padding-top: 0px;" class="em-mob-vertical_align-middle em-mob-padding_right-0" valign="middle">
\t\t\t\t\t\t\t\t\t<table width="265" border="0" cellspacing="0" cellpadding="0">
\t\t\t\t\t\t\t\t\t\t<tr>
\t\t\t\t\t\t\t\t\t\t\t<td align="center" height="43" style="border: 1px dashed #9299a2; border-radius: 7px; height: 43px; padding: 10px;" class="em-mob-text_align-center em-mob-vertical_align-middle" valign="middle">
\t\t\t\t\t\t\t\t\t\t\t\t<strong><span style="display: block; height: 43px; font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; color: #333333; font-size: 16px; line-height: 43px; text-decoration: none; white-space: nowrap; letter-spacing: 3px;">${code}</span></strong>
\t\t\t\t\t\t\t\t\t\t\t</td>
\t\t\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t\t\t</table>
\t\t\t\t\t\t\t\t</td></tr></table>
\t\t\t\t\t\t\t\t
\t\t\t\t\t\t\t\t<table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td align="center">
\t\t\t\t\t\t\t\t\t<div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 12px; line-height: 18px; color: #9299a2;">Если вы не пытались войти в свой аккаунт, рекомендуем вам сбросить свой пароль&nbsp;<br></div>
\t\t\t\t\t\t\t\t</td></tr></table>
\t\t\t\t\t\t\t</td>
\t\t\t\t\t\t</tr>
\t\t\t\t\t</table>
\t\t\t\t</td>
      </tr>
    </table>
  </td>
</tr></table>
\t\t\t\t<!--[if (gte mso 9)|(IE)]>
\t\t\t\t</td></tr></table>
\t\t\t\t<![endif]-->
\t\t\t</td>
\t\t</tr>
\t</table>
<div style="all: initial;" class="notranslate"><br></div><div style="all: initial;" class="notranslate"><br></div><div style="all: initial;" class="notranslate"><br></div><div style="all: initial;" class="notranslate"><br></div>
</body></html>		
				`,
        });
    }

}

module.exports = new MailService();