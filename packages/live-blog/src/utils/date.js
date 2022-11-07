export function toLocaleString(dateStr) {
  const d = new Date(dateStr)
  const dayChinese = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${
    dayChinese?.[d.getDay()]
  } ${d.getHours()}:${d.getMinutes()}`
}
