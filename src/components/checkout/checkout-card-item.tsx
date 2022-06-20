import { Item } from "@contexts/cart/cart.utils";
import { generateCartItemName } from "@utils/generate-cart-item-name";
import usePrice from "@framework/product/use-price";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
	const { price } = usePrice({ amount: item.itemTotal, currencyCode: "USD", });

	return (
		<div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
			<div className="flex border rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
				<img
					src={item.imageUrl ?? "/assets/placeholder/order-product.svg"}
					width="64"
					height="64"
					className="object-cover"
				/>
			</div>
			<h6 className="text-sm ps-3 font-regular text-heading">
				{item.quantity} x {item.product_name} ₹{Math.abs(item.netPrice).toFixed(2)}
			</h6>
			<div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
				₹{Math.abs(item.total_price).toFixed(2)}
			</div>
		</div>
	);
};