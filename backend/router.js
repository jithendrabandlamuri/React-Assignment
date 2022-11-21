require("dotenv").config();

const router = require("express").Router();
const User = require("./user.models");
const Article=require("./article.models")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors=require('cors')

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
router.use(cors(corsOptions))

//Create user

router.post("/register", async (req, res) => {
  try {
    const { username,email, password } = req.body;

    // Validating the user
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypting the user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Creating JWT token
    const token = jwt.sign(
      { user_id: email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // Create user in our database
    const user = await User.create({
      username:username,
      email: email.toLowerCase(), //converting email to lowercase
      password: encryptedPassword,
      token: token
    });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;



    // Validating the user
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Creating token
      const token = jwt.sign(
        { user_id: email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});


router.post("/addarticle", async (req, res) => {
  try {
    const { title,text, author,email } = req.body;

    // Create user in our database
    const article = await Article.create({
      email:email,
      title:title,
      text: text,
      author: author
    });

    res.status(201).json(article);
  } catch (err) {
    console.log(err);
  }
});


router.get("/viewarticle", async (req, res) => {
  try {
    const articleData = await Article.find()
    res
      .status(200)
      .json({ message: "User data fetched successfully", response: articleData });
  }
  catch (error) {
    console.log("Error while fetching the data", error);
    res.status(500).json({ message: "Error while fetching the data", error });
  }
});

//Delete user

router.delete("/delete-user/:emailId", async (req, res) => {
  const emailId = req.params.emailId;

  const userObject = await Article.findOne({ emailId });

  try {
    const deleteResponse = await userObject.delete();
    res
      .status(200)
      .json({ message: "Article deleted successfully", response: deleteResponse });
  } catch (error) {
    console.log("Article deletion Failed", error);
    res.status(500).json({ message: "Article deletion Failed", error });
  }
});


// router.get("/get-user/:emailId", async (req, res) => {
//   const emailId = req.params.emailId;

//   const userData = await User.findOne({ emailId });
//   if (!userData) {
//     res.status(500).json({ error: "Email not found in db" });
//   }

//   try {
//     res
//       .status(200)
//       .json({ message: "User data fetched successfully", response: userData });
//   }
//   catch (error) {
//     console.log("Error while fetching the data", error);
//     res.status(500).json({ message: "Error while fetching the data", error });
//   }
// });
// //User Authentication 

// router.post("/auth", auth, (req, res) => {
//   res.status(200).send("Welcome User 🙌 ");
// });


// //Updating user details except password

// router.put("/update-user/:emailId", async (req, res) => {
//   const emailId = req.params.emailId;
//   const { first_name, last_name, mobile_no, password } = req.body;

//   if (!emailId) {
//     res.status(500).json({ error: "email is missing" });
//   }

//   if (password) {
//     res.status(400).send("Password cannot be updated");
//   }

//   if (!(first_name && last_name && mobile_no)) {
//     res.status(400).send("All input is required");
//   }

//   const userObject = await User.findOne({ emailId });
//   if (!userObject) {
//     res.status(500).json({ message: "No user present with this email", error });
//   }
//   userObject.first_name = first_name;
//   userObject.last_name = last_name;
//   userObject.mobile_no = mobile_no;

//   try {
//     const updateResponse = await userObject.save();
//     res
//       .status(200)
//       .json({ message: "User Updated successfully", response: updateResponse });
//   } catch (error) {
//     console.log("User Updation Failed", error);
//     res.status(500).json({ message: "User Updation Failed", error });
//   }
// });

// //Updating user password

// router.put("/update-password/:emailId", async (req, res) => {
//   const emailId = req.params.emailId;
//   const { password } = req.body;

//   if (!(password)) {
//     res.status(400).send("password is required");
//   }

//   const userObject = await User.findOne({ emailId });
//   if (!userObject) {
//     res.status(500).json({ message: "No user present with this email", error });
//   }

//   //Encrypting the user password
//   encryptedPassword = await bcrypt.hash(password, 10);

//   userObject.password = encryptedPassword;

//   try {
//     const updateResponse = await userObject.save();
//     res
//       .status(200)
//       .json({ message: "User password Updated successfully", response: updateResponse });
//   } catch (error) {
//     console.log("password Updation Failed", error);
//     res.status(500).json({ message: "password Updation Failed", error });
//   }
// });


// //Delete user

// router.delete("/delete-user/:emailId", async (req, res) => {
//   const emailId = req.params.emailId;

//   const userObject = await User.findOne({ emailId });
//   if (!userObject) {
//     res.status(500).json({ error: "Email not found in db" });
//   }

//   try {
//     const deleteResponse = await userObject.delete();
//     res
//       .status(200)
//       .json({ message: "User deleted successfully", response: deleteResponse });
//   } catch (error) {
//     console.log("User deletion Failed", error);
//     res.status(500).json({ message: "User deletion Failed", error });
//   }
// });


//get all users

// router.get("/get-all-users", async (req, res) => {
//   try {
//     const userData = await User.find()
//     res
//       .status(200)
//       .json({ message: "User data fetched successfully", response: userData });
//   }
//   catch (error) {
//     console.log("Error while fetching the data", error);
//     res.status(500).json({ message: "Error while fetching the data", error });
//   }
// });


//get user based on emailid

// router.get("/get-user/:emailId", async (req, res) => {
//   const emailId = req.params.emailId;

//   const userData = await User.findOne({ emailId });
//   if (!userData) {
//     res.status(500).json({ error: "Email not found in db" });
//   }

//   try {
//     res
//       .status(200)
//       .json({ message: "User data fetched successfully", response: userData });
//   }
//   catch (error) {
//     console.log("Error while fetching the data", error);
//     res.status(500).json({ message: "Error while fetching the data", error });
//   }
// });

module.exports = router;
