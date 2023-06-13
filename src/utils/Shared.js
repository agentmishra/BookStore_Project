import React from 'react';
import cartService from '../service/cart.service';
 const Role = {
  Admin: 1,
  Seller: 2,
  Buyer: 3,
};

const addtoCart=async(book,id)=>{
    return cartService
    .add({
      userId: id,
      bookId: book.id,
      quantity: 1,
    })
    .then((res) => {
      return { error: false, message: "Item added in cart" };
    })
    .catch((e) => {
      if (e.status === 500)
        return { error: true, message: "Item already in the cart" };
      else return { error: true, message: "something went wrong" };
    });


};
const NavigationItems = [
  {
    name: "Users",
    route: "/user",
    access: [Role.Admin,Role.Seller]
  },
  {
    name: "Categories",
    route: "/category",
    access: [Role.Admin,Role.Seller],
  },
  {
    name: "Books",
    route: '/product',
    access: [Role.Admin, Role.Seller,Role.Buyer],
  },
  {
    name: "Update Profile",
    route: '/update-profile',
    access: [Role.Admin, Role.Buyer, Role.Seller],
  },
];

const hasAccess = (pathname, user) => {
  const navItem = NavigationItems.find((navItem) =>
    pathname.includes(navItem.route)
  );
  if (navItem) {
    return (
      !navItem.access ||
      !!(navItem.access && navItem.access.includes(user.roleId))
    );
  }
  return true;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {addtoCart,NavigationItems,hasAccess};