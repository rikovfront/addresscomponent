const list = [
  {id: 1, name: 'город Чехов, проезд Ленина, 31'},
  {id: 2, name: 'город Шатура, бульвар Ладыгина, 88'},
  {id: 3, name: 'город Сергиев Посад, спуск Космонавтов, 80'},
  {id: 4, name: 'город Наро-Фоминск, пл. Славы, 01'},
  {id: 5, name: 'город Солнечногорск, спуск Космонавтов, 06'},
  {id: 6, name: 'город Дорохово, пл. Гоголя, 83'},
  {id: 7, name: 'город Подольск, въезд 1905 года, 61'},
  {id: 8, name: 'город Истра, спуск Бухарестская, 39'},
  {id: 9, name: 'город Коломна, бульвар Ломоносова, 41'},
  {id: 10, name: 'город Серебряные Пруды, пл. Балканская, 92'},
  {id: 11, name: 'город Ногинск, наб. Ломоносова, 98'},
];

export function fetchAddresses() {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: list }), 500)
  );
}

export function sendAddress(addr) {
  console.log('sendAddress:', addr);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: 'success' }), 500)
  );
}