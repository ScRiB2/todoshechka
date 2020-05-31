import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import * as React from "react";

const resources = {
    en: {
        translation: {
            'signIn': "Sign in",
            'required': 'Required',
            'login': 'Login',
            "enterLogin": "Enter login",
            "password": "Password",
            "welcome": "Welcome",
            'notFoundPage': 'Sorry, page not found',
            'notFound': 'Not found',
            'todoList': 'Todo List',
            'title': 'Title',
            'enterTitle': 'Enter title',
            'description': 'Description',
            'createdBy': 'Created by',
            'actions': 'Actions',
            'create': 'Create',
            'createNewTodo': 'Create new Todo',
            'createTodo': 'Create Todo',
            'editTodo': 'Edit Todo',
            'save': 'Save',
            'username': 'Username',
            'role': 'Role',
            'somethingWentWrong': 'Something went wrong...',
            'users': 'Users',
            'logout': 'Logout',
            'accessForbidden': 'Not this time, access forbidden!',
            'listOfUser': 'List of User'
        }
    },
    ru: {
        translation: {
            'signIn': "Войти",
            'required': 'Обязательно к заполнению',
            'login': 'Логин',
            "enterLogin": "Введите логин",
            "password": "Пароль",
            "welcome": "Добро пожаловать",
            'notFoundPage': 'Извините, страница не найдена',
            'notFound': 'Ничего не найдено',
            'todoList': 'Список задач',
            'title': 'Название',
            'enterTitle': 'Введите название',
            'description': 'Описание',
            'createdBy': 'Создатель',
            'actions': 'Действия',
            'create': 'Создать',
            'createNewTodo': 'Создать новую задачу',
            'createTodo': 'Создать задачу',
            'editTodo': 'Редактировать задачу',
            'save': 'Сохранить',
            'username': 'Имя пользователя',
            'role': 'Права',
            'somethingWentWrong': 'Что-то пошло не так...',
            'users': 'Список пользователей',
            'logout': 'Выйти',
            'accessForbidden': 'Не в этот раз. Доступ запрещён!',
            'listOfUser': 'Список пользователей'
        }
    }
};


type Keys = keyof typeof resources.en.translation;
type Flags = { [K in Keys]: string };
export let i18Keys: Flags = {} as Flags;
Object.keys(resources.en.translation).forEach(key => i18Keys[key] = key);


i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;