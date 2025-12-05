## Условия задания
Необходимо создать приложение управления списком пользователей с использованием Vue 3 с Composition API, Typescript, Pinia.
Приложение должно позволять просматривать список пользователей, добавлять, редактировать и удалять элементы списка. Список пользователей необходимо загружать из файла userList.json (Данные внутри)
Модель User: { id: number, firstName: string, secondName: string, email: string, lastVisitedAt: number (timestamp) }
Добавить:
- Поиск, фильтрация и сортировка. Добавьте возможность поиска, фильтрации и
сортировки пользователей по различным полям.
- Пагинация (или виртуальный список). Реализуйте пагинацию для отображения
большого количества пользователей.

## Project Setup

```sh
yarn
# or
npm install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
# or
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
# or
npm run build
```
