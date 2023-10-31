const formatVNDC = (price) => {
  return Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}
function renderGmail(data) {
  var html =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
    '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">' +
    ' <head>' +
    '  <meta charset="UTF-8">' +
    '<meta content="width=device-width, initial-scale=1" name="viewport">' +
    '<meta name="x-apple-disable-message-reformatting">' +
    '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
    '<meta content="telephone=no" name="format-detection">' +
    '<title>Holiday newsletter</title>' +
    '<link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet">' +
    '<style type="text/css">' +
    '#outlook a {' +
    'padding:0;' +
    '}' +
    '.ExternalClass {' +
    'width:100%;' +
    '}' +
    '.ExternalClass,' +
    '.ExternalClass p,' +
    '.ExternalClass span,' +
    '.ExternalClass font,' +
    '.ExternalClass td,' +
    '.ExternalClass div {' +
    '	line-height:100%;' +
    '}' +
    '.es-button {' +
    '	mso-style-priority:100!important;' +
    '	text-decoration:none!important;' +
    '}' +
    'a[x-apple-data-detectors] {' +
    '	color:inherit!important;' +
    '	text-decoration:none!important;' +
    '	font-size:inherit!important;' +
    '	font-family:inherit!important;' +
    '	font-weight:inherit!important;' +
    '	line-height:inherit!important;' +
    '}' +
    '.es-desk-hidden {' +
    '	display:none;' +
    '	float:left;' +
    '	overflow:hidden;' +
    '	width:0;' +
    '	max-height:0;' +
    '	line-height:0;' +
    '	mso-hide:all;' +
    '}' +
    '[data-ogsb] .es-button {' +
    '	border-width:0!important;' +
    '	padding:10px 20px 10px 20px!important;' +
    '}' +
    '[data-ogsb] .es-button.es-button-1 {' +
    '	padding:5px 0px!important;' +
    '}' +
    '@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } h1 a { text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } h2 a { text-align:center } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } h3 a { text-align:center } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 20px 10px 20px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }' +
    '</style>' +
    ' </head>' +
    '<body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;padding:0;Margin:0">' +
    '<div class="es-wrapper-color" style="background-color:#F6F6F6">' +
    ' <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">' +
    '    <tr style="border-collapse:collapse">' +
    '<td valign="top" style="padding:0;Margin:0">' +
    '<table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">' +
    '         <tr style="border-collapse:collapse">' +
    '          <td class="es-adaptive" align="center" style="padding:0;Margin:0">' +
    '         <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">' +
    '             <tr style="border-collapse:collapse">' +
    '              <td align="left" style="padding:10px;Margin:0">' +
    '<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                 <tr style="border-collapse:collapse">' +
    '                  <td valign="top" align="center" style="padding:0;Margin:0;width:580px">' +
    '<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' + //line 86
    '                    <tr style="border-collapse:collapse">' +
    '<td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here. <a href="https://viewstripo.email/" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View in browser</a></p></td>' +
    '                     </tr>' +
    '                   </table></td>' +
    '                 </tr>' +
    '               </table></td>' +
    '             </tr>' +
    '           </table></td>' +
    '         </tr>' +
    '       </table>' +
    '      <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">' +
    '         <tr style="border-collapse:collapse">' +
    '          <td align="center" style="padding:0;Margin:0">' +
    '        <table class="es-header-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">' +
    '             <tr style="border-collapse:collapse">' +
    '             <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">' +
    '             <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">' +
    '                 <tr style="border-collapse:collapse">' +
    '                  <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:280px">' +
    '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                     <tr style="border-collapse:collapse">' +
    '                    <td align="left" style="padding:0;Margin:0;font-size:0px"><a href="https://viewstripo.email/" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#BCA76E;font-size:14px"><img src="https://fhqx.hcmute.edu.vn/pluginfile.php/1/theme_maker/logo/1634220575/logo%20CLC%20%281%29.png" alt="Real Estate logo" title="Real Estate logo" width="165" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>' +
    '                     </tr>' +
    '                   </table></td>' +
    '                 </tr>' +
    '             </table>' +
    '               <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">' +
    '                 <tr style="border-collapse:collapse">' +
    '                 <td align="left" style="padding:0;Margin:0;width:280px">' +
    '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                   <tr style="border-collapse:collapse">' +
    '<td align="right" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#373A44;font-size:14px"><a target="_blank" href="tel:0929468214" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#BCA76E;font-size:14px">0929468214</a></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#373A44;font-size:14px"><a target="_blank" href="mailto:your@mail.com" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#BCA76E;font-size:14px">your@mail.com</a></p></td>' +
    '                   </tr>' +
    '                   </table></td>' +
    '                 </tr>' +
    '              </table>' +
    '             </tr>' +
    '           </table></td>' +
    '         </tr>' +
    '       </table>' +
    '     <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">' +
    '         <tr style="border-collapse:collapse">' +
    '          <td align="center" style="padding:0;Margin:0">' +
    '<table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#cfffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#CFFFFF;width:600px">' +
    '             <tr style="border-collapse:collapse">' +
    '              <td align="left" style="padding:0;Margin:0">' +
    '             <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                 <tr style="border-collapse:collapse">' +
    '                  <td valign="top" align="center" style="padding:0;Margin:0;width:600px">' +
    '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                     <tr style="border-collapse:collapse">' +
    '<td style="padding:0;Margin:0;position:relative" align="center"><a target="_blank" href="null" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#BCA76E;font-size:14px"><img class="adapt-img" src="https://zwpavi.stripocdn.email/content/guids/bannerImgGuid/images/image16718600704889945.png" alt="Merry Christmas & Happy New Year" title="Merry Christmas & Happy New Year" width="600" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>' +
    ' </tr>' +
    '                </table></td>' +
    '               </tr>' +
    '              </table></td>' +
    '             </tr>'

  data.map((item) => {
    html +=
      '             <tr style="border-collapse:collapse">' +
      '            <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->' +
      '             <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">' +
      '               <tr style="border-collapse:collapse">' +
      '                  <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">' +
      '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
      '                   <tr style="border-collapse:collapse">' +
      '<td align="left" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="' +
      item.image +
      '"' +
      ' alt="Gifts" title="Gifts" width="109" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>' +
      '                   </tr>' +
      '                 </table></td>' +
      '                </tr>' +
      '             </table>' +
      '             <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">' +
      '               <tr style="border-collapse:collapse">' +
      '                <td align="left" style="padding:0;Margin:0;width:270px">' +
      '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
      '                   <tr style="border-collapse:collapse">' +
      '                    <td class="es-m-txt-c" align="left" style="padding:25px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;line-height:24px;color:#373A44;font-size:16px;font-style:italic">' +
      formatVNDC(item.price) +
      '</p></td>' +
      '                   </tr>' +
      '                 </table></td>' +
      '               </tr>' +
      '             </table>' +
      '           </tr>'
  })

  //   '           <tr style="border-collapse:collapse">' +
  //   '            <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">' +
  //   '             <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">' +
  //   '               <tr style="border-collapse:collapse">' +
  //   '                  <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">' +
  //   '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
  //   '                   <tr style="border-collapse:collapse">' +
  //   '                    <td align="left" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://zwpavi.stripocdn.email/content/guids/CABINET_fd1b4f69bdd2019cbe1f797632c727e3/images/applemacbookpro14m1pro20212.jpeg" alt="Gifts" title="Gifts" width="109" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>' +
  //   '                   </tr>' +
  //   '                 </table></td>' +
  //   '               </tr>' +
  //   '             </table>' +
  //   '             <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">' +
  //   '               <tr style="border-collapse:collapse">' +
  //   '                <td align="left" style="padding:0;Margin:0;width:270px">' +
  //   '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
  //   '                   <tr style="border-collapse:collapse">' +
  //   '                    <td class="es-m-txt-c" align="left" style="padding:25px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;line-height:24px;color:#373A44;font-size:16px;font-style:italic">Giá</p></td>' +
  //   '                   </tr>' +
  //   '                 </table></td>' +
  //   '               </tr>' +
  //   '             </table></td>' +
  //   '           </tr>' +
  //   '           <tr style="border-collapse:collapse">' +
  //   '            <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">' +
  //   '             <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">' +
  //   '               <tr style="border-collapse:collapse">' +
  //   '                <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">' +
  //   '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
  //   '                   <tr style="border-collapse:collapse">' +
  //   '                    <td align="left" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://zwpavi.stripocdn.email/content/guids/CABINET_fd1b4f69bdd2019cbe1f797632c727e3/images/applemacbookpro14m1pro20211.jpeg" alt="Gifts" title="Gifts" width="109" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>' +
  //   '                   </tr>' +
  //   '                 </table></td>' +
  //   '               </tr>' +
  //   '             </table>' +
  //   '             <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">' +
  //   '               <tr style="border-collapse:collapse">' +
  //   '                <td align="left" style="padding:0;Margin:0;width:270px">' +
  //   '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
  //   '                   <tr style="border-collapse:collapse">' +
  //   '                    <td class="es-m-txt-c" align="left" style="padding:25px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;line-height:24px;color:#373A44;font-size:16px;font-style:italic">Giá</p></td>' +
  //   '                   </tr>' +
  //   '                 </table></td>' +
  //   '               </tr>' +
  //   '             </table><!--[if mso]></td></tr></table><![endif]--></td>' +
  //   '           </tr>' +
  html +=
    '           <tr style="border-collapse:collapse">' +
    '            <td style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-position:left top" align="left">' +
    '             <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">' +
    '               <tr style="border-collapse:collapse">' +
    '                <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">' +
    '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                   <tr style="border-collapse:collapse">' +
    '                    <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://zwpavi.stripocdn.email/content/guids/CABINET_c1fcbb5d78a971c24e0bff7489bfb480/images/67471511187142693.gif" alt="Gifts" title="Gifts" width="269" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>' +
    '                   </tr>' +
    '                 </table></td>' +
    '               </tr>' +
    '             </table>' +
    '             <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">' +
    '               <tr style="border-collapse:collapse">' +
    '                <td align="left" style="padding:0;Margin:0;width:270px">' +
    '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                   <tr style="border-collapse:collapse">' +
    '                    <td align="left" style="padding:0;Margin:0"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#373A44"><span style="font-style:italic">Happy, Happy, Happy</span></h3></td>' +
    '                    </tr>' +
    '                   <tr style="border-collapse:collapse">' +
    '                     <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;line-height:24px;color:#373A44;font-size:16px;font-style:italic">Cảm ơn đã ghé shop.&nbsp;<br>Chúc bạn có một mối tình no end trong mùa noel<br></p></td>' +
    '                   </tr>' +
    '                   <tr style="border-collapse:collapse">' +
    '                    <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#FFFFFF #FFFFFF #333333 #FFFFFF;background:#cfffff;border-width:0px 0px 2px 0px;display:inline-block;border-radius:0px;width:auto"><a href="https://viewstripo.email/" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#373A44;font-size:16px;border-style:solid;border-color:#cfffff;border-width:5px 0px;display:inline-block;background:#cfffff;border-radius:0px;font-family:\'trebuchet ms\', \'lucida grande\', \'lucida sans unicode\', \'lucida sans\', tahoma, sans-serif;font-weight:bold;font-style:italic;line-height:19px;width:auto;text-align:center">Take a gift &gt;</a></span></td>' +
    '                   </tr>' +
    '                 </table></td>' +
    '               </tr>' +
    '             </table><!--[if mso]></td></tr></table><![endif]--></td>' +
    '           </tr>' +
    '         </table></td>' +
    '       </tr>' +
    '     </table>' +
    '     <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">' +
    '       <tr style="border-collapse:collapse">' +
    '        <td align="center" style="padding:0;Margin:0">' +
    '         <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#373a44;width:600px" cellspacing="0" cellpadding="0" bgcolor="#373a44" align="center">' +
    '           <tr style="border-collapse:collapse">' +
    '            <td style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#373a44" bgcolor="#373a44" align="left">' +
    '             <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">' +
    '               <tr style="border-collapse:collapse">' +
    '                <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">' +
    '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                   <tr style="border-collapse:collapse">' +
    '                    <td align="left" style="padding:0;Margin:0"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#ffffff">Contact Us</h3></td>' +
    '                   </tr>' +
    '                   <tr style="border-collapse:collapse">' +
    '                    <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:20px;font-size:0">' +
    '                     <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                       <tr style="border-collapse:collapse">' +
    '                        <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://twitter.com/NguynHn52741542" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img title="Twitter" src="https://zwpavi.stripocdn.email/content/assets/img/social-icons/square-white/twitter-square-white.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>' +
    '                        <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://www.facebook.com/profile.php?id=100044213299077" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img title="Facebook" src="https://zwpavi.stripocdn.email/content/assets/img/social-icons/square-white/facebook-square-white.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>' +
    '                       <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://www.youtube.com/channel/UCWhJ4mc4DZjCnSVFDt9AlfQ" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img title="Youtube" src="https://zwpavi.stripocdn.email/content/assets/img/social-icons/square-white/youtube-square-white.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>' +
    '                        <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img title="Pinterest" src="https://zwpavi.stripocdn.email/content/assets/img/social-icons/square-white/pinterest-square-white.png" alt="P" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>' +
    '                        <td valign="top" align="center" style="padding:0;Margin:0"><a target="_blank" href="https://www.instagram.com/hi_hungw/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img title="Instagram" src="https://zwpavi.stripocdn.email/content/assets/img/social-icons/square-white/instagram-square-white.png" alt="Ig" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>' +
    '                       </tr>' +
    '                     </table></td>' +
    '                   </tr>' +
    '                   <tr style="border-collapse:collapse">' +
    '                    <td align="left" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><a target="_blank" href="tel:0920468214" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px">0929468214</a></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><a target="_blank" href="mailto:19110221@student.hcmute.edu.vn" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px">19110221@student.hcmute.edu.vn</a></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">Số 1 Võ Văn Ngân</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><br></p></td>' +
    '                   </tr>' +
    '                 </table></td>' +
    '               </tr>' +
    '             </table>' +
    '             <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">' +
    '               <tr style="border-collapse:collapse">' +
    '                <td align="left" style="padding:0;Margin:0;width:270px">' +
    '                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                   <tr style="border-collapse:collapse">' +
    '                    <td align="left" style="padding:0;Margin:0;padding-top:25px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">You are receiving this email because you have visited our site or asked us about regular newsletter.<br></p></td>' +
    '                   </tr>' +
    '                   <tr style="border-collapse:collapse">' +
    '                    <td align="left" style="padding:0;Margin:0;padding-top:25px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">If you wish to unsubscribe from our newsletter, click <a target="_blank" class="unsubscribe" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px">here</a>.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">© 2018</p></td>' +
    '                   </tr>' +
    '                 </table></td>' +
    '               </tr>' +
    '             </table><!--[if mso]></td></tr></table><![endif]--></td>' +
    '           </tr>' +
    '         </table></td>' +
    '       </tr>' +
    '     </table>' +
    '     <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">' +
    '       <tr style="border-collapse:collapse">' +
    '        <td align="center" style="padding:0;Margin:0">' +
    '         <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">' +
    '           <tr style="border-collapse:collapse">' +
    '            <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">' +
    '             <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '               <tr style="border-collapse:collapse">' +
    '                <td valign="top" align="center" style="padding:0;Margin:0;width:560px">' +
    '                 <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">' +
    '                   <tr style="border-collapse:collapse">' +
    '                    <td align="center" style="padding:0;Margin:0;display:none"></td>' +
    '                   </tr>' +
    '                 </table></td>' +
    '               </tr>' +
    '             </table></td>' +
    '           </tr>' +
    '         </table></td>' +
    '       </tr>' +
    '     </table></td>' +
    '   </tr>' +
    ' </table>' +
    '</div>' +
    ' </body>' +
    '</html>'

  return html
}

module.exports = renderGmail
