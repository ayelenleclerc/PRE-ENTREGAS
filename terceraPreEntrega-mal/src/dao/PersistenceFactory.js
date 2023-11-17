import config from "../config/config.js";

export default class PersistenceFactory {
  static getPersistence = async () => {
    //Tengo una lista de las ENTIDADES que necesito modelar a nivel persistencia.

    let UsersDao;
    let CartsDao;
    let ProductsDao;
    let TicketsDao;
    let ChatDao;

    switch (config.app.PERSISTENCE) {
      case "MEMORY": {
        UsersDao = (await import("./memory/UsersDao.js")).default;
        CartsDao = (await import("./memory/CartsDao.js")).default;
        ProductsDao = (await import("./memory/ProductsDao.js")).default;
        TicketsDao = (await import("./memory/TicketsDao.js")).default;
        ChatDao = (await import("./memory/ChatDao.js")).default;
        break;
      }
      case "FS": {
        UsersDao = (await import("./FS/UsersDao.js")).default;
        CartsDao = (await import("./FS/CartsDao.js")).default;
        ProductsDao = (await import("./FS/ProductsDao.js")).default;
        TicketsDao = (await import("./FS/TicketsDao.js")).default;
        ChatDao = (await import("./FS/ChatDao.js")).default;
        break;
      }
      case "MONGO": {
        UsersDao = (await import("./mongo/UsersDao.js")).default;
        CartsDao = (await import("./mongo/CartsDao.js")).default;
        ProductsDao = (await import("./mongo/ProductsDao.js")).default;
        TicketsDao = (await import("./mongo/TicketsDao.js")).default;
        ChatDao = (await import("./mongo/ChatDao.js")).default;
        break;
      }
    }
    return {
      UsersDao,
      CartsDao,
      ProductsDao,
      TicketsDao,
      ChatDao,
    };
  };
}
