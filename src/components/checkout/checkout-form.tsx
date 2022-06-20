import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui.context";



// import displayRazorpay from '../../utils/paymentGateway';
import { fetchCustomerAddress, addOrder, fetchOrder, fetchOrderDetail } from "../../Store/Action/Index"


interface CheckoutInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	zipCode: string;
	save: boolean;
	note: string;
}

const CheckoutForm: React.FC = () => {
	const [orderid,setOrderid]=useState(null);
	const [amount,setAmount]=useState(null);
	
	const localToken = useSelector(state=>state.LocalToken);
	const token = localToken.localToken;
	
	const [verifyResult,setVerifyResult]=useState({});
	const dispatch = useDispatch()
	const CUSTOMER = useSelector(state => state.Customer)
	const ADDRESS = useSelector(state => state.Address)
	const CART = useSelector(state => state.Cart)
	const ORDER = useSelector(state => state.Order)
	const { t } = useTranslation();
	const { mutate: updateUser, isLoading } = useCheckoutMutation();
	const { register, handleSubmit, formState: { errors },} = useForm<CheckoutInputType>();


	const Delivering_address = ADDRESS.getAddress.find(item => {
		if(item.address_id == CART.addressId){
			return item
		}
	})

	// var i = 0;
    const cartItems = useSelector((state) => {
        const transformedCartItems = [];
        for (const key in state.Cart.items) {
          transformedCartItems.push({
            product_id: key,
            product_name: state.Cart.items[key].product_name,
            quantity:state.Cart.items[key].quantity,
            color:state.Cart.items[key].color,
            size:state.Cart.items[key].size,
            netPrice:state.Cart.items[key].net_price,
            imageUrl:state.Cart.items[key].image_url,
            total_price:state.Cart.items[key].total_price,
          });
        //   i++;
        }
        return transformedCartItems.sort((a, b) => (a.product_id > b.product_id ? 1 : -1));
    });

	const orderData = {
        customerId: CUSTOMER.getCustomer.id,
        addresssId: CART.addressId,
        cart: cartItems,
        storeId: CART.items.store_id,
        netPrice : CART.totalAmount
    };

 	const cartitemsAmount =  Math.floor(CART.totalAmount);

	console.log('CART', CART);	

	const {
		// openSidebar,
		// setDrawerView,
		// openSearch,
		openModal,
		setModalView,
		isAuthorized,
	} = useUI();
	

	function handleLogin() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}

	const initializeRazorpay = (src:any) => {
		return new Promise((resolve) => {
		  const script = document.createElement("script");
		  script.src = src;
	
		  script.onload = () => {
			resolve(true);
		  };
		  script.onerror = () => {
			resolve(false);
		  };
	
		  document.body.appendChild(script);
		});
	  };
	
	useEffect(() => {
		dispatch(fetchCustomerAddress(CUSTOMER.getCustomer.id,token))
		dispatch(fetchOrder(orderData.customerId, token))
	}, [])

	useEffect(() => {
		initializeRazorpay("https://checkout.razorpay.com/v1/checkout.js")
	})

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Access-Token", token);

	var raw = JSON.stringify({
	"amount": parseFloat(cartitemsAmount),
	"currency": "INR"
	});

	// console.log('verifyDetails',verifyDetails)

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	  };

	async function verifyPayment(VerifyDetails:any){

		// console.log('verifyDetails',verifyDetails)
		console.log('VerifyDetails', VerifyDetails)

		// let raw2 = JSON.stringify(verifyDetails);
		// let requestOptions2 = {
		// 	method: 'POST',
		// 	headers: myHeaders,
		// 	body: raw2,
		// 	redirect: 'follow'
		// 	};		
		
		// await fetch("https://devweb.kiaasa.com/api/pos/razorpay/order/signature/verify", requestOptions2)
		// .then(response => response.json())
		// .then(result => setVerifyResult(result))
		// .catch(error => console.log('error', error));
	}

	console.log('verifyResult',verifyResult);
	console.log('ORDER',ORDER);

	async function createRazorpayOrder(){
		await fetch("https://devweb.kiaasa.com/api/pos/razorpay/order/create", requestOptions)
		.then(response => response.json())
		.then(result => setOrderid(result.order_data.id))
		.catch(error => console.log('error', error));		
	}

	async function displayRazorpay(){
		await createRazorpayOrder();

		//options 
		var options = {
			key: "rzp_test_B6V7iE0NspoP7T", 
			name: "Manu Arora Pvt Ltd",
			currency: 'INR',
			amount: parseFloat(cartitemsAmount)*100,
			order_id: orderid,
			description: "Thankyou for your test donation",
			image: "https://manuarora.in/logo.png",
			handler: function (response:any) {
			  // Validate payment at server - using webhooks is a better idea.
			  const setVerifyDetails = {'order_id' : response.razorpay_order_id,
				  'payment_id' : response.razorpay_payment_id,				
				'signature' : response.razorpay_signature
			}
			verifyPayment(setVerifyDetails);			
			//   console.log('payment_id'+response.razorpay_payment_id);
			//   console.log('order_id'+response.razorpay_order_id);
			//   console.log('signature'+response.razorpay_signature);

			},
			prefill: {
			  name: "Manu Arora",
			  email: "manuarorawork@gmail.com",
			  contact: "9999999999",
			},
		  };
		  const paymentObject = new window.Razorpay(options);
		  paymentObject.open();
		}

	function onSubmit(input, e) {
		e.preventDefault();
		// CUSTOMER.isAuthorized ? Router.push(ROUTES.ORDER) : dispatch(addOrder(orderData))
		// console.log("order place")
		// console.log(orderData)
		dispatch(addOrder(orderData, token))
		// console.log('orderData:',orderData);
		// dispatch(fetchOrder())
		
	}

	const AddressCard = () => {
		const AddressListCard = (item, index) =>  {
			return ( 
				<div className="flex p-4 rounded-md mt-1 md:mt-1 xl:mt-2 bg-gray-150 text-sm font-semibold text-heading">
					<span key={item.id}>{item.address}</span>
				</div>
			)
		};

		return (
			<div className="pt-6 md:pt-0 2xl:ps-4">
		{/* // 		{ address.map(AddressListCard) } */}
			</div>
		)
	}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-delivering-to")}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 lg:space-y-5">
					<div className="flex p-4 rounded-md mt-1 md:mt-1 xl:mt-2 bg-gray-150 text-sm font-semibold text-heading">	
						<span className="ms-2 text-sm text-heading relative">
							{CUSTOMER.getCustomer.salutation} {CUSTOMER.getCustomer.customer_name}, <br /> 
							{Delivering_address.address}, <br />
							{Delivering_address.city_name}, <br />
							{Delivering_address.postal_code}, <br />
							{CUSTOMER.getCustomer.phone}, <br /> 
							{CUSTOMER.getCustomer.email}, <br /> 
						</span>
					</div>


					<div className="flex w-full">
						<Button
							className="w-full sm:w-auto"
							onClick={displayRazorpay}
							loading={false}
							disabled={false}
						>
							{t("common:button-place-order")}
						</Button>
					</div>					
				</div>
			</form>
		</>
	);
};

export default CheckoutForm;
