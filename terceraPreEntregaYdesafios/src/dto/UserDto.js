export default class UserDto {
  static getTokenDTOFrom = (user) => {
    return {
      name: `${user.firstName} ${user.lastName}`,
      id: user._id,
      role: user.role,
      cart: user.cart,
      email: user.email,
    };
  };
}
