import React, { useEffect, useState } from "react";
import DesktopDashNav from "./dashboard/desktopNav/desktopdashnav";
import TopNavBar from "./topnavbar";
import { useSelector } from "react-redux";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { useParams } from "react-router-dom";
import { formatter } from "Utils/helpers";
import { getSingleOrder } from "firebasedatas/getExisting";
import { updateOrders } from "firebasedatas/getPurchased";

const SingleOrder = () => {
  const { id } = useParams();
  const [merchant, setMerchant] = useState();
  const [state, setState] = useState();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [amount, setAmount] = useState(0);
  const [order, setOrder] = useState();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setMerchant(res.store);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser]);

  useEffect(() => {
    if (!id) return;
    async function getProduct() {
      await getSingleOrder(id)
        .then((res) => {
          setOrder(res);
          setLoading(false);
          console.log(res);

          let temp = res.cart.map((value) => value.curPrice);
          setAmount(temp.reduce((acc, item) => acc + item, 0));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getProduct();
  }, [id, active]);
  return (
    <div className="w-full h-full  bg-gray-50 inset-0 sm:pb-32 fixed overflow-y-auto overflow-x-hidden">
      <TopNavBar merchant={merchant} />
      <DesktopDashNav />
      <div className="let swipeIn mt-[40px] text-zinc-700 min-[450px]:mt-[60px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
        <div className=" max-[450px]:mt-[57px] max-[450px]:pt-[35px] w-full">
          <div className="singleOrderCont">
            {loading ? (
              <h2>Loading....</h2>
            ) : (
              <>
                <div className="customerContainer">
                  <div className="customerWrapper">
                    <div className="customerSingle">
                      <h2>
                        Customer Name: <span>{order.customerName}</span>
                      </h2>
                      <h3>
                        Order Id: <span>{id}</span>
                      </h3>
                    </div>
                    <div className="customerSingle">
                      <h2>
                        Contact Info: <span> {order.customerEmail} </span>
                      </h2>
                      <h2>
                        Amount Paid: <span> {formatter.format(amount)} </span>
                      </h2>
                    </div>
                    <div className="customerSingle"></div>
                    <div className="customerSingle">
                      <h2>
                        Status:{" "}
                        <p
                          onClick={() => setActive(true)}
                          className={order.status === "completed" ? "completed" : order.status === "failed" || order.status === "cancelled" ? "failed" : "ongoing"}>
                          {order.status}
                        </p>
                      </h2>
                    </div>
                  </div>
                  <h2>Order Details</h2>
                </div>
                <div className="orderItems">
                  <h2>Order Items</h2>
                  <div className="orderItemsWrapper">
                    {order?.cart?.map((item, index) => {
                      return (
                        <div className="orderItemSingle" key={index}>
                          <div className="orderImg">
                            <div className="w-full h-[40px] min-[45px]:h-[40px]  rounded-sm">
                              {item.image && <img className="w-full h-full rounded-sm" src={item.image.url} alt="pxl" />}
                            </div>
                            <div>
                              <h2>{item.name}</h2>
                            </div>
                          </div>
                          <div className="details">
                            <h2>
                              Price : <span>{formatter.format(item.price)}</span>
                            </h2>
                            <h2>
                              Quantity : <span>{item.count}</span>
                            </h2>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="summaryContainer">
                  <h2>Order Summary</h2>
                  <div className="summaryWrapper">
                    <div>
                      <p>Sub-Total</p>
                      <h1>{formatter.format(amount)}</h1>
                    </div>
                    <div>
                      <p>Delivery Fee</p>
                      <h1>{formatter.format(4000)}</h1>
                    </div>
                    <div>
                      <h2>Total Amount Paid</h2>
                      <h1>{formatter.format(amount + 4000)}</h1>
                    </div>
                    {/* <div>
          <h3>Vendor’s Pay</h3>
          <h1>{formatter.format(220000)}</h1>
        </div> */}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        onClick={() => setActive(false)}
        className={active ? " fixed text-zinc-700 z-[99] inset-0 h-full w-full bg-black bg-opacity-[0.5] flex items-center justify-center" : "hidden"}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="lets swipeDown overflow-hidden space-y-2 min-[450px]:space-y-3 max-[450px]:w-[90%] bg-white rounded-xl max-[450px]:rounded-lg p-2 w-[450px] m-auto absolute inset-x-0 h-[280px] flex flex-col justify-start items-center">
          <div className="orderChange">
            <h2>Order Status</h2>
            <select onChange={(e) => setState(e.target.value)}>
              <option value="">{order.status}</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
              <option value="on-hold">On Hold</option>
            </select>
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              <button
                onClick={async () => {
                  await updateOrders(id, { status: state })
                    .then((res) => {
                      setActive(false);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}>
                Change
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
