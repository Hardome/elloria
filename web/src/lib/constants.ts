/* Пункты меню навигации */
export const MENU_ITEMS = [
  {label: 'О поселке', id: 'about'},
  {label: 'Медиа', id: 'media'},
  {label: 'Проекты', id: 'projects'},
  {label: 'Контакты', id: 'contacts'}
] as const;

/* Реквизиты и контакты компании */
export const COMPANY = {
  name: 'ООО Архитектор',
  inn: '8604047800',
  address: `Россия, Тюменская область, Тюменский район, сельское поселение Московское,` +
    ` деревня Дударева, ул. Тюменская, дом 3, офис 142`,
  phone: '+7 (922) 258-20-02', // 8 922 258 20 02
  phoneHref: 'tel:+79222582002',
  email: 'info@architectorcompany.ru',
  tgHref: 'https://t.me/+79222582002',
  maxHref: 'https://max.ru/u/f9LHodD0cOKZ4NzUhZuwXWQDWkqqB7HQIf1p4xoiSXaRj547dE_59nXZxMU'
} as const;

