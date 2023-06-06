import React, { useState,useEffect } from 'react';
import {useAuthContext} from '../contexts/auth';
import { useCartContext } from '../contexts/cartContext';
import { useNavigate,Link } from 'react-router-dom';
import cartService from '../service/cart.service';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../css/myStyle.css';
import '../css/cart.css';
import { Typography } from '@mui/material';
import {Button} from '@mui/material';


const Cart=()=>{
    const authContext=useAuthContext();
    const cartContext=useCartContext();
    const Navigate=useNavigate();

// To see the Datails Of the Cart we use states
    const [CartList, setCartList] = useState([]);
    const [ItemsInCart, setItemsInCart] = useState(0);
    const [TotalPrice, setTotalPrice] = useState(0);

    const getTotalPrice = (ItemList) => {
        let totalPrice = 0;
        ItemList.forEach((item) => {
          const itemPrice = item.quantity * parseInt(item.book.price);
          totalPrice = totalPrice + itemPrice;
        });
        setTotalPrice(totalPrice);
      };

    useEffect(() => {
        setCartList(cartContext.cartData);
        setItemsInCart(cartContext.cartData.length);
        getTotalPrice(cartContext.cartData);
      }, [cartContext.cartData]);

      

      const removeItem = async (id) => {
        try {
          const res = await cartService.removeItem(id);
          if (res) {
            cartContext.updateCart();
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      };
      const updateQuantity = async (cartItem, inc, e) => {
        const current_count = parseInt(
          e.target.closest(".qty-group").children[1].innerText
        );
        const quantity = inc ? current_count + 1 : current_count - 1;
        if (quantity === 0) {
          toast.error("Item quantity should not be zero");
          return;
        }
        cartService
          .updateItem({
            id: cartItem.id,
            userId: cartItem.userId,
            bookId: cartItem.book.id,
            quantity,
          })
          .then((res) => {
            if (res) {
              const item = CartList.find(
                (item) => item.book.id === cartItem.book.id
              );
              if (item) {
                const current_div_count = parseInt(
                  e.target.closest(".qty-group").children[1].innerText
                );
                const newCount = inc
                  ? current_div_count + 1
                  : current_div_count - 1;
                e.target.closest(".qty-group").children[1].innerText = newCount;
                const newPrice = inc
                  ? TotalPrice + parseInt(item.book.price)
                  : TotalPrice - parseInt(item.book.price);
                setTotalPrice(newPrice);
              }
            }
          });
      };
      const PlaceOrder = async () => {
        if (authContext.user.id) {
          const userCart = await cartService.getList(authContext.user.id);
          if (userCart.length) {
            try {
              let cartIds = [];
              userCart.forEach((element) => {
                cartIds.push(element.id);
              });
              const newOrder = {
                userId: authContext.user.id,
                cartIds,
              };
              const res = await axios.post('https://book-e-sell-node-api.vercel.app/api/order',newOrder);
              if (res) {
                cartContext.updateCart();
                Navigate("/");
                toast.success("Order Is Placed Successfully");
              }
            } catch (error) {
              toast.error(`Order cannot be placed : ${error}`);
            }
          } else {
            toast.error("Your cart is empty");
          }
        }
      };
 return(
    <>
       <div>
                <div className='center'>
                    <div className="loginheader">Cart Page</div>
                    <hr color="red" width='15%' />
                </div>
            </div>
            <div style={{ marginBottom: '45px' }}></div>
            
        <div style={{margin:'auto',width:'50%'}}>
        <div className="cart-heading">
          <Typography variant="h4">
            My Shopping Bag ({ItemsInCart} Items)
          </Typography>
          <div className="total-price">Total price: {TotalPrice}</div>
        </div>
        <div className="cart-list-wrapper">
          {CartList.map((cartItem) => {
            return (
              <div className="cart-list-item" key={cartItem.id}>
                <div className="cart-item-img">
                  <Link>
                    <img src={cartItem.book.base64image} alt="dummy-pic" />
                  </Link>
                </div>
                <div className="cart-item-content">
                  <div className="cart-item-top-content">
                    <div className="cart-item-left">
                      <p className="brand">{cartItem.book.name}</p>
                      <Link>Cart item name</Link>
                    </div>
                    <div className="price-block">
                      <span className="current-price">
                        MRP &#8377; {cartItem.book.price}
                      </span>
                    </div>
                  </div>
                  <div className="cart-item-bottom-content">
                    <div className="qty-group">
                      <Button
                        className="btn pink-btn"
                        onClick={(e) => updateQuantity(cartItem, true, e)}
                      >
                        +
                      </Button>
                      <span className="number-count">{cartItem.quantity}</span>
                      <Button
                        className="cartbt pink-btn"
                        onClick={(e) => updateQuantity(cartItem, false, e)}
                      >
                        -
                      </Button>
                    </div>
                    <Link onClick={() => removeItem(cartItem.id)}>Remove</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btn-wrapper">
          <Button variant='contained' onClick={PlaceOrder}>
            Place order
          </Button>
        </div>
        </div>
    </>
 );
}
export default Cart;