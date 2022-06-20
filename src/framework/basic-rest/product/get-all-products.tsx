import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";

type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};



const fetchProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;

	const formData = new FormData();
	formData.append("limit", 10);
	formData.append("offset", 0);

	const { data } = await http.post(API_ENDPOINTS.PRODUCTS, formData);
	return {
		data: shuffle(data),
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedProduct, Error>(
		[API_ENDPOINTS.PRODUCTS, options],
		fetchProducts,
		{
			getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
		}
	);
};

export { useProductsQuery, fetchProducts };
