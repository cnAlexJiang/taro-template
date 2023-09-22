

/**
 * 规则
 * 1.预约日期始终保持只能预约未来7天，不能约当天，比如今天是8.31，进入小程序，只能约9.1-9.7 这7天，如果明天进入小程序，可预约时间自动变成9. * 2-9.8
 * 在这个第1点的基础上，是否可以设置 次日预约的截止时间为当日18点，比如今天过了18:00，就不能约明天的了，只能约9.2-9.7
 *
 */

function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}-${day}`;
}

export function getAvailableDates( ) {
  const today = new Date()
  today.setHours(0, 0, 0, 0);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const currentHour = new Date().getHours();

  const bookingEndTime = 18;
  const minAdvanceDays =  currentHour >= bookingEndTime ? 2 : 1;
  const maxAdvanceDays = currentHour >= bookingEndTime ? 8 : 7;
  const lastAdvanceDays = new Date('Sat Dec 30 2023 10:54:17 GMT+0800')
  lastAdvanceDays.setHours(0, 0, 0, 0);

  const availableDates = [];

  for (let i = minAdvanceDays; i <= maxAdvanceDays; i++) {
      const availableDate = new Date(today);
      availableDate.setDate(today.getDate() + i);
      availableDates.push(formatDate(availableDate));
      if(availableDate.getTime() === lastAdvanceDays.getTime()) {
        break;
      }
  }

  return availableDates;
}

// const availableDates = getAvailableDates();
// console.log(availableDates);
