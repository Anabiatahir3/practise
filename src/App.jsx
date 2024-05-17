import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import { Fragment } from "react";
import Notification from "./components/UI/Notification";

let isInitial = true;
function App() {
  const cart = useSelector((state) => state.cart);
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();
  useEffect(() => {
    const sendData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          message: "cart data is being sent",
          title: "Sending",
        })
      );
      const response = await fetch(
        "https://redux-bc876-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("sending cart data failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "cart data sent successfully",
          title: "Success",
        })
      );
      const data = await response.json();
    };

    if (isInitial) {
      isInitial = false;
      return;
    }
    sendData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "cart data not sent",
          title: "Failed",
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
