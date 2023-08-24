export function toLocaleString(dateStr) {
  const d = new Date(dateStr)
  const dayChinese = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${
    dayChinese?.[d.getDay()]
  } ${d
    .getHours()
    .toString()
    .padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
}

export function customFormatTime(dateStr, displayDateString) {
  const d = new Date(dateStr)
  const year = d.getFullYear()
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d
    .getDate()
    .toString()
    .padStart(2, '0')

  switch (displayDateString) {
    case 'year':
      return `${year}`
    case 'month':
      return `${year}-${month}`
    case 'year':
      return `${year}-${month}-${day}`
    default:
      return `${year}-${month}-${day}`
  }
}
