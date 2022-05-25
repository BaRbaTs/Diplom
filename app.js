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

app.post("/add", (request, response) => {
    DB.Applicants.create({
        Surname: request.body.Surname,
        Name: request.body.Name,
        Patronymic: request.body.Patronymic,
        Specialization: request.body.Specialization,
        Gender: request.body.Gender,
        Form_of_study: request.body.Form_of_study,
        Birthdate: request.body.Birthdate,
        Birthplace: request.body.Birthplace,
        Nationality: request.body.Nationality,
        Identity_document: request.body.Identity_document,
        Passport_series: request.body.Passport_series,
        Passport_number: request.body.Passport_number,
        Date_issue_passport: request.body.Date_issue_passport,
        Who_issued_passport: request.body.Who_issued_passport,
        Division_code: request.body.Division_code,
        Registration: request.body.Registration,
        Place_residence: request.body.Place_residence,
        Phone: request.body.Phone,
        School: request.body.School,
        Education_document: request.body.Education_document,
        Graduation_date: request.body.Graduation_date,
        Certificate_series: request.body.Certificate_series,
        Certificate_number: request.body.Certificate_number,
        Certificate_GPA: request.body.Certificate_GPA,
        Foreign_language: request.body.Foreign_language,
        Date_application: request.body.Date_application,
        Mother_full_name: request.body.Mother_full_name,
        Mother_phone: request.body.Mother_phone,
        Father_full_name: request.body.Father_full_name,
        Father_phone: request.body.Father_phone,
        Original_certificate: request.body.Original_certificate,
        Note: request.body.Note,
        Group: request.body.Group,
        Registration_number: request.body.Registration_number,
        SNILS: request.body.SNILS,
    })
        .then(user => {
            response.sendStatus(201)
        })
        .catch(error => {
            console.log(error);
        })
    response.send("типо работает" );
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
    }
}, {})

client.sync({force: true}).then(() => {
    console.log("База данных синхронизирована");

    DB.Users.create({
        login: "admin",
        password: "admin"
    })

    app.listen(PORT, () => { console.log(`Сервер запущен на порту ${PORT}`) }) 
});