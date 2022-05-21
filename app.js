const express = require("express");
const dbConfig = require("./dbConfig.js");
const { Sequelize, Op, DataTypes } = require("sequelize");
const res = require("express/lib/response");

const DB = {}

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static('./public'));

app.post("/login", (request, response) => {
    const errors = []
    /* Проверка на пустоту логина и пароля */
    if (!Boolean(request.body.login)) {
        errors.push("Пустой логин!")
    }
    if (!Boolean(request.body.password)) {
        errors.push("Пустой пароль!")
    }
    
    if (errors.length > 0) {
        response.status(402).json({
            message: "Не удалось войти в аккаунт",
            errors: errors
        })
    }

    DB.Users.findOne({
        where: {
            login: request.body.login
        }
    }).then(user => {
        if (user) {
            if (user.password == request.body.password) {
                response.status(200).cookie('isLogin', 'true').json({
                    message: "Вы вошли в аккаунт"
                })
            }
            else {
                errors.push("Неверный пароль")
                response.status(404).json({
                    message: "Не удалось войти в аккаунт",
                    errors: errors
                })
            }
        }
        else {
            errors.push("Не найден пользователь с таким логином")
            response.status(404).json({
                message: "Не удалось войти в аккаунт",
                errors: errors
            })
        }
    }).catch(error => {
        response.status(500).json({
            message: "Не удалось войти в аккаунт",
            errors: error
        })
    })
});

const client = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    dialectOptions: dbConfig.dialectOptions,
    pool: dbConfig.pool,
});

DB.Users = client.define("User", {
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {})

DB.Applicants = client.define("Applicants", {
    Surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Patronymic: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Specialization: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Form_of_study: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Birthplace: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Nationality: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Identity_document: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Passport_series: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Passport_number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Date_issue_passport: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Who_issued_passport: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Division_code: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Registration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Place_residence: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Phone: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    School: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Education_document: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Graduation_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Certificate_series: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Certificate_number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Certificate_GPA: {
        type: DataTypes.REAL,
        allowNull: true
    },
    Foreign_language: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Date_application: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Mother_full_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Mother_phone: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Father_full_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Father_phone: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Original_certificate: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Note: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Group: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Registration_number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    SNILS: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {})

client.sync({force: true}).then(() => {
    console.log("База данных синхронизирована");

    DB.Users.create({
        login: "admin",
        password: "admin"
    })
    DB.Applicants.create({
        Surname: "Pribish",
        Name: "Ilya",
        Patronymic: "Denisovich",
    })

    app.listen(PORT, () => { console.log(`Сервер запущен на порту ${PORT}`) }) 
});