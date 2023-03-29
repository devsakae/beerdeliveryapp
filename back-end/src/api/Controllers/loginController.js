const createLogin = (_req, res) => {
  res.send(200);
};

module.exports = {
  createLogin,
};

// export default class LoginController {
//   static async createUser(_req, res, next) {
//     try {
//       await res.send(200);
//     } catch (error) {
//       next(error);
//     }
//   }
// }