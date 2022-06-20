import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { shipping } from "@settings/shipping-settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

function makeTitleToDOMId(title: string) {
	return title.toLowerCase().split(" ").join("_");
}

export default function shippingPage() {
	const { t } = useTranslation("shipping");

	return (
		<>
			<PageHeader pageHeader="text-shipping" />
			<Container>
				<div className="mt-10 p-20">
					We at KIAASA work hard to provide our customers with the latest fashion at impeccable quality and amazing prices. We are not accepting any return as of now due to covid terms. If you did not like the fit, colour or design simply exchange the product within 3 days of delivery ( i.e within 3 days of the receipt of goods by the customer ). To exchange a product, kindly call our customer care on +91-7428638400 or mail us on weborder@kiaasaretail.com mentioning your order number.
					<div className="mt-6">
						<ul>
							<li>Exchange policy – Few points to remember</li>
							<li>Exchange requests need to be raised within 3 days of the receipt of good by customer</li>
							<li>All exchanged items must be unused and unwashed for hygiene reasons, and returned with original packaging and tags in place. Items without tags will not be accepted.</li>
							<li>Shipping Charges shall be non-refundable.</li>
							<li>In case you receive a damaged/defective item, the company should be notified within 12 hours of receipt. Kindly call our customer care and share the relevant images at weborder@kiaasaretail.com</li>
							<li>Any returned item received by us that does not meet the above mentioned conditions will not be accepted, and will be returned to the customer at their expense. No amount will be reimbursed in this case.</li>
							<li>Please make sure that the returned items are packed securely to prevent any loss or damage during transit. Shipping fee is a function of volumetric weight and the type of product. We give our best effort to send you the products via reliable delivery partners in the minimum time.</li>
						</ul>
					</div>

					<div className="mt-6">
						<h1 className="font-bold leading-tight text-xl mt-0 mb-2">General</h1>
						<ul className="list-disc">
							<li>Exchange policy – Few points to remember</li>
							<li>Exchange requests need to be raised within 3 days of the receipt of good by customer</li>
							<li>All exchanged items must be unused and unwashed for hygiene reasons, and returned with original packaging and tags in place. Items without tags will not be accepted.</li>
						</ul>
					</div>

					<div className="mt-6">
						<h1 className="font-bold leading-tight text-xl mt-0 mb-2">Shipping</h1>
						<ul className="list-disc">
							<li>Shipping fee is applicable on all orders of any value delivered to any destination within India.</li>
							<li>For a limited period, we will offer a discount on shipping fee (can be up to 100% of shipping fee). The same shall be displayed on the website at product page or offers or at checkout page.</li>
							<li>Free standard shipping is automatically applied to your order after other discounts are taken and before taxes and handling charges are added.</li>
							<li>In case of refund due to return of products for any reason the standard shipping fee will be deducted from the refund.</li>
						</ul>
					</div>

					<div className="mt-6">
						<h1 className="font-bold leading-tight text-xl mt-0 mb-2">Delivery charges</h1>
						<ul className="list-disc">
							<li>Delivery charges vary from product to product, depending on weight and volume.</li>
						</ul>
					</div>

					<div className="mt-6">
						<h1 className="font-bold leading-tight text-xl mt-0 mb-2">Delivery outside India</h1>
						<ul className="list-disc">
							<li>Currently we do not deliver any product outside India.</li>
						</ul>
					</div>


					<div className="mt-6">
						<h1 className="font-bold leading-tight text-xl mt-0 mb-2">Delivery time</h1>
						<ul className="list-disc">
							<li>5 to 7 working days excluding holidays.</li>
						</ul>
					</div>


					<div className="mt-6">
						<h1 className="font-bold leading-tight text-xl mt-0 mb-2">Cancellation Policy</h1>
						<ul className="list-disc">
							<li>Kiaasa.com reserves the right to cancel any order without any explanation for doing so, as per the circumstances where the requirement could not be met.</li>
							<li>The company will ensure that any communication of cancellation of an order or any applicable refund will be made in reasonable time.</li>
						</ul>
					</div>


					<div className="mt-6">
						<h1 className="font-bold leading-tight text-xl mt-0 mb-2">Cash on Delivery Policy</h1>
						<ul className="list-disc">
							<li>To avail C-O-D Service, all items in the cart should be applicable for C-O-D.</li>
							<li>C-O-D is applicable on a minimum sale value of Rs. 1 and maximum of Rs. 50,000 only.</li>
							<li>Pin code provided for Cash on Delivery should be in the serviceable area. If not, any online payment mode needs to be used.</li>
							<li>You cannot open the box without making the payment at the time of delivery.</li>
							<li>If the product is open, do not accept the order.</li>
							<li>No credit/debit cards are accepted in Cash on Delivery</li>
						</ul>
					</div>


					<div className="mt-6">
						<h1 className="font-bold leading-tight text-xl mt-0 mb-2">Cash Back & Promo Codes/Coupons</h1>
						<ul className="list-disc">
							<li>Cash back Promo Code may not be applicable for all the products on the website.</li>
							<li>Special coupons should be redeemed within the limited period, and validity once expired, cannot be extended later.</li>
							<li>Two offers cannot be clubbed together using the Promo Code</li>
							<li>Kiaasa.com reserves the right to cancel any promotional ‘Promo Code’ and the transactions in which they are used. (This is not applicable on Cash back Promo Codes)</li>
							<li>Cash back and Promo Code Coupon cannot be clubbed together to avail an offer at Kiaasa.com</li>
							<li>This means, if Promo Code is used in an offer, Cash back cannot be generated.</li>
							<li>Cash back amount is subject to change at the sole discretion Kiaasa.com</li>
						</ul>
					</div>


					<div className="mt-6">
						<h1 className="font-bold leading-tight text-xl mt-0 mb-2">Products/Services</h1>
						<ul className="list-disc">
							<li>Product Images are indicative in nature</li>
							<li>Actual Product may differ from the image. Please refer the product specification for the product</li>
						</ul>
					</div>


					<div className="mt-6">
						<h1 className="font-bold leading-tight text-xl mt-0 mb-2">For Queries/Comments</h1>
						<ul className="list-disc">
							<li>Send us your questions or comments to customercare@kiaasaretail.com</li>
						</ul>
					</div>


					
					



				</div>
				
			
			
			
			
			
			</Container>



		</>
	);
}

shippingPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"shipping",
				"footer",
			])),
		},
	};
};
