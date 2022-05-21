module.exports = {
    HOST: "ec2-34-248-169-69.eu-west-1.compute.amazonaws.com",
    PORT: "5432",
    USER: "anhverlvrqxjil",
    PASSWORD: "30e81bfc1cd09c870035586895877593bb70efb03867f48067ca6c97b336d46c",
    DB: "dam80umh7u436h",
    DIALECT: "postgres",
    dialectOptions: {
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};