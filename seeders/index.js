const bcrypt = require("bcrypt");

const db = require("../configs/db");
db();

const { User } = require("../models");

const users = [
  {
    username: "usersatu",
    password: "usersatu",
    fullName: "User Satu",
  },
  {
    username: "userdua",
    password: "userdua",
    fullName: "User Dua",
  },
  {
    username: "usertiga",
    password: "usertiga",
    fullName: "User Tiga",
  },
  {
    username: "userempat",
    password: "userempat",
    fullName: "User Empat",
  },
  {
    username: "userlima",
    password: "userlima",
    fullName: "User Lima",
  },
];

const importData = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    for (let i = 0; i < users.length; i++) {
      const el = users[i];
      const hashedPassword = await bcrypt.hash(el.password, salt);
      await User.create({
        username: el.username,
        password: hashedPassword,
        fullName: el.fullName,
      });
    }

    console.log(`Data successfully imported`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();

    console.log(`Data successfully deleted`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
