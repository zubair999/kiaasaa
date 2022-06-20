import react, { useState } from "react";
import { useSelector } from "react-redux";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";

const CheckoutCard: React.FC = () => {
	// const [cartItems, setCartItems] = useState([])
	const { items, total, isEmpty } = useCart();
	const { price: subtotal } = usePrice({amount: total, currencyCode: "USD", });
	const { t } = useTranslation("common");

	const CART = useSelector(state => state.Cart)

	var i = 0;
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
          i++;
        }
        return transformedCartItems.sort((a, b) => (a.product_id > b.product_id ? 1 : -1));
    });

	const total_amount_is = Math.abs(CART.totalAmount).toFixed(2)

	const checkoutFooter = [
		// {
		// 	id: 1,
		// 	name: t("text-sub-total"),
		// 	price: subtotal,
		// },
		// {
		// 	id: 2,
		// 	name: t("text-shipping"),
		// 	price: t("text-free"),
		// },
		{
			id: 3,
			name: t("text-total"),
			price: `₹${total_amount_is}`,
		},
	];


	return (
		<div className="pt-12 md:pt-0 2xl:ps-4">
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-your-order")}
			</h2>
			<div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
				<span>{t("text-product")}</span>
				{/* <span className="ms-auto flex-shrink-0">{t("text-sub-total")}</span> */}
			</div>
			{cartItems.length > 0 ? (
				cartItems.map((item) => <CheckoutItem item={item} key={item.product_id} />)
			) : (
				<p className="text-red-500 lg:px-3 py-4">{t("text-empty-cart")}</p>
			)}
			{checkoutFooter.map((item: any) => (
				<CheckoutCardFooterItem item={item} key={item.id} />
			))}
		</div>
	);
};

export default CheckoutCard;
