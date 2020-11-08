/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
require('dotenv').config()

const { Telegraf, Extra } = require('telegraf');

const api = require('covid19-api');
const Markup = require('telegraf/markup');

const COUNTRIES_LIST = require('./help');

bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Assalomu alaykum ${ctx.message.from.first_name} ${ctx.message.from.last_name}. Siz Covid-19 virusi bo'yicha dunyoning barcha mamlakatlari haqida malu'mot olishingiz mumkin😊😊. Lekin sizdan talab qilinadigan talab mamlakatlar nomalarini ingliztilida yozing.Shunda siz malumot olishingiz ancha osonroq bo'ladi. Hamma mamlakatlar ro'yhatini ko'rish uchun /help ni bosing!`, Markup.keyboard([
   ['Uzbekistan', 'US'],
   ['Russia', 'Saudi-Arabia'],
   ['Singapore', 'Kazakhstan']
])
   .resize()
   .extra()
));

bot.command('/info', (ctx) => ctx.reply('Hello'));
bot.help((ctx) => ctx.reply(COUNTRIES_LIST));
bot.on('text', async (ctx) => {
   let data = {};

   try {
      data = await api.getReportsByCountries(ctx.message.text);
   
      const formatData = `
Mamlakat: ${data[0][0].country}
Kasallanganlar: ${data[0][0].cases}
O'limlar: ${data[0][0].deaths}
Sog'ayganlar: ${data[0][0].recovered}`

      ctx.reply(formatData);
   } catch {
      console.log('Xatolik');
      ctx.reply(`Xatolik, bunday mamlakat topilmadi🤦‍♂️. Mamalkatlar ro'yhati uchun /help ni bosing`);
   };
});


bot.launch();

console.log('bot qayta ishga tushdi');
